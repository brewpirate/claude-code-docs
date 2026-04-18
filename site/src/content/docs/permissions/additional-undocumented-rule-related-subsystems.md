---
title: "Additional / undocumented rule-related subsystems"
tags: [permissions, settings]
---

# Additional / undocumented rule-related subsystems


The following source files exist in the codebase and suggest additional rule-related behavior not fully documented in public docs. Inspect source if you need exact behavior:

- **`dangerousPatterns.ts`** (source file exists; behavior unverified): Hardcoded blocklist of dangerous Bash patterns (`rm -rf /`, `curl | sh`, etc.) that override allow rules. Checked after rule evaluation.
- **`shadowedRuleDetection.ts`** (source file exists; behavior unverified): Detects redundant or shadowed rules (e.g., `Bash(npm run test)` shadowed by `Bash(npm *)`). Emits warnings at startup.
- **`bypassPermissionsKillswitch.ts`** (source file exists; behavior unverified): Likely provides a killswitch to force-disable bypass mode, possibly for emergency lockdown.
- **`denialTracking.ts`** (source file exists; behavior unverified): Tracks denied operations for metrics, logging, or PermissionDenied hook triggering.

All of these are internal implementation details. Behavior is unverified without source inspection.

---

[← Back to Permissions/README.md](/claude-code-docs/permissions/overview/)
