---
title: "Context, Compaction, Session Resume"
---

# Context, Compaction, Session Resume


### `DISABLE_COMPACT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Disable the /compact command entirely. When set, compaction is not available to the user.
- **Example:** `export DISABLE_COMPACT=1`

### `DISABLE_AUTO_COMPACT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Disable automatic context compaction. Context will grow until the hard limit is reached.
- **Example:** `export DISABLE_AUTO_COMPACT=1`

### `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`
- **Type:** Integer (percentage, 0-100)
- **Default:** Unspecified (typically 80)
- **Description:** Override auto-compaction trigger percentage. Compaction triggers when context reaches this % of window.
- **Example:** `export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=75`

### `CLAUDE_CODE_AUTO_COMPACT_WINDOW`
- **Type:** Integer (tokens)
- **Default:** Model-dependent
- **Description:** Override the auto-compaction context window size. Parsed as int; must be > 0.
- **Example:** `export CLAUDE_CODE_AUTO_COMPACT_WINDOW=150000`

### `CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE`
- **Type:** Integer (tokens)
- **Default:** Model-dependent (typically 100000)
- **Description:** Override the blocking context limit. When reached, further messages are blocked. Parsed as int; must be > 0.
- **Example:** `export CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE=180000`

### `CLAUDE_AFTER_LAST_COMPACT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** When fetching session data, only retrieve messages after the last compaction. Reduces session resume time.
- **Example:** `export CLAUDE_AFTER_LAST_COMPACT=1`

### `CLAUDE_CODE_RESUME_INTERRUPTED_TURN`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Resume an interrupted turn after compaction or reconnection. Continues where the last message left off.
- **Example:** `export CLAUDE_CODE_RESUME_INTERRUPTED_TURN=1`

### `CLAUDE_CODE_IDLE_THRESHOLD_MINUTES`
- **Type:** Integer (minutes)
- **Default:** 75
- **Description:** Idle threshold in minutes before prompting for session action. Asks user if they want to compact or resume.
- **Example:** `export CLAUDE_CODE_IDLE_THRESHOLD_MINUTES=120`

### `CLAUDE_CODE_IDLE_TOKEN_THRESHOLD`
- **Type:** Integer (tokens)
- **Default:** 100000
- **Description:** Token count (context size) threshold before prompting for session action.
- **Example:** `export CLAUDE_CODE_IDLE_TOKEN_THRESHOLD=150000`

### `CLAUDE_CODE_RESUME_THRESHOLD_MINUTES`
- **Type:** Integer (minutes)
- **Default:** 70
- **Description:** Minutes since last message before prompting to resume the session.
- **Example:** `export CLAUDE_CODE_RESUME_THRESHOLD_MINUTES=60`

### `CLAUDE_CODE_RESUME_TOKEN_THRESHOLD`
- **Type:** Integer (tokens)
- **Default:** 100000
- **Description:** Token threshold for resume prompt.
- **Example:** `export CLAUDE_CODE_RESUME_TOKEN_THRESHOLD=120000`

---

[← Back to env/README.md](/claude-code-docs/env/overview/)
