---
title: "Experimental / Unreleased / Feature-Flag-Gated Commands"
---

# Experimental / Unreleased / Feature-Flag-Gated Commands


The following commands or systems are experimental, feature-flag gated, or have dual-gate requirements. They may change or be removed without notice. The dual-gate patterns (env var + internal feature flag) make them visible in public docs but unavailable in most sessions.

### `/team-onboarding` (dual-gated)
- **Feature flags:** `CLAUDE_CODE_TEAM_ONBOARDING` (env var); `tengu_flint_harbor` (internal Statsig flag)
- **Status:** Documented in public commands table but requires both gatekeepers. Users may see it in docs but not in their session.
- **What it does:** Generate a team onboarding guide from your Claude Code usage history. Claude analyzes your sessions, commands, and MCP server usage from the past 30 days and produces a markdown guide a teammate can paste as a first message to get set up quickly.

### `/tasks` (full persistent system)
- **Feature flag:** `CLAUDE_CODE_ENABLE_TASKS`
- **Status:** Beta (v2.1.16, January 2026). The basic `/tasks` command is now public; the full persistent task-tracking system with cross-session coordination via `CLAUDE_CODE_TASK_LIST_ID` is gated.
- **What it does:** Extended task tracking system with durable persistent tasks visible across agent teams. Setting `CLAUDE_CODE_TASK_LIST_ID` allows multiple Claude instances to coordinate on the same task list. The basic listing command is public; the full cross-session shared list requires the flag.
- **Note:** There is no separate `/bashes` command; `/bashes` is an alias for `/tasks`.

### Agent Teams (no dedicated slash command)
- **Feature flag:** `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`
- **Status:** Experimental. Orchestrates multiple Claude Code sessions as a coordinated team. Not exposed as a dedicated `/teams` slash command; coordinated through existing `/agents` + task list infrastructure.
- **What it does:** Enables one session to act as team lead while other sessions work independently in parallel on shared tasks.

### CFC Feature (undocumented)
- **Feature flag:** `CLAUDE_CODE_ENABLE_CFC`
- **Status:** Internal / unreleased. No public documentation or associated slash command found.
- **What it does:** Unknown. The acronym appears only in ENV.md; no public source material explains the feature or interface.

---

[← Back to Commands/README.md](/claude-code-docs/cli/overview/)
