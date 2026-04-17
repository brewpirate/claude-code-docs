# Context Management

Git status snapshot, CLAUDE.md auto-discovery, and per-conversation context caching.

## Git status snapshot

At session start, if the working directory is a git repo:

1. Run `git status --short`, `git log --oneline -n 5`, `git config user.name`
2. Capture branch, default branch, and user name
3. **Truncate status to 2000 characters** if output exceeds limit
4. Format and cache for session duration

**Truncation message**: If status exceeds 2k chars:

```
... (truncated because it exceeds 2k characters. If you need more information, run "git status" using BashTool)
```

Reasons for truncation:
- Prevent context bloat in large repos with many changes
- Reduce token usage
- Users can run `git status` manually if needed

### Example output

```
This is the git status at the start of the conversation. Note that this status is a snapshot in time, and will not update during the conversation.
Current branch: feature/docs
Main branch (you will usually use this for PRs): main
Git user: Alice Zenner
Status:
M docs/Sessions/README.md
 M src/context.ts
?? new-file.ts

Recent commits:
a1b2c3d Fix context caching
b2c3d4e Add session lifecycle docs
c3d4e5f Initial session system
```

### When git status is excluded

Git status is **not included** if:

- Working directory is not a git repo
- `shouldIncludeGitInstructions()` returns false (disabled via settings)
- `NODE_ENV === 'test'`
- Error occurs during git commands (logged, skipped gracefully)

## CLAUDE.md auto-discovery

At session start, Claude Code looks for `~/.claude/CLAUDE.md`:

1. Read file from user's home directory
2. Filter for potentially sensitive content (API keys, credentials)
3. Cache as string for conversation lifetime
4. Inject into system context on each turn

### Disabling auto-discovery

Auto-discovery is skipped if:

- `CLAUDE_CODE_DISABLE_CLAUDE_MDS` env var set
- `--bare` CLI flag passed
- File not readable (permission denied, not found)

## Per-conversation context caching

Context functions are **memoized** for the duration of a single conversation:

```
getSystemContext()  → cached
getUserContext()    → cached
```

**Memoization details**:
- Input: Current working directory (cwd)
- Output: Formatted system/user context strings
- Lifetime: Entire conversation (from session start to `/exit`)
- **Cache cleared on**: `setSystemPromptInjection()` called

Benefits:
- Avoid re-reading CLAUDE.md on every turn
- Avoid re-running git commands repeatedly
- Consistent context across turns

### Cache invalidation

Manually clear context cache:

```
setSystemPromptInjection(value)  // Clears both caches
```

This is used internally for ephemeral debugging state (ant-only feature).

## Context includes

Each turn's system prompt includes (in order):

1. Model instructions (from Claude Code)
2. Git status (if in repo and enabled)
3. CLAUDE.md contents (if found and not disabled)
4. Recent commands/hooks context
5. Session-specific instructions (e.g., `--bare` mode disables #2 and #3)

Total size before compaction: typically 1–5k tokens.

---

[← Back to Sessions/README.md](./README.md)
