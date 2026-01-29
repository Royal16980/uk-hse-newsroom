# Reels Factory (AI voice + consistent style)

This folder contains a simple, repeatable pipeline to generate 9:16 TikTok/Reels videos from:
- a **script JSON** (voiceover text + on-screen text beats)
- a local **b-roll library** (mp4 files)
- an ElevenLabs **AI voice** (hyper-realistic, consistent)

## 0) Prereqs
- Windows + Python 3.10+ (already on most setups)
- No system ffmpeg install required (we use `imageio-ffmpeg` to download a portable ffmpeg binary).

## 1) Set secrets (DO NOT paste keys into chat)
Set environment variables (PowerShell):

```powershell
$env:ELEVENLABS_API_KEY = "<your_key>"
$env:ELEVENLABS_VOICE_ID = "<voice_id>"   # once you pick a voice
```

Alternative: store in 1Password and export via `tools/set_api_keys_from_1p.ps1`.

## 2) Install python deps
From `C:\Users\ADMIN\clawd`:

```powershell
py -m pip install -r tools/reels_factory/requirements.txt
```

## 3) Add b-roll
Put clips into:

```
tools/reels_factory/assets/broll/ladder/
tools/reels_factory/assets/broll/mewp/
tools/reels_factory/assets/broll/factory/
tools/reels_factory/assets/broll/dashboards/
```

(You can add more categories; the script will look for a folder matching the script's `broll_category`.)

## 4) Render a video
Example (recommended: use the locked voice preset + subtitles):

```powershell
py tools/reels_factory/reels_factory.py render tools/reels_factory/examples/draft_01_ladder.json -o dist/reels --preset tools/reels_factory/presets/voice_uk_female_calm_punchy.json --subtitles
```

Outputs:
- `dist/reels/<slug>.mp4`
- `dist/reels/<slug>.wav`

## Notes
- This version focuses on: **consistent VO + b-roll + on-screen beats + CTA**.
- Auto-subtitles can be added next (Whisper or ElevenLabs timestamps), once we decide which route you want.
