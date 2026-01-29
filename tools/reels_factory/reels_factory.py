import argparse
import json
import os
import random
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

import base64
import requests
import imageio_ffmpeg

ELEVENLABS_BASE = "https://api.elevenlabs.io/v1"


def slugify(s: str) -> str:
    s = s.strip().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s or "reel"


def must_env(name: str) -> str:
    v = os.getenv(name)
    if not v:
        raise SystemExit(
            f"Missing env var {name}. Set it in PowerShell, e.g. $env:{name}='...'."
        )
    return v


def elevenlabs_tts(text: str, out_wav: Path, preset: dict | None = None) -> None:
    """Legacy fallback: MP3 TTS -> WAV."""
    api_key = must_env("ELEVENLABS_API_KEY")

    # If preset provided, prefer it; otherwise fall back to env vars.
    if preset:
        voice_id = preset.get("voice_id") or must_env("ELEVENLABS_VOICE_ID")
        model_id = preset.get("model_id", "eleven_multilingual_v2")
        voice_settings = preset.get(
            "voice_settings",
            {
                "stability": 0.78,
                "similarity_boost": 0.90,
                "style": 0.18,
                "use_speaker_boost": True,
            },
        )
    else:
        voice_id = must_env("ELEVENLABS_VOICE_ID")
        model_id = os.getenv("ELEVENLABS_MODEL_ID", "eleven_multilingual_v2")
        voice_settings = {
            "stability": float(os.getenv("ELEVENLABS_STABILITY", "0.78")),
            "similarity_boost": float(os.getenv("ELEVENLABS_SIMILARITY", "0.9")),
            "style": float(os.getenv("ELEVENLABS_STYLE", "0.18")),
            "use_speaker_boost": os.getenv("ELEVENLABS_SPEAKER_BOOST", "true").lower() == "true",
        }

    payload = {
        "text": text,
        "model_id": model_id,
        "voice_settings": voice_settings,
    }

    url = f"{ELEVENLABS_BASE}/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": api_key,
        "accept": "audio/mpeg",
        "content-type": "application/json",
    }

    r = requests.post(url, headers=headers, json=payload, timeout=60)
    if r.status_code >= 300:
        raise SystemExit(f"ElevenLabs TTS failed: {r.status_code} {r.text[:500]}")

    # ElevenLabs returns MP3 by default; convert to WAV and apply loudness normalization.
    ff = ffmpeg_path()
    with tempfile.TemporaryDirectory() as td:
        mp3_path = Path(td) / "voice.mp3"
        raw_wav = Path(td) / "voice_raw.wav"
        mp3_path.write_bytes(r.content)

        # Convert mp3 -> wav
        run([ff, "-y", "-i", str(mp3_path), str(raw_wav)])

        # Loudness normalize to approx -14 LUFS (social standard)
        # Using a single-pass loudnorm for simplicity.
        run([ff, "-y", "-i", str(raw_wav), "-af", "loudnorm=I=-14:LRA=11:TP=-1.5", str(out_wav)])


def elevenlabs_tts_with_timestamps(text: str, preset: dict) -> tuple[bytes, dict] | None:
    """Preferred: returns (mp3_bytes, alignment_json). Returns None if endpoint not available."""
    api_key = must_env("ELEVENLABS_API_KEY")
    voice_id = preset.get("voice_id") or must_env("ELEVENLABS_VOICE_ID")
    model_id = preset.get("model_id", "eleven_multilingual_v2")
    voice_settings = preset.get(
        "voice_settings",
        {"stability": 0.78, "similarity_boost": 0.90, "style": 0.18, "use_speaker_boost": True},
    )

    payload = {"text": text, "model_id": model_id, "voice_settings": voice_settings}

    url = f"{ELEVENLABS_BASE}/text-to-speech/{voice_id}/with-timestamps"
    headers = {"xi-api-key": api_key, "accept": "application/json", "content-type": "application/json"}

    r = requests.post(url, headers=headers, json=payload, timeout=60)
    if r.status_code == 404 or r.status_code == 400:
        return None
    if r.status_code >= 300:
        # Some plans gate this; fall back.
        return None

    data = r.json()
    audio_b64 = data.get("audio_base64") or data.get("audio")
    if not audio_b64:
        return None
    try:
        mp3_bytes = base64.b64decode(audio_b64)
    except Exception:
        return None

    return mp3_bytes, data


def srt_timestamp(seconds: float) -> str:
    ms = int(round(seconds * 1000))
    h = ms // 3600000
    ms %= 3600000
    m = ms // 60000
    ms %= 60000
    s = ms // 1000
    ms %= 1000
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def alignment_to_srt(alignment: dict, out_srt: Path, max_chars: int = 32, max_line_seconds: float = 2.4) -> None:
    """Convert ElevenLabs alignment to SRT.

    ElevenLabs alignment commonly includes:
    - characters + character_start_times_seconds + character_end_times_seconds
    We rebuild words and group into readable caption lines.
    """
    chars = alignment.get("alignment", {}).get("characters") or alignment.get("characters")
    starts = alignment.get("alignment", {}).get("character_start_times_seconds") or alignment.get(
        "character_start_times_seconds"
    )
    ends = alignment.get("alignment", {}).get("character_end_times_seconds") or alignment.get(
        "character_end_times_seconds"
    )
    if not (chars and starts and ends) or len(chars) != len(starts) or len(chars) != len(ends):
        raise ValueError("Unexpected alignment format")

    # Build words as (word, start, end)
    words = []
    cur = []
    w_start = None
    for ch, st, en in zip(chars, starts, ends):
        if w_start is None and ch.strip() != "":
            w_start = float(st)
        if ch in [" ", "\n", "\t"]:
            if cur:
                words.append(("".join(cur), w_start, float(ends_idx)))
            cur = []
            w_start = None
        else:
            cur.append(ch)
            ends_idx = en

    if cur:
        words.append(("".join(cur), w_start if w_start is not None else float(starts[-1]), float(ends[-1])))

    # Group words
    cues = []
    line_words = []
    line_start = None
    line_end = None

    def flush():
        nonlocal line_words, line_start, line_end
        if line_words and line_start is not None and line_end is not None:
            cues.append((line_start, line_end, " ".join(line_words).strip()))
        line_words = []
        line_start = None
        line_end = None

    for w, st, en in words:
        if line_start is None:
            line_start = st
        candidate = (" ".join(line_words + [w])).strip()
        candidate_len = len(candidate)
        candidate_dur = (en - line_start) if line_start is not None else 0

        if (candidate_len > max_chars and line_words) or (candidate_dur > max_line_seconds and line_words):
            flush()
            line_start = st
            line_words = [w]
            line_end = en
        else:
            line_words.append(w)
            line_end = en

    flush()

    # Write SRT
    out_srt.parent.mkdir(parents=True, exist_ok=True)
    lines = []
    for i, (st, en, txt) in enumerate(cues, start=1):
        lines.append(str(i))
        lines.append(f"{srt_timestamp(st)} --> {srt_timestamp(en)}")
        lines.append(txt)
        lines.append("")
    out_srt.write_text("\n".join(lines), encoding="utf-8")


def pick_broll_clips(category_dir: Path, seconds_needed: float) -> list[Path]:
    clips = [p for p in category_dir.glob("*.mp4") if p.is_file()]
    if not clips:
        raise SystemExit(
            f"No b-roll clips found in {category_dir}. Add mp4 clips to that folder."
        )
    random.shuffle(clips)

    chosen = []
    total = 0.0

    # crude: assume ~2.0s per clip; ffmpeg will trim/loop as needed
    # We'll just pick enough unique clips to cover duration with repeats allowed.
    idx = 0
    while total < seconds_needed:
        chosen.append(clips[idx % len(clips)])
        total += 2.0
        idx += 1
    return chosen


def ffmpeg_path() -> str:
    exe = imageio_ffmpeg.get_ffmpeg_exe()
    return exe


def ffprobe_path() -> str:
    # imageio-ffmpeg ships ffmpeg; ffprobe is typically alongside it.
    ff = Path(ffmpeg_path())
    probe = ff.with_name("ffprobe.exe") if ff.name.lower().endswith(".exe") else ff.with_name("ffprobe")
    if probe.exists():
        return str(probe)
    # Fallback: some builds bundle only ffmpeg; use ffmpeg to infer duration via stderr is brittle.
    raise SystemExit(f"ffprobe not found next to ffmpeg at {ff}")


def get_duration_seconds(media_path: Path) -> float:
    probe = ffprobe_path()
    cmd = [
        probe,
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        str(media_path),
    ]
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        raise SystemExit(f"ffprobe failed: {p.stderr[:500]}")
    try:
        return float(p.stdout.strip())
    except Exception as e:
        raise SystemExit(f"Could not parse duration from ffprobe: {p.stdout!r}") from e


def run(cmd: list[str]) -> None:
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        raise SystemExit(
            "Command failed:\n"
            + " ".join(cmd)
            + "\n\nSTDOUT:\n"
            + (p.stdout or "")
            + "\n\nSTDERR:\n"
            + (p.stderr or "")
        )


def build_video(
    audio_wav: Path,
    beats: list[dict],
    broll_paths: list[Path],
    out_mp4: Path,
    width: int,
    height: int,
    fps: int,
    font: str,
    safe_margin_px: int,
    subtitles_srt: Path | None = None,
) -> None:
    ff = ffmpeg_path()

    duration = get_duration_seconds(audio_wav)

    with tempfile.TemporaryDirectory() as td:
        td = Path(td)
        concat_file = td / "concat.txt"
        # Create concat list
        lines = []
        for p in broll_paths:
            lines.append(f"file '{p.as_posix()}'")
        concat_file.write_text("\n".join(lines), encoding="utf-8")

        broll_concat = td / "broll.mp4"
        # Concatenate (re-encode for stability)
        run(
            [
                ff,
                "-y",
                "-f",
                "concat",
                "-safe",
                "0",
                "-i",
                str(concat_file),
                "-vf",
                f"scale={width}:{height}:force_original_aspect_ratio=increase,crop={width}:{height},fps={fps}",
                "-an",
                "-c:v",
                "libx264",
                "-preset",
                "veryfast",
                "-crf",
                "20",
                str(broll_concat),
            ]
        )

        # Trim/loop b-roll to match audio duration
        broll_final = td / "broll_final.mp4"
        run(
            [
                ff,
                "-y",
                "-stream_loop",
                "-1",
                "-i",
                str(broll_concat),
                "-t",
                f"{duration:.3f}",
                "-an",
                "-c:v",
                "libx264",
                "-preset",
                "veryfast",
                "-crf",
                "20",
                str(broll_final),
            ]
        )

        # Build drawtext filters for beats
        # We show each beat from t[i] to t[i+1], last beat to end.
        beat_times = [float(b["t"]) for b in beats]
        texts = [str(b["text"]) for b in beats]

        def esc_text(s: str) -> str:
            # ffmpeg drawtext escaping
            return (
                s.replace("\\", "\\\\")
                .replace(":", "\\:")
                .replace("'", "\\'")
            )

        filters = []
        for i, (t0, txt) in enumerate(zip(beat_times, texts)):
            t1 = duration if i == len(beat_times) - 1 else beat_times[i + 1]
            txt = esc_text(txt)
            # big readable text with semi-transparent box
            filters.append(
                "drawtext="
                f"font='{font}':"
                f"text='{txt}':"
                "fontsize=64:"
                "fontcolor=white:"
                "box=1:boxcolor=black@0.45:boxborderw=24:"
                f"x=(w-text_w)/2:y=h-{safe_margin_px}-text_h:"
                f"enable='between(t,{t0:.3f},{t1:.3f})'"
            )

        vf = ",".join(filters)

        # Optional burnt-in subtitles (SRT). Use subtitles filter (libass).
        if subtitles_srt and subtitles_srt.exists():
            # Escape backslashes for Windows paths inside ffmpeg filter string.
            srt_path = str(subtitles_srt).replace("\\", "\\\\")
            vf = vf + f",subtitles='{srt_path}':force_style='FontName=Arial,FontSize=40,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=2,Shadow=0,MarginV=140'"

        # Mix audio + overlays
        out_mp4.parent.mkdir(parents=True, exist_ok=True)
        run(
            [
                ff,
                "-y",
                "-i",
                str(broll_final),
                "-i",
                str(audio_wav),
                "-vf",
                vf,
                "-c:v",
                "libx264",
                "-preset",
                "veryfast",
                "-crf",
                "20",
                "-c:a",
                "aac",
                "-b:a",
                "192k",
                "-shortest",
                str(out_mp4),
            ]
        )


def cmd_render(args: argparse.Namespace) -> None:
    in_path = Path(args.input)
    data = json.loads(in_path.read_text(encoding="utf-8"))

    slug = data.get("slug") or slugify(data.get("title", "reel"))

    voice_text = data["voiceover"]["text"]
    beats = data.get("beats", [])
    if not beats:
        # default beat: title at start, follow at end
        beats = [
            {"t": 0.0, "text": data.get("title", "")},
            {"t": 56.0, "text": "Follow @hse_uk_reporter"},
        ]

    style = data.get("style", {})
    width = int(style.get("width", 1080))
    height = int(style.get("height", 1920))
    fps = int(style.get("fps", 30))
    font = style.get("font", "Arial")
    safe_margin_px = int(style.get("safe_margin_px", 80))

    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)

    wav_path = out_dir / f"{slug}.wav"
    mp4_path = out_dir / f"{slug}.mp4"

    preset = None
    if args.preset:
        preset_path = Path(args.preset)
        preset = json.loads(preset_path.read_text(encoding="utf-8"))

    # TTS (+ optional subtitles via ElevenLabs timestamps)
    srt_path = out_dir / f"{slug}.srt"

    if preset and args.subtitles:
        ts = elevenlabs_tts_with_timestamps(voice_text, preset=preset)
        if ts:
            mp3_bytes, meta = ts
            ff = ffmpeg_path()
            with tempfile.TemporaryDirectory() as td:
                td = Path(td)
                mp3_path = td / "voice.mp3"
                raw_wav = td / "voice_raw.wav"
                mp3_path.write_bytes(mp3_bytes)

                run([ff, "-y", "-i", str(mp3_path), str(raw_wav)])
                run([ff, "-y", "-i", str(raw_wav), "-af", "loudnorm=I=-14:LRA=11:TP=-1.5", str(wav_path)])

            try:
                alignment_to_srt(meta, srt_path)
            except Exception:
                # Render will still work; just without subtitles.
                pass
        else:
            elevenlabs_tts(voice_text, wav_path, preset=preset)
    else:
        elevenlabs_tts(voice_text, wav_path, preset=preset)

    # Pick b-roll
    broll_category = data.get("broll_category", "general")
    category_dir = Path(__file__).parent / "assets" / "broll" / broll_category
    duration = get_duration_seconds(wav_path)
    broll_paths = pick_broll_clips(category_dir, duration)

    # Render
    build_video(
        audio_wav=wav_path,
        beats=beats,
        broll_paths=broll_paths,
        out_mp4=mp4_path,
        width=width,
        height=height,
        fps=fps,
        font=font,
        safe_margin_px=safe_margin_px,
        subtitles_srt=srt_path if (args.subtitles and srt_path.exists()) else None,
    )

    print(f"OK: {mp4_path}")


def main():
    ap = argparse.ArgumentParser(prog="reels_factory")
    sub = ap.add_subparsers(dest="cmd", required=True)

    r = sub.add_parser("render", help="Render a reel from a script JSON")
    r.add_argument("input", help="Path to script JSON")
    r.add_argument("-o", "--output", default=str(Path("dist") / "reels"), help="Output directory")
    r.add_argument(
        "--preset",
        default=None,
        help="Path to a voice preset JSON (e.g. tools/reels_factory/presets/voice_uk_female_calm_punchy.json)",
    )
    r.add_argument(
        "--subtitles",
        action="store_true",
        help="Generate & burn-in subtitles (uses ElevenLabs timestamps when available)",
    )
    r.set_defaults(func=cmd_render)

    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
