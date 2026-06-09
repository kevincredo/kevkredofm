#!/usr/bin/env python3
"""Apply the latest browser playability audit to the generated radio library."""

from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

from generate_library import PLAYABILITY_BLOCKED_IDS, ROOT, main as regenerate_library


REPORT = ROOT / "output" / "netease_music_archive" / "playability_browser_report.json"
SUMMARY = ROOT / "output" / "netease_music_archive" / "playability_browser_summary.json"


def main():
    report = json.loads(REPORT.read_text(encoding="utf-8"))
    results = report.get("results") or []
    if not report.get("final"):
        raise SystemExit("Playability report is not marked final.")
    expected = int(report.get("total") or report.get("checked") or 0)
    if not expected or len(results) != expected:
        raise SystemExit(f"Incomplete playability report: expected {expected}, got {len(results)}.")

    blocked_rows = [row for row in results if str(row.get("status") or "").startswith("blocked_")]
    unknown_rows = [
        row
        for row in results
        if not str(row.get("status") or "").startswith(("blocked_", "playable_"))
    ]
    blocked_ids = sorted({str(row["id"]) for row in blocked_rows if row.get("id")}, key=int)
    PLAYABILITY_BLOCKED_IDS.write_text(
        json.dumps(blocked_ids, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    playable = len(results) - len(blocked_rows) - len(unknown_rows)
    summary = {
        "generatedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        "sourceReportGeneratedAt": report.get("generatedAt"),
        "checked": len(results),
        "libraryTrackCount": expected,
        "summary": {
            "playable": playable,
            "blocked": len(blocked_rows),
            "unknown": len(unknown_rows),
            "playablePercent": round(playable / len(results) * 100, 1),
            "blockedPercent": round(len(blocked_rows) / len(results) * 100, 1),
        },
        "byStatus": (report.get("summary") or {}).get("byStatus") or {},
        "method": {
            "description": "Browser Audio metadata, muted opening playback, and tail-seek probe against the same NetEase outer URL used by the app.",
            "urlPattern": "https://music.163.com/song/media/outer/url?id=<songId>.mp3",
            "notes": [
                "This verifies current browser stream availability without downloading complete songs.",
                "Blocked tracks remain in the archive and are only hidden from the radio UI.",
            ],
        },
    }
    SUMMARY.write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    regenerate_library()
    print(
        json.dumps(
            {
                "checked": len(results),
                "playable": playable,
                "blocked": len(blocked_rows),
                "unknown": len(unknown_rows),
                "blockedIds": str(PLAYABILITY_BLOCKED_IDS),
                "summary": str(SUMMARY),
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()
