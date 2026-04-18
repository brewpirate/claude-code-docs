---
title: "How permissions are evaluated"
---

# How permissions are evaluated

## Evaluation flowchart

```mermaid
flowchart TD
    A[Claude requests a tool call] --> B{Hard dangerous\npattern match?\ne.g. rm -rf /}
    B -->|Yes| BLOCK1[Hard blocked\nno override possible]
    B -->|No| C{PreToolUse hook\nreturns block?}
    C -->|Yes| BLOCK2[Blocked by hook]
    C -->|No| D{Scope precedence:\nCheck managed rules first\nthen project, then user}
    D --> E{Deny rule\nmatches?}
    E -->|Yes| BLOCK3[Denied]
    E -->|No| F{Allow rule\nmatches?}
    F -->|Yes| ALLOW[Allowed — tool runs silently]
    F -->|No| G{Default mode?}
    G -->|auto| H{Auto-mode classifier\nsays safe?}
    H -->|Yes| ALLOW
    H -->|No| ASK[Ask user]
    G -->|acceptEdits\nand tool is file edit| ALLOW
    G -->|dontAsk or\nbypassPermissions| ALLOW
    G -->|default or plan| ASK
```

- When Claude requests a tool invocation, the harness matches applicable permission rules against the tool name and optional pattern (e.g., command text, file path, domain).
- Rules are evaluated in precedence order: **deny rules first** → ask rules → allow rules → default mode fallback.
- The **first matching rule wins**. A tool blocked by deny is never allowed by an allow rule at the same scope level.
- **Scope precedence**: managed settings > local project settings > project settings > user settings. Managed rules override all others.
- `PreToolUse` hooks fire *before* permission evaluation and can block (exit 2) or defer decisions, but cannot override deny rules. See [Hooks and permissions](/claude-code-docs/permissions/hooks-and-permissions/).
- **Auto-mode classifiers** (internal heuristics, not user-configurable) can auto-approve "safe" patterns even without explicit allow rules when `auto` mode is active. See [Auto-mode classifiers](/claude-code-docs/permissions/auto-mode-classifiers/).
- **Dangerous patterns** like `rm -rf /`, `curl | sh`, and similar OS-level destructive patterns are blocked by a hard safety layer (`dangerousPatterns.ts`) regardless of allow rules—this layer runs after rule evaluation.
- **Shadowed rules** (a narrow rule covered by a broader one at the same source, e.g., `Bash(npm run test)` shadowed by `Bash(npm *)`) are detected and surfaced as warnings at startup. See [Discrepancies & notes](/claude-code-docs/permissions/overview/).

---

[← Back to Permissions/README.md](/claude-code-docs/permissions/overview/)
