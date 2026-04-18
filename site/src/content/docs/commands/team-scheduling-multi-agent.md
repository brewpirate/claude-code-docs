---
title: "Team, Scheduling, Multi-Agent"
---

# Team, Scheduling, Multi-Agent


### `/batch`
- **Aliases:** none
- **Arguments:** `<instruction>` (required)
- **Type:** [Skill]
- **Disabled by:** —
- **Gating:** Requires git repository
- **Description:** "**[Skill].** Orchestrate large-scale changes across a codebase in parallel. Researches the codebase, decomposes the work into 5 to 30 independent units, and presents a plan. Once approved, spawns one background agent per unit in an isolated git worktree. Each agent implements its unit, runs tests, and opens a pull request. Requires a git repository." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/batch migrate src/ from Solid to React`
- **Notes:** Each unit runs in a separate worktree; changes are proposed as individual PRs.

### `/loop`
- **Aliases:** `/proactive`
- **Arguments:** `[interval] [prompt]` (both optional)
- **Type:** [Skill]
- **Disabled by:** —
- **Gating:** —
- **Description:** "**[Skill].** Run a prompt repeatedly while the session stays open. Omit the interval and Claude self-paces between iterations. Omit the prompt and Claude runs an autonomous maintenance check, or the prompt in `.claude/loop.md` if present." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/loop 5m check if the deploy finished` or `/loop`
- **Notes:** Useful for monitoring tasks and periodic checks.

### `/schedule`
- **Aliases:** `/routines`
- **Arguments:** `[description]` (optional)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Create, update, list, or run routines. Claude walks you through the setup conversationally." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/schedule deploy every weekday at 10am` or `/schedule`
- **Notes:** Schedules one-time or recurring tasks. Requires GitHub authentication via `/web-setup`.

### `/tasks`
- **Aliases:** `/bashes`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS`
- **Gating:** Full persistent system requires `CLAUDE_CODE_ENABLE_TASKS`
- **Description:** "List and manage background tasks. Also available as `/bashes`" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/tasks`
- **Notes:** Basic command lists background tasks. Full persistent task tracking requires the feature flag.

### `/team-onboarding`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Requires `CLAUDE_CODE_TEAM_ONBOARDING` env var + `tengu_flint_harbor` feature flag
- **Description:** "Generate a team onboarding guide from your Claude Code usage history. Claude analyzes your sessions, commands, and MCP server usage from the past 30 days and produces a markdown guide a teammate can paste as a first message to get set up quickly" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/team-onboarding`
- **Notes:** Requires dual gating; visible in docs but may not appear in your session.

### `/ultraplan`
- **Aliases:** none
- **Arguments:** `<prompt>` (required)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Draft a plan in an ultraplan session, review it in your browser, then execute remotely or send it back to your terminal" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/ultraplan refactor the authentication module`
- **Notes:** Opens a cloud session where you can review and refine the plan before executing.

---

[← Back to Commands/README.md](/claude-code-docs/cli/overview/)
