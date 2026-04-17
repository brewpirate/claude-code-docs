# Feature-flag-gated tools summary


The following tools are gated by environment variables or feature flags and are only available when the flag is set:

| Tool | Env flag | ENV.md reference | Public docs status |
|------|----------|------------------|-------------------|
| `CLAUDE_CODE_ENABLE_TASKS` | TaskCreate, TaskGet, TaskList, TaskUpdate, TaskStop, TaskOutput | Line 155 | Yes — documented as conditional |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | TeamCreate, TeamDelete, SendMessage | Line 298 | Yes — documented as experimental |
| `ENABLE_TOOL_SEARCH` | ToolSearch | Line 167 | Yes — documented under MCP tool search |
| `CLAUDE_CODE_BRIEF` | BriefTool | Line 597 | Not in tools-reference; inferred internal |

For task tools: `CLAUDE_CODE_ENABLE_TASKS` gates the entire task persistence system. Without it, TodoWrite is available but task commands may not be.

For agent teams: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` enables TeamCreate, TeamDelete, and SendMessage. Disabled by default.

For tool search: `ENABLE_TOOL_SEARCH=1` enables deferred tool loading and the ToolSearch tool itself. Reduces initial system prompt size for MCP-heavy setups.

---

[← Back to Tools/README.md](./README.md)
