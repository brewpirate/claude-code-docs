# Claude Code Built-in Slash Commands

Slash commands are invoked with a leading `/` at the prompt and are dispatched by the CLI before your message reaches the model. Built-in commands are core to Claude Code's functionality, while some commands marked **[Skill]** are bundled prompt-based skills delivered alongside the CLI. Certain commands are only visible when specific conditions are met—such as environment variables, subscription tier, platform support, or experimental feature flags.

## How slash commands work

- **Dispatch timing**: Commands are processed by the CLI before your prompt is sent to the model, allowing them to modify session state, display information, or trigger actions without consuming context.
- **Aliases**: Many commands have shorter aliases (e.g., `/quit` → `/exit`, `/new` → `/clear`, `/rc` → `/remote-control`). Both forms work identically.
- **Environment variable disablers**: Some commands can be disabled via `DISABLE_*_COMMAND` env vars (e.g., `DISABLE_DOCTOR_COMMAND=1` hides `/doctor`). Check each command's entry for its disabler.
- **Provider gating**: Commands like `/setup-bedrock` and `/setup-vertex` require the corresponding provider env var set (`CLAUDE_CODE_USE_BEDROCK=1`, `CLAUDE_CODE_USE_VERTEX=1`) to appear.
- **Plan and tier restrictions**: Some commands are Pro/Max only (`/privacy-settings`, `/passes`, `/upgrade`). Others are free tier only. Subscription status is checked at runtime.
- **Experimental feature flags**: Commands like `/team-onboarding`, `/tasks` (with full persistence), and Agent Teams require `CLAUDE_CODE_*` feature flags or internal Statsig flags to activate.
- **[Skill] commands**: These are bundled prompt-based skills (e.g., `/batch`, `/loop`, `/debug`, `/simplify`, `/claude-api`, `/less-permission-prompts`) that behave like slash commands but are implemented in markdown, not in the CLI binary. They can be disabled, customized, or extended like any skill.

## Quick reference — documented commands

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
| `/clear` | `/reset`, `/new` | Session Management | none | — | — |
| `/color` | — | Session Management | `[color\|default]` | — | Colors: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan` |
| `/compact` | — | Session Management | `[instructions]` | `DISABLE_COMPACT` | — |
| `/config` | `/settings` | Session Management | none | — | — |
| `/context` | — | Memory/Context | none | — | — |
| `/copy` | — | Session Management | `[N]` | — | — |
| `/cost` | — | Diagnostics | none | — | — |
| `/debug` | — | Diagnostics [Skill] | `[description]` | — | Requires `claude --debug` flag or manual activation |
| `/desktop` | `/app` | IDE | none | — | macOS and Windows only |
| `/diff` | — | IDE | none | — | — |
| `/doctor` | — | Diagnostics | none | `DISABLE_DOCTOR_COMMAND` | — |
| `/effort` | — | Session Management | `[level\|auto]` | `CLAUDE_CODE_DISABLE_FAST_MODE` | Levels: `low`, `medium`, `high`, `xhigh`, `max`, `auto` |
| `/exit` | `/quit` | Session Management | none | — | — |
| `/export` | — | Session Management | `[filename]` | — | — |
| `/extra-usage` | — | Account | none | — | — |
| `/fast` | — | Session Management | `[on\|off]` | `CLAUDE_CODE_DISABLE_FAST_MODE` | — |
| `/feedback` | `/bug` | Help | `[report]` | `DISABLE_FEEDBACK_COMMAND`, `DISABLE_BUG_COMMAND` | — |
| `/focus` | — | Session Management | none | — | Fullscreen rendering only |
| `/heapdump` | — | Diagnostics | none | — | — |
| `/help` | — | Help | none | — | — |
| `/hooks` | — | Plugin Mgmt | none | — | — |
| `/ide` | — | IDE | none | — | — |
| `/init` | — | Memory/Context | none | — | Set `CLAUDE_CODE_NEW_INIT=1` for interactive flow |
| `/insights` | — | Diagnostics | none | — | — |
| `/install-github-app` | — | IDE/GitHub | none | `DISABLE_INSTALL_GITHUB_APP_COMMAND` | — |
| `/install-slack-app` | — | IDE/Integrations | none | — | — |
| `/keybindings` | — | IDE | none | — | — |
| `/less-permission-prompts` | — | Plugin Mgmt [Skill] | none | — | — |
| `/login` | — | Account | none | `DISABLE_LOGIN_COMMAND` | — |
| `/logout` | — | Account | none | `DISABLE_LOGOUT_COMMAND` | — |
| `/loop` | `/proactive` | Session Management [Skill] | `[interval] [prompt]` | — | — |
| `/mcp` | — | Plugin Mgmt | none | — | — |
| `/memory` | — | Memory/Context | none | `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Disabler only affects auto-memory, not the command |
| `/mobile` | `/ios`, `/android` | Account | none | — | — |
| `/model` | — | Session Management | `[model]` | — | — |
| `/passes` | — | Account | none | — | Only visible if account is eligible |
| `/permissions` | `/allowed-tools` | Plugin Mgmt | none | — | — |
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
| `/resume` | `/continue` | Session Management | `[session]` | — | — |
| `/review` | — | IDE | `[PR]` | — | — |
| `/rewind` | `/checkpoint`, `/undo` | Session Management | none | `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING` | Disabler affects checkpointing feature |
| `/sandbox` | — | Session Management | none | — | Supported platforms only |
| `/schedule` | `/routines` | Team | `[description]` | — | — |
| `/security-review` | — | Diagnostics | none | — | — |
| `/setup-bedrock` | — | Account | none | — | Only visible with `CLAUDE_CODE_USE_BEDROCK=1` |
| `/setup-vertex` | — | Account | none | — | Only visible with `CLAUDE_CODE_USE_VERTEX=1` |
| `/simplify` | — | Diagnostics [Skill] | `[focus]` | — | — |
| `/skills` | — | Help | none | — | Press `t` to sort by token count |
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
| `/usage` | — | Account | none | `DISABLE_EXTRA_USAGE_COMMAND` | Note: env var name mismatch (see Discrepancies) |
| `/voice` | — | IDE | none | — | Requires Claude.ai account |
| `/web-setup` | — | Account | none | — | — |

---

## Session Management

### `/add-dir`
- **Aliases:** none
- **Arguments:** `<path>` (required)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Add a working directory for file access during the current session. Most `.claude/` configuration is not discovered from the added directory" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/add-dir /path/to/project`
- **Notes:** Useful for accessing code in directories outside the current working directory without changing the global context.

### `/branch`
- **Aliases:** `/fork`
- **Arguments:** `[name]` (optional)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Create a branch of the current conversation at this point. Switches you into the branch and preserves the original, which you can return to with `/resume`." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/branch experiment` or `/fork`
- **Notes:** Enables non-destructive experimentation. The original conversation is always recoverable.

### `/clear`
- **Aliases:** `/reset`, `/new`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Start a new conversation with empty context. The previous conversation stays available in `/resume`. To free up context while continuing the same conversation, use `/compact` instead." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/clear`
- **Notes:** The prior conversation is preserved and can be resumed. Use `/compact` if you want to stay in the same conversation but reduce token usage.

### `/color`
- **Aliases:** none
- **Arguments:** `[color|default]` (optional)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Set the prompt bar color for the current session. Available colors: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan`. Use `default` to reset" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/color blue` or `/color default`
- **Notes:** Purely cosmetic; helps visually distinguish sessions in a tmux/screen split.

### `/compact`
- **Aliases:** none
- **Arguments:** `[instructions]` (optional)
- **Type:** Built-in
- **Disabled by:** `DISABLE_COMPACT`
- **Gating:** —
- **Description:** "Compact conversation with optional focus instructions" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/compact` or `/compact focus on the deploy logic`
- **Notes:** Summarizes old conversation turns to free up tokens while staying in the same session.

### `/copy`
- **Aliases:** none
- **Arguments:** `[N]` (optional — copy the Nth-latest response)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Copy the last assistant response to clipboard. Pass a number `N` to copy the Nth-latest response: `/copy 2` copies the second-to-last. When code blocks are present, shows an interactive picker to select individual blocks or the full response. Press `w` in the picker to write the selection to a file instead of the clipboard, which is useful over SSH" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/copy 2` or `/copy` (latest response)
- **Notes:** Over SSH, use the `w` option to write directly to a file instead of clipboard.

### `/effort`
- **Aliases:** none
- **Arguments:** `[level|auto]` (optional) — `low`, `medium`, `high`, `xhigh`, `max`, or `auto`
- **Type:** Built-in
- **Disabled by:** `CLAUDE_CODE_DISABLE_FAST_MODE` (also gates `/fast`)
- **Gating:** —
- **Description:** "Set the model effort level. Accepts `low`, `medium`, `high`, `xhigh`, or `max`; available levels depend on the model and `max` is session-only. `auto` resets to the model default. Without an argument, opens an interactive slider; use left and right arrows to pick a level and `Enter` to apply. Takes effect immediately without waiting for the current response to finish" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/effort high` or `/effort auto`
- **Notes:** Some models do not support all effort levels. `max` is session-only and requires a Pro/Max subscription.

### `/exit`
- **Aliases:** `/quit`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Exit the CLI." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/exit`
- **Notes:** none

### `/export`
- **Aliases:** none
- **Arguments:** `[filename]` (optional)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Export the current conversation as plain text. With a filename, writes directly to that file. Without, opens a dialog to copy to clipboard or save to a file" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/export transcript.txt` or `/export`
- **Notes:** Useful for archiving, sharing, or processing conversation transcripts.

### `/fast`
- **Aliases:** none
- **Arguments:** `[on|off]` (optional)
- **Type:** Built-in
- **Disabled by:** `CLAUDE_CODE_DISABLE_FAST_MODE`
- **Gating:** —
- **Description:** "Toggle fast mode on or off" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/fast on` or `/fast off`
- **Notes:** Fast mode reduces latency at the cost of response quality. Useful for quick iterations.

### `/focus`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Fullscreen rendering only
- **Description:** "Toggle the focus view, which shows only your last prompt, a one-line tool-call summary with edit diffstats, and the final response. The selection persists across sessions. Only available in fullscreen rendering" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/focus`
- **Notes:** Reduces visual clutter when using the fullscreen TUI. Not available in line-by-line mode.

### `/model`
- **Aliases:** none
- **Arguments:** `[model]` (optional — model name, alias, or full model ID like `claude-opus-4-7-20250219`)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Select or change the AI model. For models that support it, use left/right arrows to adjust effort level. With no argument, opens a picker that asks for confirmation when the conversation has prior output, since the next response re-reads the full history without cached context." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/model opus` or `/model haiku` or `/model claude-opus-4-7-20250219`
- **Notes:** Changing the model clears the context cache for the next response.

### `/plan`
- **Aliases:** none
- **Arguments:** `[description]` (optional)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Enter plan mode directly from the prompt. Pass an optional description to enter plan mode and immediately start with that task, for example `/plan fix the auth bug`" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/plan fix the auth bug` or `/plan`
- **Notes:** Plan mode allows you to decompose and validate a task before executing it.

### `/recap`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Generate a one-line summary of the current session on demand." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/recap`
- **Notes:** Useful for archiving or reviewing what was accomplished in a session.

### `/rename`
- **Aliases:** none
- **Arguments:** `[name]` (optional; auto-generates if omitted)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Rename the current session and show the name on the prompt bar. Without a name, auto-generates one from conversation history" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/rename debugging auth flow` or `/rename`
- **Notes:** Auto-generated names are intelligently derived from your recent activity.

### `/resume`
- **Aliases:** `/continue`
- **Arguments:** `[session]` (optional — session ID or name)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Resume a conversation by ID or name, or open the session picker." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/resume auth-refactor` or `/resume` (opens picker)
- **Notes:** All prior conversations are preserved and resumable indefinitely.

### `/rewind`
- **Aliases:** `/checkpoint`, `/undo`
- **Arguments:** none (interactive; select message from conversation)
- **Type:** Built-in
- **Disabled by:** `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING`
- **Gating:** —
- **Description:** "Rewind the conversation and/or code to a previous point, or summarize from a selected message." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/rewind` (then select a message)
- **Notes:** Supports both conversation history rollback and file state restoration. Very useful for undoing accidental changes.

### `/sandbox`
- **Aliases:** none
- **Arguments:** none (toggle)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Supported platforms only
- **Description:** "Toggle sandbox mode. Available on supported platforms only" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/sandbox`
- **Notes:** Sandbox mode restricts file access and command execution for added safety. Not available on all platforms.

### `/theme`
- **Aliases:** none
- **Arguments:** none (opens picker)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Change the color theme. Includes an `auto` option that follows your terminal's dark or light mode, light and dark variants, colorblind-accessible (daltonized) themes, and ANSI themes that use your terminal's color palette" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/theme` (opens interactive picker)
- **Notes:** Themes include daltonized variants for colorblind accessibility.

### `/tui`
- **Aliases:** none
- **Arguments:** `[default|fullscreen]` (optional)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Set the terminal UI renderer and relaunch into it with your conversation intact. `fullscreen` enables the flicker-free alt-screen renderer. With no argument, prints the active renderer" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/tui fullscreen` or `/tui default` or `/tui`
- **Notes:** Fullscreen mode uses an alternate terminal buffer for cleaner output.

### `/btw`
- **Aliases:** none
- **Arguments:** `<question>` (required)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Ask a quick side question without adding to the conversation" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/btw what's the syntax for async/await?`
- **Notes:** Useful for quick clarifications that you don't want to include in the session history.

---

## Memory & Context

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

## Account & Subscription

### `/extra-usage`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Configure extra usage to keep working when rate limits are hit" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/extra-usage`
- **Notes:** Allows you to purchase additional tokens if you exceed your plan's rate limits.

### `/login`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `DISABLE_LOGIN_COMMAND`
- **Gating:** —
- **Description:** "Sign in to your Anthropic account" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/login`
- **Notes:** Opens OAuth flow to authenticate with Anthropic.

### `/logout`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `DISABLE_LOGOUT_COMMAND`
- **Gating:** —
- **Description:** "Sign out from your Anthropic account" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/logout`
- **Notes:** Removes local authentication credentials.

### `/mobile`
- **Aliases:** `/ios`, `/android`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Show QR code to download the Claude mobile app." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/mobile`
- **Notes:** Displays a QR code for quick app download on iOS or Android.

### `/passes`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Only visible if account is eligible
- **Description:** "Share a free week of Claude Code with friends. Only visible if your account is eligible" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/passes`
- **Notes:** Generates shareable pass codes for trial access.

### `/privacy-settings`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Pro and Max plan subscribers only
- **Description:** "View and update your privacy settings. Only available for Pro and Max plan subscribers" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/privacy-settings`
- **Notes:** none

### `/setup-bedrock`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Only visible when `CLAUDE_CODE_USE_BEDROCK=1` is set
- **Description:** "Configure Amazon Bedrock authentication, region, and model pins through an interactive wizard. Only visible when `CLAUDE_CODE_USE_BEDROCK=1` is set." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/setup-bedrock`
- **Notes:** Use this if you want Claude Code to work with models hosted on AWS Bedrock.

### `/setup-vertex`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Only visible when `CLAUDE_CODE_USE_VERTEX=1` is set
- **Description:** "Configure Google Vertex AI authentication, project, region, and model pins through an interactive wizard. Only visible when `CLAUDE_CODE_USE_VERTEX=1` is set." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/setup-vertex`
- **Notes:** Use this if you want Claude Code to work with models hosted on Google Cloud Vertex AI.

### `/stickers`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Order Claude Code stickers" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/stickers`
- **Notes:** Opens a link to order physical stickers.

### `/upgrade`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `DISABLE_UPGRADE_COMMAND`
- **Gating:** Only visible on Pro and Max plans
- **Description:** "Open the upgrade page to switch to a higher plan tier" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/upgrade`
- **Notes:** Only shown to users on lower-tier plans.

### `/usage`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `DISABLE_EXTRA_USAGE_COMMAND` (env var naming mismatch)
- **Gating:** —
- **Description:** "Show plan usage limits and rate limit status" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/usage`
- **Notes:** Shows your current token consumption and limits. Note: The disabler env var is named `DISABLE_EXTRA_USAGE_COMMAND` but applies to `/usage`, not `/extra-usage`. See Discrepancies section.

### `/web-setup`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Connect your GitHub account to Claude Code on the web using your local `gh` CLI credentials. `/schedule` prompts for this automatically if GitHub isn't connected" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/web-setup`
- **Notes:** Links your GitHub account to enable web-based features like `/schedule` and `/ultraplan`.

---

## Plugins, Permissions, Hooks, MCP, Skills

### `/hooks`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "View hook configurations for tool events. Type `/hooks` in Claude Code to open a read-only browser for your configured hooks. The menu shows every hook event with a count of configured hooks, lets you drill into matchers, and shows the full details of each hook handler." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/hooks`
- **Notes:** Complements `.claude/hooks.yaml`; this command provides an interactive UI for exploring them.

### `/mcp`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Manage MCP server connections and OAuth authentication" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/mcp`
- **Notes:** Opens interactive manager for MCP (Model Context Protocol) servers.

### `/permissions`
- **Aliases:** `/allowed-tools`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Manage allow, ask, and deny rules for tool permissions. Opens an interactive dialog where you can view rules by scope, add or remove rules, manage working directories, and review recent auto mode denials." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/permissions`
- **Notes:** Shows a rule builder for granular tool access control.

### `/plugin`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Manage Claude Code plugins. Opens the interactive plugin manager UI. Plugin management subcommands (install, uninstall, enable, disable, update, list, validate) are available as `claude plugin <subcommand>` CLI commands, not as in-session slash subcommands." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/plugin` (opens UI) or `claude plugin install code-review@claude-plugins-official` (CLI)
- **Notes:** In-session `/plugin` opens a UI; CLI `claude plugin` subcommands are separate.

### `/reload-plugins`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Reload all active plugins to apply pending changes without restarting. Reports counts for each reloaded component and flags any load errors" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/reload-plugins`
- **Notes:** Use after installing or modifying plugins to apply changes immediately.

### `/skills`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Press `t` to sort by token count
- **Description:** "List available skills. Press `t` to sort by token count" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/skills`
- **Notes:** Shows all active skills (bundled, custom, and plugin-provided) with descriptions and token cost.

### `/agents`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Manage agent configurations" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/agents`
- **Notes:** View and configure subagents and agent teams.

---

## IDE & Integrations

### `/autofix-pr`
- **Aliases:** none
- **Arguments:** `[prompt]` (optional)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Requires `gh` CLI and access to Claude Code on the web
- **Description:** "Spawn a Claude Code on the web session that watches the current branch's PR and pushes fixes when CI fails or reviewers leave comments. Detects the open PR from your checked-out branch with `gh pr view`; to watch a different PR, check out its branch first. By default the remote session is told to fix every CI failure and review comment; pass a prompt to give it different instructions, for example `/autofix-pr only fix lint and type errors`. Requires the `gh` CLI and access to Claude Code on the web." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/autofix-pr only fix lint and type errors`
- **Notes:** Spawns a separate web session to handle CI fixes autonomously.

### `/chrome`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Configure Claude in Chrome settings" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/chrome`
- **Notes:** Opens Chrome extension configuration.

### `/desktop`
- **Aliases:** `/app`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** macOS and Windows only
- **Description:** "Continue the current session in the Claude Code Desktop app. macOS and Windows only." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/desktop`
- **Notes:** Transfers your session to the native desktop application with full conversation history.

### `/diff`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Open an interactive diff viewer showing uncommitted changes and per-turn diffs. Use left/right arrows to switch between the current git diff and individual Claude turns, and up/down to browse files" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/diff`
- **Notes:** Useful for reviewing what was changed in each turn and comparing against git state.

### `/ide`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Manage IDE integrations and show status" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/ide`
- **Notes:** Configure integrations with VS Code, Vim, Emacs, and other editors.

### `/install-github-app`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `DISABLE_INSTALL_GITHUB_APP_COMMAND`
- **Gating:** —
- **Description:** "Set up the Claude GitHub Actions app for a repository. Walks you through selecting a repo and configuring the integration" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/install-github-app`
- **Notes:** Enables Claude Code integration with GitHub Actions for CI/CD workflows.

### `/install-slack-app`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Install the Claude Slack app. Opens a browser to complete the OAuth flow" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/install-slack-app`
- **Notes:** Allows Claude Code to receive notifications and commands via Slack.

### `/keybindings`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Open or create your keybindings configuration file" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/keybindings`
- **Notes:** Edit keybindings for Claude Code CLI.

### `/remote-control`
- **Aliases:** `/rc`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Make this session available for remote control from claude.ai." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/remote-control`
- **Notes:** Allows a web session on claude.ai to take over your terminal session.

### `/remote-env`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Configure the default remote environment for web sessions started with `--remote`" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/remote-env`
- **Notes:** Sets up environment variables and paths for web sessions.

### `/review`
- **Aliases:** none
- **Arguments:** `[PR]` (optional — PR URL or number)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Review a pull request locally in your current session. For a deeper cloud-based review, see `/ultrareview`" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/review` or `/review 42` or `/review https://github.com/owner/repo/pull/42`
- **Notes:** Local review is faster; `/ultrareview` provides a multi-agent cloud analysis.

### `/statusline`
- **Aliases:** none
- **Arguments:** none (describe desired configuration, or run bare)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Configure Claude Code's status line. Describe what you want, or run without arguments to auto-configure from your shell prompt" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/statusline` or `/statusline show token count and model`
- **Notes:** Customizes what information appears in the session status line.

### `/teleport`
- **Aliases:** `/tp`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Requires claude.ai subscription
- **Description:** "Pull a Claude Code on the web session into this terminal: opens a picker, then fetches the branch and conversation. Also available as `/tp`. Requires a claude.ai subscription" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/teleport`
- **Notes:** Transfers a web session back to your terminal.

### `/terminal-setup`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** VS Code, Alacritty, Warp only
- **Description:** "Configure terminal keybindings for Shift+Enter and other shortcuts. Only visible in terminals that need it, like VS Code, Alacritty, or Warp" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/terminal-setup`
- **Notes:** Not needed in most terminals; appears only when terminal-specific config is available.

### `/voice`
- **Aliases:** none
- **Arguments:** none (toggle)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Requires Claude.ai account
- **Description:** "Toggle push-to-talk voice dictation. Requires a Claude.ai account" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/voice`
- **Notes:** Enables microphone input for hands-free coding.

---

## Diagnostics & Health

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

## Team, Scheduling, Multi-Agent

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

## Help & Miscellaneous

### `/claude-api`
- **Aliases:** none
- **Arguments:** none
- **Type:** [Skill]
- **Disabled by:** `CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL`
- **Gating:** Auto-activates with `anthropic` or `@anthropic-ai/sdk` imports
- **Description:** "**[Skill].** Load Claude API reference material for your project's language (Python, TypeScript, Java, Go, Ruby, C#, PHP, or cURL) and Managed Agents reference. Covers tool use, streaming, batches, structured outputs, and common pitfalls. Also activates automatically when your code imports `anthropic` or `@anthropic-ai/sdk`" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/claude-api`
- **Notes:** Auto-loads when you're working with Claude SDKs. Covers multiple languages.

### `/config`
- **Aliases:** `/settings`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Open the Settings interface to adjust theme, model, output style, and other preferences." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/config`
- **Notes:** Central hub for all session and global settings.

### `/feedback`
- **Aliases:** `/bug`
- **Arguments:** `[report]` (optional)
- **Type:** Built-in
- **Disabled by:** `DISABLE_FEEDBACK_COMMAND`, `DISABLE_BUG_COMMAND` (disabler for the alias)
- **Gating:** —
- **Description:** "Submit feedback about Claude Code." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/feedback` or `/bug`
- **Notes:** Opens a form to submit bug reports or feature requests.

### `/help`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Show help and available commands" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/help`
- **Notes:** Lists all available commands in the current session.

### `/less-permission-prompts`
- **Aliases:** none
- **Arguments:** none
- **Type:** [Skill]
- **Disabled by:** —
- **Gating:** —
- **Description:** "**[Skill].** Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project `.claude/settings.json` to reduce permission prompts" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/less-permission-prompts`
- **Notes:** Analyzes your session history to pre-approve safe operations.

### `/powerup`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Discover Claude Code features through quick interactive lessons with animated demos" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/powerup`
- **Notes:** Interactive tutorial system for learning Claude Code features.

---

## Removed / Deprecated Commands

The following commands have been removed from Claude Code and are no longer available. If you are on an older version, they may still work; upgrade to the latest version to use the replacements.

### `/vim`
- **Removed in:** v2.1.92
- **Replacement:** Use `/config` → Editor mode to toggle between Vim and Normal editing modes.
- **Notes:** The Vim toggle was moved into the Settings interface for better UX.

### `/pr-comments`
- **Removed in:** v2.1.91
- **Replacement:** Ask Claude directly to view pull request comments instead.
- **Notes:** Consolidated into natural conversation flow.

---

## Additional / Undocumented Commands

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

## Experimental / Unreleased / Feature-Flag-Gated Commands

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

## Discrepancies and Gaps

The following issues were identified during documentation research. These may affect operators and users relying on the commands reference:

1. **`DISABLE_EXTRA_USAGE_COMMAND` vs `/extra-usage` and `/usage`**: The env var name says "extra-usage" but ENV.md documents it as "Disable the /usage command." The commands table lists both `/usage` (show plan limits) and `/extra-usage` (configure extra usage when rate-limited) as distinct commands. It is ambiguous whether the env var disables `/usage`, `/extra-usage`, or both.

2. **`DISABLE_BUG_COMMAND` and `DISABLE_FEEDBACK_COMMAND` coexist**: `/feedback` is the primary command; `/bug` is its alias. Two separate disable env vars exist for what is documented as one command with an alias. Operators who only set `DISABLE_BUG_COMMAND` may not realize `/feedback` still works.

3. **`/install-github-app` originally cited as undocumented — actually documented**: The task brief listed this as an example of "exists per env var but undocumented publicly." As of the current docs, it appears explicitly in the official commands table. This may indicate a change between ENV.md's creation and the present documentation state.

4. **`CLAUDE_CODE_ENABLE_CFC` has no associated slash command in any public source**: The env var exists in ENV.md but no slash command, feature page, or community post can be found to explain what interface it exposes. This is the one enable flag with no citable command surface.

5. **`/vim` was removed in v2.1.92**: The commands table includes a tombstone entry: "Removed in v2.1.92. To toggle between Vim and Normal editing modes, use `/config` → Editor mode." This was a formerly documented slash command now replaced by a settings panel sub-option.

6. **`/pr-comments` was removed in v2.1.91**: "Removed in v2.1.91. Ask Claude directly to view pull request comments instead." Similar tombstone pattern. Two removed commands total.

7. **`/output-style` does not exist as a slash command**: The output-styles docs page describes output style selection as happening through `/config` → Output style, not through a dedicated `/output-style` slash command. No such command exists.

8. **`/release-notes` docs page 404s but the command exists**: `https://code.claude.com/docs/en/release-notes` returns 404, yet `/release-notes` is a fully documented slash command in the commands table. There is no dedicated docs sub-page for this command.

9. **`/team-onboarding` is in the public commands table but requires two gatekeepers**: The command appears in the public docs yet requires both `CLAUDE_CODE_TEAM_ONBOARDING` env var AND the internal `tengu_flint_harbor` Statsig feature flag. This dual-gate pattern means the public listing can create confusion — users may see the command in docs but not in their session.

10. **`/tasks` full system vs basic listing**: The docs list `/tasks` as "List and manage background tasks" (public). The `CLAUDE_CODE_ENABLE_TASKS` flag enables a deeper persistent task system with cross-session coordination via `CLAUDE_CODE_TASK_LIST_ID`. The docs do not explain this distinction; a user who enables the flag will find behavior meaningfully different from what the one-line command description implies.

---

## Notes on Sourcing

- All 78 documented commands in the main sections are sourced directly from the official Claude Code commands reference at `https://code.claude.com/docs/en/commands`.
- Direct quotes are verbatim from the public documentation to ensure accuracy.
- All aliases, environment variable disablers, and gating conditions are extracted from the official docs and cross-referenced with `/home/vx-daniel/zen-claude/docs/ENV.md`.
- Commands marked **[Skill]** are bundled prompt-based skills and can be customized or disabled like user skills.
- For commands that depend on environment variables or feature flags, check your `.env` file or the project's configuration documentation.
