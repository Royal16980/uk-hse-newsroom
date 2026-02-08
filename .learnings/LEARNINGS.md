# Learnings Log

## [LRN-20260208-001] correction / best_practice

**Logged**: 2026-02-08T20:22:33Z
**Priority**: high
**Status**: resolved
**Area**: infra

### Summary
n8n webhooks created via API can appear active but still return “webhook not registered” if the Webhook node is missing `webhookId` and/or has an invalid responseMode configuration.

### Details
We had production webhook URLs like `/webhook/bsmb-events` returning 404 "not registered" even when workflow was active. Root cause: workflows created/updated programmatically produced Webhook nodes without a `webhookId` field (unlike UI-created ones). Also, using `responseMode=lastNode` alongside a Respond to Webhook node triggers an execution error ("Unused Respond to Webhook node found").

### Suggested Action
- When creating/updating workflows via n8n API, ensure Webhook nodes include:
  - `webhookId` (set to path or a stable unique id)
  - `parameters.responseMode='responseNode'` when a Respond to Webhook node is present.
- Add an automated post-deploy validation step: POST to each production webhook and fail fast if 404 not registered.

### Metadata
- Source: user_feedback + incident
- Tags: n8n, webhook, hostinger, api-created-workflow
- Related: uk-hse-hub/automation/n8n/workflow_event_bus_v1.json, ops/EVENT_BUS.md

---

## [LRN-20260208-002] correction / operating_principle

**Logged**: 2026-02-08T20:56:46Z
**Priority**: high
**Status**: pending
**Area**: config

### Summary
Default to autonomous best-decision-making; avoid repeatedly asking the user operational routing questions.

### Details
User feedback: operational questions (e.g., “A or B?” for routing) waste time. The agent should choose the best default autonomously, keep a local log, and only ask when credentials/risk/high-impact decisions are required.

### Suggested Action
- Adopt default policy: auto-escalate to premium model only on high-complexity/high-stakes tasks; otherwise use a cheap manager brain.
- Maintain a local decision log when switching brains/escalating (memory + .learnings).
- Only ask the user when a decision is irreversible, risky, or requires user-provided secrets.

### Metadata
- Source: user_feedback
- Tags: autonomy, routing, cost-efficiency

---

