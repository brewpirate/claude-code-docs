---
title: "Removed / Deprecated Commands"
tags: [cli]
---


The following commands have been removed from Claude Code and are no longer available. If you are on an older version, they may still work; upgrade to the latest version to use the replacements.

### `/vim`
- **Status:** Deprecated (v2.1.92) — **still registered** in the command table and loadable.
- **Replacement:** Use `/config` → Editor mode to toggle between Vim and Normal editing modes.
- **Notes:** The Vim toggle was moved into the Settings interface for better UX, but the command itself was not removed — `commands/vim/index.ts` is still imported and registered in `commands.ts`. Existing muscle memory continues to work; new docs and prompts should point users to `/config`.

### `/pr-comments`
- **Removed in:** v2.1.91
- **Replacement:** Ask Claude directly to view pull request comments instead.
- **Notes:** Consolidated into natural conversation flow.

---

[← Back to Commands/README.md](/claude-code-docs/cli/overview/)
