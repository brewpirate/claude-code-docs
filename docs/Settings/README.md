# Claude Code `settings.json` Reference

Per-section reference for every recognized key in `settings.json`.
Generated from [./full.md](./full.md).

Compiled from: plugin refs (`claude-code-internals` v2.5.0), the CC binary bundle (v2.1.105), local `settings.json` files on this machine, and the official docs at `code.claude.com/docs/en/settings`. ~125+ keys total.

## Table of Contents

1. [Attribution & Output](./attribution-output.md)
2. [Authentication & API](./authentication-api.md)
3. [Channel & Communication](./channel-communication.md)
4. [Configuration & Environment](./configuration-environment.md)
5. [Development Tools & IDE](./development-tools-ide.md)
6. [Enterprise & Organization](./enterprise-organization.md)
7. [File & Directory Handling](./file-directory-handling.md)
8. [File System Sandbox](./file-system-sandbox.md)
9. [Hooks & Automation](./hooks-automation.md)
10. [LLM & Model](./llm-model.md)
11. [Memory & Context](./memory-context.md)
12. [MCP Servers](./mcp-servers.md)
13. [Network & Proxy](./network-proxy.md)
14. [Permissions & Security](./permissions-security.md)
15. [Plugins & Extensions](./plugins-extensions.md)
16. [Subagents](./subagents.md)
17. [UI & Display](./ui-display.md)
18. [Worktree](./worktree.md)
19. [Telemetry / Misc](./telemetry-misc.md)

## Overview

**19 sections**, **119 keys** total.

| # | Section | Description | Keys |
|---|---------|-------------|------|
| 1 | [Attribution & Output](./attribution-output.md) | Git commit and PR attribution trailers (e.g., Co-Authored-By lines). | 3 |
| 2 | [Authentication & API](./authentication-api.md) | API-key helpers, AWS credential refresh, forced login methods, and OTEL auth helpers. | 7 |
| 3 | [Channel & Communication](./channel-communication.md) | Voice I/O and the managed channel-plugin allowlist. | 3 |
| 4 | [Configuration & Environment](./configuration-environment.md) | Injected env vars, default shell, and UI language. | 3 |
| 5 | [Development Tools & IDE](./development-tools-ide.md) | IDE auto-connect, extension install, editor mode, gitignore respect, and git instruction injection. | 5 |
| 6 | [Enterprise & Organization](./enterprise-organization.md) | Managed-only lockdowns for hooks, MCP servers, permission rules, plus announcements and marketplace blocklists. | 6 |
| 7 | [File & Directory Handling](./file-directory-handling.md) | Auto-memory and `/plan` output directories, plus custom `@`-mention file-suggestion commands. | 4 |
| 8 | [File System Sandbox](./file-system-sandbox.md) | Read/write allow/deny paths, process sandbox toggles, and weaker-sandbox escape hatches for Docker/macOS. | 13 |
| 9 | [Hooks & Automation](./hooks-automation.md) | PreToolUse/PostToolUse/SessionStart/Stop hook definitions and HTTP-hook URL/env allowlists. | 5 |
| 10 | [LLM & Model](./llm-model.md) | Default model, enterprise model allowlist, per-tool overrides, thinking/effort tuning, and mode hard-disables. | 9 |
| 11 | [Memory & Context](./memory-context.md) | Auto-memory, background consolidation, transcript retention, compaction thresholds, and edit checkpointing. | 5 |
| 12 | [MCP Servers](./mcp-servers.md) | MCP server config, allow/deny lists, and `.mcp.json` enable/disable toggles. | 6 |
| 13 | [Network & Proxy](./network-proxy.md) | Outbound domain allowlist, HTTP/SOCKS proxy ports, Unix socket access, and macOS Mach/XPC services. | 8 |
| 14 | [Permissions & Security](./permissions-security.md) | Tool-use allow/deny/ask rules, default permission mode, auto-mode classifier, and danger-mode prompt skips. | 13 |
| 15 | [Plugins & Extensions](./plugins-extensions.md) | Enabled plugins, extra marketplaces, plugin trust messaging, and plugin-only customization lock. | 4 |
| 16 | [Subagents](./subagents.md) | Custom agent definitions and main-thread-as-subagent execution. | 2 |
| 17 | [UI & Display](./ui-display.md) | Theme, status line, output/view mode, thinking summaries, spinner tips, progress bars, and update channel. | 16 |
| 18 | [Worktree](./worktree.md) | Worktree symlink directories and Git sparse-checkout paths. | 2 |
| 19 | [Telemetry / Misc](./telemetry-misc.md) | Feedback survey rate, teammate mode, deep-link registration, resource-unavailable behavior, and claude.ai linkage. | 5 |

## See Also

- [./full.md](./full.md) — single-file consolidated reference.
- [../env/README.md](../env/README.md) — companion reference for environment variables.
- Official docs: <https://code.claude.com/docs/en/settings>
