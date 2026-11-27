#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PORT="${PORT:-4321}"

say() {
   printf "\033[38;5;98m==>\033[0m %s\n" "$*"
}

ensure_deps() {
   local lock_is_newer=false

   if [[ -d node_modules && package-lock.json -nt node_modules ]]; then
      lock_is_newer=true
   fi

   if [[ ! -d node_modules || "$lock_is_newer" == true ]]; then
      say "Installing dependencies"
      npm ci
   fi
}

free_port() {
   local pids
   pids="$(lsof -ti tcp:"$PORT" || true)"

   if [[ -n "$pids" ]]; then
      say "Stopping what is on port $PORT"
      kill $pids
   fi
}
