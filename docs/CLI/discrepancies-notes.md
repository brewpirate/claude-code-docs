# Discrepancies & notes


1. **Boolean flag parsing variance:** Some flags accept YAML-style booleans (`true`/`false`) while others require string forms (`"true"`/`"false"`) or flags without arguments. See the FRONTMATTER reference for field-specific parsing rules.

2. **`--system-prompt` and `--system-prompt-file` are mutually exclusive.** The append flags (`--append-system-prompt`, `--append-system-prompt-file`) can be combined with either replacement flag.

3. **Permission modes are case-sensitive.** Valid options are exactly: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`. Other values will error or be ignored.

4. **CLI flag precedence:** CLI flag > environment variable > settings.json default. Explicit CLI arguments always win.

5. **Print mode (`-p`) limitations:** Many features are print-mode-only (e.g., `--max-turns`, `--max-budget-usd`, `--json-schema`). Using them without `-p` may silently ignore the flag.

6. **MCP servers from `--mcp-config` are merged with persisted config.** Use `--strict-mcp-config` to load ONLY from `--mcp-config` and ignore all other sources.

7. **Worktree flags require git:** `--worktree` and `--tmux` only work in a git repository. They will error if not in a git directory.

8. **Session ID must be a valid UUID:** The `--session-id` flag only accepts properly formatted UUIDs. Other formats will error.

9. **Deprecated aliases still accepted:** Flags like `--afk`, `--delegate-permissions` still work but map to `--permission-mode auto`. These are kept for backward compatibility but hidden from help.

10. **Feature-gated flags:** Many undocumented flags are gated by build-time feature flags (`KAIROS`, `BRIDGE_MODE`, `PROACTIVE`, etc.). Their availability depends on the Claude Code build you're using.

---

**Generated:** 2026-04-17  
**Source:** https://code.claude.com/docs/en/cli-reference  
**Additional sources:** https://code.claude.com/docs/en/mcp, https://code.claude.com/docs/en/plugins, https://code.claude.com/docs/en/settings  
**Local source analysis:** `/home/vx-daniel/Downloads/claude-code-main/main.tsx`

---

[← Back to CLI/README.md](./README.md)
