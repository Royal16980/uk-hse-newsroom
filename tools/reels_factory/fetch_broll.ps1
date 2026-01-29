param(
  [string]$Category = "all",
  [int]$Count = 12
)

$ErrorActionPreference = "Stop"

if (-not $env:PEXELS_API_KEY) {
  throw "PEXELS_API_KEY is not set. In PowerShell: `$env:PEXELS_API_KEY='<key>'"
}

py tools/reels_factory/broll_fetcher.py fetch --category $Category --count $Count
