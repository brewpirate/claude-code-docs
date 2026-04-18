---
title: "Skills Overview"
description: "Built-in and custom skills for Claude Code"
---

# Claude Code Skills

> **New here?** Start with [GettingStarted/first-skill.md](../GettingStarted/first-skill.md) for a step-by-step tutorial that walks you through creating your first skill. The sections below are the full reference for all 29 frontmatter fields and 14 bundled skills.

Reference for the Claude Code skill system — both the YAML frontmatter schema used by skill, agent, command, memory, and output-style files, and the catalog of bundled skills shipped with the CLI.

## Table of Contents

**Frontmatter schema**

1. [Frontmatter reference](./FRONTMATTER.md)

**Bundled skills catalog**

2. [How bundled skills work](./how-bundled-skills-work.md)
3. [Publicly-documented bundled skills](./publicly-documented-bundled-skills.md)
4. [Internal / undocumented bundled skills](./internal-undocumented-bundled-skills.md)
5. [Discrepancies & notes](./discrepancies-notes.md)
6. [Adding your own skills](./adding-your-own-skills.md)

## Overview

**6 documents**, **14 bundled skills** catalogued (with 6 also cross-listed as internal), plus one full frontmatter schema reference.

| # | Document | Description | Entries |
|---|----------|-------------|---------|
| 1 | [Frontmatter reference](./FRONTMATTER.md) | Complete YAML frontmatter schema for skills, subagents, slash commands, memory files, and output styles. Every field with type, default, example, and source.ts discrepancy notes. | 29 fields |
| 2 | [How bundled skills work](./how-bundled-skills-work.md) | Registration, prompt builders, isEnabled gating, reference file extraction, and the user/model invocation model. | narrative |
| 3 | [Publicly-documented bundled skills](./publicly-documented-bundled-skills.md) | Catalog of bundled skills grouped by purpose — code operations, session, integrations, configuration, developer. | 14 skills |
| 4 | [Internal / undocumented bundled skills](./internal-undocumented-bundled-skills.md) | Ant-only and feature-flag-gated bundled skills that don't appear in public docs. | 6 skills (cross-listed) |
| 5 | [Discrepancies & notes](./discrepancies-notes.md) | Doc-vs-source mismatches, non-skill support files in bundled/, gating summary, and wiring caveats. | narrative |
| 6 | [Adding your own skills](./adding-your-own-skills.md) | Where user, project, plugin, and managed skills live on disk, plus pointer to the frontmatter schema. | narrative |

## Quick reference — bundled skills

| Skill | Aliases | /command? | Model-invocable? | Gating | Purpose |
|-------|---------|-----------|------------------|--------|---------|
| `/batch` | — | ✓ | Yes | always on | Orchestrate large parallel refactors across a codebase |
| `/simplify` | — | ✓ | Yes | always on | Review code for reuse, quality, and efficiency issues |
| `/debug` | — | ✓ | No | always on | Enable debug logging and diagnose session issues |
| `/loop` | `/proactive` | ✓ | Yes | feature-flag | Run prompts on a recurring cron interval |
| `/claude-api` | — | ✓ | Yes | always on | Load Claude API reference material for your language |
| `/verify` | — | ✗ | No | ant-only | Verify a code change works by running the app |
| `/remember` | — | ✗ | No | auto-memory only | Review and organize auto-memory entries |
| `/stuck` | — | ✗ | No | ant-only | Diagnose frozen/stuck Claude Code sessions |
| `/claude-in-chrome` | — | ✗ | Yes | conditional | Automate Chrome browser interactions |
| `/keybindings-help` | — | ✗ | No | if customization enabled | Configure keyboard shortcuts |
| `/update-config` | — | ✗ | Yes | always on | Modify Claude Code settings and hooks |
| `/lorem-ipsum` | — | ✗ | No | ant-only | Generate filler text for context testing |
| `/skillify` | — | ✗ | No | ant-only | Capture a session as a reusable skill |
| `/schedule` | — | ✗ | Yes | feature-flag | Schedule remote agents on a cron |

## See Also

- [./FRONTMATTER.md](./FRONTMATTER.md) — frontmatter schema reference.
- [./source.ts](./source.ts) — local copy of the Claude Code frontmatter parser (authoritative for parse behavior).
- [../Commands/README.md](../Commands/README.md) — companion reference for built-in slash commands (several are `[Skill]`-backed).
- [../Tools/README.md](../Tools/README.md) — companion reference for built-in tools (the Skill tool dispatches skills).
- [../ENV/README.md](../ENV/README.md) — environment variables (several skills are gated by `CLAUDE_CODE_ENABLE_*` flags).
- Official docs: <https://code.claude.com/docs/en/skills>
