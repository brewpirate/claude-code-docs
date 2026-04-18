---
title: "Agent SDK Overview"
description: "SDK for building custom agents"
---

# Claude Code Agent SDK

Reference for embedding Claude Code as a library via the Python or TypeScript Agent SDK. Covers the message protocol, control plane, session lifecycle, tool/hook/MCP bridging, and how the SDK diverges from the CLI.

## Table of Contents

1. [How the Agent SDK works](./how-the-agent-sdk-works.md)
2. [Session lifecycle](./session-lifecycle.md)
3. [Message protocol](./message-protocol.md)
4. [Content block types](./content-block-types.md)
5. [Tool bridging](./tool-bridging.md)
6. [Hook integration](./hook-integration.md)
7. [MCP integration](./mcp-integration.md)
8. [Configuration](./configuration.md)
9. [Language bindings](./language-bindings.md)
10. [Streaming & events](./streaming-events.md)
11. [Permissions in SDK](./permissions-in-sdk.md)
12. [Session management functions](./session-management-functions.md)
13. [Additional SDK subsystems (by file name, unverified without inspection)](./additional-sdk-subsystems.md)
14. [Discrepancies & notes](./discrepancies-notes.md)

## Overview

**14 sections**, **42 entries** across message types, control messages, and subsystems.

| # | Section | Description | Entries |
|---|---------|-------------|---------|
| 1 | [How the Agent SDK works](./how-the-agent-sdk-works.md) | Two language bindings, entrypoint envs, data vs control plane, session identity, streaming, tool/hook/MCP bridging, permission callbacks. | narrative |
| 2 | [Session lifecycle](./session-lifecycle.md) | Create, resume, abort, interrupt, set-mode — programmatic session control via the control-plane schema. | 6 entries |
| 3 | [Message protocol](./message-protocol.md) | User / assistant / result / system / status / partial / rate_limit / streamlined_text message types and their shapes. | 4 entries |
| 4 | [Content block types](./content-block-types.md) | text, thinking, tool_use, tool_result, image, document, redaction — the 7 content block kinds. | narrative |
| 5 | [Tool bridging](./tool-bridging.md) | Built-in tool inheritance, SDK-registered custom tools, in-process MCP servers, and the `canUseTool` callback. | 3 entries |
| 6 | [Hook integration](./hook-integration.md) | How SDK-registered hooks reuse the same 26 event types as CLI hooks; callback shape. | 3 entries |
| 7 | [MCP integration](./mcp-integration.md) | `SdkControlTransport` for in-process MCP servers, per-session config, `CLAUDE_AGENT_SDK_MCP_NO_PREFIX`. | 4 entries |
| 8 | [Configuration](./configuration.md) | Constructor options, env vars (`CLAUDE_AGENT_SDK_*`, `CLAUDE_CODE_ENTRYPOINT`), and inherited settings.json keys. | 4 entries |
| 9 | [Language bindings](./language-bindings.md) | TypeScript (`@anthropic-ai/claude-code`) and Python (`claude-code`) — installation, minimal usage, key exports. | 2 entries |
| 10 | [Streaming & events](./streaming-events.md) | Event protocol surface — message chunks, tool use start/stop, thinking, compaction, task events. | 3 entries |
| 11 | [Permissions in SDK](./permissions-in-sdk.md) | `canUseTool` callback as the SDK's rule-system replacement; mid-session mode changes via control message. | 3 entries |
| 12 | [Session management functions](./session-management-functions.md) | Programmatic entry points for session creation, resumption, abort, interrupt, and state queries. | 10 entries |
| 13 | [Additional SDK subsystems (by file name, unverified without inspection)](./additional-sdk-subsystems.md) | Hedged references to internal files not inspected — `sdkEventQueue`, `sdkProgress`, `sdkMessageAdapter`, `SdkControlTransport`. | narrative |
| 14 | [Discrepancies & notes](./discrepancies-notes.md) | Type/schema mismatches, SDK-only features (rewind, mcp_set_servers), CLI-only features absent from SDK. | narrative |

## Quick reference — SDK types

| Type | Concern | Shape | Source |
|------|---------|-------|--------|
| `SDKUserMessage` | User input | `type: 'user'`, message (Anthropic SDK), content, parent_tool_use_id, session_id | `coreSchemas.ts` |
| `SDKAssistantMessage` | Agent response | `type: 'assistant'`, message (Anthropic SDK), parent_tool_use_id, uuid, session_id | `coreSchemas.ts` |
| `SDKResultMessage` (success/error) | Final outcome | `type: 'result'`, subtype, result or error, usage, uuid, session_id | `coreSchemas.ts` |
| `SDKSystemMessage` | Session metadata | `type: 'system'`, subtype: 'init', agents, api_key_source, mcp_servers | `coreSchemas.ts` |
| `SDKStatusMessage` | Progress event | `type: 'status'`, status, uuid, session_id | `coreSchemas.ts` |
| `SDKPartialAssistantMessage` | Streaming chunk | `type: 'partial_assistant'`, delta, uuid, session_id | `coreSchemas.ts` (when `includePartialMessages: true`) |
| `SDKRateLimitEvent` | Rate limit change | `type: 'rate_limit_event'`, rate_limit_info, uuid, session_id | `coreSchemas.ts` |
| `SDKStreamlinedTextMessage` | Compacted text | `type: 'streamlined_text'`, text summary, uuid, session_id | `coreSchemas.ts` |
| `Query` | Async stream | AsyncIterable<SDKMessage>, methods: interrupt(), rewindFiles(), setPermissionMode(), setModel(), supportedModels(), supportedAgents(), mcpServerStatus(), accountInfo() | `agentSdkTypes.ts` |
| `ClaudeSDKClient` | Session client | Persistent handle; methods: query(), receive_response(), interrupt(), setPermissionMode(), close() | Python SDK |
| `Options` | Query config | Partial type: model, tools, allowed_tools, disallowed_tools, permission_mode, hooks, agents, mcp_servers, thinking, max_turns, setting_sources, cwd, system_prompt, thinking, max_budget_usd, enable_file_checkpointing | `agentSdkTypes.ts` |
| `ClaudeAgentOptions` | Agent config | Python variant of Options; same fields, snake_case naming | `agentSdkTypes.ts` |
| `ThinkingConfig` | Reasoning control | `type: 'adaptive'` \| `'enabled'` \| `'disabled'`, optional budgetTokens | `coreSchemas.ts` |
| `PermissionMode` | Tool access | `'default'` \| `'dontAsk'` \| `'acceptEdits'` \| `'bypassPermissions'` \| `'plan'` \| `'auto'` | `coreSchemas.ts` |
| `HookMatcher` | Hook filter | `matcher?: string`, `hooks: HookCallback[]`, `timeout?: number` | `controlSchemas.ts` |
| `HookCallback` | Hook function | `(input: HookInput, toolUseID?: string, context?: { signal: AbortSignal }) => Promise<HookOutput>` | `agentSdkTypes.ts` |

## See Also

- [../Tools/README.md](../Tools/README.md) — built-in tools inherited by SDK sessions.
- [../Hooks/README.md](../Hooks/README.md) — the 26 hook events also trigger in SDK sessions.
- [../Permissions/README.md](../Permissions/README.md) — rules and modes honored by the SDK's `canUseTool` callback.
- [../Settings/README.md](../Settings/README.md) — settings.json keys inherited by SDK.
- [../ENV/README.md](../ENV/README.md) — `CLAUDE_AGENT_SDK_*` and `CLAUDE_CODE_ENTRYPOINT=sdk-ts|sdk-py` env vars.
- [../CLI/README.md](../CLI/README.md) — `--print` / `-p` flag and other SDK-adjacent CLI options.
- [../Plugins/README.md](../Plugins/README.md) — plugins work identically in SDK and CLI sessions.
- Official docs: <https://code.claude.com/docs/en/agent-sdk/overview>
