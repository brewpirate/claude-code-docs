# Additional SDK subsystems (by file name, unverified without inspection)


- **`utils/sdkEventQueue.ts`:** Event-queue backend; manages streaming buffering and pause/resume.
- **`utils/task/sdkProgress.ts`:** Task progress reporting; tracks subagent and tool execution milestones for UI.
- **`remote/sdkMessageAdapter.ts`:** Adapter layer between SDK message format and internal CLI protocol; serialization/deserialization.
- **`services/mcp/SdkControlTransport.ts`:** MCP control transport for in-process MCP server spawning and lifecycle.
- **`services/mcp/vscodeSdkMcp.ts`:** VS Code-specific SDK MCP integration; IDE-aware tool discovery.

---

[← Back to Agent SDK/README.md](./README.md)
