---
title: "Integrations"
---

# Integrations


### MCP (Model Context Protocol)

#### `CLAUDE_CODE_MCP_ALLOWLIST_ENV`
- **Type:** Boolean (1, true, 0, false)
- **Default:** true (enabled only for local-agent entrypoint)
- **Description:** Enable env var allowlist filtering for MCP servers. Restricts which env vars MCP servers can access.
- **Example:** `export CLAUDE_CODE_MCP_ALLOWLIST_ENV=0`

#### `MCP_SERVER_CONNECTION_BATCH_SIZE`
- **Type:** Integer
- **Default:** 3
- **Description:** Number of MCP servers to connect to simultaneously. Lower values = slower but less resource-intensive.
- **Example:** `export MCP_SERVER_CONNECTION_BATCH_SIZE=5`

#### `MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE`
- **Type:** Integer
- **Default:** 20
- **Description:** Number of remote MCP servers to connect simultaneously. Higher than local batch due to network latency.
- **Example:** `export MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE=30`

#### `MCP_TIMEOUT`
- **Type:** Integer (milliseconds)
- **Default:** 30000
- **Description:** MCP server connection timeout in milliseconds. Increases if servers are slow to initialize.
- **Example:** `export MCP_TIMEOUT=60000`

#### `MCP_TOOL_TIMEOUT`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (typically 30000)
- **Description:** MCP tool execution timeout in milliseconds. How long to wait for a tool call to complete.
- **Example:** `export MCP_TOOL_TIMEOUT=120000`

#### `MAX_MCP_OUTPUT_TOKENS`
- **Type:** Integer (tokens)
- **Default:** 25000
- **Description:** Maximum output tokens for MCP tool results. Longer outputs are truncated.
- **Example:** `export MAX_MCP_OUTPUT_TOKENS=50000`

#### `MCP_CONNECTION_NONBLOCKING`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Make MCP server connections non-blocking. Useful for slow servers that don't block startup.
- **Example:** `export MCP_CONNECTION_NONBLOCKING=1`

#### `MCP_OAUTH_CALLBACK_PORT`
- **Type:** Integer (port number)
- **Default:** Auto-selected (typically 3000-3100 range)
- **Description:** Port for MCP OAuth callback server. Used when MCP servers require OAuth.
- **Example:** `export MCP_OAUTH_CALLBACK_PORT=8080`

#### `MCP_OAUTH_CLIENT_METADATA_URL`
- **Type:** URL
- **Default:** Unspecified
- **Description:** URL for MCP OAuth client metadata. Points to OAuth provider metadata endpoint.
- **Example:** `export MCP_OAUTH_CLIENT_METADATA_URL=https://oauth.company.com/.well-known/openid-configuration`

#### `MCP_CLIENT_SECRET`
- **Type:** String (OAuth client secret)
- **Default:** Unspecified
- **Description:** Client secret for MCP OAuth authentication. Required if using OAuth with MCP.
- **Example:** `export MCP_CLIENT_SECRET=secret_abc123`
- **Security:** Store in a secret manager.

#### `MCP_XAA_IDP_CLIENT_SECRET`
- **Type:** String (IdP client secret)
- **Default:** Unspecified
- **Description:** IdP client secret for MCP XAA (Cross-Application Authentication). Used by the --client-secret CLI flag.
- **Example:** `export MCP_XAA_IDP_CLIENT_SECRET=idp_secret_xyz`
- **Security:** Store in a secret manager.

#### `MCP_TRUNCATION_PROMPT_OVERRIDE`
- **Type:** String (enum: subagent, legacy)
- **Default:** Feature flag–dependent (tengu_mcp_subagent_prompt)
- **Description:** Override MCP output truncation prompt mode. Controls how long outputs are summarized.
- **Example:** `export MCP_TRUNCATION_PROMPT_OVERRIDE=legacy`

### Plugins & Extensions

#### `CLAUDE_CODE_PLUGIN_CACHE_DIR`
- **Type:** String (directory path)
- **Default:** `${CLAUDE_CONFIG_DIR}/plugins-cache`
- **Description:** Custom cache directory for plugin storage. Downloaded plugins are cached here.
- **Example:** `export CLAUDE_CODE_PLUGIN_CACHE_DIR=/var/cache/claude-plugins`

#### `CLAUDE_CODE_PLUGIN_SEED_DIR`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** Directory containing seed/pre-installed plugins. Plugins in this dir are installed on first run.
- **Example:** `export CLAUDE_CODE_PLUGIN_SEED_DIR=/opt/claude-seeds/plugins`

#### `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (typically 30000)
- **Description:** Git operation timeout for plugin installation in milliseconds.
- **Example:** `export CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS=60000`

#### `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Keep the existing marketplace clone when git pull fails instead of re-cloning. Useful if network is unreliable.
- **Example:** `export CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE=1`

#### `CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use zip-based caching for plugin downloads. Useful for bandwidth-limited environments.
- **Example:** `export CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE=1`

#### `CLAUDE_CODE_SYNC_PLUGIN_INSTALL`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Install plugins synchronously instead of async. Blocks startup until plugins are installed.
- **Example:** `export CLAUDE_CODE_SYNC_PLUGIN_INSTALL=1`

#### `CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (typically 60000)
- **Description:** Timeout for synchronous plugin installation in milliseconds.
- **Example:** `export CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS=120000`

#### `CLAUDE_CODE_USE_COWORK_PLUGINS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable cowork-mode plugins. Plugins designed for collaborative coding.
- **Example:** `export CLAUDE_CODE_USE_COWORK_PLUGINS=1`

#### `FORCE_AUTOUPDATE_PLUGINS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force auto-update of installed plugins. Checks for updates on each startup.
- **Example:** `export FORCE_AUTOUPDATE_PLUGINS=1`

### IDE Integration

#### `CLAUDE_CODE_AUTO_CONNECT_IDE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** true
- **Description:** Automatically connect to detected IDE. Can be set to '0' to force-disable auto-connect.
- **Example:** `export CLAUDE_CODE_AUTO_CONNECT_IDE=0`

#### `CLAUDE_CODE_IDE_HOST_OVERRIDE`
- **Type:** String (hostname or IP)
- **Default:** localhost
- **Description:** Override the IDE host address. Useful when IDE is on a different machine.
- **Example:** `export CLAUDE_CODE_IDE_HOST_OVERRIDE=192.168.1.100`

#### `CLAUDE_CODE_SSE_PORT`
- **Type:** Integer (port number)
- **Default:** Auto-selected
- **Description:** SSE (Server-Sent Events) port for IDE communication. Used for bidirectional IDE/CLI communication.
- **Example:** `export CLAUDE_CODE_SSE_PORT=9000`

#### `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip automatic IDE extension installation. Disables auto-install of VS Code extension, etc.
- **Example:** `export CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL=1`

#### `CLAUDE_CODE_IDE_SKIP_VALID_CHECK`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip IDE connection validity check. Assumes IDE is available without testing.
- **Example:** `export CLAUDE_CODE_IDE_SKIP_VALID_CHECK=1`

#### `VSCODE_GIT_ASKPASS_MAIN`
- **Type:** String (file path)
- **Default:** Unspecified (set by VS Code)
- **Description:** Path to VS Code git askpass helper. Used for IDE detection.
- **Example:** `/path/to/vscode/askpass`

#### `CURSOR_TRACE_ID`
- **Type:** String (trace ID)
- **Default:** Unspecified (set by Cursor IDE)
- **Description:** Trace ID from Cursor IDE. Used for tracing interactions between Cursor and Claude Code.
- **Example:** `abc123def456`

#### `ZED_TERM`
- **Type:** String (terminal reference)
- **Default:** Unspecified (set by Zed editor)
- **Description:** Detected when running inside Zed editor terminal. Not typically set manually.
- **Example:** Unspecified

### Remote & Cowork

#### `CLAUDE_CODE_REMOTE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates Claude Code is running in remote/headless mode. Disables UI and adjusts behavior.
- **Example:** `export CLAUDE_CODE_REMOTE=1`

#### `CLAUDE_CODE_IS_COWORK`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates Claude Code is running in cowork (collaborative) mode.
- **Example:** `export CLAUDE_CODE_IS_COWORK=1`

#### `CLAUDE_CODE_REMOTE_SESSION_ID`
- **Type:** String (session identifier)
- **Default:** Unspecified
- **Description:** Session ID for remote connections. Included in x-claude-remote-session-id header.
- **Example:** `export CLAUDE_CODE_REMOTE_SESSION_ID=session-abc123`

#### `CLAUDE_CODE_CONTAINER_ID`
- **Type:** String (container identifier)
- **Default:** Unspecified
- **Description:** Container ID for remote sessions. Included in x-claude-remote-container-id header.
- **Example:** `export CLAUDE_CODE_CONTAINER_ID=container-xyz789`

#### `CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE`
- **Type:** String (environment type)
- **Default:** Unspecified
- **Description:** Type of remote environment (included in telemetry). E.g., docker, kubernetes, lambda.
- **Example:** `export CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE=docker`

#### `CLAUDE_CODE_REMOTE_MEMORY_DIR`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** Directory for remote memory storage. Used when auto-memory checks for remote mode.
- **Example:** `export CLAUDE_CODE_REMOTE_MEMORY_DIR=/var/lib/claude-memory`

#### `CLAUDE_CODE_REMOTE_SEND_KEEPALIVES`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Send keepalive messages in remote mode. Keeps connection alive across idle periods.
- **Example:** `export CLAUDE_CODE_REMOTE_SEND_KEEPALIVES=1`

#### `CLAUDE_CODE_USE_CCR_V2`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use CCR v2 for remote sessions. Updates to the new CCR protocol version.
- **Example:** `export CLAUDE_CODE_USE_CCR_V2=1`

#### `CLAUDE_BRIDGE_USE_CCR_V2`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use CCR v2 protocol for bridge/session connections.
- **Example:** `export CLAUDE_BRIDGE_USE_CCR_V2=1`

#### `CLAUDE_CODE_POST_FOR_SESSION_INGRESS_V2`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use POST for session ingress v2 protocol. Newer protocol using POST instead of GET.
- **Example:** `export CLAUDE_CODE_POST_FOR_SESSION_INGRESS_V2=1`

#### `SESSION_INGRESS_URL`
- **Type:** URL
- **Default:** Unspecified
- **Description:** URL for session ingress in remote mode. Entry point for remote sessions.
- **Example:** `export SESSION_INGRESS_URL=https://ingress.company.com/session`

#### `CLAUDE_SESSION_INGRESS_TOKEN_FILE`
- **Type:** String (file path)
- **Default:** Unspecified
- **Description:** Path to file containing session ingress token. Token is read from this file.
- **Example:** `export CLAUDE_SESSION_INGRESS_TOKEN_FILE=/run/secrets/ingress-token`

#### `CLAUDE_STREAM_IDLE_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** 90000
- **Description:** Stream idle timeout in milliseconds before watchdog kicks in. Detects stalled streams.
- **Example:** `export CLAUDE_STREAM_IDLE_TIMEOUT_MS=120000`

#### `CCR_ENABLE_BUNDLE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable code bundle uploads for CCR (Claude Code Remote). Uploads local code to remote.
- **Example:** `export CCR_ENABLE_BUNDLE=1`

#### `CCR_FORCE_BUNDLE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force code bundle uploads for CCR regardless of feature flag.
- **Example:** `export CCR_FORCE_BUNDLE=1`

#### `CCR_UPSTREAM_PROXY_ENABLED`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable upstream proxy for Claude Code Remote. Requires CLAUDE_CODE_REMOTE and CLAUDE_CODE_REMOTE_SESSION_ID.
- **Example:** `export CCR_UPSTREAM_PROXY_ENABLED=1`

#### `CLAUDE_CODE_WORKSPACE_HOST_PATHS`
- **Type:** String (colon-separated paths)
- **Default:** Unspecified
- **Description:** Host paths for workspace mapping in containerized environments. Maps container paths to host paths.
- **Example:** `export CLAUDE_CODE_WORKSPACE_HOST_PATHS=/workspace:/mnt/workspace`

#### `CLAUDE_COWORK_MEMORY_PATH_OVERRIDE`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** Override the memory directory path in cowork mode.
- **Example:** `export CLAUDE_COWORK_MEMORY_PATH_OVERRIDE=/shared/memory`

#### `CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES`
- **Type:** String (markdown text)
- **Default:** Unspecified
- **Description:** Extra guidelines to inject into cowork memory system. Appended to standard memory guidelines.
- **Example:** `export CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES="Always document decisions in the shared wiki."`

#### `CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX`
- **Type:** String (prefix)
- **Default:** `os.hostname()` (sanitized to lowercase-dashed)
- **Description:** Prefix for remote control session names. Identifies sessions from this host.
- **Example:** `export CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX=prod-server`

#### `LOCAL_BRIDGE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable local bridge mode. Used for local development of bridge features.
- **Example:** `export LOCAL_BRIDGE=1`

---

[← Back to env/README.md](/claude-code-docs/env/overview/)
