# n8n-ops (draft skill)

Use this skill to let Clawdbot **manage n8n workflows via the n8n REST API** (list/create/update/activate/run).

This is the practical way to “use n8n as a tool” inside Clawdbot today.

> Note: Clawdbot **does not** currently ingest external MCP servers via an `mcpServers` config block. So instead, we talk to n8n directly over HTTPS.

## Prereqs (one-time)

1) In n8n, create an API key:
- n8n → **Settings → n8n API** → create a **Personal API key**.

2) Set environment variables for the Clawdbot process (recommended) OR store them in Clawdbot config under `env.vars`.

- `N8N_BASE_URL` (example: `https://n8n.srv1246730.hstgr.cloud`)
- `N8N_API_KEY` (the personal API key)

### Option A — set in Clawdbot config (persistent)
Add:

```json
{
  "env": {
    "vars": {
      "N8N_BASE_URL": "https://n8n.srv1246730.hstgr.cloud",
      "N8N_API_KEY": "REPLACE_ME"
    }
  }
}
```

Then restart the gateway.

### Option B — set as process env
Set them in whatever you use to launch the gateway/service.

## Commands (run via exec)

These are implemented by `scripts/n8n.mjs`.

### List workflows
```bash
node skills/n8n-ops/scripts/n8n.mjs workflows:list
```

List **all** workflows (auto-paginate):
```bash
node skills/n8n-ops/scripts/n8n.mjs workflows:list --all
```

### Search workflows by name
```bash
node skills/n8n-ops/scripts/n8n.mjs workflows:search --query "HSE Reporter"
```

### Get workflow by id
```bash
node skills/n8n-ops/scripts/n8n.mjs workflows:get --id 123
```

### Create workflow from JSON file
```bash
node skills/n8n-ops/scripts/n8n.mjs workflows:create --file path\\to\\workflow.json
```

### Update workflow from JSON file
```bash
node skills/n8n-ops/scripts/n8n.mjs workflows:update --id 123 --file path\\to\\workflow.json
```

### Activate / Deactivate workflow
```bash
node skills/n8n-ops/scripts/n8n.mjs workflows:activate --id 123
node skills/n8n-ops/scripts/n8n.mjs workflows:deactivate --id 123
```

### Run a workflow (manual execution)
```bash
node skills/n8n-ops/scripts/n8n.mjs workflows:run --id 123 --data "{\"foo\":\"bar\"}"
```

## How I will use this in chat

When you ask:
- “create a workflow that …” → I’ll generate an n8n workflow JSON, create it, then activate it.
- “run the workflow to get …” → I’ll run it and return execution output.
- “update workflow to …” → I’ll patch the workflow JSON and update it.

## Safety

- I will **not** delete workflows unless you explicitly ask.
- I will not store your API keys in git history; keep them in `env.vars` or your system env.
