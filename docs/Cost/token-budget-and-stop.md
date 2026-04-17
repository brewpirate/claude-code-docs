# Token Budget and Stop Conditions

Claude Code enforces two layers of token budget control: an explicit 90% threshold and an automatic diminishing-returns early stop after 3+ continuations.

## 90% Budget Threshold

The primary budget enforcement happens in `checkTokenBudget()` (source: `query/tokenBudget.ts:45-93`):

```ts
const COMPLETION_THRESHOLD = 0.9  // Stop at 90% of budget

export function checkTokenBudget(
  tracker: BudgetTracker,
  agentId: string | undefined,
  budget: number | null,
  globalTurnTokens: number,
): TokenBudgetDecision {
  // ...
  const pct = Math.round((turnTokens / budget) * 100)
  
  if (!isDiminishing && turnTokens < budget * COMPLETION_THRESHOLD) {
    return { action: 'continue', ... }  // Keep going
  }
  
  return { action: 'stop', ... }  // Stop at 90% or higher
}
```

**Behavior**: When `globalTurnTokens >= budget * 0.9`, the query halts and returns a `TokenBudgetDecision` with `action: 'stop'`. The continuation nudge message is **not** displayed at this threshold.

## Diminishing Returns Early Stop

After **3 or more continuations**, if token consumption has slowed (source: `query/tokenBudget.ts:59-62`):

```ts
const isDiminishing =
  tracker.continuationCount >= 3 &&
  deltaSinceLastCheck < DIMINISHING_THRESHOLD &&        // Current delta < 500
  tracker.lastDeltaTokens < DIMINISHING_THRESHOLD       // Last delta < 500
```

When `isDiminishing` is true, the query stops **regardless of remaining budget**. This prevents token churn in scenarios where:
- The model is generating increasingly short responses
- Each continuation adds minimal new tokens
- Continued spinning would waste tokens without proportional gains

**Trigger**: Two consecutive checks with token delta below 500 tokens, after continuation #3.

## Per-Query Budget Limit

Individual queries accept a `--max-budget-usd` CLI flag (source: `QueryEngine.ts:130-173`):

```ts
// maxBudgetUsd is passed from CLI or settings
// It limits this query's cost in isolation
const remaining = maxBudgetUsd - querySessionCost
if (remaining <= 0) {
  return { action: 'stop', ... }
}
```

This is **distinct** from the token-based budget. A query can hit the 90% token threshold before spending the full USD limit, or vice versa.

## Budget Tracking State

The `BudgetTracker` maintains (source: `query/tokenBudget.ts:6-20`):

```ts
type BudgetTracker = {
  continuationCount: number          // # of times continued so far
  lastDeltaTokens: number            // Tokens added in last check
  lastGlobalTurnTokens: number       // Total tokens as of last check
  startedAt: number                  // Unix timestamp when tracking started
}
```

This state is carried across multiple `checkTokenBudget()` calls within a single multi-turn query, allowing the diminishing-returns logic to detect token burn-out.

## Related CLI Flags

- `--max-budget-usd N`: Stop when query cost reaches $N
- `--max-turns N`: Limit multi-turn queries to N exchanges
- `--max-thinking-tokens N`: Limit extended thinking model's reasoning budget

These are orthogonal controls; budget decision logic checks all of them.

## Cost vs. Token Budget

Cost-based budget (`--max-budget-usd`) and token-based budget (90% of `--max-thinking-tokens` or similar) operate independently:
- If you set `--max-budget-usd 0.10` and `--max-thinking-tokens 100000`, the query will stop when it hits 0.10 USD in cost **or** 90000 tokens in thinking budget, whichever comes first.
- Diminishing returns can trigger before either limit is hit.

---

[← Back to Cost/README.md](./README.md)
