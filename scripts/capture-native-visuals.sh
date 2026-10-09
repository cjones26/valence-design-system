#!/usr/bin/env bash

set -euo pipefail

platform=$1
output_directory=$2
flow=$(mktemp ./native-visual-flow.XXXXXX.yaml)

mkdir -p "$output_directory"
trap 'rm -f "$flow"' EXIT

pnpm --dir apps/native-storybook exec node scripts/generate-visual-flow.mjs \
  "$platform" > "$flow"
maestro test --test-output-dir "$output_directory" "$flow"
