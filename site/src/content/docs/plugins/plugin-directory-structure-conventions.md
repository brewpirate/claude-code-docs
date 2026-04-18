---
title: "Plugin directory structure conventions"
---

# Plugin directory structure conventions


| Component | Default Location | Purpose | Notes |
|-----------|------------------|---------|-------|
| **Manifest** | `.claude-plugin/plugin.json` | Plugin metadata and configuration | Optional if using defaults |
| **Commands** | `commands/` | Flat `.md` skill files | Legacy; use `skills/` for new plugins |
| **Skills** | `skills/` | Skill directories: `<name>/SKILL.md` | Modern approach with supporting files |
| **Agents** | `agents/` | Subagent markdown files | See [Subagents](/claude-code-docs/agents/overview/) for frontmatter |
| **Output styles** | `output-styles/` | Output style markdown files | Custom response formatting |
| **Hooks** | `hooks/hooks.json` | Hook event configurations | Can be inline in `plugin.json` |
| **MCP servers** | `.mcp.json` | MCP server definitions | Can be inline in `plugin.json` |
| **LSP servers** | `.lsp.json` | LSP server configurations | Can be inline in `plugin.json` |
| **Monitors** | `monitors/monitors.json` | Background monitor configs | Array of `{name, command, description, when}` |
| **Executables** | `bin/` | Scripts/binaries added to PATH | Invokable as bare commands in Bash tool |
| **Settings** | `settings.json` | Default plugin configuration | Only `agent` and `subagentStatusLine` keys supported |

---

[← Back to Plugins/README.md](/claude-code-docs/plugins/overview/)
