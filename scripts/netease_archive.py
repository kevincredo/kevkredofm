#!/usr/bin/env python3
import csv
import json
import os
import re
import sqlite3
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "netease_music_archive"
DB = Path.home() / "Library/Containers/com.netease.163music/Data/Documents/storage/sqlite_storage.sqlite3"
USER_ID = "34683345"

SUPPLEMENTAL_PLAYLISTS = [
    {
        "playlist_id": "17992012345",
        "name": "Chill 2026",
        "track_count_declared": 48,
        "play_count": None,
        "subscribed_count": 0,
        "privacy": 0,
        "special_type": 0,
        "tags": ["Chill"],
        "description": "",
        "create_time": "2026-05-25",
        "update_time": "",
        "cover_img_url": "",
        "is_liked_music": False,
        "metadata_source": "app_sidebar_supplement",
        "metadata_note": "Created playlist visible in the current NetEase desktop app; track IDs and all track details are present in the local cache.",
    },
    {
        "playlist_id": "17607363134",
        "name": "KevinCredo的2025年度歌单",
        "track_count_declared": 10,
        "play_count": None,
        "subscribed_count": 0,
        "privacy": 0,
        "special_type": 20,
        "tags": [],
        "description": "",
        "create_time": "2025-12-29",
        "update_time": "",
        "cover_img_url": "",
        "is_liked_music": False,
        "metadata_source": "app_sidebar_supplement",
        "metadata_note": "Present in the current app sidebar but absent from the cached user-detail playlist index.",
    }
]


def load_json(text, default=None):
    if not text:
        return default
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return default


def millis_to_iso(value):
    if not value:
        return ""
    try:
        return datetime.fromtimestamp(int(value) / 1000, tz=timezone.utc).astimezone().isoformat(timespec="seconds")
    except Exception:
        return ""


def clean_private_fields(obj):
    if isinstance(obj, dict):
        skipped = {
            "creator",
            "bindings",
            "vipInfo",
            "privilege",
            "tokenJsonStr",
            "access_token",
            "refresh_token",
            "cellphone",
            "mobile",
            "avatarUrl",
            "backgroundUrl",
        }
        return {k: clean_private_fields(v) for k, v in obj.items() if k not in skipped}
    if isinstance(obj, list):
        return [clean_private_fields(v) for v in obj]
    return obj


def extract_playlist_records(conn):
    row = conn.execute(
        "select jsonStr from persistentModel where uniKey=?",
        (f"page:userDetail|userChange|{USER_ID}",),
    ).fetchone()
    if not row:
        row = conn.execute("select jsonStr from persistentModel where uniKey='page:userDetail'").fetchone()
    if not row:
        raise SystemExit("Cannot find NetEase user playlist metadata in local cache.")

    data = load_json(row[0], {}).get("data", {})
    records = data.get("createPlaylist", {}).get(USER_ID, {}).get("records", [])
    playlists = []
    for r in records:
        pid = str(r.get("id", ""))
        if not pid or pid == "hostPlayRankPlaylist":
            continue
        if str(r.get("userId", "")) != USER_ID:
            continue
        playlists.append(
            {
                "playlist_id": pid,
                "name": r.get("name", ""),
                "track_count_declared": r.get("trackCount"),
                "play_count": r.get("playCount"),
                "subscribed_count": r.get("subscribedCount"),
                "privacy": r.get("privacy", 0),
                "special_type": r.get("specialType"),
                "tags": r.get("tags") or [],
                "description": r.get("description") or "",
                "create_time": millis_to_iso(r.get("createTime")),
                "update_time": millis_to_iso(r.get("updateTime")),
                "cover_img_url": r.get("coverImgUrl", ""),
                "is_liked_music": r.get("specialType") == 5 or "喜欢的音乐" in (r.get("name") or ""),
                "metadata_source": "persistentModel",
            }
        )

    existing_ids = {p["playlist_id"] for p in playlists}
    insert_at = next((i + 1 for i, p in enumerate(playlists) if p["is_liked_music"]), 0)
    for supplemental in SUPPLEMENTAL_PLAYLISTS:
        if supplemental["playlist_id"] in existing_ids:
            continue
        playlists.insert(insert_at, dict(supplemental))
        insert_at += 1
    return playlists


def load_playlist_track_ids(conn):
    by_playlist = {}
    for pid, json_str in conn.execute("select id, jsonStr from playlistTrackIds"):
        payload = load_json(json_str, {}) or {}
        rows = []
        for idx, item in enumerate(payload.get("trackIds", []) or [], start=1):
            tid = str(item.get("id", ""))
            if tid:
                rows.append(
                    {
                        "position": idx,
                        "track_id": tid,
                        "version": item.get("v"),
                        "added_at": millis_to_iso(item.get("at")),
                    }
                )
        by_playlist[str(pid)] = rows
    return by_playlist


def load_tracks(conn):
    tracks = {}
    for tid, json_str in conn.execute("select id, jsonStr from dbTrack"):
        payload = load_json(json_str, {}) or {}
        if payload:
            tracks[str(tid)] = normalize_track(payload)

    # Downloaded/offline and play-history caches sometimes contain details absent from dbTrack.
    for table in ("offlineTrack", "historyTracks"):
        try:
            rows = conn.execute(f"select * from {table}").fetchall()
            cols = [c[1] for c in conn.execute(f"pragma table_info({table})")]
        except sqlite3.Error:
            continue
        for row in rows:
            record = dict(zip(cols, row))
            json_str = record.get("jsonStr") or record.get("track") or record.get("detail")
            payload = load_json(json_str, {}) if isinstance(json_str, str) else {}
            if table == "offlineTrack" and isinstance(payload, dict) and payload.get("detail"):
                payload = payload["detail"]
            tid = str(payload.get("id") or record.get("trackId") or record.get("tid") or record.get("id") or "")
            if tid and payload and tid not in tracks:
                tracks[tid] = normalize_track(payload)
    return tracks


def normalize_track(track):
    artists = track.get("artists") or track.get("ar") or []
    album = track.get("album") or track.get("al") or {}
    privilege = track.get("privilege") or {}
    no_copyright = track.get("noCopyrightRcmd") or {}
    max_play_bitrate = privilege.get("maxPlayBr")
    privilege_status = privilege.get("status")
    if privilege_status == 0 and max_play_bitrate:
        netease_access = "available_in_logged_in_client"
    elif no_copyright:
        netease_access = "unavailable_or_replaced"
    elif privilege_status not in (None, 0):
        netease_access = "restricted"
    else:
        netease_access = "unknown"
    return {
        "track_id": str(track.get("id", "")),
        "name": track.get("name", ""),
        "artists": [a.get("name", "") for a in artists if isinstance(a, dict) and a.get("name")],
        "artist_ids": [str(a.get("id", "")) for a in artists if isinstance(a, dict) and a.get("id")],
        "album": album.get("name") or album.get("albumName") or "",
        "album_id": str(album.get("id", "")) if album.get("id") is not None else "",
        "duration_ms": track.get("duration") or track.get("dt"),
        "popularity": track.get("popularity") or track.get("pop"),
        "fee": track.get("fee"),
        "copyright_id": track.get("copyrightId", ""),
        "pic_url": album.get("picUrl") or album.get("cover") or "",
        "netease_access": netease_access,
        "netease_privilege_status": privilege_status,
        "netease_paid_entitlement": privilege.get("payed"),
        "netease_max_play_bitrate": max_play_bitrate,
        "netease_max_free_bitrate": privilege.get("maxFreeBr"),
        "netease_max_download_bitrate": privilege.get("maxDownBr"),
        "netease_cloud_song": privilege.get("cloudSong"),
        "netease_access_checked_at": millis_to_iso(privilege.get("now")),
        "no_copyright_reason": no_copyright.get("typeDesc") or "",
        "replacement_track_id": str(no_copyright.get("songId") or ""),
    }


def infer_tags(text):
    s = text.lower()
    tags = []
    patterns = [
        ("house", r"\bhouse\b|deep house|tech house|progressive"),
        ("deep_house", r"deep\s*house|deephouse"),
        ("tech_house", r"tech\s*house"),
        ("progressive_house", r"progressive"),
        ("minimal", r"minimal|boris brejcha"),
        ("disco_nu_disco", r"disco|nu disco|french touch"),
        ("retro_synth", r"retro|synth|80s|golden"),
        ("chill_downtempo", r"chill|lo-fi|downtempo|slow|breezy|jazzy|late night|sunset|bar"),
        ("afro_melodic", r"afro|amapiano|melodic"),
        ("rock", r"\brock\b|rockpump"),
        ("hiphop_jazzhop", r"hiphop|hip hop|jazz hiphop|jazzhop"),
        ("edm", r"\bedm\b|dancing|dance"),
        ("acid_techno", r"acid|techno"),
        ("holiday", r"holiday|christmas|chirsmas|nye|beach"),
    ]
    for tag, pat in patterns:
        if re.search(pat, s):
            tags.append(tag)
    return tags


def build_archive():
    OUT.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB)
    playlists = extract_playlist_records(conn)
    playlist_tracks = load_playlist_track_ids(conn)
    tracks = load_tracks(conn)
    liked_count = sum(1 for p in playlists if p["is_liked_music"])
    created_count = len(playlists) - liked_count

    archive = {
        "generated_at": datetime.now().astimezone().isoformat(timespec="seconds"),
        "source": "NetEase Music macOS local cache; user-created playlists plus liked-music playlist; subscribed playlists excluded.",
        "scope": {
            "user_id": USER_ID,
            "total_playlist_records": len(playlists),
            "created_playlist_count": created_count,
            "liked_music_playlist_count": liked_count,
            "includes_liked_music_playlist": any(p["is_liked_music"] for p in playlists),
            "excluded": "收藏的歌单 / subscribed playlists",
        },
        "playlists": [],
        "tracks": {},
        "playlist_tracks": [],
        "collection_status": {},
        "analysis": {},
    }

    membership = defaultdict(list)
    missing_playlist_ids = []
    missing_track_details = set()
    count_mismatches = []

    for p in playlists:
        pid = p["playlist_id"]
        rows = playlist_tracks.get(pid, [])
        if not rows:
            missing_playlist_ids.append(pid)

        inferred = set(infer_tags(" ".join([p["name"], p.get("description", ""), " ".join(p.get("tags") or [])])))
        declared_count = p.get("track_count_declared")
        collected_count = len(rows)
        count_matches_declared = (
            declared_count is not None and collected_count == int(declared_count)
        )
        collection_note = ""
        if rows and declared_count is not None and not count_matches_declared:
            collection_note = "Track IDs are present; cached playlist metadata has a stale declared count."
            count_mismatches.append(
                {
                    "playlist_id": pid,
                    "name": p["name"],
                    "declared": declared_count,
                    "collected": collected_count,
                }
            )
        p_record = dict(p)
        p_record["inferred_style_tags"] = sorted(inferred)
        p_record["track_count_collected"] = collected_count
        p_record["has_track_ids"] = bool(rows)
        p_record["count_matches_declared"] = count_matches_declared
        p_record["collection_note"] = collection_note
        archive["playlists"].append(p_record)

        for row in rows:
            tid = row["track_id"]
            membership[tid].append(pid)
            if tid not in tracks:
                missing_track_details.add(tid)
            archive["playlist_tracks"].append({"playlist_id": pid, **row})

    for tid, track in tracks.items():
        if tid in membership:
            archive["tracks"][tid] = track

    playlist_tag_counter = Counter()
    track_tag_counter = Counter()
    playlist_count_by_tag = defaultdict(int)
    for p in archive["playlists"]:
        for tag in p["inferred_style_tags"]:
            playlist_tag_counter[tag] += int(p.get("track_count_collected") or 0)
            playlist_count_by_tag[tag] += 1
            for row in playlist_tracks.get(p["playlist_id"], []):
                track_tag_counter[tag] += 1

    artist_counter = Counter()
    album_counter = Counter()
    for tid in membership:
        t = tracks.get(tid)
        if not t:
            continue
        for artist in t.get("artists", []):
            artist_counter[artist] += 1
        if t.get("album"):
            album_counter[t["album"]] += 1

    total_memberships = len(archive["playlist_tracks"])
    unique_tracks = len(membership)
    archive["collection_status"] = {
        "playlist_count": len(playlists),
        "created_playlist_count": created_count,
        "liked_music_playlist_count": liked_count,
        "playlists_with_track_ids": len(playlists) - len(missing_playlist_ids),
        "playlists_missing_track_ids": [
            {"playlist_id": pid, "name": next((p["name"] for p in playlists if p["playlist_id"] == pid), "")}
            for pid in missing_playlist_ids
        ],
        "playlist_track_memberships": total_memberships,
        "unique_track_ids": unique_tracks,
        "unique_tracks_with_details": len(archive["tracks"]),
        "missing_track_detail_count": len(missing_track_details),
        "count_mismatch_count": len(count_mismatches),
        "count_mismatches": count_mismatches,
    }
    archive["analysis"] = {
        "top_style_tags_by_playlist_collected_tracks": playlist_tag_counter.most_common(),
        "top_style_tags_by_collected_memberships": track_tag_counter.most_common(),
        "playlist_count_by_style_tag": sorted(playlist_count_by_tag.items(), key=lambda x: (-x[1], x[0])),
        "top_artists": artist_counter.most_common(40),
        "top_albums": album_counter.most_common(30),
        "duplicate_or_cross_playlist_tracks": [
            {"track_id": tid, "playlist_count": len(pids), "track": tracks.get(tid, {}).get("name", "")}
            for tid, pids in sorted(membership.items(), key=lambda x: (-len(x[1]), x[0]))
            if len(pids) > 1
        ][:100],
    }

    safe_archive = clean_private_fields(archive)
    (OUT / "netease_created_playlists_archive.json").write_text(
        json.dumps(safe_archive, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    with (OUT / "playlists.csv").open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "playlist_id",
                "name",
                "track_count_declared",
                "track_count_collected",
                "collection_complete_by_count",
                "is_liked_music",
                "privacy",
                "special_type",
                "play_count",
                "subscribed_count",
                "create_time",
                "update_time",
                "inferred_style_tags",
            ],
        )
        writer.writeheader()
        for p in safe_archive["playlists"]:
            row = {k: p.get(k, "") for k in writer.fieldnames}
            row["inferred_style_tags"] = ";".join(p.get("inferred_style_tags", []))
            writer.writerow(row)

    with (OUT / "tracks.csv").open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "track_id",
                "name",
                "artists",
                "album",
                "duration_ms",
                "popularity",
                "fee",
                "netease_access",
                "netease_paid_entitlement",
                "netease_max_play_bitrate",
                "netease_max_free_bitrate",
                "netease_access_checked_at",
                "no_copyright_reason",
                "playlist_count",
                "playlist_ids",
            ],
        )
        writer.writeheader()
        for tid, pids in sorted(membership.items(), key=lambda x: x[0]):
            t = safe_archive["tracks"].get(tid, {"track_id": tid})
            writer.writerow(
                {
                    "track_id": tid,
                    "name": t.get("name", ""),
                    "artists": ";".join(t.get("artists", [])),
                    "album": t.get("album", ""),
                    "duration_ms": t.get("duration_ms", ""),
                    "popularity": t.get("popularity", ""),
                    "fee": t.get("fee", ""),
                    "netease_access": t.get("netease_access", ""),
                    "netease_paid_entitlement": t.get("netease_paid_entitlement", ""),
                    "netease_max_play_bitrate": t.get("netease_max_play_bitrate", ""),
                    "netease_max_free_bitrate": t.get("netease_max_free_bitrate", ""),
                    "netease_access_checked_at": t.get("netease_access_checked_at", ""),
                    "no_copyright_reason": t.get("no_copyright_reason", ""),
                    "playlist_count": len(pids),
                    "playlist_ids": ";".join(pids),
                }
            )

    with (OUT / "playlist_tracks.csv").open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=["playlist_id", "playlist_name", "position", "track_id", "track_name", "artists", "album"],
        )
        writer.writeheader()
        playlist_names = {p["playlist_id"]: p["name"] for p in playlists}
        for row in safe_archive["playlist_tracks"]:
            t = safe_archive["tracks"].get(row["track_id"], {})
            writer.writerow(
                {
                    "playlist_id": row["playlist_id"],
                    "playlist_name": playlist_names.get(row["playlist_id"], ""),
                    "position": row["position"],
                    "track_id": row["track_id"],
                    "track_name": t.get("name", ""),
                    "artists": ";".join(t.get("artists", [])),
                    "album": t.get("album", ""),
                }
            )

    write_baseline_sqlite(safe_archive)

    summary_lines = [
        "# NetEase Music Baseline Archive",
        "",
        f"Generated: {safe_archive['generated_at']}",
        "",
        "Scope: user-created playlists and liked-music playlist only. Subscribed playlists are excluded.",
        "",
        "## Collection Status",
        "",
        f"- Playlist records: {len(playlists)} ({created_count} created + {liked_count} liked-music)",
        f"- Playlists with track IDs: {safe_archive['collection_status']['playlists_with_track_ids']}",
        f"- Playlist-track memberships: {total_memberships}",
        f"- Unique track IDs: {unique_tracks}",
        f"- Unique tracks with details: {len(safe_archive['tracks'])}",
        f"- Missing track details: {len(missing_track_details)}",
        "",
        "## Top Style Signals",
        "",
    ]
    for tag, count in safe_archive["analysis"]["top_style_tags_by_collected_memberships"][:12]:
        summary_lines.append(f"- {tag}: {count}")
    summary_lines += ["", "## Top Artists", ""]
    for artist, count in safe_archive["analysis"]["top_artists"][:20]:
        summary_lines.append(f"- {artist}: {count}")
    summary_lines += [
        "",
        "## Taste Read",
        "",
        "- The strongest signal is chill and downtempo curation: late-night, sunset, bar, lo-fi, jazzy, breezy, and slow-dance playlists dominate the named playlist clusters.",
        "- House is the main dance-music backbone, especially deep house, tech house, progressive house, minimal, afro/melodic house, nu-disco, and French Touch-adjacent sounds.",
        "- The archive also keeps clear secondary lanes: rock classics, hip-hop/jazz-hop, EDM festival-pop, retro/synth/disco, and seasonal/venue-specific playlists.",
        "- Playlist naming shows a DJ/curator pattern: many collections are built around time-of-day, venue, set mood, or event context rather than only artist fandom.",
    ]
    if count_mismatches:
        summary_lines += ["", "## Count Notes", ""]
        summary_lines.append(
            "Some cached playlist metadata has stale declared counts. The archive uses the refreshed collected track IDs as the baseline source of truth."
        )
        for item in count_mismatches[:20]:
            summary_lines.append(f"- {item['name']}: declared {item['declared']}, collected {item['collected']}")
    if missing_playlist_ids:
        summary_lines += ["", "## Missing Playlist Track IDs", ""]
        for item in safe_archive["collection_status"]["playlists_missing_track_ids"]:
            summary_lines.append(f"- {item['name']} ({item['playlist_id']})")
    (OUT / "analysis_summary.md").write_text("\n".join(summary_lines) + "\n", encoding="utf-8")

    print(json.dumps(safe_archive["collection_status"], ensure_ascii=False, indent=2))


def write_baseline_sqlite(archive):
    db_path = OUT / "netease_music_baseline.sqlite3"
    conn = sqlite3.connect(db_path)
    conn.executescript(
        """
        drop table if exists playlist_tracks;
        drop table if exists tracks;
        drop table if exists playlists;

        create table playlists (
            playlist_id text primary key,
            name text,
            is_liked_music integer,
            track_count_declared integer,
            track_count_collected integer,
            has_track_ids integer,
            count_matches_declared integer,
            privacy integer,
            special_type integer,
            play_count integer,
            subscribed_count integer,
            create_time text,
            update_time text,
            tags_json text,
            inferred_style_tags_json text,
            metadata_source text,
            collection_note text
        );

        create table tracks (
            track_id text primary key,
            name text,
            artists_json text,
            album text,
            album_id text,
            duration_ms integer,
            popularity integer,
            fee integer,
            copyright_id text,
            pic_url text,
            netease_access text,
            netease_privilege_status integer,
            netease_paid_entitlement integer,
            netease_max_play_bitrate integer,
            netease_max_free_bitrate integer,
            netease_max_download_bitrate integer,
            netease_cloud_song integer,
            netease_access_checked_at text,
            no_copyright_reason text,
            replacement_track_id text
        );

        create table playlist_tracks (
            playlist_id text,
            position integer,
            track_id text,
            added_at text,
            version integer,
            primary key (playlist_id, position)
        );
        """
    )

    conn.executemany(
        """
        insert into playlists values (
            :playlist_id, :name, :is_liked_music, :track_count_declared, :track_count_collected,
            :has_track_ids, :count_matches_declared, :privacy, :special_type, :play_count,
            :subscribed_count, :create_time, :update_time, :tags_json, :inferred_style_tags_json,
            :metadata_source, :collection_note
        )
        """,
        [
            {
                **p,
                "is_liked_music": int(bool(p.get("is_liked_music"))),
                "has_track_ids": int(bool(p.get("has_track_ids"))),
                "count_matches_declared": int(bool(p.get("count_matches_declared"))),
                "tags_json": json.dumps(p.get("tags") or [], ensure_ascii=False),
                "inferred_style_tags_json": json.dumps(p.get("inferred_style_tags") or [], ensure_ascii=False),
            }
            for p in archive["playlists"]
        ],
    )
    conn.executemany(
        """
        insert into tracks values (
            :track_id, :name, :artists_json, :album, :album_id, :duration_ms,
            :popularity, :fee, :copyright_id, :pic_url, :netease_access,
            :netease_privilege_status, :netease_paid_entitlement, :netease_max_play_bitrate,
            :netease_max_free_bitrate, :netease_max_download_bitrate, :netease_cloud_song,
            :netease_access_checked_at, :no_copyright_reason, :replacement_track_id
        )
        """,
        [
            {
                **t,
                "artists_json": json.dumps(t.get("artists") or [], ensure_ascii=False),
            }
            for t in archive["tracks"].values()
        ],
    )
    conn.executemany(
        """
        insert into playlist_tracks values (
            :playlist_id, :position, :track_id, :added_at, :version
        )
        """,
        archive["playlist_tracks"],
    )
    conn.commit()
    conn.close()


if __name__ == "__main__":
    build_archive()
