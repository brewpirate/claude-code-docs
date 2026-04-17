# Claude Code Built-in Slash Commands

> **New here?** You don't need to know all 97 commands. The ★ markers below highlight the 15 commands you'll use most often as a junior developer. Start with `/help`, `/config`, and `/clear`.

Per-section reference for every built-in slash command dispatched by the Claude Code CLI.

## Table of Contents

1. [How slash commands work](./how-slash-commands-work.md)
2. [Session Management](./session-management.md)
3. [Memory & Context](./memory-context.md)
4. [Account & Subscription](./account-subscription.md)
5. [Plugins, Permissions, Hooks, MCP, Skills](./plugins-permissions-hooks-mcp-skills.md)
6. [IDE & Integrations](./ide-integrations.md)
7. [Diagnostics & Health](./diagnostics-health.md)
8. [Team, Scheduling, Multi-Agent](./team-scheduling-multi-agent.md)
9. [Help & Miscellaneous](./help-miscellaneous.md)
10. [Removed / Deprecated Commands](./removed-deprecated-commands.md)
11. [Additional / Undocumented Commands](./additional-undocumented-commands.md)
12. [Experimental / Unreleased / Feature-Flag-Gated Commands](./experimental-unreleased-feature-flag-gated-commands.md)
13. [Discrepancies and Gaps](./discrepancies-and-gaps.md)
14. [Notes on Sourcing](./notes-on-sourcing.md)

## Overview

**14 sections**, **97 command entries** across documented, internal, experimental, and tombstoned commands.

| # | Section | Description | Entries |
|---|---------|-------------|---------|
| 1 | [How slash commands work](./how-slash-commands-work.md) | Dispatch model, aliases, env-var disablers, provider/plan/feature-flag gating, and the [Skill] marker. | narrative |
| 2 | [Session Management](./session-management.md) | Conversation control — clear, compact, resume, branch, model, effort, plan, tui, theme, copy, export, etc. | 21 commands |
| 3 | [Memory & Context](./memory-context.md) | `/init`, `/memory`, `/context` — read/write CLAUDE.md and visualize context usage. | 3 commands |
| 4 | [Account & Subscription](./account-subscription.md) | Login/logout, upgrade, usage, passes, privacy, mobile, stickers, setup-bedrock/vertex, web-setup. | 12 commands |
| 5 | [Plugins, Permissions, Hooks, MCP, Skills](./plugins-permissions-hooks-mcp-skills.md) | `/mcp`, `/plugin`, `/reload-plugins`, `/hooks`, `/permissions`, `/skills`, `/less-permission-prompts`. | 7 commands |
| 6 | [IDE & Integrations](./ide-integrations.md) | IDE, Chrome, Desktop, terminal setup, remote control/env, teleport, voice, diff, autofix-pr, GitHub/Slack apps, review, ultrareview. | 15 commands |
| 7 | [Diagnostics & Health](./diagnostics-health.md) | `/doctor`, `/status`, `/heapdump`, `/insights`, `/stats`, `/release-notes`, `/security-review`, `/cost`, `/debug`, `/simplify`. | 11 commands |
| 8 | [Team, Scheduling, Multi-Agent](./team-scheduling-multi-agent.md) | `/schedule`, `/tasks`, `/team-onboarding`, `/ultraplan`, `/batch`, `/loop` — cross-session coordination primitives. | 6 commands |
| 9 | [Help & Miscellaneous](./help-miscellaneous.md) | `/help`, `/powerup`, `/feedback`, `/config`, `/claude-api`. | 6 commands |
| 10 | [Removed / Deprecated Commands](./removed-deprecated-commands.md) | Tombstoned commands like `/vim` (→ v2.1.92) and `/pr-comments` (→ v2.1.91) with replacement guidance. | 2 commands |
| 11 | [Additional / Undocumented Commands](./additional-undocumented-commands.md) | Source-tree commands NOT on the public commands page — includes ant-only developer tools, experimental git workflows, remote/bridge primitives, and disabled stubs. | 12 commands |
| 12 | [Experimental / Unreleased / Feature-Flag-Gated Commands](./experimental-unreleased-feature-flag-gated-commands.md) | Commands gated by env flags (`CLAUDE_CODE_TEAM_ONBOARDING`, `CLAUDE_CODE_ENABLE_TASKS`, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`, `CLAUDE_CODE_ENABLE_CFC`). | 2 commands |
| 13 | [Discrepancies and Gaps](./discrepancies-and-gaps.md) | 10 known mismatches between env vars, public docs, and source — naming collisions, dual-gate patterns, tombstones. | narrative |
| 14 | [Notes on Sourcing](./notes-on-sourcing.md) | Provenance of each section — which data came from official docs vs source tree vs community citations. | narrative |

## Quick reference — documented commands

★ = commonly used by junior developers; start with these

| Command | Aliases | Category | Arguments | Disabler env var | Gating/condition |
|---------|---------|----------|-----------|------------------|------------------|
| `/add-dir` | — | Session Management | `<path>` | — | — |
| `/agents` | — | Session Management | none | — | — |
| `/autofix-pr` | — | IDE/GitHub | `[prompt]` | — | Requires `gh` CLI and Claude Code web access |
| `/batch` | — | Session Management [Skill] | `<instruction>` | — | Requires git repository |
| `/branch` | `/fork` | Session Management | `[name]` | — | — |
| `/btw` | — | Session Management | `<question>` | — | — |
| `/chrome` | — | IDE | none | — | — |
| `/claude-api` | — | Session Management [Skill] | none | `CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL` | Auto-activates with `anthropic` or `@anthropic-ai/sdk` imports |
| `/clear` ★ | `/reset`, `/new` | Session Management | none | — | — |
| `/color` | — | Session Management | `[color\|default]` | — | Colors: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan` |
| `/compact` | — | Session Management | `[instructions]` | `DISABLE_COMPACT` | — |
| `/config` ★ | `/settings` | Session Management | none | — | — |
| `/context` | — | Memory/Context | none | — | — |
| `/copy` | — | Session Management | `[N]` | — | — |
| `/cost` ★ | — | Diagnostics | none | — | — |
| `/debug` | — | Diagnostics [Skill] | `[description]` | — | Requires `claude --debug` flag or manual activation |
| `/desktop` | `/app` | IDE | none | — | macOS and Windows only |
| `/diff` | — | IDE | none | — | — |
| `/doctor` | — | Diagnostics | none | `DISABLE_DOCTOR_COMMAND` | — |
| `/effort` | — | Session Management | `[level\|auto]` | `CLAUDE_CODE_DISABLE_FAST_MODE` | Levels: `low`, `medium`, `high`, `xhigh`, `max`, `auto` |
| `/exit` ★ | `/quit` | Session Management | none | — | — |
| `/export` | — | Session Management | `[filename]` | — | — |
| `/extra-usage` | — | Account | none | — | — |
| `/fast` | — | Session Management | `[on\|off]` | `CLAUDE_CODE_DISABLE_FAST_MODE` | — |
| `/feedback` ★ | `/bug` | Help | `[report]` | `DISABLE_FEEDBACK_COMMAND`, `DISABLE_BUG_COMMAND` | — |
| `/focus` | — | Session Management | none | — | Fullscreen rendering only |
| `/heapdump` | — | Diagnostics | none | — | — |
| `/help` ★ | — | Help | none | — | — |
| `/hooks` | — | Plugin Mgmt | none | — | — |
| `/ide` | — | IDE | none | — | — |
| `/init` ★ | — | Memory/Context | none | — | Set `CLAUDE_CODE_NEW_INIT=1` for interactive flow |
| `/insights` | — | Diagnostics | none | — | — |
| `/install-github-app` | — | IDE/GitHub | none | `DISABLE_INSTALL_GITHUB_APP_COMMAND` | — |
| `/install-slack-app` | — | IDE/Integrations | none | — | — |
| `/keybindings` | — | IDE | none | — | — |
| `/less-permission-prompts` | — | Plugin Mgmt [Skill] | none | — | — |
| `/login` | — | Account | none | `DISABLE_LOGIN_COMMAND` | — |
| `/logout` | — | Account | none | `DISABLE_LOGOUT_COMMAND` | — |
| `/loop` | `/proactive` | Session Management [Skill] | `[interval] [prompt]` | — | — |
| `/mcp` | — | Plugin Mgmt | none | — | — |
| `/memory` ★ | — | Memory/Context | none | `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Disabler only affects auto-memory, not the command |
| `/mobile` | `/ios`, `/android` | Account | none | — | — |
| `/model` ★ | — | Session Management | `[model]` | — | — |
| `/passes` | — | Account | none | — | Only visible if account is eligible |
| `/permissions` ★ | `/allowed-tools` | Plugin Mgmt | none | — | — |
| `/plan` | — | Session Management | `[description]` | — | — |
| `/plugin` | — | Plugin Mgmt | none | — | — |
| `/powerup` | — | Help | none | — | — |
| `/privacy-settings` | — | Account | none | — | Pro and Max only |
| `/recap` | — | Session Management | none | — | — |
| `/release-notes` | — | Help | none | — | — |
| `/reload-plugins` | — | Plugin Mgmt | none | — | — |
| `/remote-control` | `/rc` | IDE | none | — | — |
| `/remote-env` | — | IDE | none | — | — |
| `/rename` | — | Session Management | `[name]` | — | — |
| `/resume` ★ | `/continue` | Session Management | `[session]` | — | — |
| `/review` | — | IDE | `[PR]` | — | — |
| `/rewind` ★ | `/checkpoint`, `/undo` | Session Management | none | `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING` | Disabler affects checkpointing feature |
| `/sandbox` | — | Session Management | none | — | Supported platforms only |
| `/schedule` | `/routines` | Team | `[description]` | — | — |
| `/security-review` | — | Diagnostics | none | — | — |
| `/setup-bedrock` | — | Account | none | — | Only visible with `CLAUDE_CODE_USE_BEDROCK=1` |
| `/setup-vertex` | — | Account | none | — | Only visible with `CLAUDE_CODE_USE_VERTEX=1` |
| `/simplify` | — | Diagnostics [Skill] | `[focus]` | — | — |
| `/skills` ★ | — | Help | none | — | Press `t` to sort by token count |
| `/stats` | — | Diagnostics | none | — | — |
| `/status` | — | Diagnostics | none | — | Works while Claude is responding |
| `/statusline` | — | IDE | none | — | — |
| `/stickers` | — | Account | none | — | — |
| `/tasks` | `/bashes` | Team | none | `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | Full system gated by `CLAUDE_CODE_ENABLE_TASKS` |
| `/team-onboarding` | — | Team | none | — | Requires `CLAUDE_CODE_TEAM_ONBOARDING` + `tengu_flint_harbor` flag |
| `/teleport` | `/tp` | IDE | none | — | Requires claude.ai subscription |
| `/terminal-setup` | — | IDE | none | — | VS Code, Alacritty, Warp only |
| `/theme` | — | Session Management | none | — | — |
| `/tui` | — | IDE | `[default\|fullscreen]` | — | — |
| `/ultraplan` | — | Team | `<prompt>` | — | — |
| `/ultrareview` | — | Diagnostics | `[PR]` | — | 3 free runs on Pro/Max, then requires extra usage |
| `/upgrade` | — | Account | none | `DISABLE_UPGRADE_COMMAND` | Only visible on Pro and Max plans |
| `/usage` | — | Account | none | `DISABLE_EXTRA_USAGE_COMMAND` | Note: env var name mismatch (see [Discrepancies and Gaps](./discrepancies-and-gaps.md)) |
| `/voice` | — | IDE | none | — | Requires Claude.ai account |
| `/web-setup` | — | Account | none | — | — |

## See Also

- [../Skills/README.md](../Skills/README.md) — companion reference for bundled skills (many slash commands are `[Skill]`-backed).
- [../Tools/README.md](../Tools/README.md) — companion reference for built-in tools.
- [../ENV/README.md](../ENV/README.md) — environment variables (many commands have `DISABLE_*_COMMAND` env-var disablers).
- [../Settings/README.md](../Settings/README.md) — settings.json reference.
- Official docs: <https://code.claude.com/docs/en/commands>
