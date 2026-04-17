# Claude Code — Complete `settings.json` Reference

Compiled from: plugin refs (`claude-code-internals` v2.5.0), the CC binary bundle (v2.1.105), local `settings.json` files on this machine, and the official docs at `code.claude.com/docs/en/settings`. ~125+ keys total.

## Attribution & Output
| Key | Type | Description |
|---|---|---|
| `attribution.commit` | string | Git commit trailer (e.g., "Co-Authored-By: Claude…"). Empty string disables |
| `attribution.pr` | string | PR description attribution. Empty string disables |
| `includeCoAuthoredBy` | bool | **Deprecated** — use `attribution.commit` |

## Authentication & API
| Key | Type | Description |
|---|---|---|
| `apiKeyHelper` | object | API key storage/retrieval mechanism |
| `awsAuthRefresh` | bool | Auto-refresh AWS session credentials |
| `awsCredentialExport` | string | AWS credential export config |
| `forceLoginMethod` | string | Force login method (github, google, …) |
| `forceLoginOrgUUID` | string | Force org UUID for login |
| `forceRemoteSettingsRefresh` | bool | Force remote managed settings refresh |
| `otelHeadersHelper` | object | OpenTelemetry headers helper |

## Channel & Communication
| Key | Type | Description |
|---|---|---|
| `allowedChannelPlugins` | array | **Managed-only.** Allowlist of channel plugins |
| `channelsEnabled` | bool | Enable channel communication features |
| `voiceEnabled` | bool | Enable voice I/O |

## Configuration & Environment
| Key | Type | Description |
|---|---|---|
| `env` | object | Env vars injected into all sessions |
| `defaultShell` | string | Default shell (bash/zsh/fish/…) |
| `language` | string | UI language |

## Development Tools & IDE
| Key | Type | Description |
|---|---|---|
| `autoConnectIde` | bool | Auto-connect to IDE if available |
| `autoInstallIdeExtension` | bool | Auto-install IDE extensions |
| `editorMode` | string | Editor UI mode ("fullscreen", "pane", …) |
| `includeGitInstructions` | bool | Include git instructions in system prompt |
| `respectGitignore` | bool | Respect .gitignore in file suggestions |

## Enterprise & Organization
| Key | Type | Description |
|---|---|---|
| `allowManagedHooksOnly` | bool | **Managed-only.** Block user/project/plugin hooks |
| `allowManagedMcpServersOnly` | bool | **Managed-only.** Only managed MCP servers |
| `allowManagedPermissionRulesOnly` | bool | **Managed-only.** Ignore user/project permission rules |
| `companyAnnouncements` | array | Company announcements to display |
| `blockedMarketplaces` | array | Marketplace blocklist |
| `strictKnownMarketplaces` | bool | **Managed-only.** Restrict plugin marketplaces to known list |

## File & Directory Handling
| Key | Type | Description |
|---|---|---|
| `autoMemoryDirectory` | string | Auto-memory dir path |
| `plansDirectory` | string | Where `/plan` outputs are saved |
| `fileSuggestion.type` | string | "command" or built-in |
| `fileSuggestion.command` | string | Custom command for `@`-mention autocomplete |

## File System Sandbox
| Key | Type | Description |
|---|---|---|
| `filesystem.allowRead` | array | Read-allowed paths |
| `filesystem.allowWrite` | array | Write-allowed paths |
| `filesystem.denyRead` | array | Read-denied paths |
| `filesystem.denyWrite` | array | Write-denied paths |
| `filesystem.allowManagedReadPathsOnly` | bool | **Managed-only.** |
| `sandbox.enabled` | bool | Enable process sandbox |
| `sandbox.autoAllowBashIfSandboxed` | bool | Auto-allow Bash in sandbox mode |
| `sandbox.excludedCommands` | array | Commands excluded from sandbox |
| `sandbox.filesystem` | object | Nested FS sandbox rules |
| `sandbox.network` | object | Nested network sandbox rules |
| `enableWeakerNestedSandbox` | bool | Weaker sandbox for unprivileged Docker (Linux/WSL2) |
| `enableWeakerNetworkIsolation` | bool | Allow system TLS trust service (macOS; ⚠ weakens security) |
| `allowUnsandboxedCommands` | array | Commands allowed to run outside sandbox |

## Hooks & Automation
| Key | Type | Description |
|---|---|---|
| `hooks` | object | PreToolUse / PostToolUse / SessionStart / Stop / CwdChanged / Notification |
| `allowedHttpHookUrls` | array | URL allowlist for HTTP hooks (wildcards ok) |
| `httpHookAllowedEnvVars` | array | Env vars HTTP hooks may use in headers |
| `disableAllHooks` | bool | **Managed-only.** Disable all hooks including managed |
| `disableSkillShellExecution` | bool | Disable shell execution inside skills |

## LLM & Model
| Key | Type | Description |
|---|---|---|
| `model` | string | Default model (e.g., `opus[1m]`, `sonnet-4-6`) |
| `availableModels` | array | Enterprise allowlist |
| `modelOverrides` | object | Per-skill / per-tool model overrides |
| `advisorModel` | string | Secondary advisor model (v2.1.90) |
| `alwaysThinkingEnabled` | bool | Extended thinking on by default |
| `effortLevel` | string | `fast` / `balanced` / `thorough` (also low/medium/high/max) |
| `fastModePerSessionOptIn` | bool | Allow per-session fast-mode opt-in |
| `disableAutoMode` | bool | Hard-disable auto mode |
| `disableBypassPermissionsMode` | bool | Hard-disable bypass-permissions mode |

## Memory & Context
| Key | Type | Description |
|---|---|---|
| `autoMemoryEnabled` | bool | Toggle auto-memory extraction |
| `autoDreamEnabled` | bool | Background consolidation |
| `cleanupPeriodDays` | number | Transcript retention window |
| `autoCompactWindow` | number | Token threshold for compaction |
| `fileCheckpointingEnabled` | bool | Snapshot files before edits (default true) |

## MCP Servers
| Key | Type | Description |
|---|---|---|
| `mcpServers` | object | MCP server configurations |
| `allowedMcpServers` | array | Allowlist (name, command, glob URL) |
| `deniedMcpServers` | array | Blocklist |
| `enableAllProjectMcpServers` | bool | Auto-enable all project MCP servers |
| `enabledMcpjsonServers` | array | Enabled servers from `.mcp.json` |
| `disabledMcpjsonServers` | array | Disabled servers from `.mcp.json` |

## Network & Proxy
| Key | Type | Description |
|---|---|---|
| `network.allowedDomains` | array | Outbound domain allowlist (wildcards) |
| `network.allowManagedDomainsOnly` | bool | **Managed-only.** |
| `network.httpProxyPort` | number | Custom HTTP proxy port |
| `network.socksProxyPort` | number | Custom SOCKS5 proxy port |
| `network.allowUnixSockets` | array | Allowed Unix socket paths |
| `network.allowAllUnixSockets` | bool | Allow all Unix socket access |
| `network.allowLocalBinding` | bool | Allow binding to local ports |
| `network.allowMachLookup` | array | Allowed XPC/Mach services (macOS) |

## Permissions & Security
| Key | Type | Description |
|---|---|---|
| `permissions.allow` | array | Allow rules (e.g., `Bash(npm run *)`, `Read(*.ts)`) |
| `permissions.deny` | array | Deny rules |
| `permissions.ask` | array | Confirm-before-running rules |
| `permissions.defaultMode` | string | `auto` / `bypassPermissions` / `ask` / `plan` |
| `allow` / `deny` / `ask` / `defaultMode` | — | Backwards-compat shorthands for the above |
| `autoMode` | object | Auto-mode classifier configuration |
| `skipDangerousModePermissionPrompt` | bool | Skip "danger mode" confirmation dialog |
| `skipAutoPermissionPrompt` | bool | Skip auto-mode opt-in prompt |
| `useAutoModeDuringPlan` | bool | Enable auto-mode during `/plan` execution |

## Plugins & Extensions
| Key | Type | Description |
|---|---|---|
| `enabledPlugins` | object | Marketplace-scoped plugin ID → bool |
| `extraKnownMarketplaces` | object | Additional marketplaces beyond built-ins |
| `pluginTrustMessage` | string | Custom trust prompt message |
| `strictPluginOnlyCustomization` | bool | Lock skills/agents to plugin delivery |

## Subagents
| Key | Type | Description |
|---|---|---|
| `agents` | object | Custom agent definitions |
| `agent` | string | Run main thread as named subagent |

## UI & Display
| Key | Type | Description |
|---|---|---|
| `theme` | string | UI theme preference |
| `statusLine.type` | string | `"command"` or built-in |
| `statusLine.command` | string | Custom status line command |
| `outputStyle` | string | Output rendering style |
| `viewMode` | string | View mode preference |
| `prefersReducedMotion` | bool | Respect reduced-motion preferences |
| `showThinkingSummaries` | bool | Show extended-thinking summaries |
| `showClearContextOnPlanAccept` | bool | Show clear-context after plan accept |
| `showTurnDuration` | bool | Show per-turn duration |
| `spinnerTipsEnabled` | bool | Spinner tips during ops |
| `spinnerTipsOverride` | string | Override default spinner tips |
| `spinnerVerbs` | array | Custom spinner verbs |
| `terminalProgressBarEnabled` | bool | Show terminal progress bars |
| `autoUpdatesChannel` | string | `stable` / `beta` / … |

## Worktree
| Key | Type | Description |
|---|---|---|
| `worktree.symlinkDirectories` | array | Directories to symlink into worktrees |
| `worktree.sparsePaths` | array | Git sparse-checkout paths for worktrees |

## Telemetry / Misc
| Key | Type | Description |
|---|---|---|
| `feedbackSurveyRate` | number | Survey sampling rate |
| `teammateMode` | bool | Teammate collaboration mode |
| `disableDeepLinkRegistration` | bool | Disable deep-link protocol registration |
| `failIfUnavailable` | bool | Fail if requested resource unavailable |
| `claudeai` | string | claude.ai connection identifier |
