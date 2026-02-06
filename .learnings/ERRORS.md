# ERRORS

## [ERR-20260206-001] PowerShell Where-Object typo caused noisy failure

**Logged**: 2026-02-06
**Priority**: low
**Status**: resolved
**Area**: ops

### Summary
PowerShell command used `.Name` instead of `$_.Name` inside `Where-Object`, producing repeated `CommandNotFoundException` spam.

### Error
`.Name : The term '.Name' is not recognized ...`

### Fix
Use `Where-Object { $_.Name -match 'twclaw' }`.

---
