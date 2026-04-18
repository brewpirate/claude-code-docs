---
title: "Authentication & API Access"
tags: [environment]
---

# Authentication & API Access


### `ANTHROPIC_API_KEY`
- **Type:** String
- **Default:** Unspecified
- **Precedence:** Fallback when ANTHROPIC_AUTH_TOKEN is not set
- **Description:** Primary API key for Anthropic's Claude API. Used as the fallback authentication method when no OAuth token is configured.
- **Example:** `export ANTHROPIC_API_KEY=sk-ant-abcdef123456`
- **See also:** ANTHROPIC_AUTH_TOKEN, CLAUDE_CODE_OAUTH_TOKEN

### `ANTHROPIC_AUTH_TOKEN`
- **Type:** String (bearer token)
- **Default:** Unspecified
- **Precedence:** Takes priority over ANTHROPIC_API_KEY for authorization headers
- **Description:** Alternative bearer token for Anthropic services. When set, used in preference to ANTHROPIC_API_KEY.
- **Example:** `export ANTHROPIC_AUTH_TOKEN=Bearer eyJhbGc...`
- **See also:** ANTHROPIC_API_KEY, CLAUDE_CODE_OAUTH_TOKEN

### `ANTHROPIC_BASE_URL`
- **Type:** URL
- **Default:** `https://api.anthropic.com`
- **Description:** Custom base URL for Anthropic API endpoints. Overrides the default endpoint. Useful for private deployments or proxy routes.
- **Example:** `export ANTHROPIC_BASE_URL=https://internal-api.company.com/anthropic`
- **See also:** CLAUDE_CODE_API_BASE_URL

### `CLAUDE_CODE_API_BASE_URL`
- **Type:** URL
- **Default:** Falls back to ANTHROPIC_BASE_URL, then https://api.anthropic.com
- **Precedence:** Checked before ANTHROPIC_BASE_URL
- **Description:** Claude Code–specific alternative base URL for the Anthropic API.
- **Example:** `export CLAUDE_CODE_API_BASE_URL=https://api.internal.company.com`
- **See also:** ANTHROPIC_BASE_URL

### `ANTHROPIC_CUSTOM_HEADERS`
- **Type:** String (newline-separated Key: Value pairs)
- **Default:** Unspecified
- **Description:** Custom HTTP headers to include in all API requests. Newline-separated; each line is a header name and value.
- **Example:** `export ANTHROPIC_CUSTOM_HEADERS=$'X-Custom-Header: value1\nX-Another: value2'`

### `ANTHROPIC_BETAS`
- **Type:** String (comma-separated list)
- **Default:** Unspecified
- **Description:** Comma-separated list of beta feature headers to include in API requests. Appended to internal beta flags managed by Claude Code.
- **Example:** `export ANTHROPIC_BETAS=interleaved-thinking-2025-05-14,prompt-caching-2024-07-16`

### `ANTHROPIC_UNIX_SOCKET`
- **Type:** String (filesystem path)
- **Default:** Unspecified
- **Description:** Unix socket path for Anthropic API connections. Used with Bun runtime for direct socket communication instead of HTTP. Advanced use case.
- **Example:** `export ANTHROPIC_UNIX_SOCKET=/tmp/anthropic-api.sock`

### `ANTHROPIC_LOG`
- **Type:** String (log level)
- **Default:** Unspecified
- **Description:** Anthropic SDK internal logging level. Controls verbosity of the underlying Anthropic SDK, not Claude Code itself.
- **Example:** `export ANTHROPIC_LOG=debug`

### `API_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** 600000 (10 minutes)
- **Description:** API request timeout. Shown in timeout error messages with a suggestion to increase if needed. Must be a positive integer.
- **Example:** `export API_TIMEOUT_MS=1200000`  # 20 minutes

---

[← Back to env/README.md](/claude-code-docs/env/overview/)
