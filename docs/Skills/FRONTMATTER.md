# Skill, Agent & Command Frontmatter Reference

Frontmatter is YAML between `---` fences at the top of markdown files. Different fields apply to different component types (skills, subagents, slash commands, memory files, and output styles). Unknown fields are silently ignored via the TypeScript catch-all `[key: string]: unknown`, so typos fail without warning.

## How frontmatter is parsed

- **YAML parsing**: Frontmatter is parsed as YAML. If parsing fails, the loader automatically quotes special characters (`{}[]* &#!|>%@` and ": `) and retries once.
- **`description` coercion**: The `description` field accepts strings, numbers, and booleans (all coerced to strings via `String()`); arrays and objects are dropped with a debug log. Whitespace-only strings return null.
- **`paths` expansion**: Accepts comma-separated strings or YAML lists. Brace patterns like `src/*.{ts,tsx}` are expanded into multiple glob patterns; commas inside braces are not treated as separators.
- **Boolean parsing**: Fields treated as booleans (via `parseBooleanFrontmatter()`) accept only the literal `true` or the string `"true"` — other values like `1`, `yes`, or unquoted `true` in YAML (which parse to boolean) may behave unexpectedly.
- **Shell fallback**: The `shell` field defaults to `bash` when absent, null, or unrecognized; it never consults `settings.defaultShell`. Skills are portable, so the author determines the shell, not the reader.
- **Positive integers**: Fields like `maxTurns` require `Number.isInteger(n) && n > 0`; `0`, negative, or non-integer values are treated as absent.

## Quick reference — field applicability

| Field | Skill | Agent | Command | Memory | Style | Type | Default |
|-------|-------|-------|---------|--------|-------|------|---------|
| `name` | ✅ | ✅ | ✅ | — | ✅ | string | directory/file name |
| `description` | ✅ | ✅ | ✅ | — | ✅ | string | first paragraph |
| `when_to_use` | ✅ | — | — | — | — | string | none |
| `argument-hint` | ✅ | — | — | — | — | string | none |
| `user-invocable` | ✅ | — | ✅ | — | — | boolean (string) | true (commands), false (skills) |
| `allowed-tools` | ✅ | — | — | — | — | string or string[] | none |
| `disable-model-invocation` | ✅ | — | — | — | — | boolean (string) | false |
| `model` | ✅ | ✅ | ✅ | — | — | string | inherit |
| `effort` | ✅ | ✅ | — | — | — | enum string | inherits from session |
| `context` | ✅ | — | — | — | — | enum string | inline |
| `agent` | ✅ | — | — | — | — | string | general-purpose |
| `paths` | ✅ | — | — | ✅ | — | string or string[] | none |
| `shell` | ✅ | — | — | — | — | enum string | bash |
| `hooks` | ✅ | ✅ | — | — | — | object | none |
| `version` | ✅ | — | — | — | — | string | none |
| `type` | — | — | — | ✅ | — | enum string | user |
| `hide-from-slash-command-tool` | — | — | ✅ | — | — | boolean (string) | false |
| `keep-coding-instructions` | — | — | — | — | ✅ | boolean | false |
| `tools` | — | ✅ | — | — | — | string | none |
| `disallowedTools` | — | ✅ | — | — | — | string | none |
| `permissionMode` | — | ✅ | — | — | — | enum string | default |
| `maxTurns` | — | ✅ | — | — | — | integer | none |
| `mcpServers` | — | ✅ | — | — | — | list or object | none |
| `memory` | — | ✅ | — | — | — | enum string | none |
| `background` | — | ✅ | — | — | — | boolean | false |
| `isolation` | — | ✅ | — | — | — | enum string | none |
| `color` | — | ✅ | — | — | — | enum string | none |
| `initialPrompt` | — | ✅ | — | — | — | string | none |
| `skills` | — | ✅ | — | — | — | string (comma-separated) | none |

Legend: **✅** = applies, **—** = not applicable. "Agent" = subagents. "Command" = slash commands.

## Fields

### Shared / universal fields

### `name`
- **Applies to:** Skills, Subagents, Slash commands, Output styles
- **Type:** string
- **Default:** Directory name (skills), file name (output styles). Required for subagents.
- **source.ts status:** Not typed in `FrontmatterData`; read via `[key: string]: unknown` catch-all.
- **Description:** Display name for the component. For skills, use lowercase letters, numbers, and hyphens only (max 64 characters). For subagents, must be a unique identifier using lowercase letters and hyphens. If omitted from a skill, the directory name is used as the name.
- **Example:**
  ```yaml
  ---
  name: validate-sql-syntax
  ---
  ```
- **Notes:** Critical field documented in all examples but absent from the `FrontmatterData` TypeScript interface. Parsed via the catch-all, so typos fail silently.

### `description`
- **Applies to:** Skills, Subagents, Slash commands, Output styles
- **Type:** string
- **Default:** For skills, the first paragraph of markdown content if omitted. Required for subagents.
- **source.ts status:** Typed as `description?: string | null`. Coerced via `coerceDescriptionToString()`.
- **Description:** What the component does. For skills, front-load the key use case. The combined `description` and `when_to_use` text is truncated at 1,536 characters in skill listings to reduce context usage. Numbers and booleans are coerced to strings; arrays and objects are dropped with a debug log.
- **Example:**
  ```yaml
  ---
  description: Validates SQL syntax and detects common mistakes
  ---
  ```
- **Notes:** None.

### `when_to_use`
- **Applies to:** Skills
- **Type:** string
- **Default:** none — field is optional
- **source.ts status:** Typed as `when_to_use?: string | null`.
- **Description:** Additional context for when the skill should be invoked, such as trigger phrases or example requests. Appended to `description` in the skill listing and counts toward the 1,536-character combined cap.
- **Example:**
  ```yaml
  ---
  when_to_use: Use when the user asks to check a SQL query or when reviewing database code
  ---
  ```
- **Notes:** None.

### `argument-hint`
- **Applies to:** Skills
- **Type:** string
- **Default:** none — field is optional
- **source.ts status:** Typed as `'argument-hint'?: string | null`.
- **Description:** Hint shown during autocomplete to indicate expected arguments. Used to guide users invoking the skill with `/skill-name arg1 arg2`.
- **Example:**
  ```yaml
  ---
  argument-hint: "[table-name] [column-count]"
  ---
  ```
- **Notes:** None.

---

### Skill-specific fields

### `allowed-tools`
- **Applies to:** Skills
- **Type:** string (space-separated) or string[] (YAML list)
- **Default:** none — field is optional
- **source.ts status:** Typed as `'allowed-tools'?: string | string[] | null`.
- **Description:** Tools Claude can use without asking permission when this skill is active. Accepts either a space-separated string or a YAML list of tool names. Tools not listed here still require permission before use.
- **Example:**
  ```yaml
  ---
  allowed-tools: "Bash Read Write"
  ---
  ```
  or
  ```yaml
  ---
  allowed-tools:
    - Bash
    - Read
    - Write
  ---
  ```
- **Notes:** None.

### `user-invocable`
- **Applies to:** Skills, Slash commands
- **Type:** boolean (stored as string `"true"` or `"false"`)
- **Default:** `true` for slash commands (in `.claude/commands/`), `false` for skills (in `.claude/skills/`)
- **source.ts status:** Typed as `'user-invocable'?: string | null`. Parsed via `parseBooleanFrontmatter()`, which accepts only literal `true` or string `"true"`.
- **Description:** Set to `false` to hide from the `/` menu and prevent users from invoking by typing `/skill-name`. When `false`, only Claude can invoke the skill via the Skill tool. Use for background knowledge or utilities you don't want users to trigger directly.
- **Example:**
  ```yaml
  ---
  user-invocable: false
  ---
  ```
- **Notes:** **Discrepancy**: Docs describe this as a boolean; source.ts types it as `string | null` and parses it as a string-boolean (env-var style). Only literal `true` or string `"true"` are treated as true; YAML `true` becomes the boolean, which does not match.

### `disable-model-invocation`
- **Applies to:** Skills
- **Type:** boolean (stored as string `"true"` or `"false"`)
- **Default:** `false`
- **source.ts status:** Not typed in `FrontmatterData`; parsed via `[key: string]: unknown` catch-all using `parseBooleanFrontmatter()`.
- **Description:** Set to `true` to prevent Claude from automatically loading and invoking this skill. Use for workflows you want to trigger only manually via `/skill-name` or programmatically. When disabled, the skill is not considered during skill matching.
- **Example:**
  ```yaml
  ---
  disable-model-invocation: true
  ---
  ```
- **Notes:** Documented and critical but not a named typed property in `FrontmatterData`. Only literal `true` or string `"true"` are treated as true.

### `model`
- **Applies to:** Skills, Subagents, Slash commands
- **Type:** string (model alias or full model ID)
- **Default:** `inherit` (use parent context's model)
- **source.ts status:** Typed as `model?: string | null`.
- **Description:** Model to use when this component is active. Accepts model aliases (`haiku`, `sonnet`, `opus`), full model IDs (e.g., `claude-opus-4-7-20250219`), or `inherit` to use the parent's model. For skills and commands, use `inherit` to defer to the session model.
- **Example:**
  ```yaml
  ---
  model: opus
  ---
  ```
- **Notes:** None.

### `effort`
- **Applies to:** Skills, Subagents
- **Type:** string (enum or integer)
- **Default:** Inherits from session
- **source.ts status:** Typed as `effort?: string | null`.
- **Description:** Effort level (thinking depth) when this component is active. Overrides the session effort level. Options: `low`, `medium`, `high`, `xhigh`, `max`. Available levels depend on the model; unsupported values are logged as a warning and ignored.
- **Example:**
  ```yaml
  ---
  effort: high
  ---
  ```
- **Notes:** **Discrepancy**: Docs list `xhigh` as a valid option; source.ts comment omits it but the parser does not reject it.

### `context`
- **Applies to:** Skills
- **Type:** enum string (`inline` or `fork`)
- **Default:** `inline`
- **source.ts status:** Typed as `context?: 'inline' | 'fork' | null`.
- **Description:** Execution context for the skill. Set to `fork` to run the skill in a separate subagent context with its own token budget and isolation. Default `inline` expands the skill content into the current conversation.
- **Example:**
  ```yaml
  ---
  context: fork
  agent: Bash
  ---
  ```
- **Notes:** Only `fork` has special behavior; `inline` is the default and rarely needs to be written explicitly.

### `agent`
- **Applies to:** Skills (when `context: fork`)
- **Type:** string
- **Default:** `general-purpose`
- **source.ts status:** Typed as `agent?: string | null`.
- **Description:** Subagent type or custom subagent name to use when `context: fork` is set. Built-in agents include `Explore`, `Plan`, and `general-purpose`. You can also use any custom subagent name defined in `.claude/agents/`.
- **Example:**
  ```yaml
  ---
  context: fork
  agent: Bash
  ---
  ```
- **Notes:** Only relevant when `context: fork`. If omitted, defaults to `general-purpose`.

### `paths`
- **Applies to:** Skills, Memory rules (`.claude/rules/*.md`)
- **Type:** string (comma-separated glob patterns) or string[] (YAML list)
- **Default:** none — field is optional
- **source.ts status:** Typed as `paths?: string | string[] | null`. Expands brace patterns (e.g., `src/*.{ts,tsx}` → `src/*.ts`, `src/*.tsx`).
- **Description:** Glob patterns that limit when this skill is activated. When set, Claude loads the skill automatically only when working with files matching the patterns. Accepts either a comma-separated string or a YAML list. Supports brace expansion for concise patterns. For memory rules, applies the rule only to files matching the patterns.
- **Example:**
  ```yaml
  ---
  paths: "src/**/*.ts, tests/**/*.test.ts"
  ---
  ```
  or
  ```yaml
  ---
  paths:
    - src/*.{ts,tsx}
    - lib/**/*.js
  ---
  ```
- **Notes:** Brace patterns are expanded at parse time, so `src/*.{ts,tsx}` becomes two separate patterns.

### `shell`
- **Applies to:** Skills
- **Type:** enum string (`bash` or `powershell`)
- **Default:** `bash`
- **source.ts status:** Typed as `shell?: string | null`. Parsed via `parseShellFrontmatter()`, validated against `['bash', 'powershell']`.
- **Description:** Shell to use for `` !`command` `` and ` ```! ` code blocks in this skill. Accepts `bash` (default, POSIX shell) or `powershell` (Windows PowerShell). PowerShell support requires the environment variable `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`. Note: The skill's shell choice is portable and author-determined, not read from settings.
- **Example:**
  ```yaml
  ---
  shell: powershell
  ---
  ```
- **Notes:** Unrecognized values log a warning and fall back to `bash`. Never consults `settings.defaultShell`; the skill frontmatter is the single source of truth.

### `hooks`
- **Applies to:** Skills, Subagents
- **Type:** object (HooksSettings)
- **Default:** none — field is optional
- **source.ts status:** Typed as `hooks?: HooksSettings | null`. Validated by HooksSchema in loadSkillsDir.ts.
- **Description:** Lifecycle hooks scoped to this skill or subagent. Hooks trigger on events like `PreToolUse`, `PostToolUse`, `Stop`, and 23 others. Each hook can execute a command, HTTP request, prompt-based check, or sub-agent handler. See structure and event names below.
- **Example:**
  ```yaml
  ---
  name: secure-ops
  hooks:
    PreToolUse:
      - matcher: "Bash"
        hooks:
          - type: command
            command: "./scripts/check-bash.sh"
            timeout: 30
    PostToolUse:
      - matcher: "Write"
        hooks:
          - type: http
            url: "http://localhost:8080/hook"
            timeout: 10
    Stop:
      - hooks:
          - type: command
            command: "./cleanup.sh"
  ---
  ```
- **Notes:** **Plugin subagents cannot use `hooks`** — enforced at runtime, not the type level. `Stop` hooks in subagent frontmatter are auto-converted to `SubagentStop` at runtime.

#### Hooks structure

Each hook event maps to an array of **matcher groups**. Each matcher group has:
- `matcher` (optional string): Regex or literal string to filter when the hook fires. For tool events: matches tool name. For `SubagentStart`/`SubagentStop`: matches agent type. For `FileChanged`: matches file glob. Events `UserPromptSubmit`, `Stop`, `CwdChanged` do not support matchers.
- `hooks` (required array): Array of hook handler objects.

Each hook handler requires:
- `type` (required): `"command"` | `"http"` | `"prompt"` | `"agent"`
- `timeout` (optional, seconds): Default 600s for command, 30s for others.
- `statusMessage` (optional string): Message shown during hook execution.
- `if` (optional string): Permission-rule filter (tool events only).
- `once` (optional boolean): Run only once per session then remove (skills only; not documented for subagent hooks).

**Command-type hooks** add:
- `command` (required string): Shell command to execute.
- `shell` (optional, default `bash`): `"bash"` or `"powershell"`.
- `async` (optional boolean): Run in background without blocking (default `false`).
- `asyncRewake` (optional boolean): Background run; wake Claude on exit code 2 (default `false`).

**HTTP-type hooks** add:
- `url` (required string): HTTP endpoint.
- `headers` (optional object): Request headers.
- `allowedEnvVars` (optional array): Environment variables to pass (e.g., `["TOKEN"]`).

**Prompt and agent-type hooks** add:
- `prompt` (required string): Prompt text; supports `$ARGUMENTS` substitution.
- `model` (optional string): Model to use for the prompt.

**All 26 supported hook event names:**
`SessionStart`, `InstructionsLoaded`, `UserPromptSubmit`, `PreToolUse`, `PermissionRequest`, `PermissionDenied`, `PostToolUse`, `PostToolUseFailure`, `Notification`, `SubagentStart`, `SubagentStop`, `TaskCreated`, `TaskCompleted`, `Stop`, `StopFailure`, `TeammateIdle`, `ConfigChange`, `CwdChanged`, `FileChanged`, `WorktreeCreate`, `WorktreeRemove`, `PreCompact`, `PostCompact`, `Elicitation`, `ElicitationResult`, `SessionEnd`.

### `version`
- **Applies to:** Skills (uncommon)
- **Type:** string
- **Default:** none — field is optional
- **source.ts status:** Typed as `version?: string | null`. No comment or explanation in source.
- **Description:** Version identifier for the skill. **Not documented publicly.** Likely used internally for tracking plugin skill versions or future compatibility features. Has no runtime effect on skill behavior.
- **Example:**
  ```yaml
  ---
  version: "1.0.0"
  ---
  ```
- **Notes:** Completely undocumented. Parsed but not used by the loader itself; may be consumed by external tools or plugins.

---

### Subagent-specific fields

**Plugin subagents cannot use `hooks`, `mcpServers`, or `permissionMode` — these are enforced at runtime, not at the type level.**

### `tools`
- **Applies to:** Subagents
- **Type:** string (comma-separated tool names)
- **Default:** none — subagent inherits all tools if omitted
- **source.ts status:** Not typed in `FrontmatterData`; read via `[key: string]: unknown` catch-all.
- **Description:** Tools the subagent can use. List tool names separated by commas. If omitted, the subagent inherits all tools available in the parent context. Tools not listed here cannot be invoked by the subagent.
- **Example:**
  ```yaml
  ---
  tools: "Bash, Read, Write"
  ---
  ```
- **Notes:** Comma-separated string, not a YAML list. If the subagent needs no tools, use an empty string.

### `disallowedTools`
- **Applies to:** Subagents
- **Type:** string (comma-separated tool names)
- **Default:** none — field is optional
- **source.ts status:** Not typed in `FrontmatterData`; read via `[key: string]: unknown` catch-all.
- **Description:** Tools to deny or remove from the subagent's tool set. Tokens from `tools` (if specified) are removed; then `disallowedTools` are removed from the combined set, including inherited tools.
- **Example:**
  ```yaml
  ---
  tools: "Bash, Read, Write"
  disallowedTools: "Write"
  ---
  ```
- **Notes:** `disallowedTools` takes precedence in the filtering order.

### `permissionMode`
- **Applies to:** Subagents (not plugin subagents)
- **Type:** enum string
- **Default:** `default`
- **source.ts status:** Not typed in `FrontmatterData`; read via `[key: string]: unknown` catch-all.
- **Description:** Permission mode for tool use. Options: `default` (ask for permission), `acceptEdits` (auto-accept file edits), `auto` (auto-accept tool use), `dontAsk` (no notification), `bypassPermissions` (silent), or `plan` (plan-then-execute mode). **Not available for plugin subagents.**
- **Example:**
  ```yaml
  ---
  permissionMode: auto
  ---
  ```
- **Notes:** Plugin subagents cannot use this field. Runtime enforcement, not compile-time.

### `maxTurns`
- **Applies to:** Subagents
- **Type:** integer (positive)
- **Default:** none — field is optional
- **source.ts status:** Not typed in `FrontmatterData`; parsed via `parsePositiveIntFromFrontmatter()`.
- **Description:** Maximum number of agentic turns (back-and-forth exchanges) before the subagent stops. Must be a positive integer. If omitted or invalid, the subagent runs until it completes or hits other stop conditions.
- **Example:**
  ```yaml
  ---
  maxTurns: 10
  ---
  ```
- **Notes:** Must satisfy `Number.isInteger(n) && n > 0`. Zero, negative, and non-integer values are ignored.

### `mcpServers`
- **Applies to:** Subagents (not plugin subagents)
- **Type:** array or object (YAML list/mapping)
- **Default:** none — field is optional
- **source.ts status:** Not typed in `FrontmatterData`; read via `[key: string]: unknown` catch-all.
- **Description:** MCP (Model Context Protocol) servers available to this subagent. Each entry is either a server name string (referencing an already-configured server in `.claude/mcp-servers.json`) or an inline server definition with the server name as key and a full MCP config as value. **Not available for plugin subagents.**
- **Example:**
  ```yaml
  ---
  mcpServers:
    - slack
    - github
  ---
  ```
  or
  ```yaml
  ---
  mcpServers:
    slack:
      command: "python"
      args:
        - "-m"
        - "mcp_slack_server"
  ---
  ```
- **Notes:** Plugin subagents cannot use this field. Inline definitions require full MCP configuration.

### `memory`
- **Applies to:** Subagents
- **Type:** enum string (`user`, `project`, or `local`)
- **Default:** none — field is optional
- **source.ts status:** Not typed in `FrontmatterData`; read via `[key: string]: unknown` catch-all.
- **Description:** Persistent memory scope for the subagent. `user` persists across all projects for the user. `project` persists within a single project. `local` is session-only and not persisted. Enables cross-session learning and state retention.
- **Example:**
  ```yaml
  ---
  memory: project
  ---
  ```
- **Notes:** Controls where the subagent's conversation history and learned patterns are stored.

### `background`
- **Applies to:** Subagents
- **Type:** boolean
- **Default:** `false`
- **source.ts status:** Not typed in `FrontmatterData`; read via `[key: string]: unknown` catch-all.
- **Description:** Set to `true` to always run this subagent as a background task. Background subagents do not block the main conversation and their results are integrated asynchronously.
- **Example:**
  ```yaml
  ---
  background: true
  ---
  ```
- **Notes:** None.

### `isolation`
- **Applies to:** Subagents
- **Type:** enum string (`worktree`)
- **Default:** none — field is optional
- **source.ts status:** Not typed in `FrontmatterData`; read via `[key: string]: unknown` catch-all.
- **Description:** Set to `worktree` to run the subagent in a temporary git worktree, providing an isolated copy of the repository. The worktree is automatically cleaned up if the subagent makes no changes. Use for experiments or risky operations.
- **Example:**
  ```yaml
  ---
  isolation: worktree
  ---
  ```
- **Notes:** None.

### `color`
- **Applies to:** Subagents
- **Type:** enum string
- **Default:** none
- **source.ts status:** Not typed in `FrontmatterData`; read via `[key: string]: unknown` catch-all.
- **Description:** Display color for the subagent in the task list and UI transcript. Options: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, or `cyan`. Purely visual; does not affect behavior.
- **Example:**
  ```yaml
  ---
  color: blue
  ---
  ```
- **Notes:** None.

### `initialPrompt`
- **Applies to:** Subagents (when run as main session agent via `--agent`)
- **Type:** string
- **Default:** none — field is optional
- **source.ts status:** Not typed in `FrontmatterData`; read via `[key: string]: unknown` catch-all.
- **Description:** Prompt automatically submitted as the first user turn when this subagent runs as the main session agent (via `--agent` flag or `agent` setting). Commands and skills referenced in the prompt are processed. The text is prepended to any user-provided prompt.
- **Example:**
  ```yaml
  ---
  initialPrompt: "Audit the security of the codebase."
  ---
  ```
- **Notes:** Only used when the subagent is the primary agent for the session, not when invoked as a helper.

### `skills`
- **Applies to:** Subagents
- **Type:** string (comma-separated skill names)
- **Default:** none — field is optional
- **source.ts status:** Typed as `skills?: string | null`.
- **Description:** Skills to load into the subagent's context at startup. The full skill content is injected, not just made available for invocation. Subagents do not inherit skills from the parent conversation; only explicitly listed skills are loaded. Separate skill names by commas.
- **Example:**
  ```yaml
  ---
  skills: "validate-sql, analyze-performance"
  ---
  ```
- **Notes:** **Discrepancy**: Docs show YAML list syntax in examples; source.ts types as `string | null` with "comma-separated" comment. The loader may accept both, but the type declaration reflects only comma-separated strings.

---

### Memory & slash-command fields

### `type`
- **Applies to:** Memory files (`.claude/memory.md`, `.claude/feedback.md`, `.claude/rules/*.md`)
- **Type:** enum string (`user`, `feedback`, `project`, or `reference`)
- **Default:** `user`
- **source.ts status:** Typed as `type?: string | null`. Comment: "Memory type: 'user', 'feedback', 'project', or 'reference'. Only applicable to memory files; narrowed via parseMemoryType() in src/memdir/memoryTypes.ts".
- **Description:** Memory file type, which determines scope and persistence. `user` persists globally for the user. `feedback` captures user feedback. `project` is scoped to the project. `reference` is read-only reference material. **Not documented in public docs.**
- **Example:**
  ```yaml
  ---
  type: project
  ---
  ```
- **Notes:** Completely undocumented publicly; found only in source.ts. Likely an internal field; may not need to be manually set for standard memory files.

### `hide-from-slash-command-tool`
- **Applies to:** Slash commands (legacy `.claude/commands/` files)
- **Type:** boolean (stored as string `"true"` or `"false"`)
- **Default:** `false`
- **source.ts status:** Typed as `'hide-from-slash-command-tool'?: string | null`. Comment: "Only applicable to slash commands -- a string similar to a boolean env var to determine whether to make them visible to the SlashCommand tool."
- **Description:** Set to `true` to hide the slash command from the SlashCommand tool. **Undocumented publicly and likely legacy.** Relates to older `.claude/commands/` structure; use `user-invocable: false` for modern skills instead.
- **Example:**
  ```yaml
  ---
  hide-from-slash-command-tool: true
  ---
  ```
- **Notes:** Legacy field. Undocumented. The relationship to `user-invocable` is unclear; both may serve similar roles for different component types.

---

### Output-style fields

### `keep-coding-instructions`
- **Applies to:** Output styles (`.claude/output-styles/`)
- **Type:** boolean
- **Default:** `false`
- **source.ts status:** Not typed in `FrontmatterData`; read via `[key: string]: unknown` catch-all.
- **Description:** Whether to keep the parts of Claude Code's system prompt related to coding (file operations, shell commands, etc.). When `false`, these instructions are stripped so the model focuses on non-technical output. Use for output styles designed for non-coding contexts.
- **Example:**
  ```yaml
  ---
  name: storyteller
  description: Write creative fiction
  keep-coding-instructions: false
  ---
  ```
- **Notes:** None.
