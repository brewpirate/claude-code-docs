# MCP integration


### In-process MCP servers
`SdkControlTransport` in source (not documented here; referenced by name) provides the transport mechanism for SDK-spawned MCP servers. Allows tool definitions to live in application code without separate server process.

### External MCP servers
Connect to stdio, HTTP, or SSE servers via `mcpServers` config. Server name becomes tool prefix: `mcp__<server>__<tool>`.

```typescript
mcpServers: {
  github: {
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-github"],
    env: { GITHUB_TOKEN: process.env.GITHUB_TOKEN }
  }
},
allowedTools: ["mcp__github__list_issues"]
```

### Tool prefixing
By default, MCP tools are prefixed `mcp__`. Set `CLAUDE_AGENT_SDK_MCP_NO_PREFIX=1` to disable prefixing (use with caution; can collide with built-in tool names).

### MCP configuration
Per-session in `options.mcpServers` or global in `.mcp.json` (loaded when `settingSources` includes `'project'`).

---

[← Back to Agent SDK/README.md](./README.md)
