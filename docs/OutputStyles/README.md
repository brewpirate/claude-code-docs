# Claude Code Output Styles

Reference for output style configuration, built-in styles, custom style creation, and plugin-provided styles. Output styles customize Claude's tone, teaching approach, and formatting.

## Table of Contents

1. [How output styles work](./how-output-styles-work.md)
2. [Built-in styles](./built-in-styles.md)
3. [Custom styles](./custom-styles.md)
4. [Frontmatter reference](./frontmatter-reference.md)
5. [Discrepancies & notes](./discrepancies-notes.md)

## Overview

**5 sections**, **3 built-in styles**, **2 custom style sources** (user + project), **1 plugin source**.

| # | Section | Description |
|---|---------|-------------|
| 1 | [How output styles work](./how-output-styles-work.md) | What output styles do, loading order, precedence, and switching via commands. |
| 2 | [Built-in styles](./built-in-styles.md) | **default**, **Explanatory**, **Learning** — shipped with Claude Code, immutable. |
| 3 | [Custom styles](./custom-styles.md) | User and project-scoped `.claude/output-styles/*.md` files, loader behavior, and precedence. |
| 4 | [Frontmatter reference](./frontmatter-reference.md) | Frontmatter fields: `name`, `description`, `keep-coding-instructions`, `force-for-plugin`. |
| 5 | [Discrepancies & notes](./discrepancies-notes.md) | Plugin-forcing edge cases, naming inconsistencies, and gaps between docs and source. |

## Quick reference — built-in styles

| Style | Description | Key Feature |
|-------|-------------|------------|
| `default` | No custom prompt applied; Claude Code's standard behavior. | None |
| `Explanatory` | Claude explains implementation choices and codebase patterns before/after code. | Uses `✦ Insight` header blocks with 2-3 key educational points. |
| `Learning` | Interactive teaching mode; Claude requests user code contributions for design decisions. | "Learn by Doing" blocks with Context/Your Task/Guidance; TodoList integration. |

## See Also

- [../Skills/FRONTMATTER.md](../Skills/FRONTMATTER.md) — general frontmatter schema and conventions.
- [../Settings/ui-display.md](../Settings/ui-display.md) — `outputStyle` settings key.
- [../Commands/README.md](../Commands/README.md) — `/output-style` command (if present) and `/config` settings editor.
- [../Plugins/README.md](../Plugins/README.md) — plugin-provided output styles and `force-for-plugin`.
- Official docs: <https://code.claude.com/docs/en/output-styles>
