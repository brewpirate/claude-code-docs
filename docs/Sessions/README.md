# Claude Code Session Lifecycle

Reference for session initialization, transcript persistence, automatic compaction, resumption, and cleanup. Sessions capture all interactions in immutable JSONL transcripts stored under `~/.claude/sessions/`, keyed by project and session ID.

## Table of Contents

1. [How sessions work](./how-sessions-work.md)
2. [Transcript storage](./transcript-storage.md)
3. [Session resume](./session-resume.md)
4. [Cleanup & retention](./cleanup-retention.md)
5. [Context management](./context-management.md)
6. [Auto-compaction](./auto-compaction.md)
7. [Transcript entry types](./transcript-entry-types.md)
8. [Startup recovery](./startup-recovery.md)
9. [Discrepancies & notes](./discrepancies-notes.md)

## Overview

**9 sections**, **11+ subsystems** covering session state, persistence, resumption, and memory management.

| # | Section | Description | Key files/paths |
|---|---------|-------------|-----------------|
| 1 | [How sessions work](./how-sessions-work.md) | Lifecycle stages: start → message turns → compact → persist → resume. Lazy materialization on first write. | `sessionStorage.ts`, `utils/cleanup.ts` |
| 2 | [Transcript storage](./transcript-storage.md) | JSONL format, path structure (`~/.claude/sessions/projects/<sanitized>/<uuid>.jsonl`), metadata tail re-append. | `sessionStorage.ts:202-207`, `getProjectDir`, `sanitizePath` |
| 3 | [Session resume](./session-resume.md) | `--resume`/`--continue` flag behavior, metadata reader (64KB tail), what's restored vs. dropped, pagination. | `sessionStorage.ts:448-461`, `sessionHistory.ts` |
| 4 | [Cleanup & retention](./cleanup-retention.md) | 30-day default (`cleanupPeriodDays`), disabled via `--no-session-persistence`, test env, or `cleanupPeriodDays=0`. | `cleanup.ts:23-30`, settings keys |
| 5 | [Context management](./context-management.md) | Git status snapshot (2k char cap, cached), CLAUDE.md auto-discovery, per-conversation memoization. | `context.ts:20-111`, `getSystemContext`, `getUserContext` |
| 6 | [Auto-compaction](./auto-compaction.md) | Triggered at context-window-20k threshold, 20k output reserve, file+skill restoration, circuit breaker at 2 retries. | `autoCompact.ts:28-49`, `compact.ts:122-130` |
| 7 | [Transcript entry types](./transcript-entry-types.md) | 17+ entry types: `TranscriptMessage`, `SummaryMessage`, `AiTitleMessage`, `CustomTitleMessage`, `TaskSummaryMessage`, etc. | `types/logs.ts:297-317` |
| 8 | [Startup recovery](./startup-recovery.md) | Release notes cached to `~/.claude/cache/changelog.md`, terminal backup recovery from `~/.claude/backups/`. | `releaseNotes.ts`, `setup.ts:115-157` |
| 9 | [Discrepancies & notes](./discrepancies-notes.md) | Known gaps: session state transience, task survival via transcript, metadata tail edge cases. | Gaps between docs and implementation |

## Quick reference — session state by context

| Context | Session ID | Stored | On resume | Cleanup |
|---------|-----------|--------|-----------|---------|
| Interactive shell (`claude .`) | UUID, lazy-generated | JSONL on first turn | Metadata from tail, full transcript on `--resume` | 30-day default; `--no-session-persistence` disables |
| Spawned by Tungsten (`tmuxSocket`) | UUID | Skipped (env: `CLAUDE_CODE_SKIP_PROMPT_HISTORY`) | Not available | Never cleaned (not persisted) |
| Test suite (`NODE_ENV=test`) | UUID | Optional (`TEST_ENABLE_SESSION_PERSISTENCE`) | Not available | Never cleaned |
| Non-interactive (`--stdin`, CI) | UUID | Skipped (`isSessionPersistenceDisabled()`) | Not available | Never cleaned |

## See Also

- [../Settings/memory-context.md](../Settings/memory-context.md) — settings keys: `cleanupPeriodDays`, `autoCompactWindow`
- [../Commands/session-management.md](../Commands/session-management.md) — `/resume`, `/continue`, `/clear`, `/compact`, `/rewind`, `/branch`, `/fork`
- [../CLI/README.md](../CLI/README.md) — flags: `--resume`, `--continue`, `--no-session-persistence`, `--session-id`
- [../ENV/README.md](../ENV/README.md) — env vars: `CLAUDE_CODE_AUTO_COMPACT_WINDOW`, `CLAUDE_CODE_SKIP_PROMPT_HISTORY`
- [../Memory/README.md](../Memory/README.md) — context window sizing, token accounting
