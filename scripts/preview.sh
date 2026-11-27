#!/usr/bin/env bash
# Build, then serve the production output locally.
source "$(dirname "$0")/_common.sh"

ensure_deps
free_port

say "Building"
npm run build

say "Serving dist on http://localhost:$PORT"
(sleep 2 && open "http://localhost:$PORT") &
npx astro preview --port "$PORT"
