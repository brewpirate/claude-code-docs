---
title: "Channel & Communication"
tags: [settings]
---

# Channel & Communication


### `allowedChannelPlugins`
- **Type:** object[]
- **Default:** unspecified
- **Description:** **Managed-only.** Allowlist of channel plugins that may push messages. Replaces the default Anthropic allowlist when set. Undefined falls back to default; empty array blocks all channel plugins. Requires `channelsEnabled: true`. Only honored when set by managed/enterprise-controlled settings; ignored in user/project settings.
- **Example:**
  ```json
  {
    "allowedChannelPlugins": [
      {
        "marketplace": "claude-plugins-official",
        "plugin": "telegram"
      }
    ]
  }
  ```

### `channelsEnabled`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Enable channel communication features. When false, blocks channel message delivery regardless of what users pass to `--channels`.
- **Example:**
  ```json
  {
    "channelsEnabled": true
  }
  ```

### `voiceEnabled`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Enable push-to-talk voice dictation. Requires a Claude.ai account. Written automatically when you run `/voice`.
- **Example:**
  ```json
  {
    "voiceEnabled": true
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
