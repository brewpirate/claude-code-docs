# How event hooks work

## Hook event lifecycle

**Normal flow (no block):**

1. Claude requests a tool call (e.g. Bash)
2. Claude Code finds matching `PreToolUse` hooks in settings
3. Claude Code runs the handler, piping JSON to stdin
4. Handler exits `0` → Claude Code executes the tool
5. Tool returns a result to Claude Code
6. Claude Code runs any matching `PostToolUse` handlers
7. Handler exits `0` → Claude receives the tool result

**When a handler blocks:**

1. Claude requests a tool call
2. Claude Code runs the `PreToolUse` handler
3. Handler exits `2` → Claude Code does **not** execute the tool
4. Claude receives a "tool call blocked" message instead

**Exit code reference:**

| Exit code | Meaning |
|-----------|---------|
| `0` | Proceed — tool executes (PreToolUse) or result is returned (PostToolUse) |
| `2` | Block — tool is not executed; Claude receives blocked message |
| Any other | Treated as `0` — proceed |

> **What "blocking" means:** Exit code 0 = proceed normally. Exit code 2 = Claude stops and does not execute the tool. This is how you'd prevent Claude from running `rm -rf` commands or overwriting protected files. Any exit code other than 2 (including exit 1) is treated as "proceed."

- **Lifecycle events:** Hook events fire at specific points in the session—before/after tool use, permission checks, session start/end, file changes, subagent dispatch, compaction, and MCP elicitation. Each event is named after what triggered it (e.g., `PreToolUse` fires before any tool runs).

- **Matcher groups:** For each event, the harness iterates over configured matcher groups and dispatches matching handlers. A matcher is an optional pattern (regex or literal) that filters on tool name, agent type, file path, or rule string—not all events support matchers. Matchers are per-event; `PreToolUse` matchers match tool names, `FileChanged` matchers match file globs, etc.

- **Four handler types:** `command` (shell), `http` (webhook), `prompt` (single-turn LLM), `agent` (sub-agent with tools). Each receives the hook input as JSON on stdin (command, prompt, agent) or POST body (http). Handlers return decisions: `"approve"`, `"block"`, `"emit"` context, or no decision (continue normally).

- **Scope precedence:** Hooks resolve in order: session frontmatter (highest priority, temporary) → skill/agent frontmatter → settings.json (lowest). A hook matching the same event/matcher across scopes is deduplicated by content; duplicates run once per handler type per source.

- **Decision flow:** `PreToolUse` and `PermissionRequest` accept decisions. A handler returning exit code 2 (or JSON `decision: "block"`) blocks the action. `prompt` hooks returning `{"ok": false}` block; `http` hooks using non-2xx response block. Once a handler blocks, downstream handlers for that event are skipped.

- **Async execution:** Handlers can run asynchronously (`async: true`) without blocking the turn, or synchronously block the session. `asyncRewake` handlers resume the model if they exit with code 2.

- **Environment & security:** Session env file (`$CLAUDE_ENV_FILE`) is writable by `SessionStart`, `CwdChanged`, `FileChanged` hooks to inject variables. HTTP hooks enforce SSRF protection: URLs must match `allowedHttpHookUrls` and env vars used in headers must be listed in both the hook's `allowedEnvVars` AND settings.json `httpHookAllowedEnvVars`.

- **Skill-only features:** `once: true` (fire once, then remove), `if: "Bash(git *)"` (permission-rule filter) are skill/frontmatter only. Built-in hooks (internal) and function hooks (programmatic) are additional types not persisted to settings.

---

[← Back to Hooks/README.md](./README.md)
