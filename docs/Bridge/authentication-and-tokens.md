# Authentication and Tokens

Bridge sessions use two independent token types: **session ingress tokens** (short-lived JWTs) and **trusted device tokens** (90-day rolling credentials).

## Session Ingress Token

The session ingress token is a JWT that authorizes the CLI to access a Bridge session.

### Token Flow

1. **Generation**: Server issues JWT when session starts (via `/api/oauth/profile` or CCR bootstrap)
2. **Storage**: 
   - **Web/Cloud**: Encrypted in browser state or session storage
   - **CCR container**: Written to `CLAUDE_SESSION_INGRESS_TOKEN_FILE` (readonly 0600)
3. **Transmission**: 
   - **v1 (WebSocket)**: Sent in handshake `credential.token`
   - **v2 (SSE)**: Sent in `Authorization: Bearer <token>` header
4. **Refresh**: Dynamic refresh on transport reconnection (no process restart needed)

### Token Lifetime & Refresh

- **Expiry**: Parsed from JWT `exp` claim
- **Refresh buffer**: 5 minutes (default); refresh initiated if remaining time < 5min
- **Refresh mechanism**: 
  - **Trigger**: On reconnect, check if exp < now + 5min
  - **Action**: Request fresh token from server via `/api/sessions/{sessionId}/refresh-token`
  - **Retry chain**: Generation-guarded (only 1 refresh in flight at a time); max 3 consecutive failures before error
- **Callback**: Dynamic header refresh callback runs on transport reconnection, updating `Authorization` header with new token

### Failure Modes

| Scenario | Behavior |
|----------|----------|
| Token expired, refresh succeeds | Session continues with new token |
| Token expired, refresh fails 3x | Session terminated with auth error |
| Token invalid format | Permanent auth error; no retry |
| Refresh race (2 reqs in flight) | Generation guard blocks 2nd; uses 1st result |

## Trusted Device Token

Enterprise deployments require a trusted device token to elevate session authentication level.

### Gating

**Feature flag**: `tengu_sessions_elevated_auth_enforcement` (Statsig; subject to change)

- **When enabled**: Sessions default to `SecurityTier=STANDARD`; must enroll trusted device to reach `SecurityTier=ELEVATED`
- **When disabled**: Sessions automatically `ELEVATED` (no enrollment needed)

### Token Details

- **Expiry**: 90-day rolling window
- **Generation**: Issued during `/login` after MFA/biometric check
- **Storage**: OS keychain (macOS Keychain, Windows Credential Manager, Linux Secret Service)
- **Transmission**: HTTP header `X-Trusted-Device-Token` in all Bridge requests
- **Rotation**: Automatic; refreshed with each use; never expires if active

### Enrollment

1. User runs `claude login` (or similar auth flow)
2. MFA / biometric challenge (platform-specific)
3. Server issues trusted device token
4. CLI stores in keychain with org_id as key
5. Future Bridge requests include token; server validates & refreshes

### On Viewer Sessions

Viewer-only remote sessions (e.g., `claude assistant` read-only mode) do NOT require trusted device token elevation; they use baseline `STANDARD` tier authentication.

## Authorization Header Refresh

The Bridge supports dynamic token refresh without process restart:

- **Hook**: Transport reconnection callback (`dynamicHeaderRefreshCallback`)
- **Mechanism**: On SSE reconnect or WebSocket re-handshake, fetch fresh ingress token
- **Effect**: Long-lived sessions can survive token expiry; new token injected mid-session
- **Failure recovery**: If refresh fails, session falls back to expired token; next server response fails with 401

## Related Environment Variables

| Var | Effect |
|-----|--------|
| `CLAUDE_SESSION_INGRESS_TOKEN_FILE` | Path to JWT file in CCR container (read at startup) |
| `CLAUDE_BRIDGE_AUTH_COOKIE` | (Legacy) Auth cookie; deprecated in favor of token header |
| `SESSION_INGRESS_URL` | Bridge server base URL for token refresh requests |

---

[← Back to Bridge/README.md](./README.md)
