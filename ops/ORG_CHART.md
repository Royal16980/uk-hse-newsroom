# Business Operating Structure (Departments → Units → Sub‑agents)

This is how the Business Manager (Ops) can spin up departments/units as **repeatable sub-agent teams**.

## Top level
- **Chair / Strategy:** Savannah (`main`)
- **Business Manager / Dispatch:** Ops Director (`ops`)
- **Directors:** Research (`research`), Editorial (`writer`), Engineering (`coder`), Finance (`finance`)

---

## Department 1: Content (SEO + Evergreen)
**Director:** Editorial (`writer`)

### Units (spawned per sprint)
1) **Briefing Unit** (Research-led)
   - Outputs: brief + outline + sources + internal links
2) **Drafting Unit** (Writer-led)
   - Outputs: draft guides/stories/templates text
3) **QA Unit** (Writer + Ops)
   - Checks: UK context, disclaimers, structure, CTA, internal links

**Typical worker sub-agents:**
- `content-brief-w1`, `draft-w1`, `qa-w1`

---

## Department 2: Templates & Products
**Director:** Finance (`finance`) + Editorial (`writer`)

### Units
1) **Template Design Unit**
   - Defines: what’s included, gating, pricing tier, pack bundling
2) **Template Build Unit** (Writer + Coder)
   - Outputs: template metadata + page copy + download artefacts later
3) **Conversion Optimisation Unit** (Ops)
   - Tests: gate conversion, CTAs, positioning

---

## Department 3: Newsroom Automation
**Director:** Research (`research`) + Engineering (`coder`)

### Units
1) **Source Intake Unit**
   - RSS feeds, change detection, dedupe
2) **Summarisation Unit**
   - “What happened / what it means / Monday actions”
3) **Draft Queue Unit**
   - Writes to `content/news.json` and draft queues; PR creation later

---

## Department 4: Platform & Growth Engineering
**Director:** Engineering (`coder`)

### Units
1) **Site UX/IA Unit**
2) **SEO Tech Unit** (metadata, sitemap, schema, internal linking)
3) **Analytics Unit** (events: template clicks, newsletter submits, quote submits)
4) **Reliability Unit** (build, CI, automation failures, gateway stability)

---

## Department 5: Partnerships & Monetisation
**Director:** Finance (`finance`) + Research (`research`)

### Units
1) **Affiliate/Partner Research Unit**
2) **Outreach Prep Unit** (no sending unless approved)
3) **Offer Optimisation Unit**

---

## How units are created (rule)
- Ops creates units only when:
  - backlog has ≥3 tasks of the same type, or
  - a recurring system is needed (automation/content cadence)

## Staffing model
- Units are **ephemeral**: spawned, do work, write outputs, dissolve.
- Directors remain stable.
