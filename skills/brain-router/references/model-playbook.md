# Model/Agent Playbook (Brain Router)

Use this as a lightweight decision guide when routing work.

## Tiers

### Tier A — Cheap/Fast
Use for:
- quick answers, formatting, small edits
- simple scripts / shell commands
- first-pass triage (“what’s going on?”)

Success criteria:
- low hallucination risk
- fast turnaround

### Tier B — Deep/Expensive
Use for:
- deep debugging
- architecture decisions
- sensitive/high-stakes writing
- anything that needs careful reasoning over long context

Success criteria:
- fewer mistakes
- better planning and edge-case coverage

## Escalation triggers
Escalate from Tier A → Tier B if any of these are true:
- uncertainty is high (“I’m not sure”, conflicting evidence)
- user requests “best”, “perfect”, “production-ready”, “no mistakes”
- multi-step tasks where an early wrong step is costly
- security, auth, payments, deployments

## Multi-agent patterns

### Pattern: propose → critique → patch
- agent 1 (cheap or deep) proposes solution
- agent 2 (critic, preferably deep) finds flaws
- agent 1 patches based on critique

### Pattern: parallel specialists
- researcher (facts + links)
- implementer/coder (changes)
- writer (user-facing message)
- main merges

## Output contracts (keep agents honest)
Always require:
- assumptions
- what was verified vs guessed
- final answer + next steps
