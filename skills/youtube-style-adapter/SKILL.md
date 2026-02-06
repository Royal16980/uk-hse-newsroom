---
name: youtube-style-adapter
description: Analyze a YouTube video link and adapt its style for original content: pacing, structure, editing rhythm, typography/captions, color mood, sound design, and voice direction. Use when user provides a YouTube URL and wants a Remotion-ready template + creative brief that matches the style (without copying copyrighted footage/audio). Triggers: "YouTube link", "analyze this video", "copy this style", "replicate the style", "adapt this style", "make videos like this".
---

# youtube-style-adapter

You are given a YouTube URL. Your job: **reverse-engineer the style** and produce an **original** Remotion-ready package that *matches the vibe*.

Important: the user may say “copy totally”. Do **not** copy copyrighted footage/audio or recreate a creator’s identifiable likeness. You may emulate *style traits* (pacing, typography, composition, transitions, sound design patterns) and generate **new** assets.

## Output contract (always)
1) **Style fingerprint** (bullet list)
   - Hook pattern (first 1–2s)
   - Scene cadence (avg seconds per beat)
   - Editing rhythm (cuts, zooms, kinetic type)
   - Caption style (font weight, case, background, highlight)
   - Color mood + contrast
   - SFX/music pattern
   - Voice direction (tone, speed, energy)
2) **Deconstruction timeline** (time ranges → what happens)
3) **Rebuild plan** for an original video (same structure, new content)
4) **Remotion template spec**
   - Comp: width/height/fps/duration
   - Scenes/components
   - Caption component rules
5) **Asset list** (stock/generative) + prompts
6) **Render commands**

## Workflow

### Step 1 — Fetch and extract
Use the script:
```bash
python skills/youtube-style-adapter/scripts/extract_youtube_style.py "<YOUTUBE_URL>"
```
It will:
- download video (best effort)
- extract audio (wav)
- sample frames (jpg)
- output `analysis/metadata.json`

If download fails (restricted video), fall back to **browser** screenshot + manual notes.

### Step 2 — Analyze
- Use metadata (duration, fps if available).
- Inspect sampled frames: typography density, palette, layouts, motion cues.
- If audio is available: infer pace + energy. (Optional) run STT via `speech-to-text` skill if available.

### Step 3 — Adapt into Remotion (original)
- Create/modify a Remotion composition (prefer `safetysignal-video` project).
- Implement caption style with readable backgrounds.
- Generate VO using preferred voice (female, warm/confident).

### Step 4 — QA
Checklist:
- Captions readable on bright/dark backgrounds
- Safe-area for TikTok/Reels
- Hook in first 1.5s is clear
- No copyrighted footage reused

## Files
- Script: `scripts/extract_youtube_style.py`
- Outputs (generated): `analysis/<video_id>/...`
