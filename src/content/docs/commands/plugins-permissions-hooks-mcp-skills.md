---
title: "Plugins, Permissions, Hooks, MCP, Skills"
tags: [cli]
---


### `/hooks`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "View hook configurations for tool events. Type `/hooks` in Claude Code to open a read-only browser for your configured hooks. The menu shows every hook event with a count of configured hooks, lets you drill into matchers, and shows the full details of each hook handler." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/hooks`
- **Notes:** Complements `.claude/hooks.yaml`; this command provides an interactive UI for exploring them.

### `/mcp`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Manage MCP server connections and OAuth authentication" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/mcp`
- **Notes:** Opens interactive manager for MCP (Model Context Protocol) servers.

### `/permissions`
- **Aliases:** `/allowed-tools`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Manage allow, ask, and deny rules for tool permissions. Opens an interactive dialog where you can view rules by scope, add or remove rules, manage working directories, and review recent auto mode denials." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/permissions`
- **Notes:** Shows a rule builder for granular tool access control.

### `/plugin`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Manage Claude Code plugins. Opens the interactive plugin manager UI. Plugin management subcommands (install, uninstall, enable, disable, update, list, validate) are available as `claude plugin <subcommand>` CLI commands, not as in-session slash subcommands." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/plugin` (opens UI) or `claude plugin install code-review@claude-plugins-official` (CLI)
- **Notes:** In-session `/plugin` opens a UI; CLI `claude plugin` subcommands are separate.

### `/reload-plugins`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Reload all active plugins to apply pending changes without restarting. Reports counts for each reloaded component and flags any load errors" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/reload-plugins`
- **Notes:** Use after installing or modifying plugins to apply changes immediately.

### `/skills`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Press `t` to sort by token count
- **Description:** "List available skills. Press `t` to sort by token count" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/skills`
- **Notes:** Shows all active skills (bundled, custom, and plugin-provided) with descriptions and token cost.

### `/agents`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Manage agent configurations" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/agents`
- **Notes:** Opens an interactive panel to browse and manage subagents loaded from `.claude/agents/`, installed plugins, and `agents` settings.json definitions. Plugin-provided agents appear here (as noted in the plugin manifest reference). When `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` is enabled, `/agents` is also the coordination interface for managing concurrent team workers alongside the task list infrastructure.

---

[← Back to Commands/README.md](/claude-code-docs/cli/overview/)
