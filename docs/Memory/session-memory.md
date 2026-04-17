# Session Memory

Session memory automatically extracts and maintains notes about the current conversation, stored in `~/.claude/sessionMemory.md`. This lets Claude recall findings and decisions without re-reading the entire message history.

## How it works

A background subagent runs periodically during a conversation to:

1. Review the message history since the last extraction
2. Identify key facts, decisions, code patterns, and findings
3. Append structured notes to `~/.claude/sessionMemory.md`
4. Reset at the start of each new session

The subagent operates asynchronously without blocking the main conversation thread. It allows Claude to reference recent findings and decisions mid-conversation without scrolling back through messages.

## Feature gate and config

Session memory is controlled by feature flags and configuration:

- **Feature gate**: `tengu_session_memory` (off by default)
- **Remote config**: Dynamic configuration via `tengu_sm_config` feature control
- **User setting**: May be customizable via settings.json (if supported)

When disabled, the `~/.claude/sessionMemory.md` file is not created or updated.

## Initialization and thresholds

Session memory is initialized after:

- **N tool calls**: Extraction starts after the main agent has invoked tools a threshold number of times
- **Conversation length**: Or when the message history reaches a certain token count

Once initialized, the subagent continues extracting periodically (e.g., after every 5-10 tool calls or message additions).

## Token budgets

The extraction subagent operates under strict token limits:

- **Thinking tokens**: Max 1024 (for internal reasoning)
- **Extraction tokens**: Max 2048 (for generating the session memory content)

These limits ensure the background extraction doesn't consume excessive compute while still capturing substantive findings.

## File format

Session memory is stored as a single markdown file with sections for:

```markdown
---
type: session
created: 2026-04-17T14:30:00Z
lastUpdated: 2026-04-17T15:45:30Z
---

# Session Notes

## Key findings
- ...

## Decisions made
- ...

## Code patterns discovered
- ...

## Issues and workarounds
- ...
```

The file is cleared at the start of each new session (typically when Claude Code is started fresh).

## Interaction with MEMORY.md

Session memory is distinct from auto-memory logs:

- **Session memory**: Current conversation only; cleared on session end
- **Auto-memory logs**: Persistent daily logs; carried forward across sessions

At session end, meaningful findings from session memory may be manually promoted to auto-memory logs or MEMORY.md for long-term retention.

---

[← Back to Memory/README.md](./README.md)
