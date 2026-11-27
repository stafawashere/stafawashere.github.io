#!/usr/bin/env bash
# Clean every build cache and build the site from scratch.
source "$(dirname "$0")/_common.sh"

ensure_deps

say "Removing dist and .astro"
rm -rf dist .astro node_modules/.vite

say "Building"
npm run build

say "Built $(find dist -name '*.html' | wc -l | tr -d ' ') pages into dist/"
