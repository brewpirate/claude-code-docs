---
title: "Security Model"
tags: [hooks, settings]
---


Hooks are a high-trust primitive. A hook that runs arbitrary shell code can read files, exfiltrate data, or modify the codebase. Security controls:

- **SSRF guard (HTTP hooks):** `ssrfGuard.ts` blocks requests to private/link-local IP ranges (169.254.x.x, 10.x.x.x, 172.16-31.x.x, 192.168.x.x, etc.). Loopback (127.0.0.1, ::1) is allowed for local dev. When a global proxy or sandbox proxy is in use, the guard is effectively bypassed for target hostname resolution (the proxy performs DNS and blocks internally).

- **URL allowlist (HTTP hooks):** URLs must match `allowedHttpHookUrls` setting (glob patterns with `*` wildcard). Undefined = no restriction; empty array = block all.

- **Env var allowlist (HTTP hooks):** HTTP hooks can only interpolate env vars listed in both the hook's `allowedEnvVars` AND settings.json `httpHookAllowedEnvVars`. Env vars not in both lists are replaced with empty strings in headers.

- **Shell execution gate (Skills):** `disableSkillShellExecution` setting blocks inline `` !`...` `` and ` ```! ` shell execution in user/project/plugin skills (bundled/managed skills unaffected). Commands replaced with `[shell command execution disabled by policy]`.

- **Hook lockdown (Enterprise):** `disableAllHooks` (managed-only) blocks all user-defined hooks. `allowManagedHooksOnly` shows only admin-defined hooks in the UI.

- **Hook timeouts:** Every handler has a default timeout (~600s for command, ~30s for prompt, etc.); uncapped hooks can hang the session. Set explicit `timeout` fields to tighter bounds.

- **Decision precedence:** PreToolUse/PermissionRequest hooks can deny but cannot override existing allow rules. A hook returning `"approve"` does NOT bypass permission rules (deny rules are checked independently).

**Best practices:**
1. For HTTP hooks, always set `allowedHttpHookUrls` in settings.json and use `allowedEnvVars` for any env vars in headers.
2. For command hooks, test locally before adding to production settings.
3. Log hook decisions (especially blocks) for audit trails.
4. Use `if` conditions to limit hook scope (e.g., `if: "Bash(rm -rf *)"` to target only risky patterns).

---

[← Back to Hooks/README.md](/claude-code-docs/hooks/overview/)
