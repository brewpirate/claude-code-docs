---
title: "Tool Bridging"
---

# Tool bridging


### Built-in tools
SDK inherits the CLI's built-in tool catalog: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch, AskUserQuestion, Monitor, Agent (for subagents), and others. See [Tools/README.md](../Tools/README.md) for full reference.

### Custom tools via MCP
SDK can instantiate MCP servers in-process (via `tool()` and `createSdkMcpServer()` functions) or connect to external stdio/HTTP/SSE servers.

```typescript
import { tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

const greet = tool(
  "greet",
  "Greet a user",
  { name: z.string() },
  async ({ name }) => ({ content: [{ type: "text", text: `Hello, ${name}!` }] })
);

const server = createSdkMcpServer({
  name: "greeting",
  tools: [greet]
});

// Use with query()
for await (const msg of query({
  prompt: "Greet Alice",
  options: { 
    mcpServers: { greeting: server },
    allowedTools: ["mcp__greeting__greet"]
  }
})) { }
```

### `canUseTool` callback (SDK-specific)
Fires before each tool dispatch. Replaces or augments `settings.json` permission rules at runtime.

```typescript
canUseTool: async (toolName, input, context) => {
  if (toolName === "Bash" && input.command?.includes("rm")) {
    return { behavior: "deny", message: "Destructive commands blocked" };
  }
  return { behavior: "allow" };
}
```

---

[← Back to Agent SDK/README.md](./README.md)
