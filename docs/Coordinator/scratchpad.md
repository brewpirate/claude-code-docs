# Scratchpad Directory

The scratchpad is a shared directory (`.claude/scratchpad/`) that coordinator agents can read and write without permission prompts. It's the primary inter-agent coordination primitive for durable cross-worker knowledge.

## What is it?

A project-level directory at `.claude/scratchpad/` where workers can share findings, test results, implementation notes, or any structured data without triggering permission checks.

**Use cases:**
- Worker A documents findings; Worker B reads and builds on them
- Verification worker stores test results that implementation worker references
- Team bookkeeping — tracking which files have been modified, who's responsible for what
- Shared knowledge base — decisions, architectural notes, learnings

## Enabling scratchpad

Scratchpad is gated by the `tengu_scratch` Statsig feature gate. When enabled:

1. Coordinator agents receive the scratchpad directory path via dependency injection from QueryEngine
2. The path is injected into the coordinator system prompt as `workerToolsContext`
3. Workers can read and write files in this directory freely—no permission prompts

## Behavior

- **Path**: `.claude/scratchpad/` relative to project root
- **Permission handling**: Reads and writes are not gated by the permission system—no prompts required
- **Access scope**: All workers in the coordinator session can access the same directory
- **File structure**: You and your workers decide the structure. No enforced schema
- **Persistence**: Files persist across worker sessions within the same project

## When scratchpad is not available

If `tengu_scratch` is not enabled (or the feature gate is off), workers do not receive the scratchpad path, and it's not mentioned in coordinator instructions. The directory `.claude/scratchpad/` may exist but is not part of the worker context.

## File structure recommendations

- **findings.md** — centralized research findings
- **tasks.json** — task assignments and status tracking
- **decisions.md** — architectural decisions and rationale
- **test-results.txt** — verification test runs (for follow-up workers to reference)
- Agent-specific subdirs: `.claude/scratchpad/agent-a1b/`, `.claude/scratchpad/verifier/`, etc.

The structure is entirely up to you and your team.

---

[← Back to Coordinator/README.md](./README.md)
