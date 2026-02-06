---
name: twitter-openclaw
description: Interact with Twitter/X — read tweets, search, post, like, retweet, and manage your timeline.
user-invocable: true
metadata: {"openclaw":{"emoji":"🐦‍⬛","skillKey":"twitter-openclaw","primaryEnv":"TWITTER_BEARER_TOKEN","requires":{"bins":["twclaw"],"env":["TWITTER_BEARER_TOKEN"]},"install":[{"id":"npm","kind":"node","package":"twclaw","bins":["twclaw"],"label":"Install twclaw (npm)"}]}}
---

# twitter-openclaw 🐦‍⬛

Interact with Twitter/X posts from OpenClaw.

## Authentication

This skill uses:
- **Bearer token** (`TWITTER_BEARER_TOKEN`) for read/search when available (can rate-limit)
- **OAuth 1.0a user context** for write operations, via:
  - `TWITTER_API_KEY`, `TWITTER_API_SECRET`
  - `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_TOKEN_SECRET`

Run:

```bash
twclaw auth-check
```

Notes:
- If bearer auth is rate-limited (HTTP 429), the CLI auto-falls back to OAuth1 for `search`/`read`.

## Commands (implemented)

### Auth

```bash
twclaw auth-check
```

### Search (recent)

```bash
twclaw search "openclaw" -n 10
```

### Read a tweet

```bash
twclaw read <tweet-id>
```

### Post (write)

```bash
twclaw tweet "text"
twclaw reply <tweet-id> "text"
```

## Output Options

`--json` must come **before** the subcommand:

```bash
twclaw --json search "openclaw" -n 10
twclaw --json read 1234567890
```

## Guidelines for OpenClaw

- When reading tweets, always show: author, handle, text, timestamp, engagement counts.
- For threads, present tweets in chronological order.
- When searching, summarize results concisely with key metrics.
- Before posting/liking/retweeting, confirm the action with the user.
- Rate limits apply — space out bulk operations.
- Use `--json` when you need to process output programmatically.

## Troubleshooting

### 401 Unauthorized
Check that `TWITTER_BEARER_TOKEN` is set and valid.

### 429 Rate Limited
Wait and retry. Twitter API has strict rate limits per 15-minute window.

---

**TL;DR**: Read, search, post, and engage on Twitter/X. Always confirm before write actions.
