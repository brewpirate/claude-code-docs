---
title: "Startup Recovery"
tags: [cli]
---

Release notes caching and terminal backup restoration on launch.

## Release notes cache

Claude Code fetches the changelog from GitHub and caches it locally to display on next launch.

### Flow

1. **On startup**: Check for cached changelog at `~/.claude/cache/changelog.md`
2. **If missing or old**: Fetch from GitHub at startup (background, non-blocking)
3. **Display**: Show "What's new" on next launch
4. **Cache**: Store to `~/.claude/cache/changelog.md` for future launches

### Configuration

Cached changelog location: `~/.claude/cache/changelog.md`

- **Auto-fetched**: On startup if missing
- **TTL**: Not version-locked; refreshed periodically via background fetch
- **Disabled**: If network unreachable or GitHub endpoint unavailable, displays stale cache or skips

### Content

Changelog typically includes:

- Latest Claude Code version features
- Bug fixes
- Breaking changes
- Upgrade notes

Displayed in terminal after session start if new content available.

## Terminal backup recovery

Claude Code can auto-detect and restore terminal settings if a previous session's terminal setup was interrupted.

### Supported terminals

- **macOS**: iTerm2, Terminal.app
- **Linux**: tmux (via `tmuxSocket.ts`)

### Backup location

`~/.claude/backups/`

Contents:
- Terminal state files (window size, colors, font settings)
- Session configuration

### Recovery process

On startup, Claude Code:

1. **Detects previous terminal setup** in `~/.claude/backups/`
2. **Checks for incomplete shutdown** (e.g., process killed, terminal crash)
3. **Restores settings** if recovery is safe:
   - Window size
   - Font/color scheme
   - Active pane/window layout

### Disabling recovery

Recovery runs automatically. To disable:

- Delete backup files: `rm -rf ~/.claude/backups/*`
- Or set env var (if implemented): `CLAUDE_CODE_SKIP_TERMINAL_RECOVERY=1`

### Backup retention

Backups are created on each session start and pruned periodically:

- Keep: Most recent 5–10 backups
- Delete: Backups >30 days old

Automatic cleanup runs at startup to avoid accumulating old backups.

---

[← Back to Sessions/README.md](/claude-code-docs/sessions/overview/)
