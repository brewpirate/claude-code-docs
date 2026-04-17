# Rate Limits and Early Warnings

Claude Code monitors API quota consumption and warns when usage is accelerating faster than the allowed rate window. Warnings are based on server headers or configurable fallback thresholds.

## Rate Limit Windows

Claude AI subscriptions have quota windows enforced by Anthropic's servers (source: `services/claudeAiLimits.ts:29-35`):

| Rate Limit Type | Duration | Typical Quota |
|---|---|---|
| `five_hour` | 5 hours | Varies by plan |
| `seven_day` | 7 days | Varies by plan |
| `overage` | Current billing period | Additional cost |

Free and Pro plans have stricter five-hour limits; Max plans have larger seven-day windows. Exceeding quota triggers server rejection.

## Early Warning Thresholds

Claude Code warns **before** hitting the hard quota limit by comparing utilization % to time elapsed % (source: `services/claudeAiLimits.ts:53-70`):

```
Five-hour window:
  Warn if:  usage >= 90% AND time elapsed <= 72%

Seven-day window (tiered):
  Warn if:  usage >= 75% AND time elapsed <= 60%
  Warn if:  usage >= 50% AND time elapsed <= 35%
  Warn if:  usage >= 25% AND time elapsed <= 15%
```

**Interpretation**: If you've consumed 90% of quota but only 72% of the 5-hour window has elapsed, you're consuming quota ~25% faster than sustainable. Warning fires.

## Server Header Precedence

The server may send a `surpassed-threshold` header indicating which quota is stressed:

```
surpassed-threshold: 5h           → Maps to 'five_hour' limit
surpassed-threshold: 7d           → Maps to 'seven_day' limit
surpassed-threshold: overage      → Over-quota, cost incurring
```

If the server sends this header, it takes precedence over fallback thresholds. Otherwise, Claude Code uses the configured thresholds above.

## Warning Messages

When a threshold is crossed, the warning message includes:
- Which rate limit window is stressed (e.g., "5-hour session limit")
- Current utilization and time remaining
- Suggested action (slow down, wait, or upgrade)

Users can suppress warnings via `DISABLE_COST_WARNINGS` environment variable.

## Mock Rate Limits (Internal/Ant Only)

For testing, the `/mock-limits` command simulates rate scenarios (source: `services/rateLimitMocking.ts:20-60`):

```
/mock-limits five-hour      # Simulate 5-hour exhaustion
/mock-limits seven-day      # Simulate 7-day exhaustion
/mock-limits overage        # Simulate overage scenario
```

This is **not available to external users** and requires internal ant credentials.

## Quota Patterns by Plan

- **Free**: Strict five-hour limit, low token allowance per hour
- **Pro**: Higher five-hour limit, can hit seven-day limits under sustained use
- **Max**: Higher seven-day limit, rarely hits five-hour unless in very intense session

Exact limits are negotiated per account and not publicly advertised.

## Non-Interactive Sessions

In non-interactive mode (e.g., batch processing), rate limit warnings are logged but do not block execution. The user must manually check warning logs and adjust workload.

---

[← Back to Cost/README.md](./README.md)
