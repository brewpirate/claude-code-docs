---
title: "Tools Overview"
description: "Every tool available to Claude"
---

# Claude Code Built-in Tools

Per-section reference for every built-in tool dispatched by Claude Code.

## Table of Contents

1. [How tools work](/claude-code-docs/tools/how-tools-work/)
2. [Filesystem tools](/claude-code-docs/tools/filesystem-tools/)
3. [Shell & code execution tools](/claude-code-docs/tools/shell-code-execution-tools/)
4. [Network & web tools](/claude-code-docs/tools/network-web-tools/)
5. [Orchestration & agent tools](/claude-code-docs/tools/orchestration-agent-tools/)
6. [Scheduling & tasks](/claude-code-docs/tools/overview/)
7. [Session & user interaction tools](/claude-code-docs/tools/overview/)
8. [MCP (Model Context Protocol) tools](/claude-code-docs/tools/mcp-tools/)
9. [Meta & search tools](/claude-code-docs/tools/overview/)
10. [Remote & entrypoint-specific tools](/claude-code-docs/tools/overview/)
11. [Tools present in source but not in public docs](/claude-code-docs/tools/overview/)
12. [Feature-flag-gated tools summary](/claude-code-docs/tools/overview/)
13. [Discrepancies & notes](/claude-code-docs/tools/overview/)
14. [MCP tools — dynamic registration](/claude-code-docs/tools/overview/)
15. [Permissions & tool access control](/claude-code-docs/tools/permissions-tool-access-control/)
16. [Related references](/claude-code-docs/tools/overview/)

## Overview

**16 sections**, **44 entries** across tool catalog, narrative, and reference subsections.

| # | Section | Description | Entries |
|---|---------|-------------|---------|
| 1 | [How tools work](/claude-code-docs/tools/how-tools-work/) | How Claude dispatches tool calls, permissions, entrypoint gating, and MCP vs built-in distinction. | 0 |
| 2 | [Filesystem tools](/claude-code-docs/tools/filesystem-tools/) | Read, Write, Edit, NotebookEdit, Glob, Grep — the file I/O and search primitives. | 6 |
| 3 | [Shell & code execution tools](/claude-code-docs/tools/shell-code-execution-tools/) | Bash, PowerShell, LSP, Monitor — running commands and interacting with code intelligence. | 4 |
| 4 | [Network & web tools](/claude-code-docs/tools/network-web-tools/) | WebFetch and WebSearch for retrieving external content. | 2 |
| 5 | [Orchestration & agent tools](/claude-code-docs/tools/orchestration-agent-tools/) | Agent, Skill, SendMessage, TeamCreate/Delete — spawning and coordinating sub-agents. | 5 |
| 6 | [Scheduling & tasks](/claude-code-docs/tools/overview/) | CronCreate/Delete/List plus TodoWrite and the Task* family for work tracking and cron-style scheduling. | 10 |
| 7 | [Session & user interaction tools](/claude-code-docs/tools/overview/) | EnterPlanMode, ExitPlanMode, EnterWorktree, ExitWorktree, AskUserQuestion, Config — session-state primitives. | 6 |
| 8 | [MCP (Model Context Protocol) tools](/claude-code-docs/tools/mcp-tools/) | ListMcpResources and ReadMcpResource — primitives for reading MCP server resources. | 2 |
| 9 | [Meta & search tools](/claude-code-docs/tools/overview/) | ToolSearch, BriefTool, SleepTool — meta operations on the tool catalog itself. | 3 |
| 10 | [Remote & entrypoint-specific tools](/claude-code-docs/tools/overview/) | RemoteTrigger and other tools available only in specific entrypoints (SDK, remote). | 1 |
| 11 | [Tools present in source but not in public docs](/claude-code-docs/tools/overview/) | Internal / experimental tools from the source tree that aren't on the public tools-reference page. | 5 |
| 12 | [Feature-flag-gated tools summary](/claude-code-docs/tools/overview/) | Tools gated by ENV-level feature flags, mapped to their enabling env vars. | 0 |
| 13 | [Discrepancies & notes](/claude-code-docs/tools/overview/) | Known mismatches between public docs, source snapshot, and runtime behavior. | 0 |
| 14 | [MCP tools — dynamic registration](/claude-code-docs/tools/overview/) | How MCP servers register tools dynamically as `mcp__<server>__<tool>`. | 0 |
| 15 | [Permissions & tool access control](/claude-code-docs/tools/permissions-tool-access-control/) | Allow/ask/deny rules, the permission model, and per-tool gating via settings.json. | 0 |
| 16 | [Related references](/claude-code-docs/tools/overview/) | Cross-links to other docs in this repo (Commands, Skills, ENV, Settings). | 0 |

## Quick reference — built-in tools

| Tool | Class | Side effect | Gating | Purpose |
|------|-------|------------|--------|---------|
| `Read` | Filesystem | Read-only | Always | Read file contents, including images and notebooks |
| `Write` | Filesystem | Writes | Permission | Create or overwrite files |
| `Edit` | Filesystem | Writes | Permission | Make targeted edits to specific lines |
| `NotebookEdit` | Filesystem | Writes | Permission | Modify Jupyter notebook cells |
| `Glob` | Filesystem | Read-only | Always | Find files by glob pattern matching |
| `Grep` | Filesystem | Read-only | Always | Search for patterns in file contents |
| `Bash` | Shell | Executes | Permission | Run shell commands (POSIX/Bash) |
| `PowerShell` | Shell | Executes | Permission | Run PowerShell commands (opt-in) |
| `LSP` | Code intelligence | Read-only | Always | Jump to definitions, find references, type info |
| `WebFetch` | Network | Read-only | Permission | Fetch and parse content from URLs |
| `WebSearch` | Network | Read-only | Permission | Perform web searches (US only) |
| `Agent` | Orchestration | Spawns | Always | Spawn a subagent with isolated context |
| `Skill` | Orchestration | Spawns | Permission | Execute a skill from the skill registry |
| `CronCreate` | Scheduling | Spawns | Always | Schedule a one-time or recurring prompt |
| `CronDelete` | Scheduling | Spawns | Always | Cancel a scheduled task |
| `CronList` | Scheduling | Read-only | Always | List all scheduled tasks |
| `TaskCreate` | Task management | Spawns | Always | Create a task in the task list |
| `TaskGet` | Task management | Read-only | Always | Get details for a specific task |
| `TaskList` | Task management | Read-only | Always | List all tasks with status |
| `TaskUpdate` | Task management | Writes | Always | Update task status, details, or delete |
| `TaskStop` | Task management | Executes | Always | Kill a running background task |
| `TaskOutput` | Task management | Read-only | Always | (Deprecated) Get output from a background task |
| `EnterPlanMode` | Session | None | Always | Switch to plan mode (design before code) |
| `ExitPlanMode` | Session | Writes | Permission | Present plan and exit plan mode |
| `EnterWorktree` | Session | Spawns | Always | Create or switch to a git worktree |
| `ExitWorktree` | Session | None | Always | Exit a worktree and return to main |
| `Monitor` | Shell | Executes | Permission | Run command in background, feed output back |
| `SendMessage` | Orchestration | None | Always | Message a teammate or resume a subagent |
| `TeamCreate` | Orchestration | Spawns | Feature-flag | Create an agent team with multiple teammates |
| `TeamDelete` | Orchestration | Executes | Feature-flag | Disband a team and clean up resources |
| `AskUserQuestion` | Session | None | Always | Ask multiple-choice questions |
| `Config` | Session | Writes | Always | Get or modify settings |
| `ToolSearch` | Meta | Read-only | Feature-flag | Search for and load deferred tools |
| `ListMcpResources` | MCP | Read-only | Always | List resources exposed by MCP servers |
| `ReadMcpResource` | MCP | Read-only | Always | Read a specific MCP resource by URI |
| `TodoWrite` | Task management | Writes | Always | Manage session task checklist (non-interactive) |
| `RemoteTrigger` | Remote | Executes | Entrypoint | Trigger a remote session or API call |
| `BriefTool` | Session | None | Feature-flag | Enable brief/compact output mode |
| `SleepTool` | Meta | None | Internal | Sleep for a duration (testing/internal) |

## See Also

- [../Commands/README.md](/claude-code-docs/cli/overview/) — companion reference for built-in slash commands.
- [../Skills/README.md](/claude-code-docs/skills/overview/) — companion reference for bundled skills.
- [../Skills/FRONTMATTER.md](/claude-code-docs/skills/overview/) — frontmatter schema for skills, agents, and commands.
- [../ENV/README.md](/claude-code-docs/env/overview/) — environment variables (many tools are feature-flag gated here).
- Official docs: <https://code.claude.com/docs/en/tools-reference>
