---
title: "Message Protocol"
tags: [agent-sdk]
---

# Message protocol


### User messages
- **Shape:** `type: 'user'`, `message` (Anthropic SDK message object), `content` array (text, images, files), `parent_tool_use_id`, `uuid`, `session_id`.
- **Attachments:** Images (base64 or URL), files (text, PDF, binary).
- **Multi-turn:** Each new user message resumes the conversation; prior context is preserved via session_id.
- **Synthetic messages:** `isSynthetic: true` marks system-generated messages (e.g., hook injections).
- **Priority:** `priority: 'now' | 'next' | 'later'` controls message queue order; `'later'` allows async batching.

### Assistant messages
- **Regular responses:** `type: 'assistant'`, `message` wraps the Anthropic API response (text blocks, tool use blocks, thinking blocks).
- **Partial streaming:** When `includePartialMessages: true`, SDK yields `type: 'partial_assistant'` chunks mid-response so you can stream to UI immediately.
- **Thinking blocks:** Visible via `message.content` array when model uses extended thinking and `includeThinking: true`.
- **Tool uses:** Present in `message.content` as `type: 'tool_use'` blocks with `id`, `name`, `input`.
- **Errors:** Optional `error` field (enum: `'authentication_failed'`, `'billing_error'`, `'rate_limit'`, `'invalid_request'`, `'server_error'`, `'unknown'`, `'max_output_tokens'`).

### System messages
- **Init event:** Subtype `'init'` fires once per session with metadata: `agents` (available subagent types), `apiKeySource` (API authentication method), `mcp_servers` (MCP connection statuses).
- **Status:** Subtype `'status'` carries session state changes (e.g., `status: 'compacting'` during context compression).
- **Rate limits:** Included in init and as separate `SDKRateLimitEvent` messages when rate limit state changes.

### Control messages (for SDK builders)
SDK builders (e.g., Python SDK authors) use control schemas to communicate with the CLI subprocess:
- **Initialize:** Send tools, hooks, MCP servers, and agent definitions before the first query.
- **Interrupt:** Pause the agent mid-turn.
- **Set permission mode:** Change tool execution behavior.
- **Set model:** Swap the model on-the-fly.
- **Rewind files:** Restore files to a prior message state.
- **MCP management:** Connect/disconnect MCP servers dynamically, check status, reconnect after failure.
- **Hook callback:** Deliver hook output back to the agent.

Defined in `controlSchemas.ts`; SDK consumers use only the data plane (coreSchemas.ts).

---

[← Back to Agent SDK/README.md](/claude-code-docs/agent-sdk/overview/)
