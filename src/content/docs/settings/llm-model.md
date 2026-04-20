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
- **Description:** Model consulted by the server-side advisor tool — a second-opinion model the main loop can invoke alongside the primary model. Managed interactively via `/advisor <model>` (set) or `/advisor unset` (clear). Has no effect unless the current main-loop model supports the advisor feature (see `modelSupportsAdvisor`). Configurability is further gated by `canUserConfigureAdvisor`.
- **Example:**
  ```json
  {
    "advisorModel": "claude-opus-4-6"
  }
  ```
- **Source:** `claude-code-main/utils/settings/types.ts:712-715`; `commands/advisor.ts`.

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
- **Type:** string enum
- **Default:** unspecified
- **Valid values (per public docs):** `"low"`, `"medium"`, `"high"`, `"xhigh"`, `"max"`. Available values depend on the model. `"max"` is **session-only** and not persisted (setting it via `/effort max` applies to this session only).
- **Valid values (in the `claude-code-main` source snapshot):** `"low"`, `"medium"`, `"high"` (public builds) or `"low"`, `"medium"`, `"high"`, `"max"` (ant-only builds). `"xhigh"` does not appear in this scrubbed source — same public-docs-vs-source pattern documented in [commands/discrepancies-and-gaps](/claude-code-docs/commands/discrepancies-and-gaps/). Trust the public docs for availability; the schema is guarded with `.catch(undefined)` so unknown values are silently ignored.
- **Description:** Persisted effort level for supported models. Written by `/effort <level>` and cleared by `/effort unset`. `/effort auto` clears the setting to fall back to the default for the current model.
- **Overridden by:** `CLAUDE_CODE_EFFORT_LEVEL` environment variable. When set, it takes effect for the current session and the settings value is not applied until the env var is unset.
- **Example:**
  ```json
  {
    "effortLevel": "high"
  }
  ```
- **Source:** `claude-code-main/utils/settings/types.ts:703-711`; `commands/effort/effort.tsx`. Public reference: https://code.claude.com/docs/en/commands (entry for `/effort`).

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
