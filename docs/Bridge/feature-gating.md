# Feature Gating (6-Layer Flow)

The Bridge is exclusively enterprise-tier. Access requires six sequential checks; any failure blocks the feature.

## Layer 1: Compile-Time Feature Flag

**Gate**: `BRIDGE_MODE` (Rust feature flag)

- **Status**: Only `prod` and `staging` builds enable this feature
- **Effect**: If disabled, entire Bridge subsystem is compiled out; no runtime access possible
- **User experience**: No commands, no env vars, no prompts—feature doesn't exist

## Layer 2: Claude.ai Subscription Check

**Gate**: `isClaudeAISubscriber()`

- **Source**: Profile check via `/api/oauth/profile`
- **Excludes**: 
  - Bedrock API access
  - Vertex AI API access
  - Console API access (non-OAuth)
  - `apiKey`-based authentication
- **Effect**: Only users with active Claude.ai Pro/Team subscriptions pass
- **Failure**: Session rejected with auth error

## Layer 3: Statsig Feature Flag

**Gate**: `tengu_ccr_bridge` (Statsig feature flag; name subject to change)

- **Type**: Boolean gate (on/off per user/org)
- **Control**: Anthropic operations team
- **Effect**: Allows gradual rollout; can be turned off per-user for debugging
- **Failure**: Bridge disabled at runtime even if layers 1–2 pass
- **Related flags**:
  - `tengu_bridge_repl_v2` — Use CCR v2 (SSE) instead of v1 (WebSocket)
  - `tengu_cobalt_harbor` — Auto-connect CCR at startup
  - `tengu_ccr_mirror` — Outbound-only mirror mode
  - `tengu_sessions_elevated_auth_enforcement` — Require trusted device token

## Layer 4: Profile Scope Check

**Gate**: `hasProfileScope()`

- **Requirement**: OAuth scope includes `profile`
- **Excludes**: Environment variable-based tokens (not full OAuth)
- **Effect**: Validates token has user identity + org context
- **Failure**: Session rejected; user must re-authenticate via OAuth

## Layer 5: Organization UUID

**Gate**: Extract from `/api/oauth/profile` response

- **Requirement**: Profile response includes `org_id` (UUID v4)
- **Effect**: Identifies org for upstream proxy config, session isolation, and audit
- **Failure**: No org context; session cannot initialize

## Layer 6: CLI Version Floor

**Gate**: `tengu_bridge_min_version` (Statsig; separate v1/v2 entries)

- **Check**: CLI version ≥ floor specified in config (e.g., `2.5.0` for v1, `3.0.0` for v2)
- **Type**: Two independent floors:
  - `tengu_bridge_min_version_v1` — minimum for WebSocket (v1)
  - `tengu_bridge_min_version_v2` — minimum for SSE (v2)
- **Effect**: Ensures CLI supports required protocol features (frame format, auth scheme, etc.)
- **Failure**: User sees upgrade prompt; Bridge unavailable until CLI updated

## Gating Flow Diagram

```
Request to bridge/bridgeEnabled.ts
        ↓
  [Layer 1] BRIDGE_MODE feature?
        ↓ (no: return false)
  [Layer 2] isClaudeAISubscriber()?
        ↓ (no: return false)
  [Layer 3] tengu_ccr_bridge Statsig flag?
        ↓ (no: return false)
  [Layer 4] hasProfileScope()?
        ↓ (no: return false)
  [Layer 5] org_id present in profile?
        ↓ (no: return false)
  [Layer 6] CLI version ≥ tengu_bridge_min_version?
        ↓ (no: return false)
        ↓
    Bridge enabled ✓
```

## Related Environment Variables

| Var | Effect | Type |
|-----|--------|------|
| `CLAUDE_CODE_ENVIRONMENT_KIND=bridge` | Signals running in CCR container; enables bridge-only features (keep-alive, upstream proxy) | string |
| `SESSION_INGRESS_URL` | Bridge server endpoint for this session | URL |
| `CLAUDE_SESSION_INGRESS_TOKEN_FILE` | Path to JWT token file (CCR container) | path |
| `CLAUDE_CODE_USE_CCR_V2` | Force SSE transport (v2) instead of WebSocket (v1) | bool |
| `CLAUDE_BRIDGE_USE_CCR_V2` | Alias; legacy name for above | bool |

---

[← Back to Bridge/README.md](./README.md)
