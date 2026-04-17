# Feature & Disable Flags


This section contains toggles for enabling or disabling features. Most are boolean (1/true enables, 0/false disables).

### Enable Flags

| Variable | Default | Effect | Example |
|----------|---------|--------|---------|
| `CLAUDE_CODE_ENABLE_CFC` | false | Enable CFC (Claude For Code) feature | `export CLAUDE_CODE_ENABLE_CFC=1` |
| `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` | false | Enable fine-grained streaming for tool use responses | `export CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1` |
| `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION` | false | Enable prompt suggestion feature | `export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=1` |
| `CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING` | false | Enable file checkpointing in SDK mode | `export CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING=1` |
| `CLAUDE_CODE_ENABLE_TASKS` | false | Enable the task tracking system | `export CLAUDE_CODE_ENABLE_TASKS=1` |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | true | Enable telemetry data collection | `export CLAUDE_CODE_ENABLE_TELEMETRY=0` |
| `CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT` | false | Enable attaching token usage info to responses | `export CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT=1` |
| `CLAUDE_CODE_ENABLE_XAA` | false | Enable XAA (Cross-App Auth) support for MCP servers via OIDC IdP | `export CLAUDE_CODE_ENABLE_XAA=1` |
| `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | false | Enable enhanced telemetry beta features | `export CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` |
| `ENABLE_ENHANCED_TELEMETRY_BETA` | false | Alternative flag for enhanced telemetry beta | `export ENABLE_ENHANCED_TELEMETRY_BETA=1` |
| `CLAUDE_ENABLE_STREAM_WATCHDOG` | false | Enable watchdog for stream health monitoring | `export CLAUDE_ENABLE_STREAM_WATCHDOG=1` |
| `EMBEDDED_SEARCH_TOOLS` | false | Enable embedded search tools | `export EMBEDDED_SEARCH_TOOLS=1` |
| `ENABLE_TOOL_SEARCH` | false | Enable the tool search/deferred tool loading feature | `export ENABLE_TOOL_SEARCH=1` |
| `ENABLE_CLAUDEAI_MCP_SERVERS` | false | Enable Claude.ai MCP servers | `export ENABLE_CLAUDEAI_MCP_SERVERS=1` |
| `ENABLE_MCP_LARGE_OUTPUT_FILES` | false | Enable large output file support for MCP tools | `export ENABLE_MCP_LARGE_OUTPUT_FILES=1` |
| `ENABLE_BETA_TRACING_DETAILED` | false | Enable detailed beta tracing (requires BETA_TRACING_ENDPOINT) | `export ENABLE_BETA_TRACING_DETAILED=1` |

### Disable Flags

| Variable | Default | Effect | Example |
|----------|---------|--------|---------|
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | false | Disable 1M token context window support | `export CLAUDE_CODE_DISABLE_1M_CONTEXT=1` |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` | false | Disable adaptive thinking mode; fall back to fixed budget | `export CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` |
| `CLAUDE_CODE_DISABLE_ADVISOR_TOOL` | false | Disable the advisor tool | `export CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1` |
| `CLAUDE_CODE_DISABLE_ATTACHMENTS` | false | Disable file attachments in messages | `export CLAUDE_CODE_DISABLE_ATTACHMENTS=1` |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | false | Disable automatic memory system (set to '0' to force-enable) | `export CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | false | Disable background task execution | `export CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` |
| `CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL` | false | Disable the Claude API skill | `export CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL=1` |
| `CLAUDE_CODE_DISABLE_CLAUDE_MDS` | false | Disable loading of CLAUDE.md instruction files | `export CLAUDE_CODE_DISABLE_CLAUDE_MDS=1` |
| `CLAUDE_CODE_DISABLE_CRON` | false | Disable cron/scheduled task functionality | `export CLAUDE_CODE_DISABLE_CRON=1` |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | false | Disable experimental beta features | `export CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1` |
| `CLAUDE_CODE_DISABLE_FAST_MODE` | false | Disable fast mode toggle | `export CLAUDE_CODE_DISABLE_FAST_MODE=1` |
| `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY` | false | Disable feedback survey prompts | `export CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY=1` |
| `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING` | false | Disable file checkpointing for undo/restore | `export CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING=1` |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | false | Disable git-related instructions in system prompt | `export CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` |
| `CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP` | false | Disable legacy model name remapping | `export CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP=1` |
| `CLAUDE_CODE_DISABLE_MOUSE` | false | Disable mouse input in the terminal UI | `export CLAUDE_CODE_DISABLE_MOUSE=1` |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | false | Disable non-essential network traffic (feature flags, telemetry) | `export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | false | Disable fallback to non-streaming API mode | `export CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=1` |
| `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL` | false | Disable automatic installation of official marketplace plugins | `export CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL=1` |
| `CLAUDE_CODE_DISABLE_POLICY_SKILLS` | false | Disable policy-based skill loading | `export CLAUDE_CODE_DISABLE_POLICY_SKILLS=1` |
| `CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP` | false | Disable skipping of pre-compaction optimization | `export CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP=1` |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | false | Disable setting the terminal title | `export CLAUDE_CODE_DISABLE_TERMINAL_TITLE=1` |
| `CLAUDE_CODE_DISABLE_THINKING` | false | Disable extended thinking entirely | `export CLAUDE_CODE_DISABLE_THINKING=1` |
| `CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL` | false | Disable virtual scrolling in the UI | `export CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL=1` |
| `DISABLE_AUTOUPDATER` | false | Disable the automatic update checker | `export DISABLE_AUTOUPDATER=1` |
| `DISABLE_AUTO_COMPACT` | false | Disable automatic context compaction | `export DISABLE_AUTO_COMPACT=1` |
| `DISABLE_COMPACT` | false | Disable the /compact command entirely | `export DISABLE_COMPACT=1` |
| `DISABLE_COST_WARNINGS` | false | Disable cost warning notifications | `export DISABLE_COST_WARNINGS=1` |
| `DISABLE_ERROR_REPORTING` | false | Disable error reporting to Anthropic | `export DISABLE_ERROR_REPORTING=1` |
| `DISABLE_INTERLEAVED_THINKING` | false | Disable interleaved thinking in responses | `export DISABLE_INTERLEAVED_THINKING=1` |
| `DISABLE_PROMPT_CACHING` | false | Disable prompt caching for all models | `export DISABLE_PROMPT_CACHING=1` |
| `DISABLE_PROMPT_CACHING_HAIKU` | false | Disable prompt caching specifically for Haiku | `export DISABLE_PROMPT_CACHING_HAIKU=1` |
| `DISABLE_PROMPT_CACHING_OPUS` | false | Disable prompt caching specifically for Opus | `export DISABLE_PROMPT_CACHING_OPUS=1` |
| `DISABLE_PROMPT_CACHING_SONNET` | false | Disable prompt caching specifically for Sonnet | `export DISABLE_PROMPT_CACHING_SONNET=1` |
| `DISABLE_TELEMETRY` | false | Disable all telemetry data collection | `export DISABLE_TELEMETRY=1` |
| `DO_NOT_TRACK` | false | Disable telemetry when set to 1 (standard DNT convention) | `export DO_NOT_TRACK=1` |

### Command Disablers

| Variable | Default | Effect | Example |
|----------|---------|--------|---------|
| `DISABLE_BUG_COMMAND` | false | Disable the /bug command | `export DISABLE_BUG_COMMAND=1` |
| `DISABLE_DOCTOR_COMMAND` | false | Disable the /doctor command | `export DISABLE_DOCTOR_COMMAND=1` |
| `DISABLE_EXTRA_USAGE_COMMAND` | false | Disable the /usage command | `export DISABLE_EXTRA_USAGE_COMMAND=1` |
| `DISABLE_FEEDBACK_COMMAND` | false | Disable the /feedback command | `export DISABLE_FEEDBACK_COMMAND=1` |
| `DISABLE_INSTALLATION_CHECKS` | false | Disable installation verification checks | `export DISABLE_INSTALLATION_CHECKS=1` |
| `DISABLE_INSTALL_GITHUB_APP_COMMAND` | false | Disable the install GitHub app command | `export DISABLE_INSTALL_GITHUB_APP_COMMAND=1` |
| `DISABLE_LOGIN_COMMAND` | false | Disable the /login command | `export DISABLE_LOGIN_COMMAND=1` |
| `DISABLE_LOGOUT_COMMAND` | false | Disable the /logout command | `export DISABLE_LOGOUT_COMMAND=1` |
| `DISABLE_UPGRADE_COMMAND` | false | Disable the /upgrade command | `export DISABLE_UPGRADE_COMMAND=1` |

---

[← Back to env/README.md](./README.md)
