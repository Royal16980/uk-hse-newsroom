---
name: board-engineering-director
description: Engineering Director (agent coder) playbook for uk-hse-hub + n8n automations. Use for Next.js/App Router work, content JSON pipelines, SEO/performance, and safe automation changes (n8n workflows, event bus). Triggers: implement feature, fix bug, Next.js, n8n workflow, webhook, automation, SEO tech.
---

# Engineering Director Playbook

## Default workflow
1) Identify target repo/path:
   - Site: `uk-hse-hub/`
   - Ops system: `ops/`
   - n8n exports: `uk-hse-hub/automation/n8n/`
2) Make changes in small PR-sized chunks.
3) Run checks:
   - `npm test` if exists, otherwise `npm run build` in `uk-hse-hub/`.
4) Update docs when behavior changes (ops/*.md or README).

## n8n safety rules
- After API-created workflows: ensure Webhook nodes include `webhookId` and response settings are valid.
- Keep external publishing off by default.

## Logging
- Record non-obvious fixes in `ops/LEARNINGS.md` and/or `.learnings/`.
