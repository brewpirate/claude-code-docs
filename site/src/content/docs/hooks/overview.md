---
title: "Hooks Overview"
description: "Event hooks system for Claude Code"
---

# Claude Code Hook Events

> **New here?** Start with [GettingStarted/first-hook.md](/claude-code-docs/getting-started/first-hook/) to create a working hook in under 10 minutes. Once your first hook is working, sections 1-3 below cover everything you need. Skip sections 4 (Matcher semantics), 5 (Scope & configuration), 6 (Security model), and 7 (Additional subsystems) until you need them.

Reference for Claude Code's event hook system — lifecycle events, handler types (command / http / prompt / agent), matcher syntax, and security model. Configure in `settings.json` or in skill/agent frontmatter.

## Table of Contents

1. [How event hooks work](/claude-code-docs/hooks/how-event-hooks-work/)
2. [Event reference](/claude-code-docs/hooks/event-reference/)
3. [Handler types](/claude-code-docs/hooks/handler-types/)
4. [Matcher semantics](/claude-code-docs/hooks/matcher-semantics/)
5. [Scope & configuration](/claude-code-docs/hooks/scope-configuration/)
6. [Security model](/claude-code-docs/hooks/security-model/)
7. [Additional hook subsystems (internal)](/claude-code-docs/hooks/additional-hook-subsystems/)
8. [Discrepancies & notes](/claude-code-docs/hooks/overview/)

## Overview

**8 sections**, **~34 entries** — 26 events across 8 categories + 4 handler types.

| # | Section | Description | Entries |
|---|---------|-------------|---------|
| 1 | [How event hooks work](/claude-code-docs/hooks/how-event-hooks-work/) | Lifecycle events, handler types, matchers, scope precedence, SSRF protection, and Stop→SubagentStop auto-conversion. | narrative |
| 2 | [Event reference](/claude-code-docs/hooks/event-reference/) | All 26 hook events grouped by category — Session Lifecycle, User Input, Tool Use, Sub-Agents, Tasks, Environment Changes, Compaction, Elicitation. | 26 events / 8 categories |
| 3 | [Handler types](/claude-code-docs/hooks/handler-types/) | The four handler types — `command`, `http`, `prompt`, `agent` — with config fields, behavior, security, and YAML examples. | 4 entries |
| 4 | [Matcher semantics](/claude-code-docs/hooks/matcher-semantics/) | How `matcher` fields filter events per category — regex for tools, glob for files, exact name for agents/config. | narrative |
| 5 | [Scope & configuration](/claude-code-docs/hooks/scope-configuration/) | Cross-links to settings.json `hooks` key, skill/agent frontmatter `hooks:` field, plugin hooks, and managed-only keys. | narrative |
| 6 | [Security model](/claude-code-docs/hooks/security-model/) | SSRF guard (blocks RFC1918, link-local, cloud metadata), env-var allowlist, shell-execution gate, managed lockdown, timeouts. | narrative |
| 7 | [Additional hook subsystems (internal)](/claude-code-docs/hooks/additional-hook-subsystems/) | Hedged references to internal hook machinery files NOT inspected — registry, config manager, file-watcher, post-sampling hooks. | narrative |
| 8 | [Discrepancies & notes](/claude-code-docs/hooks/overview/) | Undocumented handler fields (`statusMessage`, `once`, `if`, `shell`, `asyncRewake`), matcher variations, decision precedence, SSRF edge cases. | narrative |

## Quick reference — events by category

| Event | Fires when | Matcher? | Blockable? | Handler types | Scope |
|-------|-----------|----------|-----------|---------------|-------|
| **Session Lifecycle** | | | | | |
| `SessionStart` | Session begins or resumes | No | No | command, prompt, agent | settings, skill, agent, plugin |
| `InstructionsLoaded` | CLAUDE.md or rules file loads | No | No | command, prompt, agent | settings, skill, agent, plugin |
| `Notification` | Claude sends a notification | No | No | command, prompt, agent, http | settings, skill, agent, plugin |
| `Stop` | Claude finishes responding | No | Yes | command, prompt, agent | settings, skill, agent, plugin |
| `StopFailure` | Turn ends due to API error | No | No | command, prompt, agent | settings, skill, agent, plugin |
| `SessionEnd` | Session terminates or times out | No | No | command, prompt, agent | settings, skill, agent, plugin |
| **User Input** | | | | | |
| `UserPromptSubmit` | Before Claude processes user prompt | No | Yes (block only) | command, prompt, agent | settings, skill, agent, plugin |
| **Tool Use** | | | | | |
| `PreToolUse` | Before tool execution | tool name | Yes (approve/block) | command, prompt, agent, http | settings, skill, agent, plugin |
| `PermissionRequest` | Permission dialog appears | tool name / rule | Yes (allow/deny) | command, prompt, agent, http | settings, skill, agent, plugin |
| `PermissionDenied` | Auto mode denies a tool call | tool name | No | command, prompt, agent | settings, skill, agent, plugin |
| `PostToolUse` | After tool succeeds | tool name | Yes | command, prompt, agent, http | settings, skill, agent, plugin |
| `PostToolUseFailure` | After tool fails | tool name | No | command, prompt, agent, http | settings, skill, agent, plugin |
| **Sub-agents & Team** | | | | | |
| `SubagentStart` | Subagent spawned | agent type | No | command, prompt, agent, http | settings, skill, agent, plugin |
| `SubagentStop` | Subagent finishes | agent type | Yes | command, prompt, agent, http | settings, skill, agent, plugin |
| `TeammateIdle` | Agent team teammate goes idle | agent type | Yes | command, prompt, agent, http | settings, skill, agent, plugin |
| **Tasks** | | | | | |
| `TaskCreated` | Task created via TaskCreate | No | Yes | command, prompt, agent | settings, skill, agent, plugin |
| `TaskCompleted` | Task marked complete | No | Yes | command, prompt, agent | settings, skill, agent, plugin |
| **Environment & Files** | | | | | |
| `ConfigChange` | Config file (settings.json, CLAUDE.md) changes | config key | No | command, prompt, agent | settings, skill, agent, plugin |
| `CwdChanged` | Working directory changes | No | No | command, prompt, agent | settings, skill, agent, plugin |
| `FileChanged` | Watched file changes | file glob | No | command, prompt, agent | settings, skill, agent, plugin |
| `WorktreeCreate` | Worktree created | No | Yes | command, prompt, agent | settings, skill, agent, plugin |
| `WorktreeRemove` | Worktree removed | No | Yes | command, prompt, agent | settings, skill, agent, plugin |
| **Context Management** | | | | | |
| `PreCompact` | Before context compaction | No | No | command, prompt, agent | settings, skill, agent, plugin |
| `PostCompact` | After compaction completes | No | No | command, prompt, agent | settings, skill, agent, plugin |
| **MCP & Elicitation** | | | | | |
| `Elicitation` | MCP server requests user input | No | No | command, prompt, agent | settings, skill, agent, plugin |
| `ElicitationResult` | User responds to MCP elicitation | No | No | command, prompt, agent | settings, skill, agent, plugin |

## See Also

- [../Settings/hooks-automation.md](/claude-code-docs/settings/hooks-automation/) — the `hooks`, `allowedHttpHookUrls`, `httpHookAllowedEnvVars`, `disableAllHooks`, and `disableSkillShellExecution` settings keys.
- [../Skills/FRONTMATTER.md](/claude-code-docs/skills/overview/) — `hooks:` frontmatter field for skills and agents (Stop auto-converts to SubagentStop).
- [../Permissions/hooks-and-permissions.md](/claude-code-docs/permissions/overview/) — how PreToolUse hooks interact with permission evaluation.
- [../Settings/README.md](/claude-code-docs/settings/overview/) — full settings reference.
- [../Tools/README.md](/claude-code-docs/tools/overview/) — tools whose invocation triggers tool-use hooks.
- Official docs: <https://code.claude.com/docs/en/hooks>
