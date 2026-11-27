#!/usr/bin/env bash
# Print the next free project id and a stub to paste into src/data/projects.ts.
source "$(dirname "$0")/_common.sh"

last="$(grep -o 'PRJ-[0-9]*' src/data/projects.ts | sort -t- -k2 -n | tail -1 | cut -d- -f2)"
next="$(printf "PRJ-%02d" $((10#$last + 1)))"

cat <<STUB
   {
      id: "$next",
      name: "${1:-Project name}",
      kind: "Kind",
      tech: "Tech · Stack",
      date: "$(date +"%b %Y")",
      url: "https://github.com/stafawashere/",
   },
STUB
