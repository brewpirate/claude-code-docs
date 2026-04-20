---
title: "Permissions & Tool Access Control"
tags: [tools]
---


All mutating tools (Write, Edit, Bash, PowerShell, Monitor, Skill, ExitPlanMode) require permission checks. Permission rules are defined in `settings.json` under the `permissions` key, or configured interactively via `/permissions`:

- **Rule types**: `allow`, `ask`, `deny`
- **Scopes**: Global (all tool use), tool-specific (e.g., `Bash: allow`), or pattern-based (e.g., `Read: allow ~/.claude/**`)
- **Per-tool examples**:
  - `Bash: ask` — prompt user before running shell commands
  - `Write: allow` — auto-approve file writes
  - `Edit: deny` — block all edits (use Write instead)
- **Subagent permission inheritance**: Subagents inherit the main session's permission mode at spawn; you can change individual subagent modes afterward but not at spawn time.

See [Permissions](https://code.claude.com/docs/en/permissions) on code.claude.com for complete rules syntax and examples.

---

[← Back to Tools/README.md](/claude-code-docs/tools/overview/)
