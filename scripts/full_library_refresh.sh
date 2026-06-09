#!/bin/zsh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PYTHON="$ROOT/.venv-enrichment/bin/python"
PIP="$ROOT/.venv-enrichment/bin/pip"
AUDIT_URL="http://127.0.0.1:3898/audit?autostart=1&concurrency=16&timeout=15000"

if ! "$PYTHON" -c "import librosa, soundfile" >/dev/null 2>&1; then
  "$PIP" install -r radio_app/requirements-enrichment.txt
fi

"$PYTHON" radio_app/enrich_catalog.py --workers 5 --refresh

node radio_app/playability_browser_server.mjs &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT INT TERM

for _ in {1..30}; do
  if curl -fsS http://127.0.0.1:3898/status >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

open "$AUDIT_URL"
echo "Browser playability audit started. Keep this terminal open."

while true; do
  COMPLETE="$(
    curl -fsS http://127.0.0.1:3898/status |
      python3 -c 'import json,sys; print("1" if json.load(sys.stdin).get("final") else "0")'
  )"
  if [[ "$COMPLETE" == "1" ]]; then
    break
  fi
  sleep 5
done

python3 radio_app/apply_playability_report.py
cp radio_app/index.html radio_app/styles.css radio_app/app.js radio_app/library.json radio_app/library-data.js \
  dist/GitHub_Upload_This_Folder/radio_app/
npm run build

echo "Full metadata and playability refresh completed."
