---
name: google-workspace-lite
description: Lightweight Google Workspace (Gmail-focused) automation on Windows using the existing workspace scripts (gmail_read.py, gmail_triage.py, gmail_extract_links.py). Use when the user asks to check email, triage inbox, extract links/attachments, or build simple email workflows without installing brew-only gog.
---

# google-workspace-lite

This workspace already contains Gmail helper scripts:
- `gmail_read.py`
- `gmail_triage.py`
- `gmail_extract_links.py`
- `gmail_attachments.py`

Use them instead of the brew-only `gog` CLI.

## Common workflows

### 1) Triage inbox
- Run the triage script.
- Summarize: urgent, action-required, newsletters, receipts.
- Ask before sending replies.

### 2) Extract links from recent emails
- Use `gmail_extract_links.py`.
- Return a deduped list grouped by sender.

### 3) Download attachments
- Use `gmail_attachments.py` and save into `downloads/`.

## Notes
- Credentials are stored in the workspace (treat as secrets).
- Do not email externally without explicit user approval.
