# Help & Miscellaneous


### `/claude-api`
- **Aliases:** none
- **Arguments:** none
- **Type:** [Skill]
- **Disabled by:** `CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL`
- **Gating:** Auto-activates with `anthropic` or `@anthropic-ai/sdk` imports
- **Description:** "**[Skill].** Load Claude API reference material for your project's language (Python, TypeScript, Java, Go, Ruby, C#, PHP, or cURL) and Managed Agents reference. Covers tool use, streaming, batches, structured outputs, and common pitfalls. Also activates automatically when your code imports `anthropic` or `@anthropic-ai/sdk`" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/claude-api`
- **Notes:** Auto-loads when you're working with Claude SDKs. Covers multiple languages.

### `/config`
- **Aliases:** `/settings`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Open the Settings interface to adjust theme, model, output style, and other preferences." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/config`
- **Notes:** Central hub for all session and global settings.

### `/feedback`
- **Aliases:** `/bug`
- **Arguments:** `[report]` (optional)
- **Type:** Built-in
- **Disabled by:** `DISABLE_FEEDBACK_COMMAND`, `DISABLE_BUG_COMMAND` (disabler for the alias)
- **Gating:** —
- **Description:** "Submit feedback about Claude Code." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/feedback` or `/bug`
- **Notes:** Opens a form to submit bug reports or feature requests.

### `/help`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Show help and available commands" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/help`
- **Notes:** Lists all available commands in the current session.

### `/less-permission-prompts`
- **Aliases:** none
- **Arguments:** none
- **Type:** [Skill]
- **Disabled by:** —
- **Gating:** —
- **Description:** "**[Skill].** Scan your transcripts for common read-only Bash and MCP tool calls, then add a prioritized allowlist to project `.claude/settings.json` to reduce permission prompts" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/less-permission-prompts`
- **Notes:** Analyzes your session history to pre-approve safe operations.

### `/powerup`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Discover Claude Code features through quick interactive lessons with animated demos" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/powerup`
- **Notes:** Interactive tutorial system for learning Claude Code features.

---

[← Back to Commands/README.md](./README.md)
