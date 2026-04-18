---
title: "Chat Bindings"
tags: [cli]
---

# Chat Bindings

Keybindings active when the chat input field is focused. This is the largest context, covering prompt entry, submission, history, editing, and mode toggles.

## Overview

Chat bindings handle the primary interaction loop: entering prompts, submitting, navigating history, managing sessions, and toggling model options. These are active whenever the prompt input is focused.

## Shipped Chat Bindings

### Submission & Cancellation

| Key | Action | Description |
|-----|--------|-------------|
| `enter` | `chat:submit` | Submit the current prompt. Sends input to Claude. |
| `escape` | `chat:cancel` | Cancel/clear the current prompt without submitting. |
| `ctrl+x ctrl+k` | `chat:killAgents` | Kill all running agents (kill chord; avoids shadowing ctrl+a/b/e/f readline keys). |

### Mode Toggles

| Key | Action | Description | Platform |
|-----|--------|-------------|----------|
| `shift+tab` | `chat:cycleMode` | Cycle editor mode (normal → raw → smart/multi-line). | Windows 24.2+, macOS, Linux |
| `meta+m` | `chat:cycleMode` | Cycle editor mode fallback (for Windows <24.2 without VT mode). | Windows <24.2 |
| `meta+p` | `chat:modelPicker` | Open model selection dialog. |  All |
| `meta+o` | `chat:fastMode` | Toggle fast/draft mode. Quick, lower-accuracy responses. | All |
| `meta+t` | `chat:thinkingToggle` | Toggle extended thinking (Claude 3.5 Sonnet feature). | All |

### History Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `up` | `history:previous` | Cycle to previous prompt in history. |
| `down` | `history:next` | Cycle to next prompt in history. |

When navigating history, the current input is preserved on a temporary "draft" line. Pressing up/down cycles through submitted prompts; exiting history restores your draft.

### Editing & Undo

| Key | Action | Description | Note |
|-----|--------|-------------|------|
| `ctrl+_` | `chat:undo` | Undo last edit. Uses legacy terminal control char (\x1f). | Traditional; widely supported |
| `ctrl+shift+-` | `chat:undo` | Undo last edit (Kitty protocol variant). Uses physical minus key. | Kitty-protocol terminals only |

Both bindings are registered; your terminal determines which one works. Most terminals support `ctrl+_`.

### External Editor

| Key | Action | Description | Note |
|-----|--------|-------------|------|
| `ctrl+x ctrl+e` | `chat:externalEditor` | Open prompt in external editor ($EDITOR). Supports chord sequence. | Standard readline binding |
| `ctrl+g` | `chat:externalEditor` | Alternative shortcut for external editor (single key). | Convenient alias |

Both work; choose whichever is easier to remember.

### Image & File Attachments

| Key | Action | Description | Platform |
|-----|--------|-------------|----------|
| `alt+v` | `chat:imagePaste` | Paste images from clipboard into prompt. | Windows |
| `ctrl+v` | `chat:imagePaste` | Paste images from clipboard into prompt. | macOS, Linux |

Platform-specific because Windows Terminal uses Ctrl+V for system paste; Claude Code intercepts Alt+V instead.

### Prompt Storage

| Key | Action | Description |
|-----|--------|-------------|
| `ctrl+s` | `chat:stash` | Save current prompt to stash (temporary storage). Retrieve later without scrolling history. |

Stashed prompts are stored per-session and cleared when the session ends.

### Message Actions (Feature-Gated)

Requires: `MESSAGE_ACTIONS` feature flag.

| Key | Action | Description |
|-----|--------|-------------|
| `shift+up` | `chat:messageActions` | Open action menu on previous message. Navigate, edit, retry, copy, or delete. |

## Voice Mode (Feature-Gated)

Requires: `VOICE_MODE` feature flag.

| Key | Action | Description |
|-----|--------|-------------|
| `space` | `voice:pushToTalk` | Hold to record voice input. Release to stop and submit. |

**Important**: Space is only bound to voice if the feature is enabled. Otherwise, space emits a literal space character in the prompt.

### Rebinding Voice

If you want to use a different key for voice, add to `keybindings.json`:

```json
{
  "Chat": {
    "ctrl+alt+v": "voice:pushToTalk"
  }
}
```

This overrides the default space binding. To disable voice entirely, set space to `null`:

```json
{
  "Chat": {
    "space": null
  }
}
```

However, Claude Code provides a `/voice` command as the canonical way to enable/disable voice. Null-unbinding space in custom bindings causes space to be "swallowed" (not emitted) due to a pre-existing trap in the keybinding handler—use `/voice` instead to toggle the feature safely.

## Customization Examples

### Rebind editor mode cycle

By default, use Shift+Tab. If that conflicts with your terminal, override:

```json
{
  "Chat": {
    "ctrl+alt+m": "chat:cycleMode"
  }
}
```

### Add a faster model picker

```json
{
  "Chat": {
    "ctrl+m": "chat:modelPicker"
  }
}
```

### Change fast mode toggle

```json
{
  "Chat": {
    "ctrl+alt+f": "chat:fastMode"
  }
}
```

## Notes

### Chord Sequences Avoid Readline Conflicts

- `ctrl+x ctrl+k` uses a two-step chord to avoid shadowing `ctrl+a` (line start), `ctrl+b` (back char), `ctrl+e` (line end), `ctrl+f` (forward char), etc. These readline bindings are handled by your shell, not Claude Code.
- `ctrl+x ctrl+e` is the readline standard for "edit and execute command," familiar to bash/zsh users.

### Terminal & Prompt Capabilities

- **External editor**: Requires `$EDITOR` environment variable. Default editors: `nano`, `vi`, `emacs`, `code`.
- **Undo**: Two bindings provided for terminal compatibility. Try `ctrl+_` first; if it doesn't work, your terminal might need `ctrl+shift+-`.
- **Image paste**: Automatically uses the correct binding per platform. Some terminals (WezTerm, iTerm2) may have additional clipboard handling.

### History Behavior

- **Up arrow in empty prompt**: If your prompt is empty, up arrow goes to the most recent history item. If you've typed text, up arrow searches history for prompts starting with that text.
- **Draft line**: While navigating history, your current unsaved prompt is preserved. Pressing down after reaching the end returns to your draft.

---

[← Back to Keybindings/README.md](/claude-code-docs/keybindings/overview/)
