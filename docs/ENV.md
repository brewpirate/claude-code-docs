# Claude Code CLI Environment Variables
# This file lists all environment variables used in v2.1.100 with explanations

## Anthropic API & Authentication

ANTHROPIC_API_KEY - Primary API key for Anthropic's Claude API. Used as fallback when no OAuth token is configured
ANTHROPIC_AUTH_TOKEN - Alternative bearer token for Anthropic services. Takes priority over ANTHROPIC_API_KEY for authorization headers
ANTHROPIC_BASE_URL - Custom base URL for Anthropic API endpoints. Overrides the default api.anthropic.com endpoint
ANTHROPIC_BETAS - Comma-separated list of beta feature headers to include in API requests. Appended to internal beta flags
ANTHROPIC_CUSTOM_HEADERS - Custom HTTP headers for API requests. Newline-separated Key: Value pairs
ANTHROPIC_LOG - Anthropic SDK internal logging level (from the SDK itself, not Claude Code)
ANTHROPIC_UNIX_SOCKET - Unix socket path for Anthropic API connections. Used with Bun runtime for direct socket communication
API_TIMEOUT_MS - API request timeout in milliseconds. Default: 600000 (10 minutes). Shown in timeout error messages with suggestion to increase
CLAUDE_CODE_API_BASE_URL - Alternative base URL for Anthropic API. Falls back to ANTHROPIC_BASE_URL, then https://api.anthropic.com

## Model Configuration

ANTHROPIC_CUSTOM_MODEL_OPTION - Custom model ID to add to the model selector dropdown. Validated during model selection
ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION - Description text for the custom model option. Falls back to 'Custom model (MODEL_ID)'
ANTHROPIC_CUSTOM_MODEL_OPTION_NAME - Display name for the custom model option in the model selector
ANTHROPIC_DEFAULT_HAIKU_MODEL - Override the default Haiku model ID. Used for non-first-party providers. Falls back to haiku-4.5
ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION - Description text for custom Haiku model override
ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME - Display name for custom Haiku model override
ANTHROPIC_DEFAULT_OPUS_MODEL - Override the default Opus model ID. First-party defaults to opus-4.6, third-party to opus-4.6
ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION - Description text for custom Opus model override
ANTHROPIC_DEFAULT_OPUS_MODEL_NAME - Display name for custom Opus model override
ANTHROPIC_DEFAULT_SONNET_MODEL - Override the default Sonnet model ID. First-party defaults to sonnet-4.6, third-party to sonnet-4.5
ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION - Description text for custom Sonnet model override
ANTHROPIC_DEFAULT_SONNET_MODEL_NAME - Display name for custom Sonnet model override
ANTHROPIC_MODEL - Override the default Claude model. Can be set via CLI flag, env var, or settings file. Checked against known model IDs
ANTHROPIC_SMALL_FAST_MODEL - Override the small/fast model used for quick operations (compaction, summarization). Defaults to Haiku
ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION - Specific AWS region for the small fast model when using Bedrock. Falls back to the general Bedrock region
CLAUDE_CODE_ALWAYS_ENABLE_EFFORT - Boolean. Force effort level support on all models, not just opus-4-6/sonnet-4-6
CLAUDE_CODE_EFFORT_LEVEL - Set reasoning effort level. Accepted values: "low", "medium", "high" (default: "high")
CLAUDE_CODE_EXTRA_BODY - Extra JSON body parameters to include in API requests
CLAUDE_CODE_EXTRA_METADATA - Extra metadata to include in API request metadata field
CLAUDE_CODE_MAX_CONTEXT_TOKENS - Max context tokens override. Only applied when DISABLE_COMPACT is set. Parsed as int, must be > 0
CLAUDE_CODE_MAX_OUTPUT_TOKENS - Maximum output tokens for responses. Validated against a per-model upper limit
CLAUDE_CODE_MAX_RETRIES - Maximum API request retries
CLAUDE_CODE_SUBAGENT_MODEL - Force a specific model for all sub-agent/teammate operations. Overrides normal model selection logic
FALLBACK_FOR_ALL_PRIMARY_MODELS - Enable fallback behavior for all primary models, not just specific ones
MAX_THINKING_TOKENS - Maximum tokens for extended thinking. Parsed as int; if > 0, enables thinking with a fixed budget

## Provider: AWS Bedrock

ANTHROPIC_BEDROCK_BASE_URL - Alternative custom endpoint for Bedrock. Passed as endpoint to the Bedrock client
AWS_ACCESS_KEY_ID - AWS access key for Bedrock authentication
AWS_BEARER_TOKEN_BEDROCK - Bearer token for Bedrock authentication. When set, skips SigV4 signing and uses Authorization: Bearer header instead
AWS_DEFAULT_REGION - Fallback AWS region. Used when AWS_REGION is not set. Default: us-east-1
AWS_LOGIN_CACHE_DIRECTORY - Custom directory for AWS SSO login cache. Default: ~/.aws/login/cache
AWS_PROFILE - AWS named profile for credential resolution
AWS_REGION - AWS region for Bedrock service calls. Default: us-east-1
AWS_SECRET_ACCESS_KEY - AWS secret key for Bedrock authentication
AWS_SESSION_TOKEN - AWS session token for temporary credentials
CLAUDE_CODE_SKIP_BEDROCK_AUTH - Boolean. Skip AWS authentication for Bedrock (uses empty credentials)
CLAUDE_CODE_USE_BEDROCK - Boolean. Route all API calls through AWS Bedrock instead of direct Anthropic API
ENABLE_PROMPT_CACHING_1H_BEDROCK - Enable 1-hour prompt caching on Bedrock

## Provider: Bedrock Mantle

ANTHROPIC_BEDROCK_MANTLE_BASE_URL - Custom base URL for Bedrock Mantle endpoint. Defaults to https://bedrock-mantle.{region}.api.aws/anthropic
CLAUDE_CODE_SKIP_MANTLE_AUTH - Skip authentication for Bedrock Mantle
CLAUDE_CODE_USE_MANTLE - Route API calls through Bedrock Mantle

## Provider: Anthropic AWS

ANTHROPIC_AWS_API_KEY - API key for Anthropic AWS service
ANTHROPIC_AWS_BASE_URL - Custom base URL for Anthropic AWS endpoint
ANTHROPIC_AWS_WORKSPACE_ID - Workspace ID for Anthropic AWS service
CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH - Skip authentication for Anthropic AWS service
CLAUDE_CODE_USE_ANTHROPIC_AWS - Route API calls through Anthropic AWS service

## Provider: Google Vertex AI

ANTHROPIC_VERTEX_BASE_URL - Custom base URL for Vertex AI endpoint (replaces VERTEX_BASE_URL)
ANTHROPIC_VERTEX_PROJECT_ID - GCP project ID for Vertex AI service calls
CLAUDE_CODE_SKIP_VERTEX_AUTH - Boolean. Skip GCP authentication for Vertex AI (uses empty credentials)
CLAUDE_CODE_USE_VERTEX - Boolean. Route all API calls through Google Vertex AI instead of direct Anthropic API
CLOUDSDK_CONFIG - Google Cloud SDK configuration directory
CLOUD_ML_REGION - Default GCP region for Vertex AI. Default: us-east5
DETECT_GCP_RETRIES - Number of retries for GCP metadata detection
GCE_METADATA_HOST - Custom hostname for GCE metadata server
GCE_METADATA_IP - Custom IP address for GCE metadata server
GOOGLE_APPLICATION_CREDENTIALS - Path to GCP service account credentials JSON file
GOOGLE_CLOUD_PROJECT - GCP project ID. Used for cloud platform detection
GOOGLE_CLOUD_QUOTA_PROJECT - GCP quota project for billing
METADATA_SERVER_DETECTION - Control GCP metadata server detection behavior

## Provider: Microsoft Foundry

ANTHROPIC_FOUNDRY_API_KEY - API key for Microsoft Foundry authentication. If absent, falls back to Azure DefaultCredential
ANTHROPIC_FOUNDRY_BASE_URL - Custom base URL for Microsoft Foundry API endpoint
ANTHROPIC_FOUNDRY_RESOURCE - Microsoft Foundry resource identifier
CLAUDE_CODE_SKIP_FOUNDRY_AUTH - Boolean. Skip Azure authentication for Foundry (uses empty token provider)
CLAUDE_CODE_USE_FOUNDRY - Boolean. Route all API calls through Microsoft Foundry instead of direct Anthropic API

## OAuth & Login

CLAUDE_CODE_ACCOUNT_TAGGED_ID - Tagged account ID for OTEL metrics. Falls back to hashing the account UUID
CLAUDE_CODE_ACCOUNT_UUID - Pre-set account UUID, bypassing OAuth lookup
CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR - File descriptor number to read API key from. Must be a valid integer
CLAUDE_CODE_API_KEY_HELPER_TTL_MS - TTL in milliseconds for API key helper cache. Must be a non-negative integer
CLAUDE_CODE_CUSTOM_OAUTH_URL - Custom OAuth URL endpoint. Must be in the approved endpoints list
CLAUDE_CODE_OAUTH_CLIENT_ID - Custom OAuth client ID
CLAUDE_CODE_OAUTH_REFRESH_TOKEN - OAuth refresh token for token renewal
CLAUDE_CODE_OAUTH_SCOPES - OAuth scopes to request during authentication
CLAUDE_CODE_OAUTH_TOKEN - OAuth token for authentication. Checked after ANTHROPIC_AUTH_TOKEN in auth source priority
CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR - File descriptor number to read OAuth token from
CLAUDE_CODE_ORGANIZATION_UUID - Pre-set organization UUID, bypassing OAuth lookup
CLAUDE_CODE_SESSION_ACCESS_TOKEN - Session-specific access token for authentication
CLAUDE_CODE_USER_EMAIL - Pre-set user email, bypassing OAuth lookup
CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR - File descriptor for WebSocket authentication credentials
CLAUDE_LOCAL_OAUTH_API_BASE - Local OAuth API base URL for development
CLAUDE_LOCAL_OAUTH_APPS_BASE - Local OAuth apps base URL for development
CLAUDE_LOCAL_OAUTH_CONSOLE_BASE - Local OAuth console base URL for development
CLAUDE_TRUSTED_DEVICE_TOKEN - Pre-set trusted device token. When set, skips trusted device enrollment (env var takes precedence)
USE_LOCAL_OAUTH - Use local OAuth endpoint for development
USE_STAGING_OAUTH - Use staging OAuth endpoint for testing

## Core Settings

CLAUDE_CODE_DEBUG_LOGS_DIR - Custom directory for debug log files. Default: CONFIG_DIR/debug/SESSION.txt
CLAUDE_CODE_DEBUG_LOG_LEVEL - Debug log level. Options: verbose, debug, info, warn, error. Default: debug
CLAUDE_CODE_DIAGNOSTICS_FILE - Path to write diagnostics output file
CLAUDE_CODE_DONT_INHERIT_ENV - Boolean. Don't inherit environment variables from parent process
CLAUDE_CODE_ENTRYPOINT - Identifies how Claude Code was launched: cli, sdk-ts, sdk-py, sdk-cli, mcp, claude-code-github-action, claude-desktop, local-agent
CLAUDE_CODE_ENVIRONMENT_KIND - Identifies the environment kind (e.g., local, remote, container)
CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION - Version of the environment runner
CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER - Exit immediately after the first UI render (for testing)
CLAUDE_CODE_EXIT_AFTER_STOP_DELAY - Delay in ms before exiting after stop signal
CLAUDE_CODE_FORCE_FULL_LOGO - Force display of the full ASCII logo on startup
CLAUDE_CODE_HOST_PLATFORM - Override the detected host platform identifier
CLAUDE_CODE_NEW_INIT - Trigger new initialization flow
CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST - Indicates the API provider is managed by the host environment. Treated as a provider selector alongside CLAUDE_CODE_USE_BEDROCK/VERTEX/etc
CLAUDE_CODE_QUESTION_PREVIEW_FORMAT - Format for question preview display
CLAUDE_CODE_SHELL - Override the shell used for Bash tool execution
CLAUDE_CODE_SHELL_PREFIX - Prefix command/args added before shell invocations
CLAUDE_CODE_SIMPLE - Boolean. Simplified mode - disables attachments, auto memory, and other advanced features
CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK - Skip organization check in fast mode
CLAUDE_CODE_SYNTAX_HIGHLIGHT - Control syntax highlighting in output
CLAUDE_CODE_TAGS - Custom tags to include in telemetry and event tracking
CLAUDE_CODE_TMPDIR - Override the temp directory used by Claude Code (alternative var)
CLAUDE_CODE_WORKER_EPOCH - Worker epoch identifier for multi-worker setups
CLAUDE_CONFIG_DIR - Override the default Claude configuration directory path
CLAUDE_DEBUG - Enable debug mode for Claude Code
CLAUDE_ENV_FILE - Path to a custom environment file to load
CLAUDE_TMPDIR - Override the temp directory used by Claude Code

## Enable Flags

CLAUDE_CODE_ENABLE_CFC - Enable CFC (Claude For Code) feature
CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING - Enable fine-grained streaming for tool use responses
CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION - Enable prompt suggestion feature
CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING - Enable file checkpointing in SDK mode
CLAUDE_CODE_ENABLE_TASKS - Enable the task tracking system
CLAUDE_CODE_ENABLE_TELEMETRY - Enable telemetry data collection
CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT - Enable attaching token usage info to responses
CLAUDE_CODE_ENABLE_XAA - Enable XAA (Cross-Application Authentication) support for MCP servers via OIDC IdP
CLAUDE_CODE_ENHANCED_TELEMETRY_BETA - Enable enhanced telemetry beta features
CLAUDE_ENABLE_STREAM_WATCHDOG - Enable watchdog for stream health monitoring
EMBEDDED_SEARCH_TOOLS - Enable embedded search tools
ENABLE_BETA_TRACING_DETAILED - Enable detailed beta tracing. Requires BETA_TRACING_ENDPOINT to also be set
ENABLE_CLAUDEAI_MCP_SERVERS - Enable Claude.ai MCP servers
ENABLE_CLAUDE_CODE_SM_COMPACT - Enable smart compaction feature
ENABLE_ENHANCED_TELEMETRY_BETA - Alternative flag for enhanced telemetry beta
ENABLE_MCP_LARGE_OUTPUT_FILES - Enable large output file support for MCP tools
ENABLE_TOOL_SEARCH - Enable the tool search/deferred tool loading feature

## Disable Flags

CLAUDE_CODE_DISABLE_1M_CONTEXT - Disable 1M token context window support. Prevents [1m] model variants
CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING - Disable adaptive thinking mode. Falls back to fixed budget thinking
CLAUDE_CODE_DISABLE_ADVISOR_TOOL - Disable the advisor tool
CLAUDE_CODE_DISABLE_ATTACHMENTS - Disable file attachments in messages
CLAUDE_CODE_DISABLE_AUTO_MEMORY - Disable automatic memory system. Can be set to '0' to force-enable
CLAUDE_CODE_DISABLE_BACKGROUND_TASKS - Disable background task execution and the run_in_background parameter
CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL - Disable the Claude API skill
CLAUDE_CODE_DISABLE_CLAUDE_MDS - Disable loading of CLAUDE.md instruction files
CLAUDE_CODE_DISABLE_CRON - Disable cron/scheduled task functionality
CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS - Disable experimental beta features
CLAUDE_CODE_DISABLE_FAST_MODE - Disable fast mode toggle
CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY - Disable feedback survey prompts
CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING - Disable file checkpointing for undo/restore
CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS - Disable git-related instructions in system prompt
CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP - Disable legacy model name remapping
CLAUDE_CODE_DISABLE_MOUSE - Disable mouse input in the terminal UI
CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC - Disable non-essential network traffic (feature flags, telemetry)
CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK - Disable fallback to non-streaming API mode
CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL - Disable automatic installation of official marketplace plugins
CLAUDE_CODE_DISABLE_POLICY_SKILLS - Disable policy-based skill loading
CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP - Disable skipping of pre-compaction optimization
CLAUDE_CODE_DISABLE_TERMINAL_TITLE - Disable setting the terminal title
CLAUDE_CODE_DISABLE_THINKING - Disable extended thinking entirely
CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL - Disable virtual scrolling in the UI
DISABLE_AUTOUPDATER - Disable the automatic update checker
DISABLE_AUTO_COMPACT - Disable automatic context compaction
DISABLE_COMPACT - Disable the /compact command entirely
DISABLE_COST_WARNINGS - Disable cost warning notifications
DISABLE_ERROR_REPORTING - Disable error reporting to Anthropic
DISABLE_INTERLEAVED_THINKING - Disable interleaved thinking in responses
DISABLE_PROMPT_CACHING - Disable prompt caching for all models
DISABLE_PROMPT_CACHING_HAIKU - Disable prompt caching specifically for Haiku model
DISABLE_PROMPT_CACHING_OPUS - Disable prompt caching specifically for Opus model
DISABLE_PROMPT_CACHING_SONNET - Disable prompt caching specifically for Sonnet model
DISABLE_TELEMETRY - Disable all telemetry data collection
DO_NOT_TRACK - Disable telemetry and tracking when set to 1

## Command Disablers

DISABLE_BUG_COMMAND - Disable the /bug command
DISABLE_DOCTOR_COMMAND - Disable the /doctor command
DISABLE_EXTRA_USAGE_COMMAND - Disable the /usage command
DISABLE_FEEDBACK_COMMAND - Disable the /feedback command
DISABLE_INSTALLATION_CHECKS - Disable installation verification checks
DISABLE_INSTALL_GITHUB_APP_COMMAND - Disable the install GitHub app command
DISABLE_LOGIN_COMMAND - Disable the /login command
DISABLE_LOGOUT_COMMAND - Disable the /logout command
DISABLE_UPGRADE_COMMAND - Disable the /upgrade command

## Bash & Shell

BASH_MAX_OUTPUT_LENGTH - Maximum output length for bash commands. Default: 30000, upper limit: 150000
CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR - Boolean. Maintain the project working directory across bash commands
CLAUDE_CODE_GIT_BASH_PATH - Path to git bash executable on Windows
CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS - PowerShell command parse timeout in milliseconds. Parsed as int, must be > 0
CLAUDE_CODE_USE_POWERSHELL_TOOL - Use PowerShell instead of Bash for shell commands
SLASH_COMMAND_TOOL_CHAR_BUDGET - Character budget for slash command tool output
TASK_MAX_OUTPUT_LENGTH - Maximum output length for task results

## Tool Configuration

CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR - Show 'SandboxedBash' label when sandbox is active
CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES - Emit summary descriptions for tool use actions
CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS - Maximum output tokens when reading files
CLAUDE_CODE_GLOB_HIDDEN - Include hidden files in glob searches
CLAUDE_CODE_GLOB_NO_IGNORE - Don't respect .gitignore in glob searches
CLAUDE_CODE_GLOB_TIMEOUT_SECONDS - Timeout in seconds for glob operations
CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES - Include partial/streaming messages in output
CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY - Maximum concurrent tool use operations. Default: 10
MAX_STRUCTURED_OUTPUT_RETRIES - Maximum retries for structured output parsing. Default: 5
USE_API_CONTEXT_MANAGEMENT - Use API-side context management instead of client-side
USE_BUILTIN_RIPGREP - Use the built-in ripgrep binary instead of system ripgrep

## MCP (Model Context Protocol)

CLAUDE_CODE_MCP_ALLOWLIST_ENV - Enable env var allowlist filtering for MCP servers. Default: enabled only for local-agent entrypoint
MAX_MCP_OUTPUT_TOKENS - Maximum output tokens for MCP tool results. Default: 25000
MCP_CLIENT_SECRET - Client secret for MCP OAuth authentication
MCP_CONNECTION_NONBLOCKING - Make MCP server connections non-blocking
MCP_OAUTH_CALLBACK_PORT - Port for MCP OAuth callback server
MCP_OAUTH_CLIENT_METADATA_URL - URL for MCP OAuth client metadata
MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE - Number of remote MCP servers to connect simultaneously. Default: 20
MCP_SERVER_CONNECTION_BATCH_SIZE - Number of MCP servers to connect to simultaneously. Default: 3
MCP_TIMEOUT - MCP server connection timeout in milliseconds. Default: 30000
MCP_TOOL_TIMEOUT - MCP tool execution timeout in milliseconds
MCP_TRUNCATION_PROMPT_OVERRIDE - Override MCP output truncation prompt mode. Accepts 'subagent' or 'legacy'. Defaults to tengu_mcp_subagent_prompt feature flag
MCP_XAA_IDP_CLIENT_SECRET - IdP client secret for MCP XAA (Cross-Application Authentication). Read by the --client-secret CLI flag

## Plugins & Extensions

CLAUDE_CODE_PLUGIN_CACHE_DIR - Custom cache directory for plugin storage
CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS - Git operation timeout for plugin installation in milliseconds
CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE - Keep the existing marketplace clone when git pull fails instead of re-cloning
CLAUDE_CODE_PLUGIN_SEED_DIR - Directory containing seed/pre-installed plugins
CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE - Use zip-based caching for plugin downloads
CLAUDE_CODE_SYNC_PLUGIN_INSTALL - Install plugins synchronously instead of async
CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS - Timeout for synchronous plugin installation in milliseconds
CLAUDE_CODE_USE_COWORK_PLUGINS - Enable cowork-mode plugins
FORCE_AUTOUPDATE_PLUGINS - Force auto-update of installed plugins

## Context & Compaction

CLAUDE_AFTER_LAST_COMPACT - Boolean. When fetching session data, only get messages after the last compaction
CLAUDE_AUTOCOMPACT_PCT_OVERRIDE - Override auto-compaction trigger percentage (0-100). Compaction triggers when context reaches this % of window
CLAUDE_CODE_AUTO_COMPACT_WINDOW - Override the auto-compaction context window size. Parsed as int, must be > 0
CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE - Override the blocking context limit. Parsed as int, must be > 0
CLAUDE_CODE_RESUME_INTERRUPTED_TURN - Resume an interrupted turn after compaction or reconnection

## Idle & Session Resume

CLAUDE_CODE_IDLE_THRESHOLD_MINUTES - Idle threshold in minutes before prompting for session action. Default: 75
CLAUDE_CODE_IDLE_TOKEN_THRESHOLD - Token count (context size) threshold before prompting for session action. Default: 100000
CLAUDE_CODE_RESUME_THRESHOLD_MINUTES - Minutes since last message before prompting to resume the session. Default: 70
CLAUDE_CODE_RESUME_TOKEN_THRESHOLD - Token threshold for resume prompt. Default: 100000

## Agent SDK

CLAUDE_AGENT_SDK_CLIENT_APP - Client application identifier for Agent SDK. Included in x-client-app header
CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS - Boolean. Disable built-in agent definitions when using the SDK
CLAUDE_AGENT_SDK_MCP_NO_PREFIX - Boolean. Don't prefix MCP tool names with server name in SDK mode
CLAUDE_AGENT_SDK_VERSION - Agent SDK version string. Included in User-Agent and telemetry

## Agent Teams & Orchestration

CLAUDE_AUTO_BACKGROUND_TASKS - Boolean. Enable automatic background task spawning. Returns 120000ms timeout when enabled
CLAUDE_CODE_AGENT_COST_STEER - Override agent cost-based steering. Defaults based on subscription tier (pro/max) via feature flag
CLAUDE_CODE_AGENT_LIST_IN_MESSAGES - Override whether the agent list is attached to messages. Defaults to tengu_agent_list_attach feature flag
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS - Enable experimental agent teams/multi-agent orchestration
CLAUDE_CODE_PLAN_MODE_INTERVIEW_PHASE - Control the interview phase in plan mode
CLAUDE_CODE_PLAN_MODE_REQUIRED - Require plan mode approval before implementation
CLAUDE_CODE_PLAN_V2_AGENT_COUNT - Number of agents in plan v2 orchestration
CLAUDE_CODE_PLAN_V2_EXPLORE_AGENT_COUNT - Number of explore agents in plan v2. Default: 3, range 1-10
CLAUDE_CODE_TASK_LIST_ID - ID of the task list for task tracking
CLAUDE_CODE_TEAM_ONBOARDING - Enable the team-onboarding command. Also gated by tengu_flint_harbor feature flag
TEAM_MEMORY_SYNC_URL - URL for team memory synchronization service

## Remote & Cowork

CCR_ENABLE_BUNDLE - Enable code bundle uploads for CCR (Claude Code Remote)
CCR_FORCE_BUNDLE - Force code bundle uploads for CCR regardless of feature flag
CCR_UPSTREAM_PROXY_ENABLED - Enable upstream proxy for Claude Code Remote. Requires CLAUDE_CODE_REMOTE and CLAUDE_CODE_REMOTE_SESSION_ID
CLAUDE_BRIDGE_USE_CCR_V2 - Boolean. Use CCR v2 protocol for bridge/session connections
CLAUDE_CODE_CONTAINER_ID - Container ID for remote sessions. Included in x-claude-remote-container-id header
CLAUDE_CODE_IS_COWORK - Boolean. Indicates Claude Code is running in cowork mode
CLAUDE_CODE_POST_FOR_SESSION_INGRESS_V2 - Use POST for session ingress v2 protocol
CLAUDE_CODE_REMOTE - Boolean. Indicates Claude Code is running in remote/headless mode
CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE - Type of remote environment (included in telemetry)
CLAUDE_CODE_REMOTE_MEMORY_DIR - Directory for remote memory storage. Used when auto-memory checks for remote mode
CLAUDE_CODE_REMOTE_SEND_KEEPALIVES - Send keepalive messages in remote mode
CLAUDE_CODE_REMOTE_SESSION_ID - Session ID for remote connections. Included in x-claude-remote-session-id header
CLAUDE_CODE_USE_CCR_V2 - Use CCR v2 for remote sessions
CLAUDE_CODE_WORKSPACE_HOST_PATHS - Host paths for workspace mapping in containerized environments
CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES - Extra guidelines to inject into cowork memory system
CLAUDE_COWORK_MEMORY_PATH_OVERRIDE - Override the memory directory path in cowork mode
CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX - Prefix for remote control session names. Defaults to os.hostname(), sanitized to lowercase-dashed
CLAUDE_SESSION_INGRESS_TOKEN_FILE - Path to file containing session ingress token
CLAUDE_STREAM_IDLE_TIMEOUT_MS - Stream idle timeout in milliseconds before watchdog kicks in. Default: 90000
LOCAL_BRIDGE - Enable local bridge mode
SESSION_INGRESS_URL - URL for session ingress in remote mode

## IDE Integration

CLAUDE_CODE_AUTO_CONNECT_IDE - Boolean. Automatically connect to detected IDE. Can be set to '0' to force-disable
CLAUDE_CODE_IDE_HOST_OVERRIDE - Override the IDE host address
CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL - Skip automatic IDE extension installation
CLAUDE_CODE_IDE_SKIP_VALID_CHECK - Skip IDE connection validity check
CLAUDE_CODE_SSE_PORT - SSE (Server-Sent Events) port for IDE communication
CURSOR_TRACE_ID - Trace ID from Cursor IDE
VSCODE_GIT_ASKPASS_MAIN - Path to VS Code git askpass helper. Used for IDE detection
ZED_TERM - Detected when running inside Zed editor terminal

## OpenTelemetry (OTEL)

CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS - OTEL flush timeout in milliseconds. Default: 5000
CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS - Debounce interval for OTEL headers helper in milliseconds
CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS - OTEL shutdown timeout in milliseconds. Default: 2000
OTEL_EXPORTER_OTLP_ENDPOINT - OTLP exporter endpoint URL
OTEL_EXPORTER_OTLP_HEADERS - Headers for OTLP exporter requests
OTEL_EXPORTER_OTLP_INSECURE - Allow insecure (non-TLS) OTLP connections
OTEL_EXPORTER_OTLP_LOGS_PROTOCOL - Override OTLP protocol specifically for logs
OTEL_EXPORTER_OTLP_METRICS_PROTOCOL - Override OTLP protocol specifically for metrics
OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE - Metrics temporality preference (cumulative, delta)
OTEL_EXPORTER_OTLP_PROTOCOL - OTLP transport protocol (grpc, http/protobuf, http/json)
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL - Override OTLP protocol specifically for traces
OTEL_EXPORTER_PROMETHEUS_HOST - Host for Prometheus metrics exporter
OTEL_EXPORTER_PROMETHEUS_PORT - Port for Prometheus metrics exporter
OTEL_LOGS_EXPORTER - Logs exporter type (otlp, console, none)
OTEL_LOGS_EXPORT_INTERVAL - Logs export interval in milliseconds
OTEL_LOG_TOOL_CONTENT - Boolean. Log tool content (input/output) in OTEL spans
OTEL_LOG_TOOL_DETAILS - Boolean. Log detailed tool use information in OTEL spans
OTEL_LOG_USER_PROMPTS - Boolean. Log user prompts in OTEL spans
OTEL_METRICS_EXPORTER - Metrics exporter type (otlp, prometheus, console, none)
OTEL_METRIC_EXPORT_INTERVAL - Metrics export interval in milliseconds
OTEL_TRACES_EXPORTER - Traces exporter type (otlp, console, none)
OTEL_TRACES_EXPORT_INTERVAL - Traces export interval in milliseconds

## Datadog

CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS - Datadog log flush interval in milliseconds. Default: 15000

## Profiling & Diagnostics

CLAUDE_CODE_COMMIT_LOG - Enable React commit (render) performance logging. Not related to git commits
CLAUDE_CODE_DEBUG_REPAINTS - Enable debug logging for UI repaints
CLAUDE_CODE_EAGER_FLUSH - Enable eager flushing of output buffers
CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS - Emit session_state_changed system events when the session transitions between idle/running states
CLAUDE_CODE_FRAME_TIMING_LOG - Path to write frame timing logs
CLAUDE_CODE_NO_FLICKER - Force fullscreen anti-flicker mode. Set to 1 to enable (overrides tmux -CC auto-disable). Set to 0 to force-disable
CLAUDE_CODE_PERFETTO_TRACE - Enable Perfetto trace collection
CLAUDE_CODE_PROFILE_STARTUP - Enable startup profiling
CLAUDE_CODE_SCROLL_SPEED - Terminal scroll speed multiplier. Parsed as float, clamped to max 20. Default: 3 on Windows Terminal, 1 otherwise
CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS - Skip network error handling in fast mode
CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS - Threshold in ms for logging slow operations
CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING - Stall timeout override for testing purposes

## Proxy & TLS

CLAUDE_CODE_CLIENT_CERT - Path to mTLS client certificate file
CLAUDE_CODE_CLIENT_KEY - Path to mTLS client private key file
CLAUDE_CODE_CLIENT_KEY_PASSPHRASE - Passphrase for the mTLS client private key
CLAUDE_CODE_PROXY_RESOLVES_HOSTS - Boolean. Indicate that the proxy handles DNS resolution
CLAUDE_CODE_SIMULATE_PROXY_USAGE - Simulate proxy behavior by stripping beta headers from API requests (for testing)
HTTPS_PROXY - HTTPS proxy URL for outbound connections
HTTP_PROXY - HTTP proxy URL for outbound connections
NODE_EXTRA_CA_CERTS - Path to additional CA certificates file (PEM format)
NODE_TLS_REJECT_UNAUTHORIZED - Set to '0' to disable TLS certificate validation (insecure)
NODE_USE_SYSTEM_CA - Use the system CA certificate store
NO_PROXY - Comma-separated list of hosts/domains that bypass the proxy
SSL_CERT_FILE - Path to SSL certificate bundle file

## Tmux

CLAUDE_CODE_TMUX_PREFIX - Override the tmux prefix key
CLAUDE_CODE_TMUX_PREFIX_CONFLICTS - Handle tmux prefix key conflicts
CLAUDE_CODE_TMUX_SESSION - Tmux session name for Claude Code
CLAUDE_CODE_TMUX_TRUECOLOR - Preserve detected truecolor level under tmux. When set, prevents the automatic downgrade to 256 colors inside tmux
TMUX - Detected when running inside tmux. Used for terminal detection
TMUX_PANE - Current tmux pane identifier

## Git & CI Detection

BUILDKITE - Detected when running in Buildkite CI
CIRCLECI - Detected when running in CircleCI
CLAUDE_CODE_ACTION - Boolean. Indicates running as a GitHub Action. Sets entrypoint to claude-code-github-action
CLAUDE_CODE_BASE_REF - Override the base git ref for diff operations. Falls back to auto-detected default branch
CLAUDE_CODE_PERFORCE_MODE - Enable Perforce source control mode. Affects file permission/lock handling
CLAUDE_CODE_SKIP_PROMPT_HISTORY - Skip saving prompts to history
GITHUB_ACTIONS - Detected when running in GitHub Actions CI
GITHUB_ACTION_INPUTS - JSON-encoded inputs for GitHub Action
GITHUB_ACTION_PATH - Path to the GitHub Action directory
GITHUB_ACTOR - GitHub username that triggered the workflow
GITHUB_ACTOR_ID - GitHub user ID that triggered the workflow
GITHUB_ENV - Path to GitHub Actions environment file
GITHUB_EVENT_NAME - Name of the GitHub event that triggered the workflow
GITHUB_EVENT_PATH - Path to GitHub Actions event payload JSON
GITHUB_OUTPUT - Path to GitHub Actions output file
GITHUB_PATH - Path to GitHub Actions PATH file
GITHUB_REPOSITORY - GitHub repository in owner/repo format
GITHUB_REPOSITORY_ID - GitHub repository numeric ID
GITHUB_REPOSITORY_OWNER - GitHub repository owner
GITHUB_REPOSITORY_OWNER_ID - GitHub repository owner numeric ID
GITHUB_STATE - Path to GitHub Actions state file
GITHUB_STEP_SUMMARY - Path to GitHub Actions step summary file
GITHUB_TOKEN - GitHub authentication token
GITLAB_CI - Detected when running in GitLab CI
RUNNER_ENVIRONMENT - CI runner environment identifier
RUNNER_OS - CI runner operating system

## SWE-Bench & Testing

CLAUDE_CODE_TEST_FIXTURES_ROOT - Root directory for test fixtures
SWE_BENCH_INSTANCE_ID - SWE-bench instance identifier
SWE_BENCH_RUN_ID - SWE-bench run identifier for benchmarking
SWE_BENCH_TASK_ID - SWE-bench task identifier
TEST_ENABLE_SESSION_PERSISTENCE - Enable session persistence in tests
TEST_GRACEFUL_FS_GLOBAL_PATCH - Enable graceful-fs global patching in tests
VCR_RECORD - VCR recording mode for test replay

## Terminal Detection

ALACRITTY_LOG - Alacritty terminal log path. Used for terminal detection
BAT_THEME - Theme for bat syntax highlighter
CLI_WIDTH - Override terminal width for formatting
COLORFGBG - Terminal foreground/background color hint. Parsed to detect dark (0-6, 8) vs light theme
COLORTERM - Color terminal capability (e.g., truecolor)
FORCE_COLOR - Force color output regardless of terminal detection
GNOME_TERMINAL_SERVICE - GNOME Terminal service name. Used for terminal detection
ITERM_SESSION_ID - iTerm2 session identifier. Used for terminal detection
KITTY_WINDOW_ID - Kitty terminal window ID. Used for terminal detection
KONSOLE_VERSION - KDE Konsole version. Used for terminal detection
LC_TERMINAL - Terminal identifier from locale settings
SESSIONNAME - Windows session name. Used for terminal detection
STY - GNU Screen session identifier
TERM - Terminal type identifier
TERMINAL - Generic terminal identifier for detection
TERMINAL_EMULATOR - Terminal emulator identifier (e.g., JetBrains-JediTerm)
TERMINATOR_UUID - Terminator terminal UUID. Used for terminal detection
TERM_PROGRAM - Terminal program name (e.g., iTerm.app, Apple_Terminal)
TERM_PROGRAM_VERSION - Terminal program version
TILIX_ID - Tilix terminal ID. Used for terminal detection
VTE_VERSION - VTE (GNOME Terminal) version. Used for terminal detection
WT_SESSION - Windows Terminal session ID. Used for terminal detection
XTERM_VERSION - xterm version. Used for terminal detection
ZELLIJ - Detected when running inside Zellij multiplexer

## Cloud Platform Detection

APP_URL - Application URL. Checked for DigitalOcean App Platform detection
AWS_EXECUTION_ENV - AWS execution environment (AWS_ECS_FARGATE, AWS_ECS_EC2). Used for platform detection
AWS_LAMBDA_FUNCTION_NAME - AWS Lambda function name. Used for platform detection
AZURE_FUNCTIONS_ENVIRONMENT - Azure Functions environment. Used for platform detection
CF_PAGES - Detected when running on Cloudflare Pages
CLOUD_RUN_JOB - Google Cloud Run Job identifier
CODESPACES - Detected when running in GitHub Codespaces
DENO_DEPLOYMENT_ID - Deno Deploy deployment ID. Used for platform detection
DYNO - Heroku dyno identifier. Used for platform detection
FLY_APP_NAME - Fly.io application name. Used for platform detection
FLY_MACHINE_ID - Fly.io machine ID. Used for platform detection
FUNCTION_NAME - Google Cloud Functions function name
FUNCTION_TARGET - Google Cloud Functions target
GAE_MODULE_NAME - Google App Engine module name
GAE_SERVICE - Google App Engine service name
GCLOUD_PROJECT - Legacy GCP project ID
GITPOD_WORKSPACE_ID - Gitpod workspace ID. Used for platform detection
KUBERNETES_SERVICE_HOST - Kubernetes service host. Used for platform detection
K_CONFIGURATION - Google Cloud Run/Knative configuration
K_SERVICE - Google Cloud Run/Knative service name
NETLIFY - Detected when running on Netlify
P4PORT - Perforce server port
PROJECT_DOMAIN - Glitch project domain
RAILWAY_ENVIRONMENT_NAME - Railway environment name
RAILWAY_SERVICE_NAME - Railway service name
RENDER - Detected when running on Render
REPL_ID - Replit repl ID
REPL_SLUG - Replit repl slug
SPACE_CREATOR_USER_ID - HuggingFace Spaces creator user ID
SYSTEM_OIDCREQUESTURI - Azure DevOps OIDC request URI
VERCEL - Detected when running on Vercel
WEBSITE_SITE_NAME - Azure App Service site name. Used for platform detection
WEBSITE_SKU - Azure App Service SKU. Used for platform detection

## Azure Identity

AZURE_ADDITIONALLY_ALLOWED_TENANTS - Semicolon-separated list of additional allowed Azure tenants
AZURE_AUTHORITY_HOST - Azure authority host URL. Default: login.microsoftonline.com
AZURE_CLIENT_CERTIFICATE_PASSWORD - Password for the Azure client certificate
AZURE_CLIENT_CERTIFICATE_PATH - Path to Azure client certificate for certificate-based auth
AZURE_CLIENT_ID - Azure application (client) ID
AZURE_CLIENT_SECRET - Azure client secret for service principal authentication
AZURE_CLIENT_SEND_CERTIFICATE_CHAIN - Boolean. Send the full certificate chain for SNI
AZURE_FEDERATED_TOKEN_FILE - Path to Azure federated token file for workload identity
AZURE_IDENTITY_DISABLE_MULTITENANTAUTH - Disable multi-tenant authentication in Azure Identity
AZURE_PASSWORD - Azure password for username/password authentication
AZURE_POD_IDENTITY_AUTHORITY_HOST - Azure Pod Identity authority host for IMDS
AZURE_REGIONAL_AUTHORITY_NAME - Azure regional authority for token requests (e.g., AutoDiscoverRegion)
AZURE_TENANT_ID - Azure Active Directory tenant ID
AZURE_TOKEN_CREDENTIALS - Azure credential mode: 'dev' for development credentials, 'prod' for production credentials
AZURE_USERNAME - Azure username for username/password authentication

## System & Runtime

APPDATA - Application data directory (Windows). Used for config file discovery
BROWSER - Default browser for opening URLs
DEMO_VERSION - Demo version identifier
EDITOR - Default text editor
HOME - User home directory path
IS_DEMO - Boolean. Indicates running in demo mode
IS_SANDBOX - Boolean. Indicates running inside a sandbox environment
LANG - System locale setting
LC_ALL - Override all locale settings
LC_TIME - Time-related locale setting
LOCALAPPDATA - Local application data directory (Windows)
MSYSTEM - MSYS2/MinGW system type
OSTYPE - Operating system type identifier
PATH - System executable search path
PATHEXT - Executable file extensions (Windows)
PWD - Current working directory
SAFEUSER - Sanitized username for safe filesystem operations
SHELL - User's default shell
SSH_CLIENT - SSH client connection info. Used for remote detection
SSH_CONNECTION - SSH connection details. Used for remote detection
SSH_TTY - SSH TTY device. Used for remote detection
SYSTEMROOT - Windows system root directory
USER - Current username
USERNAME - Current username (Windows)
USERPROFILE - User profile directory (Windows)
UV_THREADPOOL_SIZE - libuv thread pool size for async I/O
VERBOSE_SSR - Enable verbose server-side rendering logs
VISUAL - Default visual editor
WSL_DISTRO_NAME - WSL distribution name. Used for platform detection
XDG_CONFIG_HOME - XDG configuration directory. Used for config file lookup
XDG_RUNTIME_DIR - XDG runtime directory

## Node.js & Bun

BUN_DISABLE_DYNAMIC_CHUNK_SIZE - Set to '1' to disable dynamic chunk sizing in Bun
BUN_ENV - Bun runtime environment
BUN_FEEDBACK_URL - URL for Bun feedback submission. Default: https://bun.report/v1/feedback
BUN_INSPECT_NOTIFY - URL for Bun inspector notification (unix:// protocol)
BUN_INSTALL - Bun installation directory. Default: ~/.bun
BUN_JS_DEBUG - Enable Bun JavaScript debug logging
COREPACK_ENABLE_AUTO_PIN - Enable Corepack auto-pinning of package managers
GRACEFUL_FS_PLATFORM - Override platform detection for graceful-fs
MODIFIERS_NODE_PATH - Custom Node.js path for module resolution
NODE_CLUSTER_SCHED_POLICY - Node.js cluster scheduling policy
NODE_DEBUG - Node.js debug module filter
NODE_ENV - Node.js environment (development, production, test)
NODE_OPTIONS - Additional Node.js CLI options
NODE_UNIQUE_ID - Node.js cluster worker unique ID
PKG_CONFIG_PATH - pkg-config search path
SHARP_FORCE_GLOBAL_LIBVIPS - Force Sharp to use globally installed libvips
SHARP_IGNORE_GLOBAL_LIBVIPS - Force Sharp to ignore globally installed libvips

## gRPC

GRPC_DEFAULT_SSL_ROOTS_FILE_PATH - Path to custom SSL roots file for gRPC
GRPC_EXPERIMENTAL_ENABLE_OUTLIER_DETECTION - Enable experimental gRPC outlier detection
GRPC_NODE_TRACE - gRPC Node.js specific trace categories
GRPC_NODE_USE_ALTERNATIVE_RESOLVER - Use alternative DNS resolver for gRPC in Node.js
GRPC_NODE_VERBOSITY - gRPC Node.js specific verbosity level
GRPC_SSL_CIPHER_SUITES - Override SSL cipher suites for gRPC connections
GRPC_TRACE - gRPC trace categories for debugging
GRPC_VERBOSITY - gRPC log verbosity level

## Brief Mode

CLAUDE_CODE_BRIEF - Enable brief mode for compact output. Requires entitlement or Claude.ai auth
CLAUDE_CODE_BRIEF_UPLOAD - Enable brief attachment uploading. Also enabled when replBridgeEnabled is true

## Accessibility

CLAUDE_CODE_ACCESSIBILITY - Enable accessibility mode. Disables cursor hiding and visual animations

## Chrome Extension

CLAUDE_CHROME_PERMISSION_MODE - Set permission mode for Claude-in-Chrome extension

## Security

CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD - Boolean. Load CLAUDE.md files from additional directories
CLAUDE_CODE_ADDITIONAL_PROTECTION - Boolean. Add x-anthropic-additional-protection header to API requests
CLAUDE_CODE_BUBBLEWRAP - Set to '1' to indicate running inside Bubblewrap sandbox. Allows --dangerously-skip-permissions with root
CLAUDE_CODE_SANDBOXED - Boolean. Indicates Claude Code is running in a sandboxed environment. Bypasses trust dialog
CLAUDE_CODE_SCRIPT_CAPS - JSON object mapping script names to numeric capability limits. Scripts not listed have no caps

## Miscellaneous & Internal

AWS_LAMBDA_BENCHMARK_MODE - Set to '1' to enable Lambda benchmark testing mode
BETA_TRACING_ENDPOINT - Endpoint URL for beta tracing. Used together with ENABLE_BETA_TRACING_DETAILED
BUGHUNTER_DEV_BUNDLE_B64 - Base64-encoded development bundle passed to the bughunter agent subprocess
CHOKIDAR_INTERVAL - Polling interval for Chokidar file watcher in milliseconds
CHOKIDAR_USEPOLLING - Force Chokidar to use polling instead of native file watching
CLAUBBIT - Boolean. Indicates running in Claubbit mode. Skips trust dialog
CLAUDE_CODE_ATTRIBUTION_HEADER - Control the attribution header in API requests. Set to '0' to disable
CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS - Timeout in milliseconds for session-end hook execution
CLAUDE_CODE_SUBPROCESS_ENV_SCRUB - Scrub environment variables from subprocesses
CLAUDE_FORCE_DISPLAY_SURVEY - Force display of the user survey
DEBUG - Enable debug output for various modules
DEBUG_AUTH - Enable debug output for authentication
DEBUG_SDK - Enable debug output for the Anthropic SDK
FORCE_CODE_TERMINAL - Force code terminal mode
SRT_DEBUG - Enable SRT (Secure Reliable Transport) debug logging
VOICE_STREAM_BASE_URL - Base URL for voice streaming service
