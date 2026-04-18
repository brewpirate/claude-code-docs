---
title: "Subagents"
---

# Subagents


### `agents`
- **Type:** object
- **Default:** unspecified
- **Description:** Custom agent definitions mapping agent names to their configuration. Each key is the agent name (kebab-case); each value is an agent config object. The config uses the same field names as AGENT.md frontmatter, plus a `prompt` field for the system instructions (equivalent to the frontmatter file body). Settings-defined agents are available alongside `.claude/agents/` directory agents.
- **Agent config fields:**

  | Field | Type | Description |
  |-------|------|-------------|
  | `prompt` | string | System instructions for the agent (equivalent to AGENT.md body) |
  | `description` | string | Short description shown in `/agents` UI |
  | `tools` | string (comma-sep) | Whitelist of tools this agent can use |
  | `disallowedTools` | string (comma-sep) | Tools explicitly denied to this agent |
  | `model` | string | Model override (alias or full ID) |
  | `permissionMode` | string | Permission mode: `default`, `auto`, `bypassPermissions`, etc. |
  | `maxTurns` | integer | Max conversation turns before the agent stops |
  | `mcpServers` | list | MCP servers available to this agent |
  | `memory` | string | Memory scope: `none`, `project`, `user`, or `team` |
  | `background` | boolean | If `true`, agent runs asynchronously |
  | `isolation` | string | Isolation level: `none`, `worktree`, or `container` |
  | `color` | string | UI color for this agent's output |

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
