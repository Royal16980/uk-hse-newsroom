#!/usr/bin/env python
"""xcli.py - minimal Twitter/X CLI for OpenClaw

Supports:
- auth-check (validates bearer + oauth1 user context)
- search <query>
- read <tweet-id>
- tweet <text>
- reply <tweet-id> <text>

Auth via env vars:
- TWITTER_BEARER_TOKEN (read/search)
- TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET (user-context)

Notes:
- Some endpoints forbid app-only bearer auth (e.g., /2/users/me). We use oauth1 verify_credentials instead.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import textwrap
from typing import Any, Dict, Optional

import requests
from requests_oauthlib import OAuth1


API_V2 = "https://api.x.com/2"
API_V11 = "https://api.x.com/1.1"


def env(name: str) -> Optional[str]:
    v = os.environ.get(name)
    return v if v and v.strip() else None


def bearer_headers() -> Dict[str, str]:
    tok = env("TWITTER_BEARER_TOKEN")
    if not tok:
        raise SystemExit("TWITTER_BEARER_TOKEN not set")
    return {"Authorization": f"Bearer {tok}"}


def oauth1() -> OAuth1:
    api_key = env("TWITTER_API_KEY")
    api_secret = env("TWITTER_API_SECRET")
    access_token = env("TWITTER_ACCESS_TOKEN")
    access_secret = env("TWITTER_ACCESS_TOKEN_SECRET")

    missing = [
        k
        for k, v in {
            "TWITTER_API_KEY": api_key,
            "TWITTER_API_SECRET": api_secret,
            "TWITTER_ACCESS_TOKEN": access_token,
            "TWITTER_ACCESS_TOKEN_SECRET": access_secret,
        }.items()
        if not v
    ]
    if missing:
        raise SystemExit("Missing env vars for user context: " + ", ".join(missing))

    return OAuth1(api_key, api_secret, access_token, access_secret)


def http_json(method: str, url: str, *, headers=None, auth=None, params=None, json_body=None, timeout=30) -> Any:
    r = requests.request(
        method,
        url,
        headers=headers,
        auth=auth,
        params=params,
        json=json_body,
        timeout=timeout,
    )
    try:
        data = r.json()
    except Exception:
        raise SystemExit(f"HTTP {r.status_code}: {r.text}")
    if r.status_code >= 400:
        raise SystemExit(f"HTTP {r.status_code}: {json.dumps(data, indent=2)}")
    return data


def fmt_tweet(t: Dict[str, Any], users_by_id: Dict[str, Dict[str, Any]] | None = None) -> str:
    users_by_id = users_by_id or {}
    author = None
    if "author_id" in t:
        u = users_by_id.get(t["author_id"])
        if u:
            author = f"{u.get('name','')} (@{u.get('username','')})".strip()
    metrics = t.get("public_metrics") or {}
    created = t.get("created_at", "")
    lines = []
    if author:
        lines.append(f"{author} · {created}")
    elif created:
        lines.append(created)
    lines.append(t.get("text", ""))
    if metrics:
        lines.append(
            f"❤️ {metrics.get('like_count',0)}  🔁 {metrics.get('retweet_count',0)}  💬 {metrics.get('reply_count',0)}"
        )
    lines.append(f"ID: {t.get('id','')}")
    return "\n".join([l for l in lines if l is not None])


def cmd_auth_check(args: argparse.Namespace) -> int:
    out: Dict[str, Any] = {"bearer": {}, "user": {}}

    # OAuth1: verify credentials (user context)
    try:
        data = http_json(
            "GET",
            f"{API_V11}/account/verify_credentials.json",
            auth=oauth1(),
        )
        out["user"] = {
            "ok": True,
            "id": data.get("id_str") or str(data.get("id")) if data.get("id") else None,
            "name": data.get("name"),
            "screen_name": data.get("screen_name"),
            "verified": data.get("verified"),
        }
    except SystemExit as e:
        out["user"]["ok"] = False
        out["user"]["error"] = str(e)

    # Bearer: optional (rate limits are common). Do a tiny recent search to validate.
    try:
        q = "openclaw"
        data = http_json(
            "GET",
            f"{API_V2}/tweets/search/recent",
            headers=bearer_headers(),
            params={"query": q, "max_results": 10},
        )
        out["bearer"]["ok"] = True
        out["bearer"]["sample_result_count"] = (data.get("meta") or {}).get("result_count")
    except SystemExit as e:
        out["bearer"]["ok"] = False
        out["bearer"]["error"] = str(e)

    if args.json:
        print(json.dumps(out, indent=2))
    else:
        if out["user"].get("ok"):
            print(f"OK user auth: @{out['user'].get('screen_name')} ({out['user'].get('name')})")
        else:
            print("FAIL user auth")
            print(out["user"].get("error"))

        if out["bearer"].get("ok"):
            print("OK bearer token")
        else:
            # Warning only
            print("WARN bearer token unavailable (often rate limits)")
            print(out["bearer"].get("error"))

    # Consider wiring successful if user auth works.
    return 0 if out["user"].get("ok") else 1


def cmd_search(args: argparse.Namespace) -> int:
    params = {
        "query": args.query,
        "max_results": min(max(args.n, 10), 100),
        "tweet.fields": "created_at,public_metrics,author_id",
        "expansions": "author_id",
        "user.fields": "name,username,verified",
    }

    # Try bearer first (cheaper), then fall back to OAuth1 if bearer is rate-limited.
    data = None
    bearer_err: Optional[str] = None
    try:
        data = http_json("GET", f"{API_V2}/tweets/search/recent", headers=bearer_headers(), params=params)
    except SystemExit as e:
        bearer_err = str(e)
        data = http_json("GET", f"{API_V2}/tweets/search/recent", auth=oauth1(), params=params)

    tweets = data.get("data") or []
    includes = data.get("includes") or {}
    users = {u.get("id"): u for u in (includes.get("users") or []) if u.get("id")}

    if args.json:
        if bearer_err:
            data = {"_note": "bearer failed; used oauth1 fallback", "_bearer_error": bearer_err, **data}
        print(json.dumps(data, indent=2))
    else:
        if bearer_err:
            print("(note) bearer failed; used oauth1 fallback")
        for t in tweets:
            print(fmt_tweet(t, users))
            print("---")
        meta = data.get("meta") or {}
        print(f"{meta.get('result_count', 0)} results for: {args.query!r}")

    return 0


def cmd_read(args: argparse.Namespace) -> int:
    params = {
        "tweet.fields": "created_at,public_metrics,author_id",
        "expansions": "author_id",
        "user.fields": "name,username,verified",
    }

    data = None
    bearer_err: Optional[str] = None
    try:
        data = http_json("GET", f"{API_V2}/tweets/{args.tweet_id}", headers=bearer_headers(), params=params)
    except SystemExit as e:
        bearer_err = str(e)
        data = http_json("GET", f"{API_V2}/tweets/{args.tweet_id}", auth=oauth1(), params=params)

    tweet = data.get("data") or {}
    includes = data.get("includes") or {}
    users = {u.get("id"): u for u in (includes.get("users") or []) if u.get("id")}

    if args.json:
        if bearer_err:
            data = {"_note": "bearer failed; used oauth1 fallback", "_bearer_error": bearer_err, **data}
        print(json.dumps(data, indent=2))
    else:
        if bearer_err:
            print("(note) bearer failed; used oauth1 fallback")
        print(fmt_tweet(tweet, users))

    return 0


def cmd_tweet(args: argparse.Namespace) -> int:
    body = {"text": args.text}
    data = http_json("POST", f"{API_V2}/tweets", auth=oauth1(), json_body=body)
    if args.json:
        print(json.dumps(data, indent=2))
    else:
        tid = (data.get("data") or {}).get("id")
        print(f"✓ tweeted: {tid}")
    return 0


def cmd_reply(args: argparse.Namespace) -> int:
    body = {
        "text": args.text,
        "reply": {"in_reply_to_tweet_id": args.tweet_id},
    }
    data = http_json("POST", f"{API_V2}/tweets", auth=oauth1(), json_body=body)
    if args.json:
        print(json.dumps(data, indent=2))
    else:
        tid = (data.get("data") or {}).get("id")
        print(f"✓ replied: {tid}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="twclaw", add_help=True)
    p.add_argument("--json", action="store_true", help="JSON output")

    sub = p.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("auth-check", help="Verify bearer + user auth")
    s.set_defaults(func=cmd_auth_check)

    s = sub.add_parser("search", help="Search recent tweets")
    s.add_argument("query")
    s.add_argument("-n", type=int, default=10)
    s.set_defaults(func=cmd_search)

    s = sub.add_parser("read", help="Read a tweet by id")
    s.add_argument("tweet_id")
    s.set_defaults(func=cmd_read)

    s = sub.add_parser("tweet", help="Post a tweet (user context)")
    s.add_argument("text")
    s.set_defaults(func=cmd_tweet)

    s = sub.add_parser("reply", help="Reply to a tweet (user context)")
    s.add_argument("tweet_id")
    s.add_argument("text")
    s.set_defaults(func=cmd_reply)

    return p


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())
