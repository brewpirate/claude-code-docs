---
title: "Development Tools & IDE"
tags: [settings]
---

# Development Tools & IDE


### `autoConnectIde`
- **Type:** boolean
- **Default:** false
- **Description:** Automatically connect to a running IDE when Claude Code starts from an external terminal. Appears in `/config` as **Auto-connect to IDE (external terminal)**.
- **Example:**
  ```json
  {
    "autoConnectIde": true
  }
  ```

### `autoInstallIdeExtension`
- **Type:** boolean
- **Default:** true
- **Description:** Automatically install the Claude Code IDE extension when running from a VS Code or JetBrains terminal. Appears in `/config` as **Auto-install IDE extension**. You can also set the `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` environment variable to override.
- **Example:**
  ```json
  {
    "autoInstallIdeExtension": false
  }
  ```

### `editorMode`
- **Type:** string
- **Default:** `"normal"`
- **Description:** Key binding mode for the input prompt: `"normal"` or `"vim"`. Appears in `/config` as **Editor mode**.
- **Example:**
  ```json
  {
    "editorMode": "vim"
  }
  ```

### `includeGitInstructions`
- **Type:** boolean
- **Default:** true
- **Description:** Include built-in commit and PR workflow instructions and the git status snapshot in Claude's system prompt. Set to `false` to remove both, for example when using your own git workflow skills. The `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` environment variable takes precedence over this setting.
- **Example:**
  ```json
  {
    "includeGitInstructions": false
  }
  ```

### `respectGitignore`
- **Type:** boolean
- **Default:** true
- **Description:** Control whether the `@` file picker respects `.gitignore` patterns. When `true` (default), files matching `.gitignore` patterns are excluded from suggestions.
- **Example:**
  ```json
  {
    "respectGitignore": false
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
