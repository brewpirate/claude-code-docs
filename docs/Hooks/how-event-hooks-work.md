# How event hooks work


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
