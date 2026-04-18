---
title: "Session Management"
---

# Session Management


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

[← Back to Commands/README.md](/claude-code-docs/cli/overview/)
