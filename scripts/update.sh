#!/usr/bin/env bash
# Update dependencies within their semver ranges, then run the checks.
source "$(dirname "$0")/_common.sh"

say "Outdated packages"
npm outdated || true

say "Updating"
npm update

"$ROOT/scripts/check.sh"
