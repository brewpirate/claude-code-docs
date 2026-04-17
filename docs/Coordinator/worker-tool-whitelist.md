# Worker Tool Whitelist

In coordinator mode, spawned worker agents have a curated toolset determined by runtime flags. Internal coordination tools (TeamCreate, TeamDelete, SendMessage, SyntheticOutput) are always excluded from workers to prevent circular orchestration.

## Simple mode vs. standard mode

Worker toolset depends on `CLAUDE_CODE_SIMPLE` environment variable:

### Simple mode (`CLAUDE_CODE_SIMPLE` is truthy)

Only three tools:

- **Bash** — execute shell commands
- **FileRead** (Read) — read file contents
- **FileEdit** (Edit) — edit file contents

MCP tools (from connected MCP servers) are still available.

**Use case**: Constrained environments, learning, sandboxed experiments.

### Standard mode (default)

All tools from `ASYNC_AGENT_ALLOWED_TOOLS` minus the four internal tools:

- **Bash**, **Read**, **Edit**
- **WebSearch**, **WebFetch**
- **Grep**, **Glob**
- **Write**, **NotebookEdit**
- **TodoWrite**, **ToolSearch**
- **Skill** — invoke project skills (e.g., `/commit`, `/verify`)
- **EnterWorktree**, **ExitWorktree**
- Plus MCP tools from connected servers

All tools are alphabetically sorted in the worker context message.

## Internal tools (always excluded)

These tools are excluded from workers to prevent circular agent spawning and maintain coordinator control:

| Tool | Reason |
|------|--------|
| `TeamCreate` | Creates agent teams; reserved for coordinator-level orchestration |
| `TeamDelete` | Deletes agent teams; reserved for coordinator |
| `SendMessage` | Send messages to other agents; prevents workers from becoming coordinators |
| `SyntheticOutput` | Synthetic task output; internal only |

Note: The `Agent` tool (spawn workers) is also not available to workers in standard async agent execution, though coordinator agents can use it for nested work when explicitly enabled.

## Context injection

Worker tool availability is communicated to each spawned agent via a `workerToolsContext` injection in the coordinator system prompt:

```
Workers spawned via the Agent tool have access to these tools: Bash, Edit, Glob, Read, Skill, WebFetch, WebSearch, Write

Workers also have access to MCP tools from connected MCP servers: puppeteer, slack
```

When scratchpad is enabled, an additional line is injected:

```
Scratchpad directory: .claude/scratchpad/
Workers can read and write here without permission prompts. Use this for durable cross-worker knowledge — structure files however fits the work.
```

---

[← Back to Coordinator/README.md](./README.md)
