#!/usr/bin/env python3
"""Build a review report for cocktail-bar noise-risk candidates."""

from __future__ import annotations

import csv
import html
import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parent
LIBRARY = ROOT / "library.json"
CSV_OUT = ROOT / "noisy_candidates_review.csv"
HTML_OUT = ROOT / "noisy_candidates_review.html"
JSON_OUT = ROOT / "noisy_candidates_summary.json"


def main():
    library = json.loads(LIBRARY.read_text(encoding="utf-8"))
    tracks = [
        track
        for track in library.get("tracks", [])
        if track.get("playable") is not False
        and track.get("hiddenFromRadio") is not True
        and track.get("barNoiseRisk")
    ]
    tracks.sort(key=lambda item: (item["barNoiseRisk"]["level"] != "high", -item["barNoiseRisk"]["score"], item["name"].lower()))
    write_csv(tracks)
    write_html(tracks)
    summary = {
        "generatedFrom": str(LIBRARY),
        "count": len(tracks),
        "levels": dict(Counter(track["barNoiseRisk"]["level"] for track in tracks)),
        "csv": str(CSV_OUT),
        "html": str(HTML_OUT),
    }
    JSON_OUT.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2))


def write_csv(tracks):
    with CSV_OUT.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "level",
                "score",
                "id",
                "name",
                "artists",
                "album",
                "bpm",
                "energy",
                "genres",
                "onlineGenres",
                "onlineTags",
                "playlistNames",
                "reasons",
            ],
        )
        writer.writeheader()
        for track in tracks:
            writer.writerow(row_for_track(track))


def write_html(tracks):
    level_counts = Counter(track["barNoiseRisk"]["level"] for track in tracks)
    rows = "\n".join(html_row(track) for track in tracks)
    HTML_OUT.write_text(
        f"""<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>Echo Room FM noisy candidates</title>
<style>
body{{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;background:#080808;color:#eee;margin:24px}}
table{{border-collapse:collapse;width:100%;font-size:13px}}th,td{{border:1px solid #333;padding:8px;vertical-align:top}}
th{{position:sticky;top:0;background:#111;color:#16f4d0}}tr:nth-child(even){{background:#111}}
.tools{{display:flex;gap:8px;margin:16px 0;position:sticky;top:0;background:#080808;padding:8px 0;z-index:2}}
button{{background:#16f4d0;border:0;padding:10px 14px;font-weight:800}}textarea{{width:100%;height:160px;background:#111;color:#16f4d0;border:1px solid #333;margin-top:12px}}
.muted{{color:#999}}.high{{color:#ff5277;font-weight:800}}.review{{color:#ffd166;font-weight:800}}
</style></head>
<body><h1>Echo Room FM 吵歌候选审核</h1>
<p class="muted">High 会默认从普通时段预设中过滤；Review 只是候选，不会自动过滤。复制下方 JSON 可以发回给 Codex 做正式屏蔽。</p>
<pre>{html.escape(json.dumps(dict(level_counts), ensure_ascii=False, indent=2))}</pre>
<div class="tools"><button onclick="copySelected()">复制已勾选 ID JSON</button><button onclick="setLevel('high',true)">只选 High</button><button onclick="document.querySelectorAll('input[type=checkbox]').forEach(x=>x.checked=true)">全选</button><button onclick="document.querySelectorAll('input[type=checkbox]').forEach(x=>x.checked=false)">全不选</button></div>
<table><thead><tr><th>选</th><th>Level</th><th>Score</th><th>ID</th><th>Song</th><th>Artists</th><th>BPM</th><th>Energy</th><th>Genres</th><th>Reason</th></tr></thead><tbody>
{rows}
</tbody></table><textarea id="out" placeholder="selected ids json"></textarea>
<script>
function setLevel(level, checked) {{
  document.querySelectorAll('input[type=checkbox]').forEach((box) => {{
    box.checked = box.dataset.level === level ? checked : false;
  }});
}}
function copySelected() {{
  const ids = [...document.querySelectorAll('input[type=checkbox]:checked')].map(x => x.dataset.id);
  const payload = JSON.stringify({{noisyTrackIds: ids}}, null, 2);
  document.getElementById('out').value = payload;
  navigator.clipboard?.writeText(payload);
}}
</script></body></html>""",
        encoding="utf-8",
    )


def html_row(track):
    risk = track["barNoiseRisk"]
    checked = "checked" if risk["level"] == "high" else ""
    return f"""<tr>
  <td><input type="checkbox" data-id="{escape(track["id"])}" data-level="{escape(risk["level"])}" {checked}></td>
  <td class="{escape(risk["level"])}">{escape(risk["level"])}</td>
  <td>{escape(risk["score"])}</td>
  <td>{escape(track["id"])}</td>
  <td><strong>{escape(track.get("name", ""))}</strong></td>
  <td>{escape(" / ".join(track.get("artists") or []))}</td>
  <td>{escape(track.get("estimatedBpm", ""))}</td>
  <td>{escape(track.get("energy", ""))}</td>
  <td>{escape(", ".join((track.get("taxonomy") or {}).get("genre") or []))}</td>
  <td>{escape("; ".join(risk.get("reasons") or []))}</td>
</tr>"""


def row_for_track(track):
    risk = track["barNoiseRisk"]
    return {
        "level": risk.get("level", ""),
        "score": risk.get("score", ""),
        "id": track.get("id", ""),
        "name": track.get("name", ""),
        "artists": " / ".join(track.get("artists") or []),
        "album": track.get("album", ""),
        "bpm": track.get("estimatedBpm", ""),
        "energy": track.get("energy", ""),
        "genres": "; ".join((track.get("taxonomy") or {}).get("genre") or []),
        "onlineGenres": "; ".join(track.get("onlineGenres") or []),
        "onlineTags": "; ".join(track.get("onlineTags") or []),
        "playlistNames": "; ".join(track.get("playlistNames") or []),
        "reasons": "; ".join(risk.get("reasons") or []),
    }


def escape(value):
    return html.escape(str(value))


if __name__ == "__main__":
    main()
