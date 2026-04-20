---
title: "Agents Overview"
description: "How subagents work in Claude Code"
tags: [agent-sdk]
---

# Claude Code Subagents

A **subagent** is a separate Claude instance that runs a focused task and returns a result to the parent session. Claude Code can spawn subagents automatically (e.g., the Explore tool uses one), and you can define custom subagents for your own workflows.

Think of subagents as workers: the main session is the manager, subagents are specialists you dispatch to do specific jobs in parallel or sequence.

## Table of Contents

1. [How subagents work](/claude-code-docs/agents/how-subagents-work/)

## Overview

| Approach | Where defined | Best for |
|----------|--------------|----------|
| Directory files | `.claude/agents/<name>/AGENT.md` | Reusable agents with specific capabilities |
| CLI flag | `--agents '[{"name":"...","prompt":"..."}]'` | One-off agents when starting a session |
| Agent SDK | TypeScript/Python SDK `AgentSession` | Embedding agents in external applications |

## Three ways to define custom subagents

### 1. Directory files (most common)

Create a markdown file in `.claude/agents/` with YAML frontmatter:

```
your-project/
└── .claude/
    └── agents/
        └── code-reviewer/
            └── AGENT.md
```

```yaml
---
name: code-reviewer
description: Reviews code changes for quality and security issues
tools: Read, Glob, Grep
permissionMode: default
maxTurns: 10
---

You are a code reviewer. When invoked, analyze the provided code changes for:
- Logic errors
- Security vulnerabilities
- Performance issues
- Style consistency

Return a structured report with severity ratings.
```

### 2. CLI JSON flag

Pass agents as JSON when starting Claude:

```bash
claude --agents '[{"name":"reviewer","prompt":"Review this code for security issues","tools":["Read","Grep"]}]'
```

### 3. Agent SDK

For embedding in external applications — see [Agent SDK/README.md](/claude-code-docs/agent-sdk/overview/).

---

## Subagent-specific frontmatter fields

Only `name` and `description` are required. The rest are optional.

| Field | Required | Type | What it does |
|-------|----------|------|-------------|
| `name` | Yes | string | Unique identifier using lowercase letters and hyphens. |
| `description` | Yes | string | When Claude should delegate to this subagent. Used by Claude's automatic-delegation logic. |
| `tools` | No | string (comma-sep) or list | Allowlist of tools. Omit to inherit all tools from the parent. Supports `Agent(agent_type)` syntax to restrict which subagents the agent can spawn. |
| `disallowedTools` | No | string (comma-sep) or list | Tools to deny. Applied first, then `tools` resolves against what's left. |
| `model` | No | string | `sonnet`, `opus`, `haiku`, a full model ID (e.g. `claude-opus-4-7`), or `inherit`. Defaults to `inherit`. |
| `permissionMode` | No | enum | `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, or `plan`. See [Permission modes](#permission-modes). |
| `maxTurns` | No | integer | Maximum agentic turns before the subagent stops. |
| `skills` | No | list | [Skills](/claude-code-docs/skills/overview/) loaded into the subagent's context at startup. Full content is injected, not just made available — subagents don't inherit skills from the parent. |
| `mcpServers` | No | list | [MCP servers](/claude-code-docs/tools/mcp-tools/) available to this subagent. Each entry is a string reference to a configured server, or an inline definition. Inline servers are connected when the subagent starts and disconnected when it finishes. |
| `hooks` | No | object | [Lifecycle hooks](/claude-code-docs/hooks/overview/) scoped to this subagent. `Stop` hooks are automatically converted to `SubagentStop` at runtime. |
| `memory` | No | enum | `user`, `project`, or `local`. Enables cross-session learning — see [Persistent memory](#persistent-memory-for-subagents). |
| `background` | No | boolean | If `true`, always run this subagent as a background task. Default: `false`. |
| `effort` | No | enum | Effort level while this subagent is active: `low`, `medium`, `high`, `xhigh`, `max`. Available values depend on the model. |
| `isolation` | No | enum | Set to `worktree` to run the subagent in a temporary git worktree. The worktree is auto-cleaned if the subagent makes no changes. |
| `color` | No | enum | Display color in the task list: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, or `cyan`. |
| `initialPrompt` | No | string | Auto-submitted as the first user turn when this agent runs as the **main session agent** (via `--agent` or the `agent` setting). Commands and skills are processed. Prepended to any user-provided prompt. |

### Scope priority

When multiple definitions share the same name, higher-priority wins:

| Priority | Location | Scope |
|----------|----------|-------|
| 1 (highest) | Managed settings | Organization-wide |
| 2 | `--agents` CLI flag | Current session only |
| 3 | `.claude/agents/` | Current project |
| 4 | `~/.claude/agents/` | All projects for this user |
| 5 (lowest) | Plugin's `agents/` directory | Wherever the plugin is enabled |

Project subagents are discovered by walking up from the current cwd. Directories added via `--add-dir` **are not scanned** for subagents — they grant file access only.

### Model resolution order

When a subagent runs, the effective model is chosen by the first rule that matches:

1. `CLAUDE_CODE_SUBAGENT_MODEL` environment variable, if set.
2. The per-invocation `model` parameter (passed by Claude when delegating).
3. The subagent definition's `model` frontmatter.
4. The main conversation's model.

---

## Agent relationship diagram

The parent session spawns subagents in parallel. Each agent has a scoped tool set and returns its result as a `<task-notification>`:

| Agent | Tools available | What it does |
|-------|----------------|-------------|
| `code-reviewer` | Read, Grep | Analyzes code for quality and security |
| `test-runner` | Bash | Runs the test suite |
| `doc-writer` | Read, Write | Writes or updates documentation |

All three run simultaneously. The parent session waits for all notifications before synthesizing a final report.

**Shared context via scratchpad** (requires `tengu_scratch` flag): `.claude/scratchpad/` is readable and writable by all agents in the session.

---

## Plugin subagent restriction

:::caution[Plugin agent limitation]
Subagents defined inside a **plugin** cannot use `hooks`, `mcpServers`, or `permissionMode` frontmatter fields. These fields are silently ignored for plugin-origin agents. Only standalone `.claude/agents/` files support the full set of agent frontmatter. If you need these for a plugin subagent, copy its file into `.claude/agents/` or `~/.claude/agents/`.
:::

---

## Built-in subagents

Claude Code ships with several subagents Claude delegates to automatically. Each inherits the parent's permissions with additional tool restrictions.

| Name | Model | Tools | Purpose |
|------|-------|-------|---------|
| `Explore` | Haiku | Read-only (Write/Edit denied) | File discovery, code search, codebase exploration. Claude specifies a thoroughness level: `quick`, `medium`, or `very thorough`. |
| `Plan` | Inherits from main conversation | Read-only | Used during [plan mode](/claude-code-docs/permissions/permission-modes/) to gather context before presenting a plan. |
| `general-purpose` | Inherits from main conversation | All tools | Complex, multi-step tasks that need both exploration and modification. |
| `statusline-setup` | Sonnet | — | Invoked automatically when you run `/statusline`. |
| `Claude Code Guide` | Haiku | — | Invoked when you ask questions about Claude Code features. |

Subagents can be disabled via [`permissions.deny`](#disable-a-subagent): `"deny": ["Agent(Explore)"]`.

---

## Permission modes

| Mode | Behavior |
|------|----------|
| `default` | Standard permission prompts. |
| `acceptEdits` | Auto-accept file edits and common filesystem commands for paths in the working directory or `additionalDirectories`. |
| `auto` | [Auto mode](/claude-code-docs/permissions/permission-modes/) — a background classifier reviews commands and protected-directory writes. |
| `dontAsk` | Auto-deny all permission prompts (explicitly allowed tools still work). |
| `bypassPermissions` | Skip permission prompts (writes to `.git`, `.claude`, `.vscode`, `.idea`, `.husky` still prompt, with a small allowlist). |
| `plan` | Plan mode — read-only exploration. |

**Parent-mode precedence.** If the parent uses `bypassPermissions` or `acceptEdits`, the subagent inherits that mode and cannot override it. If the parent uses `auto`, the subagent inherits `auto` and any `permissionMode` in its frontmatter is **ignored** — the classifier evaluates the subagent's tool calls against the parent's block/allow rules.

---

## Restrict which subagents an agent can spawn

Use `Agent(agent_type)` syntax in the `tools` field to whitelist specific subagent types:

```yaml
---
name: coordinator
description: Coordinates work across specialized agents
tools: Agent(worker, researcher), Read, Bash
---
```

- `Agent(worker, researcher)` — only these subagents can be spawned.
- `Agent` (no parens) — any subagent can be spawned.
- Omitting `Agent` from `tools` entirely — the agent cannot spawn any subagents.

This applies only to agents running as the **main thread** (via `claude --agent`). Subagents cannot spawn other subagents, so `Agent(...)` has no effect inside a subagent definition.

> In v2.1.63 the `Task` tool was renamed to `Agent`. Existing `Task(...)` references in settings and agent definitions still work as aliases.

### Disable a subagent

Block specific subagents globally via `permissions.deny` in settings:

```json
{
  "permissions": {
    "deny": ["Agent(Explore)", "Agent(my-custom-agent)"]
  }
}
```

Or with the CLI flag: `claude --disallowedTools "Agent(Explore)"`.

---

## Invoke subagents explicitly

Three escalating patterns:

- **Natural language** — name the subagent in your prompt; Claude decides whether to delegate.
- **@-mention** — forces a specific subagent to run for one task. Syntax:
  - `@"code-reviewer (agent)"` from the typeahead picker
  - `@agent-<name>` for local subagents
  - `@agent-<plugin-name>:<agent-name>` for plugin subagents
- **Session-wide** — `claude --agent code-reviewer` starts a session where the **main thread** takes on that subagent's system prompt, tool restrictions, and model. The subagent's prompt replaces the default Claude Code system prompt entirely (like `--system-prompt`). `CLAUDE.md` and project memory still load. The agent name appears as `@<name>` in the startup header.

To make a subagent the default for every session in a project, set `agent` in `.claude/settings.json`:

```json
{
  "agent": "code-reviewer"
}
```

The CLI flag overrides the setting when both are present.

---

## Foreground vs. background subagents

- **Foreground** — blocks the main conversation until complete. Permission prompts and `AskUserQuestion` calls pass through to you.
- **Background** — runs concurrently. **Before launching, Claude Code prompts you for any tool permissions the subagent will need** so it has all approvals upfront. Once running, background subagents auto-deny anything not pre-approved. Clarifying questions from a background subagent fail (the subagent continues without the answer).

Trigger background mode by asking Claude to "run this in the background", by pressing **Ctrl+B** on a running task, or by setting `background: true` in the subagent's frontmatter.

Disable all background task functionality: `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1`.

---

## Resume a subagent

Each subagent invocation normally starts fresh. To continue an existing subagent's work, ask Claude to resume it — Claude uses the `SendMessage` tool with the agent's ID as `to`. This requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`.

A resumed subagent retains its full conversation history: previous tool calls, results, and reasoning. A stopped subagent that receives a `SendMessage` auto-resumes in the background.

Agent IDs are available in transcripts at `~/.claude/projects/{project}/{sessionId}/subagents/agent-{agentId}.jsonl`.

**Subagent transcripts persist independently of the main conversation:**
- Main conversation compaction does not affect subagent transcripts (separate files).
- Transcripts persist within their session — you can resume a subagent after restarting Claude Code by resuming the same session.
- Auto-cleanup follows the `cleanupPeriodDays` setting (default: 30 days).
- Subagents support their own auto-compaction at ~95% capacity; override with `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`.

---

## Persistent memory for subagents

When `memory` is set on a subagent, it gets a directory that survives across conversations:

| Scope | Location | Use when |
|-------|----------|----------|
| `user` | `~/.claude/agent-memory/<agent-name>/` | Knowledge applies across all projects. |
| `project` | `.claude/agent-memory/<agent-name>/` | Knowledge is project-specific and shareable via version control. |
| `local` | `.claude/agent-memory-local/<agent-name>/` | Project-specific but not checked in. |

When memory is enabled:
- The subagent's system prompt gets read/write instructions for the memory directory.
- The first 200 lines or 25KB of `MEMORY.md` (whichever comes first) is injected into the system prompt, with curation instructions if it exceeds that.
- Read, Write, and Edit tools are automatically enabled for memory file management.

`project` is the recommended default — shareable via git. Use `user` for cross-project learnings, `local` for knowledge that shouldn't be version-controlled.

---

## Subagent lifecycle hooks

Two hook event families fire around subagents:

- **In the subagent's own `hooks` frontmatter** — `PreToolUse`, `PostToolUse`, `Stop` (auto-converted to `SubagentStop`). These only run while this specific subagent is active. They do **not** fire when the agent runs as the main session via `--agent`.
- **In `settings.json`** — `SubagentStart` and `SubagentStop` fire in the main session. Both support matchers to target specific agent types by name.

See [Hooks event reference](/claude-code-docs/hooks/event-reference/) for full semantics.

---

## See also

- [How subagents work](/claude-code-docs/agents/how-subagents-work/) — spawning, context, and result flow
- [Skills/FRONTMATTER.md](/claude-code-docs/skills/overview/) — all 29 frontmatter fields (agents share the same schema)
- [Coordinator/README.md](/claude-code-docs/agents/overview/) — multi-agent coordinator mode (advanced)
- [Agent SDK/README.md](/claude-code-docs/agent-sdk/overview/) — embedding agents in external apps
- [GettingStarted/README.md](/claude-code-docs/getting-started/overview/) — general getting started guide

---

[← Back to docs/README.md](/claude-code-docs/agents/overview/)
