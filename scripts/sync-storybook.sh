#!/usr/bin/env bash
# Copies the built Ember UI Storybook (github.com/balbonits/a11y-design-system)
# into public/ux/design-system/storybook/, where jdilig.me serves it.
# Usage: scripts/sync-storybook.sh /path/to/a11y-design-system
set -euo pipefail
exec "$(dirname "$0")/sync-vendored.sh" "${1:?path to a11y-design-system checkout}" storybook-static public/ux/design-system/storybook
