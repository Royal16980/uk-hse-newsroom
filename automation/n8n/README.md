# n8n automation (UK HSE Newsroom)

Goal: keep `content/articles.json` updated automatically.

## Recommended pattern (no DB required)
- n8n runs on a schedule.
- It pulls RSS feeds (HSE news, regulator updates, sector bodies).
- It normalizes them into a clean JSON feed.
- It commits the JSON into this repo.
- Vercel deploys automatically from GitHub.

## Inputs (feeds)
Start with:
- https://www.hse.gov.uk/rss/news.xml (if available)
- https://www.hse.gov.uk/rss/pressrelease.xml (if available)
- IOSH / RoSPA / CIPD safety / relevant UK sources as RSS

## Output file
- `content/articles.json`

## Notes
This repo is designed so the automation can be swapped later for a DB (Vercel Postgres/KV) without redoing the UI.
