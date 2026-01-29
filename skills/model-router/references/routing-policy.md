# Routing policy (cheap manager + expensive brain)

## Default stance
- Assume the manager can do it.
- Escalate to Claude only for tasks where the incremental quality matters.

## Good uses of Claude (Anthropic)
- Writing that must sound human: emails, cover letters, proposals, speeches.
- Summarizing multiple long docs into a clean narrative.
- Producing final polished output where tone/structure matters.
- Complex reasoning where mistakes are costly (still verify).

## Bad uses of Claude (wastes credits)
- Simple browsing/clicking.
- Renaming/moving files.
- Reformatting a document without real rewriting.
- Simple Q&A / short summaries.

## Quick classifier
Route to Claude if >=2:
- More than ~2 pages of input text
- Requires nuanced tone
- Requires synthesis across sources
- Requires original writing

Otherwise keep on manager/coder.

## Examples
- "Summarize these 12 PDFs into a 1-page brief" -> Claude (research)
- "Move these files into folders" -> manager (tools)
- "Write a Python script to rename files" -> coder (GPT)
- "Rewrite my CV to sound stronger" -> Claude (writer)
