# Claude Code CLI Reference

Reference for the `claude` command-line interface — flags, subcommands, invocation modes, and env-var / settings.json equivalents.

## Table of Contents

1. [How CLI invocation works](./how-cli-invocation-works.md)
2. [Subcommands](./subcommands.md)
3. [Flag reference](./flag-reference.md)
4. [Invocation modes](./invocation-modes.md)
5. [Environment-driven behavior](./environment-driven-behavior.md)
6. [Undocumented & internal flags](./undocumented-internal-flags.md)
7. [Discrepancies & notes](./discrepancies-notes.md)

## Overview

**7 sections**, **~103 entries** total — 20 subcommands + 61 documented flags (across 14 categories) + 15 undocumented/internal flags + 7 invocation modes.

| # | Section | Description | Entries |
|---|---------|-------------|---------|
| 1 | [How CLI invocation works](./how-cli-invocation-works.md) | Invocation patterns (interactive REPL, one-shot, piped stdin, subcommands), flag conventions, and precedence rules. | narrative |
| 2 | [Subcommands](./subcommands.md) | `claude config`, `claude mcp`, `claude plugin`, `claude login/logout`, `claude doctor`, `claude update`, etc. | 20 entries |
| 3 | [Flag reference](./flag-reference.md) | Detailed per-flag entries grouped by category (Model/Effort, Invocation, Session, Worktrees, Permissions, MCP, Plugins, Output, Debug, Help). | 61 flags / 14 categories |
| 4 | [Invocation modes](./invocation-modes.md) | Interactive REPL, one-shot prompt, piped stdin, session resume/continue, fork-session, remote/teleport, SDK entrypoints. | 7 entries |
| 5 | [Environment-driven behavior](./environment-driven-behavior.md) | Cross-links to ENV/README.md for env vars that modify CLI behavior (entrypoint, config dir, provider selection, auth). | narrative |
| 6 | [Undocumented & internal flags](./undocumented-internal-flags.md) | Flags found in `main.tsx` with `hidden: true` or feature-gated that don't appear in public docs. | 15 entries |
| 7 | [Discrepancies & notes](./discrepancies-notes.md) | Precedence puzzles, mutual exclusivity, deprecated-but-accepted flags, and feature-gate surprises. | narrative |

## Quick reference — flags

| Flag | Short | Argument | Category | Env var | Description |
|------|-------|----------|----------|---------|-------------|
| `--add-dir` | — | `<paths...>` | Directories | — | Add additional working directories for Claude to read and edit files |
| `--agent` | — | `<name>` | Agent / Model | — | Specify a subagent for the current session |
| `--agents` | — | `<json>` | Agent / Model | — | Define custom subagents dynamically via JSON |
| `--allow-dangerously-skip-permissions` | — | — | Permissions | — | Add bypassPermissions to the Shift+Tab mode cycle without starting in it |
| `--allowedTools` | — | `<tools...>` | Permissions | — | Tools that execute without prompting for permission |
| `--append-system-prompt` | — | `<text>` | System Prompt | — | Append custom text to the end of the default system prompt |
| `--append-system-prompt-file` | — | `<path>` | System Prompt | — | Load additional system prompt text from a file and append |
| `--bare` | — | — | Invocation Mode | `CLAUDE_CODE_SIMPLE` | Minimal mode: skip auto-discovery, hooks, plugins, MCP servers for faster startup |
| `--betas` | — | `<headers>` | Model / Effort | — | Beta headers to include in API requests (API key users only) |
| `--channels` | — | `<servers...>` | MCP | — | MCP servers whose channel notifications Claude should listen for (research preview) |
| `--chrome` | — | — | Tools & Features | — | Enable Chrome browser integration for web automation and testing |
| `--continue` | `-c` | — | Invocation Mode | — | Load the most recent conversation in the current directory |
| `--dangerously-load-development-channels` | — | `<servers...>` | MCP | — | Enable non-approved channels for local channel development |
| `--dangerously-skip-permissions` | — | — | Permissions | — | Skip permission prompts (equivalent to `--permission-mode bypassPermissions`) |
| `--debug` | — | `[category]` | Debug | `CLAUDE_CODE_DEBUG` | Enable debug mode with optional category filtering |
| `--debug-file` | — | `<path>` | Debug | `CLAUDE_CODE_DEBUG_LOGS_DIR` | Write debug logs to a specific file path |
| `--disable-slash-commands` | — | — | Skills & Commands | — | Disable all skills and commands for this session |
| `--disallowedTools` | — | `<tools...>` | Permissions | — | Tools to remove from the model's context and deny |
| `--effort` | — | `<level>` | Model / Effort | — | Set effort level: low, medium, high, xhigh, max |
| `--exclude-dynamic-system-prompt-sections` | — | — | System Prompt | — | Move per-machine sections into the first user message (improves prompt-cache reuse) |
| `--fallback-model` | — | `<model>` | Model / Effort | — | Automatic fallback to specified model when default is overloaded (print mode only) |
| `--fork-session` | — | — | Invocation Mode | — | Create a new session ID instead of reusing the original (with `--resume` or `--continue`) |
| `--from-pr` | — | `<pr>` | Invocation Mode | — | Resume sessions linked to a specific GitHub PR |
| `--ide` | — | — | Tools & Features | — | Automatically connect to IDE on startup if exactly one is available |
| `--init` | — | — | Invocation Mode | — | Run initialization hooks and start interactive mode |
| `--init-only` | — | — | Invocation Mode | — | Run initialization hooks and exit (no interactive session) |
| `--include-hook-events` | — | — | Output | — | Include all hook lifecycle events in the output stream |
| `--include-partial-messages` | — | — | Output | — | Include partial streaming events in output |
| `--input-format` | — | `<format>` | Output | — | Specify input format for print mode: text, stream-json |
| `--json-schema` | — | `<schema>` | Output | — | Get validated JSON output matching a JSON Schema (print mode only) |
| `--maintenance` | — | — | Invocation Mode | — | Run maintenance hooks and start interactive mode |
| `--max-budget-usd` | — | `<amount>` | Model / Effort | — | Maximum dollar amount to spend on API calls (print mode only) |
| `--max-turns` | — | `<count>` | Model / Effort | — | Limit the number of agentic turns (print mode only) |
| `--mcp-config` | — | `<files...>` | MCP | — | Load MCP servers from JSON files or strings (space-separated) |
| `--model` | — | `<model>` | Model / Effort | `ANTHROPIC_MODEL` | Sets the model: alias (sonnet, opus) or full model ID |
| `--name` | `-n` | `<name>` | Session | — | Set a display name for the session |
| `--no-chrome` | — | — | Tools & Features | — | Disable Chrome browser integration for this session |
| `--no-session-persistence` | — | — | Output | — | Disable session persistence (print mode only) |
| `--output-format` | — | `<format>` | Output | — | Specify output format: text, json, stream-json |
| `--permission-mode` | — | `<mode>` | Permissions | — | Begin in a specified permission mode: default, acceptEdits, plan, auto, dontAsk, bypassPermissions |
| `--permission-prompt-tool` | — | `<tool>` | Permissions | — | MCP tool to handle permission prompts in non-interactive mode |
| `--plugin-dir` | — | `<paths...>` | Plugins | — | Load plugins from a directory for this session only (repeatable) |
| `--print` | `-p` | `[prompt]` | Invocation Mode | — | Print response without interactive mode (Agent SDK mode) |
| `--remote` | — | `[description]` | Remote | — | Create a new web session on claude.ai with the provided task description |
| `--remote-control` | `--rc` | `[name]` | Remote | — | Start interactive session with Remote Control enabled (optionally named) |
| `--remote-control-session-name-prefix` | — | `<prefix>` | Remote | `CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX` | Prefix for auto-generated Remote Control session names |
| `--replay-user-messages` | — | — | Output | — | Re-emit user messages from stdin back on stdout (requires stream-json I/O) |
| `--resume` | `-r` | `<session>` | Invocation Mode | — | Resume a specific session by ID or name |
| `--session-id` | — | `<uuid>` | Session | — | Use a specific session ID for the conversation |
| `--setting-sources` | — | `<sources>` | Settings | — | Comma-separated list of setting sources to load: user, project, local |
| `--settings` | — | `<file/json>` | Settings | — | Path to a settings JSON file or inline JSON string |
| `--strict-mcp-config` | — | — | MCP | — | Only use MCP servers from `--mcp-config`, ignoring all other configurations |
| `--system-prompt` | — | `<text>` | System Prompt | — | Replace the entire system prompt with custom text |
| `--system-prompt-file` | — | `<path>` | System Prompt | — | Load system prompt from a file, replacing the default |
| `--teleport` | — | `[session]` | Remote | — | Resume a web session in your local terminal |
| `--teammate-mode` | — | `<mode>` | Agent / Model | — | Set how agent teammates display: auto, in-process, or tmux |
| `--tmux` | — | `[style]` | Session | — | Create a tmux session for the worktree (requires `--worktree`) |
| `--tools` | — | `<tools>` | Tools & Features | — | Restrict which built-in tools Claude can use |
| `--verbose` | — | — | Debug | `CLAUDE_CODE_VERBOSE` | Enable verbose logging showing full turn-by-turn output |
| `--version` | `-v` | — | Help | — | Output the version number |
| `--worktree` | `-w` | `[name]` | Session | — | Create a new git worktree for this session (optionally name it) |

## See Also

- [../ENV/README.md](../ENV/README.md) — env vars (many CLI flags have env-var equivalents).
- [../Settings/README.md](../Settings/README.md) — settings.json keys backing CLI flags.
- [../Commands/README.md](../Commands/README.md) — `/slash commands` (some have CLI analogs like `claude login`).
- [../Tools/README.md](../Tools/README.md) — tools available within a session.
- [../Permissions/README.md](../Permissions/README.md) — rules that gate tool invocations.
- Official docs: <https://code.claude.com/docs/en/cli-reference>
