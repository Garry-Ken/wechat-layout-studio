#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-${SKILL_TARGET:-all}}"
REPO_URL="${REPO_URL:-https://github.com/Garry-Ken/wechat-layout-studio.git}"
SOURCE_PATH="${SOURCE_PATH:-packages/skills/knowledge-content-agent}"
SKILL_NAME="knowledge-content-agent"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required to install this skill from GitHub."
  exit 2
fi

WORKDIR="$(mktemp -d)"
cleanup() {
  rm -rf "$WORKDIR"
}
trap cleanup EXIT

git clone --depth 1 "$REPO_URL" "$WORKDIR/repo" >/dev/null

find_skill_source() {
  local candidates=(
    "$WORKDIR/repo/$SOURCE_PATH"
    "$WORKDIR/repo/$SKILL_NAME"
    "$WORKDIR/repo/skills/$SKILL_NAME"
    "$WORKDIR/repo"
  )

  for candidate in "${candidates[@]}"; do
    if [[ -f "$candidate/SKILL.md" && -f "$candidate/scripts/score_content.py" ]]; then
      echo "$candidate"
      return 0
    fi
  done

  echo "Could not find $SKILL_NAME in the downloaded repo." >&2
  exit 1
}

copy_skill() {
  local source="$1"
  local root="$2"
  local target="$root/$SKILL_NAME"
  mkdir -p "$root"
  rm -rf "$target"
  cp -R "$source" "$target"
  chmod +x "$target/scripts/score_content.py" 2>/dev/null || true
  echo "Installed $SKILL_NAME -> $target"
}

SOURCE_DIR="$(find_skill_source)"

case "$TARGET" in
  all)
    copy_skill "$SOURCE_DIR" "$HOME/.codex/skills"
    copy_skill "$SOURCE_DIR" "$HOME/.claude/skills"
    ;;
  codex)
    copy_skill "$SOURCE_DIR" "$HOME/.codex/skills"
    ;;
  claude)
    copy_skill "$SOURCE_DIR" "$HOME/.claude/skills"
    ;;
  claude-project)
    copy_skill "$SOURCE_DIR" "$(pwd)/.claude/skills"
    ;;
  *)
    echo "Unknown target: $TARGET"
    echo "Use one of: all, codex, claude, claude-project"
    exit 2
    ;;
esac

echo "Done. Restart Codex or Claude Code, then ask for the knowledge-content-agent skill."
