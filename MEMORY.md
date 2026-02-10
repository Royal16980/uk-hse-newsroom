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

## Agent Hierarchy (fixed 2026-02-10)
- **main (Savannah)** → can only spawn **ops**
- **ops (Operations Director)** → spawns **writer, research, coder, finance**
- Savannah does NOT dispatch workers directly. Ops owns all task dispatch.
- Ops dispatch cron: every 4h (08:00, 12:00, 16:00, 20:00 Europe/London). Cron spawns main → main spawns ops → ops spawns workers.
- Royal explicitly corrected this twice on 2026-02-10. DO NOT regress.

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
- n8n event bus webhook token: `bsmb-2026-prod-token` (header: x-bsmb-token). Auth validation was broken as of 2026-02-10 — checks header exists but doesn't validate value. Fix documented in ops/evidence/webhook_security_audit_2026-02-10.md.
- OpenClaw CLI (`openclaw status`, `openclaw gateway status`) hangs via exec — use `session_status` instead.
- Windows exec: use `;` not `&&`/`||` in PowerShell.
- VPS connection: discussed Option A (node host) vs Option B (move gateway to VPS). Decision: Option A (node host) — needs Royal's SSH creds for srv1246730.hstgr.cloud.

## Cost Discipline
- **Opus is for thinking, not typing.** Don't burn premium tokens on shell commands, API checks, or grunt work.
- Delegate investigative/diagnostic tasks to sub-agents (coder/research on cheaper models).
- Opus should: oversee, decide, communicate with Royal, handle complex reasoning.
- Opus should NOT: run 10 sequential PowerShell commands, parse API responses, do health checks.

## Critical Behaviour Rule
- **ACT, DON'T ASK.** Royal has flagged lack of proactiveness 3+ times. This is final warning territory.
- When ops reports problems → dispatch fixes immediately, don't summarise to Royal.
- When there are options → pick the best one and execute, tell Royal what you did after.
- The only time to ask: irreversible decisions, spending money, or needs Royal's credentials/secrets.

## Cron Jobs (active)
- **Daily self-improvement sweep**: 06:15 Europe/London, model: claude-sonnet-4-5
- **Daily board digest (WhatsApp)**: 06:45 Europe/London, sends to Royal's WhatsApp
- **Ops dispatch cycle**: 08:00/12:00/16:00/20:00 Europe/London, spawns ops → workers

## Decisions Logged
- GitHub shipping policy: PR-only, no direct-to-main (DEC-20260210-001)

## Lessons
- Model deprecations can silently break everything (2026-02-10 incident: opus-4-5 → opus-4-6).
- Always check ALL cron jobs + sub-agent configs after a model change.
- n8n Code nodes on Hostinger VPS block env var access.
- Royal called out cost waste (2026-02-10): stop doing sub-agent work on Opus.
- anthropic/claude-sonnet-4-5 returns "model not allowed" in cron jobs — don't use as model override in cron payloads.
- When spawning large content tasks to writer, split into smaller focused jobs (writer timed out on combined lead magnet + RA pack).
