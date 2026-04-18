# .claude Directory

Claude Code reads instructions, settings, skills, subagents, and memory from your project directory and from `~/.claude` in your home directory. Commit project files to git to share them with your team; files in `~/.claude` are personal and apply across all projects.

## File Reference

| File | Scope | Committed | What it does | Reference |
|------|-------|-----------|--------------|-----------|
| `CLAUDE.md` | Project + global | ✓ | Instructions loaded every session | [Memory](../Memory/README.md) |
| `.claude/rules/*.md` | Project + global | ✓ | Topic-scoped instructions, optionally path-gated | [Memory](../Memory/README.md) |
| `.claude/settings.json` | Project + global | ✓ | Permissions, hooks, env vars, model defaults | [Settings](../Settings/README.md) |
| `.claude/settings.local.json` | Project only | gitignored | Personal overrides, auto-gitignored | [Settings](../Settings/README.md) |
| `.mcp.json` | Project only | ✓ | Team-shared MCP servers | [Settings](../Settings/README.md) |
| `.worktreeinclude` | Project only | ✓ | Gitignored files to copy into new worktrees | [Sessions](../Sessions/README.md) |
| `.claude/skills/<name>/SKILL.md` | Project + global | ✓ | Reusable prompts invoked with `/name` or auto-invoked | [Skills](../Skills/README.md) |
| `.claude/commands/*.md` | Project + global | ✓ | Single-file prompts; same mechanism as skills (legacy) | [Skills](../Skills/README.md) |
| `.claude/output-styles/*.md` | Project + global | ✓ | Custom system-prompt sections | [Settings](../Settings/README.md) |
| `.claude/agents/*.md` | Project + global | ✓ | Subagent definitions with their own prompt and tools | [Agents](../Agents/README.md) |
| `.claude/agent-memory/<name>/` | Project + global | ✓ | Persistent memory for subagents | [Agents](../Agents/README.md) |
| `~/.claude.json` | Global only | local | App state, OAuth, UI toggles, personal MCP servers | [Settings](../Settings/README.md) |
| `~/.claude/projects/*/memory/` | Global only | local | Auto memory: Claude's notes across sessions | [Memory](../Memory/auto-memory.md) |
| `~/.claude/keybindings.json` | Global only | local | Custom keyboard shortcuts | [Keybindings](../Keybindings/README.md) |

## Project scope tree

```
your-project/
├── CLAUDE.md                    ← Project instructions every session
├── .mcp.json                    ← Team MCP server config (committed)
├── .worktreeinclude             ← Files copied into new worktrees (committed)
└── .claude/
    ├── settings.json            ← Permissions, hooks, model, env vars
    ├── settings.local.json      ← Personal overrides (gitignored)
    ├── rules/
    │   ├── testing.md           ← Path-gated: loads on matching test files
    │   └── api-design.md        ← Path-gated: loads on src/api/ files
    ├── skills/
    │   └── security-review/
    │       ├── SKILL.md         ← Entrypoint: trigger, invocability, instructions
    │       └── checklist.md     ← Supporting file bundled with the skill
    ├── commands/
    │   └── fix-issue.md         ← Single-file prompt (prefer skills/ for new work)
    ├── output-styles/           ← Project-scoped output style overrides
    ├── agents/
    │   └── code-reviewer.md     ← Subagent with its own prompt and tools
    └── agent-memory/
        └── code-reviewer/
            └── MEMORY.md        ← Claude writes and maintains this
```

## Global scope tree (`~/.claude`)

```
~/
├── .claude.json                 ← App state, UI toggles, personal MCP servers
└── .claude/
    ├── CLAUDE.md                ← Personal preferences across all projects
    ├── settings.json            ← Default settings for all projects
    ├── keybindings.json         ← Custom keyboard shortcuts
    ├── projects/                ← Auto memory (Claude writes these)
    │   └── project-name/memory/
    │       ├── MEMORY.md        ← Index loaded each session
    │       └── debugging.md     ← Topic file read on demand
    ├── rules/                   ← User-level rules (all projects)
    ├── skills/                  ← Personal skills (all projects)
    ├── commands/                ← Personal single-file commands (legacy)
    ├── output-styles/           ← Personal output styles
    ├── agents/                  ← Personal subagents (all projects)
    └── agent-memory/            ← User-scoped subagent memory
```

## Check what loaded

| Command | Shows |
|---------|-------|
| `/context` | Token usage: system prompt, memory files, skills, MCP tools, messages |
| `/memory` | Which `CLAUDE.md` and rules files loaded, plus auto-memory entries |
| `/agents` | Configured subagents and their settings |
| `/hooks` | Active hook configurations |
| `/mcp` | Connected MCP servers and status |
| `/skills` | Available skills from project, user, and plugin sources |
| `/permissions` | Current allow and deny rules |
| `/doctor` | Installation and configuration diagnostics |

## Application data

`~/.claude` also stores data Claude Code writes during sessions. Transcripts, prompt history, file snapshots, caches, and logs are all plaintext. Files under `projects/<project>/` are deleted on startup once older than `cleanupPeriodDays` (default 30 days). `history.jsonl` and `stats-cache.json` are kept until you delete them.

Do **not** delete `~/.claude.json`, `~/.claude/settings.json`, or `~/.claude/plugins/` — those hold your auth, preferences, and installed plugins.

## See Also

- [../Memory/README.md](../Memory/README.md) — CLAUDE.md, rules, auto-memory
- [../Settings/README.md](../Settings/README.md) — settings.json key reference
- [../Skills/README.md](../Skills/README.md) — skill frontmatter and catalog
- [../Agents/README.md](../Agents/README.md) — subagent definitions
- [../Hooks/README.md](../Hooks/README.md) — event hooks system
- [../Keybindings/README.md](../Keybindings/README.md) — keyboard shortcuts
- [../Sessions/README.md](../Sessions/README.md) — transcript storage and cleanup
- Official docs: <https://code.claude.com/docs/en/claude-directory>
