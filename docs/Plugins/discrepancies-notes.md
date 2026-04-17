# Discrepancies & notes


1. **`disabled` field in types but not in docs:** The `types/plugin.ts` file defines a `LoadedPlugin` type with an optional `enabled` field, but the public `plugin.json` manifest schema does not include this field. The `enabled` state is stored in `settings.json`, not in the manifest itself.

2. **Plugin ID format variations:** Plugin IDs use the format `name@marketplace`, but built-in plugins use `name@builtin`. The format is enforced in `PluginIdSchema` but not explicitly called out in user-facing documentation.

3. **`deprecated` field accepts string or boolean:** The `deprecated` field can be either a boolean or a string (custom deprecation message). Public docs show both but don't emphasize the string option prominently.

4. **Manifest paths are always relative:** The schema enforces relative paths starting with `./`, but this constraint is not documented as strictly in the public guides. Users may assume absolute paths or environment variable references work, but they do not.

5. **Hooks and MCP merging semantics:** Unlike skills/commands/agents (which replace defaults when specified), hooks and MCP configurations from multiple sources are merged. This behavioral difference is not consistently called out.

6. **LSP servers require external binaries:** The docs state this clearly, but users often miss it and wonder why LSP plugins appear installed but don't work. The error message is visible in the `/plugin` Errors tab.

7. **`${CLAUDE_PLUGIN_DATA}` persistence timing:** The directory is only created when the variable is first referenced. Empty plugins with no data won't have a `${CLAUDE_PLUGIN_DATA}` directory until something writes to it.

8. **No version-specific component paths:** The manifest does not support different component paths based on plugin version. If a major version changes the directory structure, both old and new structures must be supported simultaneously, or users must uninstall before updating.

9. **Managed plugin state is read-only:** Plugins installed via managed settings cannot have their `enabled` state changed by users in those scopes. The UI reflects this but does not distinguish between "disabled by user" and "disabled by policy" in all places.

10. **Path traversal via symlinks:** Symlinks within the plugin directory are preserved (not dereferenced) during caching, allowing plugin creators to work around the path traversal restriction. This is documented but could be abused.

---

[← Back to Plugins/README.md](./README.md)
