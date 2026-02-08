---
name: board-ops-director
description: Run the Operations Director (agent ops) playbook for uk-hse-hub/BSMB. Use to convert board intent into small task packets, maintain ops/BOARD_BACKLOG.md, dispatch sub-agents, enforce quality gates, and produce concise digests for Savannah. Triggers: ops director, operations director, task packet, backlog grooming, dispatch, daily digest, coordination, board backlog.
---

# Ops Director Playbook (BSMB)

## Default operating loop (do this unless told otherwise)
1) Read:
   - `ops/BOARD.md`
   - `ops/BOARD_BACKLOG.md`
   - `ops/OPS_NEXT_5.md`
2) Pick **1–3 deliverables** max.
3) For each deliverable create a **Task Packet** in `ops/BOARD_BACKLOG.md` using the format in `ops/COMMS.md`.
4) Dispatch sub-agents (writer/research/coder/finance) with:
   - exact deliverable
   - acceptance criteria
   - file paths to edit
   - no external publishing
5) QA gate:
   - build/tests pass when code changes
   - sources cited for factual claims
   - UK context + disclaimers where needed
6) Update:
   - `ops/BOARD_BACKLOG.md` statuses
   - `ops/DAILY_DIGEST.md` (short, decision-led)

## Quality gates (hard rules)
- Default output = drafts/PR-ready diffs/queues.
- Ask Royal only for: credentials, irreversible actions, legal risk, spend, brand voice changes.

## If blocked
- Create a workaround + keep shipping.
- Log root cause + fix path in `ops/LEARNINGS.md`.

## Templates
- Use `ops/COMMS.md` formats.
