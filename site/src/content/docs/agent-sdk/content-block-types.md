---
title: "Content Block Types"
tags: [agent-sdk]
---

# Content block types


Messages carry content in blocks, each typed by `type` field:
- **`text`**: Plain text content from Claude.
- **`thinking`**: Extended thinking (reasoning) block when `includeThinking: true`. Only visible if model supports thinking.
- **`tool_use`**: Tool invocation: `id`, `name`, `input` (object).
- **`tool_result`**: Result from a tool call: `tool_use_id` (links to prior `tool_use`), `content` (text or structured), `is_error` (boolean).
- **`image`**: Image block with source (`type: 'base64' | 'url'`), media type, and dimensions.
- **`document`**: PDF or document attachment.
- **`redaction`**: Redacted content (internal use; rarely surfaced to SDK consumers).

---

[← Back to Agent SDK/README.md](/claude-code-docs/agent-sdk/overview/)
