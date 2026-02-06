---
name: remotion-studio
version: 1.0.0
description: Turn ideas into production-ready Remotion videos with an internal multi-role pipeline (Creative Director, Video Expert, Social Media Specialist, Motion Designer, QA Producer). Produces code, scripts, shotlists, and render commands. Optimized for repeatable short-form (TikTok/Reels/YouTube Shorts) and brand consistency.
---

# remotion-studio

This skill is a *workflow wrapper* around `remotion-video-toolkit` that forces higher-quality output by running an internal studio pipeline.

## When to use
- You want **short-form social videos** generated programmatically.
- You want **consistent style** across a series.
- You want an agent that outputs **Remotion code + assets plan + rendering steps**.

## Core principle
You don’t start with code. You start with a **creative brief** and a **format**. Then code becomes execution.

---

## Studio roles (run in this order)

### 1) Creative Director
Deliverables:
- One-sentence concept
- Hook in first 1.5s
- POV + tone
- Target platform (TikTok/Reels/Shorts)
- Visual motif + color direction
- 3 title options (not clickbait, but punchy)

### 2) Social Media Content Specialist
Deliverables:
- Script (spoken) with timestamps (0–3s / 3–7s / 7–15s / 15–25s etc)
- On-screen text plan
- Caption + CTA
- Hashtags (10–18)
- A/B variants: hook + ending

### 3) Video Expert (Editor mindset)
Deliverables:
- Shotlist per beat (scene count, duration)
- Pacing notes (cuts per second, when to punch in)
- Audio plan (VO/music/SFX)
- B-roll plan (stock vs generated)

### 4) Motion Designer (Remotion)
Deliverables:
- Composition spec (width/height/fps/duration)
- Scene components breakdown
- Animation primitives (spring/interpolate)
- Text styles + safe zones

### 5) Producer / QA
Deliverables:
- Render commands
- Checks: spelling, contrast, safe-area, loudness, captions readability
- Performance checks: render time, memory, asset decode

---

## Output contract (what you must produce)
When asked to “make a video” you MUST output:
1) **Creative brief** (1 screen)
2) **Script + timestamps**
3) **Shotlist**
4) **Remotion implementation plan** (files/components)
5) **Starter code** (at minimum: `src/Root.tsx`, `src/compositions/<Name>.tsx`, and `src/index.ts`)
6) **Render commands**

If anything is missing, the job isn’t done.

---

## Recommended defaults (short-form)
- 1080x1920 (vertical)
- 30 fps
- 18–35 seconds
- Big typography, 6–10 words max per card
- Captions always on
- Hard cuts + 1–2 simple transitions max

---

## Implementation recipe (Remotion)

### Scaffold
```bash
npx create-video@latest safetysignal-video
cd safetysignal-video
npm i
npm start
```

### Render
```bash
npx remotion render src/index.ts SafetySignalShort out.mp4 --props "{\"topic\":\"UK HSE enforcement\"}"
```

### Data-driven batch renders
- Store scripts/props in JSON.
- Render multiple variations by iterating props.

---

## Creative packs (templates)

### Template A: “3 mistakes that cause prosecutions” (25s)
- 0–2s: hook text + siren SFX
- 2–8s: mistake 1
- 8–14s: mistake 2
- 14–20s: mistake 3
- 20–25s: what to do this week + follow

### Template B: “60-second board brief” (35s)
- risk framing → cost → controls → 1 ask

---

## Integration notes
- Use `remotion-video-toolkit` for detailed Remotion rules.
- Use `speech-to-text` + `text-to-speech` skills (optional) for captions/VO.
- Use `ai-image-generation` (optional) for consistent cover frames and motif assets.

---

## Operating rules
- No autoposting unless explicitly requested.
- Prefer **draft + preview + approval**.
- Keep assets license-safe (stock sources or generated).
