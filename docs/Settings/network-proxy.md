# Network & Proxy


### `network.allowedDomains`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Array of domains to allow for outbound network traffic. Supports wildcards (e.g., `*.example.com`). When set, only listed domains can be accessed via WebFetch or outbound connections.
- **Example:**
  ```json
  {
    "network": {
      "allowedDomains": ["github.com", "*.npmjs.org"]
    }
  }
  ```

### `network.allowManagedDomainsOnly`
- **Type:** boolean
- **Default:** unspecified
- **Description:** **Managed-only.** Only `allowedDomains` and `WebFetch(domain:...)` allow rules from managed settings are respected. Domains from user, project, and local settings are ignored. Non-allowed domains are blocked automatically without prompting. Only honored when set by managed/enterprise-controlled settings; ignored in user/project settings.
- **Example:**
  ```json
  {
    "network": {
      "allowManagedDomainsOnly": true
    }
  }
  ```

### `network.httpProxyPort`
- **Type:** number
- **Default:** unspecified
- **Description:** Custom HTTP proxy port. If not specified, Claude will run its own proxy. Use this when you have an existing HTTP proxy you want to route traffic through.
- **Example:**
  ```json
  {
    "network": {
      "httpProxyPort": 8080
    }
  }
  ```

### `network.socksProxyPort`
- **Type:** number
- **Default:** unspecified
- **Description:** Custom SOCKS5 proxy port. If not specified, Claude will run its own proxy. Use this when you have an existing SOCKS5 proxy you want to route traffic through.
- **Example:**
  ```json
  {
    "network": {
      "socksProxyPort": 8081
    }
  }
  ```

### `network.allowUnixSockets`
- **Type:** string[]
- **Default:** unspecified
- **Description:** (macOS only) Unix socket paths accessible in sandbox. Ignored on Linux and WSL2, where the seccomp filter cannot inspect socket paths; use `allowAllUnixSockets` instead.
- **Example:**
  ```json
  {
    "network": {
      "allowUnixSockets": ["~/.ssh/agent-socket"]
    }
  }
  ```

### `network.allowAllUnixSockets`
- **Type:** boolean
- **Default:** false
- **Description:** Allow all Unix socket connections in sandbox. On Linux and WSL2 this is the only way to permit Unix sockets, since it skips the seccomp filter that otherwise blocks `socket(AF_UNIX, ...)` calls. ⚠ Security
- **Example:**
  ```json
  {
    "network": {
      "allowAllUnixSockets": true
    }
  }
  ```

### `network.allowLocalBinding`
- **Type:** boolean
- **Default:** false
- **Description:** (macOS only) Allow binding to localhost ports. When enabled, sandboxed commands can open local server ports.
- **Example:**
  ```json
  {
    "network": {
      "allowLocalBinding": true
    }
  }
  ```

### `network.allowMachLookup`
- **Type:** string[]
- **Default:** unspecified
- **Description:** (macOS only) Additional XPC/Mach service names the sandbox may look up. Supports a single trailing `*` for prefix matching. Needed for tools that communicate via XPC such as the iOS Simulator or Playwright.
- **Example:**
  ```json
  {
    "network": {
      "allowMachLookup": ["com.apple.coresimulator.*"]
    }
  }
  ```

---

[← Back to settings/README.md](./README.md)
