# Claude Code Permission Rules

> **New here?** Start with [GettingStarted/first-permission-rule.md](../GettingStarted/first-permission-rule.md) to learn how to add your first allow/deny rule in 2 minutes. The sections below are the full reference — you don't need all 10 sections to get started.

Reference for the permission rule grammar, evaluation model, and related subsystems. Rules gate which tool invocations Claude can run automatically vs. require user approval vs. block entirely.

## Table of Contents

1. [How permissions are evaluated](./how-permissions-are-evaluated.md)
2. [Rule grammar](./rule-grammar.md)
3. [Permission modes](./permission-modes.md)
4. [Rule scopes](./rule-scopes.md)
5. [Auto-mode classifiers](./auto-mode-classifiers.md)
6. [Rule updates](./rule-updates.md)
7. [Related settings keys](./related-settings-keys.md)
8. [Hooks and permissions](./hooks-and-permissions.md)
9. [Additional / undocumented rule-related subsystems](./additional-undocumented-rule-related-subsystems.md)
10. [Discrepancies & notes](./discrepancies-notes.md)

## Overview

**10 sections**, **14 entries** across grammar forms, modes, and subsystems.

| # | Section | Description | Entries |
|---|---------|-------------|---------|
| 1 | [How permissions are evaluated](./how-permissions-are-evaluated.md) | Evaluation order (dangerous patterns → hooks → deny → allow → default mode), scope precedence, and classifier sub-layer. | narrative |
| 2 | [Rule grammar](./rule-grammar.md) | Rule forms (`Tool`, `Tool(pattern)`, `mcp__server__tool`), per-tool pattern syntax, and what the parser rejects. | 8 entries |
| 3 | [Permission modes](./permission-modes.md) | The six permission modes — `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions` — with behavior and use cases. | 6 entries |
| 4 | [Rule scopes](./rule-scopes.md) | Managed → project → user → session precedence and how conflicts are resolved across layers. | narrative |
| 5 | [Auto-mode classifiers](./auto-mode-classifiers.md) | `bashClassifier`, `yoloClassifier`, `classifierDecision` — the heuristic auto-approval subsystem. | narrative |
| 6 | [Rule updates](./rule-updates.md) | Mutation types emitted by `/permissions` and runtime callers (`addRules`, `removeRules`, `setMode`, etc.). | narrative |
| 7 | [Related settings keys](./related-settings-keys.md) | Cross-links to the `permissions.*`, `autoMode`, and `skip*PermissionPrompt` keys documented in Settings. | narrative |
| 8 | [Hooks and permissions](./hooks-and-permissions.md) | How `PreToolUse` hooks can approve or block tool calls before permission evaluation runs. | narrative |
| 9 | [Additional / undocumented rule-related subsystems](./additional-undocumented-rule-related-subsystems.md) | Source-tree files whose names hint at features not in public docs (dangerousPatterns, shadowedRuleDetection, bypassPermissionsKillswitch, denialTracking). | narrative |
| 10 | [Discrepancies & notes](./discrepancies-notes.md) | Known gaps between public docs and source — hidden `bubble` mode, symlink asymmetry, compound command expansion, escaping order. | narrative |

## Quick reference — rule pattern by tool

| Tool | Pattern form | Example | Wildcards | Notes |
|------|--------------|---------|-----------|-------|
| `Bash` | full-command or prefix with `*` | `Bash(npm run build)`, `Bash(npm *)`, `Bash(* install)` | `*` at any position; space-enforced word boundary | Supports compound commands (`&&`, `\|\|`, `;`). Process wrappers (`timeout`, `nohup`, etc.) are stripped. Read-only commands (`ls`, `cat`, `grep`) auto-allowed in most modes. |
| `Read` | glob path (gitignore syntax) | `Read(src/**/*.ts)`, `Read(~/.zshrc)`, `Read(//tmp/*)` | `*`, `**`, `?`, `{a,b}` brace expansion | Relative to cwd or project root; `~` for home; `//` for absolute. Symlink targets checked separately. |
| `Write` | glob path (gitignore syntax) | `Write(build/**)` | `*`, `**`, `?`, `{a,b}` | Same path semantics as `Read`. Protected dirs (`.git`, `.claude`, `.vscode`, `.idea`, `.husky`) always prompt in `bypassPermissions` mode. |
| `Edit` | glob path (gitignore syntax) | `Edit(/src/**/*.js)` | `*`, `**`, `?`, `{a,b}` | Same path semantics as `Read`. Applies to all file-edit tools. |
| `WebFetch` | domain suffix (no wildcard) | `WebFetch(domain:anthropic.com)` | No; suffix-match only | `domain:` prefix required. Matches `*.anthropic.com` and `anthropic.com` (suffix-match). |
| `WebSearch` | no pattern | `WebSearch` | N/A | Rule name only; no specifier. Controls WebSearch tool access. |
| `Agent` | subagent type name | `Agent(Explore)`, `Agent(my-custom-agent)` | No literal wildcard; exact name match | Deny rules block subagent invocation. |
| `Skill` | skill name | `Skill(validate-sql)` | No literal wildcard; exact name match | Gated like other tools when invoked via Skill tool. |
| `mcp__*` | MCP server and tool | `mcp__slack__*`, `mcp__slack__slack_send_message` | `*` for all tools on a server | Literal `mcp__server__tool` or wildcard `mcp__server__*`. See [Rule grammar—MCP patterns](#mcp-patterns). |
| `Monitor`, `Config`, `TodoWrite`, etc. | no pattern (if not documented otherwise) | `Monitor` | N/A | Tool-specific. Most do not accept patterns; apply to all uses. |

## See Also

- [../Settings/permissions-security.md](../Settings/permissions-security.md) — settings.json keys that store rules (`permissions.allow`, `permissions.deny`, `permissions.ask`, `permissions.defaultMode`, `autoMode`).
- [../Settings/README.md](../Settings/README.md) — full settings reference.
- [../Tools/README.md](../Tools/README.md) — tools whose invocation is gated by these rules.
- [../Commands/README.md](../Commands/README.md) — `/permissions` command and related slash commands.
- [../ENV/README.md](../ENV/README.md) — env vars that disable permission prompts (`DISABLE_*_PERMISSION*`).
- Official docs: <https://code.claude.com/docs/en/permissions>
