# Claude Code Memory Subsystems

Claude Code's memory architecture comprises four complementary systems: MEMORY.md entrypoints with auto-scanning, daily auto-memory logs, session memory extraction, and command history. Together they enable Claude to recall context, learn from past sessions, and handle complex projects without losing information.

## Table of Contents

1. [How memory works](./how-memory-works.md)
2. [Storage paths](./storage-paths.md)
3. [Auto-memory](./auto-memory.md)
4. [Memory types](./memory-types.md)
5. [Session memory](./session-memory.md)
6. [History and pastes](./history-and-pastes.md)
7. [Discrepancies & notes](./discrepancies-notes.md)

## Overview

**7 sections**, **6 memory subsystems** across local, remote, and agent scopes.

| # | Section | Description | Entries |
|---|---------|-------------|---------|
| 1 | [How memory works](./how-memory-works.md) | Architecture: MEMORY.md entrypoints, auto-memory daily logs, session memory extraction, and command history indexed by project. | narrative |
| 2 | [Storage paths](./storage-paths.md) | Full path resolution: local ~/.claude/, remote CCR, team memory, agent memory (user/project/local), and session memory. | 8 paths |
| 3 | [Auto-memory](./auto-memory.md) | Daily logs, 200-file scan cap with newest-first sort, 5-result Sonnet selector, 200-line / 25KB MEMORY.md caps, staleness warnings. | narrative |
| 4 | [Memory types](./memory-types.md) | Frontmatter classification: `user`, `feedback`, `project`, `reference` with narrowing logic during recall. | 4 types |
| 5 | [Session memory](./session-memory.md) | Background subagent extraction (feature gate `tengu_session_memory`), token budgets, initialization thresholds. | narrative |
| 6 | [History and pastes](./history-and-pastes.md) | Global history.jsonl (100 items/project, indexed by name) and paste-store content-addressed cache for >1024 char pastes. | narrative |
| 7 | [Discrepancies & notes](./discrepancies-notes.md) | Gaps between public docs and reality: feature gates, team memory gating, local-only agent memory, extraction behavior. | narrative |

## Quick reference — memory locations

| File/dir | Path | Scope | Purpose | Cap/retention |
|----------|------|-------|---------|----------------|
| MEMORY.md | `<memdir>/MEMORY.md` | Project-local | Index + entrypoint for memory files. Auto-scanned first. | 200 lines OR 25KB; excess dropped with warning |
| Auto-memory dir | `~/.claude/memory/YYYY/MM/YYYY-MM-DD.md` | User global | Daily logs. Newest 5 files selected by Sonnet after scan. | One file per day; 200-file scan cap |
| User agent memory | `~/.claude/agent-memory/<agentType>/` | User global | Per-agent-type memories (saved manually or via `/memory`). | No cap; scanned up to 200 files |
| Project agent memory | `.claude/agent-memory/<agentType>/` | Project-local | Project-specific agent memories (feature-gated by local setting). | No cap |
| Local agent memory | `.claude/agent-memory-local/<agentType>/` | Project-local | NEVER synced to CCR; kept only in .claude/ | No cap |
| Team memory | `CLAUDE_CODE_REMOTE_MEMORY_DIR/projects/<project>/team-memory/` | Team (CCR only) | Shared memories for team context (feature gate `isTeamMemoryEnabled()`). | No formal cap |
| Session memory | `~/.claude/sessionMemory.md` | User global | Current conversation notes. Extracted by background subagent. | Thinking=1024 tokens; extraction=2048 tokens max |
| History index | `~/.claude/history.jsonl` | User global | Global history across all projects, indexed by project-name. | 100 entries per project (newest first) |
| Paste cache | `~/.claude/paste-store/` | User global | Large pastes (>1024 chars) stored by content hash. Referenced as `[Pasted text #N +M lines]`. | No formal cap; cleaned by retention policy |

## See Also

- [../Settings/memory-context.md](../Settings/memory-context.md) — settings.json keys: `autoMemoryEnabled`, `autoDreamEnabled`, `cleanupPeriodDays`, `autoCompactWindow`
- [../ENV/README.md](../ENV/README.md) — env vars: `CLAUDE_CODE_DISABLE_AUTO_MEMORY`, `CLAUDE_CODE_REMOTE_MEMORY_DIR`, `CLAUDE_CODE_SIMPLE`
- [../Skills/FRONTMATTER.md](../Skills/FRONTMATTER.md) — `type:` frontmatter field for memory files
- [../Commands/memory-context.md](../Commands/memory-context.md) — `/init`, `/memory`, `/context` slash commands
- Official docs: <https://code.claude.com/docs/en/memory>
