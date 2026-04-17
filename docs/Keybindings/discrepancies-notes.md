# Discrepancies & Notes

Undocumented keybindings, edge cases, implementation notes, and divergences between this documentation and the source code.

## Undocumented Actions

The following actions exist in the codebase but are not documented in the quick reference or section files. They may be internal, deprecated, or feature-gated in ways not obvious from the registry.

### Potential Internal Actions

These are inferred from the keybinding action namespace but lack public documentation:

- `chat:startOfLine`, `chat:endOfLine`, `chat:forwardChar`, `chat:backChar` — Readline editing (may not be exposed; check defaultBindings.ts)
- `chat:redo` — Opposite of undo (not listed in shipped defaults)
- `selection:clear` — Clear selection (not listed)
- `tabs:toggleTab` — Toggle a specific tab (vs. cycling)
- `footer:cycle` — Cycle indicators (vs. separate prev/next)

**Status**: Bindings source (defaultBindings.ts) does not include these; they may be deprecated or internal-only.

## Reserved But Undocumented

The following keys are likely reserved but not explicitly listed in NON_REBINDABLE or TERMINAL_RESERVED:

- `ctrl+m` — Equivalent to Enter in terminal protocol; explicitly listed as non-rebindable in reservedShortcuts.ts but not in the quick reference.
- `ctrl+s` — XOFF (pause) in legacy flow control, but modern terminals disable it by default. Claude Code uses it for `chat:stash`, which works on most systems. Caveat: Older systems or SSH sessions with flow control enabled may have issues.
- `ctrl+q` — XON (resume) in legacy flow control. Not explicitly reserved; could potentially cause issues on old systems.

## Platform-Specific Action Mappings

### Editor Mode Cycling

Two bindings map to `chat:cycleMode` depending on platform:

| Platform | Binding | Reason |
|----------|---------|--------|
| Windows <24.2 without VT | `meta+m` | Shift+Tab not supported without VT mode |
| Windows 24.2+ / All others | `shift+tab` | VT mode supported; shift+tab works |

This is **automatic runtime detection**, not user-configurable.

### Image Paste

Platform-specific binding is auto-selected based on `getPlatform()`:

| Platform | Binding | Reason |
|----------|---------|--------|
| Windows | `alt+v` | Ctrl+V reserved for system paste |
| macOS / Linux | `ctrl+v` | System paste is cmd+v (macOS) or handled differently (Linux) |

This is **automatic**, not configurable via keybindings.json.

## Feature Gates Not Listed

The following contexts/bindings have feature gates that may not be immediately obvious:

| Feature Gate | Bindings Affected | Requirement |
|---|---|---|
| `QUICK_SEARCH` | Global search, Quick open (ctrl+shift+f/p, cmd+shift+f/p) | Feature flag must be enabled |
| `TERMINAL_PANEL` | Toggle terminal (meta+j) | Terminal panel feature must be enabled |
| `KAIROS` or `KAIROS_BRIEF` | Toggle brief (ctrl+shift+b) | Brief mode feature must be enabled |
| `MESSAGE_ACTIONS` | Message actions menu (shift+up in Chat, entire MessageActions context) | Feature flag must be enabled |
| `VOICE_MODE` | Voice push-to-talk (space in Chat) | Voice feature must be enabled |

If a feature is disabled, its bindings do not appear in the registry; rebinding them has no effect.

## Chord Limitations & Edge Cases

### Maximum Chord Depth

Claude Code supports **two-step chords** (e.g., `ctrl+x ctrl+e`). Deeper sequences (three or more steps) are not officially supported:

```json
{
  "Chat": {
    "ctrl+x ctrl+e": "chat:externalEditor"
  }
}
```

Works. This won't:

```json
{
  "Chat": {
    "ctrl+x ctrl+e shift+r": "undefined"
  }
}
```

Not supported.

### Chord Timing

The gap between chord steps is **not configurable**. Claude Code uses a hardcoded timeout (likely 500-1000ms based on typical TUI conventions). If you're slow, the chord resets.

Example: You press `ctrl+x`, wait 2 seconds, then press `ctrl+e`. The app treats this as two separate key events, not a chord.

## Context Layering & Precedence

### Active Contexts

At any given time, multiple contexts may be active:

1. Global (always)
2. One primary context (e.g., Chat, Settings)
3. Optional secondary (e.g., Scroll overlayed on Transcript)

**Precedence**: Most-specific context wins. If a key is bound in both Global and Chat, and Chat is active, Chat's binding is used.

### Scroll Overlays

Scroll context is not a standalone context; scroll bindings are available whenever content is scrollable, even if another context (e.g., MessageSelector) is active. This means:

```
Chat (primary) + Scroll (overlay)
→ pageup triggers scroll:pageUp (not chat:submit)
```

### Dialog Stacking

Dialogs may stack (e.g., Confirmation dialog on top of Settings). The topmost dialog's context takes precedence.

## Copy Behavior & Kitty Protocol

### `cmd+c` Binding Quirks

On macOS without kitty protocol:

- `cmd+c` is intercepted by the OS and never reaches Claude Code.
- The binding is registered but never fires.
- Users should use `ctrl+shift+c` for portability.

On kitty/WezTerm/ghostty with kitty protocol:

- `cmd+c` reaches Claude Code and triggers `selection:copy`.
- Works as expected.

### `ctrl+shift+c` Fallback

`ctrl+shift+c` is the portable binding for all platforms and terminals. It's always active and redundant with `cmd+c` on kitty terminals (both work).

## Reserved but Usable in Special Cases

### `ctrl+s` (XOFF) & `ctrl+q` (XON)

Legacy flow control keys. Claude Code binds `ctrl+s` to `chat:stash` because:

1. **Most modern terminals disable flow control by default.**
2. **SSH sessions** may still have flow control enabled (caveat for remote users).

If you use SSH and encounter issues with stashing, disable flow control in your shell:

```bash
stty -ixon
```

Then `ctrl+s` works reliably.

## Validation Gaps

### No Circular Binding Detection

If you accidentally create a binding that maps to itself, Claude Code doesn't warn you:

```json
{
  "Chat": {
    "ctrl+r": "chat:undo",
    "undo": "ctrl+r"
  }
}
```

(This is not possible with the JSON structure, but illustrates the point: there's no circular-dependency check.)

### No Unused Binding Detection

If you bind a key to a valid action that's not available in that context, Claude Code doesn't warn:

```json
{
  "Settings": {
    "enter": "chat:submit"
  }
}
```

This binding is silently ignored because Settings context doesn't handle `chat:submit`.

## Implementation Notes from Source

### Action Namespace Validation

The schema (schema.ts) defines all valid action identifiers. During keybinding resolution, the resolver checks if the bound action exists. If it doesn't, a warning is logged but startup continues.

### Context Name Validation

KEYBINDING_CONTEXTS in schema.ts lists all valid context names. Custom contexts are not supported; unrecognized context names in keybindings.json are ignored silently.

### Modifier Normalization

Modifiers are normalized during parsing:

- `control` → `ctrl`
- `option` / `opt` → `alt`
- `command` / `cmd` → `cmd` (or platform-specific mapping)
- `Command` / `CTRL` → lowercase

This means `Control+A` and `ctrl+a` are equivalent after normalization.

## Known Limitations

1. **No dynamic rebinding**: Keybindings are loaded at startup. Changes to `keybindings.json` require a restart.
2. **No context-aware help**: No built-in command to show available bindings for current context (e.g., `/keybindings chat`).
3. **No binding export**: No command to export your custom bindings in a portable format.
4. **No conflict warnings**: Duplicate bindings across contexts (in different layers) don't warn; last-wins silently.
5. **No platform-specific conditions**: keybindings.json cannot branch on platform (use symlinks or manual management).

## Recommendations for Documentation Updates

These items should be clarified in future docs:

1. **Explicit feature gate list**: A comprehensive table of all feature-gated bindings with current gate status.
2. **Context hierarchy diagram**: Visual showing which contexts overlap and precedence.
3. **Examples per platform**: Windows-specific, macOS-specific, Linux-specific examples.
4. **Troubleshooting flowchart**: Decision tree for debugging non-working bindings.
5. **Integration with `/settings`**: How keybindings interact with `/settings` feature toggles.

## See Also

- [reservedShortcuts.ts](../../Downloads/claude-code-main/keybindings/reservedShortcuts.ts) — Source: reserved key definitions.
- [defaultBindings.ts](../../Downloads/claude-code-main/keybindings/defaultBindings.ts) — Source: shipped keybinding registry.
- [schema.ts](../../Downloads/claude-code-main/keybindings/schema.ts) — Source: valid contexts and actions.
- [Platform Quirks](./platform-quirks.md) — Detailed platform-specific behaviors.

---

[← Back to Keybindings/README.md](./README.md)
