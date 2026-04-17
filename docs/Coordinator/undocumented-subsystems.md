# Undocumented Subsystems

This page documents coordinator-related subsystems that exist in the source code but are not prominently featured in public documentation.

## Coordinator mode gating internals

### Feature gate vs. env var

Coordinator mode requires **both**:

1. **Compile-time feature flag** `COORDINATOR_MODE` — gates entire coordinator subsystem in build
2. **Runtime environment variable** `CLAUDE_CODE_COORDINATOR_MODE` — activates at runtime

The compile-time gate ensures builds without the feature skip all coordinator-related code. The env var allows toggling between normal and coordinator modes without a rebuild.

Source: `coordinator/coordinatorMode.ts:36-40`

### Session mode mismatch handling

If a session is resumed with a different coordinator mode than it was created with:

1. **Detection**: `matchSessionMode()` compares stored session mode to current `isCoordinatorMode()` result
2. **Auto-flip**: If mismatch detected, the env var is updated to match the session's mode
3. **Analytics**: Event `tengu_coordinator_mode_switched` is logged with the destination mode
4. **Reason**: Ensures resumed sessions maintain their original orchestration approach without user intervention

Source: `coordinator/coordinatorMode.ts:49-78`

## Scratchpad implementation detail

The scratchpad path is **dependency-injected** from QueryEngine rather than hard-coded:

- `getCoordinatorUserContext(mcpClients, scratchpadDir?)` receives the scratchpad path as a parameter
- Gating check: `isScratchpadGateEnabled()` calls `checkStatsigFeatureGate_CACHED_MAY_BE_STALE('tengu_scratch')`
- Duplication note: This gate check is duplicated in `utils/permissions/filesystem.ts` to avoid circular dependencies

If scratchpad is gated off, workers never see the path in their context, and no worker-side scratchpad logic is injected.

Source: `coordinator/coordinatorMode.ts:25-27, 104-106`

## Internal tools exclusion list

Four tools are explicitly excluded from worker toolsets to prevent circular orchestration:

```typescript
const INTERNAL_WORKER_TOOLS = new Set([
  'TeamCreate',
  'TeamDelete', 
  'SendMessage',
  'SyntheticOutput'
])
```

These are filtered from `ASYNC_AGENT_ALLOWED_TOOLS` when building the worker context. The filtering logic:

- **Simple mode** (`CLAUDE_CODE_SIMPLE`): Workers get only Bash, Read, Edit
- **Standard mode**: Workers get `ASYNC_AGENT_ALLOWED_TOOLS - INTERNAL_WORKER_TOOLS`

The tools are excluded because:
- **TeamCreate/TeamDelete**: Team-level orchestration, not worker-level
- **SendMessage**: Would let workers become coordinators (circular)
- **SyntheticOutput**: Internal task framework tool

Source: `coordinator/coordinatorMode.ts:29-34, 88-95`

## Coordinator system prompt structure

The coordinator system prompt is built dynamically by `getCoordinatorSystemPrompt()` and includes:

- **Role definition**: Coordinator supervises workers, synthesizes findings, communicates with user
- **Tool descriptions**: Agent, SendMessage, TaskStop, subscribe/unsubscribe PR activity
- **Worker capabilities**: Injected from `workerCapabilities` which varies by CLAUDE_CODE_SIMPLE flag
- **Task workflow phases**: Research → Synthesis → Implementation → Verification
- **Example session flow**: Full walkthrough of coordinator-worker interaction pattern
- **Synthesis requirement**: Emphasis that coordinator must understand findings before delegating

The prompt is not user-editable. Its content reflects the architectural pattern: hierarchical supervision with explicit synthesis steps.

Source: `coordinator/coordinatorMode.ts:111-368`

## Worker context injection

Two types of context are injected into coordinator system prompt:

1. **Worker tools context** (`workerToolsContext`): Comma-separated list of tools workers have access to, plus MCP server names if connected
2. **Scratchpad hint**: If gated on, brief message about `.claude/scratchpad/` and permission-free access

These are injected as part of the coordinator's user context (not system prompt tokens), so they update dynamically without recompilation.

Source: `coordinator/coordinatorMode.ts:80-109`

---

[← Back to Coordinator/README.md](./README.md)
