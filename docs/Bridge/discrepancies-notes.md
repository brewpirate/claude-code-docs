# Discrepancies & Notes

This section documents known gaps between source code and public documentation, undocumented subsystems, and implementation quirks.

## Undocumented Features

### Echo Deduplication Ring Buffer

**Source**: `bridge/bridgeMessaging.ts:418-461`

A `BoundedUUIDSet` ring buffer maintains fixed-size circular set of recently-seen message IDs:

- **Capacity**: Configurable; typically 1000 messages
- **Behavior**: On transport swap (WebSocket → SSE), filters echo of in-flight events
- **Use case**: High-frequency sessions with reconnects produce duplicate events
- **Implementation**: Ring indexing (oldest entry drops when full); O(1) lookup

**Not documented in**: Public API docs, env var reference, Statsig flags.

### Dynamic Header Refresh Callback

**Source**: `cli/remoteIO.ts:54-93`

When session ingress token nears expiry:

1. **Callback registered**: On WebSocket open / SSE reconnect
2. **Trigger**: Remaining exp time < 5 minutes
3. **Action**: Fetch new token from `/api/sessions/{sessionId}/refresh-token`
4. **Injection**: Update `Authorization` header in-flight (no process restart)
5. **Retry**: Generation guard prevents concurrent refreshes; max 3 failures

**Effect**: Long-lived (>1 hour) sessions survive token expiry without restart.

**Not documented in**: Auth guide, token lifecycle docs.

### Worker Epoch Tracking

**Source**: `cli/transports/ccrClient.ts:260-825+`

CCRClient tracks `worker_epoch` (UUID or counter) to detect process restarts:

- **Set at**: Session init or after worker crash
- **Transmitted**: In heartbeat messages
- **Server uses**: To reset pending control_requests if epoch changes
- **Not persisted**: Resets on every session start

**Not documented in**: Session lifecycle docs, heartbeat protocol docs.

## Protocol Implementation Details

### WebSocket v1 Message Coalescing

**Source**: `cli/transports/ccrClient.ts`

Text delta events are buffered and coalesced:

- **Buffer flush**: Every 100ms of idle time
- **Reason**: Reduce UI re-renders; improve frame rate
- **Effect**: May batch 10–20 small deltas into one snapshot
- **Observable**: Text appears in chunks (not char-by-char)

**Not documented in**: Protocol docs (only SSE is fully documented).

### Outbound-Only Mode (v1 Compatibility)

**Source**: `bridge/bridgeMessaging.ts:210-391`

WebSocket v1 supports outbound-only mode (rare; single-direction streaming):

- **Mutable requests**: `set_model`, etc. return error (400 bad request)
- **Read-only requests**: `initialize`, `interrupt` allowed
- **Use case**: One-way streaming to mirror tool output
- **Not documented in**: Public docs; only in source comments.

## Environment Variables with Multiple Names

Some features have legacy aliases:

| Canonical | Alias | Scope |
|-----------|-------|-------|
| `CLAUDE_CODE_USE_CCR_V2` | `CLAUDE_BRIDGE_USE_CCR_V2` | Bridge v2 transport selection |
| `CLAUDE_ENVIRONMENT_KIND` | (none; no alias) | Environment detection |
| `SESSION_INGRESS_URL` | (none) | Bridge server endpoint |

**Confusion risk**: Documentation may reference either name; both work.

## Statsig Feature Flags (Subject to Change)

These flag names are internal and may be renamed:

- `tengu_ccr_bridge` — Master bridge enable/disable
- `tengu_bridge_repl_v2` — CCR v2 (SSE) transport
- `tengu_cobalt_harbor` — Auto-connect CCR at startup
- `tengu_ccr_mirror` — Outbound-only mirror mode
- `tengu_sessions_elevated_auth_enforcement` — Trusted device requirement
- `tengu_bridge_poll_interval_config.session_keepalive_interval_v2_ms` — Keep-alive interval (object, not flag)
- `tengu_bridge_min_version` — CLI version floor (separate v1/v2 entries)

**Stability**: These are internal; use with caution in production automation.

## Protobuf Encoding in Upstream Proxy

**Source**: `upstreamproxy/relay.ts:56-80+`

The upstream proxy uses hand-encoded protobuf (not protobuf library):

```
field 1 (destination): wire type 2 (length-delimited bytes)
field 2 (port): wire type 0 (varint)
field 3 (options): wire type 2 (optional; length-delimited)
```

**Reason**: Avoid protobuf library dependency in lightweight sidecar container.

**Risk**: Manual encoding is error-prone; no schema validation.

## Trusted Device Token Keychain Storage

**Source**: `bridge/trustedDevice.ts`

Storage varies by platform:

- **macOS**: Keychain (security framework)
- **Windows**: Credential Manager (DPAPI encryption)
- **Linux**: Secret Service (systemd or gnome-keyring backend)

**Fallback**: If keychain unavailable, token stored in plaintext in `~/.claude/trusted-devices.json` (insecure; enterprise should enforce keychain).

**Not documented in**: Setup guides; causes confusion on headless servers.

## Viewer Session Ping Difference

**Source**: `remote/SessionsWebSocket.ts:1-80`

Viewer sessions have asymmetric ping behavior:

- **First 60 seconds**: Normal 30s ping
- **After 60 seconds**: Ping stops; treats connection as "catch-up window closed"
- **User experience**: Viewer cannot re-subscribe mid-session (confusing UX)

**Not documented**: Public docs only mention 30s ping; don't explain the 60s cutoff.

## Session Ingress Token Refresh Retry Chain

**Source**: `bridge/jwtUtils.ts:72-256`

Refresh retry logic:

1. **Generation guard**: Only 1 refresh in flight at a time
2. **Max retries**: 3 consecutive failures
3. **On success**: Reset counter
4. **On 3rd failure**: Session terminated (no fallback to expired token)

**Edge case**: If 3 auth errors occur in rapid succession (network flap), session dies even if network recovers.

**Not documented**: Retry limits not specified in auth guide.

## Compression & Encoding

**Not used**: Neither SSE nor WebSocket transport uses compression (gzip).

**Reason**: Real-time latency critical; handshake overhead not justified.

**Result**: Large model outputs (50K+ tokens) sent uncompressed; downstream proxies may add compression.

## Ordering Guarantees

**SSE outbound (POST) messages**: No ordering guarantee beyond FIFO per endpoint.

**Caveat**: If client sends two POSTs in rapid succession (permission_response + text_delta), server may process in reverse order if network reorder.

**Impact**: Minor; permission_response should be processed before next inference, but real-world impact rare.

---

[← Back to Bridge/README.md](./README.md)
