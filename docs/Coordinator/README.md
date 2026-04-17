# Claude Code Coordinator Mode

Coordinator mode is the multi-agent orchestration layer that enables Claude Code to spawn and manage teams of worker agents. It's distinct from the basic Agent tool—when enabled, the coordinator acts as a supervisor, delegating research, implementation, and verification tasks across multiple parallel workers while synthesizing results and communicating with the user.

## Table of Contents

1. [How coordinator works](./how-coordinator-works.md)
2. [Worker tool whitelist](./worker-tool-whitelist.md)
3. [Scratchpad directory](./scratchpad.md)
4. [Agent memory scopes](./agent-memory-scopes.md)
5. [Task framework](./task-framework.md)
6. [Relationship to agent teams](./relationship-to-agent-teams.md)
7. [Undocumented subsystems](./undocumented-subsystems.md)

## Overview

**Coordinator mode** gated by compile-time flag `COORDINATOR_MODE` and environment variable `CLAUDE_CODE_COORDINATOR_MODE` (must be truthy). When enabled, Claude Code enters a multi-agent orchestration workflow where:

- **You (the coordinator)** direct work across workers and synthesize findings
- **Workers (spawned agents)** execute autonomous research, implementation, and verification tasks
- **Shared context** is preserved via scratchpad directory for durable cross-worker knowledge
- **Parallel execution** is the default—workers run concurrently on independent tasks

## Quick reference

| Flag / Environment Variable | Scope | Effect |
|---|---|---|
| `COORDINATOR_MODE` | Compile-time feature flag | Gates coordinator mode availability in the build |
| `CLAUDE_CODE_COORDINATOR_MODE` | Runtime environment variable (truthy: `1`, `true`, `yes`) | Activates coordinator mode; auto-synced with session mode on resume |
| `CLAUDE_CODE_SIMPLE` | Runtime environment variable | Restricts worker toolset to Bash, Read, Edit only (simple mode) |
| `tengu_scratch` | Statsig feature gate | Enables `.claude/scratchpad/` directory for inter-agent context sharing |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | Runtime environment variable | Separate public-facing flag for agent teams; enables Team* tools (deprecated in favor of `CLAUDE_CODE_COORDINATOR_MODE`) |

## Key concepts

**Session mode sync**: If a session was created in coordinator mode and resumed in normal mode (or vice versa), the environment variable is auto-flipped at resume time to match the stored session mode. Analytics log this as `tengu_coordinator_mode_switched`.

**Worker autonomy**: Workers execute tasks without human involvement until completion or failure. Results arrive as `<task-notification>` XML messages. You decide whether to continue a worker with `SendMessage` or spawn a fresh one based on context overlap.

**Scratchpad gating**: When `tengu_scratch` is enabled, coordinator agents get `.claude/scratchpad/` as shared context (injected via dependency injection from QueryEngine). This is the inter-agent coordination primitive—files here are accessible to all workers without permission prompts.

## See Also

- [../Tools/orchestration-agent-tools.md](../Tools/orchestration-agent-tools.md) — TeamCreate, TeamDelete, SendMessage, Agent, Skill tools
- [../Tools/scheduling-tasks.md](../Tools/scheduling-tasks.md) — Task* tool family (TaskCreate, TaskGet, TaskList, TaskUpdate)
- [../ENV/README.md](../ENV/README.md) — `CLAUDE_CODE_COORDINATOR_MODE`, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`, `CLAUDE_CODE_TASK_LIST_ID`
- [../Memory/agent-memory-scopes.md](../Memory/agent-memory-scopes.md) — user / project / local agent memory with paths and sync rules
- [../Skills/FRONTMATTER.md](../Skills/FRONTMATTER.md) — subagent frontmatter fields (background, isolation, mcpServers)
- Official docs: https://code.claude.com/docs/en/agent-teams
