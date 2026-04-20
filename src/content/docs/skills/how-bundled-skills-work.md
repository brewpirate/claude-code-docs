---
title: "How Bundled Skills Work"
tags: [skills, cli]
---

## Skill invocation flow

1. **User types `/skill-name`** or Claude's model decides to invoke a skill

2. **Invocability check:**
   - `user-invocable: false` and invoked by user → skill not available in slash menu
   - `disable-model-invocation: true` and invoked by model → model cannot invoke; only user can
   - Otherwise → continue

3. **Feature gate check:** If the skill's `isEnabled()` returns `false` (e.g. Anthropic-staff-only skills) → hidden from UI, not invokable

4. **Skill prompt loaded** from binary (bundled skills) or disk (custom skills)

5. **Reference files check:**
   - If the skill has a `files` map → extract files to a temp cache directory; prefix the prompt with `Base directory: <dir>` so Claude can Read/Grep them
   - If no reference files → skip extraction

6. **Skill prompt injected into Claude's context**

7. **Claude executes** using the tools available in this session

- **Registered at startup**: Each bundled skill definition calls `registerBundledSkill({ name, description, ... })` once when the CLI initializes. The definition compiles into the binary—not markdown files on disk.
- **Prompt builder pattern**: Unlike built-in commands that execute fixed logic, bundled skills use a `getPromptForCommand()` function that returns the skill's instructions as a dynamic prompt. Claude then orchestrates the work using tools.
- **Gating via `isEnabled()`**: The optional `isEnabled` function controls whether a skill appears in the UI and is available to the model. Common checks: `USER_TYPE === 'ant'` (Anthropic staff only), feature flags, remote-mode availability, or permission policies.
- **Reference files extracted to disk**: Some bundled skills include a `files` map (reference documentation, templates, etc.). On first invocation, these files are extracted to a temporary cache directory, and the skill prompt is prefixed with `Base directory for this skill: <dir>` so Claude can Read/Grep them on demand, just like disk-based skills.
- **Invocation control via frontmatter**:
  - `user-invocable: true` (default) — appears in the `/` menu and can be invoked with `/skill-name`
  - `user-invocable: false` — hidden from the `/` menu; only Claude can invoke via the Skill tool
  - `disable-model-invocation: true` — Claude cannot invoke; only users can invoke via `/skill-name`
  - `disableModelInvocation: false` (default) — Claude can load and invoke the skill automatically when relevant
- **Aliases**: Some skills have aliases (alternative names). For example, `/loop` also responds to `/proactive`.
- **Exposed as slash commands**: A subset of bundled skills are also listed in the [Commands reference](https://code.claude.com/docs/en/commands), marked as **[Skill]**, and can be invoked directly. Examples: `/batch`, `/simplify`, `/loop`, `/debug`, `/claude-api`.

---

[← Back to Skills/README.md](/claude-code-docs/skills/overview/)
