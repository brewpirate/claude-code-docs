# Plugin policy


From `pluginPolicy.ts`:
- **`isPluginBlockedByPolicy(pluginId)`:** Checks if a plugin is force-disabled by enterprise policy (`enabledPlugins[<id>] = false` in managed settings).
- **Scope:** Applies universally across install operations, enable operations, and UI filtering.
- **Bypass:** Only managed-enabled plugins (set in managed settings) can override user preferences and cannot be disabled by the user.

---

[← Back to Plugins/README.md](./README.md)
