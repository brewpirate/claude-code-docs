# Claude Code Documentation

Local reference for Claude Code CLI v2.1.x — every env var, settings key, slash command, tool, skill, hook, permission rule, CLI flag, plugin-manifest field, and Agent SDK type, cross-referenced against the official docs and the `claude-code-main` source snapshot.

## Hubs

Each hub is a self-contained reference: `README.md` (intro + TOC + Overview table + Quick Reference + See Also) + per-section files + back-links. Uniform shape across all ten hubs — same navigation pattern everywhere.

### Configuration surface

| Hub | Description | Entries |
|-----|-------------|---------|
| [CLI/](./CLI/) | `claude` command-line flags, subcommands, invocation modes. Includes hidden flags from the source tree. | 61 flags + 20 subcommands + 15 hidden |
| [ENV/](./ENV/) | Every environment variable recognized by Claude Code. Attribution: original list from [@unkn0wncode](https://gist.github.com/unkn0wncode). | 509 vars across 21 sections |
| [Settings/](./Settings/) | `settings.json` key reference — auth, model, permissions, sandbox, plugins, MCP, hooks, UI, worktree. | 119 keys across 19 sections |

### Runtime surface

| Hub | Description | Entries |
|-----|-------------|---------|
| [Tools/](./Tools/) | Built-in tools Claude dispatches — filesystem, shell, web, orchestration, MCP, meta. | 44 tools across 16 sections |
| [Commands/](./Commands/) | Built-in `/slash` commands — documented, internal source-tree finds, tombstones, experimental, feature-flag-gated. | 97 commands across 14 sections |
| [Hooks/](./Hooks/) | Event-hook catalog — 26 events × 4 handler types × matcher syntax + SSRF security model. | 26 events + 4 handlers across 8 sections |
| [Permissions/](./Permissions/) | Rule grammar, evaluation model, permission modes, scope precedence, auto-mode classifiers. | 14 entries across 10 sections |

### Authoring & extension

| Hub | Description | Entries |
|-----|-------------|---------|
| [Skills/](./Skills/) | Frontmatter schema (`FRONTMATTER.md` — 29 fields) + bundled-skills catalog (14 bundled skills, 6 ant-only or feature-gated). | 29 fields + 14 bundled |
| [Plugins/](./Plugins/) | `plugin.json` manifest reference, directory layout, lifecycle, marketplace, bundled-plugin catalog. | 23 manifest fields across 15 sections |
| [Agent SDK/](./Agent%20SDK/) | TypeScript/Python SDK — message protocol, control plane, session lifecycle, tool/hook/MCP bridging, `canUseTool` callback. | 17 SDK types across 14 sections |

## Placeholder topics (URL-only stubs)

These files contain only pointers to official docs; they have not been expanded with local source cross-reference. Happy to expand if useful.

| File | Points to |
|------|-----------|
| [CHANNELS.md](./CHANNELS.md) | <https://code.claude.com/docs/en/channels-reference> |
| [Changelog.md](./Changelog.md) | <https://code.claude.com/docs/en/changelog> + [CHANGELOG.md on GitHub](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) |
| [Checkpointing.md](./Checkpointing.md) | <https://code.claude.com/docs/en/checkpointing> |
| [Agents/](./Agents/) | Empty — not yet documented. Subagents are covered within [Skills/FRONTMATTER.md](./Skills/FRONTMATTER.md) and [Agent SDK/](./Agent%20SDK/). |

## Conventions

Every hub's README follows the same shape:

1. **Intro** — 1-3 sentences on scope.
2. **Table of Contents** — numbered links to every section file.
3. **Overview table** — columns `# | Section | Description | Entries` (count of H3/H4 catalog entries; "narrative" for prose-only sections).
4. **Quick reference** — a single flat table users can Ctrl-F (commands by name, tools by name, flags by name, etc.).
5. **See Also** — cross-links to sibling hubs + official docs.

Every section file:
- H1 title matching the source section heading
- Full content preserved from the original consolidated doc
- `---` + `[← Back to Hub/README.md](./README.md)` footer

Counts on Overview tables reflect H3/H4 catalog entries. Narrative sections (like *How X works*, *Discrepancies & notes*, *Security model*) are labelled `narrative` rather than given a synthetic count.

## Cross-doc bridges

Common cross-references encountered across hubs:
- CLI flag ↔ env var ↔ `settings.json` key — each hub documents the mapping from its own side.
- `[Skill]`-marked slash commands in [Commands/](./Commands/) are bundled skills documented in [Skills/](./Skills/).
- Hook events in [Hooks/](./Hooks/) can be registered via either [Settings/hooks-automation.md](./Settings/hooks-automation.md) or the `hooks:` frontmatter field in [Skills/FRONTMATTER.md](./Skills/FRONTMATTER.md).
- Permission modes in [Permissions/](./Permissions/) are set via CLI (`--permission-mode`), env, `settings.json`, or SDK control message — each hub carries the appropriate pointer.
- MCP servers are referenced from [Tools/](./Tools/) (orchestration primitives), [Settings/](./Settings/) (config), [Plugins/](./Plugins/) (bundling), and [Agent SDK/](./Agent%20SDK/) (in-process transport).

## Sources

- **Official docs:** <https://code.claude.com/docs/en/>
- **Source snapshot:** `~/Downloads/claude-code-main/` — the TypeScript source used to verify types, schemas, and find undocumented/internal features.
- **Env-var list origin:** gist by [@unkn0wncode](https://gist.github.com/unkn0wncode/f87295d055dd0f0e8082358a0b5cc467) (see [ENV/README.md](./ENV/README.md) attribution).

Notes about the source snapshot:
- Version alignment with the latest Claude Code release is not guaranteed — flags and tools may have shifted. Hubs flag specific gaps in their *Discrepancies & notes* sections.
- Internal or feature-flag-gated features (`USER_TYPE === 'ant'`, `tengu_*` Statsig flags, `CLAUDE_CODE_EXPERIMENTAL_*` env vars) are called out explicitly wherever they appear in the source.
