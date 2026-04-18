---
title: "Hooks & Automation"
---

# Hooks & Automation


### `hooks`
- **Type:** object
- **Default:** unspecified
- **Description:** Configure custom commands to run at lifecycle events. Contains keys for `PreToolUse`, `PostToolUse`, `SessionStart`, `Stop`, `CwdChanged`, and `Notification` hooks. Each hook value is a command string executed at the specified event.
- **Example:**
  ```json
  {
    "hooks": {
      "PreToolUse": "/path/to/hook.sh",
      "PostToolUse": "/path/to/post-hook.sh"
    }
  }
  ```

### `allowedHttpHookUrls`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Allowlist of URL patterns that HTTP hooks may target. Supports `*` as a wildcard. When set, hooks with non-matching URLs are blocked. Undefined = no restriction, empty array = block all HTTP hooks. Arrays merge across settings sources.
- **Example:**
  ```json
  {
    "allowedHttpHookUrls": ["https://hooks.example.com/*", "http://localhost:*"]
  }
  ```

### `httpHookAllowedEnvVars`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Allowlist of environment variable names HTTP hooks may interpolate into headers. When set, each hook's effective `allowedEnvVars` is the intersection with this list. Undefined = no restriction. Arrays merge across settings sources.
- **Example:**
  ```json
  {
    "httpHookAllowedEnvVars": ["MY_TOKEN", "HOOK_SECRET"]
  }
  ```

### `disableAllHooks`
- **Type:** boolean
- **Default:** unspecified
- **Description:** **Managed-only.** Disable all hooks including managed hooks and custom status lines. Only honored when set by managed/enterprise-controlled settings; ignored in user/project settings.
- **Example:**
  ```json
  {
    "disableAllHooks": true
  }
  ```

### `disableSkillShellExecution`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Disable inline shell execution for `` !`...` `` and ` ```! ` blocks in skills and custom commands from user, project, plugin, or additional-directory sources. Commands are replaced with `[shell command execution disabled by policy]` instead. Bundled and managed skills are not affected.
- **Example:**
  ```json
  {
    "disableSkillShellExecution": true
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
