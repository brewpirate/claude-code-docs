---
title: "Auto-Memory"
tags: [settings]
---

Auto-memory is Claude Code's system for capturing insights that emerge during conversations without explicit user action. It runs continuously to populate `~/.claude/memory/YYYY/MM/YYYY-MM-DD.md` with daily entries and selects the most relevant files for context injection.

## Daily logs

Auto-memory saves to one file per day, organized by date:

```
~/.claude/memory/
├── 2026/
│   ├── 01/
│   │   ├── 2026-01-15.md
│   │   └── 2026-01-17.md
│   ├── 02/
│   │   └── 2026-02-10.md
│   └── 04/
│       └── 2026-04-17.md
```

New entries are appended to the current day's file. Files created on different days are separate. This structure helps with staleness detection and time-based filtering.

## Scanning and selection

When context is loaded, Claude Code performs a two-stage memory recall:

### Stage 1: Scan all files

- Recursively read all `.md` files in `~/.claude/memory/` and project `.claude/MEMORY.md`
- **Cap: 200 files maximum** (to avoid scanning noise in large memory directories)
- **Sort: Newest-first by modification time** (mtime)
- Extract frontmatter from the first 30 lines of each file (filename, description, type)

### Stage 2: Select 5 most relevant

A background Sonnet subagent reviews the metadata list (file name, mtime, type, description) and selects up to 5 files most relevant to the current conversation. Selection criteria include:

- Recency (newer > older, but today/yesterday are treated equally)
- Type matching (e.g., "project" type for project-scoped queries)
- Description match (if description hints at the current task)
- File path and filename signals

The selected files are injected into context alongside MEMORY.md.

## MEMORY.md truncation

MEMORY.md files are subject to strict caps to prevent context bloat:

- **200 lines**: Content is truncated to the first 200 lines
- **25 KB**: Content is also truncated at 25 KB (measured pre-truncation, so long lines are caught even if under 200 lines)
- **Whichever fires first** triggers truncation

If either cap is exceeded, a warning is appended:

```
> WARNING: MEMORY.md is 310 lines (limit: 200). Only part of it was loaded.
> Keep index entries to one line under ~200 chars; move detail into topic files.
```

This encourages users to move detailed content into separate files and maintain MEMORY.md as a concise index.

## Staleness warnings

Auto-memory files receive age annotations based on mtime:

- **Today or yesterday**: No warning; treated as current
- **Older than 1 day**: Marked with age and appended note "claims may be outdated"

Example annotation:

```
## 2026-04-10.md (7 days old)

[Memory content here]

Note: This memory is 7 days old; claims may be outdated.
```

The note encourages Claude to verify facts from old memories or refresh the files if they're still relevant.

## Enabling and disabling

Auto-memory is enabled by default. To disable, set one of:

1. **Env var** (highest priority): `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`
2. **Mode flag**: `--bare` flag (simple/minimal mode)
3. **CCR without persistence**: Running in CCR mode without `CLAUDE_CODE_REMOTE_MEMORY_DIR` disables auto-memory to avoid context loss
4. **Project setting** (lowest priority): `autoMemoryEnabled: false` in `settings.json`

When disabled, MEMORY.md files are still read if present, but auto-memory logs and extraction are skipped.

## Background extraction

During each session, a background subagent (controlled by `tengu_passport_quail` feature flag) monitors the conversation and appends extractable facts to the current day's file. This happens asynchronously without blocking the main conversation. If the main agent writes memory content in a turn, the extraction agent skips that range to avoid duplication.

---

[← Back to Memory/README.md](/claude-code-docs/memory/overview/)
