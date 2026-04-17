# Channels

Channels let Claude Code receive messages from external sources — voice dictation and channel plugins (such as messaging apps or bots). This is a research preview feature; not all accounts have access.

> **External reference:** [https://code.claude.com/docs/en/channels-reference](https://code.claude.com/docs/en/channels-reference)

---

## What channels are

By default, Claude Code receives input from your terminal keyboard. With channels enabled, additional input sources can push messages into Claude Code sessions:

- **Voice** — push-to-talk dictation transcribed to text input
- **Channel plugins** — external apps (e.g., Telegram, Slack bots) that can send messages to Claude Code via the plugin API

---

## The three settings keys

All channel settings live in `settings.json`:

| Key | Type | What it does |
|-----|------|-------------|
| `voiceEnabled` | boolean | Enables push-to-talk voice dictation. Requires a Claude.ai account. Set automatically when you run `/voice`. |
| `channelsEnabled` | boolean | Master switch for channel message delivery. When `false`, no channel plugins can push messages regardless of other settings. |
| `allowedChannelPlugins` | object[] | **Managed-only.** Allowlist of which channel plugins may push messages. Only honored in enterprise/managed settings — ignored in user or project settings. |

Full field documentation: [Settings/channel-communication.md](./Settings/channel-communication.md)

---

## Enabling voice

```json
{
  "voiceEnabled": true
}
```

Or run `/voice` in a Claude Code session — it sets this automatically.

Voice requires a Claude.ai account (not just an API key). If you're using a raw API key without a Claude.ai account, voice is not available.

---

## Enabling channel plugins

```json
{
  "channelsEnabled": true
}
```

This is the prerequisite for any channel plugin. Without it, plugin messages are discarded. Configuring which plugins are allowed requires managed/enterprise settings (`allowedChannelPlugins`) — you cannot allowlist channel plugins from user or project settings.

---

## Note for junior developers

Channels are a research preview feature. If you're getting started with Claude Code, you don't need to configure channels. The core functionality — terminal input, slash commands, file editing — works without any channel configuration.

If channels aren't working and you expect them to:
1. Check that `channelsEnabled: true` is in your settings
2. Confirm your account has access to the channels preview
3. For channel plugins, check with your workspace admin — `allowedChannelPlugins` requires managed settings

---

[← Back to docs/README.md](./README.md)
