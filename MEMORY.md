# Long-term Memory

## About Royal
- Newbie; prefers beginner-friendly, step-by-step explanations with minimal jargon.
- Timezone: Europe/London (Southampton, UK).
- Wants autonomous decision-making — don't ask operational routing questions, just choose the best default and log it.
- Only ask when decisions are irreversible, risky, or need user-provided secrets.
- Prefers female voice for video narration/voiceover.

## Agent Comms Policy
- Only Savannah (main) talks to Royal directly.
- Sub-agents stay silent unless Savannah includes short quoted snippets when useful.
- Savannah stays on Opus for oversight; sub-agents do heavy lifting on cheaper models.

## Projects
### uk-hse-hub
- Health & safety content site (Next.js). Content-driven via `content/*.json`.
- Competitors to emulate: CHAS Insights (taxonomy/topic hubs), iHasco blog (compliance/training).
- Monetisation plan, 30-day content plan, and ops structure all in `ops/`.

### Board / Multi-Agent System
- Governance docs under `ops/` (BOARD.md, BOARD_BACKLOG.md, DECISIONS.md, etc.).
- Sub-agents: writer, research, coder, finance, ops (Operations Director).
- n8n event bus for agent comms: `/webhook/bsmb-events` on n8n.srv1246730.hstgr.cloud.

## Infrastructure
- n8n: https://n8n.srv1246730.hstgr.cloud (Hostinger VPS, Traefik reverse proxy).
- n8n gotcha: API-created webhooks need explicit `webhookId` or they 404 in production.
- OpenClaw CLI (`openclaw status`, `openclaw gateway status`) hangs via exec — use `session_status` instead.
- Windows exec: use `;` not `&&`/`||` in PowerShell.

## Lessons
- Model deprecations can silently break everything (2026-02-10 incident: opus-4-5 → opus-4-6).
- Always check ALL cron jobs + sub-agent configs after a model change.
- n8n Code nodes on Hostinger VPS block env var access.
