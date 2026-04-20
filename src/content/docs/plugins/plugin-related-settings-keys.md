---
title: "Plugin-related settings keys"
tags: [plugins, settings]
---


From [Settings/plugins-extensions.md](/claude-code-docs/settings/plugins-extensions/):

- **`enabledPlugins`** — Object mapping plugin IDs (format: `name@marketplace`) to boolean enable/disable state. Can be set per scope (user, project, local).
- **`extraKnownMarketplaces`** — Array of custom marketplace sources. Each entry is a marketplace identifier or connection string (GitHub repo, HTTP URL, local path).
- **`pluginTrustMessage`** — Custom message shown to users when a plugin requests elevated permissions.
- **`strictPluginOnlyCustomization`** — Boolean. When `true`, only plugins in the managed allow-list can be enabled; all user-installed plugins are blocked. Managed-only setting.

From [Settings/enterprise-organization.md](/claude-code-docs/settings/enterprise-organization/):

- **`blockedMarketplaces`** — Array of marketplace identifiers that are blocked by enterprise policy. Managed-only setting.
- **`strictKnownMarketplaces`** — Boolean. When `true`, only marketplaces in `extraKnownMarketplaces` are allowed. Managed-only setting.

---

[← Back to Plugins/README.md](/claude-code-docs/plugins/overview/)
