# How permissions are evaluated

## Evaluation flowchart

Every tool request passes through these checks in order. The first matching condition terminates evaluation:

1. **Hard dangerous pattern?** (e.g. `rm -rf /`, `curl | sh`) → **Hard blocked.** Cannot be overridden by any rule.

2. **PreToolUse hook returns block?** → **Blocked by hook.** Downstream handlers for this event are skipped.

3. **Scope resolution** — Rules are evaluated in precedence order: managed settings → local project settings → project settings → user settings. Within each scope, **deny rules are evaluated before allow rules.**

4. **Deny rule matches?** → **Denied.**

5. **Allow rule matches?** → **Allowed** — tool runs silently.

6. **Default mode fallback** (no rule matched):

   | Mode | Outcome |
   |------|---------|
   | `auto` | Classifier decides: safe → allow; risky → ask |
   | `acceptEdits` (file edit tool) | Allowed |
   | `dontAsk` or `bypassPermissions` | Allowed |
   | `default` or `plan` | Ask user |

- When Claude requests a tool invocation, the harness matches applicable permission rules against the tool name and optional pattern (e.g., command text, file path, domain).
- Rules are evaluated in precedence order: **deny rules first** → ask rules → allow rules → default mode fallback.
- The **first matching rule wins**. A tool blocked by deny is never allowed by an allow rule at the same scope level.
- **Scope precedence**: managed settings > local project settings > project settings > user settings. Managed rules override all others.
- `PreToolUse` hooks fire *before* permission evaluation and can block (exit 2) or defer decisions, but cannot override deny rules. See [Hooks and permissions](#hooks-and-permissions).
- **Auto-mode classifiers** (internal heuristics, not user-configurable) can auto-approve "safe" patterns even without explicit allow rules when `auto` mode is active. See [Auto-mode classifiers](#auto-mode-classifiers).
- **Dangerous patterns** like `rm -rf /`, `curl | sh`, and similar OS-level destructive patterns are blocked by a hard safety layer (`dangerousPatterns.ts`) regardless of allow rules—this layer runs after rule evaluation.
- **Shadowed rules** (a narrow rule covered by a broader one at the same source, e.g., `Bash(npm run test)` shadowed by `Bash(npm *)`) are detected and surfaced as warnings at startup. See [Discrepancies & notes](#discrepancies--notes).

---

[← Back to Permissions/README.md](./README.md)
