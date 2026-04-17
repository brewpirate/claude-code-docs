# Discrepancies & notes

Known gaps, edge cases, and inconsistencies between public documentation, source code, and runtime behavior.

## Plugin forcing — multiple plugins conflict

**Issue**: When multiple plugins have `force-for-plugin: true` set on their output styles, the code selects one arbitrarily (the first in the array) and logs a debug warning. There is no user-facing UI to resolve the conflict or disable one plugin's forced style.

**Source**: `getOutputStyleConfig()` in `constants/outputStyles.ts` (lines 184–204).

**Workaround**: Check debug output for which style was chosen; manually override via `/output-style` command or settings.

## Ignoring force-for-plugin on custom styles

**Issue**: The loader warns (via `logForDebugging`) if `force-for-plugin` is set on user or project styles, since this field only applies to plugin-provided styles. The setting is silently ignored at runtime.

**Source**: `loadOutputStylesDir.ts` (lines 65–70).

**Impact**: Users may set `force-for-plugin: true` on a user-level style expecting it to be forced, but it has no effect. Always use plugin-provided styles for forced behavior.

## Missing edge case documentation

**Gaps**:

- No documented behavior for what happens if a style name collides between built-in and custom styles (built-in cannot be overridden).
- No guidance on when to use `keep-coding-instructions: false` (full replacement vs. augmentation).
- Plugin style loading order relative to user/project styles not publicly documented; source shows plugins load before user/project styles.
- No example of a style that modifies Claude's file-handling or tool-usage behavior (current docs focus on tone/teaching only).

## Frontmatter field naming

**Inconsistency**: Field name uses kebab-case (`keep-coding-instructions`, `force-for-plugin`) while TypeScript properties use camelCase (`keepCodingInstructions`, `forceForPlugin`). The loader correctly maps YAML to camelCase, but this dual naming convention is not explicitly documented.

## Description extraction fallback

**Behavior**: If `description` frontmatter is omitted, the loader attempts to extract from the first paragraph of markdown. If markdown has no paragraphs (e.g., pure YAML with no content), the fallback is `Custom <styleName> output style`. This is convenient but may create unhelpful descriptions if misused.

**Source**: `loadOutputStylesDir.ts` (lines 42–50).

## No validation of prompt content

**Issue**: The prompt (markdown content) undergoes no validation. It's possible to create a style with an empty prompt, circular instructions, or conflicting directives. Claude Code applies whatever prompt is provided without sanity checks.

## Plugin directory structure not documented

**Issue**: The official docs don't specify the exact plugin directory structure for output styles. Source shows `<plugin-root>/output-styles/*.md`, but plugins may have different layouts depending on how they're packaged.

**Source**: `loadPluginOutputStyles.js` implementation (not fully read in this session; inferred from `loadOutputStylesDir.ts` import).

---

[← Back to OutputStyles/README.md](./README.md)
