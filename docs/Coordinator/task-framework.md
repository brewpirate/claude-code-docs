# Task Framework

The task framework manages lifecycle, output, and visibility of coordinated worker tasks. It includes polling intervals, grace periods, and output size limits.

## Key constants

### Polling and display timing

| Constant | Value | Purpose |
|----------|-------|---------|
| `POLL_INTERVAL_MS` | 1000 ms (1 second) | How fast task output is polled from disk |
| `PANEL_GRACE_MS` | 30,000 ms (30 seconds) | Terminal local_agent tasks stay visible in coordinator panel after completion before eviction |
| `STOPPED_DISPLAY_MS` | 3,000 ms (3 seconds) | Killed tasks remain visible before eviction |

### Output size limits

| Constant | Value | Purpose |
|----------|-------|---------|
| `MAX_TASK_OUTPUT_BYTES` | 5 GB | Per-task output cap. Enforced by watchdog (bash mode) and by DiskTaskOutput chunking (pipe mode) |

## Task output storage

### Output directory

- **Location**: `<project-temp-dir>/<session-id>/tasks/`
- **Session isolation**: Concurrent sessions in the same project use separate output directories via session ID
- **Persistence**: Output files persist for the duration of the session, then are cleaned up

### Symlink security

**Important**: Task output files are opened with `O_NOFOLLOW` flag (Unix only; not available on Windows):

- Prevents following symlinks when opening task output files
- Blocks sandbox attack vector where malicious code creates symlinks pointing to arbitrary files
- Without O_NOFOLLOW, an attacker could cause Claude Code to write to unintended files

Session cleanup in earlier versions unlinked in-flight output files from other sessions. This caused reads via path to fail with ENOENT while the writing process's file descriptor kept the inode alive. The session ID is now included in the output path to prevent clobbering. The session ID is memoized at first call, so the path remains stable even if `/clear` regenerates the session ID.

## Task lifecycle

1. **Registration**: Task is registered in AppState
2. **Polling**: Output is polled at `POLL_INTERVAL_MS` intervals from disk
3. **Terminal status**: Task reaches `completed`, `failed`, or `killed` state
4. **Grace period**: Terminal task remains visible in panel for `PANEL_GRACE_MS` (or `STOPPED_DISPLAY_MS` if stopped)
5. **Eviction**: Task is removed from UI after grace period expires

## Task notifications

Results arrive as `<task-notification>` XML messages to the coordinator:

```xml
<task-notification>
<task-id>agent-a1b</task-id>
<status>completed</status>
<summary>Agent "Investigate auth bug" completed</summary>
<result>Found null pointer in src/auth/validate.ts:42...</result>
<usage>
  <total_tokens>15234</total_tokens>
  <tool_uses>42</tool_uses>
  <duration_ms>45000</duration_ms>
</usage>
</task-notification>
```

- `<result>` and `<usage>` sections are optional
- `<summary>` describes outcome: "completed", "failed: {error}", or "was stopped"
- `<task-id>` is the agent ID for use with SendMessage

---

[← Back to Coordinator/README.md](./README.md)
