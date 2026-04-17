# Claude Code Built-in Tools

Built-in tools are the primitives Claude invokes to interact with your system, codebase, and remote services. Each tool has a name, input schema, and permission requirements; Claude receives the tool list in its system prompt and dispatches requests via tool_use blocks. Some tools are always available; others are gated by feature flags, entrypoints, or permissions. Distinct from MCP tools (registered dynamically by external servers) and skill-based workflows (executed via the Skill tool).

## How tools work

- **Tool dispatch**: Claude receives a list of available tools in its system prompt and names each one in a tool_use block along with structured inputs.
- **Schema validation**: The harness validates each tool call against its input schema before execution.
- **Permissions**: Tools that write or execute are gated by permission rules (allow/ask/deny) defined in `settings.json` or via `/permissions`.
- **Tool classes**: Tools are categorized by side-effect type: read-only (Glob, Grep, Read), writes (Write, Edit), executes (Bash, PowerShell), spawns (Agent, TaskCreate), orchestration (SendMessage, TeamCreate), or meta (Config, ToolSearch).
- **Gating mechanisms**: Some tools are always on; others are entrypoint-gated (SDK-only, local-agent-only, remote-only), feature-flag-gated (env vars like `CLAUDE_CODE_ENABLE_TASKS`), or subscription-gated (Pro/Max).
- **MCP orchestration**: The four MCP tools (ListMcpResources, ReadMcpResource, plus indirect orchestration via Tool Search) are primitives for discovering and using dynamically-registered tools from MCP servers; individual MCP tools themselves are not built-in.
- **Deferred loading**: ToolSearch (when `ENABLE_TOOL_SEARCH=1`) loads tool schemas lazily to reduce initial system prompt size; MCP tools are also deferred until needed.

## Quick reference

| Tool | Class | Side effect | Gating | Purpose |
|------|-------|------------|--------|---------|
| `Read` | Filesystem | Read-only | Always | Read file contents, including images and notebooks |
| `Write` | Filesystem | Writes | Permission | Create or overwrite files |
| `Edit` | Filesystem | Writes | Permission | Make targeted edits to specific lines |
| `NotebookEdit` | Filesystem | Writes | Permission | Modify Jupyter notebook cells |
| `Glob` | Filesystem | Read-only | Always | Find files by glob pattern matching |
| `Grep` | Filesystem | Read-only | Always | Search for patterns in file contents |
| `Bash` | Shell | Executes | Permission | Run shell commands (POSIX/Bash) |
| `PowerShell` | Shell | Executes | Permission | Run PowerShell commands (opt-in) |
| `LSP` | Code intelligence | Read-only | Always | Jump to definitions, find references, type info |
| `WebFetch` | Network | Read-only | Permission | Fetch and parse content from URLs |
| `WebSearch` | Network | Read-only | Permission | Perform web searches (US only) |
| `Agent` | Orchestration | Spawns | Always | Spawn a subagent with isolated context |
| `Skill` | Orchestration | Spawns | Permission | Execute a skill from the skill registry |
| `CronCreate` | Scheduling | Spawns | Always | Schedule a one-time or recurring prompt |
| `CronDelete` | Scheduling | Spawns | Always | Cancel a scheduled task |
| `CronList` | Scheduling | Read-only | Always | List all scheduled tasks |
| `TaskCreate` | Task management | Spawns | Always | Create a task in the task list |
| `TaskGet` | Task management | Read-only | Always | Get details for a specific task |
| `TaskList` | Task management | Read-only | Always | List all tasks with status |
| `TaskUpdate` | Task management | Writes | Always | Update task status, details, or delete |
| `TaskStop` | Task management | Executes | Always | Kill a running background task |
| `TaskOutput` | Task management | Read-only | Always | (Deprecated) Get output from a background task |
| `EnterPlanMode` | Session | None | Always | Switch to plan mode (design before code) |
| `ExitPlanMode` | Session | Writes | Permission | Present plan and exit plan mode |
| `EnterWorktree` | Session | Spawns | Always | Create or switch to a git worktree |
| `ExitWorktree` | Session | None | Always | Exit a worktree and return to main |
| `Monitor` | Shell | Executes | Permission | Run command in background, feed output back |
| `SendMessage` | Orchestration | None | Always | Message a teammate or resume a subagent |
| `TeamCreate` | Orchestration | Spawns | Feature-flag | Create an agent team with multiple teammates |
| `TeamDelete` | Orchestration | Executes | Feature-flag | Disband a team and clean up resources |
| `AskUserQuestion` | Session | None | Always | Ask multiple-choice questions |
| `Config` | Session | Writes | Always | Get or modify settings |
| `ToolSearch` | Meta | Read-only | Feature-flag | Search for and load deferred tools |
| `ListMcpResources` | MCP | Read-only | Always | List resources exposed by MCP servers |
| `ReadMcpResource` | MCP | Read-only | Always | Read a specific MCP resource by URI |
| `TodoWrite` | Task management | Writes | Always | Manage session task checklist (non-interactive) |
| `RemoteTrigger` | Remote | Executes | Entrypoint | Trigger a remote session or API call |
| `BriefTool` | Session | None | Feature-flag | Enable brief/compact output mode |
| `SleepTool` | Meta | None | Internal | Sleep for a duration (testing/internal) |

---

## Filesystem tools

### `Read`
- **Invoked as:** `Read`
- **Source directory:** `claude-code-main/tools/FileReadTool/`
- **Class:** Filesystem
- **Side effect:** Read-only
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Reads the contents of files." Supports plain text, images (PNG, JPG), and Jupyter notebooks (.ipynb). Returns file contents as text or structured data. Images are processed and described. Notebooks are returned with all cells and outputs.
- **Input parameters:**
  - `file_path` (string, required) — Absolute path to the file to read
  - `limit` (integer, optional) — Number of lines to read from the start of the file
  - `offset` (integer, optional) — Line number to start reading from
  - `pages` (string, optional) — For PDFs, page range (e.g., "1-5", "3") — maximum 20 pages per request
- **Returns:** File contents as plain text, with line numbers (format: `line_number\t content`), or structured data for notebooks and images.
- **Notes:** Maximum context for file reads is configurable via `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS`. No permission required—this is a read-only tool.

### `Write`
- **Invoked as:** `Write`
- **Source directory:** `claude-code-main/tools/FileWriteTool/`
- **Class:** Filesystem
- **Side effect:** Writes
- **Gating:** Always; permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Creates or overwrites files." Always overwrites; does not preserve existing content. Validate permissions before writing to sensitive paths.
- **Input parameters:**
  - `file_path` (string, required) — Absolute path to the file to create or overwrite
  - `content` (string, required) — File contents to write
- **Returns:** Confirmation that file was written; no content returned.
- **Notes:** This is a mutating tool. Permission system applies. Overwrites any existing file at the path without warning—use Edit for safer, targeted modifications.

### `Edit`
- **Invoked as:** `Edit`
- **Source directory:** `claude-code-main/tools/FileEditTool/`
- **Class:** Filesystem
- **Side effect:** Writes
- **Gating:** Always; permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Makes targeted edits to specific files." Does not overwrite the entire file; instead performs a search-and-replace on exact text ranges. Requires reading the file first to identify the text to replace.
- **Input parameters:**
  - `file_path` (string, required) — Absolute path to the file to modify
  - `old_string` (string, required) — Exact text to find and replace. Must be unique in the file or the edit fails.
  - `new_string` (string, required) — Text to replace it with. Must be different from old_string.
  - `replace_all` (boolean, optional) — If true, replace all occurrences instead of requiring uniqueness.
- **Returns:** Confirmation that the edit succeeded; shows context around the modified line.
- **Notes:** Safer than Write for incremental changes. Prefer Edit for code modifications. The old_string must match exactly, including whitespace and indentation.

### `NotebookEdit`
- **Invoked as:** `NotebookEdit`
- **Source directory:** `claude-code-main/tools/FileEditTool/` (part of Notebook operations)
- **Class:** Filesystem
- **Side effect:** Writes
- **Gating:** Always; permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Modifies Jupyter notebook cells." Targets specific cells by index or markdown header matching, allowing you to update code and markdown cells without rewriting the entire notebook.
- **Input parameters:**
  - `file_path` (string, required) — Path to the .ipynb file
  - `cell_index` (integer, optional) — Index of the cell to modify
  - `header_match` (string, optional) — Markdown header to find the cell by title
  - `new_source` (string, required) — New cell source code or markdown content
- **Returns:** Updated notebook with modified cell.
- **Notes:** Requires the notebook to already exist. Works with both code and markdown cells. Returns the full notebook structure after edit.

### `Glob`
- **Invoked as:** `Glob`
- **Source directory:** `claude-code-main/tools/GlobTool/` (inferred from source)
- **Class:** Filesystem
- **Side effect:** Read-only
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Finds files based on pattern matching." Returns file paths sorted by modification time. Supports glob patterns with `**` for recursive matching and `{}` for alternation.
- **Input parameters:**
  - `pattern` (string, required) — Glob pattern (e.g., `**/*.js`, `src/*.{ts,tsx}`)
  - `path` (string, optional) — Directory to search in; defaults to current working directory
- **Returns:** List of matching file paths, sorted by modification time (newest first).
- **Notes:** No permission required. Fast pattern matching via ripgrep. Respects .gitignore by default; override with `CLAUDE_CODE_GLOB_NO_IGNORE=1`. Include hidden files with `CLAUDE_CODE_GLOB_HIDDEN=1`.

### `Grep`
- **Invoked as:** `Grep`
- **Source directory:** `claude-code-main/tools/GrepTool/` (inferred from source)
- **Class:** Filesystem
- **Side effect:** Read-only
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Searches for patterns in file contents." Powered by ripgrep (rg). Supports regex, case-insensitive search, context lines, and multiple output modes (content, files_with_matches, count).
- **Input parameters:**
  - `pattern` (string, required) — Regular expression to search for
  - `path` (string, optional) — File or directory to search in
  - `type` (string, optional) — File type filter (e.g., `js`, `py`, `rust`, `go`)
  - `glob` (string, optional) — Glob pattern to filter files
  - `output_mode` (string, optional) — `content`, `files_with_matches`, or `count`; defaults to `files_with_matches`
  - `-i` (boolean) — Case-insensitive search
  - `-n` (boolean) — Show line numbers (default true for content mode)
  - `-A`, `-B`, `-C` (number) — Show context lines after/before/around match
  - `head_limit` (integer, optional) — Limit output to N results; defaults to 250
  - `multiline` (boolean, optional) — Match across line boundaries (rg -U --multiline-dotall)
- **Returns:** Matching lines with context, file paths, or counts depending on output_mode.
- **Notes:** No permission required. Supports full ripgrep regex syntax. Default head_limit of 250 prevents unbounded output; pass `head_limit: 0` for unlimited (use sparingly).

---

## Shell & code execution tools

### `Bash`
- **Invoked as:** `Bash`
- **Source directory:** `claude-code-main/tools/BashTool/`
- **Class:** Shell
- **Side effect:** Executes
- **Gating:** Always; permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Executes shell commands in your environment." Each command runs in a separate process. Working directory persists across commands if it remains within the project directory; outside that, it resets. Environment variables do not persist between commands.
- **Input parameters:**
  - `command` (string, required) — Shell command to execute
- **Returns:** Standard output and exit code.
- **Notes:** Permission required. Working directory behavior: `cd` persists within the project or `additionalDirectories`; outside those, resets to project root. Set `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR=1` to disable carry-over. Export statements do not persist; use `CLAUDE_ENV_FILE` for multi-command environment setup.

### `PowerShell`
- **Invoked as:** `PowerShell`
- **Source directory:** `claude-code-main/tools/PowerShellTool/`
- **Class:** Shell
- **Side effect:** Executes
- **Gating:** Opt-in via `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`; permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Executes PowerShell commands natively." On Windows, routes commands through PowerShell instead of Git Bash. Requires PowerShell 7+ on non-Windows platforms (pwsh). Same working-directory and environment-variable persistence behavior as Bash.
- **Input parameters:**
  - `command` (string, required) — PowerShell command to execute
- **Returns:** Standard output and exit code.
- **Notes:** Opt-in on non-Windows. Requires pwsh 7+ on Linux/macOS/WSL. On Windows, auto-detects pwsh.exe (7+) with fallback to powershell.exe (5.1). Bash tool remains registered alongside. Same working-directory reset rules apply. Not available in sandboxed mode on Windows during preview.

### `Monitor`
- **Invoked as:** `Monitor`
- **Source directory:** Not present in the inspected source snapshot — may be newer than the snapshot or registered elsewhere. See "Discrepancies & notes" below.
- **Class:** Shell
- **Side effect:** Executes
- **Gating:** Permission required; unavailable on Bedrock, Vertex AI, Foundry, or when `DISABLE_TELEMETRY` is set
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Runs a command in the background and feeds each output line back to Claude, so it can react to log entries, file changes, or polled status mid-conversation." Claude writes a watch script, runs it in the background, and receives each line as it arrives without pausing the conversation.
- **Input parameters:**
  - `command` (string, required) — Command to run in the background
  - `description` (string, optional) — Human-readable description of what to watch
- **Returns:** Each output line from the monitored command, streamed back as it arrives.
- **Notes:** Uses same permission rules as Bash. Not available on Bedrock, Vertex, or Foundry. Requires non-disabled telemetry (because it relies on the stream health watchdog). Stop by asking Claude to cancel or by ending the session.

### `LSP`
- **Invoked as:** `LSP`
- **Source directory:** `claude-code-main/tools/LSPTool/`
- **Class:** Code intelligence
- **Side effect:** Read-only
- **Gating:** Always (inactive until language server is installed via code-intelligence plugin)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Code intelligence via language servers: jump to definitions, find references, report type errors and warnings." Auto-reports type errors and warnings after each file edit. Can also be called directly for navigation and inspection.
- **Input parameters:**
  - `file` (string, required) — File path
  - `line` (number, required) — Line number (0-indexed)
  - `character` (number, required) — Character offset on the line
  - `action` (string, required) — One of: `definition`, `references`, `hover`, `symbols`, `implementation`, `callHierarchy`
- **Returns:** Structured response with symbols, definitions, references, type info, or diagnostics.
- **Notes:** Inactive until a code-intelligence plugin for your language is installed (bundles the LSP configuration; you install the binary separately). Auto-reports are non-interactive. Direct calls require explicit action parameter.

---

## Network & web tools

### `WebFetch`
- **Invoked as:** `WebFetch`
- **Source directory:** `claude-code-main/tools/WebFetchTool/`
- **Class:** Network
- **Side effect:** Read-only
- **Gating:** Permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Fetches content from a specified URL and processes it using an AI model." Converts HTML to markdown, summarizes large content, and includes a self-cleaning 15-minute cache. HTTPS is required; HTTP URLs auto-upgrade. Fails for authenticated or private URLs (use specialized MCP tools instead).
- **Input parameters:**
  - `url` (string, required) — Full URL (must be http:// or https://)
  - `prompt` (string, required) — Question or instruction for what to extract from the page
- **Returns:** Markdown-formatted content or answer based on the prompt.
- **Notes:** Permission required. Auto-upgrades HTTP to HTTPS. Includes 15-minute cache. Fails on authenticated/private content (GitHub private repos, Google Docs, Confluence, Jira, etc.)—use GitHub CLI or specialized MCP tools instead. IMPORTANT: URLs that redirect to different hosts will inform you of the redirect and provide the new URL; fetch again with the new URL.

### `WebSearch`
- **Invoked as:** `WebSearch`
- **Source directory:** `claude-code-main/tools/WebSearchTool/`
- **Class:** Network
- **Side effect:** Read-only
- **Gating:** Permission required; US-only
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Performs web searches." Returns search results with links formatted as markdown hyperlinks. Up-to-date information for current events and recent data beyond the knowledge cutoff.
- **Input parameters:**
  - `query` (string, required) — Search query
  - `allowed_domains` (string[], optional) — Only include results from these domains
  - `blocked_domains` (string[], optional) — Never include results from these domains
- **Returns:** List of search results, each with title and URL as markdown hyperlinks.
- **Notes:** Permission required. US only. Use this for current information, recent events, and data beyond your knowledge cutoff. You must include a "Sources:" section listing all URLs from the search results as markdown links in your response.

---

## Orchestration & agent tools

### `Agent`
- **Invoked as:** `Agent`
- **Source directory:** `claude-code-main/tools/AgentTool/`
- **Class:** Orchestration
- **Side effect:** Spawns
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/sub-agents
- **Description:** "Spawns a subagent with its own context window to handle a task." Subagents are specialized helpers that run in isolated context and return results. Use when a side task would flood the main conversation with search results or logs. Define custom subagents in `.claude/agents/` or `~/.claude/agents/`.
- **Input parameters:**
  - `agent` (string, required) — Subagent name or type (e.g., `general-purpose`, `Explore`, `Plan`)
  - `prompt` (string, required) — Prompt to send to the subagent
  - `tools` (string, optional) — Comma-separated tool allowlist for the subagent
  - `disallowedTools` (string, optional) — Tools to deny
  - `model` (string, optional) — Model for the subagent (e.g., `haiku`, `sonnet`)
- **Returns:** Subagent's response and result.
- **Notes:** Subagents have their own context windows and do not inherit the main conversation history. Built-in agents: `general-purpose`, `Explore`, `Plan`. Load project or user-defined subagents by name. Subagents can use Agent tool to spawn nested agents, but cannot use TeamCreate.

### `Skill`
- **Invoked as:** `Skill`
- **Source directory:** `claude-code-main/tools/SkillTool/`
- **Class:** Orchestration
- **Side effect:** Spawns
- **Gating:** Permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/skills#control-who-invokes-a-skill
- **Description:** "Executes a skill within the main conversation." Skills are reusable prompt-based workflows stored as markdown in `.claude/skills/` or `~/.claude/skills/`. Use `Skill` to invoke skills programmatically; users invoke with `/skill-name` or by mentioning the skill name.
- **Input parameters:**
  - `skill` (string, required) — Skill name (directory name under `.claude/skills/`)
  - `arguments` (string, optional) — Arguments to pass to the skill
- **Returns:** Skill's output.
- **Notes:** Permission required. Skills are merged inline into the main conversation (unless `context: fork` is set in frontmatter). Control invocation via frontmatter: `user-invocable: false` hides from `/` menu; `disable-model-invocation: true` prevents automatic invocation.

### `SendMessage`
- **Invoked as:** `SendMessage`
- **Source directory:** `claude-code-main/tools/SendMessageTool/`
- **Class:** Orchestration
- **Side effect:** None
- **Gating:** Feature-flag `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; always available when teams are enabled
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/agent-teams
- **Description:** "Sends a message to an agent team teammate, or resumes a subagent by its agent ID. Stopped subagents auto-resume in the background. Only available when `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set."
- **Input parameters:**
  - `recipient` (string, required) — Teammate name or agent ID
  - `message` (string, required) — Message to send
- **Returns:** Confirmation that message was sent.
- **Notes:** Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` feature flag to be enabled. Used within agent teams for direct inter-agent communication. Teammates auto-resume after stopping if you send them a message.

### `TeamCreate`
- **Invoked as:** `TeamCreate`
- **Source directory:** `claude-code-main/tools/TeamCreateTool/`
- **Class:** Orchestration
- **Side effect:** Spawns
- **Gating:** Feature-flag `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/agent-teams
- **Description:** "Creates an agent team with multiple teammates. Only available when `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set." The lead session spawns independent teammates, each with its own context, and coordinates shared work via a task list and mailbox.
- **Input parameters:**
  - `team_name` (string, required) — Name for the team
  - `teammates` (object, required) — Map of teammate name to agent type/definition
  - `task_description` (string, required) — Description of the work to coordinate
- **Returns:** Team ID, teammate IDs, and shared task list location.
- **Notes:** Experimental and disabled by default. Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. Teams are stored locally at `~/.claude/teams/{team-name}/`. Each teammate is an independent Claude Code session with its own context window. Teammates can message each other and claim tasks from the shared list.

### `TeamDelete`
- **Invoked as:** `TeamDelete`
- **Source directory:** `claude-code-main/tools/TeamDeleteTool/`
- **Class:** Orchestration
- **Side effect:** Executes
- **Gating:** Feature-flag `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/agent-teams
- **Description:** "Disbands an agent team and cleans up teammate processes. Only available when `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set." Must be called from the team lead; teammates cannot self-cleanup.
- **Input parameters:**
  - `team_name` (string, required) — Name of the team to delete
  - `force` (boolean, optional) — Force cleanup even if teammates are still running
- **Returns:** Confirmation that team was deleted.
- **Notes:** Experimental. Must be called by the team lead, not a teammate. Checks for active teammates and fails if any are running unless `force: true`. Cleans up team config and task list files.

---

## Scheduling & tasks

### `CronCreate`
- **Invoked as:** `CronCreate` (also aliased as `ScheduleCron` in some docs)
- **Source directory:** `claude-code-main/tools/ScheduleCronTool/CronCreateTool.ts`
- **Class:** Scheduling
- **Side effect:** Spawns
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/scheduled-tasks (under `CronCreate`)
- **Description:** "Schedules a recurring or one-shot prompt within the current session. Tasks are session-scoped and restored on `--resume` or `--continue` if unexpired." Accepts cron expressions or natural language intervals (e.g., "5m", "2h").
- **Input parameters:**
  - `prompt` (string, required) — Prompt to run on schedule
  - `schedule` (string, required) — Cron expression (e.g., `*/5 * * * *`) or natural language (e.g., `every 5 minutes`, `daily at 9am`)
  - `expiration` (string, optional) — Expiration time (default 30 days)
- **Returns:** Task ID and confirmation.
- **Notes:** Session-scoped; expires after 30 days by default. Auto-resumes when session is resumed. Minimum granularity: 1 minute. Minimum is per-minute cron; seconds round up.

### `CronDelete`
- **Invoked as:** `CronDelete`
- **Source directory:** `claude-code-main/tools/ScheduleCronTool/CronDeleteTool.ts`
- **Class:** Scheduling
- **Side effect:** Spawns
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/scheduled-tasks
- **Description:** "Cancels a scheduled task by ID."
- **Input parameters:**
  - `task_id` (string, required) — ID of the task to cancel
- **Returns:** Confirmation that task was cancelled.
- **Notes:** None.

### `CronList`
- **Invoked as:** `CronList`
- **Source directory:** `claude-code-main/tools/ScheduleCronTool/CronListTool.ts`
- **Class:** Scheduling
- **Side effect:** Read-only
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/scheduled-tasks
- **Description:** "Lists all scheduled tasks in the session."
- **Input parameters:** None
- **Returns:** List of scheduled tasks with IDs, schedules, and next run times.
- **Notes:** None.

### `TaskCreate`
- **Invoked as:** `TaskCreate`
- **Source directory:** `claude-code-main/tools/TaskCreateTool/`
- **Class:** Task management
- **Side effect:** Spawns
- **Gating:** Feature-flag `CLAUDE_CODE_ENABLE_TASKS`; always available when tasks are enabled
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Creates a new task in the task list." Task list coordinates work in interactive mode and in agent teams. Tasks can have dependencies, status (pending/in-progress/completed), and optional output file paths.
- **Input parameters:**
  - `title` (string, required) — Task title
  - `description` (string, optional) — Detailed task description
  - `status` (string, optional) — `pending` (default), `in-progress`, or `completed`
  - `dependencies` (string[], optional) — Array of task IDs this task depends on
  - `output_file` (string, optional) — Path where task output will be stored
- **Returns:** Task ID and confirmation.
- **Notes:** Feature-flag gated on `CLAUDE_CODE_ENABLE_TASKS`. In agent teams, tasks are shared and teammates can claim work.

### `TaskGet`
- **Invoked as:** `TaskGet`
- **Source directory:** `claude-code-main/tools/TaskGetTool/`
- **Class:** Task management
- **Side effect:** Read-only
- **Gating:** Always (when tasks enabled)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Retrieves full details for a specific task."
- **Input parameters:**
  - `task_id` (string, required) — Task ID
- **Returns:** Full task object with title, description, status, dependencies, output path, timestamps.
- **Notes:** None.

### `TaskList`
- **Invoked as:** `TaskList`
- **Source directory:** `claude-code-main/tools/TaskListTool/`
- **Class:** Task management
- **Side effect:** Read-only
- **Gating:** Always (when tasks enabled)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Lists all tasks with their current status."
- **Input parameters:** None
- **Returns:** Array of all tasks with status, title, and ID.
- **Notes:** None.

### `TaskUpdate`
- **Invoked as:** `TaskUpdate`
- **Source directory:** `claude-code-main/tools/TaskUpdateTool/`
- **Class:** Task management
- **Side effect:** Writes
- **Gating:** Always (when tasks enabled)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Updates task status, dependencies, details, or deletes tasks."
- **Input parameters:**
  - `task_id` (string, required) — Task ID to update
  - `status` (string, optional) — New status (`pending`, `in-progress`, `completed`)
  - `title` (string, optional) — New title
  - `description` (string, optional) — New description
  - `dependencies` (string[], optional) — New dependency list
  - `delete` (boolean, optional) — If true, delete the task
- **Returns:** Updated task object or confirmation of deletion.
- **Notes:** Pass `delete: true` to remove a task from the list.

### `TaskStop`
- **Invoked as:** `TaskStop`
- **Source directory:** `claude-code-main/tools/TaskStopTool/`
- **Class:** Task management
- **Side effect:** Executes
- **Gating:** Always (when tasks enabled)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Kills a running background task by ID."
- **Input parameters:**
  - `task_id` (string, required) — Task ID to stop
- **Returns:** Confirmation that task was stopped.
- **Notes:** Used for background tasks spawned via Agent or Skill tools. Stops the subprocess immediately.

### `TaskOutput`
- **Invoked as:** `TaskOutput`
- **Source directory:** `claude-code-main/tools/TaskListTool/` (legacy)
- **Class:** Task management
- **Side effect:** Read-only
- **Gating:** Always (when tasks enabled)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference (marked deprecated)
- **Description:** "(Deprecated) Retrieves output from a background task. Prefer `Read` on the task's output file path."
- **Input parameters:**
  - `task_id` (string, required) — Task ID
- **Returns:** Task output as text.
- **Notes:** Deprecated. Use Read tool on the task's `output_file` path instead for better control and efficiency.

### `TodoWrite`
- **Invoked as:** `TodoWrite`
- **Source directory:** `claude-code-main/tools/TodoWriteTool/`
- **Class:** Task management
- **Side effect:** Writes
- **Gating:** Always; available in non-interactive mode and the Agent SDK
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Manages the session task checklist. Available in non-interactive mode and the Agent SDK; interactive sessions use TaskCreate, TaskGet, TaskList, and TaskUpdate instead."
- **Input parameters:**
  - `items` (string[], required) — Array of todo items to set
- **Returns:** Confirmation of todo list update.
- **Notes:** For interactive sessions, use the Task* tools instead. This is for SDK and non-interactive entrypoints.

---

## Session & user interaction tools

### `EnterPlanMode`
- **Invoked as:** `EnterPlanMode`
- **Source directory:** `claude-code-main/tools/EnterPlanModeTool/`
- **Class:** Session
- **Side effect:** None
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Switches to plan mode to design an approach before coding." In plan mode, Claude cannot use write or execute tools; only read tools work. Use to think through a strategy before making changes.
- **Input parameters:** None
- **Returns:** Confirmation that plan mode is active.
- **Notes:** Toggles plan mode on. Use ExitPlanMode to present the plan and exit. In plan mode, only Bash/PowerShell/Edit/Write/Bash in read-only mode are disabled; read-only tools remain available.

### `ExitPlanMode`
- **Invoked as:** `ExitPlanMode`
- **Source directory:** `claude-code-main/tools/ExitPlanModeTool/`
- **Class:** Session
- **Side effect:** Writes
- **Gating:** Permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Presents a plan for approval and exits plan mode." Requires user confirmation before Claude can proceed with implementation.
- **Input parameters:**
  - `plan` (string, required) — The plan summary to present to the user
- **Returns:** User's approval/rejection and feedback.
- **Notes:** Permission required. User must approve before Claude exits plan mode and can use write/execute tools again.

### `EnterWorktree`
- **Invoked as:** `EnterWorktree`
- **Source directory:** `claude-code-main/tools/EnterPlanModeTool/` (separate but related)
- **Class:** Session
- **Side effect:** Spawns
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Creates an isolated git worktree and switches into it. Pass a `path` to switch into an existing worktree of the current repository instead of creating a new one. Not available to subagents." Worktrees are automatically cleaned up if no changes are made.
- **Input parameters:**
  - `path` (string, optional) — Path to an existing worktree to switch to, or omit to create a new one
  - `name` (string, optional) — Name for the new worktree
- **Returns:** Confirmation of worktree creation/switch and new working directory.
- **Notes:** Not available in subagents. Useful for running experiments without affecting the main branch. Worktree is auto-cleaned if no changes.

### `ExitWorktree`
- **Invoked as:** `ExitWorktree`
- **Source directory:** `claude-code-main/tools/ExitWorktreeTool/`
- **Class:** Session
- **Side effect:** None
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Exits a worktree session and returns to the original directory. Not available to subagents."
- **Input parameters:** None
- **Returns:** Confirmation and the original working directory.
- **Notes:** Not available in subagents. Returns to the main branch/directory you were in before EnterWorktree.

### `AskUserQuestion`
- **Invoked as:** `AskUserQuestion`
- **Source directory:** `claude-code-main/tools/AskUserQuestionTool/`
- **Class:** Session
- **Side effect:** None
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Asks multiple-choice questions to gather requirements or clarify ambiguity." Blocks until the user responds.
- **Input parameters:**
  - `question` (string, required) — Question text
  - `choices` (string[], required) — Array of answer options
- **Returns:** User's selected choice.
- **Notes:** Blocks the conversation until the user responds. Use for clarifying ambiguous requirements.

### `Config`
- **Invoked as:** `Config`
- **Source directory:** `claude-code-main/tools/ConfigTool/`
- **Class:** Session
- **Side effect:** Writes
- **Gating:** Always
- **Documented in public docs?:** Not explicitly; related to settings but not a separate entry in the public tools table.
- **Description:** "Get or modify settings." Provides read/write access to `settings.json` and `settings.local.json`. Use for quick config changes; use `/update-config` skill for comprehensive settings management with documentation.
- **Input parameters:**
  - `action` (string, required) — `get` or `set`
  - `key` (string, required) — Setting key (e.g., `model`, `defaultShell`)
  - `value` (any, optional) — Value to set (required for `set` action)
- **Returns:** Current setting value (for `get`) or confirmation (for `set`).
- **Notes:** Works with `.claude/settings.json`. Direct config modification tool; for more complex changes, use `/update-config` skill.

---

## MCP (Model Context Protocol) tools

### `ListMcpResources`
- **Invoked as:** `ListMcpResources`
- **Source directory:** `claude-code-main/tools/ListMcpResourcesTool/`
- **Class:** MCP
- **Side effect:** Read-only
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/mcp (under "Resources")
- **Description:** "Lists resources exposed by connected MCP servers." Resources are named documents or tools published by MCP servers; this tool enumerates what's available without fetching their full content.
- **Input parameters:**
  - `server` (string, optional) — Specific MCP server name to query; omit to list from all connected servers
- **Returns:** List of resources with names, types, and descriptions.
- **Notes:** Use before calling ReadMcpResource to discover what's available. Resources are exposed by MCP servers configured in `.mcp.json` or `settings.json` under `mcpServers`.

### `ReadMcpResource`
- **Invoked as:** `ReadMcpResource`
- **Source directory:** `claude-code-main/tools/ReadMcpResourceTool/`
- **Class:** MCP
- **Side effect:** Read-only
- **Gating:** Always
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference (listed as `ReadMcpResourceTool`)
- **Description:** "Reads a specific MCP resource by URI." Fetches the full content of a named resource from an MCP server.
- **Input parameters:**
  - `uri` (string, required) — Fully-qualified resource URI (e.g., `resource://server-name/resource-name`)
- **Returns:** Resource content (text, structured data, or file content).
- **Notes:** URI format is `resource://server-name/resource-name`. Use ListMcpResources first to discover available URIs.

---

## Meta & search tools

### `ToolSearch`
- **Invoked as:** `ToolSearch`
- **Source directory:** `claude-code-main/tools/ToolSearchTool/`
- **Class:** Meta
- **Side effect:** Read-only
- **Gating:** Feature-flag `ENABLE_TOOL_SEARCH`
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/mcp#scale-with-mcp-tool-search
- **Description:** "Searches for and loads deferred tools when tool search is enabled." When `ENABLE_TOOL_SEARCH=1`, tool schemas are deferred (not loaded initially) to reduce system prompt size. Claude uses ToolSearch to query for and load specific tools on demand.
- **Input parameters:**
  - `query` (string, required) — Search term or tool name
  - `category` (string, optional) — Tool category filter (e.g., `mcp`, `builtin`)
- **Returns:** Matching tool schemas ready to use.
- **Notes:** Feature-flag gated. Only active when `ENABLE_TOOL_SEARCH=1`. Reduces initial context usage by deferring MCP tool loading; schemas are loaded as needed.

### `BriefTool`
- **Invoked as:** `BriefTool`
- **Source directory:** `claude-code-main/tools/BriefTool/`
- **Class:** Session
- **Side effect:** None
- **Gating:** Feature-flag `CLAUDE_CODE_BRIEF`
- **Documented in public docs?:** Not explicitly in tools-reference; inferred from ENV.md gating.
- **Description:** Brief mode control tool. Enables compact, concise output. Requires entitlement or Claude.ai auth. Gated on `CLAUDE_CODE_BRIEF` env flag.
- **Input parameters:**
  - `enable` (boolean, required) — True to enable brief mode
- **Returns:** Confirmation of brief mode status.
- **Notes:** Feature-flag gated. Compact output mode for faster, shorter responses. Requires special entitlement or Claude.ai authentication.

### `SleepTool`
- **Invoked as:** `SleepTool`
- **Source directory:** `claude-code-main/tools/SleepTool/`
- **Class:** Meta
- **Side effect:** None
- **Gating:** Internal/test-only
- **Documented in public docs?:** No
- **Description:** Sleep for a specified duration. Used primarily in testing and internal workflows.
- **Input parameters:**
  - `duration_ms` (number, required) — Number of milliseconds to sleep
- **Returns:** Confirmation after sleep completes.
- **Notes:** Internal/test tool. Not exposed in production documentation. Used for timing control in automated workflows.

---

## Remote & entrypoint-specific tools

### `RemoteTrigger`
- **Invoked as:** `RemoteTrigger`
- **Source directory:** `claude-code-main/tools/RemoteTriggerTool/`
- **Class:** Remote
- **Side effect:** Executes
- **Gating:** Remote-entrypoint only (`CLAUDE_CODE_REMOTE=1` or `CLAUDE_CODE_ENTRYPOINT=remote`)
- **Documented in public docs?:** Mentioned in docs context around remote sessions and scheduling; not a standalone tool entry.
- **Description:** Trigger a remote session or API call. Used in remote/headless mode and scheduled agents to invoke work on distant infrastructure. Parameter list not surfaced in public docs; source not inspected.
- **Input parameters:** Parameter list not available — not in public docs; source not inspected.
- **Returns:** Response from remote invocation.
- **Notes:** Remote-entrypoint only. For triggering scheduled remote agents and cloud-based Claude Code instances. Internal tool, not user-facing.

---

## Tools present in source but not in public docs

Four tool directories exist in `claude-code-main/tools/` but are NOT listed on the public tools-reference page. Purpose is inferred from directory name and surrounding context — source files were not inspected for this document, so behavior is unverified.

### `MCPTool`
- **Source directory:** `claude-code-main/tools/MCPTool/`
- **Status inference:** Internal — base MCP client primitive
- **Inferred purpose:** Name suggests a generic MCP-tool dispatch primitive that underlies the `mcp__<server>__<tool>` invocation pattern. Likely not user-facing on its own; the user-facing surface is the individual MCP-server tools registered through it. Unverified without source inspection.

### `McpAuthTool`
- **Source directory:** `claude-code-main/tools/McpAuthTool/`
- **Status inference:** Internal — MCP OAuth / authentication flow
- **Inferred purpose:** Name suggests the primitive that completes OAuth or token exchange for MCP servers that require it (cross-reference `MCP_CLIENT_SECRET`, `MCP_OAUTH_CALLBACK_PORT`, `MCP_OAUTH_CLIENT_METADATA_URL` in ENV.md). Likely surfaces to users as the `mcp__<server>__authenticate` and `mcp__<server>__complete_authentication` tool pattern. Unverified without source inspection.

### `REPLTool`
- **Source directory:** `claude-code-main/tools/REPLTool/`
- **Status inference:** Experimental or entrypoint-gated
- **Inferred purpose:** Name suggests an interactive REPL primitive — possibly for running expressions in a stateful session context (JavaScript, Python, etc.). Not listed on the public tools-reference page. Unverified without source inspection.

### `SyntheticOutputTool`
- **Source directory:** `claude-code-main/tools/SyntheticOutputTool/`
- **Status inference:** Test-only
- **Inferred purpose:** Name strongly suggests a test-harness primitive that produces pre-canned tool outputs for unit/integration tests. Almost certainly not user-facing in normal sessions. Unverified without source inspection.

### Directory-to-invocation-name map (for reference)

Most tool directories map directly to the invocation names used above. Where the names differ:

| Source directory | Invocation name |
|------------------|-----------------|
| `FileReadTool/` | `Read` |
| `FileWriteTool/` | `Write` |
| `FileEditTool/` | `Edit` |
| `NotebookEditTool/` | `NotebookEdit` |
| `ScheduleCronTool/` | `CronCreate`, `CronDelete`, `CronList` (three tools share one directory) |
| `BriefTool/` | `BriefTool` (name used directly; not renamed) |
| `SleepTool/` | `SleepTool` (name used directly; not renamed) |
| `LSPTool/` | `LSP` |

All other tool directories drop the `Tool` suffix for their invocation name (e.g., `BashTool/` → `Bash`, `AgentTool/` → `Agent`, `TaskCreateTool/` → `TaskCreate`).

**Note on `Monitor`:** The `Monitor` tool is documented above in Shell & code execution, but **no `MonitorTool/` directory was found in this source snapshot**. The tool may be newer than the snapshot, registered elsewhere in the source tree, or renamed. Treat the source-directory inference for `Monitor` as unverified.

---

## Feature-flag-gated tools summary

The following tools are gated by environment variables or feature flags and are only available when the flag is set:

| Tool | Env flag | ENV.md reference | Public docs status |
|------|----------|------------------|-------------------|
| `CLAUDE_CODE_ENABLE_TASKS` | TaskCreate, TaskGet, TaskList, TaskUpdate, TaskStop, TaskOutput | Line 155 | Yes — documented as conditional |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | TeamCreate, TeamDelete, SendMessage | Line 298 | Yes — documented as experimental |
| `ENABLE_TOOL_SEARCH` | ToolSearch | Line 167 | Yes — documented under MCP tool search |
| `CLAUDE_CODE_BRIEF` | BriefTool | Line 597 | Not in tools-reference; inferred internal |

For task tools: `CLAUDE_CODE_ENABLE_TASKS` gates the entire task persistence system. Without it, TodoWrite is available but task commands may not be.

For agent teams: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` enables TeamCreate, TeamDelete, and SendMessage. Disabled by default.

For tool search: `ENABLE_TOOL_SEARCH=1` enables deferred tool loading and the ToolSearch tool itself. Reduces initial system prompt size for MCP-heavy setups.

---

## Discrepancies & notes

1. **Invocation name vs. directory name mismatch**: `FileReadTool` directory → invoked as `Read`. `FileWriteTool` directory → invoked as `Write`. `FileEditTool` directory → invoked as `Edit`. This is standard; tool invocation names differ from source directory names.

2. **Tools in source but not in public docs**: `BriefTool`, `ConfigTool`, `RemoteTriggerTool`, `SleepTool` exist in source but are not listed as standalone entries in the public tools-reference. ConfigTool is implied (settings management) and BriefTool/RemoteTriggerTool are feature-gated or internal. SleepTool is test-only.

3. **`Cron*` tool family naming**: Public docs refer to `CronCreate`, `CronDelete`, `CronList` in the tools table, but they are part of the `ScheduleCronTool` directory. Invocation names match the tool table (not the directory).

4. **Task tools availability**: `CLAUDE_CODE_ENABLE_TASKS` gates TaskCreate/TaskGet/TaskList/TaskUpdate/TaskStop/TaskOutput. Without the flag, task tools may not be available or may be limited to non-persistent modes (TodoWrite for SDK/non-interactive).

5. **Agent teams experimental status**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is required for TeamCreate, TeamDelete, and SendMessage. Marked as experimental in public docs with known limitations around session resumption and task coordination.

6. **LSP tool activation**: LSP is listed as always available, but is inactive until a language-server plugin is installed for your language. Auto-reports type errors after edits once a plugin is active.

7. **Monitor tool availability**: Not available on Amazon Bedrock, Google Vertex AI, or Microsoft Foundry. Also unavailable when `DISABLE_TELEMETRY` or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` is set.

8. **PowerShell tool opt-in**: Requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`. Opt-in on non-Windows; rolling out progressively on Windows.

9. **Skill tool permission**: Listed as permission-required in the public tools table; frontmatter can control invocation via `user-invocable` and `disable-model-invocation` flags.

10. **WebFetch vs. WebSearch**: WebFetch fetches and processes a single URL; WebSearch performs a web search and returns result links. Both are permission-required. WebSearch is US-only.

---

## MCP tools — dynamic registration

MCP (Model Context Protocol) servers register tools dynamically at runtime. These are not listed in the built-in tools table because they depend on which servers are connected:

- **Dynamic naming**: MCP tools are named `mcp__<server-name>__<tool-name>` (e.g., `mcp__slack__post_message`).
- **Server configuration**: Servers are defined in `.mcp.json` (project-level) or `settings.json` (global), under the `mcpServers` key.
- **Gating**: Allowed/denied servers are controlled via `allowedMcpServers` and `deniedMcpServers` in permission settings.
- **Tool search integration**: When `ENABLE_TOOL_SEARCH=1`, ToolSearch can query for and load MCP tool schemas on demand, avoiding large system prompts with many servers.
- **Not enumerable statically**: Unlike built-in tools, which are compiled into the binary, MCP tools are discovered at startup by connecting to each server. The exact tool set depends on configuration.

For MCP server configuration details, see Settings/mcp-servers.md.

---

## Permissions & tool access control

All mutating tools (Write, Edit, Bash, PowerShell, Monitor, Skill, ExitPlanMode) require permission checks. Permission rules are defined in `settings.json` under the `permissions` key, or configured interactively via `/permissions`:

- **Rule types**: `allow`, `ask`, `deny`
- **Scopes**: Global (all tool use), tool-specific (e.g., `Bash: allow`), or pattern-based (e.g., `Read: allow ~/.claude/**`)
- **Per-tool examples**:
  - `Bash: ask` — prompt user before running shell commands
  - `Write: allow` — auto-approve file writes
  - `Edit: deny` — block all edits (use Write instead)
- **Subagent permission inheritance**: Subagents inherit the main session's permission mode at spawn; you can change individual subagent modes afterward but not at spawn time.

See [Permissions](/en/permissions) on code.claude.com for complete rules syntax and examples.

---

## Related references

- **Settings**: Global and project-level configuration via `settings.json` and `/config`.
- **Skills**: Reusable prompt-based workflows via the Skill tool or `/skill-name`.
- **Subagents**: Custom agents defined in `.claude/agents/` with specialized tools and prompts.
- **Agent teams**: Multiple parallel agents coordinating via shared task list (experimental, flag-gated).
- **MCP servers**: Add custom tools by connecting external servers via `.mcp.json`.
- **Hooks**: Run commands or prompts before/after tool execution (via `hooks` in settings or skill frontmatter).
- **Permissions**: Control which tools require approval and under what conditions.
