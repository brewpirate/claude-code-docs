# How Cost Tracking Works

Cost accumulation happens continuously during a session. All metrics (USD, API duration, tool duration, per-model tokens) are accumulated in memory and can be saved to the project config for later restoration.

## Per-Session Cost State

A session's costs are stored in `StoredCostState` (source: `cost-tracker.ts:71-80`):

```
{
  totalCostUSD: number
  totalAPIDuration: number           // API call duration in ms
  totalAPIDurationWithoutRetries: number
  totalToolDuration: number          // Total tool execution time in ms
  totalLinesAdded: number            // Lines added across all edits
  totalLinesRemoved: number          // Lines removed across all edits
  lastDuration: number | undefined   // Last turn's duration
  modelUsage: {[modelName: string]: ModelUsage} | undefined
}
```

## Session Restoration

Costs are stored in the project config under a `lastSessionId` key. **Costs are only restored when resuming the exact same session** (`cost-tracker.ts:87-95`):

```ts
export function getStoredSessionCosts(sessionId: string): StoredCostState | undefined {
  const projectConfig = getCurrentProjectConfig()
  // Only return costs if this is the same session that was last saved
  if (projectConfig.lastSessionId !== sessionId) {
    return undefined
  }
  // ...build and return cost state...
}
```

This means each new session starts from zero. Session ID is typically reset on process start unless resuming an explicit conversation thread.

## Per-Model Token Breakdown

`ModelUsage` tracks consumption per model (source: `cost-tracker.ts:181-226`):

```
{
  inputTokens: number
  outputTokens: number
  cacheReadInputTokens: number       // Tokens read from cache (free)
  cacheCreationInputTokens: number   // Tokens written to cache (paid)
  webSearchRequests: number
  totalCostUSD: number
  contextWindowSize: number          // For the model variant
}
```

Models are grouped by **canonical short name** for display. For example:
- `opus-4-6`, `opus-4-7`, `opus[1m]` all display as **"Opus"**
- `sonnet-3-5`, `sonnet-3-6` all display as **"Sonnet"**

This grouping happens via `getCanonicalName()` (imported in `cost-tracker.ts:47`).

## On-Exit Cost Summary

When the process exits, the React effect `useCostSummary()` fires (source: `costHook.ts:6-22`):

```ts
export function useCostSummary(getFpsMetrics?: () => FpsMetrics): void {
  useEffect(() => {
    const f = () => {
      if (hasConsoleBillingAccess()) {
        process.stdout.write('\n' + formatTotalCost() + '\n')
      }
      saveCurrentSessionCosts(getFpsMetrics?.())
    }
    process.on('exit', f)
    return () => {
      process.off('exit', f)
    }
  }, [])
}
```

**Visibility**: The cost summary is only printed if `hasConsoleBillingAccess()` returns true. This gates billing information from non-billing accounts. The summary is always saved to config regardless.

## Cost Calculation

Total USD cost is computed via `calculateUSDCost(model, usage)` which applies published rates:
- Input tokens: lower rate (typically $0.003 per 1M for Opus)
- Output tokens: higher rate (typically $0.015 per 1M for Opus)
- Cache read tokens: free (0.0)
- Cache creation tokens: 25% of input rate (typically $0.00075 per 1M for Opus)

These rates are not configurable at runtime; they are built into the SDK pricing table.

## Telemetry Logging

Cost changes emit analytics events. For standard model usage, the event is implicit. For Advisor tool usage, explicit telemetry is logged (source: `cost-tracker.ts:304-321`):

```ts
for (const advisorUsage of getAdvisorUsage(usage)) {
  const advisorCost = calculateUSDCost(advisorUsage.model, advisorUsage)
  logEvent('tengu_advisor_tool_token_usage', {
    advisor_model: advisorUsage.model,
    input_tokens: advisorUsage.inputTokens,
    output_tokens: advisorUsage.outputTokens,
    cost_usd: advisorCost,
    // ...
  })
  addToTotalSessionCost(advisorCost)
}
```

## Cost Durability

- Costs in memory are **not durable** until `saveCurrentSessionCosts()` is called.
- On-exit hook calls `saveCurrentSessionCosts()` automatically.
- Manual `/save-costs` or equivalent commands can be called mid-session.
- If the process is killed without exit handler running (e.g., `kill -9`), unsaved costs are lost.

---

[← Back to Cost/README.md](./README.md)
