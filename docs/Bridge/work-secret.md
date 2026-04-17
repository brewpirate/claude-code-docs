# Work Secret Payload

The work secret is a Base64url-encoded JSON object that bootstraps a Bridge session with all configuration needed to initialize Claude. Transmitted during handshake or pre-loaded in CCR environment.

## Payload Structure

```json
{
  "session_ingress_token": "eyJhbGc...",
  "api_base_url": "https://bridge.claude.com/api",
  "git_sources": [
    {
      "type": "github",
      "owner": "anthropic-ai",
      "repo": "claude-code"
    }
  ],
  "environment_variables": {
    "MY_CUSTOM_VAR": "value",
    "DEBUG_LEVEL": "info"
  },
  "mcp_servers": {
    "puppeteer": {
      "command": "node puppeteer.js",
      "args": ["--port", "9000"]
    }
  },
  "use_code_sessions": true
}
```

## Field Descriptions

| Field | Type | Required | Effect |
|-------|------|----------|--------|
| `session_ingress_token` | string (JWT) | Yes | Bearer token for Bridge API requests; parsed for exp and refresh |
| `api_base_url` | URL | Yes | Base URL for all `/api/*` calls (e.g., `/api/sessions/{id}/event`) |
| `git_sources` | array | No | List of git repositories (GitHub, GitLab, etc.); used for context + PR workflows |
| `environment_variables` | object | No | Env vars injected into Claude's subprocess (tool execution, MCP servers) |
| `mcp_servers` | object | No | MCP server definitions (command, args, env); dynamically registered |
| `use_code_sessions` | boolean | No | If `true`, uses CCR v2 (SSE) transport; if `false` or absent, uses v1 (WebSocket) |

## Encoding & Transport

- **Encoding**: Base64url (RFC 4648 § 5) with no padding
- **Transport mechanisms**:
  - **Web/Cloud**: Encrypted in OAuth flow; stored in session state
  - **CCR container**: Written to file at startup (e.g., `/run/ccr/work_secret`); read at init
  - **Handshake**: Included in first client message to bridge server

## Decoding Example

```bash
# Receive base64url-encoded payload
ENCODED="eyJhbGc..."

# Decode (add padding if needed)
PADDED="${ENCODED}=="
DECODED=$(echo "$PADDED" | base64 -d)

# Parse JSON
echo "$DECODED" | jq .
```

## CCR v2 Selection

The `use_code_sessions` flag determines transport protocol:

- **`true`**: Use SSE (Server-Sent Events) for server→client; HTTP POST for client→server
- **`false` or absent**: Use WebSocket for bidirectional communication
- **Override**: Environment variable `CLAUDE_CODE_USE_CCR_V2` takes precedence over payload flag

## MCP Server Registration

MCP server definitions in `mcp_servers` are:

1. **Parsed** at session init
2. **Validated** against security rules (e.g., command path whitelist)
3. **Spawned** on-demand during tool calls
4. **Monitored** for crashes; auto-restarted up to 3x per session

Example:
```json
"mcp_servers": {
  "slack": {
    "command": "/usr/local/bin/mcp-slack",
    "args": ["--token", "xoxb-..."],
    "env": {
      "SLACK_TEAM_ID": "T123456"
    }
  }
}
```

## Git Sources

List of git repositories accessible during session:

```json
"git_sources": [
  {
    "type": "github",
    "owner": "anthropic-ai",
    "repo": "claude-code",
    "branch": "main"
  },
  {
    "type": "gitlab",
    "group": "my-org",
    "project": "my-project",
    "url": "https://gitlab.example.com"
  }
]
```

Used for:
- PR creation and review workflows
- Context fetching (`/search-gh`)
- Commit history analysis

## Environment Variables

Injected into subprocess at tool execution time:

```json
"environment_variables": {
  "NODE_ENV": "production",
  "CUSTOM_API_KEY": "sk-...",
  "LOG_LEVEL": "debug"
}
```

**Security**: Sensitive values should be injected by the server, not hardcoded; user code cannot override injected vars.

---

[← Back to Bridge/README.md](./README.md)
