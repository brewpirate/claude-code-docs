---
title: "Hook Integration"
tags: [agent-sdk]
---


SDK can provide hooks programmatically via `options.hooks` or inherit from `settings.json` when `settingSources` includes `'project'`.

### Available hook events (26 total)
`PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `Notification`, `UserPromptSubmit`, `SessionStart`, `SessionEnd`, `Stop`, `StopFailure`, `SubagentStart`, `SubagentStop`, `PreCompact`, `PostCompact`, `PermissionRequest`, `PermissionDenied`, `Setup`, `TeammateIdle`, `TaskCreated`, `TaskCompleted`, `Elicitation`, `ElicitationResult`, `ConfigChange`, `WorktreeCreate`, `WorktreeRemove`, `InstructionsLoaded`, `CwdChanged`, `FileChanged`.

### Hook input/output
Each hook callback receives `(input, toolUseID, context)` and returns an output object controlling permission decision, input modification, or additional context injection. See [Hooks/README.md](/claude-code-docs/hooks/overview/) for full payload schemas.

### Matchers
Pattern (regex) to filter which hooks fire. For tool events, matches tool name. For file events, matches file glob. For notification events, matches notification type.

---

[← Back to Agent SDK/README.md](/claude-code-docs/agent-sdk/overview/)
