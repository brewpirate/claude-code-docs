---
title: "LLM & Model"
tags: [settings]
---


### `model`
- **Type:** string
- **Default:** unspecified
- **Description:** Override the default model to use for Claude Code. Examples: `"claude-opus-4-6"`, `"claude-sonnet-4-6"`, `"claude-haiku-3-5"`.
- **Example:**
  ```json
  {
    "model": "claude-sonnet-4-6"
  }
  ```

### `availableModels`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Restrict which models users can select via `/model`, `--model`, Config tool, or `ANTHROPIC_MODEL`. Does not affect the Default option.
- **Example:**
  ```json
  {
    "availableModels": ["sonnet", "haiku"]
  }
  ```

### `modelOverrides`
- **Type:** object
- **Default:** unspecified
- **Description:** Map Anthropic model IDs to provider-specific model IDs such as Bedrock inference profile ARNs. Each model picker entry uses its mapped value when calling the provider API.
- **Example:**
  ```json
  {
    "modelOverrides": {
      "claude-opus-4-6": "arn:aws:bedrock:us-west-2:123456789012:inference-profile/anthropic.claude-opus-4-6-20250514-v1:0"
    }
  }
  ```

### `advisorModel`
- **Type:** string
- **Default:** unspecified
- **Description:** Secondary advisor model for secondary analysis or specialized tasks (available in v2.1.90+). Examples: `"claude-opus-4-6"`, `"claude-sonnet-4-6"`.
- **Example:**
  ```json
  {
    "advisorModel": "claude-haiku-3-5"
  }
  ```

### `alwaysThinkingEnabled`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Enable extended thinking (Claude's reasoning mode) by default for all sessions. When enabled, Claude will use extended thinking for tasks that benefit from deeper analysis.
- **Example:**
  ```json
  {
    "alwaysThinkingEnabled": true
  }
  ```

### `effortLevel`
- **Type:** string
- **Default:** unspecified
- **Description:** Persist the effort level across sessions. Accepts `"low"`, `"medium"`, `"high"`, or `"xhigh"` (also accepts `"fast"`, `"balanced"`, `"thorough"` as aliases). Written automatically when you run `/effort`.
- **Example:**
  ```json
  {
    "effortLevel": "xhigh"
  }
  ```

### `fastModePerSessionOptIn`
- **Type:** boolean
- **Default:** unspecified
- **Description:** When `true`, fast mode does not persist across sessions. Each session starts with fast mode off, requiring users to enable it with `/fast`. The user's fast mode preference is still saved.
- **Example:**
  ```json
  {
    "fastModePerSessionOptIn": true
  }
  ```

### `disableAutoMode`
- **Type:** string
- **Default:** unspecified
- **Description:** Hard-disable auto mode. Set to `"disable"` to prevent auto mode from being activated. Removes `auto` from the `Shift+Tab` cycle and rejects `--permission-mode auto` at startup.
- **Example:**
  ```json
  {
    "disableAutoMode": "disable"
  }
  ```

### `disableBypassPermissionsMode`
- **Type:** string
- **Default:** unspecified
- **Description:** Hard-disable bypass-permissions mode. Set to `"disable"` to prevent `bypassPermissions` mode from being activated. Disables the `--dangerously-skip-permissions` command-line flag. ⚠ Security
- **Example:**
  ```json
  {
    "disableBypassPermissionsMode": "disable"
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
