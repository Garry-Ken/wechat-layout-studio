$ErrorActionPreference = "Stop"

$Target = if ($env:SKILL_TARGET) { $env:SKILL_TARGET } else { "all" }
$RepoUrl = if ($env:REPO_URL) { $env:REPO_URL } else { "https://github.com/Garry-Ken/wechat-layout-studio.git" }
$SourcePath = if ($env:SOURCE_PATH) { $env:SOURCE_PATH } else { "packages/skills/knowledge-content-agent" }
$WorkDir = Join-Path ([System.IO.Path]::GetTempPath()) ("kca-" + [System.Guid]::NewGuid().ToString("N"))

New-Item -ItemType Directory -Path $WorkDir | Out-Null
try {
  git clone --depth 1 $RepoUrl (Join-Path $WorkDir "repo") | Out-Null
  & (Join-Path $WorkDir "repo\$SourcePath\install\install.ps1")
}
finally {
  if (Test-Path $WorkDir) {
    Remove-Item $WorkDir -Recurse -Force
  }
}
