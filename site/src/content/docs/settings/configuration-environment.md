---
title: "Configuration & Environment"
tags: [settings]
---

# Configuration & Environment


### `env`
- **Type:** object
- **Default:** unspecified
- **Description:** Environment variables to be injected into all sessions. Merged across settings scopes.
- **Example:**
  ```json
  {
    "env": {
      "FOO": "bar",
      "CLAUDE_CODE_ENABLE_TELEMETRY": "1"
    }
  }
  ```

### `defaultShell`
- **Type:** string
- **Default:** `"bash"`
- **Description:** Default shell for input-box `!` commands and interactive execution. Accepts `"bash"` (default) or `"powershell"`. Setting `"powershell"` routes interactive `!` commands through PowerShell on Windows. Requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`.
- **Example:**
  ```json
  {
    "defaultShell": "powershell"
  }
  ```

### `language`
- **Type:** string
- **Default:** unspecified
- **Description:** Configure Claude's preferred response language (e.g., `"japanese"`, `"spanish"`, `"french"`). Claude will respond in this language by default. Also sets the voice dictation language.
- **Example:**
  ```json
  {
    "language": "japanese"
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
