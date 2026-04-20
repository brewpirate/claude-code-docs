---
title: "Telemetry / Misc"
tags: [settings]
---


### `feedbackSurveyRate`
- **Type:** number
- **Default:** unspecified
- **Description:** Probability (0–1) that the session quality survey appears when eligible. Set to `0` to suppress entirely. Useful when using Bedrock, Vertex, or Foundry where the default sample rate does not apply.
- **Example:**
  ```json
  {
    "feedbackSurveyRate": 0.05
  }
  ```

### `teammateMode`
- **Type:** string
- **Default:** unspecified
- **Description:** How agent team teammates display: `"auto"` (picks split panes in tmux or iTerm2, in-process otherwise), `"in-process"`, or `"tmux"`. Controls the display mode for multi-agent interactions.
- **Example:**
  ```json
  {
    "teammateMode": "in-process"
  }
  ```

### `disableDeepLinkRegistration`
- **Type:** string
- **Default:** unspecified
- **Description:** Set to `"disable"` to prevent Claude Code from registering the `claude-cli://` protocol handler with the operating system on startup. Deep links let external tools open a Claude Code session with a pre-filled prompt via `claude-cli://open?q=...`.
- **Example:**
  ```json
  {
    "disableDeepLinkRegistration": "disable"
  }
  ```

### `failIfUnavailable`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Fail if a requested resource (such as sandbox, MCP server, or other dependency) is unavailable. When true, the CLI exits with an error at startup rather than continuing with degraded functionality.
- **Example:**
  ```json
  {
    "failIfUnavailable": true
  }
  ```

### `claudeai`
- **Type:** string
- **Default:** unspecified
- **Description:** Claude.ai connection identifier. Used for linking Claude Code sessions with Claude.ai conversations and coordinating shared context.
- **Example:**
  ```json
  {
    "claudeai": "session-id-12345"
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
