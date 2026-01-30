#!/usr/bin/env node
/**
 * Minimal n8n REST API client/CLI for Clawdbot.
 *
 * Env:
 *   N8N_BASE_URL=https://n8n.example.com
 *   N8N_API_KEY=xxx
 *
 * Notes:
 * - API endpoints can vary slightly by n8n version/self-host config.
 * - This targets the common n8n REST API shape: /api/v1
 */

import fs from 'node:fs/promises';
import process from 'node:process';

function die(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

function getEnv(name) {
  const v = process.env[name];
  if (!v) die(`Missing env ${name}`);
  return v;
}

const BASE = getEnv('N8N_BASE_URL').replace(/\/$/, '');
const KEY = getEnv('N8N_API_KEY');

function url(path) {
  return `${BASE}${path}`;
}

async function req(method, path, { body, headers } = {}) {
  const res = await fetch(url(path), {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // n8n personal API key header (common): X-N8N-API-KEY
      // Some setups also accept: Authorization: Bearer <key>
      'X-N8N-API-KEY': KEY,
      ...(headers || {})
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const ct = res.headers.get('content-type') || '';
  const text = await res.text();

  if (!res.ok) {
    const details = text?.slice(0, 2000);
    die(`HTTP ${res.status} ${res.statusText} on ${method} ${path}\n${details}`);
  }

  if (ct.includes('application/json')) {
    try { return JSON.parse(text); } catch { return { raw: text }; }
  }

  return { raw: text };
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const v = argv[i + 1];
      if (!v || v.startsWith('--')) args[k] = true;
      else { args[k] = v; i++; }
    }
  }
  return args;
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);

  switch (cmd) {
    case 'workflows:list': {
      // GET /api/v1/workflows
      const out = await req('GET', '/api/v1/workflows');
      console.log(JSON.stringify(out, null, 2));
      return;
    }

    case 'workflows:get': {
      const id = args.id;
      if (!id) die('Missing --id');
      const out = await req('GET', `/api/v1/workflows/${id}`);
      console.log(JSON.stringify(out, null, 2));
      return;
    }

    case 'workflows:create': {
      const file = args.file;
      if (!file) die('Missing --file');
      const raw = await fs.readFile(file, 'utf8');
      const body = JSON.parse(raw);
      const out = await req('POST', '/api/v1/workflows', { body });
      console.log(JSON.stringify(out, null, 2));
      return;
    }

    case 'workflows:update': {
      const id = args.id;
      const file = args.file;
      if (!id) die('Missing --id');
      if (!file) die('Missing --file');
      const raw = await fs.readFile(file, 'utf8');
      const body = JSON.parse(raw);
      const out = await req('PUT', `/api/v1/workflows/${id}`, { body });
      console.log(JSON.stringify(out, null, 2));
      return;
    }

    case 'workflows:activate': {
      const id = args.id;
      if (!id) die('Missing --id');
      // Common: POST /api/v1/workflows/:id/activate
      const out = await req('POST', `/api/v1/workflows/${id}/activate`);
      console.log(JSON.stringify(out, null, 2));
      return;
    }

    case 'workflows:deactivate': {
      const id = args.id;
      if (!id) die('Missing --id');
      // Common: POST /api/v1/workflows/:id/deactivate
      const out = await req('POST', `/api/v1/workflows/${id}/deactivate`);
      console.log(JSON.stringify(out, null, 2));
      return;
    }

    case 'workflows:run': {
      const id = args.id;
      if (!id) die('Missing --id');

      // data can be JSON string (input payload)
      let data;
      if (args.data) {
        try { data = JSON.parse(args.data); }
        catch { die('Invalid JSON in --data'); }
      }

      // Common: POST /api/v1/workflows/:id/run
      // Some n8n installs may require /api/v1/workflows/run with workflowId.
      const out = await req('POST', `/api/v1/workflows/${id}/run`, {
        body: data ? { data } : {},
      });
      console.log(JSON.stringify(out, null, 2));
      return;
    }

    default:
      die(
        `Unknown command: ${cmd}\n\n` +
        `Commands:\n` +
        `  workflows:list\n` +
        `  workflows:get --id <id>\n` +
        `  workflows:create --file <workflow.json>\n` +
        `  workflows:update --id <id> --file <workflow.json>\n` +
        `  workflows:activate --id <id>\n` +
        `  workflows:deactivate --id <id>\n` +
        `  workflows:run --id <id> [--data "{...}"]\n`
      );
  }
}

await main();
