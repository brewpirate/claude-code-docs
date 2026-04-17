# Streaming & events


### Event types emitted by `query()`
- `SDKUserMessage` — User input (usually only in replay mode).
- `SDKAssistantMessage` — Claude's response with tool calls.
- `SDKPartialAssistantMessage` — Streaming chunk (when `includePartialMessages: true`).
- `SDKResultMessage` — Final result with usage and cost.
- `SDKSystemMessage` — Session metadata (init, status changes).
- `SDKStatusMessage` — Progress updates (e.g., `status: 'compacting'`).
- `SDKRateLimitEvent` — Rate limit status changes.
- `SDKStreamlinedTextMessage` — Compacted text summary (internal).

### Configuration flags
- **`includePartialMessages`:** Emit partial chunks during streaming (default: false).
- **`includeThinking`:** Include thinking blocks in assistant messages (default: false, model-dependent).
- **`includeHookEvents`:** Emit hook invocation events (default: false; internal feature).
- **`includeReplayMessages`:** Emit replay messages when resuming session (default: false).

### Backpressure / flow control
The async generator pauses if the consumer doesn't read fast enough, providing implicit backpressure. No explicit flow-control API; iteration speed controls throughput.

---

[← Back to Agent SDK/README.md](./README.md)
