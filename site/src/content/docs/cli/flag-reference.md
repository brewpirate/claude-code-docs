---
title: "Flag Reference"
---

# Flag reference


### Model & Effort flags

#### `--model`
- **Short form:** None
- **Argument:** `<model>` — required (alias or full model ID)
- **Default:** Last selected model, or claude-sonnet-4-6
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** `ANTHROPIC_MODEL` — cross-ref to [../ENV/README.md](../ENV/README.md)
- **Settings.json equivalent:** `model` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Sets the model for the current session with an alias for the latest model (`sonnet`, `opus`, `haiku`) or a model's full name (e.g., `claude-opus-4-7-20250219`).
- **Example:** `claude --model opus` or `claude --model claude-sonnet-4-6`
- **Notes:** Aliases resolve to the latest stable version of that model tier.

#### `--effort`
- **Short form:** None
- **Argument:** `<level>` — required (enum)
- **Default:** Inherits from session settings
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `effort` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Set the effort level (thinking depth) for the current session. Options: `low`, `medium`, `high`, `xhigh`, `max`. Available levels depend on the model. Session-scoped and does not persist to settings.
- **Example:** `claude --effort high`
- **Notes:** Unsupported values are logged as a warning and ignored.

#### `--max-turns`
- **Short form:** None
- **Argument:** `<count>` — required (positive integer)
- **Default:** No limit
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Limit the number of agentic turns (back-and-forth exchanges) before exiting. Exits with an error when the limit is reached. Print mode only.
- **Example:** `claude -p --max-turns 3 "query"`
- **Notes:** Only applies in print mode (`-p`).

#### `--max-budget-usd`
- **Short form:** None
- **Argument:** `<amount>` — required (decimal)
- **Default:** None (no limit)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Maximum dollar amount to spend on API calls before stopping. Print mode only.
- **Example:** `claude -p --max-budget-usd 5.00 "query"`
- **Notes:** Only applies in print mode (`-p`).

#### `--fallback-model`
- **Short form:** None
- **Argument:** `<model>` — required (alias or full model ID)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Enable automatic fallback to specified model when default model is overloaded. Print mode only.
- **Example:** `claude -p --fallback-model sonnet "query"`
- **Notes:** Only applies in print mode (`-p`).

#### `--betas`
- **Short form:** None
- **Argument:** `<headers>` — required (space-separated)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Beta headers to include in API requests. API key users only.
- **Example:** `claude --betas interleaved-thinking`
- **Notes:** For Anthropic beta API features.

### Invocation mode flags

#### `--print`, `-p`
- **Short form:** `-p`
- **Argument:** `[prompt]` — optional (string)
- **Default:** None (interactive mode)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Print response without interactive mode. Runs the agent once and outputs the result. Also called "SDK mode" or "print mode." See Agent SDK documentation for programmatic usage details.
- **Example:** `claude -p "Explain this code"` or `cat file.txt | claude -p "analyze"`
- **Notes:** Print mode enables all output-format options (text, json, stream-json). Session persistence is disabled by default in print mode.

#### `--continue`, `-c`
- **Short form:** `-c`
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Load the most recent conversation in the current directory and resume it.
- **Example:** `claude -c` or `claude -c -p "Continue with the next step"`
- **Notes:** Searches for conversations in the current working directory. Use with `-p` for print-mode resume.

#### `--resume`, `-r`
- **Short form:** `-r`
- **Argument:** `<session>` — required (UUID or custom name)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Resume a specific session by ID (UUID) or custom name. If no ID/name is given, shows an interactive picker.
- **Example:** `claude -r "auth-refactor"` or `claude --resume 550e8400-e29b-41d4-a716-446655440000`
- **Notes:** Custom names are set with `--name` or `/rename` command during the session.

#### `--fork-session`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None (reuse session ID)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** When resuming a session (with `--resume` or `--continue`), create a new session ID instead of reusing the original.
- **Example:** `claude --resume abc123 --fork-session`
- **Notes:** Useful for branching conversations while preserving the original session.

#### `--init`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Run initialization hooks and start interactive mode.
- **Example:** `claude --init`
- **Notes:** Differs from default behavior by explicitly triggering init hooks before REPL.

#### `--init-only`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Run initialization hooks and exit (no interactive session).
- **Example:** `claude --init-only`
- **Notes:** Used for setup workflows that don't require the REPL.

#### `--maintenance`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Run maintenance hooks and start interactive mode.
- **Example:** `claude --maintenance`
- **Notes:** Distinct from `--init`; runs maintenance-specific hooks.

#### `--bare`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** `CLAUDE_CODE_SIMPLE` — cross-ref to [../ENV/README.md](../ENV/README.md)
- **Settings.json equivalent:** None
- **Description:** Minimal mode: skip auto-discovery of hooks, skills, plugins, MCP servers, auto memory, and CLAUDE.md. Claude has access to Bash, file read, and file edit tools only. Faster startup for scripted calls.
- **Example:** `claude --bare -p "query"`
- **Notes:** Sets `CLAUDE_CODE_SIMPLE` internally. Use for performance-sensitive workflows.

### Invocation mode: Remote & web

#### `--remote`
- **Short form:** None
- **Argument:** `[description]` — optional (string)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Create a new web session on claude.ai with the provided task description. Prints the session URL and resume command.
- **Example:** `claude --remote "Fix the login bug"`
- **Notes:** Research preview. Requires Claude.ai authentication.

#### `--teleport`
- **Short form:** None
- **Argument:** `[session]` — optional (session ID)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Resume a web session in your local terminal.
- **Example:** `claude --teleport`
- **Notes:** Research preview. Allows seamless handoff from claude.ai to terminal.

#### `--remote-control`, `--rc`
- **Short form:** `--rc`
- **Argument:** `[name]` — optional (string)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Start an interactive session with Remote Control enabled so you can also control it from claude.ai or the Claude app. Optionally pass a name for the session.
- **Example:** `claude --remote-control "My Project"` or `claude --rc`
- **Notes:** Requires `BRIDGE_MODE` feature flag to be enabled.

#### `--remote-control-session-name-prefix`
- **Short form:** None
- **Argument:** `<prefix>` — required (string)
- **Default:** Machine hostname
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** `CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX` — cross-ref to [../ENV/README.md](../ENV/README.md)
- **Settings.json equivalent:** None
- **Description:** Prefix for auto-generated Remote Control session names when no explicit name is set. Defaults to your machine's hostname, producing names like `myhost-graceful-unicorn`.
- **Example:** `claude remote-control --remote-control-session-name-prefix dev-box`
- **Notes:** None.

### Session & naming flags

#### `--name`, `-n`
- **Short form:** `-n`
- **Argument:** `<name>` — required (string)
- **Default:** Auto-generated descriptive name
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Set a display name for the session, shown in `/resume` and the terminal title. Resume a named session with `claude --resume <name>`. The `/rename` command changes the name mid-session.
- **Example:** `claude -n "my-feature-work"`
- **Notes:** None.

#### `--session-id`
- **Short form:** None
- **Argument:** `<uuid>` — required (valid UUID)
- **Default:** Auto-generated UUID
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Use a specific session ID for the conversation. Must be a valid UUID.
- **Example:** `claude --session-id "550e8400-e29b-41d4-a716-446655440000"`
- **Notes:** Useful for CI/CD integrations where session ID must be known in advance. Only works with `--continue` or `--resume` when `--fork-session` is also provided.

#### `--from-pr`
- **Short form:** None
- **Argument:** `<pr>` — optional (PR number or URL)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Resume sessions linked to a specific GitHub PR. Accepts a PR number or URL. Sessions are automatically linked when created via `gh pr create`.
- **Example:** `claude --from-pr 123` or `claude --from-pr https://github.com/user/repo/pull/456`
- **Notes:** Requires GitHub authentication.

### Git worktree flags

#### `--worktree`, `-w`
- **Short form:** `-w`
- **Argument:** `[name]` — optional (string)
- **Default:** Auto-generated name
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Start Claude in an isolated git worktree at `<repo>/.claude/worktrees/<name>`. If no name is given, one is auto-generated. Enables parallel Claude Code sessions without branch switching.
- **Example:** `claude -w feature-auth` or `claude -w`
- **Notes:** Requires a git repository. See [Common workflows](https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees) for details.

#### `--tmux`
- **Short form:** None
- **Argument:** `[style]` — optional (string)
- **Default:** auto (iTerm2 native panes if available)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Create a tmux session for the worktree. Requires `--worktree`. Uses iTerm2 native panes when available on macOS; pass `--tmux=classic` for traditional tmux.
- **Example:** `claude -w feature-auth --tmux` or `claude -w feature-auth --tmux=classic`
- **Notes:** Useful for running multiple worktree sessions in parallel.

### Directories & scope flags

#### `--add-dir`
- **Short form:** None
- **Argument:** `<paths...>` — required (space-separated)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `additionalDirectories` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Add additional working directories for Claude to read and edit files. Grants file access; most `.claude/` configuration is not discovered from these directories. Validates each path exists as a directory.
- **Example:** `claude --add-dir ../apps ../lib`
- **Notes:** Can be repeated for multiple directories. Does not auto-discover CLAUDE.md or other configs in added directories.

#### `--setting-sources`
- **Short form:** None
- **Argument:** `<sources>` — required (comma-separated)
- **Default:** user,project,local
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Comma-separated list of setting sources to load: `user`, `project`, `local`. Controls which configuration scopes are read.
- **Example:** `claude --setting-sources user,project`
- **Notes:** Useful for testing specific scopes or excluding local overrides.

#### `--settings`
- **Short form:** None
- **Argument:** `<file/json>` — required (path or JSON string)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Path to a settings JSON file or a JSON string to load additional settings from. Merged with existing settings.
- **Example:** `claude --settings ./settings.json` or `claude --settings '{"model":"opus"}'`
- **Notes:** Settings from this flag merge with and override persisted settings.

### Permissions flags

#### `--permission-mode`
- **Short form:** None
- **Argument:** `<mode>` — required (enum)
- **Default:** `default` (ask for permission)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `defaultMode` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Begin in a specified permission mode. Accepts: `default` (ask for permission), `acceptEdits` (auto-accept file edits), `plan` (plan-then-execute mode), `auto` (auto-accept tool use), `dontAsk` (no notification), `bypassPermissions` (silent). Overrides `defaultMode` from settings files.
- **Example:** `claude --permission-mode plan`
- **Notes:** See [Permission modes](https://code.claude.com/docs/en/permission-modes) for detailed behavior of each mode.

#### `--dangerously-skip-permissions`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Skip permission prompts. Equivalent to `--permission-mode bypassPermissions`. See permission modes documentation for what this does and does not skip.
- **Example:** `claude --dangerously-skip-permissions`
- **Notes:** Dangerous. Only use in trusted, automated contexts.

#### `--allow-dangerously-skip-permissions`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Add `bypassPermissions` to the Shift+Tab mode cycle without starting in it. Lets you begin in a different mode like `plan` and switch to `bypassPermissions` later.
- **Example:** `claude --permission-mode plan --allow-dangerously-skip-permissions`
- **Notes:** Safer than `--dangerously-skip-permissions` because it requires explicit per-action opt-in.

#### `--allowedTools`
- **Short form:** None
- **Argument:** `<tools...>` — required (space-separated or permission rule patterns)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `allowedTools` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Tools that execute without prompting for permission. Accepts permission rule syntax for pattern matching (e.g., `"Bash(git log *)"`, `"Read"`). To restrict which tools are available, use `--tools` instead.
- **Example:** `claude --allowedTools "Bash(git log *)" "Bash(git diff *)" "Read"`
- **Notes:** See [Permission rule syntax](https://code.claude.com/docs/en/settings#permission-rule-syntax) for pattern matching.

#### `--disallowedTools`
- **Short form:** None
- **Argument:** `<tools...>` — required (space-separated or permission rule patterns)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `disallowedTools` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Tools that are removed from the model's context and cannot be used.
- **Example:** `claude --disallowedTools "Bash(git log *)" "Bash(git diff *)" "Edit"`
- **Notes:** See [Permission rule syntax](https://code.claude.com/docs/en/settings#permission-rule-syntax) for pattern matching.

#### `--permission-prompt-tool`
- **Short form:** None
- **Argument:** `<tool>` — required (MCP tool name)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Specify an MCP tool to handle permission prompts in non-interactive mode. Allows external systems to approve/deny tool use via MCP.
- **Example:** `claude -p --permission-prompt-tool mcp_auth_tool "query"`
- **Notes:** Print mode only. Requires an MCP server to be configured with the tool.

#### `--tools`
- **Short form:** None
- **Argument:** `<tools>` — required (comma-separated or special values)
- **Default:** All built-in tools
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `tools` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Restrict which built-in tools Claude can use. Use `""` (empty string) to disable all, `"default"` for all, or tool names like `"Bash,Edit,Read"`. Comma-separated list of tool names.
- **Example:** `claude --tools "Bash,Edit,Read"` or `claude --tools ""`
- **Notes:** Different from `--disallowedTools`: this allowlist restricts availability, not permissions.

### System prompt flags

#### `--system-prompt`
- **Short form:** None
- **Argument:** `<text>` — required (string)
- **Default:** Claude Code's built-in system prompt
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `systemPrompt` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Replace the entire system prompt with custom text. Mutually exclusive with `--system-prompt-file`.
- **Example:** `claude --system-prompt "You are a Python expert"`
- **Notes:** Use only when you need complete control over the system prompt. Consider `--append-system-prompt` to preserve built-in capabilities.

#### `--system-prompt-file`
- **Short form:** None
- **Argument:** `<path>` — required (file path)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `systemPromptFile` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Load system prompt from a file, replacing the default prompt. Mutually exclusive with `--system-prompt`.
- **Example:** `claude --system-prompt-file ./custom-prompt.txt`
- **Notes:** File contents completely replace the default system prompt.

#### `--append-system-prompt`
- **Short form:** None
- **Argument:** `<text>` — required (string)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `appendSystemPrompt` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Append custom text to the end of the default system prompt. Can be combined with either replacement flag.
- **Example:** `claude --append-system-prompt "Always use TypeScript"`
- **Notes:** Recommended for most use cases; preserves Claude Code's built-in capabilities while adding your requirements.

#### `--append-system-prompt-file`
- **Short form:** None
- **Argument:** `<path>` — required (file path)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `appendSystemPromptFile` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Load additional system prompt text from a file and append to the default prompt. Can be combined with either replacement flag.
- **Example:** `claude --append-system-prompt-file ./style-rules.txt`
- **Notes:** Recommended for most use cases. File contents are appended to (not replacing) the default prompt.

#### `--exclude-dynamic-system-prompt-sections`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Move per-machine sections from the system prompt (working directory, environment info, memory paths, git status) into the first user message. Improves prompt-cache reuse across different users and machines running the same task. Only applies with the default system prompt; ignored when `--system-prompt` or `--system-prompt-file` is set. Use with `-p` for scripted, multi-user workloads.
- **Example:** `claude -p --exclude-dynamic-system-prompt-sections "query"`
- **Notes:** Print mode only. Useful for batch processing and multi-tenancy scenarios.

### MCP & servers flags

#### `--mcp-config`
- **Short form:** None
- **Argument:** `<files...>` — required (space-separated paths or JSON strings)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `mcpServers` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Load MCP servers from JSON files or strings (space-separated). Each argument is either a file path or inline JSON configuration.
- **Example:** `claude --mcp-config ./mcp.json` or `claude --mcp-config '{"server":{"command":"python","args":["script.py"]}}'`
- **Notes:** None.

#### `--strict-mcp-config`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Only use MCP servers from `--mcp-config`, ignoring all other MCP configurations (from settings, plugins, etc.). Useful for isolated/minimal MCP setup.
- **Example:** `claude --strict-mcp-config --mcp-config ./mcp.json`
- **Notes:** None.

#### `--channels`
- **Short form:** None
- **Argument:** `<servers...>` — required (space-separated)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** MCP servers whose channel notifications Claude should listen for in this session. Space-separated list of `plugin:<name>@<marketplace>` entries. Requires Claude.ai authentication.
- **Example:** `claude --channels plugin:my-notifier@my-marketplace`
- **Notes:** Research preview. Gated by the `KAIROS_CHANNELS` feature flag, which is part of the internal **KAIROS** system (the same system that gates the `/brief` command via `KAIROS_BRIEF`). Contact your workspace admin or account manager for access.

#### `--dangerously-load-development-channels`
- **Short form:** None
- **Argument:** `<servers...>` — required (space-separated)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Enable channels that are not on the approved allowlist, for local development. Accepts `plugin:<name>@<marketplace>` and `server:<name>` entries. Prompts for confirmation at startup.
- **Example:** `claude --dangerously-load-development-channels server:webhook`
- **Notes:** Research preview. Development only; shows confirmation dialog.

### Plugin flags

#### `--plugin-dir`
- **Short form:** None
- **Argument:** `<paths...>` — required (space-separated, repeatable)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Load plugins from a directory for this session only. Each flag takes one path. Repeat the flag for multiple directories: `--plugin-dir A --plugin-dir B`. When a local plugin has the same name as an installed marketplace plugin, the local copy takes precedence.
- **Example:** `claude --plugin-dir ./my-plugins` or `claude --plugin-dir ./plugins1 --plugin-dir ./plugins2`
- **Notes:** Local plugins override marketplace plugins. Use for development and testing.

#### `--agent`
- **Short form:** None
- **Argument:** `<name>` — required (agent name)
- **Default:** `general-purpose` (or last selected)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `agent` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Specify a custom subagent (from `.claude/agents/` or installed plugins) for the current session. Overrides the `agent` setting.
- **Example:** `claude --agent my-custom-agent`
- **Notes:** See [Subagents](https://code.claude.com/docs/en/sub-agents) documentation for defining custom agents.

#### `--agents`
- **Short form:** None
- **Argument:** `<json>` — required (JSON string)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Define custom subagents dynamically via JSON. Uses the same field names as subagent frontmatter, plus a `prompt` field for the agent's instructions.
- **Example:** `claude --agents '{"reviewer":{"description":"Reviews code","prompt":"You are a code reviewer"}}'`
- **Notes:** JSON is parsed and agents are registered for this session only.

#### `--teammate-mode`
- **Short form:** None
- **Argument:** `<mode>` — required (enum)
- **Default:** `auto`
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `teammateMode` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Set how agent teammates display: `auto` (default), `in-process`, or `tmux`. See [Choose a display mode](https://code.claude.com/docs/en/agent-teams#choose-a-display-mode).
- **Example:** `claude --teammate-mode in-process`
- **Notes:** Only applies to agent teams; requires `AGENT_TEAMS` feature or similar.

### Output & format flags

#### `--output-format`
- **Short form:** None
- **Argument:** `<format>` — required (enum)
- **Default:** `text`
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Specify output format for print mode. Options: `text` (default), `json`, `stream-json`.
- **Example:** `claude -p "query" --output-format json`
- **Notes:** Print mode only.

#### `--input-format`
- **Short form:** None
- **Argument:** `<format>` — required (enum)
- **Default:** `text`
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Specify input format for print mode. Options: `text`, `stream-json`.
- **Example:** `claude -p --input-format stream-json`
- **Notes:** Print mode only. Allows structured input via stdin.

#### `--json-schema`
- **Short form:** None
- **Argument:** `<schema>` — required (JSON Schema string)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Get validated JSON output matching a JSON Schema after the agent completes its workflow. Print mode only. See [Structured outputs](https://code.claude.com/docs/en/agent-sdk/structured-outputs).
- **Example:** `claude -p --json-schema '{"type":"object","properties":{...}}' "query"`
- **Notes:** Print mode only. Requires valid JSON Schema.

#### `--include-hook-events`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Include all hook lifecycle events in the output stream. Requires `--output-format stream-json`.
- **Example:** `claude -p --output-format stream-json --include-hook-events "query"`
- **Notes:** Print mode only. Useful for observability and debugging hooks.

#### `--include-partial-messages`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Include partial streaming events in output. Requires `--print` and `--output-format stream-json`.
- **Example:** `claude -p --output-format stream-json --include-partial-messages "query"`
- **Notes:** Print mode only. Shows incremental model outputs.

#### `--replay-user-messages`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Re-emit user messages from stdin back on stdout for acknowledgment. Requires `--input-format stream-json` and `--output-format stream-json`.
- **Example:** `claude -p --input-format stream-json --output-format stream-json --replay-user-messages`
- **Notes:** Print mode only. Useful for logging and verification in automated workflows.

#### `--no-session-persistence`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Disable session persistence so sessions are not saved to disk and cannot be resumed. Print mode only.
- **Example:** `claude -p --no-session-persistence "query"`
- **Notes:** Print mode only. Useful for ephemeral workloads.

### Tools & features flags

#### `--chrome`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `chrome` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Enable Chrome browser integration for web automation and testing.
- **Example:** `claude --chrome`
- **Notes:** See [Chrome extension documentation](https://code.claude.com/docs/en/chrome).

#### `--no-chrome`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Disable Chrome browser integration for this session.
- **Example:** `claude --no-chrome`
- **Notes:** Overrides the `chrome` setting for this session.

#### `--ide`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** `autoConnectIde` — cross-ref to [../Settings/README.md](../Settings/README.md)
- **Description:** Automatically connect to IDE on startup if exactly one valid IDE is available.
- **Example:** `claude --ide`
- **Notes:** Requires a supported IDE (VS Code, JetBrains, etc.) to be running.

#### `--disable-slash-commands`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Disable all skills and commands for this session.
- **Example:** `claude --disable-slash-commands`
- **Notes:** Removes the `/` command interface; no skills or commands are available.

### Debug & diagnostics flags

#### `--debug`
- **Short form:** None
- **Argument:** `[category]` — optional (comma-separated or negated)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** `CLAUDE_CODE_DEBUG` — cross-ref to [../ENV/README.md](../ENV/README.md)
- **Settings.json equivalent:** None
- **Description:** Enable debug mode with optional category filtering. Examples: `"api,hooks"` (only api and hooks), `"!statsig,!file"` (everything except statsig and file).
- **Example:** `claude --debug "api,mcp"`
- **Notes:** Writes debug logs to stderr. Can be combined with `--debug-file` for file output.

#### `--debug-file`
- **Short form:** None
- **Argument:** `<path>` — required (file path)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** `CLAUDE_CODE_DEBUG_LOGS_DIR` (directory, not file) — cross-ref to [../ENV/README.md](../ENV/README.md)
- **Settings.json equivalent:** None
- **Description:** Write debug logs to a specific file path. Implicitly enables debug mode. Takes precedence over `CLAUDE_CODE_DEBUG_LOGS_DIR` env var.
- **Example:** `claude --debug-file /tmp/claude-debug.log`
- **Notes:** None.

#### `--verbose`
- **Short form:** None
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** `CLAUDE_CODE_VERBOSE` — cross-ref to [../ENV/README.md](../ENV/README.md)
- **Settings.json equivalent:** None
- **Description:** Enable verbose logging, shows full turn-by-turn output and intermediate steps.
- **Example:** `claude --verbose`
- **Notes:** More detailed than `--debug`; shows full agent traces.

### Help & version flags

#### `--version`, `-v`
- **Short form:** `-v`
- **Argument:** None (boolean flag)
- **Default:** None
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/cli-reference
- **Env var equivalent:** None
- **Settings.json equivalent:** None
- **Description:** Output the version number and exit.
- **Example:** `claude --version` or `claude -v`
- **Notes:** None.

---

[← Back to CLI/README.md](./README.md)
