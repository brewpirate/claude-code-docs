---
title: "Auto-mode classifiers"
tags: [permissions, settings]
---


Auto-mode does not rely on static rules alone. When `auto` mode is active, internal classifiers make heuristic allow/deny decisions based on:

- **`bashClassifier`** (source file exists; behavior unverified without inspection): Likely analyzes Bash command text to categorize as safe/risky (e.g., `ls` is safe, `rm -rf /` is risky).
- **`yoloClassifier`** (source file exists; behavior unverified): A more permissive classifier used when bypass or YOLO-like modes are active.
- **Decision context**: Classifiers receive the user's request text, the proposed command/action, and environmental trust rules (`autoMode.environment`), and output an allow/deny decision.

These classifiers are internal implementation details, not user-configurable via the rule grammar. To influence auto-mode decisions, use the `autoMode` object in settings (`environment`, `allow`, `soft_deny`—see [Settings/permissions-security.md](/claude-code-docs/settings/permissions-security/)).

---

[← Back to Permissions/README.md](/claude-code-docs/permissions/overview/)
