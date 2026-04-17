# Miscellaneous & Internal


### `DEBUG`
- **Type:** String (module filter)
- **Default:** Unspecified
- **Description:** Enable debug output for various modules. Wildcard filtering supported (e.g., claude:* for all Claude-prefixed modules).
- **Example:** `export DEBUG=claude:*`

### `DEBUG_AUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable debug output for authentication. Traces auth flow for troubleshooting.
- **Example:** `export DEBUG_AUTH=1`

### `DEBUG_SDK`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable debug output for the Anthropic SDK. Traces SDK behavior.
- **Example:** `export DEBUG_SDK=1`

### `CLAUBBIT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates running in Claubbit mode. Skips trust dialog.
- **Example:** `export CLAUBBIT=1`

### `CLAUDE_CODE_ATTRIBUTION_HEADER`
- **Type:** Boolean (1, true, 0, false)
- **Default:** true
- **Description:** Control the attribution header in API requests. Set to '0' to disable.
- **Example:** `export CLAUDE_CODE_ATTRIBUTION_HEADER=0`

### `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Scrub environment variables from subprocesses. Removes sensitive vars before spawning subprocesses.
- **Example:** `export CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1`

### `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (typically 5000)
- **Description:** Timeout in milliseconds for session-end hook execution.
- **Example:** `export CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=10000`

### `CLAUDE_FORCE_DISPLAY_SURVEY`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force display of the user survey. Useful for testing the survey UI.
- **Example:** `export CLAUDE_FORCE_DISPLAY_SURVEY=1`

### `FORCE_CODE_TERMINAL`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force code terminal mode. Enables a minimal terminal environment.
- **Example:** `export FORCE_CODE_TERMINAL=1`

### `CHOKIDAR_INTERVAL`
- **Type:** Integer (milliseconds)
- **Default:** 100
- **Description:** Polling interval for Chokidar file watcher in milliseconds. Only used when polling is active.
- **Example:** `export CHOKIDAR_INTERVAL=200`

### `CHOKIDAR_USEPOLLING`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force Chokidar to use polling instead of native file watching. Useful on systems with unreliable inotify.
- **Example:** `export CHOKIDAR_USEPOLLING=1`

### `BETA_TRACING_ENDPOINT`
- **Type:** URL
- **Default:** Unspecified
- **Description:** Endpoint URL for beta tracing. Used together with ENABLE_BETA_TRACING_DETAILED.
- **Example:** `export BETA_TRACING_ENDPOINT=https://tracing.company.com`

### `BUGHUNTER_DEV_BUNDLE_B64`
- **Type:** String (base64-encoded data)
- **Default:** Unspecified
- **Description:** Base64-encoded development bundle passed to the bughunter agent subprocess.
- **Example:** `export BUGHUNTER_DEV_BUNDLE_B64=SGVsbG8gV29ybGQ=`

### `VOICE_STREAM_BASE_URL`
- **Type:** URL
- **Default:** Unspecified
- **Description:** Base URL for voice streaming service.
- **Example:** `export VOICE_STREAM_BASE_URL=https://voice.company.com`

### `SRT_DEBUG`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable SRT (Secure Reliable Transport) debug logging.
- **Example:** `export SRT_DEBUG=1`

### `CLAUDE_CHROME_PERMISSION_MODE`
- **Type:** String (permission mode)
- **Default:** Unspecified
- **Description:** Set permission mode for Claude-in-Chrome extension.
- **Example:** `export CLAUDE_CHROME_PERMISSION_MODE=unrestricted`

---

[← Back to env/README.md](./README.md)
