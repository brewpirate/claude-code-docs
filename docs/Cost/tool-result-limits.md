# Tool Result Limits

Tool result sizes are capped to prevent excessive context consumption. Limits apply both per-tool and in aggregate per message.

## Per-Tool Result Cap

Each tool's result is capped at **50,000 characters** by default (source: `constants/toolLimits.ts:13`):

```ts
export const DEFAULT_MAX_RESULT_SIZE_CHARS = 50_000
```

When a tool returns more than 50K chars:
1. The result is persisted to disk
2. The model receives a **preview** with the file path instead of full content
3. The model can later fetch the full result using the `Read` tool if needed

This prevents a single large tool result (e.g., `ls -la` on a huge directory) from consuming massive context.

## Per-Message Aggregate Cap

Within a **single user message** (one turn's batch of parallel tool results), the aggregate of all `tool_result` blocks is capped at **200,000 characters** (source: `constants/toolLimits.ts:49`):

```ts
export const MAX_TOOL_RESULTS_PER_MESSAGE_CHARS = 200_000
```

**Behavior**: If a turn has 5 parallel tools whose results sum to 250K chars:
1. Claude Code identifies the largest result blocks
2. Those blocks are persisted to disk and replaced with previews
3. Iteration continues until aggregate <= 200K
4. This happens **per turn**, not across turns (a 150K result in turn 1 and 150K in turn 2 are evaluated independently)

## Token-Based Cap

An additional cap exists at **100,000 tokens** (~400KB of text) (source: `constants/toolLimits.ts:22`):

```ts
export const MAX_TOOL_RESULT_TOKENS = 100_000
```

This is a hard upper bound regardless of character count, preventing pathological token-counting scenarios.

## GrowthBook Override

Both caps are overridable at runtime via the GrowthBook feature flag `tengu_hawthorn_window` (source: `constants/toolLimits.ts:46`, `utils/toolResultStorage.ts:416`):

```ts
// getPerMessageBudgetLimit() checks:
// 1. tengu_hawthorn_window from GrowthBook (if finite and positive)
// 2. Falls back to MAX_TOOL_RESULTS_PER_MESSAGE_CHARS
```

This allows Anthropic to tune limits by cohort without deploying new code.

## Disk Persistence

When a result is persisted:
- File is written to the project's `.claude/tool-results/` directory
- File is named with a hash of the tool invocation
- Model receives preview like: `"Result saved to /path/to/.claude/tool-results/abc123.txt"`
- Model can `Read` the file to access full content if analysis requires it

## Partial Results

If a tool is interrupted (timeout, cancel), the partial result still respects limits. No special handling for partial data.

---

[← Back to Cost/README.md](./README.md)
