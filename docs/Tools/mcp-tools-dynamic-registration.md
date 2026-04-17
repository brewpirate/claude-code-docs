# MCP tools — dynamic registration


MCP (Model Context Protocol) servers register tools dynamically at runtime. These are not listed in the built-in tools table because they depend on which servers are connected:

- **Dynamic naming**: MCP tools are named `mcp__<server-name>__<tool-name>` (e.g., `mcp__slack__post_message`).
- **Server configuration**: Servers are defined in `.mcp.json` (project-level) or `settings.json` (global), under the `mcpServers` key.
- **Gating**: Allowed/denied servers are controlled via `allowedMcpServers` and `deniedMcpServers` in permission settings.
- **Tool search integration**: When `ENABLE_TOOL_SEARCH=1`, ToolSearch can query for and load MCP tool schemas on demand, avoiding large system prompts with many servers.
- **Not enumerable statically**: Unlike built-in tools, which are compiled into the binary, MCP tools are discovered at startup by connecting to each server. The exact tool set depends on configuration.

For MCP server configuration details, see Settings/mcp-servers.md.

---

[← Back to Tools/README.md](./README.md)
