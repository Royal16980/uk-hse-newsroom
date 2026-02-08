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

