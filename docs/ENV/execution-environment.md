# Execution Environment


### Bash & Shell

#### `BASH_MAX_OUTPUT_LENGTH`
- **Type:** Integer (characters)
- **Default:** 30000
- **Upper limit:** 150000
- **Description:** Maximum output length for bash commands. Longer outputs are truncated. Must be > 0 and <= 150000.
- **Example:** `export BASH_MAX_OUTPUT_LENGTH=50000`

#### `TASK_MAX_OUTPUT_LENGTH`
- **Type:** Integer (characters)
- **Default:** Unspecified (typically same as BASH_MAX_OUTPUT_LENGTH)
- **Description:** Maximum output length for task results. Truncates long task outputs.
- **Example:** `export TASK_MAX_OUTPUT_LENGTH=50000`

#### `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Maintain the project working directory across bash commands. When true, each bash invocation resumes in the previous directory context.
- **Example:** `export CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR=1`

#### `CLAUDE_CODE_USE_POWERSHELL_TOOL`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use PowerShell instead of Bash for shell commands. Useful on Windows or when PowerShell is preferred.
- **Example:** `export CLAUDE_CODE_USE_POWERSHELL_TOOL=1`

#### `CLAUDE_CODE_GIT_BASH_PATH`
- **Type:** String (path to bash executable)
- **Default:** Auto-detected on Windows
- **Description:** Path to git bash executable on Windows. Overrides auto-detection.
- **Example:** `export CLAUDE_CODE_GIT_BASH_PATH="C:\\Program Files\\Git\\bin\\bash.exe"`

#### `CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (typically 5000 ms)
- **Description:** PowerShell command parse timeout in milliseconds. Parsed as int; must be > 0.
- **Example:** `export CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS=10000`

#### `SLASH_COMMAND_TOOL_CHAR_BUDGET`
- **Type:** Integer (characters)
- **Default:** Unspecified
- **Description:** Character budget for slash command tool output. Truncates long outputs from /command invocations.
- **Example:** `export SLASH_COMMAND_TOOL_CHAR_BUDGET=10000`

### Tool Configuration

#### `CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY`
- **Type:** Integer
- **Default:** 10
- **Description:** Maximum concurrent tool use operations. Higher values allow parallel tool execution but consume more resources.
- **Example:** `export CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY=20`

#### `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS`
- **Type:** Integer (tokens)
- **Default:** Unspecified (typically 10000)
- **Description:** Maximum output tokens when reading files. Longer files are truncated to this token limit.
- **Example:** `export CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS=50000`

#### `CLAUDE_CODE_GLOB_TIMEOUT_SECONDS`
- **Type:** Integer (seconds)
- **Default:** Unspecified (typically 30)
- **Description:** Timeout in seconds for glob operations. Prevents hangs on slow filesystems.
- **Example:** `export CLAUDE_CODE_GLOB_TIMEOUT_SECONDS=60`

#### `CLAUDE_CODE_GLOB_HIDDEN`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Include hidden files in glob searches. When true, globs match .hidden files.
- **Example:** `export CLAUDE_CODE_GLOB_HIDDEN=1`

#### `CLAUDE_CODE_GLOB_NO_IGNORE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Don't respect .gitignore in glob searches. When true, ignores .gitignore rules.
- **Example:** `export CLAUDE_CODE_GLOB_NO_IGNORE=1`

#### `USE_BUILTIN_RIPGREP`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use the built-in ripgrep binary instead of system ripgrep. Useful when system ripgrep is unavailable or outdated.
- **Example:** `export USE_BUILTIN_RIPGREP=1`

#### `CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Emit summary descriptions for tool use actions. Shows human-readable summaries of tool calls.
- **Example:** `export CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES=1`

#### `CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Include partial/streaming messages in output. Shows in-flight messages as they arrive.
- **Example:** `export CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES=1`

#### `CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Show 'SandboxedBash' label when sandbox is active. Useful for visibility in sandboxed environments.
- **Example:** `export CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR=1`

#### `MAX_STRUCTURED_OUTPUT_RETRIES`
- **Type:** Integer
- **Default:** 5
- **Description:** Maximum retries for structured output parsing. Higher values retry more on parse failures.
- **Example:** `export MAX_STRUCTURED_OUTPUT_RETRIES=10`

#### `USE_API_CONTEXT_MANAGEMENT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use API-side context management instead of client-side. Delegates context handling to the API.
- **Example:** `export USE_API_CONTEXT_MANAGEMENT=1`

### Node.js & Bun Runtime

#### `NODE_ENV`
- **Type:** String (enum: development, production, test)
- **Default:** `production`
- **Description:** Node.js environment. Affects module loading, optimizations, and error handling.
- **Example:** `export NODE_ENV=development`

#### `NODE_OPTIONS`
- **Type:** String (Node.js CLI options)
- **Default:** Unspecified
- **Description:** Additional Node.js CLI options. Passed to the Node.js runtime.
- **Example:** `export NODE_OPTIONS='--max-old-space-size=4096'`

#### `NODE_DEBUG`
- **Type:** String (module filter)
- **Default:** Unspecified
- **Description:** Node.js debug module filter. Enables debug output for specific modules.
- **Example:** `export NODE_DEBUG=http,net`

#### `NODE_UNIQUE_ID`
- **Type:** String (worker ID)
- **Default:** Unspecified
- **Description:** Node.js cluster worker unique ID. Used in cluster mode.
- **Example:** `export NODE_UNIQUE_ID=worker-1`

#### `NODE_CLUSTER_SCHED_POLICY`
- **Type:** String (enum: rr, none)
- **Default:** `rr` (round-robin)
- **Description:** Node.js cluster scheduling policy. Controls how OS assigns connections to workers.
- **Example:** `export NODE_CLUSTER_SCHED_POLICY=none`

#### `BUN_ENV`
- **Type:** String (enum: development, production)
- **Default:** `production`
- **Description:** Bun runtime environment. Similar to NODE_ENV but for Bun.
- **Example:** `export BUN_ENV=development`

#### `BUN_INSTALL`
- **Type:** String (directory path)
- **Default:** `~/.bun`
- **Description:** Bun installation directory. Where Bun stores packages and cache.
- **Example:** `export BUN_INSTALL=/opt/bun`

#### `BUN_FEEDBACK_URL`
- **Type:** URL
- **Default:** `https://bun.report/v1/feedback`
- **Description:** URL for Bun feedback submission.
- **Example:** `export BUN_FEEDBACK_URL=https://internal.bun.report/feedback`

#### `BUN_DISABLE_DYNAMIC_CHUNK_SIZE`
- **Type:** Boolean (1, 0)
- **Default:** false
- **Description:** Set to '1' to disable dynamic chunk sizing in Bun. Forces fixed chunk sizes.
- **Example:** `export BUN_DISABLE_DYNAMIC_CHUNK_SIZE=1`

#### `BUN_INSPECT_NOTIFY`
- **Type:** String (unix:// URL)
- **Default:** Unspecified
- **Description:** URL for Bun inspector notification. Used with debuggers.
- **Example:** `export BUN_INSPECT_NOTIFY=unix:///tmp/bun-inspect.sock`

#### `BUN_JS_DEBUG`
- **Type:** Boolean (1, 0)
- **Default:** false
- **Description:** Enable Bun JavaScript debug logging.
- **Example:** `export BUN_JS_DEBUG=1`

#### `UV_THREADPOOL_SIZE`
- **Type:** Integer
- **Default:** 4 (or CPU count, whichever is higher)
- **Description:** libuv thread pool size for async I/O. Affects concurrency of filesystem and DNS operations.
- **Example:** `export UV_THREADPOOL_SIZE=16`

#### `COREPACK_ENABLE_AUTO_PIN`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable Corepack auto-pinning of package managers. Automatically pins npm/yarn/pnpm versions.
- **Example:** `export COREPACK_ENABLE_AUTO_PIN=1`

#### `SHARP_FORCE_GLOBAL_LIBVIPS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force Sharp (image library) to use globally installed libvips. Useful for system-wide image library sharing.
- **Example:** `export SHARP_FORCE_GLOBAL_LIBVIPS=1`

#### `SHARP_IGNORE_GLOBAL_LIBVIPS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force Sharp to ignore globally installed libvips. Uses bundled libvips instead.
- **Example:** `export SHARP_IGNORE_GLOBAL_LIBVIPS=1`

#### `GRACEFUL_FS_PLATFORM`
- **Type:** String (platform identifier)
- **Default:** Auto-detected
- **Description:** Override platform detection for graceful-fs. Useful when auto-detection fails.
- **Example:** `export GRACEFUL_FS_PLATFORM=linux`

#### `MODIFIERS_NODE_PATH`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** Custom Node.js path for module resolution. Prepended to NODE_PATH.
- **Example:** `export MODIFIERS_NODE_PATH=/custom/node/modules`

#### `PKG_CONFIG_PATH`
- **Type:** String (colon-separated paths)
- **Default:** System defaults
- **Description:** pkg-config search path. Used for locating system libraries.
- **Example:** `export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:/opt/lib/pkgconfig`

### gRPC

#### `GRPC_VERBOSITY`
- **Type:** String (enum: DEBUG, INFO, ERROR, NONE)
- **Default:** `ERROR`
- **Description:** gRPC log verbosity level. Controls how much gRPC logs are emitted.
- **Example:** `export GRPC_VERBOSITY=DEBUG`

#### `GRPC_TRACE`
- **Type:** String (comma-separated trace categories)
- **Default:** Unspecified (no tracing)
- **Description:** gRPC trace categories for debugging. Enables extra logging for specific internal components.
- **Example:** `export GRPC_TRACE=all`

#### `GRPC_NODE_VERBOSITY`
- **Type:** String (log level)
- **Default:** Unspecified
- **Description:** gRPC Node.js specific verbosity level.
- **Example:** `export GRPC_NODE_VERBOSITY=debug`

#### `GRPC_NODE_TRACE`
- **Type:** String (comma-separated categories)
- **Default:** Unspecified
- **Description:** gRPC Node.js specific trace categories.
- **Example:** `export GRPC_NODE_TRACE=channel`

#### `GRPC_NODE_USE_ALTERNATIVE_RESOLVER`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use alternative DNS resolver for gRPC in Node.js. Useful when default resolver is unreliable.
- **Example:** `export GRPC_NODE_USE_ALTERNATIVE_RESOLVER=1`

#### `GRPC_SSL_CIPHER_SUITES`
- **Type:** String (colon-separated cipher suite names)
- **Default:** OpenSSL defaults
- **Description:** Override SSL cipher suites for gRPC connections. Controls cryptographic algorithms used.
- **Example:** `export GRPC_SSL_CIPHER_SUITES=HIGH:!aNULL:!MD5`

#### `GRPC_DEFAULT_SSL_ROOTS_FILE_PATH`
- **Type:** String (file path to PEM)
- **Default:** System CA bundle
- **Description:** Path to custom SSL roots file for gRPC. Overrides default CA certificates.
- **Example:** `export GRPC_DEFAULT_SSL_ROOTS_FILE_PATH=/etc/ssl/certs/ca-bundle.crt`

#### `GRPC_EXPERIMENTAL_ENABLE_OUTLIER_DETECTION`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable experimental gRPC outlier detection. Detects and avoids unhealthy servers.
- **Example:** `export GRPC_EXPERIMENTAL_ENABLE_OUTLIER_DETECTION=1`

### Tmux

#### `CLAUDE_CODE_TMUX_PREFIX`
- **Type:** String (key binding, e.g., C-b, C-a)
- **Default:** Detected from tmux config
- **Description:** Override the tmux prefix key. Useful when your tmux config uses a non-standard prefix.
- **Example:** `export CLAUDE_CODE_TMUX_PREFIX=C-a`

#### `CLAUDE_CODE_TMUX_PREFIX_CONFLICTS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Handle tmux prefix key conflicts. When true, manages prefix conflicts with other programs.
- **Example:** `export CLAUDE_CODE_TMUX_PREFIX_CONFLICTS=1`

#### `CLAUDE_CODE_TMUX_SESSION`
- **Type:** String (session name)
- **Default:** Auto-generated
- **Description:** Tmux session name for Claude Code. Defaults to a generated name if not set.
- **Example:** `export CLAUDE_CODE_TMUX_SESSION=claude-main`

#### `CLAUDE_CODE_TMUX_TRUECOLOR`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Preserve detected truecolor level under tmux. When set, prevents automatic downgrade to 256 colors inside tmux.
- **Example:** `export CLAUDE_CODE_TMUX_TRUECOLOR=1`

#### `TMUX`
- **Type:** String (socket path)
- **Default:** Detected automatically when running inside tmux
- **Description:** Set automatically when running inside tmux. Not typically set manually.
- **Example:** `/tmp/tmux-1000/default`

#### `TMUX_PANE`
- **Type:** String (pane identifier, e.g., %0)
- **Default:** Detected automatically
- **Description:** Current tmux pane identifier. Detected automatically when running inside tmux.
- **Example:** `%0`

### Terminal Detection

#### `TERM`
- **Type:** String (terminal identifier)
- **Default:** Auto-detected (usually xterm-256color or similar)
- **Description:** Terminal type identifier. Affects color support, cursor movement, etc. Auto-detected by most terminal emulators.
- **Example:** `export TERM=xterm-256color`

#### `COLORTERM`
- **Type:** String (color capability, e.g., truecolor, 256color)
- **Default:** Auto-detected
- **Description:** Color terminal capability. Indicates 24-bit truecolor, 256-color, or basic color support.
- **Example:** `export COLORTERM=truecolor`

#### `FORCE_COLOR`
- **Type:** Boolean (1, true, 0, false)
- **Default:** Auto-detected based on TERM and TTY
- **Description:** Force color output regardless of terminal detection. Set to 0 to disable colors.
- **Example:** `export FORCE_COLOR=1`

#### `COLORFGBG`
- **Type:** String (color codes, e.g., "15;0")
- **Default:** Unspecified
- **Description:** Terminal foreground/background color hint. Parsed to detect dark (0-6, 8) vs light theme.
- **Example:** `export COLORFGBG=15;0`

#### `ITERM_SESSION_ID`
- **Type:** String (session ID)
- **Default:** Unspecified (set by iTerm2)
- **Description:** iTerm2 session identifier. Detected when running inside iTerm2.
- **Example:** `w0t0p0:1234567-89AB-CDEF`

#### `TERM_PROGRAM`
- **Type:** String (program name)
- **Default:** Unspecified
- **Description:** Terminal program name (e.g., iTerm.app, Apple_Terminal). Used for terminal detection.
- **Example:** `export TERM_PROGRAM=iTerm.app`

#### `TERM_PROGRAM_VERSION`
- **Type:** String (version string)
- **Default:** Unspecified
- **Description:** Terminal program version.
- **Example:** `export TERM_PROGRAM_VERSION=3.4.0`

#### `KITTY_WINDOW_ID`
- **Type:** Integer
- **Default:** Unspecified (set by Kitty terminal)
- **Description:** Kitty terminal window ID. Detected when running inside Kitty.
- **Example:** `1`

#### `ALACRITTY_LOG`
- **Type:** String (file path)
- **Default:** Unspecified
- **Description:** Alacritty terminal log path. Used for terminal detection.
- **Example:** `/tmp/alacritty.log`

#### `GNOME_TERMINAL_SERVICE`
- **Type:** String (D-Bus service name)
- **Default:** Unspecified
- **Description:** GNOME Terminal service name. Detected when running inside GNOME Terminal.
- **Example:** org.gnome.Terminal

#### `VTE_VERSION`
- **Type:** Integer (version number)
- **Default:** Unspecified
- **Description:** VTE (GNOME Terminal) version. Indicates terminal capabilities.
- **Example:** `5000`

#### `KONSOLE_VERSION`
- **Type:** Integer
- **Default:** Unspecified
- **Description:** KDE Konsole version. Detected when running inside Konsole.
- **Example:** `200000`

#### `XTERM_VERSION`
- **Type:** Integer
- **Default:** Unspecified
- **Description:** xterm version. Detected when running inside xterm.
- **Example:** `379`

#### `TILIX_ID`
- **Type:** String (terminal ID)
- **Default:** Unspecified
- **Description:** Tilix terminal ID. Detected when running inside Tilix.
- **Example:** `1234567890`

#### `TERMINATOR_UUID`
- **Type:** String (UUID)
- **Default:** Unspecified
- **Description:** Terminator terminal UUID. Detected when running inside Terminator.
- **Example:** `ffffffff-ffff-ffff-ffff-ffffffffffff`

#### `TERMINAL`
- **Type:** String (terminal identifier)
- **Default:** Unspecified
- **Description:** Generic terminal identifier for detection.
- **Example:** `xterm`

#### `TERMINAL_EMULATOR`
- **Type:** String (emulator identifier)
- **Default:** Unspecified
- **Description:** Terminal emulator identifier (e.g., JetBrains-JediTerm).
- **Example:** `JetBrains-JediTerm`

#### `WT_SESSION`
- **Type:** String (session GUID)
- **Default:** Unspecified (set by Windows Terminal)
- **Description:** Windows Terminal session ID. Detected when running inside Windows Terminal.
- **Example:** `11111111-1111-1111-1111-111111111111`

#### `SESSIONNAME`
- **Type:** String
- **Default:** Unspecified (set by Windows)
- **Description:** Windows session name. Used for terminal detection on Windows.
- **Example:** `Console`

#### `BAT_THEME`
- **Type:** String (theme name)
- **Default:** Unspecified (bat uses default theme)
- **Description:** Theme for bat syntax highlighter. Used when displaying code in the terminal.
- **Example:** `export BAT_THEME=Monokai Extended`

#### `CLI_WIDTH`
- **Type:** Integer (characters)
- **Default:** Auto-detected from terminal width
- **Description:** Override terminal width for formatting. Useful when auto-detection fails.
- **Example:** `export CLI_WIDTH=120`

#### `LC_TERMINAL`
- **Type:** String (terminal identifier)
- **Default:** Unspecified
- **Description:** Terminal identifier from locale settings.
- **Example:** `xterm-256color`

---

[← Back to env/README.md](./README.md)
