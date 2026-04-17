# Claude Code Bridge & Remote Sessions

The Bridge is Claude Code's infrastructure for remote control sessions, enabling Claude to extend into cloud containers (CCR), viewer-only remote sessions, and corporate proxy environments. This hub documents the feature gating, authentication, protocol mechanics, and upstream proxy setup.

## Table of Contents

1. [How the Bridge works](./how-bridge-works.md)
2. [Feature gating (6-layer flow)](./feature-gating.md)
3. [Authentication and tokens](./authentication-and-tokens.md)
4. [Work secret payload](./work-secret.md)
5. [Control requests](./control-requests.md)
6. [CCR v2 SSE protocol](./ccr-v2-sse-protocol.md)
7. [Keep-alive and heartbeats](./keep-alive-and-heartbeats.md)
8. [Remote sessions](./remote-sessions.md)
9. [Upstream proxy](./upstream-proxy.md)
10. [Discrepancies & notes](./discrepancies-notes.md)

## Overview

**10 sections**, focused on enterprise-grade remote execution and secure session management.

| # | Section | Description | Scope |
|---|---------|-------------|-------|
| 1 | [How the Bridge works](./how-bridge-works.md) | CCR v1 (WebSocket) vs. v2 (SSE), session lifecycle, when each is used. | Architecture |
| 2 | [Feature gating (6-layer flow)](./feature-gating.md) | Compile-time flag, subscriber check, Statsig gates, profile scope, org UUID, CLI version floor. | Gates & auth |
| 3 | [Authentication and tokens](./authentication-and-tokens.md) | Session ingress token refresh, JWT exp parsing, trusted device token (90-day), elevation enforcement. | Auth flows |
| 4 | [Work secret payload](./work-secret.md) | Base64url JSON with ingress token, API URL, git sources, env vars, MCP config. `use_code_sessions` flag. | Transport |
| 5 | [Control requests](./control-requests.md) | Server-inbound lifecycle: initialize, set_model, max_thinking, permission_mode, interrupt. 10–14s timeout. | Server msgs |
| 6 | [CCR v2 SSE protocol](./ccr-v2-sse-protocol.md) | Frame format (event/id/data), reconnect backoff (1–30s), silence timeout (45s), close codes (4001 transient). | Protocol |
| 7 | [Keep-alive and heartbeats](./keep-alive-and-heartbeats.md) | Bridge-only 120s keep-alive, 20s CCRClient heartbeat, Envoy idle timeout prevention. | Heartbeats |
| 8 | [Remote sessions](./remote-sessions.md) | WebSocket handshake, viewer-only mode, 30s ping, 2s reconnect, 60s ping disabled in viewer mode. | Viewers |
| 9 | [Upstream proxy](./upstream-proxy.md) | CONNECT-over-WebSocket egress tunnel, CA bundle injection, secure session token management, fail-open semantics. | Enterprise |
| 10 | [Discrepancies & notes](./discrepancies-notes.md) | Known gaps: CCR v1 WebSocket details, echo dedup ring buffer, dynamic token refresh callback, protobuf wire format. | Undocumented |

## Quick Reference — Feature Gates

| Feature | Gate | Default | Effect |
|---------|------|---------|--------|
| Bridge feature gating | `BRIDGE_MODE` (compile-time) + 5 runtime checks | Enterprise only | Requires Claude.ai subscription + Statsig flag + org UUID |
| CCR v2 (SSE transport) | `CLAUDE_CODE_USE_CCR_V2` + `tengu_bridge_repl_v2` | Off | Uses SSE instead of WebSocket; auto-selected for CCR v2 containers |
| Bridge REPL v2 | `tengu_bridge_repl_v2` (Statsig flag) | Off | Env-less REPL bridge path; subject to change |
| Auto-connect CCR | `tengu_cobalt_harbor` (Statsig flag) | Off | Connects to CCR at startup via `remoteControlAtStartup` |
| CCR mirror mode | `tengu_ccr_mirror` (Statsig flag) | Off | Outbound-only mirror mode for local sessions |
| Trusted device enforcement | `tengu_sessions_elevated_auth_enforcement` (Statsig flag) | Off | Requires 90-day rolling trusted device token to elevate session |

## See Also

- [../ENV/README.md](../ENV/README.md) — environment variables (`CLAUDE_CODE_USE_CCR_V2`, `CLAUDE_CODE_ENVIRONMENT_KIND`, `SESSION_INGRESS_URL`, `CLAUDE_SESSION_INGRESS_TOKEN_FILE`)
- [../CLI/README.md](../CLI/README.md) — `--remote`, `--teleport`, `--from-pr` flags; `claude assistant` command
- [../Commands/ide-integrations.md](../Commands/ide-integrations.md) — `/remote-control`, `/remote-env`, `/teleport` commands
- [../Permissions/README.md](../Permissions/README.md) — remote permission bridge (SDK `SDKControlPermissionRequest` adaptation)
- Official docs: <https://code.claude.com/docs/en/remote-control>, <https://code.claude.com/docs/en/web-sessions>
