# Subtitles

This pipeline generates subtitles from ElevenLabs **timing/alignment** when available.

## How it works
- Uses the `.../text-to-speech/{voice_id}/with-timestamps` endpoint when possible.
- Converts timestamps to `.srt`.
- Burns subtitles into the final MP4 via ffmpeg (libass).

## Notes
- If the timestamps endpoint is unavailable for your ElevenLabs plan/model, the render will still succeed but without subtitles.
- Keep subtitles readable: 1–2 lines, ~32 chars per line.
