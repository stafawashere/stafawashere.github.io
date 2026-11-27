#!/usr/bin/env bash
# Remove build output and caches. Pass --all to remove node_modules too.
source "$(dirname "$0")/_common.sh"

say "Removing dist, .astro and Vite cache"
rm -rf dist .astro node_modules/.vite

if [[ "${1:-}" == "--all" ]]; then
   say "Removing node_modules"
   rm -rf node_modules
fi
