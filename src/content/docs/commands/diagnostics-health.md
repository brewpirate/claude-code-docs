---
title: "Diagnostics & Health"
tags: [cli]
---


### `/cost`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Show token usage statistics. See cost tracking guide for subscription-specific details" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/cost`
- **Notes:** Displays real-time token usage and estimated costs.

### `/debug`
- **Aliases:** none
- **Arguments:** `[description]` (optional)
- **Type:** [Skill]
- **Disabled by:** —
- **Gating:** —
- **Description:** "**[Skill].** Enable debug logging for the current session and troubleshoot issues by reading the session debug log. Debug logging is off by default unless you started with `claude --debug`, so running `/debug` mid-session starts capturing logs from that point forward. Optionally describe the issue to focus the analysis" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/debug` or `/debug slowness in token counting`
- **Notes:** Useful for diagnosing CLI issues. Logs are written to the debug directory.

### `/doctor`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `DISABLE_DOCTOR_COMMAND`
- **Gating:** —
- **Description:** "Diagnose and verify your Claude Code installation and settings. Results show with status icons. Press `f` to have Claude fix any reported issues" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/doctor`
- **Notes:** Checks for common configuration problems, missing tools, and incompatibilities.

### `/heapdump`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Write a JavaScript heap snapshot and a memory breakdown to `~/Desktop` for diagnosing high memory usage." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/heapdump`
- **Notes:** Creates diagnostic files on the Desktop; useful for reporting memory issues.

### `/insights`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Generate a report analyzing your Claude Code sessions, including project areas, interaction patterns, and friction points" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/insights`
- **Notes:** Provides analytics and recommendations for improving your workflow.

### `/release-notes`
- **Aliases:** none
- **Arguments:** none (opens interactive version picker)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "View the changelog in an interactive version picker. Select a specific version to see its release notes, or choose to show all versions" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/release-notes`
- **Notes:** Browse release notes for all Claude Code versions.

### `/security-review`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Analyze pending changes on the current branch for security vulnerabilities. Reviews the git diff and identifies risks like injection, auth issues, and data exposure" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/security-review`
- **Notes:** Scans uncommitted changes for common security issues.

### `/simplify`
- **Aliases:** none
- **Arguments:** `[focus]` (optional)
- **Type:** [Skill]
- **Disabled by:** —
- **Gating:** —
- **Description:** "**[Skill].** Review your recently changed files for code reuse, quality, and efficiency issues, then fix them. Spawns three review agents in parallel, aggregates their findings, and applies fixes. Pass text to focus on specific concerns" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/simplify` or `/simplify focus on memory efficiency`
- **Notes:** Runs parallel agents for comprehensive code quality review.

### `/stats`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Visualize daily usage, session history, streaks, and model preferences" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/stats`
- **Notes:** Shows historical usage patterns and trends.

### `/status`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Open the Settings interface (Status tab) showing version, model, account, and connectivity. Works while Claude is responding, without waiting for the current response to finish" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/status`
- **Notes:** Can be invoked while Claude is thinking or responding.

### `/ultrareview`
- **Aliases:** none
- **Arguments:** `[PR]` (optional)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Includes 3 free runs on Pro and Max, then requires extra usage
- **Description:** "Run a deep, multi-agent code review in a cloud sandbox with ultrareview. Includes 3 free runs on Pro and Max, then requires extra usage" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/ultrareview` or `/ultrareview 42`
- **Notes:** More thorough than `/review`; uses multiple agents and costs extra tokens.

---

[← Back to Commands/README.md](/claude-code-docs/cli/overview/)
