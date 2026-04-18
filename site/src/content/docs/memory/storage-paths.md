---
title: "Storage Paths"
tags: [settings]
---

# Storage Paths

Claude Code resolves memory paths through a consistent hierarchy, adapting to local vs. remote (CCR) environments.

## Base directory resolution

The base memory directory is determined by this priority:

1. **`CLAUDE_CODE_REMOTE_MEMORY_DIR`** env var (if set): Used in CCR mode to point to a persistent remote store
2. **`~/.claude/`**: Default config home (always available)

## Path reference table

All memory storage paths resolve relative to one of these bases:

| Memory system | Path | Base | Scope | Notes |
|---------------|------|------|-------|-------|
| **MEMORY.md** | `<project>/.claude/MEMORY.md` | Project-local | Project | Index file; auto-scanned first. 200 lines / 25KB cap. |
| **Auto-memory logs** | `~/.claude/memory/YYYY/MM/YYYY-MM-DD.md` | Local `~/.claude/` | User | Daily logs; one file per day. Newest-first scan, 200-file cap. |
| **User agent memory** | `~/.claude/agent-memory/<agentType>/` | Local `~/.claude/` | User | Memories for specific agent types. Scanned up to 200 files. |
| **Project agent memory** | `<project>/.claude/agent-memory/<agentType>/` | Project-local | Project | Project-scoped agent memories. Requires project setting. |
| **Local agent memory** | `<project>/.claude/agent-memory-local/<agentType>/` | Project-local | Project | Never synced to CCR; local-only. |
| **Team memory** | `<remote-base>/projects/<project>/team-memory/` | `CLAUDE_CODE_REMOTE_MEMORY_DIR` | Team | CCR only; requires `isTeamMemoryEnabled()` gate. |
| **Session memory** | `~/.claude/sessionMemory.md` | Local `~/.claude/` | User | Current conversation; extracted by background subagent. |
| **History index** | `~/.claude/history.jsonl` | Local `~/.claude/` | User | Global command history; 100 entries per project. |
| **Paste cache** | `~/.claude/paste-store/<hash>` | Local `~/.claude/` | User | Large pastes (>1024 chars) stored by content hash. |

## Example resolution

### Local development (no CCR)

```
~/.claude/
  ├── MEMORY.md (if in default project)
  ├── memory/
  │   ├── 2026/04/
  │   │   ├── 2026-04-15.md
  │   │   └── 2026-04-17.md
  ├── agent-memory/
  │   └── documentation-engineer/
  ├── agent-memory-local/
  │   └── (never present here; always in .claude/)
  ├── sessionMemory.md
  ├── history.jsonl
  └── paste-store/
      ├── abc123def...
      └── xyz789...

Project/.claude/
  ├── MEMORY.md
  ├── agent-memory/
  │   └── my-custom-agent/
  └── agent-memory-local/
      └── local-only-agent/
```

### CCR mode with CLAUDE_CODE_REMOTE_MEMORY_DIR

```
CLAUDE_CODE_REMOTE_MEMORY_DIR=/remote/storage/
  ├── memory/ (not used in CCR; auto-memory stays local)
  └── projects/
      └── my-project/
          └── team-memory/
              ├── architecture.md
              └── conventions.md

~/.claude/ (still present, used for local-only data)
  ├── memory/ (local auto-memory, not synced)
  ├── agent-memory/ (may sync, depending on config)
  ├── sessionMemory.md (local)
  └── history.jsonl (local)
```

## Sync boundaries

- **Synced to CCR** (if enabled): User agent memories (`~/.claude/agent-memory/`), team memory
- **Never synced**: Local auto-memory (`~/.claude/memory/`), session memory, history, paste cache, local-only agent memory
- **Project-local** (never synced): `.claude/agent-memory-local/`, project agent memories (if set)

## CCR feature gating

Some memory features are restricted to CCR deployments:

- **Team memory**: Requires both `CLAUDE_CODE_REMOTE_MEMORY_DIR` and the `isTeamMemoryEnabled()` gate (tested via `tengu_herring_clock` feature flag)
- **Remote memory dir**: Only applies when `CLAUDE_CODE_REMOTE` is true

---

[← Back to Memory/README.md](/claude-code-docs/memory/overview/)
