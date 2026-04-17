# How output styles work

Output styles customize Claude's behavior by prepending a custom system prompt to the conversation. They control tone, teaching approach, code explanation level, and formatting preferences.

## What an output style does

An output style injects a style-specific prompt into Claude's system instructions **before Claude generates each response**. The prompt modifies:

- **Tone**: educational vs. task-focused vs. collaborative
- **Code explanations**: detailed insights vs. concise implementations
- **Interaction mode**: pure assistance vs. learning-by-doing
- **Formatting**: uses special headers, insight blocks, or todo markers

The prompt can override part of Claude Code's default coding instructions (controlled by `keep-coding-instructions` frontmatter field).

## How Claude Code applies styles

**Loading order** (highest precedence first):

1. **Forced plugin styles** — If a plugin sets `force-for-plugin: true` in its output style frontmatter, and the plugin is enabled, that style is used (with debug logging if multiple plugins force styles).
2. **User-selected style** — From `settings.outputStyle` setting, or `/output-style` command selection.
3. **Default style** — The built-in `default` style (no custom prompt).

**Precedence when loading custom styles**:

1. **Policy settings** (`~/.claude/output-styles/*.md` with managed flag) — highest precedence.
2. **Project styles** (`./.claude/output-styles/*.md` in current project).
3. **User styles** (`~/.claude/output-styles/*.md` in user home directory).
4. **Plugin styles** (`<plugin-root>/output-styles/*.md` from plugins).
5. **Built-in styles** — always available, lowest precedence.

Later entries in this list override earlier ones (e.g., a project style overrides a user style with the same name).

## Switching output styles

### Via `/output-style` command

```
/output-style Learning
```

Prompts with available styles, then applies the selection to `settings.outputStyle`.

### Via `/config` command

Opens the interactive settings editor; navigate to `outputStyle` and change the value.

### Via settings.json

Edit directly:

```json
{
  "outputStyle": "Explanatory"
}
```

## Style selection flow in code

1. `getAllOutputStyles(cwd)` loads all styles (built-in + custom + plugin) in precedence order.
2. `getOutputStyleConfig()` checks for forced plugin styles first.
3. Falls back to `settings.outputStyle` (defaults to `default`).
4. Returns the matching `OutputStyleConfig` or `null` (meaning no custom prompt).

---

[← Back to OutputStyles/README.md](./README.md)
