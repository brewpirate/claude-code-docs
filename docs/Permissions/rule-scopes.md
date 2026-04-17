# Rule scopes


Rules are stored in settings files at different scopes. Higher scopes override lower ones.

| Scope | File | Who it affects | Can be overridden |
|-------|------|---|---|
| **Managed** | Server-managed settings, plist/registry, `managed-settings.json` | All users on the machine | No. Takes absolute precedence. |
| **Project (shared)** | `.claude/settings.json` (committed to git) | All collaborators on this repository | Yes, by local or user settings. |
| **Project (local)** | `.claude/settings.local.json` (gitignored) | You, in this repository only | Yes, by user settings (rarely). |
| **User** | `~/.claude/settings.json` | You, across all projects | Yes, by project or managed settings. |
| **Session** | Runtime (`/permissions` command, auto-mode decisions) | This session only | Yes, by managed settings and explicit user action. |

**Precedence (highest to lowest):**
1. Managed settings
2. Local project settings (`.claude/settings.local.json`)
3. Shared project settings (`.claude/settings.json`)
4. User settings (`~/.claude/settings.json`)
5. Session rules (temporary)
6. Default mode fallback

If a tool is denied at any level, no lower level can allow it. Example: a managed deny of `Bash(curl)` cannot be overridden by a project allow.

---

[← Back to Permissions/README.md](./README.md)
