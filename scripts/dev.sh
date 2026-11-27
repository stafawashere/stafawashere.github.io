#!/usr/bin/env bash
# Launch the dev server and open it in the browser.
source "$(dirname "$0")/_common.sh"

ensure_deps
free_port

say "Starting dev server on http://localhost:$PORT"
(sleep 2 && open "http://localhost:$PORT") &
npx astro dev --port "$PORT"
