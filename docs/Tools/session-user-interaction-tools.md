# Session & user interaction tools


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

[← Back to Tools/README.md](./README.md)
