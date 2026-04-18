---
title: "Dialog & Menu Bindings"
---

# Dialog & Menu Bindings

Keybindings for interactive dialogs, menus, and task management: confirmation dialogs, settings panel, task execution, message actions, model picker, generic select lists, plugins, transcript, help, theme picker, and history search.

## Overview

Dialog contexts handle user interactions with prompts, settings, and specialized interfaces. Each context has navigation, selection, and mode-specific bindings.

## Confirmation Context

Active when permission, choice, or confirmation dialogs are shown.

### Response

| Key | Action | Description |
|-----|--------|-------------|
| `y` | `confirm:yes` | Confirm "yes" / accept action. |
| `n` | `confirm:no` | Confirm "no" / reject action. |
| `enter` | `confirm:yes` | Confirm "yes" (alternative). |
| `escape` | `confirm:no` | Dismiss dialog / "no". |

### Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `up` | `confirm:previous` | Navigate to previous option in multi-item dialog. |
| `down` | `confirm:next` | Navigate to next option. |

### Field & Mode Cycling

| Key | Action | Description |
|-----|--------|-------------|
| `tab` | `confirm:nextField` | Move to next input field (in dialogs with text input). |
| `shift+tab` | `confirm:cycleMode` | Cycle dialog mode (e.g., file permission levels: read → write → execute). |
| `space` | `confirm:toggle` | Toggle checkbox or boolean field. |

### Permission Dialogs

| Key | Action | Description |
|-----|--------|-------------|
| `ctrl+e` | `confirm:toggleExplanation` | Show/hide explanation of requested permission. |
| `ctrl+d` | `permission:toggleDebug` | Toggle debug info (file path, tool, rule evaluation). |

Useful when reviewing file read/write or tool execution permissions.

## Settings Context

Active when settings/configuration panel is open (accessed via `/settings` or menu).

### Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `up` | `select:previous` | Navigate to previous setting. |
| `down` | `select:next` | Navigate to next setting. |
| `k` | `select:previous` | Navigate up (vi-style). |
| `j` | `select:next` | Navigate down (vi-style). |
| `ctrl+p` | `select:previous` | Navigate up (readline-style). |
| `ctrl+n` | `select:next` | Navigate down (readline-style). |

### Interaction

| Key | Action | Description |
|-----|--------|-------------|
| `space` | `select:accept` | Toggle the selected setting (if boolean). |
| `enter` | `settings:close` | Save all changes and close settings. |
| `escape` | `confirm:no` | Discard changes and close settings. |

### Search

| Key | Action | Description |
|-----|--------|-------------|
| `/` | `settings:search` | Enter search mode to filter settings by name/description. |

### Retry (Error State)

| Key | Action | Description |
|-----|--------|-------------|
| `r` | `settings:retry` | Retry loading usage data (only active when an error occurred). |

## Task Context

Active when a task (bash command, agent execution) is running in the foreground.

| Key | Action | Description |
|-----|--------|-------------|
| `ctrl+b` | `task:background` | Move running task to background. Frees up the prompt. |

**Note**: In `tmux` sessions, `ctrl+b` is the tmux prefix key. You must press `ctrl+b` twice to trigger Claude Code's background action. First press is captured by tmux; second reaches Claude Code.

## Transcript Context

Active when viewing the transcript (history of all messages).

| Key | Action | Description |
|-----|--------|-------------|
| `escape` | `transcript:exit` | Close transcript and return to chat. |
| `ctrl+c` | `transcript:exit` | Exit transcript. |
| `q` | `transcript:exit` | Exit transcript (pager convention; like `less` or `tmux` copy-mode). |
| `ctrl+e` | `transcript:toggleShowAll` | Toggle showing all messages vs. collapsed view. |

The transcript is a modal read-only view with no prompt, so `q` is free to exit without conflict.

## HistorySearch Context

Active when history search is running (after Ctrl+R).

| Key | Action | Description |
|-----|--------|-------------|
| `ctrl+r` | `historySearch:next` | Cycle to next search result. |
| `escape` | `historySearch:accept` | Accept current result and load prompt. |
| `tab` | `historySearch:accept` | Accept current result (alternative). |
| `enter` | `historySearch:execute` | Execute the selected command (with arguments). |
| `ctrl+c` | `historySearch:cancel` | Cancel search and return to prompt. |

Example: `ctrl+r`, type "git", press `ctrl+r` to cycle results, `escape` to load, `enter` to execute, or `escape` to just load without running.

## Select Context

Generic list/choice component used by `/model`, `/resume`, permission prompts, and other select dialogs.

| Key | Action | Description |
|-----|--------|-------------|
| `up` | `select:previous` | Previous item. |
| `down` | `select:next` | Next item. |
| `j` | `select:next` | Next item (vi-style). |
| `k` | `select:previous` | Previous item (vi-style). |
| `ctrl+n` | `select:next` | Next item (readline-style). |
| `ctrl+p` | `select:previous` | Previous item (readline-style). |
| `enter` | `select:accept` | Select highlighted item. |
| `escape` | `select:cancel` | Cancel selection. |

Used across many dialogs for consistent navigation experience.

## ModelPicker Context

Active when the model selection dialog is open (accessed via Meta+P in chat or `/model` command).

**Note**: Effort cycling (left/right arrows) is ANT-only (Ant model selector feature).

| Key | Action | Description |
|-----|--------|-------------|
| `left` | `modelPicker:decreaseEffort` | Decrease model effort level (ANT models). |
| `right` | `modelPicker:increaseEffort` | Increase model effort level (ANT models). |

Standard navigation (up/down/enter) is inherited from Select context.

## ThemePicker Context

Active when theme selection is open.

| Key | Action | Description |
|-----|--------|-------------|
| `ctrl+t` | `theme:toggleSyntaxHighlighting` | Toggle syntax highlighting for code blocks. |

## Plugin Context

Active when the plugin dialog is open (manage, browse, discover plugins).

| Key | Action | Description |
|-----|--------|-------------|
| `space` | `plugin:toggle` | Enable/disable selected plugin. |
| `i` | `plugin:install` | Install selected plugin. |

Navigation (up/down/enter) is inherited from Select context.

## Help Context

Active when help overlay is displayed.

| Key | Action | Description |
|-----|--------|-------------|
| `escape` | `help:dismiss` | Close help and return to chat. |

## MessageActions Context (Feature-Gated)

Active when message action menu is open. Requires: `MESSAGE_ACTIONS` feature flag.

### Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `up` | `messageActions:prev` | Previous action item. |
| `down` | `messageActions:next` | Next action item. |
| `k` | `messageActions:prev` | Previous action (vi-style). |
| `j` | `messageActions:next` | Next action (vi-style). |

### Bulk Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `meta+up` | `messageActions:top` | Jump to first action. |
| `meta+down` | `messageActions:bottom` | Jump to last action. |
| `super+up` | `messageActions:top` | Jump to first action (kitty protocol variant). |
| `super+down` | `messageActions:bottom` | Jump to last action (kitty protocol variant). |

**Note**: `meta` = `cmd` on macOS; `super` is an alternative for kitty keyboard protocol terminals where both `meta` and `super` reach the TTY.

### User Message Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `shift+up` | `messageActions:prevUser` | Jump to previous user message. |
| `shift+down` | `messageActions:nextUser` | Jump to next user message. |

Useful for reviewing conversation flow without stepping through every assistant response.

### Actions

| Key | Action | Description |
|-----|--------|-------------|
| `c` | `messageActions:c` | Copy action (varies by action menu). |
| `p` | `messageActions:p` | Paste/apply action. |
| `enter` | `messageActions:enter` | Accept/execute selected action. |
| `escape` | `messageActions:escape` | Close action menu without selecting. |
| `ctrl+c` | `messageActions:ctrlc` | Force exit action menu. |

Action menu operations vary: `c` and `p` may copy, apply, retry, edit, or delete depending on available actions.

## Customization Examples

### Rebind confirmation to simpler keys

```json
{
  "Confirmation": {
    "y": "confirm:yes",
    "n": "confirm:no",
    "j": "confirm:next",
    "k": "confirm:previous"
  }
}
```

### Disable pager exit shortcut

```json
{
  "Transcript": {
    "q": null
  }
}
```

Now `q` will not exit the transcript.

### Add emacs-style history search

```json
{
  "HistorySearch": {
    "ctrl+r": "historySearch:next",
    "ctrl+s": "historySearch:previous"
  }
}
```

Adds forward/backward cycling (if `ctrl+s` is not blocked by your terminal's flow control).

## Notes

- **Dialog layering**: Some dialogs stack (e.g., confirmation on top of settings). Top-level keybindings take precedence.
- **Modal behavior**: Dialogs block other input; only their context bindings are active.
- **Settings persistence**: Changes made in settings are saved to `~/.claude/settings.json` upon pressing Enter.
- **Feature gates**: MESSAGE_ACTIONS context is only active if the feature is enabled.
- **tmux collision**: `ctrl+b` for background tasks conflicts with tmux's prefix. In tmux, press it twice: first press triggers tmux; releasing and pressing again sends the second press to Claude Code.

---

[← Back to Keybindings/README.md](/claude-code-docs/keybindings/overview/)
