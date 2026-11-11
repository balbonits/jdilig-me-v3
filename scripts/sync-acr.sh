#!/usr/bin/env bash
# Vendors a project's ACR.md into src/data/acr/<slug>/ and regenerates its HTML partial.
# Same pattern as scripts/sync-vendored.sh: refuses a dirty source tree and records the repo and SHA.
# The slug must have an entry in src/data/acr/acr.config.json.
# Usage: scripts/sync-acr.sh <source checkout> <slug>
set -euo pipefail
src="${1:?source checkout}"; slug="${2:?slug from acr.config.json}"
cd "$(dirname "$0")/.."
cfg=src/data/acr/acr.config.json
rpath="$(node -e 'const c=require(process.argv[1]).reports.find(r=>r.slug===process.argv[2]); if(!c) process.exit(1); console.log(c.path)' "./$cfg" "$slug")" \
  || { echo "no entry for $slug in $cfg" >&2; exit 1; }
if [ -n "$(git -C "$src" status --porcelain)" ]; then
  echo "refusing to sync: $src has uncommitted changes" >&2; exit 1
fi
repo="$(git -C "$src" remote get-url origin | sed -E 's#^git@github.com:#https://github.com/#; s#\.git$##')"
sha="$(git -C "$src" rev-parse HEAD)"
dest="src/data/acr/$slug"
mkdir -p "$dest"
cp "$src/$rpath" "$dest/ACR.md"
printf '{\n  "repo": "%s",\n  "path": "%s",\n  "sha": "%s",\n  "synced": "%s"\n}\n' "$repo" "$rpath" "$sha" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$dest/SOURCE.json"
node scripts/acr-to-html.mjs
echo "synced $dest from $repo $sha"
