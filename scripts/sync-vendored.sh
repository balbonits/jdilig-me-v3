#!/usr/bin/env bash
# Builds a static app from its own repo and copies it into public/, where jdilig.me serves it (ARCH-REVIEW R-6).
# Refuses a dirty source tree, and writes BUILD.json (repo, tag or SHA, build date) into the copied folder.
# Usage: scripts/sync-vendored.sh <source checkout> <build output dir in source> <dest under public/>
set -euo pipefail
src="${1:?source checkout}"; out="${2:?build output dir}"; dest="${3:?destination under public/}"
case "$dest" in public/ux/*) ;; *) echo "destination must be under public/ux/" >&2; exit 1 ;; esac
if [ -n "$(git -C "$src" status --porcelain)" ]; then
  echo "refusing to sync: $src has uncommitted changes" >&2; exit 1
fi
repo="$(git -C "$src" remote get-url origin | sed -E 's#^git@github.com:#https://github.com/#; s#\.git$##')"
sha="$(git -C "$src" rev-parse HEAD)"
tag="$(git -C "$src" describe --tags --exact-match 2>/dev/null || true)"
(cd "$src" && npm ci --no-audit --no-fund >/dev/null && npm run build)
rm -rf "$dest"
cp -r "$src/$out" "$dest"
printf '{\n  "repo": "%s",\n  "tag": %s,\n  "sha": "%s",\n  "built": "%s"\n}\n' \
  "$repo" "$( [ -n "$tag" ] && printf '"%s"' "$tag" || printf null )" "$sha" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$dest/BUILD.json"
echo "synced $dest from $repo ${tag:-$sha}"
