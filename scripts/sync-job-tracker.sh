#!/usr/bin/env bash
# Copies the built job tracker prototype (github.com/balbonits/job-app-tracker)
# into public/ux/job-tracker/, where jdilig.me serves it.
# Usage: scripts/sync-job-tracker.sh /path/to/job-app-tracker
set -euo pipefail
exec "$(dirname "$0")/sync-vendored.sh" "${1:?path to job-app-tracker checkout}" dist public/ux/job-tracker
