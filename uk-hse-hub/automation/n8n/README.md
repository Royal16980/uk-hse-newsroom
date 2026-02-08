# n8n automation (UK HSE Hub)

Goal: keep `content/*.json` updated automatically and generate new draft pages without you manually writing them.

## Principle
Start simple + deterministic:
- n8n **collects sources** (RSS/updates)
- normalises items into clean JSON
- commits to the repo
- the site renders from JSON (no DB required)

Then upgrade:
- AI draft generation (guides/stories)
- template factory
- approvals + publish pipeline

## Inputs (safe, reputable sources)
Suggested starter feeds:
- HSE news / press releases (RSS if available)
- HSE guidance updates
- RoSPA / IOSH updates

## Outputs
- `content/news.json` (latest items)
- `content/guides.json` (evergreen drafts)
- `content/templates.json` (template catalogue metadata)
- `content/topics.json` (topic hubs)

## Workflow blueprint (v1)
1) Trigger: schedule (e.g., hourly)
2) Fetch RSS feeds
3) Deduplicate by URL
4) Classify: topic + industry + content type
5) Write JSON
6) Commit to git (with a bot token)

## Workflow blueprint (v2)
1) For each new item, generate:
   - "What happened" summary
   - "What it means" (UK context)
   - "What to do Monday morning" checklist
2) Save as draft guide/story
3) Create an approval task (queue)

## Notes
We’ll keep auto-publish OFF until you explicitly say so.
