# Claude Code Built-in Tools

Per-section reference for every built-in tool dispatched by Claude Code. Generated from [./BUILT_IN.md](./BUILT_IN.md).

## Table of Contents

1. [How tools work](./how-tools-work.md)
2. [Filesystem tools](./filesystem-tools.md)
3. [Shell & code execution tools](./shell-code-execution-tools.md)
4. [Network & web tools](./network-web-tools.md)
5. [Orchestration & agent tools](./orchestration-agent-tools.md)
6. [Scheduling & tasks](./scheduling-tasks.md)
7. [Session & user interaction tools](./session-user-interaction-tools.md)
8. [MCP (Model Context Protocol) tools](./mcp-tools.md)
9. [Meta & search tools](./meta-search-tools.md)
10. [Remote & entrypoint-specific tools](./remote-entrypoint-specific-tools.md)
11. [Tools present in source but not in public docs](./tools-present-in-source-but-not-in-public-docs.md)
12. [Feature-flag-gated tools summary](./feature-flag-gated-tools-summary.md)
13. [Discrepancies & notes](./discrepancies-notes.md)
14. [MCP tools — dynamic registration](./mcp-tools-dynamic-registration.md)
15. [Permissions & tool access control](./permissions-tool-access-control.md)
16. [Related references](./related-references.md)

## Overview

**16 sections**, **44 entries** across tool catalog, narrative, and reference subsections.

| # | Section | Description | Entries |
|---|---------|-------------|---------|
| 1 | [How tools work](./how-tools-work.md) | How Claude dispatches tool calls, permissions, entrypoint gating, and MCP vs built-in distinction. | 0 |
| 2 | [Filesystem tools](./filesystem-tools.md) | Read, Write, Edit, NotebookEdit, Glob, Grep — the file I/O and search primitives. | 6 |
| 3 | [Shell & code execution tools](./shell-code-execution-tools.md) | Bash, PowerShell, LSP, Monitor — running commands and interacting with code intelligence. | 4 |
| 4 | [Network & web tools](./network-web-tools.md) | WebFetch and WebSearch for retrieving external content. | 2 |
| 5 | [Orchestration & agent tools](./orchestration-agent-tools.md) | Agent, Skill, SendMessage, TeamCreate/Delete — spawning and coordinating sub-agents. | 5 |
| 6 | [Scheduling & tasks](./scheduling-tasks.md) | CronCreate/Delete/List plus TodoWrite and the Task* family for work tracking and cron-style scheduling. | 10 |
| 7 | [Session & user interaction tools](./session-user-interaction-tools.md) | EnterPlanMode, ExitPlanMode, EnterWorktree, ExitWorktree, AskUserQuestion, Config — session-state primitives. | 6 |
| 8 | [MCP (Model Context Protocol) tools](./mcp-tools.md) | ListMcpResources and ReadMcpResource — primitives for reading MCP server resources. | 2 |
| 9 | [Meta & search tools](./meta-search-tools.md) | ToolSearch, BriefTool, SleepTool — meta operations on the tool catalog itself. | 3 |
| 10 | [Remote & entrypoint-specific tools](./remote-entrypoint-specific-tools.md) | RemoteTrigger and other tools available only in specific entrypoints (SDK, remote). | 1 |
| 11 | [Tools present in source but not in public docs](./tools-present-in-source-but-not-in-public-docs.md) | Internal / experimental tools from the source tree that aren't on the public tools-reference page. | 5 |
| 12 | [Feature-flag-gated tools summary](./feature-flag-gated-tools-summary.md) | Tools gated by ENV-level feature flags, mapped to their enabling env vars. | 0 |
| 13 | [Discrepancies & notes](./discrepancies-notes.md) | Known mismatches between public docs, source snapshot, and runtime behavior. | 0 |
| 14 | [MCP tools — dynamic registration](./mcp-tools-dynamic-registration.md) | How MCP servers register tools dynamically as `mcp__<server>__<tool>`. | 0 |
| 15 | [Permissions & tool access control](./permissions-tool-access-control.md) | Allow/ask/deny rules, the permission model, and per-tool gating via settings.json. | 0 |
| 16 | [Related references](./related-references.md) | Cross-links to other docs in this repo (Commands, Skills, ENV, Settings). | 0 |

## See Also

- [./BUILT_IN.md](./BUILT_IN.md) — single-file consolidated reference.
- [../Commands/BUILT_IN.md](../Commands/BUILT_IN.md) — companion reference for built-in slash commands.
- [../Skills/BUILT_IN.md](../Skills/BUILT_IN.md) — companion reference for bundled skills.
- [../Skills/FRONTMATTER.md](../Skills/FRONTMATTER.md) — frontmatter schema for skills, agents, and commands.
- [../ENV/README.md](../ENV/README.md) — environment variables (many tools are feature-flag gated here).
- Official docs: <https://code.claude.com/docs/en/tools-reference>
