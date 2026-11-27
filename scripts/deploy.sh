#!/usr/bin/env bash
# Push main and follow the CI run that deploys it.
source "$(dirname "$0")/_common.sh"

branch="$(git branch --show-current)"
has_changes="$(git status --porcelain)"

if [[ "$branch" != "main" ]]; then
   say "Switch to main first (on $branch)"
   exit 1
fi

if [[ -n "$has_changes" ]]; then
   say "Commit or stash your changes first"
   exit 1
fi

"$ROOT/scripts/check.sh"

say "Pushing main"
git push origin main

sleep 3
run_id="$(gh run list --branch main --limit 1 --json databaseId -q '.[0].databaseId')"
gh run watch "$run_id" --exit-status
