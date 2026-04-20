---
title: "Bundled plugins"
tags: [plugins, settings]
---


No plugins are currently bundled and shipped with Claude Code. The `initBuiltinPlugins()` scaffolding in `plugins/bundled/index.ts` is in place for future migration of bundled skills that should become user-toggleable plugins. All current bundled features (e.g., `/simplify`, `/debug`, `/batch`) remain as bundled skills under `skills/bundled/`.

### Plugin registry
The `BuiltinPluginDefinition` type (in `types/plugin.ts`) defines:
- `name` (string): plugin identifier
- `description` (string): shown in UI
- `version` (optional): semantic version
- `skills` (optional): array of `BundledSkillDefinition` objects
- `hooks` (optional): hook configurations
- `mcpServers` (optional): MCP server definitions
- `isAvailable()` (optional): function to check system compatibility
- `defaultEnabled` (optional): default toggle state (defaults to `true`)

---

[← Back to Plugins/README.md](/claude-code-docs/plugins/overview/)
