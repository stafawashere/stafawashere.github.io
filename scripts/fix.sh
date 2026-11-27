#!/usr/bin/env bash
# Apply Prettier and ESLint autofixes.
source "$(dirname "$0")/_common.sh"

ensure_deps

say "Formatting"
npm run format

say "Fixing lint"
npx eslint . --fix

git status --short
