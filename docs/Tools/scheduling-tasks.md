# Scheduling & tasks


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

[← Back to Tools/README.md](./README.md)
