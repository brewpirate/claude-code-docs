# Plugin-related settings keys


From [Settings/plugins-extensions.md](/home/vx-daniel/zen-claude/docs/Settings/plugins-extensions.md):

- **`enabledPlugins`** — Object mapping plugin IDs (format: `name@marketplace`) to boolean enable/disable state. Can be set per scope (user, project, local).
- **`extraKnownMarketplaces`** — Array of custom marketplace sources. Each entry is a marketplace identifier or connection string (GitHub repo, HTTP URL, local path).
- **`pluginTrustMessage`** — Custom message shown to users when a plugin requests elevated permissions.
- **`strictPluginOnlyCustomization`** — Boolean. When `true`, only plugins in the managed allow-list can be enabled; all user-installed plugins are blocked. Managed-only setting.

From [Settings/enterprise-organization.md](/home/vx-daniel/zen-claude/docs/Settings/enterprise-organization.md):

- **`blockedMarketplaces`** — Array of marketplace identifiers that are blocked by enterprise policy. Managed-only setting.
- **`strictKnownMarketplaces`** — Boolean. When `true`, only marketplaces in `extraKnownMarketplaces` are allowed. Managed-only setting.

---

[← Back to Plugins/README.md](./README.md)
