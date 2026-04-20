---
title: "File & Directory Handling"
tags: [settings]
---


### `autoMemoryDirectory`
- **Type:** string
- **Default:** `"~/.claude/auto-memory"`
- **Description:** Custom directory for auto-memory storage. Accepts `~/`-expanded paths. Not accepted in project settings (`.claude/settings.json`) to prevent shared repos from redirecting memory writes to sensitive locations. Accepted from policy, local, and user settings.
- **Example:**
  ```json
  {
    "autoMemoryDirectory": "~/my-memory-dir"
  }
  ```

### `plansDirectory`
- **Type:** string
- **Default:** `"~/.claude/plans"`
- **Description:** Customize where plan files are stored. Path is relative to project root when set in project settings; home-relative when set in user settings.
- **Example:**
  ```json
  {
    "plansDirectory": "./plans"
  }
  ```

### `fileSuggestion.type`
- **Type:** string
- **Default:** unspecified
- **Description:** Configure file suggestion mode: `"command"` for custom script, or a built-in type. Used with `fileSuggestion.command`.
- **Example:**
  ```json
  {
    "fileSuggestion": {
      "type": "command"
    }
  }
  ```

### `fileSuggestion.command`
- **Type:** string
- **Default:** unspecified
- **Description:** Custom command (shell path) for `@`-mention autocomplete. Receives JSON with `query` field via stdin; outputs newline-separated file paths to stdout (limited to 15).
- **Example:**
  ```json
  {
    "fileSuggestion": {
      "type": "command",
      "command": "~/.claude/file-suggestion.sh"
    }
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
