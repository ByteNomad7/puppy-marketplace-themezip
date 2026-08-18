#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Replit normally keeps node_modules available between merges. If a merge
# changes dependencies and the local tree is missing, restore it without
# running interactive or package build scripts.
if [[ ! -x node_modules/.bin/tsc || ! -f node_modules/next/dist/bin/next ]]; then
  pnpm install --frozen-lockfile --ignore-scripts
fi

node node_modules/typescript/bin/tsc --noEmit
node node_modules/next/dist/bin/next build