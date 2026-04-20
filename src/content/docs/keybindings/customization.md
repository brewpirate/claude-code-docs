---
title: "Customization"
tags: [cli]
---

How to rebind keys, create custom keybindings, and manage your personal keybinding configuration in `~/.claude/keybindings.json`.

## Overview

User keybindings override shipped defaults, allowing full customization of Claude Code's keyboard interface. Changes are loaded at startup and persist across sessions.

## Configuration File

### Location

`~/.claude/keybindings.json`

This file is created automatically when Claude Code starts. On first launch, it contains no custom bindings (or comments explaining the format).

### Structure

```json
{
  "Context1": {
    "key1": "action:name",
    "key2": "action:name"
  },
  "Context2": {
    "key1": "action:name"
  }
}
```

### Example: Basic Customization

```json
{
  "Global": {
    "ctrl+alt+h": "history:search"
  },
  "Chat": {
    "ctrl+enter": "chat:submit",
    "alt+up": "history:previous",
    "alt+down": "history:next"
  },
  "Settings": {
    "q": "settings:close"
  }
}
```

## Key Format

### Syntax

- **Single key**: `a`, `enter`, `escape`, `pageup`
- **With modifier**: `ctrl+a`, `alt+a`, `shift+a`, `meta+a`, `cmd+a`
- **Multiple modifiers**: `ctrl+alt+a`, `ctrl+shift+a`, `meta+shift+a`
- **Chord (two-step)**: `ctrl+x ctrl+e`, `ctrl+x ctrl+k`

### Modifiers

| Modifier | Platforms | Example |
|----------|-----------|---------|
| `ctrl` | All | `ctrl+c` |
| `alt` | Windows, Linux | `alt+v` |
| `shift` | All | `shift+tab` |
| `meta` | All (portable alias) | `meta+p` |
| `cmd` | Kitty protocol only | `cmd+shift+f` |

### Special Keys

| Key | Name | Example |
|-----|------|---------|
| `enter` / `return` | Enter key | `enter` |
| `escape` / `esc` | Escape key | `escape` |
| `tab` | Tab key | `tab` |
| `space` | Space bar | `space` |
| `backspace` / `bksp` | Backspace | `backspace` |
| `delete` | Delete key | `delete` |
| `pageup` / `pagedown` | Page keys | `pageup` |
| `home` / `end` | Home/End keys | `ctrl+home` |
| `up` / `down` / `left` / `right` | Arrow keys | `up`, `meta+down` |
| `wheelup` / `wheeldown` | Mouse wheel | `wheelup` |
| `f1` through `f24` | Function keys | `f1`, `ctrl+f2` |

### Chords

Chords are space-separated sequences of key presses:

```
"ctrl+x ctrl+e"  ← Press Ctrl+X, release, then Ctrl+E
```

## Action Identifiers

Actions are namespaced by context or feature. Use the action name from the **Quick Reference** in [README.md](/claude-code-docs/keybindings/overview/) or specific sections.

### Common Actions

| Namespace | Examples |
|-----------|----------|
| `app:*` | `interrupt`, `exit`, `redraw`, `toggleTodos`, `globalSearch`, `quickOpen` |
| `chat:*` | `submit`, `cancel`, `modelPicker`, `fastMode`, `thinkingToggle`, `undo` |
| `history:*` | `search`, `previous`, `next` |
| `confirm:*` | `yes`, `no`, `toggle`, `nextField`, `cycleMode` |
| `select:*` | `previous`, `next`, `accept`, `cancel` |
| `scroll:*` | `pageUp`, `pageDown`, `top`, `bottom`, `lineUp`, `lineDown` |
| `tabs:*` | `next`, `previous` |
| `settings:*` | `close`, `search` |
| `task:*` | `background` |
| `voice:*` | `pushToTalk` |
| `diff:*` | `nextSource`, `previousFile`, `dismiss` |
| `message:*` | `messageActions:next`, `messageActions:prev` |

## Basic Examples

### Faster Submit (Ctrl+Enter)

```json
{
  "Chat": {
    "ctrl+enter": "chat:submit"
  }
}
```

Now you can submit prompts with Ctrl+Enter instead of Enter, while Enter still works.

### Custom History Navigation

```json
{
  "Chat": {
    "alt+up": "history:previous",
    "alt+down": "history:next"
  }
}
```

Adds Alt+Up/Down as alternatives to the default arrow keys.

### Vi-Style Global Keybindings

```json
{
  "Global": {
    "ctrl+h": "history:search",
    "ctrl+k": "app:toggleTranscript"
  },
  "Chat": {
    "ctrl+j": "history:next",
    "ctrl+k": "history:previous"
  }
}
```

### Rebind Model Picker

```json
{
  "Chat": {
    "ctrl+m": "chat:modelPicker"
  }
}
```

This adds a new binding; the default `meta+p` still works.

### Disable a Shipped Binding

Set the key to `null`:

```json
{
  "Global": {
    "ctrl+t": null
  }
}
```

Now `ctrl+t` is not bound to `toggleTodos`; the key is consumed by Claude Code but has no action (typing won't emit a literal `t`).

### Single-Key Bindings

```json
{
  "Select": {
    "j": "select:next",
    "k": "select:previous",
    "q": "select:cancel"
  }
}
```

Short, fast navigation when a select menu is active.

### Emacs-Style Readline Supplements

```json
{
  "Chat": {
    "ctrl+a": "chat:startOfLine",
    "ctrl+e": "chat:endOfLine",
    "ctrl+f": "chat:forwardChar",
    "ctrl+b": "chat:backChar"
  }
}
```

**Note**: These may not exist as actions in Claude Code. Check available actions first (see [how-keybindings-work.md](/claude-code-docs/keybindings/how-keybindings-work/#action-identifiers)).

## Conflict Resolution

### Last-Wins Precedence

If you define the same key in multiple places, **the last definition wins**:

```json
{
  "Chat": {
    "ctrl+r": "history:search",
    "ctrl+r": "chat:undo"
  }
}
```

Here, `ctrl+r` → `chat:undo` (second definition overrides first).

### Shipped vs. User

Shipped defaults are loaded first, then user `keybindings.json` is loaded and applied. User bindings override defaults.

Example:
- Shipped: `ctrl+r` → `history:search`
- User: `ctrl+r` → null (disables)
- Result: `ctrl+r` is not bound

### Context-Specific Conflicts

If the same key is bound in different contexts, Claude Code activates the appropriate context-specific binding based on what's focused. No conflict.

Example:
```json
{
  "Global": {
    "ctrl+r": "history:search"
  },
  "Chat": {
    "ctrl+r": "chat:redo"
  }
}
```

When chat is focused, `ctrl+r` → `chat:redo`. Otherwise, `ctrl+r` → `history:search`.

## Validation & Errors

### Invalid Keys

```json
{
  "Chat": {
    "super+a": "chat:submit"
  }
}
```

`super` is not a valid modifier on most systems. Use `meta` or `cmd` instead.

### Invalid Actions

```json
{
  "Chat": {
    "ctrl+x": "chat:nonExistentAction"
  }
}
```

If the action is not defined, Claude Code logs a warning but doesn't fail to start.

### Invalid Contexts

```json
{
  "InvalidContext": {
    "ctrl+x": "chat:submit"
  }
}
```

Unrecognized context names are ignored (no error, just skipped).

### Non-Rebindable Keys

Attempting to rebind reserved keys shows an error:

```json
{
  "Global": {
    "ctrl+c": "app:customAction"
  }
}
```

Error: "ctrl+c cannot be rebound - used for interrupt/exit (hardcoded)"

## Viewing Current Bindings

Claude Code does not provide a built-in command to dump all active keybindings. To see what's bound:

1. **Check shipped defaults**: Read [global-bindings.md](/claude-code-docs/keybindings/global-bindings/), [chat-bindings.md](/claude-code-docs/keybindings/chat-bindings/), etc.
2. **Check your custom file**: Edit `~/.claude/keybindings.json`.
3. **Combine mentally**: User bindings override/extend defaults.

Alternatively, examine source: `/home/vx-daniel/Downloads/claude-code-main/keybindings/defaultBindings.ts` (in the shipped codebase).

## Advanced Patterns

### Feature-Gated Customization

Some features can be enabled/disabled via settings. If a feature is off, its bindings don't activate.

Example: `MESSAGE_ACTIONS` is gated. If you want to ensure the binding works, enable it in `/settings` first.

### Conditional Rebinding by Platform

`keybindings.json` does not support platform-specific conditions. To rebind differently per platform, maintain separate files and symlink them:

```bash
# ~/.claude/keybindings.linux.json
# ~/.claude/keybindings.macos.json
# ~/.claude/keybindings.json → symlink to appropriate platform file
```

Claude Code reads `keybindings.json` at startup.

### Preserving Shipping Defaults

If you want to keep defaults and only add custom bindings, don't rebind default keys to `null`. Just add new keys:

```json
{
  "Chat": {
    "ctrl+j": "history:next",
    "ctrl+k": "history:previous"
  }
}
```

Defaults (up arrow for `history:next`, etc.) remain active alongside your custom bindings.

## Troubleshooting

### Key Not Working

1. **Check context**: Is the binding in the right context? Bindings only activate in their declared context.
2. **Check reserved/intercepted keys**: [Platform Quirks](/claude-code-docs/keybindings/platform-quirks/) lists OS/terminal interceptors.
3. **Check syntax**: Valid key format? Valid action name?
4. **Check platform**: Is this key available on your platform? (e.g., `cmd+*` only on kitty).
5. **Restart Claude Code**: Keybindings are loaded at startup; changes require a restart.

### Key Binding Conflict

If a key doesn't behave as expected:

1. **Remove your custom file** and restart; does the key work with defaults?
2. **Check for duplicate keys** in your config (JSON will use last value).
3. **Check other contexts** — is the key bound elsewhere and taking precedence?

### Unbinding a Key

To fully unbind a key so it's not consumed by Claude Code:

```json
{
  "Chat": {
    "space": null
  }
}
```

However, null-unbinding can be dangerous (e.g., space dead for typing). Prefer using `/settings` to disable features (e.g., `/voice` to disable voice mode and free up space).

## Best Practices

1. **Start small**: Add one or two custom bindings, test, then expand.
2. **Avoid reserved keys**: Check [Platform Quirks](/claude-code-docs/keybindings/platform-quirks/) before binding.
3. **Use consistent mnemonics**: `ctrl+f` for search, `ctrl+s` for save, etc.
4. **Document your config**: Add comments in JSON (not standard JSON, but many editors support them).
5. **Test on target platforms**: Bindings behave differently on Windows, macOS, Linux.
6. **Back up your config**: `~/.claude/keybindings.json` is your personal file; version it if it's important.

## Migration from Other Tools

### From Vim

If you use Vim keybindings, overlay vi-style keys in contexts that support them:

```json
{
  "MessageSelector": {
    "j": "messageSelector:down",
    "k": "messageSelector:up",
    "g": null,
    "G": null
  }
}
```

Note: Claude Code doesn't support full Vim modes; adapt bindings to available actions.

### From Emacs

```json
{
  "Chat": {
    "ctrl+a": "chat:startOfLine",
    "ctrl+e": "chat:endOfLine",
    "ctrl+n": "history:next",
    "ctrl+p": "history:previous"
  }
}
```

Again, only these actions must exist; check before binding.

---

[← Back to Keybindings/README.md](/claude-code-docs/keybindings/overview/)
