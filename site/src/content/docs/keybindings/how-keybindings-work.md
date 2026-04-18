---
title: "How Keybindings Work"
---

# How Keybindings Work

Keybindings in Claude Code are context-sensitive sequences that trigger actions. This section explains the core concepts: contexts, chord sequences, feature gating, and reserved keys.

## Contexts

Keybindings are scoped to **contexts**—UI states where specific keys should be active. Each context has its own binding table, and Claude Code activates the appropriate context based on what's focused.

### Active Contexts

| Context | When Active | Scope |
|---------|------------|-------|
| Global | Always | Everywhere in the app |
| Chat | Input field has focus | Chat prompt entry |
| Autocomplete | Suggestion menu is visible | While typing completions |
| Confirmation | Dialog shown | Permission, choice, confirmation prompts |
| Help | Help overlay open | Help view |
| Transcript | Transcript view focused | History/transcript panel |
| HistorySearch | History search active (ctrl+r) | Search mode only |
| Task | Task/agent running foreground | While task executes |
| ThemePicker | Theme picker displayed | Theme selection modal |
| Settings | Settings menu open | Settings panel |
| Tabs | Tab navigation active | Tab switching mode |
| Attachments | Selecting image attachments | Attachment picker |
| Footer | Footer indicators focused | Task/team/diff indicator nav |
| MessageSelector | Rewind dialog open | Message selection (rewind feature) |
| DiffDialog | Diff viewer open | File diff display |
| ModelPicker | Model selection dialog open | Model selection UI |
| Select | Generic list/choice component | Select menus, permission lists |
| MessageActions | Message action menu open (gated) | Action selection on messages |

## Chord Sequences

Some bindings use **chord sequences**—a series of key presses in sequence, not simultaneously.

### Examples

- `ctrl+x ctrl+k` — Press Ctrl+X, release, then press Ctrl+K. Used to avoid shadowing readline editing keys (ctrl+a, ctrl+b, etc.).
- `ctrl+x ctrl+e` — Standard readline binding for edit-and-execute-command.

### Implementation

Chords are entered by pressing the first key combination, releasing it completely, then pressing the next. The application tracks the state between steps and executes the action only when the full sequence is recognized.

## Feature Gates

Some bindings are **feature-gated**—they only activate if a feature flag is enabled.

### Gated Bindings

| Binding | Feature Gate | Condition |
|---------|--------------|-----------|
| `ctrl+shift+f` / `cmd+shift+f` | QUICK_SEARCH | Global search enabled |
| `ctrl+shift+p` / `cmd+shift+p` | QUICK_SEARCH | Quick open enabled |
| `meta+j` | TERMINAL_PANEL | Integrated terminal enabled |
| `ctrl+shift+b` | KAIROS or KAIROS_BRIEF | Brief mode available |
| `shift+up` (Chat) | MESSAGE_ACTIONS | Message actions enabled |
| `space` (Chat) | VOICE_MODE | Voice mode enabled |
| MessageActions context | MESSAGE_ACTIONS | Message action menu |

### Behavior

If a feature gate is not met, the keybinding is not registered. This prevents conflicts with other uses of the key and keeps the keybinding registry clean.

## Reserved Keys

Certain keys **cannot be rebound** or are intercepted by the OS/terminal:

### Non-Rebindable (Hardcoded)

| Key | Action | Reason |
|-----|--------|--------|
| `ctrl+c` | Interrupt | Hardcoded interrupt mechanism; used for double-tap exit |
| `ctrl+d` | Exit | Hardcoded exit mechanism; distinct from ctrl+c |
| `ctrl+m` | (same as Enter) | Terminals send CR for both; cannot distinguish |

Attempting to rebind these in `keybindings.json` will show an error.

### Terminal-Reserved (OS/Shell Intercept)

| Key | Action | Severity |
|-----|--------|----------|
| `ctrl+z` | Process suspend (SIGTSTP) | Warning |
| `ctrl+\` | Terminal quit (SIGQUIT) | Error |

These are intercepted by the terminal/shell before reaching Claude Code.

### macOS System-Reserved

| Key | Action | Severity |
|-----|--------|----------|
| `cmd+c` | System copy | Error |
| `cmd+v` | System paste | Error |
| `cmd+x` | System cut | Error |
| `cmd+q` | Quit application | Error |
| `cmd+w` | Close window | Error |
| `cmd+tab` | App switcher | Error |
| `cmd+space` | Spotlight | Error |

macOS intercepts all `cmd+*` combinations; they do not reach Claude Code.

## Customization File

User keybindings are stored in `~/.claude/keybindings.json` and override the shipped defaults.

### Structure

```json
{
  "Global": {
    "ctrl+alt+x": "app:customAction"
  },
  "Chat": {
    "ctrl+enter": "chat:submit",
    "alt+up": "history:previous"
  }
}
```

### Rules

1. **Context names** must match one of the 18 valid contexts (case-sensitive).
2. **Keys** follow the chord syntax: `modifier+key` or `modifier+key modifier+key`.
3. **Actions** must be valid action identifiers (e.g., `chat:submit`, `app:redraw`).
4. **Last-wins**: If a key is bound in both default and user config, user binding takes precedence.
5. **Null unbinding**: Setting a key to `null` removes it entirely (disables that binding).

### Modifiers

| Modifier | Platforms | Example |
|----------|-----------|---------|
| `ctrl` | Windows, Linux | `ctrl+a` |
| `alt` | Windows, Linux | `alt+a` |
| `meta` | All | `meta+p` (equivalent to `cmd` on macOS, `alt` on Linux/Windows) |
| `cmd` | macOS (kitty protocol only) | `cmd+c` |
| `shift` | All | `shift+tab` |

### Notes on Modifiers

- `meta` is a portable alias: `cmd` on macOS, `alt` on Windows/Linux (when using kitty-protocol terminals).
- `cmd` bindings only work on terminals using the **kitty keyboard protocol** (kitty, WezTerm, ghostty, iTerm2).
- `ctrl+alt` and `shift+alt` are platform-dependent; test on your target platform.

## Chord Limitations

Chord sequences are limited by terminal capabilities:

- **Modifier-only chords** (e.g., `shift+tab`) may fail on Windows Terminal without VT mode (see [Platform Quirks](/claude-code-docs/keybindings/platform-quirks/)).
- **Two-step chords** work reliably across platforms; deeper sequences are not recommended.

## Action Identifiers

Actions are namespaced by context or feature:

| Namespace | Examples |
|-----------|----------|
| `app:*` | `app:interrupt`, `app:exit`, `app:redraw`, `app:globalSearch` |
| `chat:*` | `chat:submit`, `chat:cancel`, `chat:modelPicker`, `chat:undo` |
| `history:*` | `history:search`, `history:previous`, `history:next` |
| `confirm:*` | `confirm:yes`, `confirm:no`, `confirm:toggle` |
| `select:*` | `select:previous`, `select:next`, `select:accept` |
| `autocomplete:*` | `autocomplete:accept`, `autocomplete:dismiss` |
| `voice:*` | `voice:pushToTalk` |
| `diff:*` | `diff:nextSource`, `diff:previousFile` |
| `message:*` | `messageActions:next`, `messageActions:prev` |
| `scroll:*` | `scroll:pageUp`, `scroll:pageDown`, `scroll:top` |
| `tabs:*` | `tabs:next`, `tabs:previous` |
| `settings:*` | `settings:close`, `settings:search` |
| `task:*` | `task:background` |

---

[← Back to Keybindings/README.md](/claude-code-docs/keybindings/overview/)
