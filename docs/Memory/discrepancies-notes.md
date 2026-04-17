# Discrepancies & Notes

This document captures gaps between public-facing Claude Code documentation and the implementation revealed by source code review.

## Feature gates

Several memory features are controlled by feature flags that are not widely documented:

- **`tengu_passport_quail`**: Controls whether the auto-memory extraction agent runs during sessions
- **`tengu_session_memory`**: Gates the session memory extraction feature
- **`tengu_herring_clock`**: Gates team memory functionality (`isTeamMemoryEnabled()`)
- **`tengu_slate_thimble`**: Allows session memory extraction in non-interactive sessions
- **`tengu_sm_config`**: Provides dynamic configuration for session memory (token budgets, thresholds)

These are internal feature flags used by Anthropic's deployment pipeline and are not intended for user configuration.

## Team memory gating

Team memory functionality (`CLAUDE_CODE_REMOTE_MEMORY_DIR/projects/<project>/team-memory/`) is documented as available in CCR but is further gated by the `isTeamMemoryEnabled()` check, which tests the `tengu_herring_clock` feature. Not all CCR deployments have this feature enabled.

## Auto-memory always scans 200 files

The auto-memory system scans up to 200 files from `~/.claude/memory/` regardless of project or user request. This limit is hardcoded (`MAX_MEMORY_FILES = 200`) and not configurable. For users with large memory directories (>200 files), older entries may never be scanned unless explicitly moved or cleaned up.

## Local-only agent memory never syncs

Agent memories stored in `.claude/agent-memory-local/<agentType>/` are guaranteed never to be synced to CCR, even if `CLAUDE_CODE_REMOTE_MEMORY_DIR` is set. This is by design for local-sensitive data, but is not explicitly documented in public docs.

## Session memory lifecycle

Session memory (`~/.claude/sessionMemory.md`) is scoped to a single session and is cleared when Claude Code exits. There is no automatic promotion to persistent memory; users must manually save important session findings to MEMORY.md or auto-memory if they want to retain them.

## Extraction behavior and main-agent writes

If the main agent explicitly writes memory content during a turn (via Write or Edit tools), the background extraction agent skips that range to avoid duplication. This is an optimization detail not documented in public guides.

## No user-configurable memory scan depth

There is no user setting to change the `MAX_MEMORY_FILES` cap or the Sonnet selector's "top-5" limit. Both are hardcoded constants. Users cannot opt into deeper memory scans or more granular selection.

## MEMORY.md warning message

When MEMORY.md exceeds the 200-line or 25 KB cap, the warning message instructs users to "keep index entries to one line under ~200 chars; move detail into topic files." This is a hint that MEMORY.md should be a concise index, not a detailed reference document. This design principle is implicit in the code but not always clear in documentation.

## History.jsonl is global, not per-project

The history index at `~/.claude/history.jsonl` is a single user-global file (not split per project). Entries are indexed by `projectName` field, but all history is stored in one file, which could grow large over time if not pruned.

---

[← Back to Memory/README.md](./README.md)
