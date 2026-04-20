---
title: "How Subagents Work"
tags: [agent-sdk]
---

This page explains what happens under the hood when Claude Code spawns a subagent — how context is passed, how the agent runs, and how results come back to the parent session.

---

## The spawning sequence

1. **You → Parent Claude:** Make a request that requires delegating work.
2. **Parent Claude → Claude Code:** Calls the `Agent` tool with a task prompt and context.
3. **Claude Code:** Creates a new Claude session with scoped config (allowed tools, permission mode, max turns).
4. **Claude Code → Subagent:** Injects the task prompt, tool whitelist, permission mode, and `maxTurns` limit.
5. **Subagent runs** (up to `maxTurns` turns):
   - Calls tools (Read, Bash, etc.) to work on the task
   - Processes tool results and plans the next step
6. **Subagent → Claude Code:** Returns final response (text + tool results).
7. **Claude Code → Parent Claude:** Delivers the result as a `<task-notification>` message.
8. **Parent Claude → You:** Synthesizes the result into a final answer.

---

## What context the subagent receives

When a regular subagent is spawned (any `subagent_type`), it gets:

- **The task prompt** — either the inline prompt from the `Agent` tool call, or the content of the AGENT.md file
- **Its allowed tools** — from the `tools` field in frontmatter, or the `Agent` tool call's tools list
- **Its permission mode** — from the `permissionMode` field (defaults to the same as the parent if not set)
- **Its memory scope** — if `memory` is set, the agent reads from that memory scope at startup
- **MCP servers** — if `mcpServers` is set, those servers are available to the agent

A regular subagent does **not** receive:
- The parent session's conversation history (it starts fresh)
- The parent session's permission rules (it uses its own `permissionMode`)
- Variables or state from the parent (only what's in files or the task prompt)

> Fork subagents are the exception — they inherit the full parent context. See [Fork subagents](#fork-subagents) below.

---

## Fork subagents

When the `FORK_SUBAGENT` feature gate is enabled, calling the `Agent` tool **without** a `subagent_type` triggers an implicit fork instead of the normal spawn path. The fork child differs from a regular subagent in several ways:

- **Inherits the parent's full conversation context** — including message history, thinking blocks, and every prior tool use. The child reads the same bytes the parent has been working with.
- **Inherits the parent's rendered system prompt** — threaded as bytes rather than re-rendered, to keep the prompt cache prefix byte-identical across siblings.
- **Uses the parent's exact tool pool** (`tools: ['*']` with `useExactTools`) — the child can call any tool the parent can, again for cache prefix parity.
- **`model: 'inherit'`** — keeps the parent's model so context length matches.
- **`permissionMode: 'bubble'`** — permission prompts surface to the parent terminal rather than being handled by the child.
- **Runs in the background** — all forks (and all other agent spawns, when this gate is on) execute asynchronously and return via `<task-notification>` for a unified interaction model.
- **`/fork <directive>` slash command** is also available when the gate is on.

A fork child cannot recursively fork — the system detects the fork boilerplate in inherited history and rejects nested fork attempts.

**Mutually exclusive with coordinator mode.** If `CLAUDE_CODE_COORDINATOR_MODE=1`, fork is disabled — coordinator already owns orchestration. Fork is also disabled in non-interactive sessions.

Use fork when you want a worker that shares your current context (to act on something visible in this conversation) rather than a clean-slate agent spawning on a defined task.

---

## How results come back

When a subagent finishes, its response is delivered as a `<task-notification>` XML message in the parent session. The parent Claude reads this and can:

- Synthesize the result into its response to you
- Spawn another agent based on what it found
- Continue the parent session's work

For background agents (`background: true` in frontmatter), the notification arrives asynchronously — the parent session continues running while the agent works.

---

## Parallel vs. sequential agents

Claude Code can run multiple agents in parallel:

```
Parent session
├── Agent A: "scan for security vulnerabilities"  (running)
├── Agent B: "check test coverage"               (running)
└── Agent C: "review documentation"              (running)
```

All three run simultaneously. The parent waits for all three notifications before synthesizing a final report.

Sequential agents are less common but used when each task depends on the previous result.

---

## Scratchpad: sharing context between agents

When the `tengu_scratch` Statsig flag is enabled on your account, agents can share information via `.claude/scratchpad/`:

```
.claude/
└── scratchpad/
    ├── findings.md       ← Agent A writes here
    ├── test-results.md   ← Agent B writes here
    └── doc-issues.md     ← Agent C writes here
```

The parent session (and any agent) can read all scratchpad files. This is the coordination primitive for multi-agent workflows. Without the `tengu_scratch` flag, this directory is not available.

---

## Agent isolation levels

The `isolation` field controls how isolated the agent's filesystem view is. It is optional — **omit it and the agent shares the parent's filesystem (no isolation)**. There is no `none` value; there is no `container` value.

| Value | Availability | What it means |
|-------|--------------|--------------|
| *(omitted)* | Public & ant | Agent sees the same filesystem as the parent session. The default. |
| `worktree` | Public & ant | Agent gets a temporary git worktree — an isolated copy of the repo. Auto-cleaned if the agent makes no changes; if changes are made, the worktree path and branch are returned in the result. Mutually exclusive with an explicit `cwd` override. |
| `remote` | **Ant-only** | Agent runs in a remote CCR environment and is always a background task. Intended for long-running work that needs a fresh sandbox. |

For agents doing risky or experimental work, `worktree` isolation means their changes don't affect your main branch until you merge them.

**Source:** `claude-code-main/tools/AgentTool/AgentTool.tsx:99` (schema), `loadAgentsDir.ts:94,611` (parsing). The `remote` variant is parse-rejected in public (non-ant) builds.

---

## Subagent vs. coordinator mode

**Basic subagent** (what this page describes):
- Parent calls the `Agent` tool with a prompt
- One subagent spawns, does the task, returns a result
- Parent synthesizes and continues

**Coordinator mode** (see [Coordinator/README.md](/claude-code-docs/agents/overview/)):
- Requires `CLAUDE_CODE_COORDINATOR_MODE=1`
- Claude becomes a full orchestrator managing many workers
- Workers have a specific tool whitelist, scratchpad access, and auto-dispatch
- More powerful, more complex — not needed for basic use cases

If you're just adding custom agents to your project, you don't need coordinator mode.

---

## See also

- [Agents/README.md](/claude-code-docs/agents/overview/) — subagent overview and definition methods
- [Coordinator/README.md](/claude-code-docs/agents/overview/) — full multi-agent orchestration
- [Skills/FRONTMATTER.md](/claude-code-docs/skills/overview/) — all agent frontmatter fields
- [GettingStarted/feature-gates-guide.md](/claude-code-docs/getting-started/feature-gates-guide/) — scratchpad and agent team feature gates

---

[← Back to Agents/README.md](/claude-code-docs/agents/overview/)
