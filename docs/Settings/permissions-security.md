# Permissions & Security


### `permissions.allow`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Array of permission rules to allow tool use. Examples: `Bash(npm run *)`, `Read(*.ts)`, `WebFetch(domain:example.com)`. Rules are evaluated in order: deny rules first, then ask, then allow. The first matching rule wins.
- **Example:**
  ```json
  {
    "permissions": {
      "allow": [
        "Bash(npm run *)",
        "Read(*.ts)"
      ]
    }
  }
  ```

### `permissions.deny`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Array of permission rules to deny tool use. Use this to exclude sensitive files and commands from Claude Code access. Examples: `Bash(curl *)`, `Read(./.env)`, `Read(./secrets/**)`.
- **Example:**
  ```json
  {
    "permissions": {
      "deny": [
        "Bash(curl *)",
        "Read(./.env)"
      ]
    }
  }
  ```

### `permissions.ask`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Array of permission rules to ask for confirmation upon tool use. When a matching rule is encountered, Claude prompts before executing the tool.
- **Example:**
  ```json
  {
    "permissions": {
      "ask": [
        "Bash(git push *)"
      ]
    }
  }
  ```

### `permissions.defaultMode`
- **Type:** string
- **Default:** unspecified
- **Description:** Default permission mode when opening Claude Code. Valid values: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`. The `--permission-mode` CLI flag overrides this setting for a single session.
- **Example:**
  ```json
  {
    "permissions": {
      "defaultMode": "acceptEdits"
    }
  }
  ```

### `allow`
- **Type:** string[]
- **Default:** unspecified
- **Description:** **Deprecated** — backwards-compat shorthand for `permissions.allow`. Allows are evaluated after denies; the first matching rule in the priority order wins.
- **Example:**
  ```json
  {
    "allow": [
      "Bash(npm run *)"
    ]
  }
  ```

### `deny`
- **Type:** string[]
- **Default:** unspecified
- **Description:** **Deprecated** — backwards-compat shorthand for `permissions.deny`. Denies are evaluated first in rule matching.
- **Example:**
  ```json
  {
    "deny": [
      "Read(./.env)"
    ]
  }
  ```

### `ask`
- **Type:** string[]
- **Default:** unspecified
- **Description:** **Deprecated** — backwards-compat shorthand for `permissions.ask`. Asks are evaluated after denies but before allows.
- **Example:**
  ```json
  {
    "ask": [
      "Bash(git push *)"
    ]
  }
  ```

### `defaultMode`
- **Type:** string
- **Default:** unspecified
- **Description:** **Deprecated** — backwards-compat shorthand for `permissions.defaultMode`. Sets the default permission mode.
- **Example:**
  ```json
  {
    "defaultMode": "acceptEdits"
  }
  ```

### `permissions.additionalDirectories`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Additional working directories for file access. Most `.claude/` configuration is not discovered from these directories. Allows Claude to access files outside the main project.
- **Example:**
  ```json
  {
    "permissions": {
      "additionalDirectories": ["../docs/"]
    }
  }
  ```

### `autoMode`
- **Type:** object
- **Default:** unspecified
- **Description:** Customize what the auto mode classifier blocks and allows. Contains `environment`, `allow`, and `soft_deny` arrays of prose rules. Not read from shared project settings.
- **Example:**
  ```json
  {
    "autoMode": {
      "environment": [
        "Trusted repo: github.example.com/acme"
      ]
    }
  }
  ```

### `skipDangerousModePermissionPrompt`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Skip the confirmation prompt shown before entering bypass permissions mode via `--dangerously-skip-permissions` or `defaultMode: "bypassPermissions"`. Ignored when set in project settings (`.claude/settings.json`) to prevent untrusted repositories from auto-bypassing the prompt. ⚠ Security
- **Example:**
  ```json
  {
    "skipDangerousModePermissionPrompt": true
  }
  ```

### `skipAutoPermissionPrompt`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Skip the auto-mode opt-in prompt. When true, auto mode can be enabled without an interactive confirmation dialog.
- **Example:**
  ```json
  {
    "skipAutoPermissionPrompt": true
  }
  ```

### `useAutoModeDuringPlan`
- **Type:** boolean
- **Default:** true
- **Description:** Whether plan mode uses auto mode semantics when auto mode is available. Not read from shared project settings. Appears in `/config` as "Use auto mode during plan".
- **Example:**
  ```json
  {
    "useAutoModeDuringPlan": false
  }
  ```

---

[← Back to settings/README.md](./README.md)
