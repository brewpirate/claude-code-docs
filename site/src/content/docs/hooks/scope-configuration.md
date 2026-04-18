---
title: "Scope & Configuration"
---

# Scope & configuration


Hooks resolve across three configuration scopes, with scope-precedence determining which takes effect:

- **Settings.json (`hooks` key):** Defined in `~/.claude/settings.json` (user-global) or `.claude/settings.json` (project). See [Settings/hooks-automation.md](/claude-code-docs/settings/hooks-automation/) for storage shape and settings-level controls (`allowedHttpHookUrls`, `httpHookAllowedEnvVars`, `disableAllHooks`, `disableSkillShellExecution`).

- **Skill/Agent frontmatter (`hooks:` field):** Scoped to a skill or subagent. Only active while the skill is invoked or agent is running. See [Skills/FRONTMATTER.md](/claude-code-docs/skills/overview/) for frontmatter spec.

- **Plugin hooks:** Plugins can register hooks via `<plugin>/hooks/hooks.json`. Loaded when plugin is enabled.

**Precedence:** Session frontmatter (temporary, highest) > Skill/Agent frontmatter > Settings.json (lowest). A hook is deduplicated by (event, matcher, hook-content); duplicates across sources run once per handler type.

**Managed settings:** Enterprise can set `disableAllHooks` (blocks user/project hooks) or `allowManagedHooksOnly` (shows only admin-defined hooks). See [Settings/hooks-automation.md](/claude-code-docs/settings/hooks-automation/).

---

[← Back to Hooks/README.md](/claude-code-docs/hooks/overview/)
