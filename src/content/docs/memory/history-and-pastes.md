---
title: "History and Pastes"
tags: [settings]
---

Claude Code maintains a global command history and a content-addressed paste cache to enable quick recall of recent prompts and large pasted content.

## Command history

A global index at `~/.claude/history.jsonl` records recent prompts (JSONL format—one JSON object per line).

### Structure

Each history entry contains:

```json
{
  "projectName": "my-project",
  "timestamp": 1713374230000,
  "prompt": "Show me the latest API changes",
  "pastedContent": [
    { "id": 1, "type": "text", "contentHash": "abc123def..." },
    { "id": 2, "type": "image", "contentHash": null }
  ]
}
```

### Indexing and retrieval

- **Indexed by project name**: Entries are tagged with `projectName` to separate history by project context
- **Newest-first within each project**: Entries for a given project are sorted most-recent-first
- **Cap: 100 entries per project**: Older entries are dropped when the limit is exceeded
- **Access**: Via prompt up-arrow (` ↑ `) in the CLI; cycle through recent prompts for the current project

### Large paste handling

Pasted text longer than 1024 characters is not stored inline. Instead:

1. The text is hashed using a content-addressed function
2. The hash is stored in the history entry's `pastedContent` array
3. The actual content is stored in `~/.claude/paste-store/<hash>` by hash (deduplication by content)
4. The history entry includes a reference like `[Pasted text #1 +42 lines]`

This saves space and deduplicates identical pastes across multiple prompts.

## Paste store

The paste cache at `~/.claude/paste-store/` contains large pasted content indexed by content hash.

### Structure

```
~/.claude/paste-store/
├── abc123def456ghi... (content hash as filename)
├── xyz789uvw012pqr...
└── ...
```

Each file contains the raw pasted text (no JSON wrapper). The filename is the content hash, enabling deduplication: if the same content is pasted in two prompts, only one file is stored.

### References

When Claude encounters a reference like `[Pasted text #2 +15 lines]` in history or context, it can retrieve the content from the paste store using the content hash stored in the history entry's `pastedContent` array.

### Retention

Paste store entries may be cleaned up by retention policies defined in:

- **`cleanupPeriodDays`** (settings.json): How often to run cleanup
- **`autoCompactWindow`** (settings.json): Age threshold for compacting/removing old pastes

Exact retention rules are controlled by the cleanup agent; no explicit cap is enforced.

## Relationship to memory

History and pastes are distinct from memory systems:

- **History**: Command-level index of recent prompts, not extracted findings
- **Pastes**: Raw pasted content, not processed memories
- **Auto-memory**: Extracted facts and findings from conversations, stored persistently

A single prompt may generate auto-memory entries (e.g., "Discovered that the API uses JWT tokens") while also being indexed in history and referencing large pasted files.

---

[← Back to Memory/README.md](/claude-code-docs/memory/overview/)
