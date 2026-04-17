# Additional hook subsystems (internal)


The files below exist in source but are referenced by name only (not fully read). Based on their names, they likely handle:

- **`postSamplingHooks.ts`:** Hooks that fire after LLM sampling completes (between model output and tool dispatch). Used for post-processing or validation of model responses.

- **`sessionHooks.ts`:** Session-specific hook registration and lifecycle. Manages in-memory hooks declared during runtime (e.g., via SDK) vs. persisted hooks.

- **`fileChangedWatcher.ts`:** File watcher backend for `FileChanged` events. Monitors `.claude/` and watched files; debounces rapid changes.

- **`AsyncHookRegistry.ts`:** Registry data structure for async hook execution. Manages background hook tasks without blocking the turn.

- **`hooksConfigManager.ts`:** Config loading, validation, and caching. Merges hooks across settings sources; manages hook deduplication.

- **`registerFrontmatterHooks.ts`:** Runtime hook registration from skill/agent frontmatter. Parses `hooks:` YAML field and registers matchers.

- **`registerSkillHooks.ts`:** Skill-specific hook registration. Handles `once: true` and `if` condition parsing for skills.

- **`skillImprovement.ts`:** Skill-related; purpose unclear without reading.

- **`apiQueryHookHelper.ts`:** API query-related hook helper; likely for SDK hook invocation.

- **`hookHelpers.ts`:** Shared utilities (JSON parsing, $ARGUMENTS substitution, decision parsing).

Behavior unverified without reading the files; use names as hints when hedging.

---

[← Back to Hooks/README.md](./README.md)
