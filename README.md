# UK HSE Newsroom

A BBC-style, modern health & safety front page focused on the UK.

## Architecture
- Next.js App Router + Tailwind
- Feed file: `content/articles.json`
- Automation: n8n updates the feed and commits to GitHub
- Hosting: Vercel auto-deploy on push

## Dev
```bash
npm install
npm run dev
```

## Health
- `/api/health`
