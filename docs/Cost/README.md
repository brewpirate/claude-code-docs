# Claude Code Cost Tracking & Rate Limits

Overview of cost accumulation, per-model usage tracking, token budget enforcement, and rate limit handling in Claude Code.

## Table of Contents

1. [How cost tracking works](./how-cost-tracking-works.md)
2. [Token budget and stop conditions](./token-budget-and-stop.md)
3. [Rate limits and early warnings](./rate-limits-and-warnings.md)
4. [Tool result limits](./tool-result-limits.md)
5. [Advisor tool cost](./advisor-cost.md)
6. [Discrepancies and notes](./discrepancies-notes.md)

## Overview

Claude Code tracks API costs per session and enforces multiple layers of budget control:

- **Cost accumulation**: USD, API duration, tool duration, and per-model token usage persisted to project config (only restored when resuming the same session).
- **Per-model breakdown**: Input, output, cache read, cache creation tokens grouped by canonical model name (e.g., "Opus" groups `opus-4-6`, `opus-4-7`).
- **On-exit summary**: When `hasConsoleBillingAccess()` is true, displays cost summary with model breakdowns.
- **Token budget (90% stop)**: Query halts at 90% of `--max-budget-usd` limit; continues below that threshold.
- **Diminishing returns (early stop)**: After 3 continuations, stops if recent token deltas fall below 500 tokens across multiple checks.
- **Rate limit warnings**: Detects when consumption exceeds quota relative to time elapsed (e.g., 90% utilization at 72% of time window for 5-hour limit).
- **Tool result limits**: 50K chars per result (default), 200K aggregate per message, overridable via GrowthBook.

## Quick Reference

| Cost Signal | Where to Find | Source |
|---|---|---|
| **Total USD cost** | `/cost` command, on-exit summary | `formatTotalCost()` in `cost-tracker.ts` |
| **Per-model tokens** | `/stats` command, project config | `ModelUsage` object in `state.js` |
| **Session restoration** | `getStoredSessionCosts()` — only if same session ID | `cost-tracker.ts:87-95` |
| **90% budget trigger** | `TokenBudgetDecision.action === 'stop'` | `checkTokenBudget()` in `query/tokenBudget.ts:64` |
| **Diminishing returns check** | Forced stop after 3 continuations if delta < 500 tokens | `query/tokenBudget.ts:59-62` |
| **Rate limit early warning** | Server `surpassed-threshold` header, fallback thresholds | `EARLY_WARNING_CONFIGS` in `services/claudeAiLimits.ts:53-70` |
| **Tool result size** | Per-tool cap (50K), per-message aggregate (200K) | `constants/toolLimits.ts:13, 49` |
| **Advisor cost** | Telemetry event `tengu_advisor_tool_token_usage` | `cost-tracker.ts:304-321` |
| **Cost display permission** | `hasConsoleBillingAccess()` gates summary output | `costHook.ts:11` |

## See Also

- [../Commands/diagnostics-health.md](../Commands/diagnostics-health.md) — `/cost`, `/stats`, `/usage`, `/extra-usage` commands
- [../Commands/account-subscription.md](../Commands/account-subscription.md) — `/passes`, `/privacy-settings`, `/upgrade`
- [../CLI/README.md](../CLI/README.md) — `--max-budget-usd`, `--max-turns`, `--max-thinking-tokens` flags
- [../ENV/README.md](../ENV/README.md) — `DISABLE_COST_WARNINGS`, `CLAUDE_CODE_EXPERIMENTAL_AGENT_COST_STEER`
- [../Settings/llm-model.md](../Settings/llm-model.md) — effort level (affects input token usage)
- Official docs: <https://code.claude.com/docs/en/cost>
