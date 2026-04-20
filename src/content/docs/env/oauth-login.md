---
title: "OAuth & Login"
tags: [environment]
---


### `CLAUDE_CODE_OAUTH_TOKEN`
- **Type:** String (bearer token)
- **Default:** Unspecified
- **Precedence:** Checked after ANTHROPIC_AUTH_TOKEN in auth source priority
- **Description:** OAuth token for authentication. Used when ANTHROPIC_AUTH_TOKEN is not set but OAuth is preferred.
- **Example:** `export CLAUDE_CODE_OAUTH_TOKEN=oauth_token_abc123...`

### `CLAUDE_CODE_ACCOUNT_UUID`
- **Type:** String (UUID)
- **Default:** Unspecified (looked up via OAuth)
- **Description:** Pre-set account UUID, bypassing OAuth lookup. Useful when running non-interactively.
- **Example:** `export CLAUDE_CODE_ACCOUNT_UUID=550e8400-e29b-41d4-a716-446655440000`

### `CLAUDE_CODE_ORGANIZATION_UUID`
- **Type:** String (UUID)
- **Default:** Unspecified (looked up via OAuth)
- **Description:** Pre-set organization UUID, bypassing OAuth lookup.
- **Example:** `export CLAUDE_CODE_ORGANIZATION_UUID=550e8400-e29b-41d4-a716-446655440001`

### `CLAUDE_CODE_USER_EMAIL`
- **Type:** String (email address)
- **Default:** Unspecified (looked up via OAuth)
- **Description:** Pre-set user email, bypassing OAuth lookup. Useful for logging and telemetry when running non-interactively.
- **Example:** `export CLAUDE_CODE_USER_EMAIL=user@company.com`

### `CLAUDE_CODE_ACCOUNT_TAGGED_ID`
- **Type:** String (tagged account identifier)
- **Default:** Unspecified (falls back to hash of account UUID)
- **Description:** Tagged account ID for OTEL metrics. Falls back to hashing the account UUID if not set.
- **Example:** `export CLAUDE_CODE_ACCOUNT_TAGGED_ID=acct_12345_prod`

### `CLAUDE_CODE_SESSION_ACCESS_TOKEN`
- **Type:** String (bearer token)
- **Default:** Unspecified
- **Description:** Session-specific access token for authentication. Used in some multi-session scenarios.
- **Example:** `export CLAUDE_CODE_SESSION_ACCESS_TOKEN=session_token_xyz...`

### `CLAUDE_CODE_OAUTH_CLIENT_ID`
- **Type:** String (client ID)
- **Default:** Anthropic's default client ID
- **Description:** Custom OAuth client ID. Override this only if using a custom OAuth app registered with Anthropic.
- **Example:** `export CLAUDE_CODE_OAUTH_CLIENT_ID=custom_client_id_123`

### `CLAUDE_CODE_OAUTH_REFRESH_TOKEN`
- **Type:** String (refresh token)
- **Default:** Unspecified
- **Description:** OAuth refresh token for token renewal. Allows offline token refresh without user interaction.
- **Example:** `export CLAUDE_CODE_OAUTH_REFRESH_TOKEN=refresh_token_abc...`

### `CLAUDE_CODE_OAUTH_SCOPES`
- **Type:** String (space-separated scopes)
- **Default:** Standard Anthropic scopes
- **Description:** OAuth scopes to request during authentication. Overrides default scopes.
- **Example:** `export CLAUDE_CODE_OAUTH_SCOPES='openid profile email offline_access'`

### `CLAUDE_CODE_CUSTOM_OAUTH_URL`
- **Type:** URL (OAuth authorization endpoint)
- **Default:** Anthropic's OAuth endpoint
- **Precedence:** Must be in the approved endpoints list
- **Description:** Custom OAuth URL endpoint. Must be in an approved list for security. Used for custom OAuth providers.
- **Example:** `export CLAUDE_CODE_CUSTOM_OAUTH_URL=https://oauth.company.com/authorize`

### `CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR`
- **Type:** Integer (file descriptor number)
- **Default:** Unspecified
- **Description:** File descriptor number to read API key from. Must be a valid integer (typically 3 or higher). Used for secure credential passing in containerized environments.
- **Example:** `export CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR=3`  # Read API key from fd 3

### `CLAUDE_CODE_API_KEY_HELPER_TTL_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified
- **Description:** TTL in milliseconds for API key helper cache. Must be a non-negative integer. Higher values reduce helper invocations.
- **Example:** `export CLAUDE_CODE_API_KEY_HELPER_TTL_MS=300000`  # 5 minutes

### `CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR`
- **Type:** Integer (file descriptor number)
- **Default:** Unspecified
- **Description:** File descriptor number to read OAuth token from. Similar to CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR but for OAuth tokens.
- **Example:** `export CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR=4`

### `CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR`
- **Type:** Integer (file descriptor number)
- **Default:** Unspecified
- **Description:** File descriptor for WebSocket authentication credentials. Used for remote/bridge connections.
- **Example:** `export CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR=5`

### `CLAUDE_TRUSTED_DEVICE_TOKEN`
- **Type:** String (token)
- **Default:** Unspecified
- **Description:** Pre-set trusted device token. When set, skips trusted device enrollment. Env var takes precedence over stored tokens.
- **Example:** `export CLAUDE_TRUSTED_DEVICE_TOKEN=device_token_xyz...`

### `USE_LOCAL_OAUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use local OAuth endpoint for development. Points to localhost OAuth server instead of production.
- **Example:** `export USE_LOCAL_OAUTH=1`

### `CLAUDE_LOCAL_OAUTH_API_BASE`
- **Type:** URL
- **Default:** `http://localhost:3000` (typical development default)
- **Description:** Local OAuth API base URL for development. Used when USE_LOCAL_OAUTH is enabled.
- **Example:** `export CLAUDE_LOCAL_OAUTH_API_BASE=http://localhost:3001`

### `CLAUDE_LOCAL_OAUTH_APPS_BASE`
- **Type:** URL
- **Default:** `http://localhost:3000` (typical development default)
- **Description:** Local OAuth apps base URL for development.
- **Example:** `export CLAUDE_LOCAL_OAUTH_APPS_BASE=http://localhost:3001/apps`

### `CLAUDE_LOCAL_OAUTH_CONSOLE_BASE`
- **Type:** URL
- **Default:** `http://localhost:3000` (typical development default)
- **Description:** Local OAuth console base URL for development.
- **Example:** `export CLAUDE_LOCAL_OAUTH_CONSOLE_BASE=http://localhost:3001/console`

### `USE_STAGING_OAUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use staging OAuth endpoint for testing. Routes OAuth to staging servers instead of production.
- **Example:** `export USE_STAGING_OAUTH=1`

---

[← Back to env/README.md](/claude-code-docs/env/overview/)
