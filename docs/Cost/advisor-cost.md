# Advisor Tool Cost

The Advisor tool runs a **separate LLM backend** to analyze queries and suggest next steps. Its token consumption is tracked separately and added to total session cost.

## Advisor as a Separate Model

When you use the Advisor tool (e.g., `/advisor`), Claude Code invokes a **different model** running on a separate Anthropic backend:

- Advisor has its own token budget
- Advisor's tokens do **not** count against user-facing rate limits
- Advisor's cost is computed separately and merged into session totals

## Cost Accounting

Advisor usage is extracted and costed separately (source: `cost-tracker.ts:304-321`):

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

The `getAdvisorUsage()` function recursively extracts advisor-specific token counts from the usage object and returns them with the advisor's model name.

## Advisor Model Selection

The advisor model is determined by `getAdvisorModel()` (source: `utils/advisor.ts:112-113`):

```ts
export function getAdvisorModel(): string {
  return getInitialSettings().advisorModel
}
```

This reads from user settings (e.g., "claude-opus" or "claude-sonnet") and is configurable.

## Visibility in Cost Summary

When you view `/cost` or see the on-exit summary:
- Total USD includes advisor costs
- Per-model breakdown includes an "Advisor" line if advisor was invoked
- Separate telemetry event `tengu_advisor_tool_token_usage` is logged for analytics

Advisor cost is **transparent** in all cost displays and is not hidden or subsidized.

## Token Budget Interaction

Advisor invocations do **not** consume user query token budget (e.g., `--max-thinking-tokens`). The advisor runs in parallel and has its own internal budget.

However, advisor's output tokens may be included in the context window of subsequent model calls, consuming context space.

---

[← Back to Cost/README.md](./README.md)
