---
title: "Event Reference"
tags: [hooks, settings]
---


### Session Lifecycle

#### `SessionStart`
- **Fires when:** Session begins or resumes (cached/historical mode). One of two always-emitted hook events, even if `includeHookEvents` is not set.
- **Matcher:** Not supported. Fires for all sessions.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "SessionStart", agent_id?, agent_type? }`
- **Decisions accepted:** None. Output ignored.
- **Blockable:** No.
- **Scope:** settings.json, skill frontmatter, agent frontmatter, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts` (HOOK_EVENTS array).
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#session-lifecycle
- **Notes:** `Setup` is a synonym internal event, always emitted alongside `SessionStart`. Handler receives writable `$CLAUDE_ENV_FILE` path via env var; can write `export VAR=value` lines to inject variables into the session environment.

#### `InstructionsLoaded`
- **Fires when:** CLAUDE.md or project rules file loads (at startup and on reload via `/reload` or file watch).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "InstructionsLoaded", agent_id?, agent_type? }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#session-lifecycle
- **Notes:** Fires on every reload; use `once: true` to limit to first load.

#### `Notification`
- **Fires when:** Claude sends a notification (rare internal event; includes debug/status messages).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "Notification", agent_id?, agent_type?, message: string }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Partially — https://code.claude.com/docs/en/hooks#notifications
- **Notes:** HTTP hooks supported (webhook notifications).

#### `Stop`
- **Fires when:** Claude finishes responding (after all tools complete, before user sees response).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "Stop", agent_id?, agent_type? }`
- **Decisions accepted:** `"block"` (exit code 2). Blocks turn completion; Claude stays in thought.
- **Blockable:** Yes. Exit code 2 or JSON `decision: "block"` prevents the turn from ending.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#stop
- **Notes:** Can be scoped to subagent frontmatter; auto-converts to `SubagentStop` at runtime.

#### `StopFailure`
- **Fires when:** Turn ends due to API error (model call timeout, rate limit, etc.).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "StopFailure", agent_id?, agent_type?, error: string }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#stop-failure
- **Notes:** Informational; useful for alerting or logging.

#### `SessionEnd`
- **Fires when:** Session terminates (user quit, session expired, or programmatic close).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "SessionEnd", agent_id?, agent_type? }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#session-end
- **Notes:** Guaranteed to fire once per session. Can perform cleanup, archive transcripts, or finalize logs.

### User Input

#### `UserPromptSubmit`
- **Fires when:** Before Claude processes a user-typed prompt (not on tool results).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "UserPromptSubmit", agent_id?, agent_type?, user_input: string }`
- **Decisions accepted:** `"block"` (exit code 2). Prevents the prompt from being sent to the model.
- **Blockable:** Yes.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#user-prompt-submission
- **Notes:** Useful for input validation, PII filtering, or routing to external approval systems.

### Tool Use

#### `PreToolUse`
- **Fires when:** Before any tool executes (after permission approval, if applicable).
- **Matcher:** Yes — matches on tool name (e.g., `"Bash"`, `"Read|Write"`, `"mcp__memory__.*"`). Case-sensitive.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "PreToolUse", agent_id?, agent_type?, tool_name: string, tool_input: object }`
- **Decisions accepted:** `"approve"` (exit code 0), `"block"` (exit code 2), or JSON hook-specific output with `permissionDecision: "allow"|"deny"|"ask"|"defer"`. See handler section for details.
- **Blockable:** Yes — both hard-block (exit 2) and decision-based (allow/deny/ask).
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#pre-tool-use
- **Notes:** Fires AFTER permission rules are checked (if permission mode is not auto). Hook decision does NOT override deny rules (deny rules are independent); block (exit 2) is a hard veto. Can modify `tool_input` via hook-specific JSON output. `PermissionDecision` enum: "allow" (shortcut permission check), "deny" (block), "ask" (prompt user), "defer" (let rules decide).

#### `PermissionRequest`
- **Fires when:** Permission rule evaluation creates a dialog (user mode or rule match).
- **Matcher:** Yes — matches on tool name or permission rule string (e.g., `"Bash"`, `"Bash(git *)"`, `"Read(*.ts)"`).
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "PermissionRequest", agent_id?, agent_type?, tool_name: string, tool_input: object, permission_rule: string }`
- **Decisions accepted:** `"allow"` (exit code 0), `"deny"` (exit code 2), or JSON `{ hookSpecificOutput: { decision: { behavior: "allow"|"deny", ... }, message: string } }`.
- **Blockable:** Yes — exit code 2 or `behavior: "deny"` denies; `"allow"` auto-approves.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#permission-request
- **Notes:** Fires only if a rule match exists and permission mode requires approval. If no hook decides, the UI dialog appears (user can approve/deny).

#### `PermissionDenied`
- **Fires when:** Auto mode (non-interactive) auto-denies a tool based on rules (no user intervention).
- **Matcher:** Yes — matches on tool name or rule.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "PermissionDenied", agent_id?, agent_type?, tool_name: string, tool_input: object, permission_rule: string, reason: string }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#permission-denied
- **Notes:** Informational; useful for logging or escalation. Decision-based hooks are ignored.

#### `PostToolUse`
- **Fires when:** Tool execution succeeds and returns output.
- **Matcher:** Yes — tool name.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "PostToolUse", agent_id?, agent_type?, tool_name: string, tool_input: object, tool_output: string }`
- **Decisions accepted:** `"block"` (exit code 2) to replace or suppress output. JSON `{ decision: "block", hookSpecificOutput: { updatedMCPToolOutput: "replacement" } }` replaces output.
- **Blockable:** Yes.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#post-tool-use
- **Notes:** Common use: linting, validation, or masking sensitive output. Can modify tool_output before Claude sees it.

#### `PostToolUseFailure`
- **Fires when:** Tool execution fails (non-zero exit code or error).
- **Matcher:** Yes — tool name.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "PostToolUseFailure", agent_id?, agent_type?, tool_name: string, tool_input: object, tool_output: string, error: string }`
- **Decisions accepted:** None (hook output ignored). Exit code 2 logged but does not block.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#post-tool-use-failure
- **Notes:** Informational; useful for error aggregation or retry logic hints.

### Sub-agents & Team

#### `SubagentStart`
- **Fires when:** Sub-agent or fork is spawned (either inline skill with `context: fork` or `.claude/agents/` agent).
- **Matcher:** Yes — agent type (name from agent frontmatter, e.g., `"Explore"`, `"custom-research"`).
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "SubagentStart", agent_id: string, agent_type: string }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#subagent-lifecycle
- **Notes:** `agent_id` is the subagent's unique ID; `agent_type` is its type name.

#### `SubagentStop`
- **Fires when:** Sub-agent completes and returns control to parent. Also fires in skills/agents with `stop:` hook in frontmatter (auto-converts from `Stop`).
- **Matcher:** Yes — agent type.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "SubagentStop", agent_id: string, agent_type: string }`
- **Decisions accepted:** `"block"` (exit code 2). Blocks subagent completion; parent can decide what to do next.
- **Blockable:** Yes.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#subagent-lifecycle
- **Notes:** Skill/agent frontmatter can declare `stop:` hook; automatically converted to `SubagentStop` matcher on the agent type at runtime (see `/home/vx-daniel/zen-claude/docs/Skills/FRONTMATTER.md`).

#### `TeammateIdle`
- **Fires when:** Agent team teammate (co-worker agent) goes idle or pauses (internal to agent teams).
- **Matcher:** Yes — agent type.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "TeammateIdle", agent_id: string, agent_type: string }`
- **Decisions accepted:** `"block"` (exit code 2) to interrupt idle state.
- **Blockable:** Yes.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Minimally — agent teams are a newer feature; see https://code.claude.com/docs/en/agent-teams
- **Notes:** Specific to multi-agent teams; less common in single-session usage.

### Tasks

#### `TaskCreated`
- **Fires when:** Task created via `TaskCreate` tool (Claude initiates a background task).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "TaskCreated", agent_id?, agent_type?, task_id: string, task_description: string }`
- **Decisions accepted:** `"block"` (exit code 2) to prevent task creation.
- **Blockable:** Yes.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Minimally — https://code.claude.com/docs/en/hooks (tasks subsection)
- **Notes:** Part of task/workflow automation. Rare in direct sessions.

#### `TaskCompleted`
- **Fires when:** Task marked complete (task engine transitions state).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "TaskCompleted", agent_id?, agent_type?, task_id: string }`
- **Decisions accepted:** `"block"` (exit code 2) to prevent completion.
- **Blockable:** Yes.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** No.
- **Notes:** Informational/control hook for task lifecycle management.

### Environment & Files

#### `ConfigChange`
- **Fires when:** Settings file (settings.json, CLAUDE.md, or other config) changes on disk (watched via file watcher).
- **Matcher:** Yes — config key (e.g., `"hooks"`, `"permissions"`, `"allowedHttpHookUrls"`).
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "ConfigChange", agent_id?, agent_type?, config_key: string, old_value: any, new_value: any }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#config-changes
- **Notes:** Matcher pattern is the config key; e.g., `matcher: "hooks|allowedHttpHookUrls"` catches changes to either key.

#### `CwdChanged`
- **Fires when:** Working directory changes (via `cd` tool or `SetCwd` in multi-project setups).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd: string, permission_mode, hook_event_name: "CwdChanged", agent_id?, agent_type?, old_cwd: string }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#cwd-changed
- **Notes:** Handler receives writable `$CLAUDE_ENV_FILE`; useful for loading per-directory toolchain config (.nvm, .direnv, etc.).

#### `FileChanged`
- **Fires when:** File on disk changes (watched via file watcher; includes file edits, creates, deletes).
- **Matcher:** Yes — file glob pattern (e.g., `"*.json"`, `".env*"`, `".claude/**"`).
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "FileChanged", agent_id?, agent_type?, file_path: string, change_type: "created"|"modified"|"deleted" }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#file-changes
- **Notes:** Matcher uses glob syntax (not regex). Handler can inject env vars via `$CLAUDE_ENV_FILE` (e.g., reload secrets on .env change).

#### `WorktreeCreate`
- **Fires when:** Git worktree is created (via `git worktree add`).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd: string, permission_mode, hook_event_name: "WorktreeCreate", agent_id?, agent_type?, worktree_path: string, branch: string }`
- **Decisions accepted:** `"block"` (exit code 2) to prevent worktree creation.
- **Blockable:** Yes.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#worktree-lifecycle
- **Notes:** Useful for enforcing worktree naming conventions or initializing worktree-specific config.

#### `WorktreeRemove`
- **Fires when:** Git worktree is deleted (via `git worktree remove`).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd: string, permission_mode, hook_event_name: "WorktreeRemove", agent_id?, agent_type?, worktree_path: string }`
- **Decisions accepted:** `"block"` (exit code 2) to prevent worktree removal.
- **Blockable:** Yes.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#worktree-lifecycle
- **Notes:** Cleanup hook: can archive worktree-specific logs or state before deletion.

### Context Management

#### `PreCompact`
- **Fires when:** Before context compaction (when message buffer exceeds context window).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "PreCompact", agent_id?, agent_type?, estimated_tokens: number }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#compaction
- **Notes:** Informational. Can log token counts or trigger external state preservation.

#### `PostCompact`
- **Fires when:** After context compaction completes (conversation summarized, context freed).
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "PostCompact", agent_id?, agent_type?, tokens_freed: number }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/hooks#compaction
- **Notes:** Useful for logging compaction metrics or marking session checkpoints.

### MCP & Elicitation

#### `Elicitation`
- **Fires when:** MCP server (e.g., memory server) requests user input via elicitation protocol.
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "Elicitation", agent_id?, agent_type?, server_name: string, prompt: string }`
- **Decisions accepted:** None (output from hook provides context to user).
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** Minimally — https://code.claude.com/docs/en/hooks (MCP subsection)
- **Notes:** Rare; specific to MCP servers that support interactive prompts (e.g., memory server asking for context clarification).

#### `ElicitationResult`
- **Fires when:** User responds to MCP elicitation request.
- **Matcher:** Not supported.
- **Payload:** `{ session_id, transcript_path, cwd, permission_mode, hook_event_name: "ElicitationResult", agent_id?, agent_type?, server_name: string, result: string }`
- **Decisions accepted:** None.
- **Blockable:** No.
- **Scope:** settings.json, skill, agent, plugin.
- **Source:** `claude-code-main/entrypoints/sdk/coreTypes.ts`.
- **Documented in public docs?:** No.
- **Notes:** Logging/audit hook; can record user responses for analysis.

---

[← Back to Hooks/README.md](/claude-code-docs/hooks/overview/)
