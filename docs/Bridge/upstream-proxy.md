# Upstream Proxy

CCR (Cloud Container Runtime) containers in enterprise deployments may be subject to network policies requiring traffic through a corporate proxy. The upstream proxy mechanism tunnels HTTPS traffic securely through a CONNECT-over-WebSocket bridge.

## Fail-Open Architecture

**Critical guarantee**: A broken or misconfigured upstream proxy **never breaks the session**. Container egress degrades gracefully:

1. **Proxy reachable**: All traffic routed through proxy (enforced MITM inspection)
2. **Proxy unreachable**: Proxy connection fails, but container still has direct internet (if available)
3. **User effect**: Session continues; observability may degrade (proxy bypass = no logs), but Claude still runs

## CONNECT-over-WebSocket Protocol

Enterprise proxies often block direct HTTPS tunnels. The upstream proxy uses WebSocket as the carrier for CONNECT tunnels:

### Transport Mechanism

1. **Client initiates**: WebSocket to bridge server at `wss://bridge.claude.com/upstreamproxy`
2. **Handshake**: Authenticated with session token from `/run/ccr/session_token`
3. **Tunnel request**: Client sends hand-encoded protobuf message (field=1, wire=2) for destination
4. **Server response**: Creates outbound TCP to upstream proxy (e.g., `proxy.corp.com:8080`)
5. **CONNECT request**: Server sends `CONNECT destination.host:443 HTTP/1.1` to upstream proxy
6. **Proxy responds**: `200 Connection established` → transparent tunnel begins
7. **Data flow**: Client ↔ WebSocket ↔ Server ↔ Upstream proxy ↔ Internet

### Protobuf Wire Format

Hand-encoded protobuf (not using protobuf libraries):

```
message UpstreamProxyRequest {
  bytes destination_host = 1;  // wire type 2 (length-delimited)
  int32 port = 2;              // wire type 0 (varint)
}

Encoded:
0x0a               # field 1, wire type 2 (length-delimited)
<len>              # string length (varint)
<destination>      # e.g., "api.openai.com"
0x10               # field 2, wire type 0 (varint)
<port>             # e.g., 0xe7 (231 decimal = 443)
```

### Buffer Sizing

- **Per-request buffer**: 512 KB max
- **Behavior on exceed**: Flush buffer, close tunnel, retry
- **Timeout**: 30s per request (includes proxy handshake + CONNECT overhead)

## Session Token Management

The upstream proxy reads the **session token** from the container filesystem:

**Path**: `/run/ccr/session_token` (or `$CLAUDE_SESSION_INGRESS_TOKEN_FILE`)

- **Permissions**: Readonly 0600 (owner only)
- **Format**: JWT (Base64url-encoded)
- **Used for**: WebSocket auth header: `Authorization: Bearer <token>`
- **Refresh**: Static during container lifetime (no refresh; if expired, container dies)

## CA Certificate Bundle

Corporate proxies perform MITM inspection. To validate the proxy's certificate:

1. **Container starts**: Download CA bundle from secure store (e.g., vault API with session token)
2. **Store location**: `$SSL_CERT_FILE` (typically `/etc/ssl/certs/ca-bundle.crt`)
3. **Environment variable**: Set `SSL_CERT_FILE` in container before any outbound HTTPS
4. **TLS validation**: All HTTPS clients (curl, Node.js, Python) use this bundle
5. **Failure**: If cert invalid, connection fails; proxy misconfiguration alerts team

## Security Hardening

### ptrace Prevention

The upstream proxy process calls:

```c
prctl(PR_SET_DUMPABLE, 0)
```

This blocks:
- `ptrace` attachment (prevents debuggers from inspecting process)
- Core dumps (prevents credentials being written to disk)
- `/proc/[pid]/mem` reads (prevents memory inspection)

**Purpose**: Prevent accidental exposure of session tokens or decrypted HTTPS traffic.

## Configuration

### Environment Variables

| Var | Effect |
|-----|--------|
| `CLAUDE_CODE_ENVIRONMENT_KIND=bridge` | Enables upstream proxy module |
| `SESSION_INGRESS_URL` | Bridge server for proxy WebSocket |
| `CLAUDE_SESSION_INGRESS_TOKEN_FILE` | Path to session JWT |
| `SSL_CERT_FILE` | Path to CA bundle for MITM validation |
| `UPSTREAM_PROXY_ENABLED` | Explicit enable flag (default: true if env vars present) |

### Statsig Feature Flags

Upstream proxy is NOT feature-gated; it's always available in CCR containers (no Statsig check).

## Failure Scenarios & Behavior

| Scenario | Behavior |
|----------|----------|
| **Proxy unreachable** | Log warning; use direct route (if available); session continues |
| **Session token expired** | 401 from proxy auth → fallback to direct (enterprise only) |
| **CA cert missing** | TLS verification fails → retry with direct route |
| **CONNECT rejected** | Upstream proxy returns 407 → fallback to direct |
| **Buffer overflow** | Flush & retry; malicious actors cannot DOS |
| **Timeout (30s)** | Reset tunnel; retry with exponential backoff |

All failures default to **direct internet** (if allowed), never blocking the session.

## Monitoring & Observability

### Logs

Upstream proxy logs at debug level:

```
[UpstreamProxy] Connecting to proxy.corp.com:8080
[UpstreamProxy] CONNECT api.openai.com:443 sent
[UpstreamProxy] Tunnel established; 5120 bytes buffered
[UpstreamProxy] Failover to direct route: no CA cert
```

### Metrics

- Count of proxy tunnels opened
- Count of fallback-to-direct transitions
- Avg tunnel latency
- Buffer overflow incidents

### Admin Dashboard

Enterprise admins can see:
- Per-org proxy health
- Fallback rates (indicates proxy misconfiguration)
- Tunnel success rates

## Sidecar Idle Timeout

Some enterprise deployments run upstream proxy as a sidecar container:

- **Idle timeout**: 50 seconds (typical for sidecars)
- **Prevention**: Same keep-alive frames (120s default) prevent sidecar idle
- **If timeout occurs**: Sidecar dies; next request fails → fallback to direct

---

[← Back to Bridge/README.md](./README.md)
