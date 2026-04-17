# Orchestration & agent tools


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

[← Back to Tools/README.md](./README.md)
