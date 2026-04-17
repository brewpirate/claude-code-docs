# Cleanup & Retention

Session transcript cleanup policy, configuration, and disabling.

## Default cleanup policy

**30-day retention**: On startup, Claude Code deletes all transcripts modified >30 days ago.

Configuration in `settings.json`:

```json
{
  "cleanupPeriodDays": 30
}
```

- Valid range: 0–N days
- Default: 30
- 0 means: disable cleanup entirely (retain indefinitely)

## Cleanup execution

Cleanup runs at startup:

1. Calculate cutoff date: `now - (cleanupPeriodDays * 24 * 60 * 60 * 1000)` milliseconds
2. Scan `~/.claude/sessions/projects/*/*.jsonl`
3. Delete all files with `mtime < cutoff`
4. Log results: count deleted, errors

Example: Today is 2026-04-17 with `cleanupPeriodDays: 30`

- Cutoff: 2026-03-18 00:00 UTC
- Any transcript last modified before that date is deleted
- Modified on 2026-03-19 → kept
- Modified on 2026-03-17 → deleted

## Disabling cleanup

Cleanup is skipped (no transcripts deleted) if **any** of these is true:

| Condition | Trigger | Effect |
|-----------|---------|--------|
| `cleanupPeriodDays === 0` | Settings key | No cleanup runs; transcripts retained indefinitely |
| `--no-session-persistence` | CLI flag | Session persistence disabled; cleanup irrelevant (no writes) |
| `NODE_ENV === 'test'` | Test environment | Cleanup skipped unless `TEST_ENABLE_SESSION_PERSISTENCE=1` |
| `CLAUDE_CODE_SKIP_PROMPT_HISTORY` | Env var | Set by Tungsten; skips persistence entirely |

## Non-interactive sessions

Sessions started in non-interactive contexts:

- `--stdin` flag (piped input)
- CI/CD environments (detected)
- Redirected input/output

These **never persist**; cleanup doesn't apply.

## Cleanup logging

After cleanup runs, diagnostic logs include:

```json
{
  "event": "session_cleanup_completed",
  "deleted_count": 5,
  "error_count": 0,
  "cutoff_date": "2026-03-18T00:00:00Z",
  "duration_ms": 234
}
```

Errors (e.g., permission issues) are logged but don't halt startup.

## Retention on demand

Protect a session from cleanup:

1. **Move it**: Archive to a directory outside `~/.claude/sessions/`
2. **Disable cleanup**: Set `cleanupPeriodDays: 0` in settings (affects all sessions)
3. **Timestamp trick**: `touch` the transcript to update mtime (persists 30 more days)

No "mark as keep forever" feature exists; instead, adjust `cleanupPeriodDays` globally.

---

[← Back to Sessions/README.md](./README.md)
