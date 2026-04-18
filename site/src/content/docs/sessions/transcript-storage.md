---
title: "Transcript Storage"
---

# Transcript Storage

Storage format, path structure, sanitization, and metadata persistence.

## Transcript path structure

```
~/.claude/sessions/
  projects/
    <sanitized-project-dir>/
      <session-id>.jsonl
      <session-id>.jsonl
```

- **Base**: `~/.claude/sessions/projects/`
- **Project dir**: Sanitized version of the working directory at session start
  - Unsafe characters (spaces, `/`, `\\`, `:`, etc.) replaced with `_`
  - Function: `sanitizePath(projectDir)` in `sessionStorage.ts`
- **Filename**: Session UUID + `.jsonl` extension

Example: Session in `/Users/alice/code/my-project` with ID `a1b2c3d4...` writes to:

```
~/.claude/sessions/projects/Users_alice_code_my-project/a1b2c3d4....jsonl
```

## JSONL format

Each line is a JSON object representing one entry in the conversation. Entries are appended sequentially.

```jsonl
{"type":"TranscriptMessage","role":"user","content":"...","timestamp":"2026-04-17T14:00:00Z","id":"msg-uuid"}
{"type":"TranscriptMessage","role":"assistant","content":"...","timestamp":"2026-04-17T14:00:01Z","id":"msg-uuid"}
{"type":"TaskSummaryMessage","taskId":"task-001","status":"completed"}
{"type":"CustomTitleMessage","title":"Project setup guide"}
{"type":"TagMessage","tag":"docs"}
```

- **Immutable append-only**: New entries appended; old entries never modified
- **JSONL validation**: Parser tolerates partial lines (truncated entries)
- **50 MB read limit**: `MAX_TRANSCRIPT_READ_BYTES = 50 * 1024 * 1024` — readers bail if larger to prevent OOM

## Metadata tail re-append

**Problem**: Session metadata (customTitle, tags) may drift outside the tail window after many message appends.

**Solution**: On graceful shutdown, the session manager:

1. Flushes all buffered entries
2. Collects all metadata entries (`CustomTitleMessage`, `TagMessage`, etc.)
3. Appends them to EOF

**Reader behavior**: Metadata reader (`readLiteMetadata`) only scans the last **64 KB** of the JSONL file. Re-appending ensures metadata is always found on `--resume`.

Example tail after re-append (last few lines):

```jsonl
{"type":"TranscriptMessage","role":"assistant","content":"...","id":"msg-999"}
{"type":"CustomTitleMessage","title":"Session renamed by user"}
{"type":"TagMessage","tag":"important"}
{"type":"TagMessage","tag":"archived"}
```

## Lazy materialization

The transcript file is created only when the first entry is written. Before that:

- Session ID exists in memory
- No file on disk
- Properties (`customTitle`, `tags`) buffered in memory
- No cleanup considers the session (doesn't exist yet)

Benefits:
- Avoids cluttering `~/.claude/sessions/` with empty files
- Sessions with no messages leave no trace
- Minimal overhead for lightweight interactions

## Max transcript size

- No hard limit on JSONL size; transcripts can grow to **multiple GB** (e.g., multi-month active sessions)
- Compaction reduces size over time (summarizes old turns, reduces detail)
- On resume, full transcript is loaded if it fits in context window
- Oversized transcripts (>50 MB) are rejected by readers to prevent OOM

## Sanitization of project paths

The `sanitizePath()` function converts project directories to safe names:

- Spaces → `_`
- Forward/backslashes → `_`
- Colons → `_`
- Other unsafe chars → `_`
- Case preserved on case-sensitive filesystems

This allows sessions from different projects to coexist without filename collisions.

Example sanitizations:

| Original path | Sanitized |
|---------------|-----------|
| `/Users/alice/code/my-project` | `Users_alice_code_my-project` |
| `C:\Users\alice\projects\web-app` | `C_Users_alice_projects_web-app` |
| `/home/user/Project Name (v2)` | `_home_user_Project_Name__v2_` |

---

[← Back to Sessions/README.md](/claude-code-docs/sessions/overview/)
