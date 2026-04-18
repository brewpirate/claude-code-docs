---
title: "Language Bindings"
---

# Language bindings


### TypeScript / Node

**Package:** `@anthropic-ai/claude-agent-sdk`

**Installation:**
```bash
npm install @anthropic-ai/claude-agent-sdk
```

**Key exports:**
- `query(params)` — Main async generator for one-off queries.
- `startup(options?)` — Pre-warm subprocess for zero-latency first query.
- `listSessions(options)`, `getSessionMessages(sessionId, options)`, `getSessionInfo(sessionId, options)`, `renameSession(sessionId, title)`, `tagSession(sessionId, tag)`, `forkSession(sessionId, options)` — Session management.
- `tool(name, description, schema, handler)` — Define MCP tools.
- `createSdkMcpServer(options)` — Create in-process MCP server.
- `AbortError` — Exception type for aborted operations.
- Type exports: `SDKMessage`, `Options`, `PermissionMode`, `HookCallback`, `HookInput`, `HookOutput`, etc.

**Minimal usage:**
```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Find and fix the bug in auth.ts",
  options: { allowedTools: ["Read", "Edit", "Bash"] }
})) {
  console.log(message);
}
```

### Python

**Package:** `claude-agent-sdk`

**Installation:**
```bash
pip install claude-agent-sdk
```

**Key exports:**
- `query(prompt, options)` — Main async generator for one-off queries.
- `ClaudeSDKClient(options)` — Persistent session client.
- `listSessions(options)`, `getSessionMessages(sessionId, options)`, `getSessionInfo(sessionId, options)`, `renameSession(sessionId, title)`, `tagSession(sessionId, tag)`, `forkSession(sessionId, options)` — Session management.
- `tool(name, description, schema, handler)` — Define MCP tools.
- `createSdkMcpServer(options)` — Create in-process MCP server.
- Type/class exports: `ClaudeAgentOptions`, `AssistantMessage`, `UserMessage`, `ResultMessage`, `SystemMessage`, `HookMatcher`, `PermissionResultAllow`, `PermissionResultDeny`, etc.

**Minimal usage:**
```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Find and fix the bug in auth.py",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"])
    ):
        print(message)

asyncio.run(main())
```

---

[← Back to Agent SDK/README.md](/claude-code-docs/agent-sdk/overview/)
