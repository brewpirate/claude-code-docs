---
title: "Settings Overview"
description: "settings.json key reference"
---

# Claude Code `settings.json` Reference

Per-section reference for every recognized key in `settings.json`.

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

## Quick reference — all settings keys

| Key | Category | Type | Description |
|-----|----------|------|-------------|
| `advisorModel` | LLM & Model | string | Secondary advisor model (v2.1.90) |
| `agent` | Subagents | string | Run main thread as named subagent |
| `agents` | Subagents | object | Custom agent definitions |
| `allow` / `deny` / `ask` / `defaultMode` | Permissions & Security | — | Backwards-compat shorthands for the above |
| `allowedChannelPlugins` | Channel & Communication | array | **Managed-only.** Allowlist of channel plugins |
| `allowedHttpHookUrls` | Hooks & Automation | array | URL allowlist for HTTP hooks (wildcards ok) |
| `allowedMcpServers` | MCP Servers | array | Allowlist (name, command, glob URL) |
| `allowManagedHooksOnly` | Enterprise & Organization | bool | **Managed-only.** Block user/project/plugin hooks |
| `allowManagedMcpServersOnly` | Enterprise & Organization | bool | **Managed-only.** Only managed MCP servers |
| `allowManagedPermissionRulesOnly` | Enterprise & Organization | bool | **Managed-only.** Ignore user/project permission rules |
| `allowUnsandboxedCommands` | File System Sandbox | array | Commands allowed to run outside sandbox |
| `alwaysThinkingEnabled` | LLM & Model | bool | Extended thinking on by default |
| `apiKeyHelper` | Authentication & API | object | API key storage/retrieval mechanism |
| `attribution.commit` | Attribution & Output | string | Git commit trailer (e.g., "Co-Authored-By: Claude…"). Empty string disables |
| `attribution.pr` | Attribution & Output | string | PR description attribution. Empty string disables |
| `autoCompactWindow` | Memory & Context | number | Token threshold for compaction |
| `autoConnectIde` | Development Tools & IDE | bool | Auto-connect to IDE if available |
| `autoDreamEnabled` | Memory & Context | bool | Background consolidation |
| `autoInstallIdeExtension` | Development Tools & IDE | bool | Auto-install IDE extensions |
| `autoMemoryDirectory` | File & Directory Handling | string | Auto-memory dir path |
| `autoMemoryEnabled` | Memory & Context | bool | Toggle auto-memory extraction |
| `autoMode` | Permissions & Security | object | Auto-mode classifier configuration |
| `autoUpdatesChannel` | UI & Display | string | `stable` / `beta` / … |
| `availableModels` | LLM & Model | array | Enterprise allowlist |
| `awsAuthRefresh` | Authentication & API | bool | Auto-refresh AWS session credentials |
| `awsCredentialExport` | Authentication & API | string | AWS credential export config |
| `blockedMarketplaces` | Enterprise & Organization | array | Marketplace blocklist |
| `channelsEnabled` | Channel & Communication | bool | Enable channel communication features |
| `claudeai` | Telemetry / Misc | string | claude.ai connection identifier |
| `cleanupPeriodDays` | Memory & Context | number | Transcript retention window |
| `companyAnnouncements` | Enterprise & Organization | array | Company announcements to display |
| `defaultShell` | Configuration & Environment | string | Default shell (bash/zsh/fish/…) |
| `deniedMcpServers` | MCP Servers | array | Blocklist |
| `disableAllHooks` | Hooks & Automation | bool | **Managed-only.** Disable all hooks including managed |
| `disableAutoMode` | LLM & Model | bool | Hard-disable auto mode |
| `disableBypassPermissionsMode` | LLM & Model | bool | Hard-disable bypass-permissions mode |
| `disableDeepLinkRegistration` | Telemetry / Misc | bool | Disable deep-link protocol registration |
| `disabledMcpjsonServers` | MCP Servers | array | Disabled servers from `.mcp.json` |
| `disableSkillShellExecution` | Hooks & Automation | bool | Disable shell execution inside skills |
| `editorMode` | Development Tools & IDE | string | Editor UI mode ("fullscreen", "pane", …) |
| `effortLevel` | LLM & Model | string | `fast` / `balanced` / `thorough` (also low/medium/high/max) |
| `enableAllProjectMcpServers` | MCP Servers | bool | Auto-enable all project MCP servers |
| `enabledMcpjsonServers` | MCP Servers | array | Enabled servers from `.mcp.json` |
| `enabledPlugins` | Plugins & Extensions | object | Marketplace-scoped plugin ID → bool |
| `enableWeakerNestedSandbox` | File System Sandbox | bool | Weaker sandbox for unprivileged Docker (Linux/WSL2) |
| `enableWeakerNetworkIsolation` | File System Sandbox | bool | Allow system TLS trust service (macOS; ⚠ weakens security) |
| `env` | Configuration & Environment | object | Env vars injected into all sessions |
| `extraKnownMarketplaces` | Plugins & Extensions | object | Additional marketplaces beyond built-ins |
| `failIfUnavailable` | Telemetry / Misc | bool | Fail if requested resource unavailable |
| `fastModePerSessionOptIn` | LLM & Model | bool | Allow per-session fast-mode opt-in |
| `feedbackSurveyRate` | Telemetry / Misc | number | Survey sampling rate |
| `fileCheckpointingEnabled` | Memory & Context | bool | Snapshot files before edits (default true) |
| `fileSuggestion.command` | File & Directory Handling | string | Custom command for `@`-mention autocomplete |
| `fileSuggestion.type` | File & Directory Handling | string | "command" or built-in |
| `filesystem.allowManagedReadPathsOnly` | File System Sandbox | bool | **Managed-only.** |
| `filesystem.allowRead` | File System Sandbox | array | Read-allowed paths |
| `filesystem.allowWrite` | File System Sandbox | array | Write-allowed paths |
| `filesystem.denyRead` | File System Sandbox | array | Read-denied paths |
| `filesystem.denyWrite` | File System Sandbox | array | Write-denied paths |
| `forceLoginMethod` | Authentication & API | string | Force login method (github, google, …) |
| `forceLoginOrgUUID` | Authentication & API | string | Force org UUID for login |
| `forceRemoteSettingsRefresh` | Authentication & API | bool | Force remote managed settings refresh |
| `hooks` | Hooks & Automation | object | PreToolUse / PostToolUse / SessionStart / Stop / CwdChanged / Notification |
| `httpHookAllowedEnvVars` | Hooks & Automation | array | Env vars HTTP hooks may use in headers |
| `includeCoAuthoredBy` | Attribution & Output | bool | **Deprecated** — use `attribution.commit` |
| `includeGitInstructions` | Development Tools & IDE | bool | Include git instructions in system prompt |
| `language` | Configuration & Environment | string | UI language |
| `mcpServers` | MCP Servers | object | MCP server configurations |
| `model` | LLM & Model | string | Default model (e.g., `opus[1m]`, `sonnet-4-6`) |
| `modelOverrides` | LLM & Model | object | Per-skill / per-tool model overrides |
| `network.allowAllUnixSockets` | Network & Proxy | bool | Allow all Unix socket access |
| `network.allowedDomains` | Network & Proxy | array | Outbound domain allowlist (wildcards) |
| `network.allowLocalBinding` | Network & Proxy | bool | Allow binding to local ports |
| `network.allowMachLookup` | Network & Proxy | array | Allowed XPC/Mach services (macOS) |
| `network.allowManagedDomainsOnly` | Network & Proxy | bool | **Managed-only.** |
| `network.allowUnixSockets` | Network & Proxy | array | Allowed Unix socket paths |
| `network.httpProxyPort` | Network & Proxy | number | Custom HTTP proxy port |
| `network.socksProxyPort` | Network & Proxy | number | Custom SOCKS5 proxy port |
| `otelHeadersHelper` | Authentication & API | object | OpenTelemetry headers helper |
| `outputStyle` | UI & Display | string | Output rendering style |
| `permissions.allow` | Permissions & Security | array | Allow rules (e.g., `Bash(npm run *)`, `Read(*.ts)`) |
| `permissions.ask` | Permissions & Security | array | Confirm-before-running rules |
| `permissions.defaultMode` | Permissions & Security | string | `auto` / `bypassPermissions` / `ask` / `plan` |
| `permissions.deny` | Permissions & Security | array | Deny rules |
| `plansDirectory` | File & Directory Handling | string | Where `/plan` outputs are saved |
| `pluginTrustMessage` | Plugins & Extensions | string | Custom trust prompt message |
| `prefersReducedMotion` | UI & Display | bool | Respect reduced-motion preferences |
| `respectGitignore` | Development Tools & IDE | bool | Respect .gitignore in file suggestions |
| `sandbox.autoAllowBashIfSandboxed` | File System Sandbox | bool | Auto-allow Bash in sandbox mode |
| `sandbox.enabled` | File System Sandbox | bool | Enable process sandbox |
| `sandbox.excludedCommands` | File System Sandbox | array | Commands excluded from sandbox |
| `sandbox.filesystem` | File System Sandbox | object | Nested FS sandbox rules |
| `sandbox.network` | File System Sandbox | object | Nested network sandbox rules |
| `showClearContextOnPlanAccept` | UI & Display | bool | Show clear-context after plan accept |
| `showThinkingSummaries` | UI & Display | bool | Show extended-thinking summaries |
| `showTurnDuration` | UI & Display | bool | Show per-turn duration |
| `skipAutoPermissionPrompt` | Permissions & Security | bool | Skip auto-mode opt-in prompt |
| `skipDangerousModePermissionPrompt` | Permissions & Security | bool | Skip "danger mode" confirmation dialog |
| `spinnerTipsEnabled` | UI & Display | bool | Spinner tips during ops |
| `spinnerTipsOverride` | UI & Display | string | Override default spinner tips |
| `spinnerVerbs` | UI & Display | array | Custom spinner verbs |
| `statusLine.command` | UI & Display | string | Custom status line command |
| `statusLine.type` | UI & Display | string | `"command"` or built-in |
| `strictKnownMarketplaces` | Enterprise & Organization | bool | **Managed-only.** Restrict plugin marketplaces to known list |
| `strictPluginOnlyCustomization` | Plugins & Extensions | bool | Lock skills/agents to plugin delivery |
| `teammateMode` | Telemetry / Misc | bool | Teammate collaboration mode |
| `terminalProgressBarEnabled` | UI & Display | bool | Show terminal progress bars |
| `theme` | UI & Display | string | UI theme preference |
| `useAutoModeDuringPlan` | Permissions & Security | bool | Enable auto-mode during `/plan` execution |
| `viewMode` | UI & Display | string | View mode preference |
| `voiceEnabled` | Channel & Communication | bool | Enable voice I/O |
| `worktree.sparsePaths` | Worktree | array | Git sparse-checkout paths for worktrees |
| `worktree.symlinkDirectories` | Worktree | array | Directories to symlink into worktrees |

## See Also

- [../ENV/README.md](../ENV/README.md) — companion reference for environment variables.
- [../Commands/README.md](../Commands/README.md) — companion reference for built-in slash commands.
- [../Skills/README.md](../Skills/README.md) — companion reference for bundled skills.
- [../Tools/README.md](../Tools/README.md) — companion reference for built-in tools.
- Official docs: <https://code.claude.com/docs/en/settings>
