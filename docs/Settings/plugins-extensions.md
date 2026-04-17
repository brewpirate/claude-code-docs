# Plugins & Extensions


### `enabledPlugins`
- **Type:** object
- **Default:** unspecified
- **Description:** Map of marketplace-scoped plugin IDs to boolean values indicating whether each plugin is enabled. Format is `"<marketplace>/<plugin-id>": true` or `false`.
- **Example:**
  ```json
  {
    "enabledPlugins": {
      "claude-plugins-official/github": true,
      "claude-plugins-official/web-search": false
    }
  }
  ```

### `extraKnownMarketplaces`
- **Type:** object
- **Default:** unspecified
- **Description:** Additional marketplaces beyond the built-in default marketplace. Maps marketplace identifiers to their configuration details.
- **Example:**
  ```json
  {
    "extraKnownMarketplaces": {
      "my-org-marketplace": {
        "name": "My Organization",
        "url": "https://plugins.example.com"
      }
    }
  }
  ```

### `pluginTrustMessage`
- **Type:** string
- **Default:** unspecified
- **Description:** **Managed-only.** Custom message appended to the plugin trust warning shown before installation. Use this to add organization-specific context, for example to confirm that plugins from your internal marketplace are vetted. Only honored when set by managed/enterprise-controlled settings; ignored in user/project settings.
- **Example:**
  ```json
  {
    "pluginTrustMessage": "All plugins from our marketplace are approved by IT"
  }
  ```

### `strictPluginOnlyCustomization`
- **Type:** boolean
- **Default:** unspecified
- **Description:** Lock skills and agents to plugin delivery only. When enabled, custom skills and agents can only be defined through plugins, preventing user or project-level customization.
- **Example:**
  ```json
  {
    "strictPluginOnlyCustomization": true
  }
  ```

---

[← Back to settings/README.md](./README.md)
