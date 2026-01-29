import argparse
import os
import random
from pathlib import Path

import requests

PEXELS_BASE = "https://api.pexels.com/videos/search"

CATEGORY_QUERIES = {
    "ladder": [
        "ladder at work",
        "warehouse ladder",
        "construction ladder",
        "work at height ladder",
    ],
    "mewp": [
        "mobile elevating work platform",
        "cherry picker",
        "boom lift",
        "scissor lift",
    ],
    "factory": [
        "factory machinery",
        "industrial production line",
        "manufacturing night shift",
        "warehouse conveyor",
    ],
    "dashboards": [
        "business dashboard",
        "analytics dashboard",
        "manager looking at reports",
        "data dashboard laptop",
    ],
}


def must_env(name: str) -> str:
    v = os.getenv(name)
    if not v:
        raise SystemExit(f"Missing env var {name}. Set it in PowerShell: $env:{name}='...'")
    return v


def pexels_search(query: str, per_page: int, page: int) -> dict:
    key = must_env("PEXELS_API_KEY")
    headers = {"Authorization": key}
    r = requests.get(PEXELS_BASE, headers=headers, params={"query": query, "per_page": per_page, "page": page}, timeout=60)
    if r.status_code >= 300:
        raise SystemExit(f"Pexels API error {r.status_code}: {r.text[:500]}")
    return r.json()


def pick_best_file(video: dict) -> dict | None:
    files = video.get("video_files") or []
    if not files:
        return None
    # Prefer 1080x1920-ish portrait if available, else highest quality
    def score(f):
        w = f.get("width") or 0
        h = f.get("height") or 0
        q = (f.get("quality") or "").lower()
        # portrait bonus
        portrait_bonus = 10000 if h > w else 0
        # 1080 bonus
        res_bonus = min(w, h)
        # quality bonus
        q_bonus = 2000 if q == "hd" else (1000 if q == "sd" else 0)
        return portrait_bonus + res_bonus + q_bonus

    return sorted(files, key=score, reverse=True)[0]


def download(url: str, out_path: Path) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with requests.get(url, stream=True, timeout=120) as r:
        r.raise_for_status()
        with open(out_path, "wb") as f:
            for chunk in r.iter_content(chunk_size=1024 * 256):
                if chunk:
                    f.write(chunk)


def cmd_fetch(args: argparse.Namespace) -> None:
    out_root = Path(args.out)
    category = args.category

    if category == "all":
        cats = list(CATEGORY_QUERIES.keys())
    else:
        if category not in CATEGORY_QUERIES:
            raise SystemExit(f"Unknown category: {category}. Choose from: {', '.join(CATEGORY_QUERIES)}")
        cats = [category]

    for cat in cats:
        out_dir = out_root / cat
        out_dir.mkdir(parents=True, exist_ok=True)

        queries = CATEGORY_QUERIES[cat]
        random.shuffle(queries)

        wanted = args.count
        got = 0
        page = 1

        while got < wanted and page <= args.max_pages:
            q = queries[page % len(queries)]
            data = pexels_search(q, per_page=min(20, wanted - got), page=page)
            videos = data.get("videos") or []
            if not videos:
                page += 1
                continue

            for v in videos:
                best = pick_best_file(v)
                if not best:
                    continue
                link = best.get("link")
                if not link:
                    continue

                vid_id = v.get("id") or random.randint(100000, 999999)
                filename = f"pexels_{vid_id}.mp4"
                out_path = out_dir / filename
                if out_path.exists():
                    continue

                print(f"Downloading [{cat}] {q} -> {filename}")
                try:
                    download(link, out_path)
                    got += 1
                    if got >= wanted:
                        break
                except Exception as e:
                    # skip failures
                    try:
                        if out_path.exists():
                            out_path.unlink()
                    except Exception:
                        pass
                    print(f"WARN: failed download: {e}")

            page += 1

        print(f"Done [{cat}]: downloaded {got}/{wanted} to {out_dir}")


def main():
    ap = argparse.ArgumentParser(prog="broll_fetcher")
    sub = ap.add_subparsers(dest="cmd", required=True)

    f = sub.add_parser("fetch", help="Fetch free stock b-roll from Pexels into category folders")
    f.add_argument("--category", default="all", help="ladder|mewp|factory|dashboards|all")
    f.add_argument("--count", type=int, default=12, help="clips per category")
    f.add_argument("--out", default=str(Path(__file__).parent / "assets" / "broll"), help="output root")
    f.add_argument("--max-pages", type=int, default=10, help="API pages to scan per category")
    f.set_defaults(func=cmd_fetch)

    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
