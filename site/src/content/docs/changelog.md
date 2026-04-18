---
title: "Changelog"
description: "Claude Code version history"
---

# Changelog

The Claude Code changelog tracks new features, bug fixes, and breaking changes across releases.

---

## Canonical sources

| Source | URL | Best for |
|--------|-----|---------|
| Official changelog | [https://code.claude.com/docs/en/changelog](https://code.claude.com/docs/en/changelog) | Full release notes with descriptions |
| RSS feed | [https://code.claude.com/docs/en/changelog/rss.xml](https://code.claude.com/docs/en/changelog/rss.xml) | Subscribe to updates |
| GitHub CHANGELOG.md | [https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) | Raw changelog file, good for diffing |

---

## Silent model migrations

Claude Code occasionally migrates sessions to newer models automatically, without a visible notification. Known migrations:

- **Fennec → Opus** — internal alias `fennec` was remapped to Opus
- **Sonnet 4.5 → 4.6** — sessions using `sonnet` alias were upgraded in-place

If you notice different behavior after an update and haven't changed your config, a silent model migration may be the cause. Check your `ANTHROPIC_MODEL` env var or `model` setting in `settings.json` to pin a specific model version.

To pin a model:
```bash
export ANTHROPIC_MODEL=claude-sonnet-4-6
```

Or in `.claude/settings.json`:
```json
{
  "model": "claude-sonnet-4-6"
}
```

Use full model IDs (not aliases like `sonnet`) to avoid being affected by future alias remappings.

---

## Tombstoned commands

Some slash commands have been removed in past releases. They are kept in the docs as "tombstones" so you know they're gone:

| Command | Removed in | Notes |
|---------|-----------|-------|
| `/vim` | v2.1.92 | Removed entirely |
| `/pr-comments` | v2.1.91 | Removed entirely |

If you see references to these commands in older docs or examples, they no longer exist.

---

## This documentation

This local reference covers Claude Code CLI v2.1.x. It is a snapshot — not updated in real time. For the most current information, consult the official changelog linked above.

---

[← Back to docs/README.md](/claude-code-docs//overview/)
