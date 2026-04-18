---
title: "Matcher Semantics"
tags: [hooks, settings]
---

# Matcher semantics


**Matcher support varies by event.** Events fall into categories with consistent matcher behavior:

- **Tool use events** (`PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `PermissionDenied`): Matcher is a tool name or regex pattern. Examples: `"Bash"`, `"Read|Write"`, `"mcp__memory__.*"`. Supports `|` for alternatives (parsed as regex).

- **Subagent events** (`SubagentStart`, `SubagentStop`, `TeammateIdle`): Matcher is agent type name (from agent frontmatter). Example: `"Explore"`, `"custom-research"`.

- **File events** (`FileChanged`): Matcher is a file glob pattern (not regex). Examples: `"*.json"`, `".env*"`, `".claude/hooks/**"`.

- **Config events** (`ConfigChange`): Matcher is config key name or regex. Examples: `"hooks"`, `"permissions"`, `"hooks|allowedHttpHookUrls"`.

- **Events without matcher support** (`SessionStart`, `SessionEnd`, `UserPromptSubmit`, `Stop`, `CwdChanged`, `ConfigChange` without key, `PreCompact`, `PostCompact`, `Notification`, `TaskCreated`, `TaskCompleted`, `Elicitation`, `ElicitationResult`): No matcher field. Hook fires for all occurrences of the event.

**Matcher syntax:**
- Empty `matcher: ""` or omitted: match all
- Alphanumeric + underscore + pipe (`|`): treated as literal string or list (e.g., `"Bash"`, `"Read|Write"`)
- Other characters (`.`, `*`, `^`, etc.): treated as JavaScript regex (e.g., `"mcp__.*"`, `"^test_"`)

---

[← Back to Hooks/README.md](/claude-code-docs/hooks/overview/)
