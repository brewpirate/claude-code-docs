---
title: "Memory & Context"
tags: [cli]
---


### `/context`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Visualize current context usage as a colored grid. Shows optimization suggestions for context-heavy tools, memory bloat, and capacity warnings" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/context`
- **Notes:** Helps diagnose when you're approaching token limits. Shows per-tool breakdowns.

### `/init`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Set `CLAUDE_CODE_NEW_INIT=1` for interactive multi-phase flow
- **Description:** "Initialize project with a `CLAUDE.md` guide. Set `CLAUDE_CODE_NEW_INIT=1` for an interactive flow that also walks through skills, hooks, and personal memory files. Claude analyzes your codebase and creates a file with build commands, test instructions, and project conventions it discovers. If a CLAUDE.md already exists, `/init` suggests improvements rather than overwriting it." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/init`
- **Notes:** Auto-discovers build systems, test runners, and project structure. Safe to run repeatedly.

### `/memory`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `CLAUDE_CODE_DISABLE_AUTO_MEMORY` (disables auto-memory, not the command)
- **Gating:** —
- **Description:** "Edit `CLAUDE.md` memory files, enable or disable auto-memory, and view auto-memory entries. The `/memory` command lists all CLAUDE.md, CLAUDE.local.md, and rules files loaded in your current session, lets you toggle auto memory on or off, and provides a link to open the auto memory folder." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/memory`
- **Notes:** Auto-memory learns patterns from your sessions and creates memory files automatically.

---

[← Back to Commands/README.md](/claude-code-docs/cli/overview/)
