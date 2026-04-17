# Discrepancies & notes


### Documentation vs. Source Mismatches

1. **`/debug`** — Commands docs state it's invokable and user-triggerable. Source confirms `userInvocable: true, disableModelInvocation: true`, so only manual invocation. ✓ Consistent.

2. **`/keybindings-help`** — Registered as `/keybindings` in schema but source registers as `keybindings-help`. The `/keybindings` command in Commands docs is a built-in command (not skill) that opens the config UI; the skill is the reference content. ✓ Consistent (different components).

3. **`/loop` and `/schedule`** — Not listed in public commands docs but source files exist and are feature-flag gated. Likely unreleased or beta.

4. **`/remember`** — Not in public docs; Anthropic staff skill for auto-memory management. Only registered if auto-memory is enabled.

### Skills without `registerBundledSkill()` calls

- **`claudeApiContent.ts`** — Not a skill. Contains bundled markdown reference material (247KB) lazy-loaded by `/claude-api`. Exported as `SKILL_FILES` and `SKILL_PROMPT` for inline reference inclusion.
- **`verifyContent.ts`** — Not a skill. Contains reference files and markdown content for `/verify` skill.
- **`index.ts`** — Re-exports registration functions; not itself a skill.

All other `.ts` files contain a single `registerBundledSkill()` call.

### Gating summary

| Gating Mode | Skills | Availability |
|-------------|--------|---|
| Always on | `/batch`, `/simplify`, `/debug`, `/claude-api`, `/update-config` | All users, all modes |
| Auto-memory gated | `/remember` | Only if auto-memory enabled |
| Feature-flag gated | `/loop` (Kairos), `/schedule` (tengu_surreal_dali + policy) | Conditional on feature rollout |
| Ant-only | `/verify`, `/stuck`, `/lorem-ipsum`, `/skillify` | Anthropic staff only |
| Extension-gated | `/claude-in-chrome` | Only if Claude in Chrome extension installed |
| Keybinding feature | `/keybindings-help` | Only if keybinding customization enabled |

### Wiring caveats

- **Registration happens outside the skill file.** Each skill's `registerBundledSkill()` call must fire somewhere during CLI initialization (typically a central init file not shown in `bundled/`). The source tree shows skill *definitions*, but the wiring is external — skills don't self-register on import.
- **Feature-flag names are volatile.** Flag identifiers like `tengu_surreal_dali` and `isKairosCronEnabled()` are internal Statsig names that can be renamed or retired without notice. Treat them as implementation details; don't build automations that hard-code them.

---

[← Back to Skills/README.md](./README.md)
