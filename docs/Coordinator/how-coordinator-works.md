# How Coordinator Works

Coordinator mode is a multi-agent orchestration layer that transforms Claude Code into a supervisor managing teams of worker agents.

## Coordinator architecture

The coordinator acts as a supervisor, dispatching work to workers and receiving results:

| Role | Description | Communication |
|------|-------------|---------------|
| **Coordinator** (you / Claude) | Receives your requests, plans work, dispatches agents | Sends `Agent` tool calls to workers; receives `task-notification` results |
| **Worker A** (Research) | Performs research tasks | Reports back via `task-notification`; reads/writes `.claude/scratchpad/` |
| **Worker B** (Implementation) | Implements changes | Reports back via `task-notification`; can be stopped with `TaskStop` |
| **Worker C** (Verification) | Verifies results | Reports back via `task-notification` |

Workers share context through `.claude/scratchpad/` (requires `tengu_scratch` flag). The coordinator can send mid-task instructions via `SendMessage` or cancel a worker with `TaskStop`.

## Activation flow

1. **Compile-time gate**: Build must include `COORDINATOR_MODE` feature flag
2. **Runtime activation**: Environment variable `CLAUDE_CODE_COORDINATOR_MODE` must be truthy (`1`, `true`, `yes`)
3. **Session mode sync**: On resume, if session was created in coordinator mode and resumed in normal mode (or vice versa), the env var is auto-flipped to match. Analytics log: `tengu_coordinator_mode_switched`

## The coordinator role

When active, you (Claude Code) become a **coordinator**:

- **Help the user achieve their goal** — direct workers to research, implement, and verify code changes
- **Synthesize results** — read worker findings and understand problems before directing follow-up work
- **Communicate with users** — summarize new information as it arrives; worker results and system notifications are internal signals, never conversation partners
- **Manage parallelism** — spawn independent workers concurrently; this is your superpower
- **Answer directly when possible** — don't delegate trivial work that you can handle without tools

You must never thank or acknowledge worker results in messages to the user. Every message goes to the user—worker notifications are internal.

## Worker agents

Workers are spawned via the `Agent` tool with `subagent_type: "worker"`. They execute autonomously on tasks:

- **Research**: Investigate codebase, find files, understand problems (can run in parallel)
- **Implementation**: Make targeted code changes per your specification
- **Verification**: Prove code works—run tests, typechecks, and edge cases

Workers cannot see your conversation with the user. Every prompt must be self-contained with complete context: file paths, line numbers, error messages, and what "done" looks like.

## Coordination primitives

### Agent tool

Spawn a new worker:

```
Agent({
  description: "Investigate auth bug",
  subagent_type: "worker",
  prompt: "Investigate the auth module in src/auth/. Find null pointer exceptions around session handling..."
})
```

Workers report results as `<task-notification>` XML messages.

### SendMessage tool

Continue an existing worker (the worker has context loaded):

```
SendMessage({
  to: "agent-a1b",
  message: "Fix the null pointer in src/auth/validate.ts:42. Add a null check before accessing user.id — if null, return 401..."
})
```

### TaskStop tool

Stop a running worker (e.g., when the approach is wrong or the user changes requirements):

```
TaskStop({ task_id: "agent-x7q" })
```

Stopped workers can be continued with SendMessage.

### Scratchpad directory (optional)

When `tengu_scratch` feature gate is enabled, all workers get access to `.claude/scratchpad/` for durable cross-worker knowledge without permission prompts. Use this for sharing findings, test results, or implementation notes across the team.

## Task workflow phases

Most tasks break down into:

| Phase | Who | Purpose |
|-------|-----|---------|
| **Research** | Workers (parallel) | Investigate codebase, find files, understand problem |
| **Synthesis** | **You** (coordinator) | Read findings, understand the problem, craft implementation specs |
| **Implementation** | Workers | Make targeted changes per spec, commit |
| **Verification** | Workers | Test changes work, prove the code solves the problem |

## Continue vs. spawn decision

After synthesis, decide whether the worker's existing context helps or hurts:

- **Continue** (`SendMessage`) when: Research explored exactly the files that need editing, or you're correcting a failure and the worker has error context
- **Spawn fresh** (`Agent`) when: Research was broad but implementation is narrow, verifier needs fresh eyes, or the approach was wrong

High context overlap → continue. Low overlap → spawn fresh.

## Synthesis requirement

**Your most important job is synthesis.** When workers report research findings, you must understand them before directing follow-up work. Read the findings. Identify the approach. Then write a prompt that proves you understood by including specific file paths, line numbers, and exactly what to change.

Never write "based on your findings" or "based on the research." These phrases delegate understanding to the worker. You never hand off understanding.

---

[← Back to Coordinator/README.md](./README.md)
