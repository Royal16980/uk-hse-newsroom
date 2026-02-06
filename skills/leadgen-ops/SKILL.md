---
name: leadgen-ops
description: High-ROI lead generation + follow-up automations across WhatsApp/Telegram/X with cron + templates. Use when setting up a money loop: intake questions, qualification, offer, follow-up schedule, and outbound drafts with approval.
---

# leadgen-ops (Money Loop)

Build a simple pipeline that does **intake → qualify → offer → follow-up** without spamming.

## Default rules (don’t be reckless)
- Never send outbound spam. Draft first; ask Royal to approve.
- Use cron for follow-ups; stop once the lead replies.
- Track everything in one place (Notion/Trello/GitHub issue) so leads aren’t lost.

## Playbook

### 1) Intake script (DM)
Ask 4 questions max:
1) What do you do?
2) What result do you want in 30 days?
3) What’s the blocker?
4) Budget range?

### 2) Qualification score (0–10)
- Pain (0–3)
- Ability to pay (0–3)
- Urgency (0–2)
- Access/authority (0–2)

### 3) Offer
Return 3 tiers:
- Starter (fast win)
- Standard (most value)
- Premium (done-for-you)

### 4) Follow-up schedule (cron)
- +1 day: short check-in
- +3 days: value nugget + CTA
- +7 days: final nudge

### 5) Tracking
- If Notion is configured: create a lead row.
- Else Trello: create a card.
- Else GitHub: open an issue in a private ops repo.

## Tools
- Use `cron` for follow-ups.
- Use `message` for proactive sends (only after approval).
- Use `twitter-openclaw` / X auth for drafting and (with approval) posting.
