# Publishing To GitHub

This folder is ready to be published as an open-source Skill package.

## Recommended GitHub Repo

Create a public repo such as:

```text
knowledge-content-agent-skill
```

You can publish either:

1. This whole product repo, keeping the Skill at `packages/skills/knowledge-content-agent`.
2. A clean standalone repo where `SKILL.md` is at the repo root.

The installer supports both layouts.

## If Publishing This Whole Repo

From the repo root:

```bash
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/YOUR_REPO.git
git add packages/skills/knowledge-content-agent
git commit -m "Add knowledge content agent skill"
git push -u origin main
```

Then update the install commands in `README.md` by replacing:

```text
YOUR_GITHUB_USERNAME/YOUR_REPO
```

with your real GitHub path.

## If Publishing A Standalone Skill Repo

Create a clean folder:

```bash
mkdir knowledge-content-agent-skill
cp -R packages/skills/knowledge-content-agent/* knowledge-content-agent-skill/
cd knowledge-content-agent-skill
git init
git add .
git commit -m "Initial open-source release"
git branch -M main
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/knowledge-content-agent-skill.git
git push -u origin main
```

For a standalone repo, install commands can set:

```bash
SOURCE_PATH="."
```

Example:

```bash
REPO_URL="https://github.com/YOUR_GITHUB_USERNAME/knowledge-content-agent-skill.git" SOURCE_PATH="." bash -c "$(curl -fsSL https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/knowledge-content-agent-skill/main/install/install.sh)"
```

Windows:

```powershell
$env:REPO_URL="https://github.com/YOUR_GITHUB_USERNAME/knowledge-content-agent-skill.git"; $env:SOURCE_PATH="."; irm "https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/knowledge-content-agent-skill/main/install/install.ps1" | iex
```

## Release Checklist

- `SKILL.md` exists at the Skill root.
- `scripts/score_content.py` is included and executable on macOS/Linux.
- `references/scoring-rubric.md` is included.
- `references/product-packaging.md` is included.
- `agents/openai.yaml` is included.
- `install/install.sh` and `install/install.ps1` are included.
- `README.md` has the final GitHub URL.
- `LICENSE` is included.
