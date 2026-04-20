---
title: "Subagents"
tags: [settings]
---


### `agents`
- **Type:** object
- **Default:** unspecified
- **Description:** Custom agent definitions mapping agent names to their configuration. Each key is the agent name (kebab-case); each value is an agent config object. The config uses the same field names as AGENT.md frontmatter, plus a `prompt` field for the system instructions (equivalent to the frontmatter file body). Settings-defined agents are available alongside `.claude/agents/` directory agents.
- **Agent config fields:** (equivalent to subagent frontmatter — see [agents/overview](/claude-code-docs/agents/overview/#subagent-specific-frontmatter-fields) for the canonical table)

  | Field | Type | Description |
  |-------|------|-------------|
  | `prompt` | string | System instructions for the agent (equivalent to the markdown body of an `.md` agent file) |
  | `description` | string | Short description shown in `/agents` UI; used by Claude's automatic-delegation logic |
  | `tools` | string (comma-sep) or list | Allowlist of tools. Omit to inherit all tools. Supports `Agent(agent_type)` syntax for subagent restriction |
  | `disallowedTools` | string (comma-sep) or list | Tools to deny. Applied first, then `tools` resolves against what's left |
  | `model` | string | `sonnet`, `opus`, `haiku`, a full model ID, or `inherit`. Defaults to `inherit` |
  | `permissionMode` | string | `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, or `plan` |
  | `maxTurns` | integer | Max agentic turns before the subagent stops |
  | `skills` | list | Skills loaded into the subagent's context at startup |
  | `mcpServers` | list | MCP servers available to this subagent (name references or inline definitions) |
  | `hooks` | object | Lifecycle hooks scoped to this subagent |
  | `memory` | string | Persistent memory scope: `user`, `project`, or `local`. Omit for no persistent memory |
  | `background` | boolean | If `true`, always run as a background task |
  | `effort` | string | Effort level: `low`, `medium`, `high`, `xhigh`, `max` (available values depend on the model) |
  | `isolation` | string | Set to `worktree` to run in a temporary git worktree |
  | `color` | string | Display color: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, or `cyan` |
  | `initialPrompt` | string | Auto-submitted as the first user turn when this agent runs as the main session agent (via `--agent` or the `agent` setting) |

- **Example:**
  ```json
  {
    "agents": {
      "code-reviewer": {
        "description": "Reviews code for quality and security",
        "prompt": "You are a code reviewer. Analyze changes for logic errors, security vulnerabilities, and style consistency.",
        "tools": "Read,Glob,Grep",
        "permissionMode": "default",
        "maxTurns": 10
      }
    }
  }
  ```

### `agent`
- **Type:** string
- **Default:** unspecified
- **Description:** Run the main thread as a named subagent. Applies that subagent's system prompt, tool restrictions, and model. The named agent must be defined in the `agents` configuration.
- **Example:**
  ```json
  {
    "agent": "code-reviewer"
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
