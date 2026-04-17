# Configuration


### Constructor options (TypeScript)
```typescript
const options = {
  model: "claude-opus-4-7",
  tools: ["Read", "Write", "Bash"],
  allowedTools: ["Read"],
  disallowedTools: ["Bash"],
  permissionMode: "acceptEdits" as PermissionMode,
  maxTurns: 10,
  maxBudgetUsd: 5.0,
  cwd: process.cwd(),
  systemPrompt: "You are a code expert",
  thinking: { type: "adaptive" },
  hooks: { PreToolUse: [{ matcher: "Bash", hooks: [myHook] }] },
  agents: { reviewer: { description: "...", prompt: "...", tools: [...] } },
  mcpServers: { ... },
  settingSources: ["project", "user"],
  enableFileCheckpointing: true,
  canUseTool: async (toolName, input) => ({ behavior: "allow" })
};
```

### Constructor options (Python)
```python
options = ClaudeAgentOptions(
    model="claude-opus-4-7",
    allowed_tools=["Read"],
    disallowed_tools=["Bash"],
    permission_mode="acceptEdits",
    max_turns=10,
    max_budget_usd=5.0,
    cwd=os.getcwd(),
    system_prompt="You are a code expert",
    thinking={"type": "adaptive"},
    hooks={"PreToolUse": [HookMatcher(matcher="Bash", hooks=[my_hook])]},
    agents={"reviewer": {"description": "...", "prompt": "...", "tools": [...]}},
    mcp_servers={...},
    setting_sources=["project", "user"],
    enable_file_checkpointing=True,
    can_use_tool=async_permission_callback
)
```

### Environment variables
- **`CLAUDE_AGENT_SDK_VERSION`:** SDK version string; set automatically by SDK.
- **`CLAUDE_AGENT_SDK_CLIENT_APP`:** Client application identifier; sent in `x-client-app` header.
- **`CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS`:** Set to `1` to disable built-in agent types (rarely used).
- **`CLAUDE_AGENT_SDK_MCP_NO_PREFIX`:** Set to `1` to disable `mcp__` tool-name prefixing.
- **`CLAUDE_CODE_ENTRYPOINT=sdk-ts|sdk-py`:** Automatically set; identifies SDK vs. CLI invocation.

### Settings honored by SDK
Most of `.claude/settings.json` is honored by the SDK. Key settings:
- `permission` rules (allow/deny lists)
- `permissionMode` global default
- `mcpServers` configuration
- `hooks` definitions
- `memory` settings
- Caching and context options
- Tool availability toggles

See [Settings/README.md](../Settings/README.md) for full reference.

---

[← Back to Agent SDK/README.md](./README.md)
