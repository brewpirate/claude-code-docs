---
title: "Discrepancies and Gaps"
---

# Discrepancies and Gaps

:::tip[For most users]
Most of these issues won't affect your day-to-day use. Items 1 and 2 matter if you're an operator disabling commands. Item 9 matters if you're wondering why `/team-onboarding` isn't in your session. **Item 10 is the most important to read before enabling `CLAUDE_CODE_ENABLE_TASKS`** — the flag enables behavior significantly different from what the basic `/tasks` description implies.
:::

The following issues were identified during documentation research. These may affect operators and users relying on the commands reference:

1. **`DISABLE_EXTRA_USAGE_COMMAND` vs `/extra-usage` and `/usage`**: The env var name says "extra-usage" but ENV.md documents it as "Disable the /usage command." The commands table lists both `/usage` (show plan limits) and `/extra-usage` (configure extra usage when rate-limited) as distinct commands. It is ambiguous whether the env var disables `/usage`, `/extra-usage`, or both.

2. **`DISABLE_BUG_COMMAND` and `DISABLE_FEEDBACK_COMMAND` coexist**: `/feedback` is the primary command; `/bug` is its alias. Two separate disable env vars exist for what is documented as one command with an alias. Operators who only set `DISABLE_BUG_COMMAND` may not realize `/feedback` still works.

3. **`/install-github-app` originally cited as undocumented — actually documented**: The task brief listed this as an example of "exists per env var but undocumented publicly." As of the current docs, it appears explicitly in the official commands table. This may indicate a change between ENV.md's creation and the present documentation state.

4. **`CLAUDE_CODE_ENABLE_CFC` has no associated slash command in any public source**: The env var exists in ENV.md but no slash command, feature page, or community post can be found to explain what interface it exposes. This is the one enable flag with no citable command surface.

5. **`/vim` was removed in v2.1.92**: The commands table includes a tombstone entry: "Removed in v2.1.92. To toggle between Vim and Normal editing modes, use `/config` → Editor mode." This was a formerly documented slash command now replaced by a settings panel sub-option.

6. **`/pr-comments` was removed in v2.1.91**: "Removed in v2.1.91. Ask Claude directly to view pull request comments instead." Similar tombstone pattern. Two removed commands total.

7. **`/output-style` does not exist as a slash command**: The output-styles docs page describes output style selection as happening through `/config` → Output style, not through a dedicated `/output-style` slash command. No such command exists.

8. **`/release-notes` docs page 404s but the command exists**: `https://code.claude.com/docs/en/release-notes` returns 404, yet `/release-notes` is a fully documented slash command in the commands table. There is no dedicated docs sub-page for this command.

9. **`/team-onboarding` is in the public commands table but requires two gatekeepers**: The command appears in the public docs yet requires both `CLAUDE_CODE_TEAM_ONBOARDING` env var AND the internal `tengu_flint_harbor` Statsig feature flag. This dual-gate pattern means the public listing can create confusion — users may see the command in docs but not in their session.

10. **`/tasks` full system vs basic listing**: The docs list `/tasks` as "List and manage background tasks" (public). The `CLAUDE_CODE_ENABLE_TASKS` flag enables a deeper persistent task system with cross-session coordination via `CLAUDE_CODE_TASK_LIST_ID`. The docs do not explain this distinction; a user who enables the flag will find behavior meaningfully different from what the one-line command description implies.

---

[← Back to Commands/README.md](/claude-code-docs/cli/overview/)
