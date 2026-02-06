import json
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path

# Minimal, Windows-friendly extractor.
# Requirements (preferred): yt-dlp + ffmpeg available on PATH.
# If missing, the script still creates an analysis folder and exits with guidance.


def run(cmd, cwd=None):
    p = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, shell=False)
    return p.returncode, p.stdout.strip(), p.stderr.strip()


def which(name: str):
    return shutil.which(name)


def safe_slug(s: str):
    s = re.sub(r"[^a-zA-Z0-9_-]+", "-", s).strip("-")
    return s[:80] if len(s) > 80 else s


def main():
    if len(sys.argv) < 2:
        print('Usage: python extract_youtube_style.py "<YOUTUBE_URL>"')
        sys.exit(2)

    url = sys.argv[1]
    root = Path(__file__).resolve().parents[1]  # skill folder
    out_root = root / "analysis"
    out_root.mkdir(parents=True, exist_ok=True)

    meta = {
        "url": url,
        "ts": datetime.utcnow().isoformat() + "Z",
        "tools": {
            "yt_dlp": bool(which("yt-dlp") or which("yt_dlp")),
            "ffmpeg": bool(which("ffmpeg")),
            "ffprobe": bool(which("ffprobe")),
        },
        "status": "init",
        "notes": [],
    }

    # Tool availability checks
    yt = which("yt-dlp") or which("yt_dlp")
    ffmpeg = which("ffmpeg")
    ffprobe = which("ffprobe")

    if not yt:
        meta["status"] = "missing_yt_dlp"
        meta["notes"].append("yt-dlp not found on PATH. Install yt-dlp or use OpenClaw yt-dlp skill.")
        (out_root / "metadata.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
        print(json.dumps(meta, indent=2))
        sys.exit(1)

    if not ffmpeg or not ffprobe:
        meta["status"] = "missing_ffmpeg"
        meta["notes"].append("ffmpeg/ffprobe not found on PATH. Install ffmpeg.")
        (out_root / "metadata.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
        print(json.dumps(meta, indent=2))
        sys.exit(1)

    # Get video id + title
    code, title, err = run([yt, "--get-title", url])
    if code != 0:
        title = "video"
        meta["notes"].append(f"Could not fetch title: {err}")

    code, vid, err = run([yt, "--get-id", url])
    if code != 0:
        vid = safe_slug(title) or "video"
        meta["notes"].append(f"Could not fetch id: {err}")

    vid = safe_slug(vid)
    out_dir = out_root / vid
    frames_dir = out_dir / "frames"
    out_dir.mkdir(parents=True, exist_ok=True)
    frames_dir.mkdir(parents=True, exist_ok=True)

    meta["videoId"] = vid
    meta["title"] = title

    # Download
    video_path = out_dir / "video.%(ext)s"
    code, so, se = run([yt, "-f", "bv*+ba/b", "-o", str(video_path), url])
    if code != 0:
        meta["status"] = "download_failed"
        meta["notes"].append(se or so or "download failed")
        (out_dir / "metadata.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
        print(json.dumps(meta, indent=2))
        sys.exit(1)

    # Find downloaded file
    downloaded = None
    for p in out_dir.iterdir():
        if p.is_file() and p.name.startswith("video."):
            downloaded = p
            break

    if not downloaded:
        meta["status"] = "download_missing"
        meta["notes"].append("Download completed but output file not found.")
        (out_dir / "metadata.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
        print(json.dumps(meta, indent=2))
        sys.exit(1)

    meta["downloaded"] = str(downloaded)

    # Probe
    code, probe_out, probe_err = run([
        ffprobe,
        "-v",
        "error",
        "-show_entries",
        "format=duration:stream=codec_name,codec_type,width,height,r_frame_rate",
        "-of",
        "json",
        str(downloaded),
    ])

    if code == 0:
        try:
            meta["ffprobe"] = json.loads(probe_out)
        except Exception:
            meta["notes"].append("ffprobe JSON parse failed")
    else:
        meta["notes"].append(probe_err)

    # Extract audio wav
    audio_path = out_dir / "audio.wav"
    run([ffmpeg, "-y", "-i", str(downloaded), "-vn", "-ac", "1", "-ar", "48000", str(audio_path)])
    meta["audio"] = str(audio_path)

    # Sample frames: 1 frame every 2 seconds (cap at ~120 frames)
    # Use fps filter with select to avoid huge output on long videos
    frame_pattern = str(frames_dir / "frame-%04d.jpg")
    run([
        ffmpeg,
        "-y",
        "-i",
        str(downloaded),
        "-vf",
        "fps=0.5,scale=1280:-2",
        "-q:v",
        "3",
        frame_pattern,
    ])

    meta["framesDir"] = str(frames_dir)
    meta["status"] = "ok"

    (out_dir / "metadata.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print(json.dumps(meta, indent=2))


if __name__ == "__main__":
    main()
