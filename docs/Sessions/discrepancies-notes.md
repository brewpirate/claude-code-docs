# Discrepancies & Notes

Known gaps between public documentation and implementation, edge cases, and internal details.

## Task state transience

**Issue**: Tasks are not persisted independently; they survive only via transcript entries.

- `AppState.tasks`: In-memory only, dies on process exit
- **Persistence**: `TaskSummaryMessage` entries in transcript preserve task history
- **On resume**: Full task state must be reconstructed from transcript (no dedicated task store)
- **Running tasks**: Killed on process exit unless captured in transcript before shutdown

**Impact**: Long-running background tasks should be checkpointed periodically to transcript.

## Metadata tail edge case

**Issue**: If many messages are appended after metadata changes, metadata may drift outside the 64 KB tail window.

**Scenario**:
1. User renames session (`/rename "New Title"`) → `CustomTitleMessage` appended
2. 1000+ messages follow
3. Metadata pushed beyond 64 KB tail
4. `--resume` shows old auto-generated title instead of custom name

**Fix**: Graceful shutdown always re-appends metadata to EOF. But ungraceful shutdown (process kill) loses this.

**Workaround**: Manual `/rename` before expected process exit.

## Session ID uniqueness

Session IDs are UUIDs generated at session start. No guarantee of global uniqueness across all systems, but collision probability is negligible (<10^-36 with current UUID v4 implementation).

- If collision occurs, most recent write wins (file overwrite)
- No collision detection or warning

## No multi-version context

Context (git status, CLAUDE.md) is captured at session start and frozen.

- Changes to git repo during session not reflected
- Changes to `~/.claude/CLAUDE.md` require session restart
- Git status remains "snapshot in time" throughout session lifetime

Users expecting live updates must run commands manually (e.g., `git status`) to see current state.

## Transcript file locking

No file locking mechanism exists between Claude processes.

- Two concurrent Claude Code sessions in the same project may write to the same JSONL
- Risk: Corrupted JSONL if both write simultaneously
- **Mitigation**: Session IDs are unique; same project, different sessions → different files
- **Edge case**: Resuming same session in parallel → potential corruption

**Best practice**: Don't resume the same session ID in multiple terminals.

## Compaction streaming retries

Max 2 retries on compaction failure. If both fail:

- Session continues with uncompacted transcript
- **No partial compaction**: Either full success or roll back
- **Infinite loop prevented**: Hard circuit breaker, not exponential backoff

If compaction API is consistently failing, user must manually `/branch` to start fresh.

## Context window override

`CLAUDE_CODE_AUTO_COMPACT_WINDOW` env var overrides effective context window size:

```bash
CLAUDE_CODE_AUTO_COMPACT_WINDOW=150000 claude .
```

- Useful for testing or constraining context on limited systems
- Lower values trigger compaction sooner
- Higher values delay compaction (may cause OOM if model's actual window is smaller)

## Session sanitization corner case

Very long project paths may exceed filesystem limits after sanitization:

- Paths >255 characters truncated by filesystem
- May collide with other projects (rare)
- No hash-based fallback; relies on filesystem truncation

**Impact**: Sessions from paths like `/very/long/path/with/many/nested/directories/...` may map to same directory as similar paths.

---

[← Back to Sessions/README.md](./README.md)
