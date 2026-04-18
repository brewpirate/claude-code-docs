---
title: "Marketplace concept"
---

# Marketplace concept


### Official marketplace
- **Source:** Anthropic-curated plugins hosted on Google Cloud Storage.
- **Gating:** Controlled by `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL` environment variable. Set to `1` to disable auto-sync of the official marketplace at startup.
- **Discovery:** Appears in `/plugin` UI by default (unless disabled). Can be searched with `/plugin install <name>`.

### Custom marketplaces
- **Installation:** Add custom marketplaces via `extraKnownMarketplaces` in `settings.json`. Can be Git repositories (GitHub, GitLab), HTTP URLs, or local directories.
- **Format:** Each marketplace is a directory (or Git repo root) containing a `marketplace.json` file listing available plugins.
- **Marketplace.json schema:** Contains `plugins` array where each entry has `name` (string), `source` (PluginSource), `version` (optional), `description` (optional), `keywords` (optional).

### Blocklisting & allowlisting
- **`blockedMarketplaces`:** Managed-only setting. Marketplaces listed here cannot be used, even if manually added.
- **`strictKnownMarketplaces`:** Managed-only setting. When enabled, only marketplaces in `extraKnownMarketplaces` are allowed. Any other marketplace is rejected.
- **`enabledPlugins[<id>] = false`:** Policy-level plugin blocking via managed settings. These plugins cannot be installed or enabled.

---

[← Back to Plugins/README.md](/claude-code-docs/plugins/overview/)
