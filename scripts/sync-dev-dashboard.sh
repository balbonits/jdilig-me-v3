#!/usr/bin/env bash
# Copies the built dev dashboard prototype (github.com/balbonits/devtool-dashboard)
# into public/ux/dev-dashboard/, where jdilig.me serves it.
# Usage: scripts/sync-dev-dashboard.sh /path/to/devtool-dashboard
set -euo pipefail
exec "$(dirname "$0")/sync-vendored.sh" "${1:?path to devtool-dashboard checkout}" dist public/ux/dev-dashboard
