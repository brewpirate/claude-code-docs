# Enterprise & Organization


### `allowManagedHooksOnly`
- **Type:** boolean
- **Default:** unspecified
- **Description:** **Managed-only.** Only managed hooks, SDK hooks, and hooks from plugins force-enabled in managed settings `enabledPlugins` are loaded. User, project, and all other plugin hooks are blocked. Only honored when set by managed/enterprise-controlled settings; ignored in user/project settings.
- **Example:**
  ```json
  {
    "allowManagedHooksOnly": true
  }
  ```

### `allowManagedMcpServersOnly`
- **Type:** boolean
- **Default:** unspecified
- **Description:** **Managed-only.** Only `allowedMcpServers` from managed settings are respected. `deniedMcpServers` still merges from all sources. Users can still add MCP servers, but only the admin-defined allowlist applies. Only honored when set by managed/enterprise-controlled settings; ignored in user/project settings.
- **Example:**
  ```json
  {
    "allowManagedMcpServersOnly": true
  }
  ```

### `allowManagedPermissionRulesOnly`
- **Type:** boolean
- **Default:** unspecified
- **Description:** **Managed-only.** Prevent user and project settings from defining `allow`, `ask`, or `deny` permission rules. Only rules in managed settings apply. Only honored when set by managed/enterprise-controlled settings; ignored in user/project settings.
- **Example:**
  ```json
  {
    "allowManagedPermissionRulesOnly": true
  }
  ```

### `blockedMarketplaces`
- **Type:** object[]
- **Default:** unspecified
- **Description:** **Managed-only.** Blocklist of marketplace sources. Blocked sources are checked before downloading, so they never touch the filesystem.
- **Example:**
  ```json
  {
    "blockedMarketplaces": [
      {
        "source": "github",
        "repo": "untrusted/plugins"
      }
    ]
  }
  ```

### `companyAnnouncements`
- **Type:** string[]
- **Default:** unspecified
- **Description:** Announcements to display to users at startup. If multiple announcements are provided, they will be cycled through at random.
- **Example:**
  ```json
  {
    "companyAnnouncements": [
      "Welcome to Acme Corp! Review our code guidelines at docs.acme.com"
    ]
  }
  ```

### `strictKnownMarketplaces`
- **Type:** boolean
- **Default:** unspecified
- **Description:** **Managed-only.** Allowlist of plugin marketplaces users can add. Undefined = no restrictions, empty array = lockdown. Applies to marketplace additions only. Only honored when set by managed/enterprise-controlled settings; ignored in user/project settings.
- **Example:**
  ```json
  {
    "strictKnownMarketplaces": true
  }
  ```

---

[← Back to settings/README.md](./README.md)
