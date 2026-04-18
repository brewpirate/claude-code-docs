# Feature Gates Guide

Some Claude Code features exist in the software but are turned off by default. They require an environment variable, a Statsig flag (enabled by Anthropic on your account), or a specific plan tier to activate. These are called **feature gates**.

This guide covers the gates most likely to affect you as you explore Claude Code. You don't need to understand all of them — most are for enterprise deployments or experimental research features.

---

## Types of feature gates

| Gate type | Example | How it's activated | Can you set it? |
|-----------|---------|-------------------|-----------------|
| **Environment variable** | `CLAUDE_CODE_ENABLE_TASKS=1` | Set it in your shell | Yes |
| **Statsig flag** | `tengu_session_memory` | Enabled by Anthropic on your account | No |
| **Plan tier** | Max plan required | Upgrade your subscription | Yes, via your account |
| **Dual-gate** | `/team-onboarding` | Requires both an env var AND a Statsig flag | Partially — you set the env var, Anthropic sets the flag |

> **Important about `tengu_*` flags:** These are internal Statsig identifiers. You cannot set them yourself — they are enabled by Anthropic on your account or team. If docs mention a `tengu_*` flag, it means the feature is controlled by Anthropic's rollout system, not by your configuration.

---

## Feature gates relevant to junior developers

| Feature | How to Enable | What It Does | Notes |
|---------|--------------|-------------|-------|
| **Persistent tasks** | `CLAUDE_CODE_ENABLE_TASKS=1` | Enables a task coordination system that persists across sessions | Behavior differs significantly from basic `/tasks` command — read [Commands/discrepancies-and-gaps.md](../Commands/discrepancies-and-gaps.md) item 10 before enabling |
| **Agent teams** | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | Enables `TeamCreate`/`TeamDelete` tools for coordinating groups of agents | Experimental — API subject to change |
| **Coordinator mode** | `CLAUDE_CODE_COORDINATOR_MODE=1` | Enables full multi-agent orchestration mode | Changes Claude's entire workflow — read [Coordinator/README.md](../Coordinator/README.md) first |
| **Session memory** | `tengu_session_memory` (Statsig — Anthropic enables) | Background subagent extracts key notes from your session into `~/.claude/sessionMemory.md` | Enabled on some accounts automatically; you can disable with `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` |
| **Scratchpad** | `tengu_scratch` (Statsig — Anthropic enables) | Enables `.claude/scratchpad/` shared directory between agents | Useful for multi-agent workflows; not available to all accounts |
| **Team onboarding** | `CLAUDE_CODE_TEAM_ONBOARDING=1` **AND** `tengu_flint_harbor` (Statsig) | Enables `/team-onboarding` command | Dual-gate — both required; the Statsig flag cannot be set by you |
| **Loop skill** | `CLAUDE_CODE_ENABLE_LOOP=1` | Enables `/loop` command for recurring scheduled prompts | Also requires the `loop` skill to be present |
| **CFC** | `CLAUDE_CODE_ENABLE_CFC=1` | Unknown purpose | This env var exists in the source but its command surface is undocumented — see [Commands/discrepancies-and-gaps.md](../Commands/discrepancies-and-gaps.md) |

---

## How to set environment variables

You can set these in your shell session, or add them to a `.env` file if your setup supports it:

```bash
# In your shell (lasts for this terminal session)
export CLAUDE_CODE_ENABLE_TASKS=1
claude

# Or when starting Claude directly
CLAUDE_CODE_ENABLE_TASKS=1 claude
```

For persistent configuration, add to your shell profile (`~/.bashrc`, `~/.zshrc`):

```bash
export CLAUDE_CODE_ENABLE_TASKS=1
```

---

## Feature disable flags

Some features are on by default and can be turned off:

| Flag | What it disables |
|------|-----------------|
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` | Turns off automatic memory extraction (privacy) |
| `CLAUDE_CODE_DISABLE_TELEMETRY=1` | Disables usage telemetry |
| `DISABLE_<COMMAND>_COMMAND=1` | Disables a specific slash command (e.g., `DISABLE_FEEDBACK_COMMAND=1`) |

---

## Before enabling experimental features

A few things to know:

1. **Read the discrepancies doc first** — [Commands/discrepancies-and-gaps.md](../Commands/discrepancies-and-gaps.md) documents known gaps between env-var-gated features and their public docs. Item 10 (the `/tasks` system) is especially important.

2. **Experimental features can change behavior significantly** — `CLAUDE_CODE_COORDINATOR_MODE` doesn't just add new tools; it changes how Claude orchestrates work entirely. Don't enable it during a critical session without understanding what it does.

3. **Some gates require multiple conditions** — the `/team-onboarding` command requires both an env var *and* a Statsig flag. If only one is set, the command won't appear or won't work.

4. **Statsig flags are not documented in advance** — `tengu_*` flags may appear in docs or source before they're rolled out to your account. If a feature sounds like it should work but doesn't, the Statsig flag may not be enabled for you.

---

## See also

- [ENV/feature-disable-flags.md](../ENV/feature-disable-flags.md) — full list of disable flags
- [Commands/experimental-unreleased-feature-flag-gated-commands.md](../Commands/experimental-unreleased-feature-flag-gated-commands.md) — gated slash commands
- [Commands/discrepancies-and-gaps.md](../Commands/discrepancies-and-gaps.md) — known issues with gated features
- [ENV/README.md](../ENV/README.md) — all environment variables

---

[← Back to GettingStarted/README.md](./README.md)
