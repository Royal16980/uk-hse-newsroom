---
name: brain-router
description: Route tasks to different models and sub-agents for cost efficiency and quality. Use when the user asks to switch brains/LLMs, minimize spend, delegate work to sub-agents, run multi-agent workflows, or choose a fast/cheap vs deep/expensive model per task.
---

# Brain Router (LLM + Agent Switchboard)

Goal: keep the **main session** cheap/fast while still getting high-quality outputs by delegating to specialized sub-agents/models.

## Operating rules

1. **Main session = manager only**
   - Clarify requirements.
   - Choose a lane (cheap/fast vs deep/slow).
   - Delegate with `sessions_spawn`.
   - Integrate the best result back to the user.

2. **Default bias = cheapest model that can safely do the job**
   - Upgrade only when you hit: high-stakes, high-ambiguity, complex reasoning, or user-facing writing that must be excellent.

3. **Always write the delegation plan in the spawned task**
   - Include: objective, constraints, deliverable format, and any files/paths to use.

4. **Parallelize whenever independent**
   - Spawn multiple specialists (researcher + writer + coder), then merge.

## Routing matrix (quick pick)

### Use a cheap/fast model when…
- simple Q&A, small edits, formatting, summaries of short text
- straightforward tool calls (status checks, file reads, simple scripts)
- low-risk admin tasks

### Use a deep/expensive model when…
- you need careful reasoning, tradeoffs, architecture, or tricky debugging
- long-form writing (sales pages, docs, emails) that must be polished
- multi-step plans where mistakes are costly

### Use multiple agents when…
- research + writing + coding can be split
- you want cross-checking (one agent proposes, another critiques)

## Recommended “agent roles” (use sessions_spawn labels)

- **router-manager** (main): decides where to send work; integrates.
- **researcher**: web_search/web_fetch only; returns bullet findings + sources.
- **writer**: turns requirements + notes into final copy.
- **coder**: implements code changes; returns patch plan + diffs.
- **critic**: reviews output for errors, missing requirements, risk.

## Implementation pattern (copy/paste templates)

### 1) Single specialist
Use when one lane is obvious.

- Tool: `sessions_spawn`
- Include model hint inside the task.

Prompt template:

"""
ROLE: <researcher|writer|coder|critic>
OBJECTIVE: …
CONTEXT: …
CONSTRAINTS: …
OUTPUT: … (exact format)
MODEL PREFERENCE: <cheap/fast | deep>
"""

### 2) Two-pass quality (draft + critique)
Use when user-facing quality matters.

1) Spawn **writer** to draft.
2) Spawn **critic** to review.
3) Main session merges.

### 3) Parallel research + write
1) Spawn **researcher** (returns facts + links).
2) Spawn **writer** (uses only provided facts).
3) Main session ensures claims are supported.

## Model selection (practical)

When calling `sessions_spawn`, set `model` explicitly when you know what you want:
- cheap/fast → use your lowest-cost reliable model available
- deep → use your strongest reasoning/writing model

If unsure, spawn a cheap model first; escalate only if it reports uncertainty.

## Safety/quality guardrails

- If a task touches **money, security, production deployments, or irreversible actions**: require a critic pass.
- If the user is angry/urgent: prioritize stabilizing steps + minimal-risk changes; confirm before destructive actions.

## Housekeeping

- Keep sub-agent runs scoped and short.
- Use `cleanup=delete` for one-off runs; `keep` only when you’ll iterate.
