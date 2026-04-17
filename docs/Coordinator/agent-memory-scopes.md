# Agent Memory Scopes

Coordinator agents (and all agents) have access to persistent memory across three scopes: user, project, and local. Each scope has different persistence and sync rules.

## Memory scope hierarchy

### User scope (`~/.claude/agent-memory/`)

**Path**: `~/.claude/agent-memory/<agentType>/`

- **Scope**: Shared across all projects for the same agent type
- **Sync**: Synced to Claude Code Registry (CCR) — shared across machines
- **Use case**: Long-lived agent knowledge, cross-project learnings, user preferences

Example: `~/.claude/agent-memory/worker/` contains notes that follow a "worker" type agent across any project.

### Project scope (`.claude/agent-memory/`)

**Path**: `.claude/agent-memory/<agentType>/` (relative to project root)

- **Scope**: Specific to this project
- **Sync**: Synced to CCR — shared across machines working on the same project
- **Use case**: Project-specific agent notes, codebase-specific learnings

Example: `.claude/agent-memory/worker/` contains findings specific to this project's codebase.

### Local scope (`.claude/agent-memory-local/`)

**Path**: `.claude/agent-memory-local/<agentType>/` (relative to project root)

- **Scope**: Specific to this project, this machine
- **Sync**: NEVER synced to CCR — stays local only
- **Use case**: Temporary state, machine-specific context, sandbox-only data

Example: `.claude/agent-memory-local/worker/` contains data that should not leave this machine.

## Agent type name sanitization

Agent type names with colons (e.g., plugin-namespaced agents like `my-plugin:my-agent`) have colons replaced with dashes in directory names:

- Agent type: `my-plugin:my-agent`
- Directory: `my-plugin-my-agent`

## Persistence and sync behavior

| Scope | Persistence | Synced to CCR | Cross-machine | Use in coordinator |
|-------|---|---|---|---|
| User | Permanent across projects | Yes | Yes | Shared learnings for agent type |
| Project | Permanent for this project | Yes | Yes | Project-specific findings, codebase patterns |
| Local | Permanent for this machine/project | **No** | No | Sandbox-only, machine-specific state |

## In coordinator context

All three scopes are available to coordinator agents and workers. When synthesizing, consider:

- **User memory**: Will this learning help the agent type across projects? Store in user scope.
- **Project memory**: Is this codebase-specific? Store in project scope.
- **Local memory**: Does this data need to stay on this machine? Store in local scope.

For inter-worker coordination within a single session, **scratchpad** (`.claude/scratchpad/`) is often simpler and faster than agent memory, as scratchpad provides permission-free access without the memory system's async I/O overhead.

---

[← Back to Coordinator/README.md](./README.md)
