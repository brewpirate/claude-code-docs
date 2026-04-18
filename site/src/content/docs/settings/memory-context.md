---
title: "Memory & Context"
tags: [settings]
---

# Memory & Context


### `autoMemoryEnabled`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Toggle auto-memory extraction. When enabled, Claude automatically extracts and stores important context from sessions for future reference.
- **Example:**
  ```json
  {
    "autoMemoryEnabled": true
  }
  ```

### `autoDreamEnabled`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Background consolidation of auto-memory. When enabled, Claude periodically consolidates accumulated memory entries in the background.
- **Example:**
  ```json
  {
    "autoDreamEnabled": true
  }
  ```

### `cleanupPeriodDays`
- **Type:** number
- **Default:** 30
- **Description:** Session files older than this period (in days) are deleted at startup. Minimum value is 1. Setting to `0` is rejected with a validation error. Also controls the age cutoff for automatic removal of orphaned subagent worktrees at startup.
- **Example:**
  ```json
  {
    "cleanupPeriodDays": 20
  }
  ```

### `autoCompactWindow`
- **Type:** number
- **Default:** unspecified
- **Description:** Token threshold that triggers automatic context compaction. When the context window exceeds this threshold, Claude automatically compacts the conversation to reduce token usage.
- **Example:**
  ```json
  {
    "autoCompactWindow": 8000
  }
  ```

### `fileCheckpointingEnabled`
- **Type:** boolean
- **Default:** true
- **Description:** Snapshot files before edits to preserve versions and enable undo-style operations. When enabled, Claude creates backups of files before making changes.
- **Example:**
  ```json
  {
    "fileCheckpointingEnabled": true
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
