---
title: "File System Sandbox"
tags: [settings]
---

# File System Sandbox


### `filesystem.allowRead`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Paths to re-allow reading within `denyRead` regions. Takes precedence over `denyRead`. Arrays merge across all settings scopes. Use this to create workspace-only read access patterns. Supports `/`, `~/`, and `./` prefixes.
- **Example:**
  ```json
  {
    "filesystem": {
      "allowRead": ["."]
    }
  }
  ```

### `filesystem.allowWrite`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Additional paths where sandboxed commands can write. Arrays merge across all settings scopes. Also merged with paths from `Edit(...)` allow permission rules. Supports `/`, `~/`, and `./` prefixes.
- **Example:**
  ```json
  {
    "filesystem": {
      "allowWrite": ["/tmp/build", "~/.kube"]
    }
  }
  ```

### `filesystem.denyRead`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Paths where sandboxed commands cannot read. Arrays merge across all settings scopes. Also merged with paths from `Read(...)` deny permission rules. Supports `/`, `~/`, and `./` prefixes.
- **Example:**
  ```json
  {
    "filesystem": {
      "denyRead": ["~/.aws/credentials"]
    }
  }
  ```

### `filesystem.denyWrite`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Paths where sandboxed commands cannot write. Arrays merge across all settings scopes. Also merged with paths from `Edit(...)` deny permission rules. Supports `/`, `~/`, and `./` prefixes.
- **Example:**
  ```json
  {
    "filesystem": {
      "denyWrite": ["/etc", "/usr/local/bin"]
    }
  }
  ```

### `filesystem.allowManagedReadPathsOnly`
- **Type:** boolean
- **Default:** unspecified
- **Description:** **Managed-only.** Only `filesystem.allowRead` paths from managed settings are respected. `denyRead` still merges from all sources. Only honored when set by managed/enterprise-controlled settings; ignored in user/project settings.
- **Example:**
  ```json
  {
    "filesystem": {
      "allowManagedReadPathsOnly": true
    }
  }
  ```

### `sandbox.enabled`
- **Type:** boolean
- **Default:** false
- **Description:** Enable process sandbox to isolate bash commands from your filesystem and network. Sandboxing is available on macOS, Linux, and WSL2.
- **Example:**
  ```json
  {
    "sandbox": {
      "enabled": true
    }
  }
  ```

### `sandbox.autoAllowBashIfSandboxed`
- **Type:** boolean
- **Default:** true
- **Description:** Auto-approve bash commands when sandboxed. When false, bash commands still require permission even in sandbox mode.
- **Example:**
  ```json
  {
    "sandbox": {
      "autoAllowBashIfSandboxed": true
    }
  }
  ```

### `sandbox.excludedCommands`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Commands that should run outside of the sandbox. Allows escape-hatch patterns like `"docker *"`.
- **Example:**
  ```json
  {
    "sandbox": {
      "excludedCommands": ["docker *"]
    }
  }
  ```

### `sandbox.filesystem`
- **Type:** object
- **Default:** unspecified
- **Description:** Nested filesystem sandbox rules containing `allowRead`, `allowWrite`, `denyRead`, `denyWrite`, and `allowManagedReadPathsOnly` keys. Controls paths at the OS-level sandbox boundary.
- **Example:**
  ```json
  {
    "sandbox": {
      "filesystem": {
        "allowWrite": ["/tmp/build"],
        "denyRead": ["~/.aws/credentials"]
      }
    }
  }
  ```

### `sandbox.network`
- **Type:** object
- **Default:** unspecified
- **Description:** Nested network sandbox rules containing `allowedDomains`, `allowUnixSockets`, `allowAllUnixSockets`, `allowLocalBinding`, `allowManagedDomainsOnly`, and `allowMachLookup` keys. Controls network access at the sandbox boundary.
- **Example:**
  ```json
  {
    "sandbox": {
      "network": {
        "allowedDomains": ["github.com", "*.npmjs.org"]
      }
    }
  }
  ```

### `enableWeakerNestedSandbox`
- **Type:** boolean
- **Default:** false
- **Description:** Enable weaker sandbox for unprivileged Docker environments (Linux and WSL2 only). Reduces security by relaxing certain sandbox restrictions. ⚠ Security
- **Example:**
  ```json
  {
    "enableWeakerNestedSandbox": true
  }
  ```

### `enableWeakerNetworkIsolation`
- **Type:** boolean
- **Default:** false
- **Description:** (macOS only) Allow access to the system TLS trust service (`com.apple.trustd.agent`) in the sandbox. Required for Go-based tools like `gh`, `gcloud`, and `terraform` to verify TLS certificates when using `httpProxyPort` with a MITM proxy and custom CA. Reduces security by opening a potential data exfiltration path. ⚠ Security
- **Example:**
  ```json
  {
    "enableWeakerNetworkIsolation": true
  }
  ```

### `allowUnsandboxedCommands`
- **Type:** string[] or boolean
- **Default:** true
- **Description:** Commands allowed to run outside sandbox via the `dangerouslyDisableSandbox` parameter. When set to `false`, the `dangerouslyDisableSandbox` escape hatch is completely disabled and all commands must run sandboxed (or be in `excludedCommands`). Useful for enterprise policies that require strict sandboxing. ⚠ Security
- **Example:**
  ```json
  {
    "allowUnsandboxedCommands": false
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
