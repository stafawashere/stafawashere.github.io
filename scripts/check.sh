#!/usr/bin/env bash
# Run everything CI runs: lint, format check, tests, type check and build.
source "$(dirname "$0")/_common.sh"

ensure_deps

say "Lint"
npm run lint

say "Format"
npm run format:check

say "Tests"
npm test

say "Type check and build"
npm run build

say "All checks passed"
