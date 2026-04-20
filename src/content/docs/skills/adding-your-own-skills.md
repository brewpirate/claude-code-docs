---
title: "Adding Your Own Skills"
tags: [skills, cli]
---


To create custom skills beyond the bundled set:

- **User skills:** `~/.claude/skills/<name>/SKILL.md` — available across all your projects
- **Project skills:** `.claude/skills/<name>/SKILL.md` — visible to this project only; commit to version control to share with team
- **Plugin skills:** `<plugin>/skills/<name>/SKILL.md` — bundled with plugins
- **Managed skills:** Deploy org-wide via managed settings for enterprise deployments

See the [Skills Overview](/claude-code-docs/skills/overview/) for the complete frontmatter schema and [the skills guide](https://code.claude.com/docs/en/skills) for detailed authoring patterns.

---

[← Back to Skills/README.md](/claude-code-docs/skills/overview/)
