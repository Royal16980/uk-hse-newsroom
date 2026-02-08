# Digest System (Board → Daily + Weekly)

Goal: keep Royal informed with **one predictable, low-noise update** while still catching true fires fast.

## 1) Daily Digest Schedule (minimise disturbance)

**Default cadence (quiet-first):**
- **Daily digest write-up:** *18:30 GMT* (end-of-day consolidation)
- **Delivery/notification:** **06:45 GMT via WhatsApp** (daily skim)
- **Hard quiet hours:** *20:00–08:00 GMT* — **no pings** unless escalation threshold is met.

**Optional “morning skim” (only if requested later):**
- 08:15 GMT: carry-forward line only (Today’s top focus + any overnight escalations).

**Operational rule:**
- Digest is updated once per day, not continuously. If something changes materially after 18:30, it is handled via escalation rules (Section 4).

## 2) Where it lives / how it’s written

- Primary file (single source of truth): **`ops/DAILY_DIGEST.md`**
- Append one section per day using a consistent header:
  - `## YYYY-MM-DD (Sun) — Daily Board Digest`

## 3) Daily Digest format (exactly 10 lines)

Write **exactly 10 non-empty lines** under each daily header. Keep each line ≤ 140 characters where possible.

**Template (10 lines):**
1. **Status:** Green/Amber/Red — one-phrase reason.
2. **Top priority (24h):** the single outcome that matters most.
3. **Board decisions needed:** yes/no — if yes, name decision + deadline.
4. **Delivery / execution:** 1 key progress + 1 blocker.
5. **Customers / stakeholders:** 1 notable signal (win/loss/feedback).
6. **Finance:** cash/runway note or variance vs plan (1 number if possible).
7. **Ops / people:** staffing, morale, hiring, or capability change (1 item).
8. **Risk register:** top risk + likelihood trend (↑/→/↓).
9. **Next 7 days:** milestone + date.
10. **Asks of Royal:** 0–2 bullet-style asks (or “None”).

**Content rules:**
- Prefer facts + numbers; avoid narrative.
- If Red: line 1 must include the trigger and what’s being done next.
- If no update for a line, write “No change.” (still counts as the line).

## 4) Escalation thresholds (what triggers a ping)

Pings are reserved for events that are **time-sensitive, high-impact, or irreversible**.

### 4.1 Immediate ping (any time, including quiet hours)
Trigger if **any** of the following occurs:
- **Safety / legal:** threat of harm, regulatory action, police involvement, data breach confirmed.
- **Financial:** unexpected cash-out or liability **> £10k**, or runway drops below **30 days**.
- **Reputation:** public viral risk (press inquiry, trending complaint, influencer escalation).
- **Platform/infrastructure:** outage impacting customers **> 30 minutes** with no clear fix ETA.
- **Board-critical:** a decision is required **within 12 hours** to prevent loss.
- **Key-person:** resignation/absence of a critical role affecting delivery within 24h.

### 4.2 Fast ping (send between 08:00–20:00 GMT; bundle if possible)
Trigger if **any** of the following occurs:
- Scope/plan change that moves a committed milestone by **> 7 days**.
- Budget variance expected **> 5%** for the month.
- Customer churn / lost deal with impact **> £5k MRR** (or equivalent strategic value).
- Security incident suspected (not yet confirmed) with credible indicators.

### 4.3 No ping (digest-only)
- Normal progress, routine blockers, small issues with clear mitigation and low downside.
- “FYI” updates that don’t change decisions, risk, or deadlines.

### 4.4 Ping format (keep it brief)
If pinging, send:
- **One sentence:** what happened + why it matters.
- **One sentence:** what we’re doing now + what we need from Royal (if anything).

## 5) Weekly KPI Summary (format)

**Schedule:**
- Write every **Monday 08:30 GMT** covering **previous Mon–Sun**.
- Location: append to **`ops/WEEKLY_KPI.md`** (or a section inside `ops/DAILY_DIGEST.md` if preferred).

**Weekly template (keep to one screen):**
- **Week of:** YYYY-MM-DD → YYYY-MM-DD
- **Headline:** Green/Amber/Red + 1-line explanation
- **KPI table (actual vs target vs WoW):**
  - Revenue (or MRR)
  - Gross margin (if relevant)
  - Cash balance + runway (days)
  - New customers / activations
  - Retention (7d/30d) or churn
  - Delivery: milestone hit rate (% planned done)
  - Incident count (sev1/sev2)
- **Wins (max 3 bullets)**
- **Misses / lessons (max 3 bullets)**
- **Top risks (max 3) + mitigation owner**
- **Next week focus (max 3 bullets)**
- **Decisions/asks (0–3) with deadlines**

## 6) Operating discipline

- Default is **silence + one daily file update**.
- Escalate only when thresholds are met; otherwise, let the digest do the work.
- If multiple fast-ping items occur, bundle into **one message** unless time-critical.
