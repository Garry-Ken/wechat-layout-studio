# Knowledge Content Agent Skill

A portable Skill for Codex and Claude Code. It turns a topic, private notes, Feishu/Lark docs, Obsidian materials, trend signals, and business goals into scored WeChat articles, video scripts, social posts, content cards, publishing briefs, and prediction logs.

The bundled scoring script is part of the Skill:

```text
scripts/score_content.py
```

It uses only the Python standard library, so no `pip install` step is required.

## Install From GitHub

This Skill is published from:

```text
https://github.com/Garry-Ken/wechat-layout-studio
```

### macOS / Linux

Shortest command:

```bash
curl -sL garry-ken.github.io/k|bash
```

Install for both Codex and Claude Code:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Garry-Ken/wechat-layout-studio/main/packages/skills/knowledge-content-agent/install/install.sh)"
```

Install for Codex only:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Garry-Ken/wechat-layout-studio/main/packages/skills/knowledge-content-agent/install/install.sh)" -- codex
```

Install for Claude Code only:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Garry-Ken/wechat-layout-studio/main/packages/skills/knowledge-content-agent/install/install.sh)" -- claude
```

### Windows PowerShell

Shortest command:

```powershell
irm https://garry-ken.github.io/w|iex
```

Install for both Codex and Claude Code:

```powershell
irm "https://raw.githubusercontent.com/Garry-Ken/wechat-layout-studio/main/packages/skills/knowledge-content-agent/install/install.ps1" | iex
```

Install for Codex only:

```powershell
$env:SKILL_TARGET="codex"; irm "https://raw.githubusercontent.com/Garry-Ken/wechat-layout-studio/main/packages/skills/knowledge-content-agent/install/install.ps1" | iex
```

Install for Claude Code only:

```powershell
$env:SKILL_TARGET="claude"; irm "https://raw.githubusercontent.com/Garry-Ken/wechat-layout-studio/main/packages/skills/knowledge-content-agent/install/install.ps1" | iex
```

## Manual Install

Copy this whole folder:

```text
knowledge-content-agent/
```

To Codex:

```text
~/.codex/skills/knowledge-content-agent
```

To Claude Code user skills:

```text
~/.claude/skills/knowledge-content-agent
```

On Windows, use:

```text
%USERPROFILE%\.codex\skills\knowledge-content-agent
%USERPROFILE%\.claude\skills\knowledge-content-agent
```

Restart Codex or Claude Code after installing.

## Verify The Scoring Script

macOS / Linux:

```bash
python3 ~/.codex/skills/knowledge-content-agent/scripts/score_content.py article.md
```

Windows:

```powershell
py -3 $env:USERPROFILE\.codex\skills\knowledge-content-agent\scripts\score_content.py .\article.md
```

Expected output is JSON with length, eight dimensions, virality, conversion, and composite scores.

## Repo Layout

```text
knowledge-content-agent/
  LICENSE
  PUBLISHING.md
  README.md
  SKILL.md
  agents/
    openai.yaml
  install/
    install.sh
    install.ps1
  references/
    product-packaging.md
    scoring-rubric.md
  scripts/
    score_content.py
```

## License

MIT. Keep the license file at the GitHub repo root when publishing.
