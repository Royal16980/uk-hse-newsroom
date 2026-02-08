# Event Bus (Option 2) — n8n as the real-time bus

Goal: **near real-time automation** without spamming Royal.

## Design (hybrid, zero-lag)
- **n8n = event ingest + storage** (single inbound webhook)
- **ops/EVENTS.jsonl = local mirror** (append-only, auditable)
- **Ops Director = dispatcher** (reads events → updates backlog → spawns workers)

This avoids “waiting for the daily digest” while still keeping comms structured.

---

## 1) Event ingest (n8n webhook)
Create an n8n workflow:
- Trigger: **Webhook** `POST /webhook/bsmb-events`
- Step: validate a shared secret header (e.g. `x-bsmb-token`)
- Step: normalise payload to the schema below
- Step: store event (Data Store / DB / execution log)
- Respond 200 JSON: `{ "ok": true }`

### Event payload schema (what agents send)
```json
{
  "ts": "2026-02-08T19:04:00.000Z",
  "source": "ops|research|writer|coder|finance|main|worker:<label>",
  "type": "task_started|task_done|blocked|needs_decision|metric|ship|alert",
  "severity": "info|warn|critical",
  "objective": "Traffic engine|Lead engine|List engine|Automation engine",
  "title": "Short human title",
  "detail": "1-5 lines max",
  "links": ["C:/Users/ADMIN/clawd/ops/OPS_NEXT_5.md"],
  "meta": {
    "priority": "P0|P1|P2",
    "owner": "ops|research|writer|coder|finance",
    "deadline": "2026-02-09",
    "tags": ["uk-hse-hub", "templates"]
  }
}
```

### Rules
- **Always include:** `ts, source, type, severity, title`
- Keep `detail` short (this is a bus, not a report)

---

## 2) Local mirror (ops/EVENTS.jsonl)
- File: `C:/Users/ADMIN/clawd/ops/EVENTS.jsonl`
- Format: **one JSON object per line**
- Append-only; never rewrite history.

---

## 3) Real-time dispatcher loop (Ops)
Ops runs a frequent sync loop:
- Pull new events from n8n (since last cursor)
- Append to `ops/EVENTS.jsonl`
- Update `ops/BOARD_BACKLOG.md` (create/move tasks)
- Spawn worker sub-agents when tasks are ready

Escalation to Royal remains controlled by `ops/DIGEST_SYSTEM.md` thresholds.

---

## 4) What I will implement next
1) Create `ops/EVENTS.jsonl` + cursor file locally
2) Add n8n workflow export in `uk-hse-hub/automation/n8n/` for import
3) Add an Ops sync job (cron) that runs every 2 minutes to mirror events → file and dispatch

Note: step (3) requires the n8n workflow to be imported/enabled first.
