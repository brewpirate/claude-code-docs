---
title: "Rule updates"
---

# Rule updates


When rules are added, removed, or modified at runtime (via `/permissions` command, API, or auto-mode approvals), the following update types are emitted:

- **`addRules`** — Add one or more new rules to an allow/deny/ask collection and destination (scope).
- **`removeRules`** — Remove one or more rules from a collection and destination.
- **`replaceRules`** — Bulk replace all rules in an allow/deny/ask collection for a destination.
- **`setMode`** — Set the `permissions.defaultMode` for a destination.
- **`addDirectories`** — Add directories to `permissions.additionalDirectories` at a destination.
- **`removeDirectories`** — Remove directories from `permissions.additionalDirectories`.

These updates are applied to the runtime context immediately and optionally persisted to the settings file. See [PermissionUpdate.ts](https://github.com/anthropics/claude-code) for schema details.

---

[← Back to Permissions/README.md](/claude-code-docs/permissions/overview/)
