# UI & Display


### `theme`
- **Type:** string
- **Default:** unspecified
- **Description:** UI theme preference. Examples: `"dark"`, `"light"`, `"auto"`. Controls the color scheme and visual appearance of the interface.
- **Example:**
  ```json
  {
    "theme": "dark"
  }
  ```

### `statusLine.type`
- **Type:** string
- **Default:** unspecified
- **Description:** Configure status line mode: `"command"` for custom script, or a built-in type. Used with `statusLine.command` to provide context display.
- **Example:**
  ```json
  {
    "statusLine": {
      "type": "command"
    }
  }
  ```

### `statusLine.command`
- **Type:** string
- **Default:** unspecified
- **Description:** Custom status line command (shell path) to display context. Receives environment variables including `CLAUDE_PROJECT_DIR` and outputs text to display in the status line.
- **Example:**
  ```json
  {
    "statusLine": {
      "type": "command",
      "command": "~/.claude/statusline.sh"
    }
  }
  ```

### `outputStyle`
- **Type:** string
- **Default:** unspecified
- **Description:** Configure an output style to adjust the system prompt. Examples: `"Explanatory"`, `"Concise"`, `"Technical"`. Influences how Claude formats responses.
- **Example:**
  ```json
  {
    "outputStyle": "Explanatory"
  }
  ```

### `viewMode`
- **Type:** string
- **Default:** unspecified
- **Description:** Default transcript view mode on startup: `"default"`, `"verbose"`, or `"focus"`. Overrides the sticky `/focus` selection when set.
- **Example:**
  ```json
  {
    "viewMode": "verbose"
  }
  ```

### `prefersReducedMotion`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Reduce or disable UI animations (spinners, shimmer, flash effects) for accessibility. When enabled, the interface uses static display without animated elements.
- **Example:**
  ```json
  {
    "prefersReducedMotion": true
  }
  ```

### `showThinkingSummaries`
- **Type:** boolean
- **Default:** false
- **Description:** Show extended thinking (Claude's reasoning mode) summaries in interactive sessions. When unset or `false` (default in interactive mode), thinking blocks are redacted and shown as a collapsed stub. Non-interactive mode and SDK callers always receive summaries.
- **Example:**
  ```json
  {
    "showThinkingSummaries": true
  }
  ```

### `showClearContextOnPlanAccept`
- **Type:** boolean
- **Default:** false
- **Description:** Show the "clear context" option on the plan accept screen. Defaults to `false`. Set to `true` to restore the option.
- **Example:**
  ```json
  {
    "showClearContextOnPlanAccept": true
  }
  ```

### `showTurnDuration`
- **Type:** boolean
- **Default:** true
- **Description:** Show turn duration messages after responses, e.g. "Cooked for 1m 6s". Displays timing information for each API call and response generation.
- **Example:**
  ```json
  {
    "showTurnDuration": false
  }
  ```

### `spinnerTipsEnabled`
- **Type:** boolean
- **Default:** true
- **Description:** Show tips in the spinner while Claude is working. Set to `false` to disable tips and use a simpler spinner display.
- **Example:**
  ```json
  {
    "spinnerTipsEnabled": false
  }
  ```

### `spinnerTipsOverride`
- **Type:** object
- **Default:** unspecified
- **Description:** Override spinner tips with custom strings. Contains `tips` (array of tip strings) and `excludeDefault` (boolean). When `excludeDefault` is `true`, only custom tips are shown; when `false` or absent, custom tips are merged with built-in tips.
- **Example:**
  ```json
  {
    "spinnerTipsOverride": {
      "excludeDefault": true,
      "tips": ["Use our internal tool X"]
    }
  }
  ```

### `spinnerVerbs`
- **Type:** object
- **Default:** unspecified
- **Description:** Customize the action verbs shown in the spinner and turn duration messages. Contains `mode` (`"replace"` or `"append"`) and `verbs` (array of verb strings). Use `"replace"` to use only your verbs, or `"append"` to add them to defaults.
- **Example:**
  ```json
  {
    "spinnerVerbs": {
      "mode": "append",
      "verbs": ["Pondering", "Crafting"]
    }
  }
  ```

### `terminalProgressBarEnabled`
- **Type:** boolean
- **Default:** true
- **Description:** Show terminal progress bars in supported terminals: ConEmu, Ghostty 1.2.0+, and iTerm2 3.6.6+. Displays visual progress during operations.
- **Example:**
  ```json
  {
    "terminalProgressBarEnabled": false
  }
  ```

### `autoUpdatesChannel`
- **Type:** string
- **Default:** unspecified
- **Description:** Release channel to follow for updates. Use `"stable"` for a version typically about one week old that skips major regressions, or `"latest"` (default) for the most recent release.
- **Example:**
  ```json
  {
    "autoUpdatesChannel": "stable"
  }
  ```

### `minimumVersion`
- **Type:** string
- **Default:** unspecified
- **Description:** Floor that prevents background auto-updates and `claude update` from installing a version below this one. Switching from `"latest"` channel to `"stable"` via `/config` prompts to stay on current version or downgrade. Useful in managed settings to pin an organization-wide minimum version.
- **Example:**
  ```json
  {
    "minimumVersion": "2.1.100"
  }
  ```

### `tui`
- **Type:** string
- **Default:** unspecified
- **Description:** Terminal UI renderer. Use `"fullscreen"` for the flicker-free alt-screen renderer with virtualized scrollback. Use `"default"` for the classic main-screen renderer. Set via `/tui`.
- **Example:**
  ```json
  {
    "tui": "fullscreen"
  }
  ```

---

[← Back to settings/README.md](./README.md)
