# CCR v2 SSE Protocol

Server-Sent Events (SSE) is the modern transport for Bridge v2, replacing WebSocket. SSE is one-directional (server→client); outbound requests use HTTP POST.

## Protocol Overview

**Inbound Stream** (SSE):
```
GET /v1/sessions/{sessionId}/stream
Authorization: Bearer <ingress_token>
Accept: text/event-stream
```

**Outbound Requests** (HTTP POST):
```
POST /v1/sessions/{sessionId}/event
Authorization: Bearer <ingress_token>
Content-Type: application/json

{ "type": "text_delta", "content": "..." }
```

## SSE Frame Format

Standard Server-Sent Events with three fields:

```
event: text_delta
id: msg-abc123-001
data: {"type":"text_delta","content":"Hello","model":"opus-4.1"}

event: control_request
id: ctrl-456def-001
data: {"type":"control_request","payload":{"type":"set_model","model":"opus-4"}}

event: heartbeat
id: hb-789ghi-001
data: {}
```

### Frame Fields

| Field | Meaning | Required |
|-------|---------|----------|
| `event:` | Message type (text_delta, control_request, error, heartbeat, keep_alive) | Yes |
| `id:` | Unique message ID (UUID-based); used for echo dedup and ack tracking | Yes |
| `data:` | JSON payload (exact format per event type) | Typically yes |

## Event Types

### text_delta

Server sends text output incrementally:

```json
{
  "type": "text_delta",
  "content": "The answer is...",
  "model": "claude-opus-4.1",
  "eos": false
}
```

**eos** (end-of-stream): Set to `true` on final delta; signals turn complete.

### control_request

Server requests permission or state change (see [Control Requests](./control-requests.md)):

```json
{
  "type": "control_request",
  "request_id": "ctrl-123",
  "payload": {
    "type": "set_model",
    "model": "opus-4"
  }
}
```

### error

Server reports error:

```json
{
  "type": "error",
  "code": 400,
  "message": "Invalid session token"
}
```

### heartbeat

Server sends keep-alive pulse (no data needed):

```json
{
  "type": "heartbeat"
}
```

Used to prevent idle timeout; filtered before UI display.

### keep_alive

Bridge-specific frame to prevent upstream proxy timeout (see [Keep-alive & Heartbeats](./keep-alive-and-heartbeats.md)):

```json
{
  "type": "keep_alive"
}
```

Only sent when `CLAUDE_CODE_ENVIRONMENT_KIND=bridge`.

## Reconnection Policy

SSE client automatically reconnects on disconnect:

1. **Detect disconnect**: Connection closed by network, server timeout, or explicit close
2. **Backoff**: Exponential backoff: 1s → 2s → 4s → 8s → 16s → 30s (max)
3. **Resume**: Reconnect with same `sessionId` and fresh auth token
4. **Dedup**: Echo dedup ring buffer filters messages re-delivered after reconnect
5. **Max attempts**: No hard limit; retries indefinitely with backoff

### Close Codes

| Code | Meaning | Retry? | Backoff |
|------|---------|--------|---------|
| 4001 | Session not found (transient; server restarted?) | Yes | Exponential |
| 401 | Auth failed (token invalid/expired) | No | Immediate 401 error |
| 403 | Auth rejected (permission issue) | No | Immediate 403 error |
| 500–599 | Server error | Yes | Exponential |
| Network close | Connection lost (client network issue) | Yes | Exponential |

### Silence Timeout

If client receives no frame (text_delta, heartbeat, keep_alive, error) for **45 seconds**:

- Client treats connection as dead
- Initiates reconnect immediately (backoff starts at 1s)
- Previous connection is not re-used

## Outbound Messages

Client sends events via HTTP POST:

```
POST /v1/sessions/{sessionId}/event
Authorization: Bearer <token>
Content-Type: application/json
X-Trusted-Device-Token: <device_token> (if enrolled)

{
  "type": "text_delta",
  "content": "User said: hello",
  "source": "user"
}
```

### Outbound Message Types

- `text_delta` — User input, tool results, Claude generation
- `interrupt` — Cancel current operation
- `permission_response` — User approved/denied tool invocation
- `control_response` — Response to server control_request

**Request order**: No guarantee; server processes in receipt order (may race on multi-connection setups).

## Header Refresh

Dynamic token refresh on reconnect (see [Authentication & Tokens](./authentication-and-tokens.md)):

1. Client detects token near-expiry (< 5min remaining)
2. On next reconnect, fetch new token from server
3. Inject new token in `Authorization: Bearer <new_token>` header
4. SSE stream continues with fresh auth

## Performance Characteristics

| Aspect | Value | Notes |
|--------|-------|-------|
| Frame parsing latency | <10ms | JSON parse + routing |
| Echo dedup lookup | O(1) (ring buffer) | Constant-time UUID set |
| Reconnect latency | 1–30s | Exponential backoff |
| Silence detection | 45s | Configurable per deployment |
| Max message size | 4MB | Per frame; configurable |

---

[← Back to Bridge/README.md](./README.md)
