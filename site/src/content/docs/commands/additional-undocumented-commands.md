---
title: "Additional / Undocumented Commands"
tags: [cli]
---

# Additional / Undocumented Commands


The following commands exist as source files in the Claude Code distribution (`commands/` directory, inspected from `claude-code-main/commands/`) but are NOT listed in the public commands reference at `https://code.claude.com/docs/en/commands`. They may be internal tooling, experimental features, plugin-only commands, developer utilities, or early-access features. Purpose is inferred from reading the source — behavior may differ from what's described here.

### Internal / Developer-Only Commands

#### `/advisor`
- **Source file:** `claude-code-main/commands/advisor.ts`
- **Status:** Internal (gated)
- **Inferred purpose:** Configure a separate advisor model to provide real-time suggestions alongside the main conversation model. The command allows enabling, disabling, and changing the advisor model via `set`, `unset`, or model name arguments.
- **Notes:** Only enabled if the base model supports advisors. Stored in app state and persisted via `userSettings`.

#### `/files`
- **Source file:** `claude-code-main/commands/files/index.ts`
- **Status:** Developer/internal
- **Inferred purpose:** List all files currently in context during the session. Output is non-interactive-compatible.
- **Notes:** Only enabled when `USER_TYPE === 'ant'` (internal/ant developers).

#### `/tag`
- **Source file:** `claude-code-main/commands/tag/index.ts`
- **Status:** Developer/internal
- **Inferred purpose:** Toggle a searchable tag on the current session for internal analytics and session organization.
- **Notes:** Only enabled when `USER_TYPE === 'ant'`. Accepts a required tag-name argument.

### Git & Commit Workflows

#### `/commit`
- **Source file:** `claude-code-main/commands/commit.ts`
- **Status:** Experimental
- **Inferred purpose:** Create a git commit with Claude's assistance. The command provides a prompt-based workflow that reviews staged changes, drafts a commit message following repo conventions, and stages/commits files.
- **Notes:** Restricted tools: `git add`, `git status`, `git commit`. Never amends commits unless explicitly requested. Does not allow `-i` flags. Includes undercover mode support (`USER_TYPE === 'ant'` + `isUndercover()`).

#### `/commit-push-pr`
- **Source file:** `claude-code-main/commands/commit-push-pr.ts`
- **Status:** Experimental
- **Inferred purpose:** Full workflow to commit changes, push a branch, and create/update a pull request. Supports changelog sections, reviewer assignment, and optional Slack notifications via ToolSearch.
- **Notes:** Restricted tools include git, gh CLI, and optional Slack integration. Includes special handling for internal Anthropic workflows (`USER_TYPE === 'ant'`).

### Remote & Bridge Commands

#### `/session` (alias: `/remote`)
- **Source file:** `claude-code-main/commands/session/index.ts`
- **Status:** Remote-mode only
- **Inferred purpose:** Show the remote session URL and QR code for connecting to a remotely-spawned Claude Code session.
- **Notes:** Only enabled when `getIsRemoteMode()` is true. Probably only relevant to Claude Code on the web.

#### `/output-style` (deprecated)
- **Source file:** `claude-code-main/commands/output-style/index.ts`
- **Status:** Deprecated
- **Inferred purpose:** Originally a command to change output style, now deprecated in favor of `/config`.
- **Notes:** Hidden from help. The description reads "Deprecated: use /config to change output style."

#### `/web-setup`
- **Source file:** `claude-code-main/commands/remote-setup/index.ts`
- **Status:** Experimental (feature flag gated)
- **Inferred purpose:** Setup Claude Code on the web and connect GitHub account for web-based session features like `/schedule` and `/ultraplan`.
- **Notes:** Gated by `tengu_cobalt_lantern` feature flag and `allow_remote_sessions` policy check.

### Feature-Flag-Gated / Experimental Commands

#### `/brief`
- **Source file:** `claude-code-main/commands/brief.ts`
- **Status:** Experimental (feature flag gated)
- **Inferred purpose:** Toggle brief-only mode, which appears to be related to the Kairos brief system. Likely limits responses to brief/concise mode.
- **Notes:** Gated by `tengu_kairos_brief_config` feature flag. The flag controls slash-command visibility, not a kill switch. Only enabled if `feature('KAIROS')` or `feature('KAIROS_BRIEF')` is true.

#### `/thinkback` (officially: `/think-back`)
- **Source file:** `claude-code-main/commands/thinkback/index.ts`
- **Status:** Seasonal / experimental (feature flag gated)
- **Inferred purpose:** Generate a "2025 Claude Code Year in Review" based on session history, usage patterns, and interaction analytics.
- **Notes:** Gated by `tengu_thinkback` Statsig feature flag. Appears to be a seasonal/limited-time feature.

#### `/rate-limit-options`
- **Source file:** `claude-code-main/commands/rate-limit-options/index.ts`
- **Status:** Internal / debug
- **Inferred purpose:** Show available options when a rate limit is reached, likely used internally to present upgrade or extra-usage options.
- **Notes:** Hidden from help (`isHidden: true`). Only enabled for Claude AI subscribers (`isClaudeAISubscriber()`). Not intended for direct user invocation.

### Likely Removed / Disabled Commands (Stubs)

The following commands exist in the source tree but are currently **disabled as stubs** (return `{ isEnabled: () => false, isHidden: true, name: 'stub' }`). They are not accessible in normal operation:

- **`/ant-trace`** (`ant-trace/index.js`) — Purpose unclear; likely internal tracing/debugging
- **`/break-cache`** (`break-cache/index.js`) — Possibly cache invalidation; currently disabled
- **`/bughunter`** (`bughunter/index.js`) — Likely a debug/diagnostics tool; currently disabled
- **`/ctx-viz`** (`ctx_viz/index.js`) — Possibly context visualization; currently disabled
- **`/debug-tool-call`** (`debug-tool-call/index.js`) — Tool call debugging; currently disabled
- **`/env`** (`env/index.js`) — Environment variable inspection; currently disabled
- **`/good-claude`** (`good-claude/index.js`) — Purpose unclear; currently disabled
- **`/issue`** (`issue/index.js`) — Possibly GitHub issue creation; currently disabled
- **`/mock-limits`** (`mock-limits/index.js`) — Likely testing/development tool for limit simulation
- **`/oauth-refresh`** (`oauth-refresh/index.js`) — OAuth token refresh; currently disabled
- **`/onboarding`** (`onboarding/index.js`) — Onboarding flow; currently disabled (see `/team-onboarding` for documented alternative)
- **`/perf-issue`** (`perf-issue/index.js`) — Performance issue reporting; currently disabled
- **`/summary`** (`summary/index.js`) — Possibly session summary; currently disabled
- **`/reset-limits`** (`reset-limits/index.js`) — Testing/reset tool; currently disabled

### Moved to Plugin System

#### `/pr-comments` (moved to plugin)
- **Source file:** `claude-code-main/commands/pr_comments/index.ts`
- **Status:** Moved to plugin
- **Inferred purpose:** Fetch and display comments from a GitHub pull request, including both PR-level and code review comments with context.
- **Notes:** This command is no longer a built-in slash command; it is now available as a plugin via the `pr-comments` plugin in the marketplace. The source file creates a redirect using `createMovedToPluginCommand()`, which shows a prompt-based fallback while the marketplace is private.

### Notes on Removed Commands

The `/vim` command still exists in the source (`vim/index.ts`, `vim/vim.ts`) but is documented in the "Removed / Deprecated Commands" section as of v2.1.92. The source file still exports a valid command object and is not a stub, suggesting it may still work in older versions or for backward compatibility, but is no longer recommended. The replacement is to use `/config` → Editor mode.

---

[← Back to Commands/README.md](/claude-code-docs/cli/overview/)
