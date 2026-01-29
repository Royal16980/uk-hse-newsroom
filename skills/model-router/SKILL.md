---
name: model-router
description: "Route work between models and agents to minimize expensive Claude usage while keeping quality. Use when you want a permanent manager + specialists workflow: a cheap manager model triages, delegates to specialist sub-agents (e.g., Claude for deep reasoning/writing), and enforces budget/guardrails; includes Clawdbot agent/model routing rules, when to use Claude vs GPT, and config snippets for role-based agents (writer/research/coder)."
---

# Model Router

Use a cheap manager for orchestration and only pay for Claude when the task truly needs it.

## Workflow (decision tree)

1) Classify the task
- Tooling / automation / file ops (browser, exec, moving files, glue code) -> use manager model.
- Deep reasoning / long writing / synthesis over many sources -> use Claude brain.
- Code-heavy debugging / refactors -> use coder model (often GPT).

2) Estimate Claude risk (credit burn)
Use Claude only if at least one is true:
- Output quality is highly sensitive (public writing, important docs).
- Requires long-context synthesis (many docs/notes).
- Needs nuanced judgment / creative rewriting.

Otherwise keep it on the manager/coder.

3) Delegate
- If a specialist is needed, spawn a sub-agent run using the specialist model.
- Keep the prompt tight: provide only the inputs needed + a strict output format.

4) Return + verify
- Manager summarizes the specialist output, applies it to tools/files, and asks for confirmation before any irreversible or external action.

## Standard roles

Use these roles consistently:
- manager (cheap): triage, planning, tool use, merging outputs.
- writer (Claude): rewrites, tone, longform.
- research (Claude): reading/synthesis.
- coder (GPT): programming, scripts, debugging.

See references/config-snippets.md for the recommended Clawdbot config layout.

## Prompt templates

### Specialist prompt template (Claude)
Keep it short and bounded.

```
You are the specialist. Do NOT use tools. Output only the requested deliverable.

Task:
<one paragraph>

Inputs:
- <bullet list>

Constraints:
- Max length: <n>
- Tone: <tone>
- Must include: <items>

Return format:
<exact format>
```

### Manager handoff template (back to tools)

```
I will now apply the specialist output.
Steps:
1) <tool action>
2) <tool action>

If any step is destructive/external, pause and ask.
```

## Guardrails (do not waste Claude)

- Prefer shorter context to Claude: pass excerpts, not entire folders.
- Cap iterations: if 2 Claude passes did not solve it, switch strategy.
- Use Claude for drafting, manager for execution.

## References

- Routing heuristics + examples: references/routing-policy.md
- Config snippets for role-based agents + model IDs: references/config-snippets.md
