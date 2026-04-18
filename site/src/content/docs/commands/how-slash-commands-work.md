---
title: "How slash commands work"
tags: [cli]
---

# How slash commands work


- **Dispatch timing**: Commands are processed by the CLI before your prompt is sent to the model, allowing them to modify session state, display information, or trigger actions without consuming context.
- **Aliases**: Many commands have shorter aliases (e.g., `/quit` → `/exit`, `/new` → `/clear`, `/rc` → `/remote-control`). Both forms work identically.
- **Environment variable disablers**: Some commands can be disabled via `DISABLE_*_COMMAND` env vars (e.g., `DISABLE_DOCTOR_COMMAND=1` hides `/doctor`). Check each command's entry for its disabler.
- **Provider gating**: Commands like `/setup-bedrock` and `/setup-vertex` require the corresponding provider env var set (`CLAUDE_CODE_USE_BEDROCK=1`, `CLAUDE_CODE_USE_VERTEX=1`) to appear.
- **Plan and tier restrictions**: Some commands are Pro/Max only (`/privacy-settings`, `/passes`, `/upgrade`). Others are free tier only. Subscription status is checked at runtime.
- **Experimental feature flags**: Commands like `/team-onboarding`, `/tasks` (with full persistence), and Agent Teams require `CLAUDE_CODE_*` feature flags or internal Statsig flags to activate.
- **[Skill] commands**: These are bundled prompt-based skills (e.g., `/batch`, `/loop`, `/debug`, `/simplify`, `/claude-api`, `/less-permission-prompts`) that behave like slash commands but are implemented in markdown, not in the CLI binary. They can be disabled, customized, or extended like any skill.

---

[← Back to Commands/README.md](/claude-code-docs/cli/overview/)
