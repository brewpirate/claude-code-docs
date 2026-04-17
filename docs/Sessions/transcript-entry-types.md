# Transcript Entry Types

All entry types stored in session JSONL transcripts.

## Core conversation entries

| Type | Purpose | Persisted on resume | Notes |
|------|---------|---------------------|-------|
| `TranscriptMessage` | User or assistant message in conversation | Yes | Role: `user` or `assistant` |
| `SummaryMessage` | Conversation summary after compaction | No | Compressed history; full details in transcript |
| `TaskSummaryMessage` | Task execution result and status | Yes | Links to task framework; survives via transcript |

## Metadata entries

| Type | Purpose | Persisted on resume | Notes |
|------|---------|---------------------|-------|
| `CustomTitleMessage` | User-set session title | Yes | Always wins over AI-generated title |
| `AiTitleMessage` | AI-generated title from first prompt | No | Dropped on resume; replaced by user custom if exists |
| `TagMessage` | User-added tags (e.g., "important", "archived") | Yes | Multiple allowed per session |
| `AgentNameMessage` | Subagent custom name | Yes | Used in UI agent list |
| `AgentColorMessage` | Subagent UI color preference | Yes | Hex color for agent badge |
| `AgentSettingMessage` | Subagent configuration state | Yes | Persists agent-level settings |

## File and content entries

| Type | Purpose | Persisted on resume | Notes |
|------|---------|---------------------|-------|
| `FileHistorySnapshotMessage` | Content of a file at a specific turn | Yes | Snapshots for `/rewind` and file archaeology |
| `AttributionSnapshotMessage` | Source attribution for tool results | Yes | Tracks which tool created which output |
| `ContentReplacementEntry` | Updated file content (e.g., post-edit) | Yes | Stable prompt cache key |
| `PersistedWorktreeSession` | Worktree session state | Yes | Used for `/branch` and multi-worktree scenarios |

## Session state entries

| Type | Purpose | Persisted on resume | Notes |
|------|---------|---------------------|-------|
| `LastPromptMessage` | Last user prompt before shutdown | No | Transient; used for UI recovery only |
| `ModeEntry` | Permission/compaction mode state | Yes | Tracks active mode changes during session |
| `WorktreeStateEntry` | Current worktree/branch context | Yes | Enables multi-worktree session tracking |

## PR and queue entries

| Type | Purpose | Persisted on resume | Notes |
|------|---------|---------------------|-------|
| `PRLinkMessage` | GitHub PR created/linked in session | Yes | Links session to PR context |
| `QueueOperationMessage` | Task queue mutation (add/remove/complete) | Yes | Task framework operations |
| `SpeculationAcceptMessage` | Accepted speculative execution result | Yes | Optimistic execution tracking |

## Compaction and context entries

| Type | Purpose | Persisted on resume | Notes |
|------|---------|---------------------|-------|
| `ContextCollapseCommitEntry` | Commit after context collapse operation | Yes | Records context simplification events |
| `ContextCollapseSnapshotEntry` | Snapshot before context collapse | Yes | Backup for context recovery |

## Summary table — entry count

- **17+ total types** defined in `types/logs.ts`
- **Persisted on resume**: 13 types (conversation, metadata, files, state, queue, compaction)
- **Dropped on resume**: 4 types (AI title, summary, last prompt, misc transient)

## Entry format

All entries are JSON objects with these common fields:

```json
{
  "type": "<EntryType>",
  "timestamp": "2026-04-17T14:00:00Z",
  "id": "<uuid>"
}
```

Type-specific fields vary. Example `TranscriptMessage`:

```json
{
  "type": "TranscriptMessage",
  "role": "user",
  "content": "...",
  "timestamp": "2026-04-17T14:00:00Z",
  "id": "msg-abc123"
}
```

---

[← Back to Sessions/README.md](./README.md)
