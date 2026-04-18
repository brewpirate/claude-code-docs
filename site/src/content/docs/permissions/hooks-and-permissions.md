---
title: "Hooks and permissions"
tags: [permissions, settings]
---

# Hooks and permissions


[PreToolUse hooks](/claude-code-docs/hooks/overview/) fire *before* permission rule evaluation. They can influence the decision but do not bypass the rule system:

- A `PreToolUse` hook that returns `{"decision": "approve"}` does **not** override deny rules. Deny rules are still evaluated independently.
- A `PreToolUse` hook returning `{"decision": "block"}` (exit code 2) stops the tool call before rules are checked, preventing even allow rules from triggering—a hard veto.
- If a hook does not decide, permission rules are evaluated normally (deny → ask → allow → mode fallback).
- A matching `ask` rule always prompts, even if a hook returns `"allow"`. Rules take precedence.
- **Use hooks for**: runtime validation (e.g., validate URLs before curl), logging, deferring to external systems, adding context—not for bypassing the rule system.

See [Hooks documentation](/claude-code-docs/hooks/overview/) for implementation details and examples.

---

[← Back to Permissions/README.md](/claude-code-docs/permissions/overview/)
