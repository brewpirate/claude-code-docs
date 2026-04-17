# Claude Code Documentation

Local reference for Claude Code CLI v2.1.x — every env var, settings key, slash command, tool, skill, hook, permission rule, CLI flag, plugin-manifest field, Agent SDK type, memory location, transcript path, keybinding, bridge protocol field, and cost-tracking mechanism — cross-referenced against the official docs and the `claude-code-main` source snapshot.

## Hubs

Each hub is a self-contained reference: `README.md` (intro + TOC + Overview table + Quick Reference + See Also) + per-section files + back-links. Uniform shape across all seventeen hubs.

### Configuration surface

What users set to shape how Claude Code behaves.

| Hub | Description | Entries |
|-----|-------------|---------|
| [CLI/](./CLI/) | `claude` command-line flags, subcommands, invocation modes. Includes hidden flags from the source tree. | 61 flags + 20 subcommands + 15 hidden |
| [ENV/](./ENV/) | Every environment variable recognized by Claude Code. Attribution: original list from [@unkn0wncode](https://gist.github.com/unkn0wncode). | 500+ vars across 21 sections |
| [Settings/](./Settings/) | `settings.json` key reference — auth, model, permissions, sandbox, plugins, MCP, hooks, UI, worktree. | 119 keys across 19 sections |
| [Keybindings/](./Keybindings/) | Every shipped keyboard shortcut across 18 contexts (global, chat, selection, dialogs, diff, etc.), plus platform quirks and custom-override config. | 85+ bindings across 9 sections |
| [OutputStyles/](./OutputStyles/) | The three built-in output styles (`default`, `Explanatory`, `Learning`), custom style authoring, frontmatter schema, plugin style forcing. | 3 built-in + 6 sections |

### Runtime surface

What Claude does when running.

| Hub | Description | Entries |
|-----|-------------|---------|
| [Tools/](./Tools/) | Built-in tools Claude dispatches — filesystem, shell, web, orchestration, MCP, meta. | 44 tools across 16 sections |
| [Commands/](./Commands/) | Built-in `/slash` commands — documented, internal source-tree finds, tombstones, experimental, feature-flag-gated. | 97 commands across 14 sections |
| [Hooks/](./Hooks/) | Event-hook catalog — 26 events × 4 handler types × matcher syntax + SSRF security model. | 26 events + 4 handlers across 8 sections |
| [Permissions/](./Permissions/) | Rule grammar, evaluation model, permission modes, scope precedence, auto-mode classifiers. | 14 entries across 10 sections |

### Session & state

Where Claude Code stores what on disk, how long it keeps things, how sessions resume, and how much it costs.

| Hub | Description | Entries |
|-----|-------------|---------|
| [Sessions/](./Sessions/) | Transcript storage (`~/.claude/sessions/projects/...`), 30-day cleanup, auto-compaction (20k-reserve threshold, circuit breaker), context caching, 17 transcript entry types, session resume. | 10 sections |
| [Memory/](./Memory/) | Auto-memory layout (`~/.claude/memory/YYYY/MM/YYYY-MM-DD.md`), MEMORY.md caps (200 lines / 25KB), 200-file scan + Sonnet selector, user/feedback/project/reference type classification, team + agent memory scopes. | 8 sections |
| [Cost/](./Cost/) | Per-model USD tracking, session persistence keyed by `lastSessionId`, token-budget stop (90% + diminishing-returns), rate-limit early warnings, tool result size caps. | 7 sections |
| [Coordinator/](./Coordinator/) | Multi-agent orchestration — coordinator mode activation, worker tool whitelist, `.claude/scratchpad/` shared directory, agent memory scopes, relationship to agent teams. | 8 sections |

### Authoring & extension

Building on top of Claude Code.

| Hub | Description | Entries |
|-----|-------------|---------|
| [Skills/](./Skills/) | Frontmatter schema (`FRONTMATTER.md` — 29 fields) + bundled-skills catalog (14 bundled, 6 ant-only or feature-gated). | 29 fields + 14 bundled |
| [Plugins/](./Plugins/) | `plugin.json` manifest reference, directory layout, lifecycle, marketplace, bundled-plugin catalog. | 23 manifest fields across 15 sections |
| [Agent SDK/](./Agent%20SDK/) | TypeScript/Python SDK — message protocol, control plane, session lifecycle, tool/hook/MCP bridging, `canUseTool` callback. | 17 SDK types across 14 sections |

### Infrastructure

Remote sessions, bridges, and enterprise-only transport.

| Hub | Description | Entries |
|-----|-------------|---------|
| [Bridge/](./Bridge/) | CCR v1/v2 bridge — WebSocket vs SSE transport, 6-layer feature gating, session-token refresh, trusted device tokens, keep-alive frames, upstream proxy (CCR containers), remote session protocol. | 11 sections |

## Placeholder topics (URL-only stubs)

These files contain only pointers to official docs; they have not been expanded with local source cross-reference.

| File | Points to |
|------|-----------|
| [CHANNELS.md](./CHANNELS.md) | <https://code.claude.com/docs/en/channels-reference> (also see [Settings/channel-communication.md](./Settings/channel-communication.md)) |
| [Changelog.md](./Changelog.md) | <https://code.claude.com/docs/en/changelog> + [CHANGELOG.md on GitHub](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) |
| [Checkpointing.md](./Checkpointing.md) | <https://code.claude.com/docs/en/checkpointing> (also see [Sessions/](./Sessions/) for local behavior) |
| [Agents/](./Agents/) | Empty — subagents are covered within [Skills/FRONTMATTER.md](./Skills/FRONTMATTER.md), [Coordinator/](./Coordinator/), and [Agent SDK/](./Agent%20SDK/). |

## Notable easter eggs & undocumented features

The source snapshot surfaced a few things worth knowing about:

- **`buddy/` companion system** — a seeded generative pet-companion subsystem hatching April 1–7, 2026 (rainbow-text teaser) then going full-live. 18 species (duck, dragon, …), 5 rarity tiers (common → legendary), 5 stats (DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK). Sprites tick every 500 ms; per-keystroke reactions. Stored as an AI-generated "soul" in config; cosmetic "bones" regenerate deterministically from a Mulberry32 hash of userId, so users can't edit their way to legendary. Not in any official docs. Source: `buddy/`.
- **Silent model migrations** — auto-migrations between model versions run on startup for Pro/Max/Team users (Fennec → Opus, Sonnet 4.5 → 4.6, etc.). No notification. Migration timestamp only saved for users with >1 startup. Source: `migrations/migrate*Sonnet*.ts`, `migrations/migrateLegacyOpus*.ts`.
- **Session memory** — background subagent extracts `~/.claude/sessionMemory.md` periodically. Gated by `tengu_session_memory`. Token budget: 1024 thinking + 2048 max. See [Memory/session-memory.md](./Memory/session-memory.md).
- **Prevent-sleep on macOS** — Claude Code spawns `caffeinate -i -t 300` with ref-counting and 4-min self-healing restart during long operations. Source: `services/preventSleep.ts`.
- **`.claude/scheduled_tasks.json`** — persistent cron-style task store with 7-day auto-expiry + `permanent: true` escape hatch. Not exposed through the `CronCreate` tool surface. See [Tools/scheduling-tasks.md](./Tools/scheduling-tasks.md).

## Conventions

Every hub's README follows the same shape:

1. **Intro** — 1–3 sentences on scope.
2. **Table of Contents** — numbered links to every section file.
3. **Overview table** — columns `# | Section | Description | Entries` (count of H3/H4 catalog entries; `narrative` for prose-only sections).
4. **Quick reference** — a single flat table users can Ctrl-F (commands by name, tools by name, flags by name, events by name, rules by tool, etc.).
5. **See Also** — cross-links to sibling hubs + official docs.

Every section file:
- H1 title matching the source section heading
- Full content preserved from the original consolidated doc
- `---` + `[← Back to Hub/README.md](./README.md)` footer

## Cross-doc bridges

Common cross-references encountered across hubs:
- CLI flag ↔ env var ↔ `settings.json` key — each hub documents the mapping from its own side.
- `[Skill]`-marked slash commands in [Commands/](./Commands/) are bundled skills documented in [Skills/](./Skills/).
- Hook events in [Hooks/](./Hooks/) can be registered via [Settings/hooks-automation.md](./Settings/hooks-automation.md) or the `hooks:` frontmatter field in [Skills/FRONTMATTER.md](./Skills/FRONTMATTER.md).
- Permission modes in [Permissions/](./Permissions/) are set via CLI (`--permission-mode`), env, `settings.json`, or SDK control message — each hub carries the appropriate pointer.
- MCP servers are referenced from [Tools/](./Tools/) (orchestration primitives), [Settings/](./Settings/) (config), [Plugins/](./Plugins/) (bundling), and [Agent SDK/](./Agent%20SDK/) (in-process transport).
- Session data paths are authoritatively documented in [Sessions/](./Sessions/) and [Memory/](./Memory/); env vars that control them live in [ENV/](./ENV/) and settings keys in [Settings/](./Settings/).
- Coordinator mode ([Coordinator/](./Coordinator/)) and its tools (`TeamCreate`, `TeamDelete`, `SendMessage`, `SyntheticOutput`) are referenced from [Tools/](./Tools/); their env-var gates live in [ENV/](./ENV/).

## Sources

- **Official docs:** <https://code.claude.com/docs/en/>
- **Source snapshot:** `~/Downloads/claude-code-main/` — the TypeScript source used to verify types, schemas, extract internal/hidden behaviors, and map feature-flag names.
- **Env-var list origin:** gist by [@unkn0wncode](https://gist.github.com/unkn0wncode/f87295d055dd0f0e8082358a0b5cc467) (see [ENV/README.md](./ENV/README.md) attribution).

Notes about the source snapshot:
- Version alignment with the latest Claude Code release is not guaranteed — flags and tools may have shifted. Hubs flag specific gaps in their *Discrepancies & notes* sections.
- Internal or feature-flag-gated features (`USER_TYPE === 'ant'`, `tengu_*` Statsig flags, `CLAUDE_CODE_EXPERIMENTAL_*` env vars) are called out explicitly wherever they appear in the source.
- Statsig flag names (e.g. `tengu_harbor`, `tengu_scratch`, `tengu_herring_clock`) are internal identifiers that can be renamed without notice. Treat them as diagnostic signals, not stable APIs.
