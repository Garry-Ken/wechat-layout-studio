#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-${SKILL_TARGET:-all}}"
REPO_URL="${REPO_URL:-https://github.com/Garry-Ken/wechat-layout-studio.git}"
SOURCE_PATH="${SOURCE_PATH:-packages/skills/knowledge-content-agent}"

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

git clone --depth 1 "$REPO_URL" "$WORKDIR/repo" >/dev/null
bash "$WORKDIR/repo/$SOURCE_PATH/install/install.sh" "$TARGET"
