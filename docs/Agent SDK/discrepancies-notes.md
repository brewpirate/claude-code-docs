# Discrepancies & notes


1. **Type name mismatch:** `PermissionModeSchema` in `coreSchemas.ts` defines modes as `['default', 'acceptEdits', 'bypassPermissions', 'plan', 'dontAsk']` (no `'auto'`). Public docs reference `'auto'` as TypeScript-only. Schema may be outdated or `'auto'` added post-schema-generation.

2. **Control vs. data plane separation:** Public docs emphasize `query()` and message streaming (data plane). Control-plane types (interrupt, set-mode, permissions) are used by SDK implementations (Python SDK, TypeScript SDK) but rarely exposed to end consumers.

3. **SDK-only features:** Control messages (`interrupt`, `abort`, `set_permission_mode`, `rewind_files`, `mcp_status`, `mcp_set_servers`) have no CLI equivalent; they exist only in the SDK.

4. **Hooks in Python vs. TypeScript:** Python SDK does not support `SessionStart` and `SessionEnd` as callback hooks (no entry in `HookEvent` enum). TypeScript SDK supports both. Both SDKs support these as shell command hooks in `settings.json`.

5. **`thinking` config:** Docs mention `thinking` as an optional config field with `type: 'adaptive' | 'enabled' | 'disabled'` and optional `budgetTokens`. Schema includes all three types; availability depends on model.

6. **Environment variable prefixing:** `CLAUDE_AGENT_SDK_*` variables are SDK-specific. Broader CLI env vars (e.g., `ANTHROPIC_API_KEY`, `CLAUDE_CODE_USE_BEDROCK`) also apply to SDK sessions.

7. **MCP tool naming:** Default behavior prefixes MCP tool names with `mcp__<server>__`. Some docs suggest this is configurable; `CLAUDE_AGENT_SDK_MCP_NO_PREFIX` disables it globally, but per-server override not documented.

8. **Setting sources precedence:** When `settingSources` is omitted, SDK defaults to `['project', 'user']`. When set explicitly, you must include `'project'` to load `.claude/settings.json` and `'.mcp.json'`.

9. **File checkpointing:** `enable_file_checkpointing: true` (Python: `enable_file_checkpointing=True`) allows `rewindFiles(userMessageId)` to restore file state to a prior point. Not all states are checkpointable; `rewindFiles()` result includes `canRewind: boolean`.

10. **Async hooks:** Hooks can return `{ async: true, asyncTimeout: 30000 }` to run in background and not block agent. Python uses `async_` (reserved keyword escape). Async hooks cannot block, modify input, or inject context; use only for side effects.

---

[← Back to Agent SDK/README.md](./README.md)
