# Tools present in source but not in public docs


Four tool directories exist in `claude-code-main/tools/` but are NOT listed on the public tools-reference page. Purpose is inferred from directory name and surrounding context — source files were not inspected for this document, so behavior is unverified.

### `MCPTool`
- **Source directory:** `claude-code-main/tools/MCPTool/`
- **Status inference:** Internal — base MCP client primitive
- **Inferred purpose:** Name suggests a generic MCP-tool dispatch primitive that underlies the `mcp__<server>__<tool>` invocation pattern. Likely not user-facing on its own; the user-facing surface is the individual MCP-server tools registered through it. Unverified without source inspection.

### `McpAuthTool`
- **Source directory:** `claude-code-main/tools/McpAuthTool/`
- **Status inference:** Internal — MCP OAuth / authentication flow
- **Inferred purpose:** Name suggests the primitive that completes OAuth or token exchange for MCP servers that require it (cross-reference `MCP_CLIENT_SECRET`, `MCP_OAUTH_CALLBACK_PORT`, `MCP_OAUTH_CLIENT_METADATA_URL` in ENV.md). Likely surfaces to users as the `mcp__<server>__authenticate` and `mcp__<server>__complete_authentication` tool pattern. Unverified without source inspection.

### `REPLTool`
- **Source directory:** `claude-code-main/tools/REPLTool/`
- **Status inference:** Experimental or entrypoint-gated
- **Inferred purpose:** Name suggests an interactive REPL primitive — possibly for running expressions in a stateful session context (JavaScript, Python, etc.). Not listed on the public tools-reference page. Unverified without source inspection.

### `SyntheticOutputTool`
- **Source directory:** `claude-code-main/tools/SyntheticOutputTool/`
- **Status inference:** Test-only
- **Inferred purpose:** Name strongly suggests a test-harness primitive that produces pre-canned tool outputs for unit/integration tests. Almost certainly not user-facing in normal sessions. Unverified without source inspection.

### Directory-to-invocation-name map (for reference)

Most tool directories map directly to the invocation names used above. Where the names differ:

| Source directory | Invocation name |
|------------------|-----------------|
| `FileReadTool/` | `Read` |
| `FileWriteTool/` | `Write` |
| `FileEditTool/` | `Edit` |
| `NotebookEditTool/` | `NotebookEdit` |
| `ScheduleCronTool/` | `CronCreate`, `CronDelete`, `CronList` (three tools share one directory) |
| `BriefTool/` | `BriefTool` (name used directly; not renamed) |
| `SleepTool/` | `SleepTool` (name used directly; not renamed) |
| `LSPTool/` | `LSP` |

All other tool directories drop the `Tool` suffix for their invocation name (e.g., `BashTool/` → `Bash`, `AgentTool/` → `Agent`, `TaskCreateTool/` → `TaskCreate`).

**Note on `Monitor`:** The `Monitor` tool is documented above in Shell & code execution, but **no `MonitorTool/` directory was found in this source snapshot**. The tool may be newer than the snapshot, registered elsewhere in the source tree, or renamed. Treat the source-directory inference for `Monitor` as unverified.

---

[← Back to Tools/README.md](./README.md)
