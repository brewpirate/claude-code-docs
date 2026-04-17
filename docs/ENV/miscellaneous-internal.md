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

### `CLAUDE_CODE_COORDINATOR_MODE`
- **Type:** Boolean (truthy values activate)
- **Default:** unset
- **Description:** Activates coordinator mode — Claude Code's multi-agent orchestration layer. Gated at compile time by `COORDINATOR_MODE` flag. Session resume auto-flips this env var to match the mode the session was created in. See [Coordinator/](../Coordinator/README.md).
- **Example:** `export CLAUDE_CODE_COORDINATOR_MODE=1`
- **Related:** `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`, `CLAUDE_CODE_TASK_LIST_ID`

### `CLAUDE_NOTIFICATION_CHANNEL`
- **Type:** Enum (string)
- **Default:** `auto`
- **Allowed values:** `auto`, `iterm2`, `iterm2_with_bell`, `kitty`, `osascript`, `notify-send`, `command`, `bell`
- **Description:** Selects the desktop notification mechanism. `auto` picks the best available for the terminal. `osascript` is macOS-only; `notify-send` is Linux-only; `iterm2*` and `kitty` require those specific terminals. `command` runs a configured shell command. `bell` writes `\a` to the terminal.
- **Example:** `export CLAUDE_NOTIFICATION_CHANNEL=kitty`

### `UDS_INBOX`
- **Type:** Boolean (truthy values activate)
- **Default:** unset
- **Description:** Enables a Unix Domain Socket inbox for inter-process messaging between concurrent Claude Code sessions. When set (and not in `--bare` mode), Claude Code spawns a UDS listener at startup. Socket path exported to child processes via `CLAUDE_CODE_MESSAGING_SOCKET`. Internal infrastructure — primarily ant-only.
- **Example:** `export UDS_INBOX=1`
- **Related:** `CLAUDE_CODE_MESSAGING_SOCKET`

### `CLAUDE_CODE_MESSAGING_SOCKET`
- **Type:** String (filesystem path)
- **Default:** set by Claude Code when `UDS_INBOX` is active
- **Description:** Path to the UDS inbox socket, populated by the parent Claude Code process when `UDS_INBOX` is set. Child processes read this env var to connect back to the parent's messaging server. Users should NOT set this directly.
- **Example:** `/tmp/claude-code-messaging-<pid>.sock` (auto-generated)
- **Related:** `UDS_INBOX`

---

[← Back to env/README.md](./README.md)
