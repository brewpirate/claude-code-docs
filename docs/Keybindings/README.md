# Claude Code Keybindings

Reference for keyboard shortcuts shipped with Claude Code, platform quirks, and how to customize them.

## Table of Contents

1. [How keybindings work](./how-keybindings-work.md)
2. [Global bindings](./global-bindings.md)
3. [Chat bindings](./chat-bindings.md)
4. [Navigation bindings](./navigation-bindings.md)
5. [Dialog & menu bindings](./dialog-bindings.md)
6. [Platform quirks](./platform-quirks.md)
7. [Customization](./customization.md)
8. [Discrepancies & notes](./discrepancies-notes.md)

## Overview

**18 contexts** with **80+ shipped bindings** across global, chat, selection, dialog, and specialized modes.

| Context | Purpose | Primary Keys |
|---------|---------|--------------|
| Global | Always active | ctrl+c, ctrl+d, ctrl+l, ctrl+r, ctrl+shift+f |
| Chat | Chat input focus | enter, escape, meta+p, meta+o, meta+t |
| Autocomplete | Suggestion menu | tab, escape, up, down |
| Confirmation | Permission/choice dialogs | y, n, enter, escape, up, down |
| Settings | Settings panel | up, down, space, enter, / |
| Help | Help overlay | escape |
| Transcript | Transcript view | escape, q, ctrl+e, ctrl+c |
| HistorySearch | History search mode | ctrl+r, escape, tab, enter |
| Task | Running task/agent | ctrl+b |
| ThemePicker | Theme picker | ctrl+t |
| Tabs | Tab navigation | tab, shift+tab, left, right |
| Attachments | Image attachment nav | left, right, backspace, delete |
| Footer | Footer indicators (tasks, teams, diff) | up, down, left, right, enter |
| MessageSelector | Rewind/message selection | up, down, shift+up, shift+down, enter |
| DiffDialog | Diff viewer | left, right, up, down, enter, escape |
| ModelPicker | Model selection (ANT only) | left, right |
| Select | Generic list/choice | up, down, j, k, enter, escape |
| MessageActions | Message action menu (gated) | up, down, c, p, enter, escape |

## Quick Reference

All shipped bindings by key, with context, action, feature gate (if any), and platform.

| Key | Action | Context | Feature Gate | Platform |
|-----|--------|---------|--------------|----------|
| `ctrl+c` | Interrupt | Global | — | All |
| `ctrl+d` | Exit | Global | — | All |
| `ctrl+l` | Redraw screen | Global | — | All |
| `ctrl+t` | Toggle todos | Global | — | All |
| `ctrl+o` | Toggle transcript | Global | — | All |
| `ctrl+shift+b` | Toggle brief | Global | KAIROS or KAIROS_BRIEF | All |
| `ctrl+shift+o` | Toggle teammate preview | Global | — | All |
| `ctrl+r` | History search | Global, HistorySearch | — | All |
| `ctrl+shift+f` | Global search | Global | QUICK_SEARCH | All |
| `cmd+shift+f` | Global search | Global | QUICK_SEARCH | All |
| `ctrl+shift+p` | Quick open | Global | QUICK_SEARCH | All |
| `cmd+shift+p` | Quick open | Global | QUICK_SEARCH | All |
| `meta+j` | Toggle terminal | Global | TERMINAL_PANEL | All |
| `escape` | Cancel prompt / dismiss dialog | Chat, Confirmation, Help, Transcript, HistorySearch, DiffDialog, MessageActions | — | All |
| `ctrl+x ctrl+k` | Kill agents | Chat | — | All |
| `shift+tab` | Cycle editor mode | Chat | — | Windows 24.2+, macOS, Linux |
| `meta+m` | Cycle editor mode | Chat | — | Windows <24.2 |
| `meta+p` | Open model picker | Chat | — | All |
| `meta+o` | Toggle fast mode | Chat | — | All |
| `meta+t` | Toggle thinking | Chat | — | All |
| `enter` | Submit prompt / select item | Chat, Confirmation, HistorySearch, MessageSelector, DiffDialog, MessageActions, Select | — | All |
| `up` | History previous / navigate up | Chat, Confirmation, Settings, Tabs, Attachments, Footer, MessageSelector, Select, MessageActions, DiffDialog | — | All |
| `down` | History next / navigate down | Chat, Confirmation, Settings, Tabs, Attachments, Footer, MessageSelector, Select, MessageActions, DiffDialog | — | All |
| `ctrl+_` | Undo | Chat | — | All |
| `ctrl+shift+-` | Undo (Kitty protocol) | Chat | — | All |
| `ctrl+x ctrl+e` | Open external editor | Chat | — | All |
| `ctrl+g` | Open external editor | Chat | — | All |
| `ctrl+s` | Stash prompt | Chat | — | All |
| `alt+v` | Paste images | Chat | — | Windows |
| `ctrl+v` | Paste images | Chat | — | macOS, Linux |
| `shift+up` | Message actions / prev user msg | Chat, MessageSelector, MessageActions | MESSAGE_ACTIONS | All |
| `space` | Voice push-to-talk / toggle selection | Chat, Confirmation, Settings | VOICE_MODE (Chat only) | All |
| `tab` | Accept autocomplete / next field / next tab | Autocomplete, Confirmation, Tabs | — | All |
| `shift+tab` | Previous tab / cycle mode | Tabs, Confirmation | — | All |
| `y` | Confirm yes | Confirmation | — | All |
| `n` | Confirm no | Confirmation | — | All |
| `ctrl+e` | Toggle explanation / toggle syntax highlight | Confirmation, Transcript, ThemePicker | — | All |
| `ctrl+d` | Toggle permission debug info | Confirmation | — | All |
| `/` | Search settings | Settings | — | All |
| `r` | Retry loading usage data | Settings | — | All |
| `j` | Navigate down (vi-style) | Settings, MessageSelector, Select, MessageActions | — | All |
| `k` | Navigate up (vi-style) | Settings, MessageSelector, Select, MessageActions | — | All |
| `ctrl+p` | Previous / up | Settings, MessageSelector, Select, Footer | — | All |
| `ctrl+n` | Next / down | Settings, MessageSelector, Select, Footer | — | All |
| `q` | Exit transcript | Transcript | — | All |
| `left` | Previous item / prev file | Tabs, Attachments, Footer, DiffDialog, MessageSelector, ModelPicker | — | All |
| `right` | Next item / next file | Tabs, Attachments, Footer, DiffDialog, MessageSelector, ModelPicker | — | All |
| `pageup` | Page up | Scroll | — | All |
| `pagedown` | Page down | Scroll | — | All |
| `wheelup` | Scroll up one line | Scroll | — | All |
| `wheeldown` | Scroll down one line | Scroll | — | All |
| `ctrl+home` | Jump to top | Scroll | — | All |
| `ctrl+end` | Jump to bottom | Scroll | — | All |
| `ctrl+shift+c` | Copy selection | Scroll | — | All |
| `cmd+c` | Copy selection (kitty protocol) | Scroll | — | macOS, Linux, kitty |
| `ctrl+b` | Background task (tmux: press twice) | Task | — | All |
| `meta+up` | Jump to top / first item | MessageSelector, MessageActions | — | All |
| `meta+down` | Jump to bottom / last item | MessageSelector, MessageActions | — | All |
| `super+up` | Jump to top | MessageActions | — | All |
| `super+down` | Jump to bottom | MessageActions | — | All |
| `shift+down` | Next user message | MessageActions | MESSAGE_ACTIONS | All |
| `ctrl+up` | Jump to top | MessageSelector | — | All |
| `ctrl+down` | Jump to bottom | MessageSelector | — | All |
| `shift+k` | Jump to top (vi-style) | MessageSelector | — | All |
| `shift+j` | Jump to bottom (vi-style) | MessageSelector | — | All |
| `c` | Copy / accept action (MessageActions) | MessageActions | MESSAGE_ACTIONS | All |
| `p` | Paste / accept action (MessageActions) | MessageActions | MESSAGE_ACTIONS | All |
| `ctrl+c` | Exit message actions | MessageActions | MESSAGE_ACTIONS | All |

**Total bindings: 85+**

## See Also

- [../Settings/ui-display.md](../Settings/ui-display.md) — UI display settings that affect key behavior.
- [../Commands/](../Commands/) — built-in commands including `/keybindings`.
- [../ENV/README.md](../ENV/README.md) — environment variables for terminal detection.
- Official docs: https://code.claude.com/docs/en/keyboard-shortcuts
