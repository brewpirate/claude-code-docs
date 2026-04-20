---
title: "Plugins Overview"
description: "Claude Code plugin system"
tags: [plugins, settings]
---

# Claude Code Plugins

Reference for the Claude Code plugin system — `plugin.json` manifest schema, directory layout, lifecycle, marketplace, and bundled-plugin catalog. Plugins package commands, skills, agents, hooks, MCP configs, and output styles into installable units.

## Table of Contents

1. [How plugins work](/claude-code-docs/plugins/how-plugins-work/)
2. [Plugin directory layout](/claude-code-docs/plugins/plugin-directory-layout/)
3. [Manifest field reference](/claude-code-docs/plugins/manifest-field-reference/)
4. [Plugin lifecycle](/claude-code-docs/plugins/plugin-lifecycle/)
5. [Plugin directory structure conventions](/claude-code-docs/plugins/plugin-directory-structure-conventions/)
6. [Marketplace concept](/claude-code-docs/plugins/marketplace-concept/)
7. [Plugin policy](/claude-code-docs/plugins/plugin-policy/)
8. [Bundled plugins](/claude-code-docs/plugins/bundled-plugins/)
9. [Plugin-related CLI subcommands](/claude-code-docs/plugins/plugin-related-cli-subcommands/)
10. [Plugin-related slash commands](/claude-code-docs/plugins/plugin-related-slash-commands/)
11. [Plugin-related settings keys](/claude-code-docs/plugins/plugin-related-settings-keys/)
12. [Plugin-related environment variables](/claude-code-docs/plugins/plugin-related-environment-variables/)
13. [Related subsystems](/claude-code-docs/plugins/related-subsystems/)
14. [Discrepancies & notes](/claude-code-docs/plugins/overview/)
15. [Additional resources](/claude-code-docs/plugins/additional-resources/)

## Overview

**15 sections**, **40 entries** across manifest fields, bundled plugins, and lifecycle phases.

| # | Section | Description | Entries |
|---|---------|-------------|---------|
| 1 | [How plugins work](/claude-code-docs/plugins/how-plugins-work/) | Manifest-driven packaging of commands/skills/agents/hooks/MCP configs, marketplace discovery, install/load/enable lifecycle. | narrative |
| 2 | [Plugin directory layout](/claude-code-docs/plugins/plugin-directory-layout/) | Conventional directory tree for a plugin (plugin.json + commands/, skills/, agents/, hooks/, mcp-servers.json, output-styles/). | narrative |
| 3 | [Manifest field reference](/claude-code-docs/plugins/manifest-field-reference/) | Per-field reference for every `plugin.json` key — Identity, Content paths, Compatibility, Marketplace metadata, Gating, Permissions. | 28 entries |
| 4 | [Plugin lifecycle](/claude-code-docs/plugins/plugin-lifecycle/) | Discovery → install → validate → load → enable → reload → autoupdate → uninstall flow. | 8 entries |
| 5 | [Plugin directory structure conventions](/claude-code-docs/plugins/plugin-directory-structure-conventions/) | File naming and placement rules the loader enforces. | narrative |
| 6 | [Marketplace concept](/claude-code-docs/plugins/marketplace-concept/) | Official marketplace, custom marketplaces, marketplace.json index format, blocklisting, managed restrictions. | 3 entries |
| 7 | [Plugin policy](/claude-code-docs/plugins/plugin-policy/) | Managed-only policy gates from `pluginPolicy.ts`. | narrative |
| 8 | [Bundled plugins](/claude-code-docs/plugins/bundled-plugins/) | Catalog of plugins Anthropic ships in the CLI binary (from `builtinPlugins.ts`). | 1 entries |
| 9 | [Plugin-related CLI subcommands](/claude-code-docs/plugins/plugin-related-cli-subcommands/) | `claude plugin install/uninstall/list/enable/disable/update/validate/search/info` — cross-linked to CLI reference. | narrative |
| 10 | [Plugin-related slash commands](/claude-code-docs/plugins/plugin-related-slash-commands/) | `/plugin` and `/reload-plugins` — cross-linked to Commands reference. | narrative |
| 11 | [Plugin-related settings keys](/claude-code-docs/plugins/plugin-related-settings-keys/) | `enabledPlugins`, `extraKnownMarketplaces`, `pluginTrustMessage`, `strictPluginOnlyCustomization`, `blockedMarketplaces`, `strictKnownMarketplaces`. | narrative |
| 12 | [Plugin-related environment variables](/claude-code-docs/plugins/plugin-related-environment-variables/) | Plugin cache/seed dirs, git timeout, autoupdate, sync-install, cowork, official-marketplace autoinstall. | narrative |
| 13 | [Related subsystems](/claude-code-docs/plugins/related-subsystems/) | Hedged pointers to internal files not inspected — reconciler, autoupdate, zip cache, dependency resolver, etc. | narrative |
| 14 | [Discrepancies & notes](/claude-code-docs/plugins/overview/) | Type/schema mismatches, `deprecated` dual-type, LSP binary requirement, managed-plugin read-only UI, symlink security. | narrative |
| 15 | [Additional resources](/claude-code-docs/plugins/additional-resources/) | Cross-references to sibling docs (Skills, Commands, Hooks, Settings, ENV, CLI) and official docs. | narrative |

## Quick reference — plugin.json fields

| Field | Type | Required? | Description | Applies to |
|-------|------|-----------|-------------|-----------|
| `name` | string | **Yes** | Unique identifier, kebab-case. Used as plugin namespace and marketplace key. | All plugins |
| `version` | string | No | Semantic version (e.g., `1.2.0`). Can be set in marketplace.json instead. | Distributed plugins |
| `description` | string | No | Brief explanation of plugin purpose. Shown in `/plugin` UI. | All plugins |
| `author` | object | No | Author info: `name`, `email`, `url`. | Distributed plugins |
| `homepage` | string | No | Documentation URL. | Distributed plugins |
| `repository` | string | No | Source code repository URL. | Distributed plugins |
| `license` | string | No | SPDX license identifier (e.g., MIT, Apache-2.0). | Distributed plugins |
| `keywords` | array | No | Tags for discovery and categorization. | Marketplace plugins |
| `commands` | string or array | No | Path(s) to command files or directories. Replaces default `commands/`. | Plugins with flat commands |
| `skills` | string or array | No | Path(s) to skill directories containing `SKILL.md`. Replaces default `skills/`. | Plugins with custom skill layout |
| `agents` | string or array | No | Path(s) to agent markdown files. Replaces default `agents/`. | Plugins with custom agent layout |
| `hooks` | string, array, or object | No | Hook configuration: file path(s) or inline config. | Plugins with hooks |
| `mcpServers` | string, array, or object | No | MCP server configuration: file path(s) or inline config. | Plugins with MCP servers |
| `outputStyles` | string or array | No | Path(s) to output style files or directories. Replaces default `output-styles/`. | Plugins with output styles |
| `lspServers` | string, array, or object | No | LSP server configuration: file path(s) or inline config. | Plugins with LSP servers |
| `monitors` | string or array | No | Path(s) to monitor configuration files. Replaces default `monitors/monitors.json`. | Plugins with background monitors |
| `dependencies` | array | No | Other plugins this plugin requires, optionally with semver constraints. | Plugins with cross-plugin deps |
| `userConfig` | object | No | User-configurable values prompted at enable time. Supports sensitive (keychain) and public values. | Plugins needing configuration |
| `channels` | array | No | Message channel declarations that bind to MCP servers (Telegram, Slack, Discord style). | Plugins with chat integrations |
| `minClaudeCodeVersion` | string | No | Minimum Claude Code version required (semver). | Compatibility gating |
| `maxClaudeCodeVersion` | string | No | Maximum Claude Code version supported (semver). | Compatibility gating |
| `requires` | array | No | Required system capabilities (reserved for future use). | Compatibility gating |
| `gatedBy` | string or array | No | Feature flag(s) that must be enabled for the plugin to load. | Feature-flag gating |
| `deprecated` | boolean or string | No | If `true` or a string message, marks plugin as deprecated. | Deprecated plugins |
| `autoUpdate` | boolean | No | Enable automatic updates for this plugin. Defaults to `FORCE_AUTOUPDATE_PLUGINS` env var. | Update control |

## See Also

- [../Skills/FRONTMATTER.md](/claude-code-docs/skills/overview/) — frontmatter schema used by plugin-provided skills, agents, and commands.
- [../Skills/README.md](/claude-code-docs/skills/overview/) — bundled skills catalog (skills delivered as plugins work identically).
- [../Commands/README.md](/claude-code-docs/cli/overview/) — `/plugin` and `/reload-plugins` slash commands.
- [../CLI/README.md](/claude-code-docs/cli/overview/) — `claude plugin <subcommand>` CLI reference.
- [../Hooks/README.md](/claude-code-docs/hooks/overview/) — plugin-provided event hooks.
- [../Settings/plugins-extensions.md](/claude-code-docs/settings/plugins-extensions/) — settings.json keys for plugin configuration.
- [[Settings/enterprise-organization.md](/claude-code-docs/settings/enterprise-organization/) — managed-only marketplace controls.
- [../ENV/README.md](/claude-code-docs/env/overview/) — plugin-related environment variables.
- Official docs: <https://code.claude.com/docs/en/plugins-reference> and <https://code.claude.com/docs/en/plugins>
