---
title: "How Sessions Work"
tags: [cli]
---

# How Sessions Work

Session lifecycle from initialization through persistence, compaction, and resumption.

## Session lifecycle diagram

| Stage | What happens |
|-------|-------------|
| **1. Start** | Session UUID generated. CLAUDE.md discovered, git status snapshotted. No transcript file created yet (lazy). |
| **2. First message** | Transcript JSONL file created at `~/.claude/sessions/projects/<cwd>/<session-id>.jsonl`. Message and response appended. |
| **3. Each turn** | User message sent to API. Response and tool calls appended to transcript. Token count checked each turn. |
| **4. Auto-compaction** (if needed) | When tokens approach the context limit, history is summarized via the compaction API and a `SummaryMessage` entry is written. Session continues with compressed history. |
| **5. Exit** | Transcript entries flushed. Session metadata (title, tags) re-appended to EOF so `--resume` can find it. |
| **6. Cleanup** (next startup) | Transcripts older than 30 days are deleted. Controlled by `settings.cleanupPeriodDays`. |

## Session initialization

Sessions are created automatically on first message in an interactive terminal. Each session is assigned a **UUID** as its identifier, which becomes the JSONL filename in the transcript directory.

**Lazy materialization**: The transcript file is not created until the first user or assistant message is processed. On first write, the session directory is created if needed, metadata (customTitle, tags) is written, and subsequent entries are appended. This avoids creating empty files for sessions that produce no interaction.

Transcript path: `~/.claude/sessions/projects/<sanitized-cwd>/<session-id>.jsonl`

- `sanitized-cwd`: Project directory name with unsafe characters replaced
- `session-id`: UUID v4 identifier for this session

## Session lifecycle stages

### Stage 1: Start (initialization)

- Session ID generated (UUID)
- Git status snapshot captured (if in git repo, limited to 2000 chars)
- CLAUDE.md auto-discovered and cached (unless `--bare` or env var disabled)
- No transcript file created yet

### Stage 2: Message turns

- User messages and AI responses appended to transcript JSONL
- Each turn writes entries in order: user input, tool invocations, tool results, assistant output
- Context management (git status, CLAUDE.md) memoized per conversation to avoid re-reads
- Token accounting tracks cumulative conversation size

### Stage 3: Auto-compaction check (per turn)

If conversation tokens approach `context_window - 20k` (reserved for summary output):

1. Stop accepting user input temporarily
2. Invoke compaction API to summarize conversation history
3. Backup up to 5 files (~5k tokens each) and restore from compaction output
4. Restore up to 25k tokens of skill/MCP definitions
5. If compaction fails twice consecutively, abandon to prevent infinite loops
6. Continue with compressed transcript

### Stage 4: Persistence (graceful shutdown)

Before process exit, the session manager:

1. Flushes all buffered entries to transcript JSONL
2. Re-appends session metadata (customTitle, tags) to EOF so they remain in readable tail
3. Closes file handle

Re-appending ensures metadata is always findable via tail-read on `--resume`.

### Stage 5: Cleanup (periodic, at startup)

On startup, if session persistence is enabled, cleanup runs:

- Deletes all transcripts modified >30 days ago (default)
- Respects `settings.cleanupPeriodDays` override (or 0 to disable)
- Logs cleanup stats

Cleanup is skipped if:
- `NODE_ENV === 'test'` and `TEST_ENABLE_SESSION_PERSISTENCE` not set
- `cleanupPeriodDays === 0`
- `--no-session-persistence` flag passed
- `CLAUDE_CODE_SKIP_PROMPT_HISTORY` env var set

## Session persistence disabled

In these contexts, **no transcript is written**:

- Test environments (unless `TEST_ENABLE_SESSION_PERSISTENCE=1`)
- Tungsten-spawned sessions (env: `CLAUDE_CODE_SKIP_PROMPT_HISTORY=1`)
- `--no-session-persistence` flag
- Settings: `cleanupPeriodDays === 0`
- Non-interactive input (stdin, CI)

These sessions still have an in-memory session ID and transcript state, but nothing is saved to disk.

---

[← Back to Sessions/README.md](/claude-code-docs/sessions/overview/)
