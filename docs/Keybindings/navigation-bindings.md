# Navigation Bindings

Keybindings for scrolling, selecting, and navigating UI elements: scroll, selection copy, diff viewer, message selector, attachments, footer, and autocomplete.

## Overview

Navigation bindings enable browsing content, copying text, selecting from lists, and navigating specialized dialogs. These contexts activate based on what's visible or focused.

## Scroll Context

Active when scrollable content is visible (messages, transcript, files).

### Scroll Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `pageup` | `scroll:pageUp` | Scroll up one page. |
| `pagedown` | `scroll:pageDown` | Scroll down one page. |
| `wheelup` | `scroll:lineUp` | Scroll up one line (mouse wheel equivalent). |
| `wheeldown` | `scroll:lineDown` | Scroll down one line. |
| `ctrl+home` | `scroll:top` | Jump to top of scrollable content. |
| `ctrl+end` | `scroll:bottom` | Jump to bottom of scrollable content. |

### Selection Copy

| Key | Action | Description | Platform |
|-----|--------|-------------|----------|
| `ctrl+shift+c` | `selection:copy` | Copy selected text to clipboard. Standard terminal copy. | All |
| `cmd+c` | `selection:copy` | Copy selected text (kitty keyboard protocol). | macOS, Linux, kitty-capable terminals |

**Note**: `cmd+c` on macOS normally triggers system copy. Claude Code's `cmd+c` binding fires only on terminals using the kitty protocol (kitty, WezTerm, ghostty, iTerm2) where `cmd` reaches the TTY. On standard terminals, `cmd+c` is intercepted by the OS and never reaches the app; use `ctrl+shift+c` instead.

## Autocomplete Context

Active when autocomplete menu is visible while typing a prompt.

| Key | Action | Description |
|-----|--------|-------------|
| `tab` | `autocomplete:accept` | Accept the highlighted suggestion. |
| `escape` | `autocomplete:dismiss` | Dismiss autocomplete menu. |
| `up` | `autocomplete:previous` | Highlight previous suggestion. |
| `down` | `autocomplete:next` | Highlight next suggestion. |

Autocomplete appears while typing; navigate suggestions and press Tab to insert.

## Attachments Context

Active when selecting image attachments in a select dialog.

| Key | Action | Description |
|-----|--------|-------------|
| `left` | `attachments:previous` | Select previous image. |
| `right` | `attachments:next` | Select next image. |
| `backspace` | `attachments:remove` | Remove selected attachment. |
| `delete` | `attachments:remove` | Remove selected attachment (alternative). |
| `down` | `attachments:exit` | Exit attachment picker. |
| `escape` | `attachments:exit` | Exit attachment picker. |

## MessageSelector Context

Active when rewind dialog is open (message selection for undoing changes).

### Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `up` | `messageSelector:up` | Select previous message. |
| `down` | `messageSelector:down` | Select next message. |
| `k` | `messageSelector:up` | Select previous (vi-style). |
| `j` | `messageSelector:down` | Select next (vi-style). |
| `ctrl+p` | `messageSelector:up` | Previous (readline-style). |
| `ctrl+n` | `messageSelector:down` | Next (readline-style). |

### Bulk Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `meta+up` | `messageSelector:top` | Jump to first message. |
| `shift+up` | `messageSelector:top` | Jump to first message (alternative). |
| `ctrl+up` | `messageSelector:top` | Jump to first message (alternative). |
| `shift+k` | `messageSelector:top` | Jump to first message (vi-style). |
| `meta+down` | `messageSelector:bottom` | Jump to last message. |
| `shift+down` | `messageSelector:bottom` | Jump to last message (alternative). |
| `ctrl+down` | `messageSelector:bottom` | Jump to last message (alternative). |
| `shift+j` | `messageSelector:bottom` | Jump to last message (vi-style). |

### Selection

| Key | Action | Description |
|-----|--------|-------------|
| `enter` | `messageSelector:select` | Rewind to selected message. |

## DiffDialog Context

Active when diff viewer is open (showing file changes).

### Navigation

| Key | Action | Description |
|-----|--------|-------------|
| `left` | `diff:previousSource` | Previous source (original file or previous version). |
| `right` | `diff:nextSource` | Next source (modified file or next version). |
| `up` | `diff:previousFile` | Previous file in diff set. |
| `down` | `diff:nextFile` | Next file in diff set. |

### Actions

| Key | Action | Description |
|-----|--------|-------------|
| `enter` | `diff:viewDetails` | Open detailed view of selected file. |
| `escape` | `diff:dismiss` | Close diff dialog. |

## Footer Context

Active when footer indicators (tasks, teams, diffs, loops) are focused.

| Key | Action | Description |
|-----|--------|-------------|
| `up` | `footer:up` | Previous indicator. |
| `ctrl+p` | `footer:up` | Previous indicator (readline-style). |
| `down` | `footer:down` | Next indicator. |
| `ctrl+n` | `footer:down` | Next indicator (readline-style). |
| `left` | `footer:previous` | Cycle within indicator (e.g., previous task). |
| `right` | `footer:next` | Cycle within indicator (next task). |
| `enter` | `footer:openSelected` | Open/focus selected indicator. |
| `escape` | `footer:clearSelection` | Deselect indicator. |

Footer indicators include running tasks, team activity, pending diffs, and loop status.

## Tabs Context

Active during tab navigation mode.

| Key | Action | Description |
|-----|--------|-------------|
| `tab` | `tabs:next` | Next tab. |
| `shift+tab` | `tabs:previous` | Previous tab. |
| `right` | `tabs:next` | Next tab (arrow equivalent). |
| `left` | `tabs:previous` | Previous tab (arrow equivalent). |

Tab context activates in multi-tab interfaces (some projects, chat sessions, etc.).

## Customization Examples

### Change scroll page size

Scroll bindings (pageup/pagedown) are fixed size; you cannot customize line count via keybindings. Use terminal height to adjust visual page size.

### Add vi-style scroll bindings

```json
{
  "Scroll": {
    "ctrl+u": "scroll:pageUp",
    "ctrl+d": "scroll:pageDown"
  }
}
```

### Rebind attachment navigation

```json
{
  "Attachments": {
    "h": "attachments:previous",
    "l": "attachments:next"
  }
}
```

## Notes

- **Scroll context always active**: Scroll bindings are available whenever there's scrollable content, even if other contexts are layered (e.g., a dialog over a transcript).
- **Copy requires selection**: Text must be selected (highlighted) before copy works. Selection is done via mouse or shift+arrow keys (when supported).
- **Vi-style keys**: Multiple bindings for navigation (j/k, up/down, ctrl+p/n) cater to different user preferences.
- **Tab context transient**: Tab navigation activates only in specific multi-tab scenarios; most single-chat interfaces don't use tabs.

---

[← Back to Keybindings/README.md](./README.md)
