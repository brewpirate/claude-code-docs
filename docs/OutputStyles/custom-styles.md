# Custom styles

Custom output styles are markdown files stored in `.claude/output-styles/` directories. They allow you to define project-specific or user-level teaching modes, formatting preferences, and tone customizations.

## Directory structure

Custom styles are loaded from two sources:

**User-level styles** (apply across all projects):
```
~/.claude/output-styles/*.md
```

**Project-level styles** (apply only to this project):
```
./.claude/output-styles/*.md
```

Project styles override user styles with the same name. Both use the same filename-as-name convention.

## Filename and style naming

- **Filename becomes style name**: `my-teaching-mode.md` becomes the style `my-teaching-mode`.
- **Optional `name` frontmatter field**: If you set `name: Custom Name` in frontmatter, that name is used instead of the filename.
- **Case-sensitive**: `Learning` and `learning` are different styles.

Example:

```
File: ~\.claude\output-styles\terse.md
Frontmatter: name: Terse Mode
Result: Style named "Terse Mode"
```

## File format

Each markdown file consists of frontmatter (YAML) and content:

```markdown
---
name: Terse
description: Short, code-first responses with minimal explanation
keep-coding-instructions: true
---

# Terse Mode Active

Be concise. Provide code-first solutions. Minimize explanations.
```

The **content** (everything after the frontmatter) becomes the custom prompt prepended to Claude's system instructions.

## Loader behavior

The loader (`loadOutputStylesDir.ts`) processes custom styles as follows:

1. **Scans `.claude/output-styles/` and `~/.claude/output-styles/`** for `*.md` files.
2. **Extracts frontmatter** for `name`, `description`, `keep-coding-instructions`, `force-for-plugin`.
3. **Derives style name** from filename (minus `.md`) or `name` field.
4. **Extracts description** from frontmatter or falls back to the first paragraph of markdown.
5. **Uses markdown content** (trimmed) as the style prompt.
6. **Ignores `force-for-plugin` on non-plugin styles** with a debug warning.

## Precedence

When the same style name exists in multiple locations, **project styles override user styles**, and both override plugin styles. Built-in styles can be overridden by any of the above.

Load order (lowest to highest precedence):
1. Built-in styles
2. Plugin styles
3. User styles
4. Project styles
5. Policy-managed styles (if set)

## keep-coding-instructions behavior

- **`true`** — Claude Code's standard coding instructions remain active alongside the custom prompt.
- **`false`** — The custom prompt replaces Claude Code's coding instructions entirely.
- **Omitted (undefined)** — Treated as `true` for backward compatibility; coding instructions are kept.

The field supports both boolean and string values (`"true"`, `"false"`).

## Example custom style

**File**: `./.claude/output-styles/detective.md`

```markdown
---
name: Detective Mode
description: Explain the mystery before the solution
keep-coding-instructions: true
---

# Detective Mode Active

Before implementing a solution, analyze the problem like a detective:
1. Identify the core issue and its root cause
2. List clues in the codebase that led you there
3. Then provide the solution with a narrative summary
```

---

[← Back to OutputStyles/README.md](./README.md)
