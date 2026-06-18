#!/usr/bin/env python3
"""Rebuild Echo Room FM primary genre tags.

The library keeps noisy raw genre candidates from public catalogs and playlist
heuristics. This pass turns those candidates into at most three primary genres
per track, then makes taxonomy.genre use that stricter list.
"""

from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parent
LIBRARY_JSON = ROOT / "library.json"
LIBRARY_DATA_JS = ROOT / "library-data.js"
AUDIT_JSON = ROOT / "primary_genre_audit.json"
VERSION = "primary-genres-v2-20260619"

GENRE_ORDER = [
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
]

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
}

STYLE_GENRE_WEIGHTS = {
    "chill_downtempo": [("downtempo", 6.0)],
    "house": [("house", 6.0)],
    "deep_house": [("deep_house", 7.5), ("house", 2.5)],
    "tech_house": [("tech_house", 7.5), ("house", 2.5)],
    "progressive_house": [("progressive_house", 7.5), ("house", 2.0)],
    "melodic_house": [("melodic_house", 7.5), ("house", 2.0)],
    "afro_melodic": [("afro_house", 6.5), ("melodic_house", 4.0)],
    "afro_house": [("afro_house", 7.5), ("house", 2.0)],
    "disco_nu_disco": [("nu_disco", 7.0)],
    "indie_dance": [("indie_dance", 7.0), ("electronica", 1.5)],
    "edm": [("edm", 7.0)],
    "techno": [("techno", 7.0)],
    "acid_techno": [("acid_techno", 8.0), ("techno", 2.5)],
    "minimal": [("minimal", 8.0), ("techno", 2.5)],
    "electronic": [("electronica", 5.0)],
    "ambient": [("ambient", 8.0), ("downtempo", 1.0)],
    "lofi": [("lofi", 8.0)],
    "retro_synth": [("synthwave", 7.0), ("pop", 1.0)],
    "pop": [("pop", 6.0)],
    "rock": [("rock", 6.0)],
    "indie_rock": [("indie_rock", 7.0), ("rock", 2.0)],
    "rnb_soul": [("rnb_soul", 8.0)],
    "hiphop_jazzhop": [("hiphop_rap", 8.0), ("lofi", 1.5)],
    "jazz": [("jazz", 8.0)],
    "funk": [("funk_soul", 7.5), ("nu_disco", 1.5)],
    "world_latin": [("latin_world", 7.5)],
    "classical": [("classical", 7.5)],
    "holiday": [],
}

ONLINE_GENRE_RULES = [
    ("deep_house", 10.0, ("deep house", "deep-house")),
    ("tech_house", 10.0, ("tech house", "tech-house", "deep tech", "minimal house")),
    ("progressive_house", 10.0, ("progressive house", "progressive trance")),
    ("melodic_house", 9.5, ("melodic house", "melodic techno")),
    ("afro_house", 9.5, ("afro house", "afro-house", "organic house", "organic electronic", "afro tech", "tribal house", "amapiano")),
    ("acid_techno", 10.0, ("acid techno", "acid house")),
    ("minimal", 9.5, ("minimal techno", "microhouse", "minimal house", "high-tech minimal", "high tech minimal")),
    ("techno", 8.5, ("detroit techno", "raw techno", "techno")),
    ("nu_disco", 9.0, ("nu disco", "nu-disco", "disco house", "filter house", "italo disco", "deep disco", "french touch")),
    ("indie_dance", 8.5, ("alt dance", "alternative dance", "indie dance", "indie electronic", "indietronica", "dance-punk", "electroclash", "new rave")),
    ("house", 8.0, ("classic house", "vocal house", "garage house", "dance house", "house")),
    ("breakbeat", 8.5, ("breakbeat", "breaks", "big beat")),
    ("garage", 8.5, ("future garage", "uk garage", "2-step", "2 step", "garage")),
    ("drum_bass", 9.5, ("drum and bass", "drum & bass", "dnb", "jungle")),
    ("downtempo", 8.5, ("downtempo", "trip hop", "trip-hop", "chillout", "balearic", "lounge")),
    ("ambient", 8.5, ("ambient", "new age", "soundscape", "drone")),
    ("synthwave", 8.0, ("synthwave", "synth-pop", "synth pop", "synthpop", "retrowave", "new wave", "technopop")),
    ("lofi", 8.5, ("lo-fi", "lofi", "lo fi", "study beats")),
    ("edm", 7.5, ("edm", "big room", "future house", "electro house", "dance-pop")),
    ("electronica", 7.0, ("leftfield", "idm", "glitch", "electronica", "electronic", "electro")),
    ("indie_rock", 8.0, ("indie rock", "alternative rock", "alt rock", "shoegaze", "brit pop", "britpop")),
    ("rock", 7.0, ("classic rock", "hard rock", "punk", "rock")),
    ("rnb_soul", 9.0, ("neo soul", "neo-soul", "r&b", "rnb", "soul")),
    ("hiphop_rap", 9.0, ("hip hop", "hip-hop", "rap", "trap")),
    ("jazz", 9.0, ("nu jazz", "soul jazz", "jazz fusion", "latin jazz", "smooth jazz", "acid jazz", "bossa nova", "bebop", "swing", "jazz")),
    ("funk_soul", 8.5, ("jazz-funk", "jazz funk", "funk", "boogie")),
    ("latin_world", 8.5, ("latin", "samba", "reggae", "cumbia", "tropical", "world", "bossa nova")),
    ("classical", 9.0, ("classical", "orchestral", "symphony", "concerto", "neo-classical", "neoclassical")),
    ("pop", 7.0, ("indie pop", "electropop", "electro pop", "synth pop", "synth-pop", "k-pop", "j-pop", "cantopop", "mandopop", "pop")),
]

BROAD_ONLINE_GENRES = {
    "dance": [("electronica", 4.0), ("house", 2.5), ("edm", 2.5)],
    "dance & edm": [("edm", 5.0), ("house", 2.5), ("electronica", 2.5)],
    "electronic": [("electronica", 8.0)],
    "electronica": [("electronica", 8.0)],
    "rap/hip hop": [("hiphop_rap", 10.0)],
    "rap / hip hop": [("hiphop_rap", 10.0)],
    "hip-hop/rap": [("hiphop_rap", 10.0)],
    "hip hop": [("hiphop_rap", 10.0)],
    "r&b": [("rnb_soul", 10.0)],
    "rnb": [("rnb_soul", 10.0)],
    "soul & funk": [("funk_soul", 9.0), ("rnb_soul", 4.0)],
    "funk": [("funk_soul", 9.0)],
    "jazz": [("jazz", 10.0)],
    "rock": [("rock", 8.5)],
    "alternative": [("indie_rock", 5.0), ("rock", 3.0)],
    "pop": [("pop", 8.0)],
    "classical": [("classical", 10.0)],
    "latin": [("latin_world", 9.0)],
    "world": [("latin_world", 7.0)],
    "holiday": [],
    "vocal": [],
}

JP_OR_CN_BROAD_GENRES = [
    (re.compile(r"(ポップス|流行|華語|国语|粤语|j-pop|k-pop)", re.I), [("pop", 8.0)]),
    (re.compile(r"(エレクトロ|電子)", re.I), [("electronica", 8.0)]),
    (re.compile(r"(ダンス)", re.I), [("electronica", 4.0), ("edm", 3.0), ("house", 2.0)]),
    (re.compile(r"(ヒップホップ|饒舌|说唱)", re.I), [("hiphop_rap", 10.0)]),
    (re.compile(r"(ジャズ|爵士)", re.I), [("jazz", 10.0)]),
    (re.compile(r"(ロック|摇滚)", re.I), [("rock", 8.0)]),
    (re.compile(r"(クラシック|古典)", re.I), [("classical", 10.0)]),
]

ARTIST_PRIMARY_RULES = [
    (("hot chip",), ("indie_dance", "electronica", "synthwave")),
    (("zhu", "nicolas jaar", "darkside"), ("electronica", "downtempo")),
    (("fred again..", "jamie xx", "floating points", "jon hopkins", "romy"), ("electronica", "house")),
    (("xique-xique", "kyong sono", "kora (ca)", "mita gami", "antaares", "maz", "vxsion"), ("afro_house", "downtempo")),
    (("gorgon city", "hot since 82", "john summit", "chris lake", "oliver heldens"), ("house",)),
    (("lane 8", "sultan + shepard", "deadmau5", "tiesto"), ("progressive_house", "edm")),
    (("layton giordani", "hi-lo", "julian jeweil", "mathew jonson", "dusty kid"), ("techno",)),
    (("boris brejcha",), ("minimal", "techno")),
    (("the chemical brothers", "skrillex"), ("electronica", "edm")),
    (("hvob", "bob moses", "monolink", "whomadewho", "kerala dust", "rufus du sol"), ("indie_dance", "electronica")),
    (("l'imperatrice", "lewis ofman", "tame impala", "channel tres"), ("nu_disco", "indie_dance")),
    (("kaytranada", "kaytramine", "pharrell williams"), ("funk_soul", "hiphop_rap")),
    (("ed sheeran", "jason mraz", "lauv", "justin bieber", "charlie puth", "taylor swift", "selena gomez", "ellie goulding", "coldplay", "maroon 5", "finneas"), ("pop",)),
    (("john legend", "erykah badu", "tinashe", "jeff bernat", "miso", "the marias"), ("rnb_soul",)),
    (("kendrick lamar", "drake", "future", "travis scott", "rich brian", "n.w.a", "amine", "a$ap rocky", "asap rocky"), ("hiphop_rap",)),
    (("oasis", "radiohead", "green day", "fleetwood mac", "bob dylan", "the velvet underground", "liam gallagher"), ("rock",)),
    (("clairo", "cuco", "billie eilish", "the xx", "bahamas", "novo amor", "damien rice"), ("indie_rock", "pop")),
    (("norah jones", "pink martini", "kokoroko", "jacob collier", "larry carlton", "berlioz", "melody gardot", "kamasi washington", "alfa mist", "john coltrane"), ("jazz",)),
    (("olafur arnalds", "rene aubry", "ozymandias", "hans zimmer"), ("classical", "ambient")),
    (("michael mayer", "gui boratto", "ben bohmer", "marsh", "coeus"), ("progressive_house", "melodic_house")),
    (("sam paganini", "tale of us", "fisher", "kydus", "dennis cruz"), ("techno", "house")),
    (("massive attack", "the blaze", "pantha du prince", "yosi horikawa", "koan sound", "high tone"), ("electronica", "downtempo")),
    (("fkj", "rhye", "paradis", "darius", "moullinex", "hercules & love affair", "laid back"), ("nu_disco", "funk_soul")),
    (("sapientdream", "shiloh dynasty", "rook1e", "timmies", "snow", "teqkoi", "kina", "malte marten"), ("lofi",)),
    (("keshi", "sofi de la torre", "safia"), ("rnb_soul", "pop")),
    (("boy harsher",), ("synthwave", "indie_dance")),
    (("glass beams",), ("funk_soul", "latin_world")),
    (("black loops", "umami", "haze-m", "deeptone"), ("deep_house", "house")),
    (("delta funktionen", "nina kraviz"), ("techno",)),
    (("tinlicker",), ("progressive_house", "melodic_house")),
    (("bicep", "yaeji", "soulwax"), ("house", "electronica")),
    (("pet shop boys",), ("synthwave", "pop")),
    (("polo & pan", "zimmer"), ("nu_disco", "electronica")),
    (("alesso", "kream"), ("edm", "house")),
    (("breakbot", "skylar spence", "madeon", "lemarquis"), ("nu_disco", "funk_soul")),
    (("morttagua", "olivier giacomotto", "artfaq", "township rebellion"), ("progressive_house", "melodic_house")),
    (("tchami", "james hype", "jorkes"), ("tech_house", "house")),
    (("galate", "floog", "mahony"), ("minimal", "techno")),
    (("alkalino", "ron hardy", "dirty channels"), ("nu_disco", "house")),
    (("tronicbox",), ("synthwave", "pop")),
    (("sango", "elyonbeats"), ("hiphop_rap", "rnb_soul")),
]

STRICT_JAZZ_ARTISTS = {
    "alfa mist",
    "berlioz",
    "bobby caldwell",
    "craig ruhnke",
    "ella fitzgerald",
    "emma-jean thackray",
    "halie loren",
    "jacob collier",
    "john coltrane",
    "kamasi washington",
    "kokoroko",
    "larry carlton",
    "melody gardot",
    "nat king cole",
    "norah jones",
    "pink martini",
    "tom misch",
}

JAZZ_DISQUALIFYING_ARTISTS = {
    "bob moses",
}

JAZZ_DISQUALIFYING_STYLES = {
    "hiphop_jazzhop",
    "house",
    "deep_house",
    "tech_house",
    "progressive_house",
    "melodic_house",
    "afro_house",
    "disco_nu_disco",
    "edm",
    "electronic",
    "techno",
    "acid_techno",
    "minimal",
    "indie_dance",
    "holiday",
}

HOLIDAY_RE = re.compile(r"\b(christmas|xmas|santa|holiday|noel|mistletoe|jingle|carol)\b", re.I)
TOKEN_SPLIT_RE = re.compile(r"[^a-z0-9#+&./-]+")
CLASSICAL_ARTISTS = {
    "christophe beck",
    "hans zimmer",
    "lorne balfe",
    "olafur arnalds",
    "peter broderick",
    "rene aubry",
    "ozymandias",
    "justin hurwitz",
    "tim simonec",
}


def main() -> None:
    payload = json.loads(LIBRARY_JSON.read_text(encoding="utf-8"))
    tracks = payload["tracks"]
    audit_rows = []
    visible_changed = 0
    visible_total = 0

    for track in tracks:
        original = unique(track.get("genreCandidates") or (track.get("taxonomy") or {}).get("genre") or [])
        primary, score_snapshot, reason = classify_primary_genres(track, original)
        taxonomy = normalize_taxonomy(track.get("taxonomy") or {})
        taxonomy["genre"] = primary
        track["taxonomy"] = taxonomy
        track["primaryGenres"] = primary
        track["primaryGenreVersion"] = VERSION
        track["genreCandidates"] = original
        if track.get("playable") is not False and track.get("hiddenFromRadio") is not True:
            visible_total += 1
            if original != primary:
                visible_changed += 1
        audit_rows.append({
            "id": str(track.get("id", "")),
            "name": track.get("name", ""),
            "artists": track.get("artists") or [],
            "playable": track.get("playable") is not False,
            "hiddenFromRadio": track.get("hiddenFromRadio") is True,
            "before": original,
            "after": primary,
            "reason": reason,
            "topScores": score_snapshot[:8],
            "onlineGenres": track.get("onlineGenres") or [],
            "onlineTags": (track.get("onlineTags") or [])[:18],
            "styleTags": track.get("styleTags") or [],
        })

    payload["primaryGenreVersion"] = VERSION
    payload["primaryGenreUpdatedAt"] = datetime.now().astimezone().isoformat(timespec="seconds")
    payload["taxonomyStats"] = make_taxonomy_stats(tracks)
    LIBRARY_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    LIBRARY_DATA_JS.write_text(
        "window.RADIO_LIBRARY = "
        + json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )

    visible_tracks = [track for track in tracks if track.get("playable") is not False and track.get("hiddenFromRadio") is not True]
    audit = {
        "version": VERSION,
        "updatedAt": payload["primaryGenreUpdatedAt"],
        "trackCount": len(tracks),
        "frontendPlayableTrackCount": visible_total,
        "changedFrontendPlayableTrackCount": visible_changed,
        "maxGenreCount": max((len((track.get("taxonomy") or {}).get("genre") or []) for track in visible_tracks), default=0),
        "genreCounts": Counter(
            genre
            for track in visible_tracks
            for genre in (track.get("taxonomy") or {}).get("genre") or []
        ).most_common(),
        "changedSamples": [row for row in audit_rows if row["playable"] and not row["hiddenFromRadio"] and row["before"] != row["after"]][:80],
        "rows": audit_rows,
    }
    AUDIT_JSON.write_text(json.dumps(audit, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({
        "version": VERSION,
        "tracks": len(tracks),
        "frontendPlayable": visible_total,
        "changedFrontendPlayable": visible_changed,
        "audit": str(AUDIT_JSON),
    }, ensure_ascii=False))


def classify_primary_genres(track: dict, original: list[str]) -> tuple[list[str], list[dict], str]:
    scores: dict[str, float] = defaultdict(float)
    evidence: dict[str, list[str]] = defaultdict(list)

    def bump(genre: str, amount: float, source: str) -> None:
        if genre not in GENRE_ORDER or amount <= 0:
            return
        scores[genre] += amount
        if len(evidence[genre]) < 4:
            evidence[genre].append(source)

    original_weight = 1.6 if len(original) <= 3 else 0.55
    for index, genre in enumerate(original):
        bump(genre, max(0.2, original_weight - index * 0.05), "previous taxonomy")

    style_tags = unique(track.get("styleTags") or [])
    if len(style_tags) <= 3:
        style_factor = 1.0
    elif len(style_tags) <= 6:
        style_factor = 0.65
    else:
        style_factor = 0.28
    for tag in style_tags:
        for genre, weight in STYLE_GENRE_WEIGHTS.get(tag, []):
            bump(genre, weight * style_factor, f"style:{tag}")

    for term in unique(track.get("onlineGenres") or []):
        apply_online_term(term, 1.15, bump, f"online genre:{term}")
    for term in unique(track.get("onlineTags") or []):
        apply_online_term(term, 0.9, bump, f"online tag:{term}")

    for needles, genres in ARTIST_PRIMARY_RULES:
        if artist_rule_matches(track.get("artists") or [], needles):
            for offset, genre in enumerate(genres):
                bump(genre, 7.0 - offset * 0.8, "artist profile")

    apply_title_mix_hints(track, bump)
    apply_relationship_adjustments(scores)

    if not has_strict_jazz_signal(track):
        scores.pop("jazz", None)
        evidence.pop("jazz", None)
    if not has_classical_signal(track):
        scores.pop("classical", None)
        evidence.pop("classical", None)

    ranked = rank_scores(scores)
    selected = prune_redundant_genres(track, ranked)
    if not selected:
        selected = fallback_genres(track, original)
        reason = "fallback"
    else:
        reason = "scored"

    selected = selected[:3]
    snapshot = [
        {"genre": genre, "score": round(score, 2), "evidence": evidence.get(genre, [])}
        for genre, score in ranked
    ]
    return selected, snapshot, reason


def apply_online_term(term: str, source_weight: float, bump, source: str) -> None:
    normalized = normalize_text(term)
    if not normalized:
        return
    broad_hit = False
    if normalized in BROAD_ONLINE_GENRES:
        broad_hit = True
        for genre, amount in BROAD_ONLINE_GENRES[normalized]:
            bump(genre, amount * source_weight, source)
    for pattern, genres in JP_OR_CN_BROAD_GENRES:
        if pattern.search(term):
            broad_hit = True
            for genre, amount in genres:
                bump(genre, amount * source_weight, source)
    if broad_hit:
        return
    for genre, weight, needles in ONLINE_GENRE_RULES:
        if any(term_matches(normalized, needle) for needle in needles):
            bump(genre, weight * source_weight, source)


def apply_title_mix_hints(track: dict, bump) -> None:
    title = normalize_text(track.get("name", ""))
    album = normalize_text(track.get("album", ""))
    playlist = normalize_text(" ".join(track.get("playlistNames") or []))
    text = " ".join([title, album, playlist])
    if "original mix" in title or "extended mix" in title or "club mix" in title:
        bump("house", 1.2, "mix title")
        bump("electronica", 0.8, "mix title")
    if "remix" in title or "edit" in title or "rework" in title:
        bump("electronica", 0.8, "mix title")
    if any(word in text for word in ("chill bar", "lounge", "cocktail", "cafe", "café")):
        bump("downtempo", 0.7, "playlist context")
    if any(word in text for word in ("deep house", "progressive", "melodic")):
        apply_online_term(text, 0.25, bump, "playlist context")


def apply_relationship_adjustments(scores: dict[str, float]) -> None:
    if scores.get("deep_house", 0) >= 6 or scores.get("tech_house", 0) >= 6:
        scores["house"] *= 0.75
    if scores.get("progressive_house", 0) >= 6 or scores.get("melodic_house", 0) >= 6 or scores.get("afro_house", 0) >= 6:
        scores["house"] *= 0.72
    if scores.get("acid_techno", 0) >= 6 or scores.get("minimal", 0) >= 6:
        scores["techno"] *= 0.75
    if scores.get("indie_rock", 0) >= 6:
        scores["rock"] *= 0.75
    if scores.get("lofi", 0) >= 7 and scores.get("hiphop_rap", 0) < scores.get("lofi", 0):
        scores["hiphop_rap"] *= 0.65
    if scores.get("electronica", 0) >= 9 and scores.get("edm", 0) < 8:
        scores["edm"] *= 0.7


def rank_scores(scores: dict[str, float]) -> list[tuple[str, float]]:
    order_index = {genre: index for index, genre in enumerate(GENRE_ORDER)}
    return sorted(
        ((genre, score) for genre, score in scores.items() if score >= 1.8),
        key=lambda item: (-item[1], order_index.get(item[0], len(order_index))),
    )


def prune_redundant_genres(track: dict, ranked: list[tuple[str, float]]) -> list[str]:
    selected: list[str] = []
    high_score = ranked[0][1] if ranked else 0
    threshold = 4.5 if high_score >= 8 else 2.6
    for genre, score in ranked:
        if score < threshold and selected:
            continue
        if is_redundant_with_selected(genre, score, selected, dict(ranked)):
            continue
        if conflicts_with_track_context(track, genre):
            continue
        selected.append(genre)
        if len(selected) >= 3:
            break
    return selected


def is_redundant_with_selected(genre: str, score: float, selected: list[str], score_map: dict[str, float]) -> bool:
    if genre == "house" and any(item in selected for item in ("deep_house", "tech_house", "progressive_house", "melodic_house", "afro_house")):
        return score < score_map.get(selected[0], 0) + 4
    if genre == "techno" and any(item in selected for item in ("acid_techno", "minimal")):
        return score < score_map.get(selected[0], 0) + 4
    if genre == "rock" and "indie_rock" in selected:
        return score < score_map.get("indie_rock", 0) + 3
    if genre == "pop" and any(item in selected for item in ("synthwave", "rnb_soul", "indie_rock")) and score < 8:
        return True
    if genre == "electronica" and any(item in selected for item in ("indie_dance", "synthwave", "ambient", "breakbeat")) and score < 9:
        return True
    return False


def conflicts_with_track_context(track: dict, genre: str) -> bool:
    if genre == "jazz" and not has_strict_jazz_signal(track):
        return True
    if genre == "classical" and not has_classical_signal(track):
        return True
    return False


def fallback_genres(track: dict, original: list[str]) -> list[str]:
    clean_original = [genre for genre in original if genre in GENRE_ORDER and not conflicts_with_track_context(track, genre)]
    if clean_original:
        return prune_redundant_genres(track, [(genre, 4.0) for genre in clean_original]) or clean_original[:3]
    for tag in unique(track.get("styleTags") or []):
        mapped = [genre for genre, _ in STYLE_GENRE_WEIGHTS.get(tag, []) if not conflicts_with_track_context(track, genre)]
        if mapped:
            return mapped[:3]
    return ["pop"]


def has_strict_jazz_signal(track: dict) -> bool:
    if is_holiday_track(track):
        return False
    artists = [normalize_text(artist) for artist in track.get("artists") or []]
    if any(any(blocked == artist or blocked in artist for blocked in JAZZ_DISQUALIFYING_ARTISTS) for artist in artists):
        return False
    if any(any(strict == artist or strict in artist for strict in STRICT_JAZZ_ARTISTS) for artist in artists):
        return True
    trusted = " ".join((track.get("onlineGenres") or []) + (track.get("onlineTags") or []))
    trusted = normalize_text(trusted)
    trusted = re.sub(r"\bjazz[- ]*(?:hip[- ]*)?hop\b", " ", trusted)
    trusted = re.sub(r"\bjazz[- ]*rap\b", " ", trusted)
    if re.search(r"\b(jazz|bossa nova|bebop|swing|smooth jazz|jazz fusion|latin jazz|soul jazz|nu jazz)\b", trusted):
        return True
    styles = set(unique(track.get("styleTags") or []))
    if "jazz" in styles and not styles.intersection(JAZZ_DISQUALIFYING_STYLES):
        return True
    return False


def has_classical_signal(track: dict) -> bool:
    artists = [normalize_text(artist) for artist in track.get("artists") or []]
    if any(any(needle == artist or needle in artist for needle in CLASSICAL_ARTISTS) for artist in artists):
        return True
    online_text = normalize_text(" ".join([
        " ".join(track.get("onlineGenres") or []),
        " ".join(track.get("onlineTags") or []),
    ]))
    if re.search(r"\b(classical|orchestral|symphony|concerto|neo-classical|neoclassical|contemporary classical|modern classical|post-classical)\b", online_text):
        return True
    if re.search(r"(クラシック|古典)", " ".join((track.get("onlineGenres") or []) + (track.get("onlineTags") or []))):
        return True
    descriptive_text = normalize_text(" ".join([
        track.get("name", ""),
        track.get("album", ""),
        " ".join(track.get("artists") or []),
    ]))
    return bool(re.search(r"\b(orchestra|philharmonic|cantata|concerto|sonata|bwv|violin|cello|pachelbel)\b", descriptive_text))


def is_holiday_track(track: dict) -> bool:
    text = " ".join([
        track.get("name", ""),
        track.get("album", ""),
        " ".join(track.get("playlistNames") or []),
        " ".join(track.get("styleTags") or []),
    ])
    return bool(HOLIDAY_RE.search(text))


def artist_rule_matches(artists: list[str], needles: tuple[str, ...]) -> bool:
    normalized_artists = [normalize_text(artist) for artist in artists]
    for needle in needles:
        value = normalize_text(needle)
        if not value:
            continue
        for artist in normalized_artists:
            if len(value) <= 6:
                if artist == value:
                    return True
            elif artist == value or value in artist:
                return True
    return False


def term_matches(text: str, needle: str) -> bool:
    value = normalize_text(needle)
    if not value:
        return False
    escaped = re.escape(value)
    if re.fullmatch(r"[a-z0-9]+(?: [a-z0-9]+)*", value):
        return re.search(rf"(^|[^a-z0-9]){escaped}([^a-z0-9]|$)", text) is not None
    return value in text


def normalize_text(value: object) -> str:
    text = str(value or "").lower()
    text = text.replace("&", " and ")
    text = text.replace("_", " ")
    text = TOKEN_SPLIT_RE.sub(" ", text)
    return re.sub(r"\s+", " ", text).strip()


def normalize_taxonomy(value: dict) -> dict:
    return {
        "genre": unique(value.get("genre") or []),
        "mood": unique(value.get("mood") or []),
        "context": unique(value.get("context") or []),
        "era": unique(value.get("era") or []),
    }


def unique(values) -> list[str]:
    seen = set()
    result = []
    for item in values or []:
        text = str(item).strip()
        if not text or text in seen:
            continue
        seen.add(text)
        result.append(text)
    return result


def make_taxonomy_stats(tracks: list[dict]) -> dict:
    stats = {}
    for dimension in ("genre", "mood", "context", "era"):
        counts = Counter()
        for track in tracks:
            if track.get("playable") is False or track.get("hiddenFromRadio") is True:
                continue
            for tag in (track.get("taxonomy") or {}).get(dimension) or []:
                counts[tag] += 1
        order = GENRE_ORDER if dimension == "genre" else []
        stats[dimension] = [
            {
                "key": key,
                "label": TAXONOMY_LABELS.get(dimension, {}).get(key, key.replace("_", " ").title()),
                "count": count,
            }
            for key, count in sorted(
                counts.items(),
                key=lambda item: (
                    order.index(item[0]) if item[0] in order else len(order),
                    -item[1],
                    item[0],
                ),
            )
        ]
    return stats


if __name__ == "__main__":
    main()
