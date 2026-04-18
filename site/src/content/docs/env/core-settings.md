---
title: "Core Settings"
tags: [environment]
---

# Core Settings


### `CLAUDE_CODE_SHELL`
- **Type:** String (shell path or name)
- **Default:** Auto-detected (bash, zsh, fish, powershell, etc.)
- **Description:** Override the shell used for Bash/shell tool execution. If set, Claude Code uses this shell instead of auto-detecting.
- **Example:** `export CLAUDE_CODE_SHELL=/bin/zsh`

### `CLAUDE_CODE_SHELL_PREFIX`
- **Type:** String (command prefix and args)
- **Default:** Unspecified
- **Description:** Prefix command/args added before shell invocations. Useful for wrapping all shell commands (e.g., with env vars or sandboxing).
- **Example:** `export CLAUDE_CODE_SHELL_PREFIX='env -i'`

### `CLAUDE_CODE_SIMPLE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Simplified mode. Disables attachments, auto memory, and other advanced features. Useful for lightweight or restricted environments.
- **Example:** `export CLAUDE_CODE_SIMPLE=1`

### `CLAUDE_CODE_DONT_INHERIT_ENV`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Don't inherit environment variables from parent process. When set, starts with a clean slate.
- **Example:** `export CLAUDE_CODE_DONT_INHERIT_ENV=1`

### `CLAUDE_CONFIG_DIR`
- **Type:** String (directory path)
- **Default:** `~/.claude` on Unix; `%APPDATA%\Claude` on Windows
- **Description:** Override the default Claude configuration directory path. Stores settings, cache, plugins, and other state.
- **Example:** `export CLAUDE_CONFIG_DIR=/etc/claude-config`

### `CLAUDE_TMPDIR`
- **Type:** String (directory path)
- **Default:** System temp dir (from TMPDIR or /tmp on Unix; %TEMP% on Windows)
- **Description:** Override the temp directory used by Claude Code. Used for temporary files, tool outputs, etc.
- **Example:** `export CLAUDE_TMPDIR=/scratch/claude-tmp`

### `CLAUDE_CODE_TMPDIR`
- **Type:** String (directory path)
- **Default:** Same as CLAUDE_TMPDIR
- **Description:** Alternative var name for temp directory. Takes precedence over CLAUDE_TMPDIR if set.
- **Example:** `export CLAUDE_CODE_TMPDIR=/var/tmp/claude`

### `CLAUDE_DEBUG`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable debug mode for Claude Code. Increases logging verbosity.
- **Example:** `export CLAUDE_DEBUG=1`

### `CLAUDE_CODE_DEBUG_LOGS_DIR`
- **Type:** String (directory path)
- **Default:** `${CLAUDE_CONFIG_DIR}/debug/SESSION_ID.txt`
- **Description:** Custom directory for debug log files. Logs go to SESSION.txt in this directory.
- **Example:** `export CLAUDE_CODE_DEBUG_LOGS_DIR=/var/log/claude-debug`

### `CLAUDE_CODE_DEBUG_LOG_LEVEL`
- **Type:** String (enum: verbose, debug, info, warn, error)
- **Default:** `debug`
- **Description:** Debug log level. Controls verbosity of debug logs.
- **Example:** `export CLAUDE_CODE_DEBUG_LOG_LEVEL=verbose`

### `CLAUDE_CODE_DIAGNOSTICS_FILE`
- **Type:** String (file path)
- **Default:** Unspecified (no diagnostics file written)
- **Description:** Path to write diagnostics output file. Useful for debugging issues and collecting system info.
- **Example:** `export CLAUDE_CODE_DIAGNOSTICS_FILE=/tmp/claude-diagnostics.txt`

### `CLAUDE_ENV_FILE`
- **Type:** String (file path)
- **Default:** Unspecified
- **Description:** Path to a custom environment file to load on startup. Useful for project-specific env vars. Vars in this file override defaults but not CLI args.
- **Example:** `export CLAUDE_ENV_FILE=./.claude.env`

### `CLAUDE_CODE_ENTRYPOINT`
- **Type:** String (enum: cli, sdk-ts, sdk-py, sdk-cli, mcp, claude-code-github-action, claude-desktop, local-agent)
- **Default:** Auto-detected (usually cli)
- **Description:** Identifies how Claude Code was launched. Used for telemetry and feature selection. Typically set by the launcher, not manually.
- **Example:** `export CLAUDE_CODE_ENTRYPOINT=local-agent`

### `CLAUDE_CODE_ENVIRONMENT_KIND`
- **Type:** String (e.g., local, remote, container)
- **Default:** `local`
- **Description:** Identifies the environment kind. Affects resource limits, feature availability, etc.
- **Example:** `export CLAUDE_CODE_ENVIRONMENT_KIND=container`

### `CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION`
- **Type:** String (version identifier)
- **Default:** Unspecified
- **Description:** Version of the environment runner. Used for tracking and debugging in remote environments.
- **Example:** `export CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION=v1.2.3`

### `CLAUDE_CODE_HOST_PLATFORM`
- **Type:** String (platform identifier)
- **Default:** Auto-detected (darwin, linux, win32, etc.)
- **Description:** Override the detected host platform identifier. Useful when auto-detection fails.
- **Example:** `export CLAUDE_CODE_HOST_PLATFORM=linux`

### `CLAUDE_CODE_QUESTION_PREVIEW_FORMAT`
- **Type:** String (format identifier)
- **Default:** Unspecified
- **Description:** Format for question preview display. Controls how user questions are shown in UI.
- **Example:** `export CLAUDE_CODE_QUESTION_PREVIEW_FORMAT=compact`

### `CLAUDE_CODE_TAGS`
- **Type:** String (comma-separated tags)
- **Default:** Unspecified
- **Description:** Custom tags to include in telemetry and event tracking. Useful for grouping sessions by context.
- **Example:** `export CLAUDE_CODE_TAGS=experiment-v1,team-blue`

### `CLAUDE_CODE_FORCE_FULL_LOGO`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force display of the full ASCII logo on startup. By default, logo is simplified in some contexts.
- **Example:** `export CLAUDE_CODE_FORCE_FULL_LOGO=1`

### `CLAUDE_CODE_NEW_INIT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Trigger new initialization flow. Forces reinitializing config, migrations, etc.
- **Example:** `export CLAUDE_CODE_NEW_INIT=1`

### `CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Exit immediately after the first UI render. Used for testing and automation.
- **Example:** `export CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER=1`

### `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (no delay)
- **Description:** Delay in ms before exiting after stop signal. Allows cleanup and graceful shutdown.
- **Example:** `export CLAUDE_CODE_EXIT_AFTER_STOP_DELAY=2000`

### `CLAUDE_CODE_WORKER_EPOCH`
- **Type:** String (epoch identifier)
- **Default:** Unspecified
- **Description:** Worker epoch identifier for multi-worker setups. Groups workers from the same epoch.
- **Example:** `export CLAUDE_CODE_WORKER_EPOCH=epoch-123`

### `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates the API provider is managed by the host environment. When true, provider selection via CLAUDE_CODE_USE_BEDROCK/VERTEX/etc. is disabled.
- **Example:** `export CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST=1`

### `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip organization check in fast mode. Disables org-level permission checks for fast mode.
- **Example:** `export CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK=1`

### `CLAUDE_CODE_SYNTAX_HIGHLIGHT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** true (auto-detected based on terminal)
- **Description:** Control syntax highlighting in output. Set to 0 to disable, 1 to enable.
- **Example:** `export CLAUDE_CODE_SYNTAX_HIGHLIGHT=0`

---

[← Back to env/README.md](/claude-code-docs/env/overview/)
