# Config snippets (role-based agents + models)

These are templates. Replace model IDs with the ones you actually have enabled.

## 1) Add provider auth profiles

You need provider auth configured before you can route to those models.

- Anthropic: ANTHROPIC_API_KEY
- OpenAI: OPENAI_API_KEY (if using OpenAI API models)

Prefer storing keys in 1Password and injecting via environment variables.

## 2) Recommended agent layout

Create separate agents so the manager can delegate without switching its own model.

Pseudo-config (illustrative; adjust to Clawdbot schema):

```jsonc
{
  "agents": {
    "defaults": {
      "model": { "primary": "openai/<cheap-manager-model>" }
    },
    "list": [
      {
        "name": "writer",
        "model": { "primary": "anthropic/<claude-writing-model>" },
        "tools": { "deny": ["exec", "write", "edit", "gateway"] }
      },
      {
        "name": "research",
        "model": { "primary": "anthropic/<claude-research-model>" },
        "tools": { "deny": ["exec", "write", "edit", "gateway"] }
      },
      {
        "name": "coder",
        "model": { "primary": "openai/<gpt-coder-model>" }
      }
    ]
  }
}
```

Notes:
- Deny powerful tools to Claude agents if your goal is "brains only".
- Keep the manager agent as the only one with full tool access.

## 3) How to invoke the roles

- Ask the manager: "Use the writer agent for this rewrite"
- The manager should spawn a sub-run with the correct agent/model and return results.
