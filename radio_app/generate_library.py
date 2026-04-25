#!/usr/bin/env python3
import json
import re
from collections import defaultdict
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "output" / "netease_music_archive" / "netease_created_playlists_archive.json"
OUT = Path(__file__).resolve().parent / "library.json"
DATA_JS = Path(__file__).resolve().parent / "library-data.js"
GENRE_CACHE = Path(__file__).resolve().parent / "genre_cache.json"


STYLE_LABELS = {
    "chill_downtempo": "Chill / Downtempo",
    "deep_house": "Deep House",
    "house": "House",
    "tech_house": "Tech House",
    "progressive_house": "Progressive House",
    "minimal": "Minimal",
    "melodic_house": "Melodic House",
    "afro_house": "Afro House",
    "disco_nu_disco": "Disco / Nu-Disco",
    "indie_dance": "Indie Dance",
    "edm": "EDM",
    "techno": "Techno",
    "acid_techno": "Acid Techno",
    "electronic": "Electronic",
    "rock": "Rock",
    "indie_rock": "Indie Rock",
    "pop": "Pop",
    "rnb_soul": "R&B / Soul",
    "hiphop_jazzhop": "Hip-hop / Jazz-hop",
    "jazz": "Jazz",
    "funk": "Funk",
    "ambient": "Ambient",
    "lofi": "Lo-fi",
    "retro_synth": "Retro / Synth",
    "classical": "Classical",
    "world_latin": "World / Latin",
    "holiday": "Holiday / Event",
}

STYLE_PATTERNS = [
    ("deep_house", ("deep house", "deephouse")),
    ("tech_house", ("tech house", "tech-house")),
    ("progressive_house", ("progressive house", "progressive")),
    ("melodic_house", ("melodic house", "melodic techno", "melodic")),
    ("afro_house", ("afro house", "afro-house", "afrobeat", "afrobeats", "amapiano")),
    ("acid_techno", ("acid techno", "acid house", "acid")),
    ("minimal", ("minimal", "high tech minimal", "boris brejcha")),
    ("disco_nu_disco", ("nu disco", "nu-disco", "disco", "french touch")),
    ("indie_dance", ("indie dance", "dark disco", "dance-punk")),
    ("techno", ("techno", "detroit techno")),
    ("house", ("house",)),
    ("edm", ("edm", "dance", "electro house", "big room", "future house", "dance-pop")),
    ("lofi", ("lo-fi", "lofi", "lo fi")),
    ("chill_downtempo", ("chill", "downtempo", "trip hop", "lounge", "bar", "late night", "sunset", "breezy", "slowdance")),
    ("ambient", ("ambient", "new age")),
    ("retro_synth", ("synth", "synthpop", "synth-pop", "retrowave", "new wave", "retro", "80s")),
    ("hiphop_jazzhop", ("hip hop", "hip-hop", "rap", "jazz hop", "jazzhop", "trap")),
    ("rnb_soul", ("r&b", "rnb", "soul", "neo soul", "neo-soul")),
    ("indie_rock", ("indie rock", "alternative rock", "alt rock")),
    ("rock", ("rock", "punk", "britpop", "hard rock", "classic rock")),
    ("jazz", ("jazz", "bossa nova", "swing")),
    ("funk", ("funk", "boogie")),
    ("world_latin", ("latin", "world", "reggae", "afrobeat", "samba")),
    ("classical", ("classical", "orchestral", "piano", "violin", "canon in d")),
    ("holiday", ("holiday", "christmas", "xmas", "nye")),
    ("pop", ("pop", "cantopop", "mandopop", "k-pop", "j-pop")),
    ("electronic", ("electronic", "electronica", "electronica/dance", "electronica & dance", "electronica dance")),
]

STYLE_BPM = {
    "ambient": 72,
    "classical": 78,
    "chill_downtempo": 92,
    "lofi": 84,
    "hiphop_jazzhop": 92,
    "rnb_soul": 96,
    "jazz": 104,
    "funk": 108,
    "world_latin": 112,
    "pop": 116,
    "rock": 126,
    "indie_rock": 128,
    "retro_synth": 116,
    "disco_nu_disco": 118,
    "indie_dance": 120,
    "afro_melodic": 122,
    "afro_house": 122,
    "deep_house": 122,
    "house": 124,
    "progressive_house": 124,
    "melodic_house": 124,
    "minimal": 125,
    "tech_house": 126,
    "techno": 128,
    "acid_techno": 128,
    "edm": 128,
    "electronic": 122,
    "holiday": 110,
}

STYLE_ENERGY = {
    "ambient": 0.25,
    "classical": 0.28,
    "lofi": 0.34,
    "chill_downtempo": 0.38,
    "jazz": 0.42,
    "rnb_soul": 0.46,
    "hiphop_jazzhop": 0.48,
    "pop": 0.55,
    "world_latin": 0.58,
    "funk": 0.62,
    "rock": 0.68,
    "indie_rock": 0.64,
    "retro_synth": 0.62,
    "disco_nu_disco": 0.70,
    "afro_melodic": 0.68,
    "afro_house": 0.70,
    "indie_dance": 0.72,
    "deep_house": 0.66,
    "house": 0.72,
    "progressive_house": 0.74,
    "melodic_house": 0.72,
    "minimal": 0.74,
    "tech_house": 0.78,
    "techno": 0.82,
    "acid_techno": 0.82,
    "edm": 0.86,
    "electronic": 0.64,
    "holiday": 0.52,
}

TAXONOMY_LABELS = {
    "genre": {
        "house": "House",
        "deep_house": "Deep House",
        "tech_house": "Tech House",
        "progressive_house": "Progressive House",
        "melodic_house": "Melodic House",
        "afro_house": "Afro House",
        "techno": "Techno",
        "acid_techno": "Acid Techno",
        "minimal": "Minimal",
        "nu_disco": "Nu-Disco",
        "indie_dance": "Indie Dance",
        "downtempo": "Downtempo",
        "ambient": "Ambient",
        "electronica": "Electronica",
        "edm": "EDM",
        "synthwave": "Synth / Retro",
        "lofi": "Lo-fi",
        "breakbeat": "Breakbeat",
        "garage": "Garage",
        "drum_bass": "Drum & Bass",
        "pop": "Pop",
        "indie_rock": "Indie Rock",
        "rock": "Rock",
        "rnb_soul": "R&B / Soul",
        "hiphop_rap": "Hip-hop / Rap",
        "jazz": "Jazz",
        "funk_soul": "Funk / Soul",
        "latin_world": "Latin / World",
        "classical": "Classical",
    },
    "mood": {
        "chill": "Chill",
        "groovy": "Groovy",
        "warm": "Warm",
        "euphoric": "Euphoric",
        "dark": "Dark",
        "hypnotic": "Hypnotic",
        "atmospheric": "Atmospheric",
        "dreamy": "Dreamy",
        "melancholic": "Melancholic",
        "romantic": "Romantic",
        "energetic": "Energetic",
        "playful": "Playful",
    },
    "context": {
        "club": "Club",
        "lounge": "Lounge",
        "night_drive": "Night Drive",
        "afterhours": "After Hours",
        "dinner": "Dinner",
        "focus": "Focus",
        "workout": "Workout",
        "sunset": "Sunset",
        "summer": "Summer",
        "travel": "Travel",
        "holiday": "Holiday",
    },
    "era": {
        "70s": "70s",
        "80s": "80s",
        "90s": "90s",
    },
}

TAXONOMY_ORDER = {
    "genre": [
        "house",
        "deep_house",
        "tech_house",
        "progressive_house",
        "melodic_house",
        "afro_house",
        "techno",
        "acid_techno",
        "minimal",
        "nu_disco",
        "indie_dance",
        "downtempo",
        "ambient",
        "electronica",
        "edm",
        "synthwave",
        "lofi",
        "breakbeat",
        "garage",
        "drum_bass",
        "pop",
        "indie_rock",
        "rock",
        "rnb_soul",
        "hiphop_rap",
        "jazz",
        "funk_soul",
        "latin_world",
        "classical",
    ],
    "mood": [
        "chill",
        "groovy",
        "warm",
        "euphoric",
        "dark",
        "hypnotic",
        "atmospheric",
        "dreamy",
        "melancholic",
        "romantic",
        "energetic",
        "playful",
    ],
    "context": [
        "club",
        "lounge",
        "night_drive",
        "afterhours",
        "dinner",
        "focus",
        "workout",
        "sunset",
        "summer",
        "travel",
        "holiday",
    ],
    "era": ["70s", "80s", "90s"],
}

STYLE_TO_TAXONOMY = {
    "chill_downtempo": {"genre": ["downtempo"], "mood": ["chill"], "context": ["lounge"]},
    "house": {"genre": ["house"], "mood": ["groovy"], "context": ["club"]},
    "deep_house": {"genre": ["deep_house", "house"], "mood": ["warm", "groovy"], "context": ["lounge", "club"]},
    "tech_house": {"genre": ["tech_house", "house"], "mood": ["groovy", "energetic"], "context": ["club"]},
    "progressive_house": {"genre": ["progressive_house", "house"], "mood": ["euphoric", "hypnotic"], "context": ["club"]},
    "melodic_house": {"genre": ["melodic_house", "house"], "mood": ["euphoric", "melancholic"], "context": ["club"]},
    "afro_melodic": {"genre": ["afro_house", "melodic_house"], "mood": ["warm", "groovy"], "context": ["sunset", "club"]},
    "afro_house": {"genre": ["afro_house", "house"], "mood": ["warm", "groovy"], "context": ["club"]},
    "disco_nu_disco": {"genre": ["nu_disco"], "mood": ["groovy", "playful"], "context": ["club"]},
    "indie_dance": {"genre": ["indie_dance"], "mood": ["dark", "groovy"], "context": ["club", "night_drive"]},
    "edm": {"genre": ["edm"], "mood": ["energetic", "euphoric"], "context": ["club", "workout"]},
    "techno": {"genre": ["techno"], "mood": ["dark", "hypnotic"], "context": ["club"]},
    "acid_techno": {"genre": ["acid_techno", "techno"], "mood": ["hypnotic", "energetic"], "context": ["club"]},
    "minimal": {"genre": ["minimal", "techno"], "mood": ["hypnotic"], "context": ["club", "afterhours"]},
    "electronic": {"genre": ["electronica"], "mood": [], "context": []},
    "ambient": {"genre": ["ambient"], "mood": ["atmospheric", "chill"], "context": ["focus"]},
    "lofi": {"genre": ["lofi"], "mood": ["chill", "dreamy"], "context": ["focus"]},
    "retro_synth": {"genre": ["synthwave"], "mood": ["dreamy"], "context": ["night_drive"]},
    "pop": {"genre": ["pop"], "mood": ["playful"], "context": []},
    "rock": {"genre": ["rock"], "mood": ["energetic"], "context": []},
    "indie_rock": {"genre": ["indie_rock", "rock"], "mood": ["melancholic"], "context": []},
    "rnb_soul": {"genre": ["rnb_soul"], "mood": ["romantic", "warm"], "context": ["dinner"]},
    "hiphop_jazzhop": {"genre": ["hiphop_rap"], "mood": ["groovy"], "context": []},
    "jazz": {"genre": ["jazz"], "mood": ["warm"], "context": ["dinner", "lounge"]},
    "funk": {"genre": ["funk_soul"], "mood": ["groovy", "warm"], "context": ["club"]},
    "world_latin": {"genre": ["latin_world"], "mood": ["warm", "groovy"], "context": ["summer"]},
    "classical": {"genre": ["classical"], "mood": ["atmospheric"], "context": ["focus"]},
    "holiday": {"genre": [], "mood": ["warm", "playful"], "context": ["holiday"]},
}

KEYWORD_TAXONOMY_RULES = {
    "genre": [
        ("progressive_house", ("progressive house", "progressive trance", "progressive")),
        ("melodic_house", ("melodic house", "melodic techno", "melodic")),
        ("deep_house", ("deep house", "deep-house")),
        ("tech_house", ("tech house", "tech-house")),
        ("afro_house", ("afro house", "afro-house", "organic house", "afrobeats", "afrobeat", "amapiano")),
        ("acid_techno", ("acid techno", "acid house", "acid")),
        ("minimal", ("minimal techno", "minimal", "high-tech minimal", "high tech minimal")),
        ("techno", ("detroit techno", "hard techno", "raw techno", "techno")),
        ("nu_disco", ("nu disco", "nu-disco", "disco", "french touch", "boogie")),
        ("indie_dance", ("indie dance", "dance-punk", "dark disco")),
        ("house", ("classic house", "vocal house", "garage house", "house")),
        ("breakbeat", ("breakbeat", "breaks", "big beat")),
        ("garage", ("uk garage", "2-step", "2 step", "garage")),
        ("drum_bass", ("drum and bass", "drum & bass", "dnb", "jungle")),
        ("downtempo", ("downtempo", "trip hop", "trip-hop", "lounge", "chillout")),
        ("ambient", ("ambient", "new age")),
        ("synthwave", ("synthwave", "synth-pop", "synth pop", "retrowave", "new wave")),
        ("lofi", ("lo-fi", "lofi", "lo fi")),
        ("edm", ("edm", "big room", "future house", "electro house", "dance-pop")),
        ("electronica", ("electronica", "electronic", "electro")),
        ("indie_rock", ("indie rock", "alternative rock", "alt rock")),
        ("rock", ("classic rock", "hard rock", "britpop", "punk", "rock")),
        ("rnb_soul", ("neo soul", "neo-soul", "r&b", "rnb", "soul")),
        ("hiphop_rap", ("hip hop", "hip-hop", "rap", "trap")),
        ("jazz", ("jazz", "bossa nova", "swing")),
        ("funk_soul", ("funk", "soul", "boogie")),
        ("latin_world", ("latin", "samba", "reggae", "world")),
        ("classical", ("classical", "orchestral", "piano", "violin")),
        ("pop", ("k-pop", "j-pop", "cantopop", "mandopop", "pop")),
    ],
    "mood": [
        ("chill", ("chill", "chillout", "mellow", "laid back", "laid-back", "soft", "calm")),
        ("groovy", ("groove", "groovy", "funky", "disco", "boogie")),
        ("warm", ("warm", "soulful", "organic", "sunny", "balearic")),
        ("euphoric", ("euphoric", "uplifting", "anthem", "hands up")),
        ("dark", ("dark", "noir", "industrial", "goth", "warehouse")),
        ("hypnotic", ("hypnotic", "minimal", "trance", "acid", "driving")),
        ("atmospheric", ("atmospheric", "ambient", "cinematic", "space", "ethereal")),
        ("dreamy", ("dreamy", "dream pop", "shoegaze", "nostalgic")),
        ("melancholic", ("melancholy", "melancholic", "sad", "blue", "heartbreak")),
        ("romantic", ("romantic", "love", "sexy", "slow jam")),
        ("energetic", ("energetic", "energy", "banger", "peak time", "peak-time", "rave")),
        ("playful", ("fun", "playful", "party", "happy")),
    ],
    "context": [
        ("club", ("club", "dancefloor", "dance floor", "dj set", "rave", "warehouse", "party")),
        ("lounge", ("lounge", "bar", "cafe", "cocktail", "hotel")),
        ("night_drive", ("night drive", "driving", "drive", "midnight", "neon")),
        ("afterhours", ("after hours", "afterhours", "late night", "late-night")),
        ("dinner", ("dinner", "supper", "restaurant", "date night")),
        ("focus", ("focus", "study", "work", "reading", "sleep")),
        ("workout", ("workout", "gym", "running", "run", "fitness")),
        ("sunset", ("sunset", "sunrise", "beach", "balearic")),
        ("summer", ("summer", "pool", "tropical")),
        ("travel", ("travel", "road trip", "journey")),
        ("holiday", ("christmas", "xmas", "holiday", "santa", "nye", "new year")),
    ],
}


def main():
    archive = json.loads(ARCHIVE.read_text(encoding="utf-8"))
    genre_cache = load_genre_cache()
    playlist_by_id = {p["playlist_id"]: p for p in archive["playlists"]}
    memberships = defaultdict(list)
    for row in archive["playlist_tracks"]:
        memberships[row["track_id"]].append(row["playlist_id"])

    tracks = []
    for track_id, track in archive["tracks"].items():
        playlist_ids = memberships.get(track_id, [])
        playlist_names = []
        archive_style_tags = set()
        in_liked_music = False
        created_playlist_count = 0

        for pid in playlist_ids:
            playlist = playlist_by_id.get(pid)
            if not playlist:
                continue
            if playlist.get("is_liked_music"):
                in_liked_music = True
            else:
                created_playlist_count += 1
                playlist_names.append(playlist.get("name", ""))
            archive_style_tags.update(playlist.get("inferred_style_tags") or [])

        cache_entry = genre_cache.get(track_id, {})
        online_genres = cache_entry.get("onlineGenres") or []
        online_tags = cache_entry.get("onlineTags") or []
        online_styles = set(cache_entry.get("styleTags") or [])
        text_for_styles = " ".join(
            [
                track.get("name", ""),
                " ".join(track.get("artists") or []),
                track.get("album", ""),
                " ".join(playlist_names),
                " ".join(online_genres),
                " ".join(online_tags),
            ]
        )
        style_tags = set(infer_style_tags(text_for_styles))
        style_tags.update(archive_style_tags)
        style_tags.update(online_styles)
        if not style_tags and online_genres:
            style_tags.add("pop")
        taxonomy = infer_taxonomy(track_id, style_tags, text_for_styles)
        tempo = cache_entry.get("tempo") or {}
        estimated_bpm = tempo.get("bpm") or estimate_bpm(track_id, style_tags)
        energy = estimate_energy(track_id, style_tags)
        musical_key = cache_entry.get("musicalKey") or {}

        tracks.append(
            {
                "id": track_id,
                "name": track.get("name", ""),
                "artists": track.get("artists", []),
                "album": track.get("album", ""),
                "durationMs": track.get("duration_ms"),
                "popularity": track.get("popularity"),
                "fee": track.get("fee"),
                "picUrl": track.get("pic_url", ""),
                "styleTags": sorted(style_tags),
                "styleLabels": [STYLE_LABELS.get(tag, tag.replace("_", " ").title()) for tag in sorted(style_tags)],
                "taxonomy": taxonomy,
                "estimatedBpm": int(round(estimated_bpm)),
                "tempoConfidence": tempo.get("confidence") or "genre-estimated",
                "tempoSources": tempo.get("sources") or [],
                "musicalKey": musical_key.get("key") or "",
                "mode": musical_key.get("mode") or "",
                "keyConfidence": musical_key.get("confidence") or "",
                "keySources": musical_key.get("sources") or [],
                "energy": energy,
                "beatGridAvailable": bool(cache_entry.get("beatGridAvailable")),
                "onlineGenres": sorted(set(online_genres)),
                "onlineTags": sorted(set(online_tags))[:18],
                "genreSources": cache_entry.get("sources") or [],
                "genreConfidence": cache_entry.get("confidence", "playlist+heuristic"),
                "playlistNames": sorted(set(name for name in playlist_names if name)),
                "playlistCount": len(playlist_ids),
                "createdPlaylistCount": created_playlist_count,
                "inLikedMusic": in_liked_music,
            }
        )

    tracks.sort(key=lambda item: (item["name"].lower(), ",".join(item["artists"]), item["id"]))
    payload = {
        "generatedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        "sourceArchiveGeneratedAt": archive.get("generated_at"),
        "scope": archive.get("scope", {}),
        "trackCount": len(tracks),
        "tracks": tracks,
        "styleStats": make_style_stats(tracks),
        "styleLabels": STYLE_LABELS,
        "taxonomyStats": make_taxonomy_stats(tracks),
        "taxonomyLabels": TAXONOMY_LABELS,
        "topArtists": archive.get("analysis", {}).get("top_artists", [])[:30],
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    DATA_JS.write_text(
        "window.RADIO_LIBRARY = "
        + json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    print(json.dumps({"tracks": len(tracks), "out": str(OUT), "data_js": str(DATA_JS)}, ensure_ascii=False))


def load_genre_cache():
    if not GENRE_CACHE.exists():
        return {}
    data = json.loads(GENRE_CACHE.read_text(encoding="utf-8"))
    return data.get("tracks", {})


def infer_style_tags(text):
    lower = text.lower()
    styles = []
    for tag, needles in STYLE_PATTERNS:
        if any(needle in lower for needle in needles):
            styles.append(tag)
    if "house" in styles and "electronic" not in styles:
        styles.append("electronic")
    if any(tag in styles for tag in ("techno", "acid_techno", "minimal")) and "electronic" not in styles:
        styles.append("electronic")
    return sorted(set(styles))


def infer_taxonomy(track_id, style_tags, text):
    taxonomy = {"genre": [], "mood": [], "context": [], "era": []}
    lower = text.lower()
    for tag in style_tags:
        mapping = STYLE_TO_TAXONOMY.get(tag)
        if not mapping:
            continue
        for dimension, values in mapping.items():
            add_many(taxonomy[dimension], values)

    for dimension, rules in KEYWORD_TAXONOMY_RULES.items():
        for key, needles in rules:
            if any(needle in lower for needle in needles):
                add_unique(taxonomy[dimension], key)

    bpm = estimate_bpm(track_id, style_tags)
    energy = estimate_energy(track_id, style_tags)
    genres = set(taxonomy["genre"])
    if genres.intersection({"house", "techno", "edm", "nu_disco"}) and bpm >= 118:
        add_unique(taxonomy["context"], "club")
    if bpm >= 124 and energy >= 0.72:
        add_unique(taxonomy["mood"], "energetic")
    if energy <= 0.42:
        add_unique(taxonomy["mood"], "chill")
    if genres.intersection({"ambient", "downtempo", "lofi"}) and not taxonomy["context"]:
        add_unique(taxonomy["context"], "focus")

    infer_era_tags(lower, taxonomy["era"])
    sort_taxonomy(taxonomy)
    return taxonomy


def infer_era_tags(text, target):
    rules = (
        (r"\b(70s|1970s|197[0-9]|seventies)\b", "70s"),
        (r"\b(80s|1980s|198[0-9]|eighties)\b", "80s"),
        (r"\b(90s|1990s|199[0-9]|nineties)\b", "90s"),
    )
    for pattern, key in rules:
        if re.search(pattern, text):
            add_unique(target, key)


def sort_taxonomy(taxonomy):
    for dimension, values in taxonomy.items():
        order = TAXONOMY_ORDER.get(dimension, [])
        values.sort(key=lambda item: order.index(item) if item in order else len(order))


def add_many(target, values):
    for value in values or []:
        add_unique(target, value)


def add_unique(target, value):
    if value and value not in target:
        target.append(value)


def make_style_stats(tracks):
    counts = defaultdict(int)
    for track in tracks:
        for tag in track["styleTags"]:
            counts[tag] += 1
    return sorted(counts.items(), key=lambda item: (-item[1], STYLE_LABELS.get(item[0], item[0])))


def make_taxonomy_stats(tracks):
    stats = {}
    for dimension in ("genre", "mood", "context", "era"):
        counts = defaultdict(int)
        for track in tracks:
            for tag in track.get("taxonomy", {}).get(dimension, []):
                counts[tag] += 1
        order = TAXONOMY_ORDER.get(dimension, [])
        stats[dimension] = sorted(
            counts.items(),
            key=lambda item: (
                order.index(item[0]) if item[0] in order else len(order),
                -item[1],
                TAXONOMY_LABELS.get(dimension, {}).get(item[0], item[0]),
            ),
        )
    return stats


def estimate_bpm(track_id, style_tags):
    if not style_tags:
        base = 112
    else:
        bpms = [STYLE_BPM.get(tag, 112) for tag in style_tags]
        base = sum(bpms) / len(bpms)
    jitter = (stable_int(track_id) % 7) - 3
    return int(round(max(62, min(132, base + jitter))))


def estimate_energy(track_id, style_tags):
    if not style_tags:
        base = 0.5
    else:
        values = [STYLE_ENERGY.get(tag, 0.5) for tag in style_tags]
        base = sum(values) / len(values)
    jitter = ((stable_int(track_id) // 7) % 9 - 4) / 100
    return round(max(0.15, min(0.95, base + jitter)), 2)


def stable_int(value):
    text = str(value)
    acc = 0
    for ch in text:
        acc = (acc * 33 + ord(ch)) % 1000003
    return acc


if __name__ == "__main__":
    main()
