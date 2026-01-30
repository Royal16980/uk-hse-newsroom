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

function buildAuthHeaders() {
  // n8n supports multiple auth modes depending on deployment:
  // - Personal API key: X-N8N-API-KEY: <key>
  // - Some tokens/JWTs: Authorization: Bearer <token>
  //
  // Some installs require X-N8N-API-KEY even if the key is JWT-shaped.
  // Safe default: send X-N8N-API-KEY always, and also send Authorization when it looks like a JWT.
  const looksJwt = typeof KEY === 'string' && KEY.split('.').length === 3;
  return {
    'X-N8N-API-KEY': KEY,
    ...(looksJwt ? { Authorization: `Bearer ${KEY}` } : {})
  };
}

async function req(method, path, { body, headers } = {}) {
  const res = await fetch(url(path), {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...buildAuthHeaders(),
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
      // Supports pagination cursors (nextCursor).
      const all = !!args.all;

      let cursor;
      let page = 0;
      const items = [];

      while (true) {
        page += 1;
        const path = cursor
          ? `/api/v1/workflows?cursor=${encodeURIComponent(cursor)}`
          : '/api/v1/workflows';

        const out = await req('GET', path);

        // n8n commonly returns { data: [...], nextCursor: "..." }
        const data = Array.isArray(out?.data) ? out.data : Array.isArray(out) ? out : [];
        if (data.length) items.push(...data);

        cursor = out?.nextCursor;
        if (!all || !cursor) {
          console.log(JSON.stringify(all ? { data: items } : out, null, 2));
          return;
        }

        if (page > 200) die('Pagination safety stop (too many pages).');
      }
    }

    case 'workflows:get': {
      const id = args.id;
      if (!id) die('Missing --id');
      const out = await req('GET', `/api/v1/workflows/${id}`);
      console.log(JSON.stringify(out, null, 2));
      return;
    }

    case 'workflows:search': {
      const q = (args.query || args.q || '').toString().trim().toLowerCase();
      if (!q) die('Missing --query');

      // Pull all workflows and filter client-side (fast enough for most instances).
      const out = await req('GET', '/api/v1/workflows');
      const firstPage = Array.isArray(out?.data) ? out.data : [];
      let cursor = out?.nextCursor;
      const all = [...firstPage];

      let page = 1;
      while (cursor) {
        page += 1;
        const pageOut = await req('GET', `/api/v1/workflows?cursor=${encodeURIComponent(cursor)}`);
        const pageData = Array.isArray(pageOut?.data) ? pageOut.data : [];
        all.push(...pageData);
        cursor = pageOut?.nextCursor;
        if (page > 200) die('Pagination safety stop (too many pages).');
      }

      const hits = all
        .filter(w => (w?.name || '').toString().toLowerCase().includes(q) || (w?.id || '').toString().toLowerCase() === q)
        .map(w => ({ id: w.id, name: w.name, active: w.active, updatedAt: w.updatedAt }));

      console.log(JSON.stringify({ query: q, count: hits.length, hits }, null, 2));
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
        `  workflows:list [--all]\n` +
        `  workflows:search --query "<text>"\n` +
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
