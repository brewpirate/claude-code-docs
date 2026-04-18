---
title: "MCP Tools"
---

# MCP (Model Context Protocol) tools


### `ListMcpResources`
- **Invoked as:** `ListMcpResources`
- **Source directory:** `claude-code-main/tools/ListMcpResourcesTool/`
- **Class:** MCP
- **Side effect:** Read-only
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/mcp (under "Resources")
- **Description:** "Lists resources exposed by connected MCP servers." Resources are named documents or tools published by MCP servers; this tool enumerates what's available without fetching their full content.
- **Input parameters:**
  - `server` (string, optional) — Specific MCP server name to query; omit to list from all connected servers
- **Returns:** List of resources with names, types, and descriptions.
- **Notes:** Use before calling ReadMcpResource to discover what's available. Resources are exposed by MCP servers configured in `.mcp.json` or `settings.json` under `mcpServers`.

### `ReadMcpResource`
- **Invoked as:** `ReadMcpResource`
- **Source directory:** `claude-code-main/tools/ReadMcpResourceTool/`
- **Class:** MCP
- **Side effect:** Read-only
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference (listed as `ReadMcpResourceTool`)
- **Description:** "Reads a specific MCP resource by URI." Fetches the full content of a named resource from an MCP server.
- **Input parameters:**
  - `uri` (string, required) — Fully-qualified resource URI (e.g., `resource://server-name/resource-name`)
- **Returns:** Resource content (text, structured data, or file content).
- **Notes:** URI format is `resource://server-name/resource-name`. Use ListMcpResources first to discover available URIs.

---

[← Back to Tools/README.md](./README.md)
