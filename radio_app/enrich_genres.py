#!/usr/bin/env python3
import argparse
import json
import os
import time
from datetime import datetime
from difflib import SequenceMatcher
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

from generate_library import DATA_JS, GENRE_CACHE, OUT, infer_style_tags, main as regenerate_library


APP_UA = "KevinCredoRadio/0.2 (local personal music library genre enrichment)"
MB_BASE = "https://musicbrainz.org/ws/2"
ITUNES_BASE = "https://itunes.apple.com/search"
LASTFM_BASE = "https://ws.audioscrobbler.com/2.0/"
DISCOGS_BASE = "https://api.discogs.com"


def main():
    parser = argparse.ArgumentParser(description="Enrich radio tracks with online genre metadata.")
    parser.add_argument("--limit", type=int, default=None, help="Maximum number of uncached tracks to process.")
    parser.add_argument("--offset", type=int, default=0, help="Skip this many tracks before processing.")
    parser.add_argument("--refresh", action="store_true", help="Refresh tracks that already have cached genre data.")
    parser.add_argument("--source", choices=("all", "musicbrainz", "itunes", "lastfm", "discogs"), default="all")
    parser.add_argument("--lastfm-api-key", default=os.environ.get("LASTFM_API_KEY", ""), help="Optional Last.fm API key for track.getTopTags.")
    parser.add_argument("--discogs-token", default=os.environ.get("DISCOGS_TOKEN", ""), help="Optional Discogs token for release style/genre search.")
    parser.add_argument("--musicbrainz-sleep", type=float, default=1.1, help="Seconds between MusicBrainz requests.")
    parser.add_argument("--itunes-sleep", type=float, default=0.35, help="Seconds between iTunes requests.")
    parser.add_argument("--lastfm-sleep", type=float, default=0.25, help="Seconds between Last.fm requests.")
    parser.add_argument("--discogs-sleep", type=float, default=1.0, help="Seconds between Discogs requests.")
    parser.add_argument("--country", default="US", help="iTunes storefront country code.")
    args = parser.parse_args()

    library = json.loads(OUT.read_text(encoding="utf-8"))
    cache = load_cache()
    tracks = library["tracks"][args.offset :]
    processed = 0

    for track in tracks:
        if args.limit is not None and processed >= args.limit:
            break
        track_id = track["id"]
        if not args.refresh and cache["tracks"].get(track_id, {}).get("fetchedAt"):
            continue

        entry = enrich_track(track, args)
        cache["tracks"][track_id] = entry
        cache["updatedAt"] = now_iso()
        save_cache(cache)
        processed += 1
        print(json.dumps({"processed": processed, "id": track_id, "name": track["name"], "genres": entry["onlineGenres"], "styles": entry["styleTags"]}, ensure_ascii=False))

    regenerate_library()
    print(json.dumps({"processed": processed, "cache": str(GENRE_CACHE), "library": str(OUT), "data_js": str(DATA_JS)}, ensure_ascii=False))


def enrich_track(track, args):
    raw_genres = []
    raw_tags = []
    sources = []
    matches = []
    tempo = {}
    musical_key = {}

    if args.source in ("all", "musicbrainz"):
        mb = query_musicbrainz(track)
        time.sleep(args.musicbrainz_sleep)
        if mb:
            raw_genres.extend(mb["genres"])
            raw_tags.extend(mb["tags"])
            sources.append("MusicBrainz")
            matches.append(mb["match"])

    if args.source in ("all", "itunes"):
        itunes = query_itunes(track, args.country)
        time.sleep(args.itunes_sleep)
        if itunes:
            raw_genres.extend(itunes["genres"])
            sources.append("Apple iTunes Search API")
            matches.append(itunes["match"])

    if args.source in ("all", "lastfm") and args.lastfm_api_key:
        lastfm = query_lastfm(track, args.lastfm_api_key)
        time.sleep(args.lastfm_sleep)
        if lastfm:
            raw_tags.extend(lastfm["tags"])
            sources.append("Last.fm")
            matches.append(lastfm["match"])

    if args.source in ("all", "discogs") and args.discogs_token:
        discogs = query_discogs(track, args.discogs_token)
        time.sleep(args.discogs_sleep)
        if discogs:
            raw_genres.extend(discogs["genres"])
            raw_tags.extend(discogs["tags"])
            sources.append("Discogs")
            matches.append(discogs["match"])

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
    confidence = "online+playlist" if sources and style_tags else "online-raw" if sources else "playlist+heuristic"

    return {
        "trackId": track["id"],
        "trackName": track.get("name", ""),
        "artists": track.get("artists") or [],
        "album": track.get("album", ""),
        "onlineGenres": sorted(unique(raw_genres)),
        "onlineTags": sorted(unique(raw_tags))[:30],
        "styleTags": style_tags,
        "sources": sources,
        "matches": matches,
        "tempo": tempo,
        "musicalKey": musical_key,
        "beatGridAvailable": False,
        "confidence": confidence,
        "fetchedAt": now_iso(),
    }


def query_musicbrainz(track):
    title = track.get("name", "")
    artist = first_artist(track)
    if not title or not artist:
        return None

    query = f'recording:"{lucene_escape(title)}" AND artist:"{lucene_escape(artist)}"'
    url = f"{MB_BASE}/recording?{urlencode({'query': query, 'fmt': 'json', 'limit': 5})}"
    data = get_json(url)
    recordings = data.get("recordings") or []
    best = best_musicbrainz_match(recordings, track)
    if not best:
        return None

    tags = collect_names(best.get("tags") or [])
    genres = collect_names(best.get("genres") or [])
    if best.get("id") and not (tags or genres):
        detail_url = f"{MB_BASE}/recording/{quote(best['id'])}?{urlencode({'inc': 'genres+tags+artist-credits+releases', 'fmt': 'json'})}"
        detail = get_json(detail_url)
        tags = collect_names(detail.get("tags") or [])
        genres = collect_names(detail.get("genres") or [])
        time.sleep(1.1)

    return {
        "genres": genres,
        "tags": tags,
        "match": {
            "source": "MusicBrainz",
            "id": best.get("id"),
            "title": best.get("title"),
            "score": best.get("score"),
        },
    }


def query_itunes(track, country):
    terms = " ".join([first_artist(track), track.get("name", ""), track.get("album", "")]).strip()
    if not terms:
        return None
    params = {
        "term": terms,
        "media": "music",
        "entity": "song",
        "limit": 5,
        "country": country,
    }
    data = get_json(f"{ITUNES_BASE}?{urlencode(params)}")
    results = data.get("results") or []
    best = best_itunes_match(results, track)
    if not best:
        return None
    genre = best.get("primaryGenreName")
    return {
        "genres": [genre] if genre else [],
        "tags": [],
        "match": {
            "source": "Apple iTunes Search API",
            "trackName": best.get("trackName"),
            "artistName": best.get("artistName"),
            "collectionName": best.get("collectionName"),
            "primaryGenreName": genre,
        },
    }


def query_lastfm(track, api_key):
    title = track.get("name", "")
    artist = first_artist(track)
    if not title or not artist:
        return None
    params = {
        "method": "track.getTopTags",
        "artist": artist,
        "track": title,
        "api_key": api_key,
        "format": "json",
        "autocorrect": 1,
    }
    data = get_json(f"{LASTFM_BASE}?{urlencode(params)}")
    tags = data.get("toptags", {}).get("tag") or []
    names = []
    for item in tags:
        name = item.get("name")
        count = int(item.get("count") or 0)
        if name and count >= 1:
            names.append(name)
    if not names:
        return None
    return {
        "genres": [],
        "tags": names[:30],
        "match": {
            "source": "Last.fm",
            "track": title,
            "artist": artist,
            "tagCount": len(names),
        },
    }


def query_discogs(track, token):
    title = track.get("name", "")
    artist = first_artist(track)
    if not title or not artist:
        return None
    params = {
        "q": " ".join([artist, title]),
        "type": "release",
        "per_page": 5,
        "token": token,
    }
    data = get_json(f"{DISCOGS_BASE}/database/search?{urlencode(params)}")
    results = data.get("results") or []
    best = best_discogs_match(results, track)
    if not best:
        return None
    genres = best.get("genre") or []
    styles = best.get("style") or []
    return {
        "genres": genres,
        "tags": styles,
        "match": {
            "source": "Discogs",
            "id": best.get("id"),
            "title": best.get("title"),
            "year": best.get("year"),
            "genres": genres,
            "styles": styles,
        },
    }


def best_musicbrainz_match(recordings, track):
    scored = []
    for item in recordings:
        score = int(item.get("score") or 0)
        score += int(100 * similarity(item.get("title", ""), track.get("name", "")))
        artists = " ".join((credit.get("name") or "") for credit in item.get("artist-credit") or [] if isinstance(credit, dict))
        score += int(70 * similarity(artists, first_artist(track)))
        scored.append((score, item))
    return max(scored, default=(0, None), key=lambda item: item[0])[1]


def best_itunes_match(results, track):
    scored = []
    for item in results:
        score = 100 * similarity(item.get("trackName", ""), track.get("name", ""))
        score += 70 * similarity(item.get("artistName", ""), first_artist(track))
        score += 25 * similarity(item.get("collectionName", ""), track.get("album", ""))
        scored.append((score, item))
    return max(scored, default=(0, None), key=lambda item: item[0])[1]


def best_discogs_match(results, track):
    scored = []
    title = track.get("name", "")
    artist = first_artist(track)
    album = track.get("album", "")
    for item in results:
        result_title = item.get("title", "")
        score = 65 * similarity(result_title, f"{artist} {album or title}")
        score += 65 * similarity(result_title, f"{artist} {title}")
        score += 25 * similarity(result_title, title)
        scored.append((score, item))
    best_score, best = max(scored, default=(0, None), key=lambda item: item[0])
    return best if best_score >= 55 else None


def get_json(url):
    request = Request(url, headers={"User-Agent": APP_UA, "Accept": "application/json"})
    try:
        with urlopen(request, timeout=20) as response:
            return json.loads(response.read().decode("utf-8"))
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as exc:
        print(json.dumps({"warning": str(exc), "url": url[:160]}, ensure_ascii=False))
        return {}


def load_cache():
    if GENRE_CACHE.exists():
        return json.loads(GENRE_CACHE.read_text(encoding="utf-8"))
    return {"createdAt": now_iso(), "updatedAt": "", "tracks": {}}


def save_cache(cache):
    GENRE_CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")


def collect_names(items):
    names = []
    for item in items:
        if isinstance(item, dict) and item.get("name"):
            names.append(item["name"])
    return names


def unique(items):
    seen = set()
    values = []
    for item in items:
        key = str(item).strip()
        if not key or key.lower() in seen:
            continue
        seen.add(key.lower())
        values.append(key)
    return values


def first_artist(track):
    artists = track.get("artists") or []
    return artists[0] if artists else ""


def similarity(left, right):
    left = normalize(left)
    right = normalize(right)
    if not left or not right:
        return 0.0
    return SequenceMatcher(None, left, right).ratio()


def normalize(value):
    return "".join(ch.lower() for ch in str(value) if ch.isalnum() or ch.isspace()).strip()


def lucene_escape(value):
    return str(value).replace("\\", "\\\\").replace('"', '\\"')


def now_iso():
    return datetime.now().astimezone().isoformat(timespec="seconds")


if __name__ == "__main__":
    main()
