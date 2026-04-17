# Session Resume

How `--resume` and `--continue` flags locate, load, and restore session state.

## Resume flags

### `--resume [session-id]`

Resumes a previous session by ID or by matching the current project.

- **With ID**: `claude --resume a1b2c3d4-e5f6...` resumes that exact session
- **Without ID**: `claude --resume` finds the most recent session in the current project
- **Behavior**: Loads full transcript from disk, restores context, continues from last turn

### `--continue [session-id]`

Alias for `--resume` — identical behavior.

## Session discovery

### Finding resumable sessions

On `--resume` without ID, the system:

1. Sanitizes current working directory → project path
2. Scans `~/.claude/sessions/projects/<sanitized>/`
3. Lists all `*.jsonl` files
4. Sorts by modification time (newest first)
5. Reads metadata from most recent file

### Metadata reader (tail scan)

The metadata reader is optimized for large transcripts:

- **Reads last 64 KB only** of the JSONL file
- Parses entries backward from EOF
- Extracts: `CustomTitleMessage`, `TagMessage`, `AgentNameMessage`
- Stops after finding metadata or reaching head of 64 KB window

Benefits:
- O(1) metadata lookup regardless of transcript size
- Avoids loading gigabyte-sized transcripts unnecessarily
- Fast session list refresh

## Transcript restoration

When a session is resumed with `--resume`:

### What is restored

- Full message history (all `TranscriptMessage` entries)
- Git status snapshot from session start (cached as-is)
- CLAUDE.md and other context injections
- File edit history + content snapshots
- Task state (from `TaskSummaryMessage` entries)
- Agent-specific state (via `PersistedWorktreeSession`)

### What is NOT restored

- `AiTitleMessage` entries (AI-generated titles, dropped on resume)
  - Only `CustomTitleMessage` (user-set) is kept
  - Avoids stale AI-generated titles from old runs
- Intermediate `SummaryMessage` entries created during compaction (conversation summary only)
- In-memory UI state (cursor position, viewport, etc.)
- Runtime state (running tasks, background workers)

### Token accounting on resume

- Full transcript reloaded
- Tokens re-counted
- If transcript + reserved output tokens < context window → no immediate compaction
- Otherwise → auto-compaction triggered immediately

## Pagination (assistant session history API)

For longer sessions, the assistant (internal) tracks pagination:

**Fetch latest**: `GET /v1/sessions/{id}/events?anchor_to_latest=true`

Response:
```json
{
  "firstId": "event-uuid",
  "hasMore": true,
  "size": 100,
  "events": [...]
}
```

**Fetch older**: `GET /v1/sessions/{id}/events?beforeId=event-uuid`

- Page size: 100 events per request
- `hasMore`: true if more pages available
- `firstId`: Cursor for older pages

This supports UI display of session history without loading entire transcript into memory.

## Resume edge cases

**Missing metadata**: If metadata re-append failed at shutdown, `--resume` may show auto-generated title based on first prompt instead of custom title.

**Oversized transcript (>50 MB)**: Readers reject with error; user must use `/branch` to start fresh or manually prune transcript.

**Cross-project resume**: `--resume session-id` works even if session's original project dir no longer exists (fallback to originalCwd guessing).

---

[← Back to Sessions/README.md](./README.md)
