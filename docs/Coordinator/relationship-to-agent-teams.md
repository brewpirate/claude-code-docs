# Relationship to Agent Teams

Coordinator mode and agent teams are overlapping but distinct features. Both enable multi-agent workflows, but they serve different purposes and are gated by different flags.

## Two ways to enable multi-agent work

### Coordinator mode (modern)

**Flag**: `CLAUDE_CODE_COORDINATOR_MODE` (also requires compile-time `COORDINATOR_MODE`)

- You (Claude Code) are the **coordinator** managing worker agents
- Coordinator has access to: `Agent`, `SendMessage`, `TaskStop`, `SyntheticOutput`
- Workers have curated toolset (Bash, Read, Edit + optional MCP/Skills)
- Results arrive as `<task-notification>` XML messages
- Scratchpad directory optional (gated by `tengu_scratch`)
- **Architecture**: Hierarchical — coordinator at top, workers below

**What you can do:**
- Spawn independent workers in parallel
- Continue workers with context (SendMessage)
- Stop workers mid-flight
- Synthesize findings across multiple research workers before directing implementation

### Agent teams (alternate)

**Flag**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` (separate from `CLAUDE_CODE_COORDINATOR_MODE`)

- You spawn a **team** of agents using `TeamCreate`
- Team agents are peer-level (not hierarchical)
- Each team agent has access to: `TeamDelete`, `SendMessage` (to other team members)
- Results are communicated via `SendMessage` between team members
- Each agent in the team sees the full conversation history
- **Architecture**: Flat team — all agents on same level

**What you can do:**
- Create a team of agents that can talk to each other
- Each team member can send messages to other team members
- Agents can see the full conversation and coordinate directly

## Key differences

| Aspect | Coordinator Mode | Agent Teams |
|--------|---|---|
| **Top-level controller** | You (Claude Code coordinator) | Team agents (peer-level) |
| **Creation mechanism** | `Agent` tool with `subagent_type: "worker"` | `TeamCreate` tool |
| **Inter-agent communication** | Coordinator synthesizes; uses `SendMessage` to continue workers | Team agents send `SendMessage` directly to each other |
| **Visibility** | Workers cannot see your conversation | Team agents see full conversation history |
| **Architecture** | Hierarchical (coordinator supervises) | Flat (peer team members) |
| **Task results format** | `<task-notification>` XML | Direct `SendMessage` replies |
| **Deletion** | Implicit (workers complete) | Explicit `TeamDelete` call |
| **Tool access** | Curated per-worker toolset | Full toolset per team agent |

## When to use coordinator mode

- You want to **supervise and synthesize** work across multiple workers
- Workers should run autonomously without seeing each other's work
- You need **hierarchical control** with a clear supervisor
- Research and implementation are best separated with synthesis in between
- You want parallel research workers with one coordinated implementation

## When to use agent teams

- You want **peer-level agents** that can coordinate directly with each other
- Team agents should see the full conversation and make informed decisions together
- You need **direct agent-to-agent communication** (not routed through you)
- Agents should have equal access to all tools
- You want distributed decision-making instead of centralized supervision

## Flags do not conflict

`CLAUDE_CODE_COORDINATOR_MODE` and `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` are independent. However, they represent different architectural approaches to multi-agent work. Coordinator mode is the recommended modern approach; agent teams are experimental.

---

[← Back to Coordinator/README.md](./README.md)
