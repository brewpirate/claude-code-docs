# Platform Quirks

Terminal capabilities, OS interceptors, and platform-specific keybinding behaviors that affect how Claude Code receives and processes keys.

## Windows Terminal VT Mode

### The Issue

Modifier-only chord sequences (like `shift+tab`) may fail on Windows Terminal without **VT (Virtual Terminal) mode** enabled. This is a longstanding Windows Terminal limitation.

See: https://github.com/microsoft/terminal/issues/879

### Solution: VT Mode Detection

Claude Code detects VT mode support at runtime:

- **Node.js**: Enabled in 22.17.0 and 24.2.0+ (not 23.x)
- **Bun**: Enabled in 1.2.23+

If running with an older version on Windows Terminal without VT mode, modifier-only chords don't reach Claude Code; the terminal intercepts them.

### Workaround

If you're on Windows Terminal with `shift+tab` not working for editor mode cycling, Claude Code falls back to **`meta+m`** instead.

**Feature detection (from defaultBindings.ts)**:

```typescript
const SUPPORTS_TERMINAL_VT_MODE =
  getPlatform() !== 'windows' ||
  (isRunningWithBun()
    ? satisfies(process.versions.bun, '>=1.2.23')
    : satisfies(process.versions.node, '>=22.17.0 <23.0.0 || >=24.2.0'))

const MODE_CYCLE_KEY = SUPPORTS_TERMINAL_VT_MODE ? 'shift+tab' : 'meta+m'
```

### Recommendation

- **Windows Terminal 1.22+** users: Keep your Node/Bun runtime updated.
- **Older Windows Terminal or third-party terminals**: Use `meta+m` for editor mode cycling.

## macOS System Key Interception

### Cmd Key Bindings

macOS intercepts **all `cmd+*` combinations** at the OS level; they do not reach Claude Code. This includes:

| Key | OS Action | Severity |
|-----|-----------|----------|
| `cmd+c` | System copy | Error |
| `cmd+v` | System paste | Error |
| `cmd+x` | System cut | Error |
| `cmd+q` | Quit application | Error |
| `cmd+w` | Close window | Error |
| `cmd+tab` | App switcher | Error |
| `cmd+space` | Spotlight | Error |

**These keys are reserved and cannot be used in Claude Code.**

### Exception: Kitty Keyboard Protocol

If you're using a terminal with **kitty keyboard protocol** support, the `cmd` key can reach Claude Code because the protocol bypasses the OS clipboard interception.

Terminals with kitty protocol:
- kitty
- WezTerm
- ghostty
- iTerm2 (partial)

**Example**: `cmd+shift+f` for global search works on these terminals but not on stock macOS Terminal.

### Portable Alternatives

Use `meta+` or `ctrl+shift+` instead of `cmd+`:

- `meta+p` (portable) vs. `cmd+p` (kitty-protocol only)
- `ctrl+shift+f` (portable) vs. `cmd+shift+f` (kitty-protocol only)

## Linux Meta & Ctrl Variations

### Modifier Mapping

On Linux terminals, `meta` typically maps to `alt` unless running in a kitty terminal (where `meta` = `super` / `cmd`).

| Modifier | Standard Linux | Kitty Protocol |
|----------|---|---|
| `meta` | `alt` | `super` / `cmd` |
| `cmd` | Not available | Available |

### Recommendation

- **Standard Linux terminals**: Use `alt+` or `ctrl+shift+`.
- **Kitty terminal**: Both `meta` and `cmd` work; use whichever feels natural.

## Image Paste Platform Differences

### Auto-Detection

Claude Code automatically selects the correct image paste key per platform:

| Platform | Key | Reason |
|----------|-----|--------|
| Windows | `alt+v` | Ctrl+V is reserved for system paste |
| macOS | `ctrl+v` | System paste is `cmd+v` |
| Linux | `ctrl+v` | System paste is `ctrl+v`, but intercepted by some DMs |

### Customization

If the auto-selected key conflicts with your setup, rebind in `keybindings.json`:

```json
{
  "Chat": {
    "ctrl+alt+i": "chat:imagePaste"
  }
}
```

## Tmux Prefix Collision

### The Issue

`ctrl+b` is used by Claude Code for backgrounding tasks, but it's also the default tmux prefix key.

When you press `ctrl+b` in a tmux session running Claude Code:

1. **First `ctrl+b` press**: Captured by tmux (prefix mode activated).
2. **Second key**: Depends on what you press.
3. **To reach Claude Code**: Press `ctrl+b` twice in rapid succession.

### Example Flow

```
tmux session $ <ctrl+b> <ctrl+b>    # Double-tap ctrl+b
                       ↑ tmux sees this and enters prefix mode
                               ↑ Claude Code receives this
Claude Code: Task backgrounded
```

### Workaround Options

1. **Rebind Claude Code's background key** to something else that doesn't conflict:

```json
{
  "Task": {
    "ctrl+alt+b": "task:background"
  }
}
```

2. **Rebind tmux prefix** if you prefer (in `~/.tmux.conf`):

```sh
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix
```

Then Claude Code's `ctrl+b` works on first press.

3. **Use a different terminal multiplexer** (screen, zellij, etc.) if the conflict is frequent.

## Copy Key Variations

### Portable vs. Protocol-Specific

| Key | Platform | Terminal | Works |
|-----|----------|----------|-------|
| `ctrl+shift+c` | All | Any | ✓ |
| `cmd+c` | macOS only | Kitty protocol | ✓ |
| `cmd+c` | macOS only | Standard Terminal.app | ✗ (OS-intercepted) |

**Recommendation**: Use `ctrl+shift+c` for maximum compatibility.

## Terminal Control Signal Interception

### Signals That Reach Claude Code

| Signal | Key | Platform | Severity |
|--------|-----|----------|----------|
| SIGTSTP (suspend) | `ctrl+z` | Unix/Linux/macOS | Warning (stops the process) |
| SIGQUIT (quit) | `ctrl+\\` | Unix/Linux/macOS | Error (terminates the app) |
| SIGINT (interrupt) | `ctrl+c` | All | Error (hardcoded, non-rebindable) |

### Notes

- `ctrl+z` is catchable; Claude Code doesn't bind it, so the OS suspends the process. Press `fg` in the shell to resume.
- `ctrl+\\` terminates Claude Code.
- `ctrl+c` is hardcoded for interrupt; no user override is allowed.

## Line Endings & Flow Control

### Flow Control (xoff/xon)

- `ctrl+s` (XOFF): Pauses output. **Not reserved** because most modern terminals disable flow control by default.
- `ctrl+q` (XON): Resumes output. **Not reserved** for the same reason.

Claude Code uses `ctrl+s` for stashing prompts, which works on most modern systems.

**Caveat**: If you're on an older system with flow control enabled, `ctrl+s` may suspend output. Disable flow control in your terminal (e.g., `stty -ixon` in bash).

## Terminal Emulator Capabilities

### Tested/Verified Compatibility

| Emulator | Shift+Tab | Cmd Keys | Kitty Protocol | Notes |
|----------|-----------|----------|---|---|
| **Windows Terminal** 1.22+ | ✓ | N/A | No | VT mode enabled in Node 24.2+, Bun 1.2.23+ |
| **iTerm2** (macOS) | ✓ | Partial | Partial | Kitty protocol support (beta) |
| **Terminal.app** (macOS) | ✓ | ✗ | No | System intercepts `cmd+*`; use `meta+` |
| **GNOME Terminal** | ✓ | N/A | No | Standard Linux terminal |
| **Konsole** (KDE) | ✓ | N/A | No | Standard Linux terminal |
| **kitty** | ✓ | ✓ | ✓ | Full support for all keys |
| **WezTerm** | ✓ | ✓ | ✓ | Full support; kitty protocol optional |
| **ghostty** | ✓ | ✓ | ✓ | Full support |
| **tmux** | ✓ (with prefix collision) | N/A | Depends on outer terminal | Inherits capabilities from host terminal |
| **screen** | ✓ | N/A | No | Older multiplexer; limited key support |

## Recommendation Summary

| Scenario | Recommendation |
|----------|---|
| Windows Terminal | Update Node/Bun; use `shift+tab` or `meta+m` |
| macOS + Terminal.app | Use `ctrl+shift+*` or `meta+*` (not `cmd+*`) |
| macOS + kitty/WezTerm | Use `cmd+*` or `meta+*` freely |
| Linux (standard) | Use `ctrl+shift+*` or `alt+*` |
| Linux + kitty | Use `meta+*` or `super+*` |
| tmux | Rebind `ctrl+b` for Claude Code or use double-tap |

---

[← Back to Keybindings/README.md](./README.md)
