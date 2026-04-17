# Frontmatter reference

Frontmatter fields in custom output style markdown files control metadata and behavior.

## Fields

### name

**Type**: `string`  
**Default**: Filename without `.md` extension  
**Required**: No

The display name of this output style. Used in the style picker and settings.

**Example**:
```yaml
---
name: Terse Mode
---
```

If omitted, the filename (minus `.md`) becomes the style name:
```
File: verbose.md
Inferred name: verbose
```

### description

**Type**: `string`  
**Default**: Extracted from the first paragraph of markdown, or auto-generated  
**Required**: No

One-line description shown in the style picker and documentation. Coerced to string; if absent, the loader attempts to extract from markdown or falls back to `Custom <styleName> output style`.

**Example**:
```yaml
---
name: Explanatory
description: Claude explains implementation choices and codebase patterns
---
```

### keep-coding-instructions

**Type**: `boolean` | `string` (`"true"` | `"false"`)  
**Default**: `undefined` (treated as `true`)  
**Required**: No

Whether Claude Code's standard coding instructions remain active alongside the custom prompt. When `false`, the custom prompt fully replaces Claude's coding guidance.

**Example**:
```yaml
---
keep-coding-instructions: true
---
```

Or as a string:
```yaml
---
keep-coding-instructions: "false"
---
```

### force-for-plugin

**Type**: `boolean`  
**Default**: `undefined` (not forced)  
**Required**: No  
**Plugin-only**: Yes

Forces this output style to be automatically applied when the plugin is enabled. **Only valid on plugin-provided styles**; a debug warning is logged if set on user or project styles.

When multiple plugins have forced styles, only one is chosen (logged via debug output).

**Example** (plugin output style only):
```yaml
---
name: Plugin Teaching Mode
force-for-plugin: true
---
```

## Cross-references

- [../Skills/FRONTMATTER.md](../Skills/FRONTMATTER.md) — general frontmatter conventions for Claude Code markdown configs.

---

[← Back to OutputStyles/README.md](./README.md)
