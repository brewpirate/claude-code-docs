# How the Agent SDK works


- **Two language bindings:** `@anthropic-ai/claude-agent-sdk` (TypeScript/Node) and `claude-agent-sdk` (Python) — both expose the same core API surface.
- **Entrypoint environment variable:** Set `CLAUDE_CODE_ENTRYPOINT=sdk-ts` or `sdk-py` so the CLI harness can distinguish SDK-launched processes from user-invoked CLI calls. Automatically set by the SDK; usually invisible to developers.
- **Data plane (messages):** User messages, assistant responses, tool uses, and tool results flow through the SDK as Zod-validated objects defined in `coreSchemas.ts`.
- **Control plane (administration):** Interrupt, abort, resume, set-mode, and permission-decision messages allow SDK clients to control the session mid-flight. Defined in `controlSchemas.ts`.
- **Session identity via `session_id`:** Every message carries a `session_id` field that threads through the conversation. First message with no `session_id` creates a new session; subsequent messages with the same ID resume it.
- **Streaming architecture:** SDK yields typed events as they arrive (assistant messages, partial updates, thinking blocks, tool calls, results, system metadata). Async iteration over the `query()` return value reads the stream.
- **Tool and permission bridging:** SDK can supply tools (via MCP servers), hooks (via callbacks), and permission rules (via `canUseTool` callback) programmatically, instead of requiring `.claude/` files or `settings.json`.
- **MCP integration:** SDK can spawn MCP servers in-process (via `SdkControlTransport`) or connect to external ones (stdio, HTTP, SSE). MCP tool names are prefixed with `mcp__<server>__<tool>` unless `CLAUDE_AGENT_SDK_MCP_NO_PREFIX` disables prefixing.
- **Permission callbacks:** `canUseTool` callback fires before every tool dispatch, replacing or augmenting `settings.json` rules at runtime.
- **Telemetry:** SDK version is passed via `CLAUDE_AGENT_SDK_VERSION` env var, and client-app context via `CLAUDE_AGENT_SDK_CLIENT_APP` header.

---

[← Back to Agent SDK/README.md](./README.md)
