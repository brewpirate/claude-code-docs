---
title: "Plugin-related environment variables"
tags: [plugins, settings]
---

# Plugin-related environment variables


From [ENV/README.md](/claude-code-docs/env/overview/):

- **`CLAUDE_CODE_PLUGIN_CACHE_DIR`** — Override the default plugin cache location (`~/.claude/plugins/cache`).
- **`CLAUDE_CODE_PLUGIN_SEED_DIR`** — Directory to pre-seed plugins at startup.
- **`CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS`** — Git clone/pull timeout in milliseconds (default: 30000).
- **`CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE`** — Keep marketplace cache if download fails (default: true).
- **`CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE`** — Cache downloaded plugin ZIPs locally (default: true).
- **`CLAUDE_CODE_SYNC_PLUGIN_INSTALL`** — Wait for plugin install to complete before returning (blocking mode).
- **`CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS`** — Timeout for synchronous plugin install (default: 30000).
- **`FORCE_AUTOUPDATE_PLUGINS`** — Automatically update all plugins to the latest version (default: false).
- **`CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL`** — Disable automatic sync of the official marketplace (default: false).

---

[← Back to Plugins/README.md](/claude-code-docs/plugins/overview/)
