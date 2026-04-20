---
title: "How Tools Work"
tags: [tools]
---


- **Tool dispatch**: Claude receives a list of available tools in its system prompt and names each one in a tool_use block along with structured inputs.
- **Schema validation**: The harness validates each tool call against its input schema before execution.
- **Permissions**: Tools that write or execute are gated by permission rules (allow/ask/deny) defined in `settings.json` or via `/permissions`.
- **Tool classes**: Tools are categorized by side-effect type: read-only (Glob, Grep, Read), writes (Write, Edit), executes (Bash, PowerShell), spawns (Agent, TaskCreate), orchestration (SendMessage, TeamCreate), or meta (Config, ToolSearch).
- **Gating mechanisms**: Some tools are always on; others are entrypoint-gated (SDK-only, local-agent-only, remote-only), feature-flag-gated (env vars like `CLAUDE_CODE_ENABLE_TASKS`), or subscription-gated (Pro/Max).
- **MCP orchestration**: The four MCP tools (ListMcpResources, ReadMcpResource, plus indirect orchestration via Tool Search) are primitives for discovering and using dynamically-registered tools from MCP servers; individual MCP tools themselves are not built-in.
- **Deferred loading**: ToolSearch (when `ENABLE_TOOL_SEARCH=1`) loads tool schemas lazily to reduce initial system prompt size; MCP tools are also deferred until needed.

---

[← Back to Tools/README.md](/claude-code-docs/tools/overview/)
