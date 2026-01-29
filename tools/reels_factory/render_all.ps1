param(
  [string]$OutDir = "dist/reels",
  [string]$Preset = "tools/reels_factory/presets/voice_uk_female_calm_punchy.json"
)

$ErrorActionPreference = "Stop"

$examples = Get-ChildItem -Path "tools/reels_factory/examples" -Filter "draft_*.json" | Sort-Object Name
if (-not $examples) {
  throw "No draft_*.json files found in tools/reels_factory/examples"
}

foreach ($ex in $examples) {
  Write-Host "Rendering $($ex.Name)..."
  py tools/reels_factory/reels_factory.py render $ex.FullName -o $OutDir --preset $Preset
}

Write-Host "Done. Outputs in $OutDir"
