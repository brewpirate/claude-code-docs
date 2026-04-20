---
title: "Auto-Compaction"
tags: [cli]
---

Automatic conversation compression when context window approaches capacity.

## Compaction flow

**Trigger check (each turn):**

If `conversation_tokens + reserved_output_tokens > effective_context_window` → compaction runs. Otherwise → continue normally.

**Compaction steps:**

1. Pause user input temporarily
2. Call the compaction API to summarize conversation history
   - If it fails: retry up to 2 times total. After 2 failures → **abandon** (session continues without compaction)
3. Restore up to 5 recent files (5k tokens each)
4. Restore skill and MCP definitions (up to 25k tokens total)
5. Write a `SummaryMessage` entry to the transcript JSONL
6. Resume the session with compressed history

## Compaction trigger

Auto-compaction is triggered when:

```
(conversation_tokens + reserved_output_tokens) > effective_context_window
```

**Effective context window** = `context_window - 20k_reserved_for_summary`

- **20k reserve**: Based on p99.99 compaction summary output being ~17k tokens
- **Override**: `CLAUDE_CODE_AUTO_COMPACT_WINDOW` env var (in tokens)

Example: Claude 3.5 Sonnet (200k context window)

- Effective window: 200,000 - 20,000 = 180,000 tokens
- Trigger: When conversation reaches ~180,000 tokens

## Compaction process

When triggered, Claude Code:

1. **Pause user input** temporarily
2. **Invoke compaction API** to summarize conversation history
3. **Backup up to 5 files** (~5k tokens each) from recent context
4. **Restore file contents** from compaction output (re-inject truncated files)
5. **Restore skill/MCP definitions** (up to 25k tokens total)
6. **Write summary entry** to transcript JSONL
7. **Resume session** with compressed history

## Output reserves

During compaction, output is capped at **20k tokens**:

```
MAX_OUTPUT_TOKENS_FOR_SUMMARY = 20_000
```

Post-compaction, Claude Code restores context:

| Resource | Max tokens | Count |
|----------|-----------|-------|
| Files | 5,000 per file | Up to 5 |
| Skills | 5,000 per skill | ~25k total budget |
| MCP definitions | 5,000 per server | ~25k total budget |

Total restoration budget: 50k tokens (covers typical skill-heavy sessions)

## Compaction circuit breaker

To prevent infinite loops from repeated compaction failures:

```
MAX_COMPACT_STREAMING_RETRIES = 2
```

- **Retry limit**: 2 consecutive failures trigger abandon
- **Behavior on abandon**: Session continues without further compaction attempts
- **Logging**: Failure logged; user notified if in interactive mode

## Compaction transcript entries

When compaction completes, a `SummaryMessage` entry is appended:

```json
{
  "type": "SummaryMessage",
  "content": "Summarized conversation from turns 1-47...",
  "originalTurns": 47,
  "tokensSaved": 15000,
  "timestamp": "2026-04-17T14:30:00Z"
}
```

This entry is **not restored** on `--resume` (summary only; details in transcript if needed).

## Image handling during compaction

Before sending to compaction API:

- **Image blocks are stripped** from user messages
- **Marker text inserted**: `[Image: <type>]`
- **Reason**: Images not needed for summarization; can exceed prompt limit in CCD sessions

Images remain in transcript; only removed from compaction API input.

## Post-compaction restoration

After compaction, Claude Code restores context in order:

1. Up to 5 recent files (5k tokens each) from file history
2. Up to 25k tokens of skill definitions (5k per skill, top-used skills first)
3. Up to 25k tokens of MCP server definitions

This re-anchors the compressed conversation in concrete file/skill context.

## Compaction statistics

On completion, logs include:

```json
{
  "event": "compaction_completed",
  "original_turns": 47,
  "summary_tokens": 12345,
  "tokens_saved": 43210,
  "files_restored": 3,
  "duration_ms": 8900
}
```

---

[← Back to Sessions/README.md](/claude-code-docs/sessions/overview/)
