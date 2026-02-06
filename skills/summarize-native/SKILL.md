---
name: summarize-native
description: Summarize web pages or local files without external CLIs. Use when the user asks to summarize a URL, article, PDF, doc, or long text and you can use OpenClaw web_fetch/read/pdf tools. Windows-friendly replacement for the brew-only summarize CLI.
---

# summarize-native

Use OpenClaw built-in tools to summarize content without relying on external binaries.

## Workflow

### A) Summarize a URL
1) Fetch readable content with `web_fetch` (markdown mode).
2) If the page is paywalled/heavy JS, use `browser` (managed profile) to snapshot and extract text.
3) Produce a summary in the requested length, plus key bullets and action items.

### B) Summarize a local file
- If it’s a text-ish file (md/txt/json/csv): use `read`.
- If it’s a PDF: use the `pdf` skill/tools (extract text/tables) then summarize.
- If it’s an image: use `image` tool for OCR + summary.

## Output templates

### Short summary
- 1–2 sentences
- 3 key bullets

### Executive brief
- What it is
- Why it matters
- Risks / caveats
- Next steps

## Guardrails
- Don’t invent facts not present in the source.
- Call out uncertainty or missing sections.
- For financial/medical/legal: include a “not advice” note only if the user is asking for advice.
