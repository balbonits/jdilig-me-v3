#!/usr/bin/env bash
# Copies the built Ember UI Storybook (github.com/balbonits/a11y-design-system)
# into public/ux/design-system/storybook/, where jdilig.me serves it.
# Usage: scripts/sync-storybook.sh /path/to/a11y-design-system
set -euo pipefail
src="${1:?path to a11y-design-system checkout}"
(cd "$src" && npm run build)
rm -rf public/ux/design-system/storybook
cp -r "$src/storybook-static" public/ux/design-system/storybook
echo "synced Storybook from $(git -C "$src" rev-parse --short HEAD)"
