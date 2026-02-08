# Learnings (continuous improvement)

Rules:
- If something fails twice, write a learning + fix.
- If Royal corrects us, write it.
- If a tool/provider changes behaviour, write it.

---

## 2026-02-08
- Several agents were configured to use an unavailable model; fix by pinning board agents to an available model and keeping fallbacks minimal.
- Prefer file-first comms under `ops/` to reduce Royal interruptions.
