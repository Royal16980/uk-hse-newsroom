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

