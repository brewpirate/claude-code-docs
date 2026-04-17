# Keep-Alive and Heartbeats

Long-lived Bridge sessions face two timeout threats: client-side idle detection and upstream proxy idle cutoff. Two independent mechanisms prevent these.

## Bridge Keep-Alive Frames

**Gate**: `CLAUDE_CODE_ENVIRONMENT_KIND=bridge` (env var; CCR containers only)

Bridge-only feature that sends empty `keep_alive` SSE frames to prevent idle timeout through corporate proxies.

### Configuration

**Source**: Statsig config `tengu_bridge_poll_interval_config.session_keepalive_interval_v2_ms`

- **Default**: 120 seconds (2 minutes)
- **Min**: 5 seconds
- **Max**: 300 seconds
- **Disable**: Set to 0 (keep-alive disabled)
- **Type**: Per-deployment; can vary by region

### Behavior

1. **Bridge session starts**: Keep-alive scheduler is initialized
2. **Every N seconds**: Bridge sends `{ type: 'keep_alive' }` SSE frame
3. **Visibility**: Frame is **filtered** before reaching UI; user never sees keep-alive messages
4. **Purpose**: Prevents upstream proxy (e.g., Envoy, HAProxy) from closing idle connections
5. **Failure mode**: If upstream ignores keep-alive, connection still closes; session auto-reconnects

### Frame Format

```
event: keep_alive
id: ka-550e8400-001
data: {}
```

**No payload needed**; presence of frame is sufficient to signal activity.

## CCRClient Heartbeat

**Scope**: All Bridge v2 sessions (local + remote)

The CCRClient coalesces incoming messages and sends periodic heartbeats to the server.

### Configuration

- **Default**: 20 seconds
- **Type**: Hard-coded; not configurable via Statsig
- **Direction**: Client→Server (HTTP POST)
- **Message type**: `heartbeat` control event

### Behavior

1. **Text delta received**: CCRClient buffers the text
2. **100ms idle**: Flush buffer and coalesce into single snapshot
3. **20s no output**: If no text_delta received for 20s, send `heartbeat` POST to signal liveness
4. **Server receives**: Server updates session last-seen timestamp
5. **Purpose**: Prevents server-side timeout; proves client is still connected

### Message Format

```json
{
  "type": "heartbeat",
  "session_id": "sess-abc123",
  "timestamp": 1682000000000
}
```

## Worker Epoch Tracking

The CCRClient tracks `worker_epoch` to detect process restarts:

- **When**: New session initialized or worker process restarted
- **Epoch ID**: UUID or incrementing counter
- **Use case**: Server can detect if CLI crashed and restarted mid-session
- **Behavior**: On epoch change, server may reset pending control_requests or clear partial tool state

## Timeout Scenarios

| Scenario | Timeout | Prevention |
|----------|---------|-----------|
| Upstream proxy idle (Envoy) | 60–120s | Bridge keep-alive (120s default) |
| Server session idle | 30–60min | CCRClient heartbeat (20s) |
| Client TCP socket | Network-dependent | Both keep-alive + heartbeat |
| DNS/TLS renegotiation | Network-dependent | Reconnect logic handles transparently |

## Failure Modes

### Keep-Alive Failure

**If upstream ignores keep-alive frames**:
- Connection closes after timeout
- Client detects close, initiates SSE reconnect
- New connection established; session resumes from last ack'd message
- User experience: Transparent (may see brief stall)

### Heartbeat Failure

**If heartbeat POST fails**:
- Retry with exponential backoff
- Server tolerates up to 3 missed heartbeats (60s) before timeout
- If server times out: Server-side session ends; client gets 404 on next POST
- User experience: Session terminated with "session not found" error

## Cross-Cutting Concerns

### Filtering

Keep-alive frames are **filtered** from:
- UI display (never shown to user)
- Transcript persisting (not saved in v2 session logs)
- Message statistics (not counted as "messages sent")

### Interaction

- **Both active**: Keep-alive + heartbeat coexist; no conflict
- **Local sessions**: Only heartbeat (no keep-alive unless CCR)
- **Remote sessions**: Both (upstream proxy risk + server-side timeout)

### Monitoring

- **Metrics**: Server counts keep-alive/heartbeat events
- **Logs**: CCRClient logs "heartbeat sent" at debug level
- **Alerts**: Excessive missed heartbeats trigger session-at-risk alerts

---

[← Back to Bridge/README.md](./README.md)
