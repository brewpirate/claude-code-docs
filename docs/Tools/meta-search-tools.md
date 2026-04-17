# Meta & search tools


### `ToolSearch`
- **Invoked as:** `ToolSearch`
- **Source directory:** `claude-code-main/tools/ToolSearchTool/`
- **Class:** Meta
- **Side effect:** Read-only
- **Gating:** Feature-flag `ENABLE_TOOL_SEARCH`
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/mcp#scale-with-mcp-tool-search
- **Description:** "Searches for and loads deferred tools when tool search is enabled." When `ENABLE_TOOL_SEARCH=1`, tool schemas are deferred (not loaded initially) to reduce system prompt size. Claude uses ToolSearch to query for and load specific tools on demand.
- **Input parameters:**
  - `query` (string, required) — Search term or tool name
  - `category` (string, optional) — Tool category filter (e.g., `mcp`, `builtin`)
- **Returns:** Matching tool schemas ready to use.
- **Notes:** Feature-flag gated. Only active when `ENABLE_TOOL_SEARCH=1`. Reduces initial context usage by deferring MCP tool loading; schemas are loaded as needed.

### `BriefTool`
- **Invoked as:** `BriefTool`
- **Source directory:** `claude-code-main/tools/BriefTool/`
- **Class:** Session
- **Side effect:** None
- **Gating:** Feature-flag `CLAUDE_CODE_BRIEF`
- **Documented in public docs?:** Not explicitly in tools-reference; inferred from ENV.md gating.
- **Description:** Brief mode control tool. Enables compact, concise output. Requires entitlement or Claude.ai auth. Gated on `CLAUDE_CODE_BRIEF` env flag.
- **Input parameters:**
  - `enable` (boolean, required) — True to enable brief mode
- **Returns:** Confirmation of brief mode status.
- **Notes:** Feature-flag gated. Compact output mode for faster, shorter responses. Requires special entitlement or Claude.ai authentication.

### `SleepTool`
- **Invoked as:** `SleepTool`
- **Source directory:** `claude-code-main/tools/SleepTool/`
- **Class:** Meta
- **Side effect:** None
- **Gating:** Internal/test-only
- **Documented in public docs?:** No
- **Description:** Sleep for a specified duration. Used primarily in testing and internal workflows.
- **Input parameters:**
  - `duration_ms` (number, required) — Number of milliseconds to sleep
- **Returns:** Confirmation after sleep completes.
- **Notes:** Internal/test tool. Not exposed in production documentation. Used for timing control in automated workflows.

---

[← Back to Tools/README.md](./README.md)
