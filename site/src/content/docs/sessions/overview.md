---
title: "Sessions Overview"
description: "How Claude Code sessions work"
---

# Claude Code Session Lifecycle

Reference for session initialization, transcript persistence, automatic compaction, resumption, and cleanup. Sessions capture all interactions in immutable JSONL transcripts stored under `~/.claude/sessions/`, keyed by project and session ID.

## Table of Contents

1. [How sessions work](/claude-code-docs/sessions/overview/)
2. [Transcript storage](/claude-code-docs/sessions/overview/)
3. [Session resume](/claude-code-docs/sessions/overview/)
4. [Cleanup & retention](/claude-code-docs/sessions/overview/)
5. [Context management](/claude-code-docs/sessions/overview/)
6. [Auto-compaction](/claude-code-docs/sessions/overview/)
7. [Transcript entry types](/claude-code-docs/sessions/overview/)
8. [Startup recovery](/claude-code-docs/sessions/overview/)
9. [Discrepancies & notes](/claude-code-docs/sessions/overview/)

## Overview

**9 sections**, **11+ subsystems** covering session state, persistence, resumption, and memory management.

| # | Section | Description | Key files/paths |
|---|---------|-------------|-----------------|
| 1 | [How sessions work](/claude-code-docs/sessions/overview/) | Lifecycle stages: start → message turns → compact → persist → resume. Lazy materialization on first write. | `sessionStorage.ts`, `utils/cleanup.ts` |
| 2 | [Transcript storage](/claude-code-docs/sessions/overview/) | JSONL format, path structure (`~/.claude/sessions/projects/<sanitized>/<uuid>.jsonl`), metadata tail re-append. | `sessionStorage.ts:202-207`, `getProjectDir`, `sanitizePath` |
| 3 | [Session resume](/claude-code-docs/sessions/overview/) | `--resume`/`--continue` flag behavior, metadata reader (64KB tail), what's restored vs. dropped, pagination. | `sessionStorage.ts:448-461`, `sessionHistory.ts` |
| 4 | [Cleanup & retention](/claude-code-docs/sessions/overview/) | 30-day default (`cleanupPeriodDays`), disabled via `--no-session-persistence`, test env, or `cleanupPeriodDays=0`. | `cleanup.ts:23-30`, settings keys |
| 5 | [Context management](/claude-code-docs/sessions/overview/) | Git status snapshot (2k char cap, cached), CLAUDE.md auto-discovery, per-conversation memoization. | `context.ts:20-111`, `getSystemContext`, `getUserContext` |
| 6 | [Auto-compaction](/claude-code-docs/sessions/overview/) | Triggered at context-window-20k threshold, 20k output reserve, file+skill restoration, circuit breaker at 2 retries. | `autoCompact.ts:28-49`, `compact.ts:122-130` |
| 7 | [Transcript entry types](/claude-code-docs/sessions/overview/) | 17+ entry types: `TranscriptMessage`, `SummaryMessage`, `AiTitleMessage`, `CustomTitleMessage`, `TaskSummaryMessage`, etc. | `types/logs.ts:297-317` |
| 8 | [Startup recovery](/claude-code-docs/sessions/overview/) | Release notes cached to `~/.claude/cache/changelog.md`, terminal backup recovery from `~/.claude/backups/`. | `releaseNotes.ts`, `setup.ts:115-157` |
| 9 | [Discrepancies & notes](/claude-code-docs/sessions/overview/) | Known gaps: session state transience, task survival via transcript, metadata tail edge cases. | Gaps between docs and implementation |

## Quick reference — session state by context

| Context | Session ID | Stored | On resume | Cleanup |
|---------|-----------|--------|-----------|---------|
| Interactive shell (`claude .`) | UUID, lazy-generated | JSONL on first turn | Metadata from tail, full transcript on `--resume` | 30-day default; `--no-session-persistence` disables |
| Spawned by Tungsten (`tmuxSocket`) | UUID | Skipped (env: `CLAUDE_CODE_SKIP_PROMPT_HISTORY`) | Not available | Never cleaned (not persisted) |
| Test suite (`NODE_ENV=test`) | UUID | Optional (`TEST_ENABLE_SESSION_PERSISTENCE`) | Not available | Never cleaned |
| Non-interactive (`--stdin`, CI) | UUID | Skipped (`isSessionPersistenceDisabled()`) | Not available | Never cleaned |

## See Also

- [../Settings/memory-context.md](/claude-code-docs/settings/memory-context/) — settings keys: `cleanupPeriodDays`, `autoCompactWindow`
- [../Commands/session-management.md](/claude-code-docs/cli/overview/) — `/resume`, `/continue`, `/clear`, `/compact`, `/rewind`, `/branch`, `/fork`
- [../CLI/README.md](/claude-code-docs/cli/overview/) — flags: `--resume`, `--continue`, `--no-session-persistence`, `--session-id`
- [../ENV/README.md](/claude-code-docs/env/overview/) — env vars: `CLAUDE_CODE_AUTO_COMPACT_WINDOW`, `CLAUDE_CODE_SKIP_PROMPT_HISTORY`
- [../Memory/README.md](/claude-code-docs/memory/overview/) — context window sizing, token accounting
