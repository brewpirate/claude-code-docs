---
title: "How plugins work"
tags: [plugins, settings]
---

# How plugins work


* **Manifest declaration:** Every plugin includes a `.claude-plugin/plugin.json` file that declares the plugin's name, version, description, author, and paths to components (commands, skills, agents, hooks, MCP servers, LSP servers, monitors). The manifest is optional for plugins with default directory layouts; without a manifest, Claude Code auto-discovers components in standard locations.

* **Plugin components:** Plugins can ship multiple types of extensions: skills (interactive prompts Claude can invoke), agents (specialized subagents for task delegation), hooks (event handlers that respond to tool calls, file changes, and session events), MCP servers (external tools and services), LSP servers (language intelligence for code editors), and monitors (background watchers that notify Claude of log events or status changes).

* **Installation and discovery:** Plugins are installed from marketplaces—Git repositories, the official Anthropic marketplace, or custom sources added via settings. When installed, plugins are cached under `~/.claude/plugins/cache/`. Plugins can be enabled per user (global), per project (shared via version control), or locally (project-specific, gitignored). The `/plugin` command opens the interactive plugin manager; `claude plugin` subcommands provide CLI-based management.

* **Lifecycle:** Installation → validation (manifest and component syntax checked) → registration (commands, skills, agents, hooks, and MCP servers registered with the runtime) → enable/disable toggle (persisted in settings). Enabled plugins load at session start and when `/reload-plugins` is invoked.

* **Namespacing:** Plugin skills are always namespaced (e.g., `/plugin-name:skill-name`) to prevent conflicts when multiple plugins define skills with the same name. Commands and agents from plugins also use this namespace.

* **Managed lockdown:** Enterprise organizations can enforce plugin policies via managed settings: `blockedMarketplaces` and `strictKnownMarketplaces` restrict where plugins can be installed from, and `strictPluginOnlyCustomization` ensures only managed plugins are enabled.

* **Auto-update and versioning:** Plugins are versioned using semantic versioning (MAJOR.MINOR.PATCH). The `FORCE_AUTOUPDATE_PLUGINS` environment variable controls automatic updates; per-plugin `autoUpdate` field enables fine-grained control.

---

[← Back to Plugins/README.md](/claude-code-docs/plugins/overview/)
