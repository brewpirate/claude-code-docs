# Remote Sessions

Remote sessions are viewer-only connections where a user (viewer) watches a Claude Code session in real-time without ability to interrupt or modify state. Used by `claude assistant` read-only mode and team collaboration features.

## Session Subscription Endpoint

Remote viewers connect via WebSocket to the same session:

```
GET /v1/sessions/{sessionId}/subscribe
Authorization: Bearer <oauth_token>

Request body:
{
  "type": "auth",
  "credential": {
    "type": "oauth",
    "token": "<viewer_token>"
  }
}
```

**Difference from active sessions**: Viewer token has limited scope; server validates viewer-only permissions.

## WebSocket Handshake

1. **Client opens**: WebSocket to `/v1/sessions/{sessionId}/subscribe`
2. **Server sends challenge**: `{ type: 'challenge', nonce: '...' }`
3. **Client responds**: `{ type: 'auth', credential: { type: 'oauth', token } }`
4. **Server validates**: Token scopes (must include `sessions:read`); session ownership
5. **On success**: `{ type: 'authenticated' }` → streaming begins
6. **On failure**: `{ type: 'error', message: '...' }` → close (1008 policy violation)

## Message Streaming

Once authenticated, server streams:

- **text_delta**: Output text (no interruption allowed)
- **control_request**: Visible but cannot be modified (viewer sees set_model, but cannot change it)
- **tool_call**: Tool invocations (viewer sees input + output)
- **error**: Session errors
- **end_turn**: Turn complete signal

**Filtered from viewer**:
- Permission prompts (internal only)
- Interrupt requests (viewer cannot send)
- Sensitive env vars (not visible in tool input)

## Viewer-Only Mode Behavior

### Restrictions

| Feature | Allowed? | Reason |
|---------|----------|--------|
| View text output | Yes | Core use case |
| View tool calls | Yes | Educational / audit |
| Interrupt session | No | Would interfere with active session |
| Set model | No | Mutable control_request rejected |
| Modify permissions | No | Viewer has read-only scope |
| Change max tokens | No | Mutable control_request rejected |
| View sensitive env | No | Filtered by server before transmission |

### Reconnection

**Normal mode (active sessions)**: 2s reconnect, max 5 attempts

**Viewer mode**: 
- Reconnect: 2s backoff applies initially
- **After 60s silence**: Reconnect disabled (treats connection as permanently closed)
- **Rationale**: Viewer missed real-time events; re-joining mid-session is confusing
- **User experience**: "Session ended" UI; user must manually re-subscribe

## Ping / Keepalive

**Ping interval**: 30s (server→client keep-alive)

- **In viewer mode**: Sent regularly to prevent client-side timeouts
- **Message format**: WebSocket ping frame (not text; handled by WebSocket layer)
- **Client auto-responds**: Pong (no application logic needed)

**Difference from heartbeat**: Ping is WebSocket-level; heartbeat is application-level control_request.

## Title & Session Metadata

**Viewer sees**: Real-time updates to session title, model, max_thinking_tokens (from control_requests)

**Viewer cannot change**: Session title is immutable for viewers (no `set_title` control_request in viewer mode)

**Server enforces**: If viewer tries to POST a mutable request, server returns 403 (forbidden).

## Use Cases

### Team Collaboration

Multiple Claude Code instances working on same task:
- Active user (editor)
- Viewing team members (read-only)
- All see same text_delta stream in real-time
- Only editor can approve permissions or interrupt

### Monitoring

Operations team watches Claude Code session:
- No ability to interrupt (prevents accidents)
- Full visibility into tool calls + results
- Audit trail recorded server-side

### `claude assistant` Command

Public-facing viewer sessions:
- User runs `claude assistant --watch <session_id>`
- Viewer mode enforced (read-only scope)
- No privilege elevation (viewer cannot approve tools)

## Permission Bridge

Remote sessions adapt SDK-level permission requests to local evaluation via **remote permission bridge**:

1. **Server receives**: `SDKControlPermissionRequest` (tool call approval needed)
2. **Adapts to local**: Converts to local permission schema
3. **Returns**: `{ behavior: 'allow' | 'deny', input?: <mutated> }`
4. **Flow**: Used by viewer sessions to evaluate tools without prompting viewer

**Source**: `RemoteSessionManager.ts:40-62`

---

[← Back to Bridge/README.md](./README.md)
