#!/usr/bin/env python3
"""Enrich the Echo Room FM library from public music catalogs.

The script is resumable. Each completed track is written to genre_cache.json,
then generate_library.py consumes that cache to rebuild the browser library.
"""

from __future__ import annotations

import argparse
import json
import math
import re
import tempfile
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from difflib import SequenceMatcher
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

from generate_library import DATA_JS, GENRE_CACHE, OUT, infer_style_tags, main as regenerate_library


APP_UA = "EchoRoomFM/1.2 (personal catalog metadata enrichment)"
DEEZER_BASE = "https://api.deezer.com"
ITUNES_BASE = "https://itunes.apple.com/search"
MUSICBRAINZ_BASE = "https://musicbrainz.org/ws/2"
SAVE_EVERY = 10
KEY_NAMES = ("C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B")
MAJOR_PROFILE = (6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88)
MINOR_PROFILE = (6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17)
LOW_CONFIDENCE_LABELS = {
    "playlist+heuristic",
    "metadata+heuristic",
    "metadata+catalog+heuristic",
    "online-low",
}
MUSICBRAINZ_ENTITY_CACHE = {}
MUSICBRAINZ_ENTITY_LOCK = threading.Lock()


class RateLimiter:
    def __init__(self, interval: float):
        self.interval = interval
        self.lock = threading.Lock()
        self.next_at = 0.0

    def wait(self):
        with self.lock:
            now = time.monotonic()
            if now < self.next_at:
                time.sleep(self.next_at - now)
            self.next_at = time.monotonic() + self.interval


MUSICBRAINZ_LIMITER = RateLimiter(1.05)


def main():
    parser = argparse.ArgumentParser(description="Enrich Echo Room FM tracks with public catalog metadata.")
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--offset", type=int, default=0)
    parser.add_argument("--workers", type=int, default=5)
    parser.add_argument("--refresh", action="store_true")
    parser.add_argument("--no-audio-analysis", action="store_true")
    parser.add_argument("--musicbrainz-all", action="store_true")
    parser.add_argument("--only-visible", action="store_true")
    parser.add_argument("--only-low-confidence", action="store_true")
    parser.add_argument("--missing-online", action="store_true")
    parser.add_argument("--min-match-confidence", type=float, default=None)
    parser.add_argument("--country", default="US")
    args = parser.parse_args()

    library = json.loads(OUT.read_text(encoding="utf-8"))
    cache = load_cache()
    candidates = library["tracks"][args.offset :]
    if args.only_visible:
        candidates = [track for track in candidates if is_visible_track(track)]
    if args.only_low_confidence:
        candidates = [track for track in candidates if is_low_confidence_track(track)]
    if args.missing_online:
        candidates = [track for track in candidates if not (track.get("onlineGenres") or track.get("onlineTags"))]
    if args.min_match_confidence is not None:
        candidates = [
            track
            for track in candidates
            if positive_number(track.get("catalogMatchConfidence")) is None
            or positive_number(track.get("catalogMatchConfidence")) < args.min_match_confidence
        ]
    if args.limit is not None:
        candidates = candidates[: args.limit]
    tracks = [
        track
        for track in candidates
        if args.refresh or not cache["tracks"].get(str(track["id"]), {}).get("catalogEnrichedAt")
    ]
    print(json.dumps({"selected": len(tracks), "total": len(library["tracks"]), "workers": args.workers}, ensure_ascii=False))

    completed = 0
    with ThreadPoolExecutor(max_workers=max(1, args.workers)) as pool:
        futures = {
            pool.submit(
                enrich_track,
                track,
                country=args.country,
                analyze_audio=not args.no_audio_analysis,
                musicbrainz_all=args.musicbrainz_all,
            ): track
            for track in tracks
        }
        for future in as_completed(futures):
            track = futures[future]
            try:
                entry = future.result()
            except Exception as exc:
                entry = make_error_entry(track, exc)
            cache["tracks"][str(track["id"])] = entry
            completed += 1
            if completed % SAVE_EVERY == 0 or completed == len(tracks):
                cache["updatedAt"] = now_iso()
                save_cache(cache)
            print(
                json.dumps(
                    {
                        "processed": completed,
                        "selected": len(tracks),
                        "id": track["id"],
                        "name": track["name"],
                        "sources": entry.get("sources", []),
                        "genres": entry.get("onlineGenres", []),
                        "bpm": (entry.get("tempo") or {}).get("bpm"),
                        "key": (entry.get("musicalKey") or {}).get("key"),
                        "match": entry.get("catalogMatchConfidence"),
                        "error": entry.get("error", ""),
                    },
                    ensure_ascii=False,
                )
            )

    if not tracks:
        save_cache(cache)
    regenerate_library()
    print(
        json.dumps(
            {
                "processed": completed,
                "cache": str(GENRE_CACHE),
                "library": str(OUT),
                "data_js": str(DATA_JS),
            },
            ensure_ascii=False,
        )
    )


def enrich_track(track, country, analyze_audio, musicbrainz_all):
    deezer = query_deezer(track)
    itunes = query_itunes(track, country)
    matches = [item for item in (deezer, itunes) if item]
    best_confidence = max((item["match"]["confidence"] for item in matches), default=0.0)
    musicbrainz = None
    if musicbrainz_all or best_confidence < 0.72:
        musicbrainz = query_musicbrainz(track)
        if musicbrainz:
            matches.append(musicbrainz)
            best_confidence = max(best_confidence, musicbrainz["match"]["confidence"])

    raw_genres = []
    raw_tags = []
    sources = []
    for item in matches:
        raw_genres.extend(item.get("genres") or [])
        raw_tags.extend(item.get("tags") or [])
        sources.append(item["match"]["source"])

    preview_url = first_value(
        (deezer or {}).get("previewUrl"),
        (itunes or {}).get("previewUrl"),
    )
    audio_analysis = {}
    if analyze_audio and preview_url:
        audio_analysis = analyze_preview(preview_url)

    catalog_bpm = positive_number((deezer or {}).get("bpm"))
    analyzed_bpm = positive_number(audio_analysis.get("bpm"))
    tempo = {}
    if catalog_bpm:
        tempo = {
            "bpm": round(catalog_bpm),
            "confidence": "catalog-reference",
            "sources": ["Deezer Track API"],
        }
    elif analyzed_bpm:
        tempo = {
            "bpm": round(analyzed_bpm),
            "confidence": audio_analysis.get("tempoConfidence") or "preview-analysis",
            "sources": [audio_analysis.get("source") or "Official preview analysis"],
        }

    musical_key = {}
    if audio_analysis.get("key"):
        musical_key = {
            "key": audio_analysis["key"],
            "mode": audio_analysis.get("mode") or "",
            "confidence": audio_analysis.get("keyConfidence") or "preview-analysis",
            "score": audio_analysis.get("keyScore"),
            "sources": [audio_analysis.get("source") or "Official preview analysis"],
        }

    style_text = " ".join(
        [
            track.get("name", ""),
            " ".join(track.get("artists") or []),
            track.get("album", ""),
            " ".join(track.get("playlistNames") or []),
            " ".join(raw_genres),
            " ".join(raw_tags),
        ]
    )
    style_tags = infer_style_tags(style_text)
    source_names = unique(sources)
    confidence = catalog_confidence_label(best_confidence, source_names, style_tags)
    release_date = first_value((deezer or {}).get("releaseDate"), (itunes or {}).get("releaseDate"))
    isrc = first_value((deezer or {}).get("isrc"), (itunes or {}).get("isrc"))

    return {
        "trackId": str(track["id"]),
        "trackName": track.get("name", ""),
        "artists": track.get("artists") or [],
        "album": track.get("album", ""),
        "onlineGenres": sorted(unique(raw_genres)),
        "onlineTags": sorted(unique(raw_tags))[:40],
        "styleTags": style_tags,
        "sources": source_names,
        "matches": [item["match"] for item in matches],
        "tempo": tempo,
        "musicalKey": musical_key,
        "beatGridAvailable": bool(tempo),
        "confidence": confidence,
        "catalogMatchConfidence": round(best_confidence, 3),
        "releaseDate": release_date or "",
        "isrc": isrc or "",
        "explicit": first_non_none((deezer or {}).get("explicit"), (itunes or {}).get("explicit")),
        "previewUrl": preview_url or "",
        "audioAnalysis": audio_analysis,
        "catalogEnrichedAt": now_iso(),
        "fetchedAt": now_iso(),
    }


def query_deezer(track):
    terms = " ".join([first_artist(track), track.get("name", "")]).strip()
    if not terms:
        return None
    data = get_json(f"{DEEZER_BASE}/search?{urlencode({'q': terms, 'limit': 8})}")
    best = best_match(data.get("data") or [], track, deezer_fields)
    if not best:
        return None
    confidence, item = best
    detail = get_json(f"{DEEZER_BASE}/track/{quote(str(item.get('id', '')))}")
    if detail.get("error"):
        detail = item
    album_id = ((detail.get("album") or {}).get("id") or (item.get("album") or {}).get("id"))
    album = get_json(f"{DEEZER_BASE}/album/{quote(str(album_id))}") if album_id else {}
    genres = [g.get("name") for g in ((album.get("genres") or {}).get("data") or []) if g.get("name")]
    return {
        "genres": genres,
        "tags": [],
        "bpm": detail.get("bpm"),
        "isrc": detail.get("isrc"),
        "releaseDate": album.get("release_date"),
        "explicit": detail.get("explicit_lyrics"),
        "previewUrl": detail.get("preview") or item.get("preview"),
        "match": {
            "source": "Deezer",
            "id": item.get("id"),
            "title": item.get("title"),
            "artist": (item.get("artist") or {}).get("name"),
            "album": (item.get("album") or {}).get("title"),
            "confidence": round(confidence, 3),
        },
    }


def query_itunes(track, country):
    terms = " ".join([first_artist(track), track.get("name", "")]).strip()
    if not terms:
        return None
    params = {"term": terms, "media": "music", "entity": "song", "limit": 8, "country": country}
    data = get_json(f"{ITUNES_BASE}?{urlencode(params)}")
    best = best_match(data.get("results") or [], track, itunes_fields)
    if not best:
        return None
    confidence, item = best
    genre = item.get("primaryGenreName")
    return {
        "genres": [genre] if genre else [],
        "tags": [],
        "releaseDate": item.get("releaseDate"),
        "explicit": str(item.get("trackExplicitness") or "").lower() == "explicit",
        "previewUrl": item.get("previewUrl"),
        "match": {
            "source": "Apple iTunes Search API",
            "id": item.get("trackId"),
            "title": item.get("trackName"),
            "artist": item.get("artistName"),
            "album": item.get("collectionName"),
            "confidence": round(confidence, 3),
        },
    }


def query_musicbrainz(track):
    title = track.get("name", "")
    artist = first_artist(track)
    if not title or not artist:
        return None
    MUSICBRAINZ_LIMITER.wait()
    query = f'recording:"{lucene_escape(title)}" AND artist:"{lucene_escape(artist)}"'
    data = get_json(f"{MUSICBRAINZ_BASE}/recording?{urlencode({'query': query, 'fmt': 'json', 'limit': 5})}")
    candidates = data.get("recordings") or []
    best = best_match(candidates, track, musicbrainz_fields)
    if not best:
        return None
    confidence, item = best
    detail = get_musicbrainz_entity(
        "recording",
        item.get("id"),
        "genres+tags+artist-credits+releases+release-groups",
    )
    genres = []
    tags = []
    add_public_terms(genres, tags, item)
    add_public_terms(genres, tags, detail)

    for release_group_id in musicbrainz_release_group_ids(detail or item):
        release_group = get_musicbrainz_entity("release-group", release_group_id, "genres+tags")
        add_public_terms(genres, tags, release_group)

    for artist_id in musicbrainz_artist_ids(detail or item):
        artist_detail = get_musicbrainz_entity("artist", artist_id, "genres+tags")
        add_public_terms(genres, tags, artist_detail)

    return {
        "genres": unique(genres),
        "tags": unique(tags),
        "match": {
            "source": "MusicBrainz",
            "id": item.get("id"),
            "title": item.get("title"),
            "artist": musicbrainz_artist(item),
            "confidence": round(confidence, 3),
        },
    }


def best_match(candidates, track, field_reader):
    scored = []
    target_title = clean_title(track.get("name", ""))
    target_artist = normalize(first_artist(track))
    target_album = normalize(track.get("album", ""))
    for item in candidates:
        title, artist, album = field_reader(item)
        title_score = similarity(clean_title(title), target_title)
        artist_score = similarity(artist, target_artist)
        album_score = similarity(album, target_album) if target_album and album else 0.5
        confidence = title_score * 0.58 + artist_score * 0.32 + album_score * 0.10
        if title_score >= 0.67 and artist_score >= 0.48 and confidence >= 0.62:
            scored.append((confidence, item))
    return max(scored, default=None, key=lambda pair: pair[0])


def deezer_fields(item):
    return (
        item.get("title", ""),
        (item.get("artist") or {}).get("name", ""),
        (item.get("album") or {}).get("title", ""),
    )


def itunes_fields(item):
    return item.get("trackName", ""), item.get("artistName", ""), item.get("collectionName", "")


def musicbrainz_fields(item):
    return item.get("title", ""), musicbrainz_artist(item), first_release_title(item)


def musicbrainz_artist(item):
    return " ".join(
        credit.get("name", "")
        for credit in item.get("artist-credit") or []
        if isinstance(credit, dict)
    )


def first_release_title(item):
    releases = item.get("releases") or []
    return releases[0].get("title", "") if releases else ""


def get_musicbrainz_entity(entity, entity_id, inc):
    if not entity_id:
        return {}
    cache_key = (entity, str(entity_id), inc)
    with MUSICBRAINZ_ENTITY_LOCK:
        cached = MUSICBRAINZ_ENTITY_CACHE.get(cache_key)
    if cached is not None:
        return cached
    MUSICBRAINZ_LIMITER.wait()
    data = get_json(
        f"{MUSICBRAINZ_BASE}/{entity}/{quote(str(entity_id))}?{urlencode({'fmt': 'json', 'inc': inc})}"
    )
    with MUSICBRAINZ_ENTITY_LOCK:
        MUSICBRAINZ_ENTITY_CACHE[cache_key] = data
    return data


def add_public_terms(genres, tags, item):
    if not item:
        return
    genres.extend(collect_names(item.get("genres") or []))
    tags.extend(collect_names(item.get("tags") or []))


def musicbrainz_release_group_ids(item):
    ids = []
    for release in (item or {}).get("releases") or []:
        release_group = release.get("release-group") or {}
        release_group_id = release_group.get("id")
        if release_group_id and release_group_id not in ids:
            ids.append(release_group_id)
        if len(ids) >= 3:
            break
    return ids


def musicbrainz_artist_ids(item):
    ids = []
    for credit in (item or {}).get("artist-credit") or []:
        if not isinstance(credit, dict):
            continue
        artist = credit.get("artist") or {}
        artist_id = artist.get("id")
        if artist_id and artist_id not in ids:
            ids.append(artist_id)
        if len(ids) >= 3:
            break
    return ids


def analyze_preview(url):
    try:
        import librosa
        import numpy as np
    except ImportError:
        return {"source": "Official preview analysis", "error": "librosa unavailable"}

    suffix = Path(url.split("?", 1)[0]).suffix or ".mp3"
    request = Request(url, headers={"User-Agent": APP_UA, "Accept": "audio/*,*/*;q=0.8"})
    try:
        with urlopen(request, timeout=25) as response:
            audio_bytes = response.read(3_500_000)
    except (HTTPError, URLError, TimeoutError) as exc:
        return {"source": "Official preview analysis", "error": str(exc)}

    with tempfile.NamedTemporaryFile(suffix=suffix) as temp:
        temp.write(audio_bytes)
        temp.flush()
        try:
            y, sr = librosa.load(temp.name, sr=22050, mono=True, offset=2.0, duration=24.0)
        except Exception as exc:
            return {"source": "Official preview analysis", "error": f"decode: {exc}"}

    if y.size < sr * 4:
        return {"source": "Official preview analysis", "error": "preview too short"}
    y = librosa.util.normalize(y)
    onset = librosa.onset.onset_strength(y=y, sr=sr)
    tempo_values = librosa.feature.tempo(onset_envelope=onset, sr=sr)
    bpm = float(tempo_values[0]) if len(tempo_values) else 0.0
    if bpm and bpm < 70:
        bpm *= 2
    if bpm > 190:
        bpm /= 2

    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    chroma_mean = np.mean(chroma, axis=1)
    key, mode, key_score, margin = detect_key(chroma_mean, np)
    return {
        "source": "Deezer/Apple official 30-second preview analysis",
        "bpm": round(bpm, 2) if bpm else None,
        "tempoConfidence": "preview-analysis",
        "key": key,
        "mode": mode,
        "keyScore": round(key_score, 4),
        "keyMargin": round(margin, 4),
        "keyConfidence": "preview-analysis-high" if margin >= 0.08 else "preview-analysis",
        "sampleSeconds": round(len(y) / sr, 2),
    }


def detect_key(chroma, np):
    values = np.asarray(chroma, dtype=float)
    values = values / max(float(values.sum()), 1e-9)
    candidates = []
    for root in range(12):
        for mode, profile in (("major", MAJOR_PROFILE), ("minor", MINOR_PROFILE)):
            rotated = np.roll(np.asarray(profile, dtype=float), root)
            score = float(np.corrcoef(values, rotated)[0, 1])
            if math.isnan(score):
                score = -1.0
            candidates.append((score, root, mode))
    candidates.sort(reverse=True)
    best, second = candidates[0], candidates[1]
    return KEY_NAMES[best[1]], best[2], best[0], best[0] - second[0]


def get_json(url):
    request = Request(url, headers={"User-Agent": APP_UA, "Accept": "application/json"})
    try:
        with urlopen(request, timeout=22) as response:
            return json.loads(response.read().decode("utf-8"))
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError):
        return {}


def make_error_entry(track, exc):
    return {
        "trackId": str(track["id"]),
        "trackName": track.get("name", ""),
        "artists": track.get("artists") or [],
        "album": track.get("album", ""),
        "onlineGenres": [],
        "onlineTags": [],
        "styleTags": [],
        "sources": [],
        "matches": [],
        "tempo": {},
        "musicalKey": {},
        "beatGridAvailable": False,
        "confidence": "playlist+heuristic",
        "catalogMatchConfidence": 0,
        "error": str(exc),
        "catalogEnrichedAt": now_iso(),
        "fetchedAt": now_iso(),
    }


def catalog_confidence_label(score, sources, style_tags):
    if score >= 0.86 and sources and style_tags:
        return "online-high"
    if score >= 0.72 and sources:
        return "online-medium"
    if sources:
        return "online-low"
    return "playlist+heuristic"


def load_cache():
    if GENRE_CACHE.exists():
        data = json.loads(GENRE_CACHE.read_text(encoding="utf-8"))
        data.setdefault("tracks", {})
        return data
    return {"createdAt": now_iso(), "updatedAt": "", "tracks": {}}


def save_cache(cache):
    GENRE_CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")


def first_artist(track):
    artists = track.get("artists") or []
    return artists[0] if artists else ""


def clean_title(value):
    text = normalize(value)
    text = re.sub(r"\b(remaster(?:ed)?|version|edit|mix|radio|explicit|instrumental)\b.*$", "", text)
    return re.sub(r"\s+", " ", text).strip()


def normalize(value):
    return re.sub(r"\s+", " ", "".join(ch.lower() if ch.isalnum() else " " for ch in str(value or ""))).strip()


def similarity(left, right):
    left = normalize(left)
    right = normalize(right)
    if not left or not right:
        return 0.0
    if left == right:
        return 1.0
    return SequenceMatcher(None, left, right).ratio()


def collect_names(items):
    return [item["name"] for item in items if isinstance(item, dict) and item.get("name")]


def is_visible_track(track):
    return track.get("playable") is not False and track.get("hiddenFromRadio") is not True


def is_low_confidence_track(track):
    label = track.get("genreConfidence") or ""
    match_confidence = positive_number(track.get("catalogMatchConfidence"))
    if label in LOW_CONFIDENCE_LABELS:
        return True
    return match_confidence is None or match_confidence < 0.72


def unique(items):
    seen = set()
    result = []
    for item in items:
        value = str(item or "").strip()
        key = value.lower()
        if not value or key in seen:
            continue
        seen.add(key)
        result.append(value)
    return result


def positive_number(value):
    try:
        number = float(value)
        return number if math.isfinite(number) and number > 0 else None
    except (TypeError, ValueError):
        return None


def first_value(*values):
    return next((value for value in values if value not in (None, "")), None)


def first_non_none(*values):
    return next((value for value in values if value is not None), None)


def lucene_escape(value):
    return str(value).replace("\\", "\\\\").replace('"', '\\"')


def now_iso():
    return datetime.now().astimezone().isoformat(timespec="seconds")


if __name__ == "__main__":
    main()
