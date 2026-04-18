---
title: "Global Bindings"
tags: [cli]
---

# Global Bindings

Keybindings that are active everywhere in Claude Code, regardless of current focus.

## Overview

Global bindings handle app-level operations: screen control, history search, transcript viewing, and feature toggles. These are always available and take precedence over context-specific bindings.

## Shipped Global Bindings

### Core Control

| Key | Action | Description |
|-----|--------|-------------|
| `ctrl+c` | `app:interrupt` | Interrupt current operation. Hardcoded; uses double-press detection for exit. Cannot be rebound. |
| `ctrl+d` | `app:exit` | Exit Claude Code. Hardcoded; requires double-press. Cannot be rebound. |
| `ctrl+l` | `app:redraw` | Redraw the entire screen. Useful if display is corrupted. |

### Navigation & History

| Key | Action | Description |
|-----|--------|-------------|
| `ctrl+r` | `history:search` | Open history search dialog. Enter search term; navigate with Ctrl+R to cycle results, Tab or Escape to select. |

### Toggles

| Key | Action | Description |
|-----|--------|-------------|
| `ctrl+t` | `app:toggleTodos` | Show/hide todo list in footer. |
| `ctrl+o` | `app:toggleTranscript` | Show/hide transcript (history of all interactions). |
| `ctrl+shift+o` | `app:toggleTeammatePreview` | Show/hide teammate activity preview. |
| `ctrl+shift+b` | `app:toggleBrief` | Show/hide brief mode (summarized output). Feature-gated: KAIROS or KAIROS_BRIEF. |
| `meta+j` | `app:toggleTerminal` | Show/hide integrated terminal panel. Feature-gated: TERMINAL_PANEL. |

### Search & Quick Navigation (Feature-Gated)

Requires: `QUICK_SEARCH` feature flag.

| Key | Action | Description |
|-----|--------|-------------|
| `ctrl+shift+f` | `app:globalSearch` | Global file/content search (portable; ctrl+shift combination). |
| `cmd+shift+f` | `app:globalSearch` | Global search on macOS/kitty terminals (cmd shortcut). |
| `ctrl+shift+p` | `app:quickOpen` | Quick open command/file picker (portable). |
| `cmd+shift+p` | `app:quickOpen` | Quick open on macOS/kitty terminals. |

## Customization Examples

### Add a custom global search shortcut

```json
{
  "Global": {
    "ctrl+alt+f": "app:globalSearch"
  }
}
```

### Disable a global binding

Set the key to `null`:

```json
{
  "Global": {
    "ctrl+t": null
  }
}
```

Now Ctrl+T will not trigger the todo toggle (but the key is still consumed; typing won't emit a literal `t`).

### Rebind history search

```json
{
  "Global": {
    "ctrl+h": "history:search"
  }
}
```

This overrides `ctrl+r` for history search. The old `ctrl+r` binding is not removed; if you want to fully disable it, set it to `null`.

## Notes

- **Double-press exit**: `ctrl+c` and `ctrl+d` require a second press within ~500ms to actually exit. This prevents accidental termination.
- **Screen redraw** (`ctrl+l`) is useful when the TUI becomes visually corrupted, but does not clear scrollback.
- **Feature gates**: QUICK_SEARCH, KAIROS/KAIROS_BRIEF, and TERMINAL_PANEL are not always enabled. If a feature is not available, its bindings are not registered.
- **Chord vs. single-key**: Global bindings use single modifiers (ctrl+, meta+, shift+) or single keys, not multi-step chords.

---

[← Back to Keybindings/README.md](/claude-code-docs/keybindings/overview/)
