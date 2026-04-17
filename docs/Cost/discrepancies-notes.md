# Discrepancies and Notes

Known gaps and differences between public documentation and internal implementation.

## Cost Restoration Scope

**Public expectation**: Costs accumulate across all sessions in a project.

**Reality**: Costs are only restored if the session ID exactly matches `projectConfig.lastSessionId`. Each new process (or new conversation thread) starts from zero unless explicitly resuming the same session. Previous sessions' costs are overwritten unless manually saved or exported.

**Impact**: Running multiple sequential CLI invocations in a script will show zero cost carry-over between invocations unless they share the same session ID.

## Cache Token Billing

**Claim**: Cache read tokens are free.

**Caveat**: Cache creation tokens incur 25% of the input token rate. Both are properly billed and included in total USD cost calculations.

**What's hidden**: The cache read vs. cache creation split is tracked internally but is not always surfaced to users in all `/cost` display modes. Some views show only aggregate "cache tokens" without breaking down reads vs. creates.

## Diminishing Returns Threshold

**Public expectation**: Budget continues until near-exhaustion.

**Reality**: After 3+ continuations, if token additions drop below 500 tokens on the last two checks, the query stops **immediately**—even if budget remains.

**Impact**: Very long multi-turn sessions may terminate earlier than expected if model responses become terse.

## Rate Limit Thresholds Are Fallbacks

**Claim**: Thresholds at 90% utilization / 72% time window are enforced limits.

**Reality**: These are **fallback heuristics** when the server does not send a `surpassed-threshold` header. Server's actual thresholds may differ. In practice, the server header takes precedence and overrides local thresholds.

**Impact**: If a server sends `surpassed-threshold: 5h` at 75% utilization, the fallback threshold of 90% is bypassed.

## Advisor Cost Not User-Configurable

Advisor model and cost are managed by settings (`advisorModel` key in settings.json), but there is **no setting to disable advisor invocation cost tracking or subsidy**. All advisor usage incurs real cost.

**Impact**: Users cannot opt out of advisor costs via configuration.

## Tool Result Limit Asymmetry

Per-tool limit (50K chars) applies strictly. Per-message limit (200K) is soft and is **recalculated per turn**. A tool's result persisted in turn 1 is **re-evaluated** in turn 2 if the model asks to read it again.

**Impact**: Multiple reads of the same large tool result can cause repeated persistence operations and file IO overhead.

---

[← Back to Cost/README.md](./README.md)
