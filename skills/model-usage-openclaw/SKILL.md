---
name: model-usage-openclaw
description: Track model usage/cost inside OpenClaw without CodexBar. Use when the user asks about token/cost usage, which model is being used, or wants a cost-efficient routing plan. Uses session_status and gateway usage-cost commands.
---

# model-usage-openclaw

## Quick checks

### Current session usage
- Use `session_status` to show usage/time/cost where available.

### Gateway usage-cost summary
- Prefer `clawdbot gateway usage-cost` (or `openclaw gateway usage-cost`) to summarize session logs.

## Guidance

- If costs are high, propose routing changes:
  - main session = manager/cheap
  - sub-agents = deep only when needed
  - add critic pass only for high-stakes tasks

## Output
- 3 bullets: what’s using spend, what to change, expected impact.
