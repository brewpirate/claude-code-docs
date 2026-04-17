# Subagents


### `agents`
- **Type:** object
- **Default:** unspecified
- **Description:** Custom agent definitions mapping agent names to their configuration. Each agent can specify system prompts, tool restrictions, models, and other parameters.
- **Example:**
  ```json
  {
    "agents": {
      "code-reviewer": {
        "description": "Reviews code for quality"
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

[← Back to settings/README.md](./README.md)
