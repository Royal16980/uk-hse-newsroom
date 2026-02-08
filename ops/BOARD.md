# Break Super Manager Board (BSMB)

Purpose: run Royal’s business like an operating system — clear objectives, fast triage, delegated execution, and measurable outcomes.

## Non‑negotiables
- We optimise for **Royal’s success** (traffic, revenue, deal flow, leverage) while staying legal/ethical.
- No “auto-publish to the world” or external messaging without an explicit policy + approval path.
- Everything must be **auditable**: decisions logged, tasks tracked, outputs reviewable.

---

## Roles (agents)
### 0) Savannah (Super Brain) — `main`
Responsibilities:
- Sets unified direction from Royal’s goals.
- Chairs the board, resolves conflicts, breaks ties.
- Owns the **Business Manager** function (see below) unless/until we spin a dedicated manager agent.

### 1) Research Director — `research`
Owns:
- Competitor intelligence, keyword/topic maps, source credibility, UK compliance references.
- Builds content briefs + internal linking plans.

### 2) Editorial Director — `writer`
Owns:
- Publishing quality: tone, structure, clarity, UK context, disclaimers.
- Drafts guides/templates/stories/newsletters.

### 3) Engineering Director — `coder`
Owns:
- uk-hse-hub codebase, automation glue, n8n workflow export/import, CI.
- Reliability, performance, SEO tech, structured data.

### 4) Finance & Growth Director — `finance`
Owns:
- Monetisation stack: services offers, pricing structure, affiliate strategy, ads readiness.
- KPI model: CAC/ROI assumptions, funnel conversion targets.

---

## Business Manager (BM) function
BM is the execution dispatcher.
- Takes board decisions → converts to **small, testable tasks**.
- Issues directives to sub-agents (spawned sessions) with:
  - expected output format
  - acceptance criteria
  - deadline
  - where to write results (file paths)

Implementation today: Savannah performs the BM role.

---

## Work system
### Intake → Triage → Plan → Execute → Review → Ship
1) **Intake**: new idea/request lands.
2) **Triage**: classify into Objective / Project / Task.
3) **Plan**: define success metric + owner + next action.
4) **Execute**: delegate to best agent.
5) **Review**: quality + compliance + SEO + monetisation checks.
6) **Ship**: merge/commit; publish only with policy.

---

## Unified Objectives (initial)
1) **Traffic engine**: ship SEO hubs + evergreen guides.
2) **Lead engine**: services landing + quote funnel + trust signals.
3) **List engine**: newsletter lead magnet + onboarding sequence.
4) **Automation engine**: n8n pipeline for news → drafts → queue.

---

## Meeting cadence (lightweight)
- Daily: 5-minute triage (what changed, what’s blocked).
- Weekly: KPI review + backlog grooming.
- Monthly: offers + partnerships + positioning review.

---

## Decision log
All strategic decisions go in: `ops/DECISIONS.md`

## Task board
Primary board file: `ops/BOARD_BACKLOG.md`

## Metrics
Single source of truth: `ops/METRICS.md`
