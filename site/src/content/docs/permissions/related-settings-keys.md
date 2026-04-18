---
title: "Related settings keys"
---

# Related settings keys


Permission rules are declared and managed via these settings keys (full documentation in [Settings/permissions-security.md](/claude-code-docs/settings/permissions-security/)):

| Setting | Purpose |
|---------|---------|
| `permissions.allow` | Array of rules that auto-approve tool use. |
| `permissions.deny` | Array of rules that block tool use. |
| `permissions.ask` | Array of rules that force a prompt. |
| `permissions.defaultMode` | Default behavior fallback (`default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`). |
| `permissions.additionalDirectories` | Paths Claude can read/edit beyond the working directory. |
| `autoMode` | Object with `environment`, `allow`, `soft_deny` prose rules for auto-mode classifier tuning. |
| `skipDangerousModePermissionPrompt` | Skip the confirmation prompt when entering `bypassPermissions` mode. |
| `skipAutoPermissionPrompt` | Skip the opt-in prompt when activating `auto` mode. |
| `useAutoModeDuringPlan` | Whether plan mode uses auto-mode semantics (default `true`). |
| `disableAutoMode` | Prevent `auto` mode from being used. |
| `disableBypassPermissionsMode` | Prevent `bypassPermissions` mode from being used. |
| `allowManagedPermissionRulesOnly` | (Managed only) Prevent user/project rules; enforce managed rules only. |

See [Settings/permissions-security.md](/claude-code-docs/settings/permissions-security/) for JSON examples and storage details.

---

[← Back to Permissions/README.md](/claude-code-docs/permissions/overview/)
