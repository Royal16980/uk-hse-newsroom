# Errors Log

## [ERR-20260208-001] openclaw gateway usage-cost command

**Logged**: 2026-02-08T20:56:46Z
**Priority**: medium
**Status**: pending
**Area**: infra

### Summary
Attempting to inspect OpenClaw gateway usage/cost via CLI hung/failed and produced useless terminal output.

### Error
- `openclaw gateway usage-cost --help` hung (killed)
- `openclaw --help` hung (killed)
- `openclaw gateway usage-cost` produced terminal control output and did not return a usable summary

### Context
Goal was to answer user’s “brain use and cost efficiency” question with concrete usage-cost numbers.

### Suggested Fix
- Prefer `session_status` for current-session usage.
- Find correct gateway command for usage/cost (check docs or `openclaw gateway --help` in non-PTY mode) and log the working invocation.
- If CLI is interactive/TTY, capture output via `--json` flag if available.

### Metadata
- Reproducible: unknown
- Tags: openclaw, usage-cost, cli

---

## [ERR-20260209-001] openclaw status / gateway status hang

**Logged**: 2026-02-09T19:35:00Z
**Priority**: low
**Status**: pending
**Area**: infra

### Summary
`openclaw status` and `openclaw gateway status` appeared to hang when run via the OpenClaw `exec` tool (PowerShell/non-PTY). Had to kill the processes.

### Context
This blocks quick health checks inside the automated daily sweep.

### Suggested Fix
- Try running these commands with `pty=true` (TTY) and/or add a `timeout` wrapper.
- If the CLI is doing interactive rendering, look for a `--json` or `--no-tty` flag.
- If still hanging, rely on: (a) `session_status` for current session usage, and (b) Windows Task Scheduler / service status for gateway liveness.

### Metadata
- Reproducible: likely
- Tags: openclaw, status, cli, hang

---

## [ERR-20260210-001] Model deprecation loop — claude-opus-4-5 retired

**Logged**: 2026-02-10T08:00:00Z
**Priority**: critical
**Status**: resolved
**Area**: infra

### Summary
Anthropic retired `claude-opus-4-5` overnight. All API calls returned "Claude Opus 4.5 is no longer available. Please switch to Claude Opus 4.6." for 1+ hour. Main session, cron jobs, and sub-agents all affected.

### Root Cause
- Primary model deprecated with no warning.
- Error was returned as model text output (not HTTP error), so OpenClaw didn't trigger fallback models.
- Cron job also broken: `openai-codex/gpt-5.2` returned "model not allowed".

### Fix
- Config wizard updated primary to `anthropic/claude-opus-4-6`.
- Manually updated self-improvement cron to `anthropic/claude-sonnet-4-5`.

### Prevention
- After any model deprecation, immediately check ALL cron jobs + sub-agent configs for stale model refs.
- Text-level "model unavailable" responses should be treated as errors, not parroted to the user.

### Metadata
- Reproducible: N/A (one-time deprecation)
- Tags: anthropic, model-deprecation, outage, cron

---
