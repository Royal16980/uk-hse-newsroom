# BSMB Comms Protocol (Board ⇄ Ops ⇄ Workers)

Goal: speed + quality + control without chaos.

## Channels (in order of truth)
1) **Files (source of truth)**: `C:\Users\ADMIN\clawd\ops\`
2) **Agent messages**: task dispatch + status pings
3) **Git commits**: shipped work

## Standard artefacts
- Decision log: `ops/DECISIONS.md`
- Single backlog: `ops/BOARD_BACKLOG.md`
- KPI sheet: `ops/METRICS.md`

## Task packet format (BM → Ops / Workers)
Every directive must include:
- Objective: what this moves
- Priority: P0/P1/P2
- Deliverable: exact file(s) to produce or code paths to change
- Acceptance criteria: measurable checks
- Deadline: when
- Risks: what could go wrong

## Status report format (Ops/Workers → BM)
- Done:
- In progress:
- Blocked:
- Next:
- Links/paths:

## Hand-offs
- Board directors write their deliverables into `ops/` as markdown.
- Ops Director converts approved deliverables into task packets + spawns workers.
- Workers write outputs into repo paths + report back with file links.

## Quality gates (Ops enforces)
- Build passes (`npm run build`)
- No broken links
- SEO basics: title/description + internal links
- Compliance: disclaimers + UK context
- Monetisation: at least one sensible CTA per page

## Approval gates
- External posting/email/publishing: requires explicit Royal approval policy.
