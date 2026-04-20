---
title: "MCP Servers"
tags: [settings]
---


### `mcpServers`
- **Type:** object
- **Default:** unspecified
- **Description:** MCP server configurations mapping server names to their configuration objects. Each server can have command, environment, and other configuration details.
- **Example:**
  ```json
  {
    "mcpServers": {
      "memory": {
        "command": "memory-server"
      }
    }
  }
  ```

### `allowedMcpServers`
- **Type:** object[]
- **Default:** unspecified
- **Description:** When set in managed-settings.json, allowlist of MCP servers users can configure. Each entry contains identifiers like `serverName`, `command`, or glob URL patterns. Undefined = no restrictions, empty array = lockdown. Applies to all scopes.
- **Example:**
  ```json
  {
    "allowedMcpServers": [
      {
        "serverName": "github"
      }
    ]
  }
  ```

### `deniedMcpServers`
- **Type:** object[]
- **Default:** unspecified
- **Description:** Blocklist of MCP servers that are explicitly blocked. When set in managed-settings.json, applies to all scopes including managed servers. Denylist takes precedence over allowlist.
- **Example:**
  ```json
  {
    "deniedMcpServers": [
      {
        "serverName": "filesystem"
      }
    ]
  }
  ```

### `enableAllProjectMcpServers`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Automatically approve all MCP servers defined in project `.mcp.json` files without requiring explicit user confirmation for each server.
- **Example:**
  ```json
  {
    "enableAllProjectMcpServers": true
  }
  ```

### `enabledMcpjsonServers`
- **Type:** string[]
- **Default:** unspecified
- **Description:** List of specific MCP servers from `.mcp.json` files to approve. Each entry is a server name to enable.
- **Example:**
  ```json
  {
    "enabledMcpjsonServers": ["memory", "github"]
  }
  ```

### `disabledMcpjsonServers`
- **Type:** string[]
- **Default:** unspecified
- **Description:** List of specific MCP servers from `.mcp.json` files to reject. Each entry is a server name to disable.
- **Example:**
  ```json
  {
    "disabledMcpjsonServers": ["filesystem"]
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
