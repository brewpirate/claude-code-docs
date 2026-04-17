# Control Requests

Control requests are server-to-client messages that modify session state or request user input. Five control types exist; all are subject to a 10–14 second timeout.

## Control Request Lifecycle

1. **Server sends**: `control_request` message with `type` and `payload`
2. **Client receives**: Parses type and dispatches to handler
3. **Handler runs**: Synchronous or async (e.g., permission prompt)
4. **Client responds**: Sends `control_response` or `error` message
5. **Timeout**: If no response after 10–14s, server logs warning and continues (non-fatal)

## Control Request Types

### 1. Initialize

**Type**: `initialize`

**Payload**:
```json
{
  "model": "claude-opus-4.1",
  "max_thinking_tokens": 8000,
  "permission_mode": "plan",
  "context": {
    "org_id": "550e8400-e29b-41d4-a716-446655440000",
    "session_id": "sess-abc123"
  }
}
```

**Handler**: 
- Stores model and max_thinking_tokens in session state
- Sets permission mode (default, auto, plan, dontAsk, bypassPermissions, acceptEdits)
- Initializes permission evaluator and tool registry
- **Response**: `{ status: 'initialized' }`

**Timeout**: 10s; session continues if init times out (uses fallback mode)

### 2. Set Model

**Type**: `set_model`

**Payload**:
```json
{
  "model": "claude-opus-4.1"
}
```

**Handler**:
- Updates active model for subsequent inference
- Validates model name against whitelist
- **Response**: `{ status: 'model_updated', model: 'claude-opus-4.1' }`

**Timeout**: 10s; model change ignored if timeout

### 3. Set Max Thinking Tokens

**Type**: `set_max_thinking_tokens`

**Payload**:
```json
{
  "max_thinking_tokens": 12000
}
```

**Handler**:
- Updates max thinking token budget
- Validates against model-specific ceiling (e.g., opus ≤ 16k)
- **Response**: `{ status: 'max_thinking_updated', max_thinking_tokens: 12000 }`

**Timeout**: 10s; budget change ignored if timeout

### 4. Set Permission Mode

**Type**: `set_permission_mode`

**Payload**:
```json
{
  "mode": "auto"
}
```

**Handler**:
- Updates permission evaluation strategy
- Valid modes: `default`, `auto`, `plan`, `dontAsk`, `bypassPermissions`, `acceptEdits`
- Clears any pending permission prompts if mode changes
- **Response**: `{ status: 'mode_updated', mode: 'auto' }`

**Timeout**: 10s; mode change ignored if timeout

### 5. Interrupt

**Type**: `interrupt`

**Payload**:
```json
{
  "reason": "user_requested"
}
```

**Handler**:
- Cancels in-flight tool call or inference
- Reasons: `user_requested`, `timeout`, `budget_exceeded`, `token_limit`
- Sends `end_turn` signal to halt generation
- **Response**: `{ status: 'interrupted', reason: 'user_requested' }`

**Timeout**: 14s; interrupt delivered best-effort

## Outbound-Only Mode

When the Bridge is in **outbound-only mode** (e.g., CCR mirror for one-way streaming):

- **Mutable requests rejected**: `set_model`, `set_max_thinking_tokens`, `set_permission_mode` return error
- **Read-only requests allowed**: `initialize` and `interrupt` are permitted
- **Server behavior**: Mutable requests fail with `{ error: 'outbound_only_mode', status: 400 }`

## Server Timeout Behavior

| Timeout (s) | Scenario | Server action |
|------|----------|------|
| 0–10 | Normal (no timeout) | Wait for client response |
| 10–14 | Slow response | Log warning; continue after 14s |
| >14 | Timeout exceeded | Return default response; session continues |

## Response Format

All control responses follow this structure:

```json
{
  "type": "control_response",
  "request_id": "ctrl-123abc",
  "status": "success" | "error",
  "payload": { ... }
}
```

**request_id**: Matches the incoming control_request's `id`; used for deduplication on reconnect.

---

[← Back to Bridge/README.md](./README.md)
