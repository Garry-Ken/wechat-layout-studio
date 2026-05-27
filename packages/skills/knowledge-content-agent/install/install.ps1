$ErrorActionPreference = "Stop"

$Target = if ($env:SKILL_TARGET) { $env:SKILL_TARGET } else { "all" }
$RepoUrl = if ($env:REPO_URL) { $env:REPO_URL } else { "https://github.com/Garry-Ken/wechat-layout-studio.git" }
$SourcePath = if ($env:SOURCE_PATH) { $env:SOURCE_PATH } else { "packages/skills/knowledge-content-agent" }
$SkillName = "knowledge-content-agent"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "git is required to install this skill from GitHub."
  exit 2
}

$WorkDir = Join-Path ([System.IO.Path]::GetTempPath()) ("knowledge-content-agent-" + [System.Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $WorkDir | Out-Null

try {
  git clone --depth 1 $RepoUrl (Join-Path $WorkDir "repo") | Out-Null

  function Find-SkillSource {
    $RepoDir = Join-Path $WorkDir "repo"
    $Candidates = @(
      (Join-Path $RepoDir $SourcePath),
      (Join-Path $RepoDir $SkillName),
      (Join-Path $RepoDir "skills\$SkillName"),
      $RepoDir
    )

    foreach ($Candidate in $Candidates) {
      if ((Test-Path (Join-Path $Candidate "SKILL.md")) -and (Test-Path (Join-Path $Candidate "scripts\score_content.py"))) {
        return $Candidate
      }
    }

    throw "Could not find $SkillName in the downloaded repo."
  }

  function Copy-Skill {
    param(
      [string]$Source,
      [string]$Root
    )

    $Destination = Join-Path $Root $SkillName
    New-Item -ItemType Directory -Path $Root -Force | Out-Null
    if (Test-Path $Destination) {
      Remove-Item $Destination -Recurse -Force
    }
    Copy-Item $Source $Destination -Recurse
    Write-Host "Installed $SkillName -> $Destination"
  }

  $SourceDir = Find-SkillSource
  $HomeDir = [Environment]::GetFolderPath("UserProfile")

  switch ($Target) {
    "all" {
      Copy-Skill $SourceDir (Join-Path $HomeDir ".codex\skills")
      Copy-Skill $SourceDir (Join-Path $HomeDir ".claude\skills")
    }
    "codex" {
      Copy-Skill $SourceDir (Join-Path $HomeDir ".codex\skills")
    }
    "claude" {
      Copy-Skill $SourceDir (Join-Path $HomeDir ".claude\skills")
    }
    "claude-project" {
      Copy-Skill $SourceDir (Join-Path (Get-Location) ".claude\skills")
    }
    default {
      Write-Host "Unknown target: $Target"
      Write-Host "Use one of: all, codex, claude, claude-project"
      exit 2
    }
  }

  Write-Host "Done. Restart Codex or Claude Code, then ask for the knowledge-content-agent skill."
}
finally {
  if (Test-Path $WorkDir) {
    Remove-Item $WorkDir -Recurse -Force
  }
}
