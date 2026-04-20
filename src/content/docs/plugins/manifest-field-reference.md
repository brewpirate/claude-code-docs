---
title: "Manifest field reference"
tags: [plugins, settings]
---


### Identity fields

### `name`
- **Type:** string
- **Required:** Yes
- **Default:** None
- **Validation:** Kebab-case, no spaces, alphanumeric + hyphens. Max 64 characters when registered in marketplace.
- **Description:** Unique identifier for the plugin. Used as the namespace for commands and skills (e.g., `/plugin-name:skill`). Used in plugin IDs as `plugin-name@marketplace-name`. Critical for stability: changing the name after publication breaks existing installations.
- **Example:** `"name": "code-review-toolkit"`
- **Notes:** Also required in marketplace.json entries. The `name` field in plugin.json takes precedence over marketplace entry when both are present.

### `version`
- **Type:** string
- **Required:** No
- **Default:** None (version can be set in marketplace.json instead)
- **Validation:** Semantic version format (MAJOR.MINOR.PATCH) or pre-release versions (e.g., `2.0.0-beta.1`).
- **Description:** Semantic version for the plugin. If omitted, version can be specified in the marketplace.json entry that references this plugin. Cache invalidation and user updates are based on version comparison.
- **Example:** `"version": "2.1.0"`
- **Notes:** Version in plugin.json takes priority over marketplace.json. When publishing via marketplace, you only need to set it in one place. Claude Code will not update a plugin unless the version number changes.

### `description`
- **Type:** string
- **Required:** No
- **Default:** None
- **Validation:** None
- **Description:** Brief explanation of what the plugin does. Displayed in the `/plugin` UI when browsing or installing. Keep to 1-2 sentences.
- **Example:** `"description": "Deploy applications with CI/CD pipeline integration"`
- **Notes:** Recommended for discoverability, especially for marketplace plugins.

### `author`
- **Type:** object
- **Required:** No
- **Default:** None
- **Validation:** Fields `name` (string), `email` (string, optional), `url` (string, optional) are all optional within the object.
- **Description:** Plugin author information. Shown in the `/plugin` UI and marketplace.
- **Example:**
  ```json
  {
    "author": {
      "name": "Alice Chen",
      "email": "alice@example.com",
      "url": "https://github.com/alicechen"
    }
  }
  ```
- **Notes:** None.

### `homepage`
- **Type:** string
- **Required:** No
- **Default:** None
- **Validation:** Must be a valid URL.
- **Description:** Link to plugin documentation or project homepage. Shown in marketplace and `/plugin` UI.
- **Example:** `"homepage": "https://docs.example.com/plugin"`
- **Notes:** None.

### `repository`
- **Type:** string
- **Required:** No
- **Default:** None
- **Validation:** None
- **Description:** Source code repository URL (e.g., GitHub). Helps users find and contribute to the plugin.
- **Example:** `"repository": "https://github.com/user/plugin"`
- **Notes:** None.

### `license`
- **Type:** string
- **Required:** No
- **Default:** None
- **Validation:** Typically SPDX identifiers (MIT, Apache-2.0, GPL-3.0, etc.).
- **Description:** License identifier for the plugin code. Informs users of usage terms.
- **Example:** `"license": "MIT"`
- **Notes:** None.

### `keywords`
- **Type:** array of strings
- **Required:** No
- **Default:** None
- **Validation:** None
- **Description:** Tags for plugin discovery in marketplaces and search. Used by marketplace UI to categorize and filter plugins.
- **Example:** `"keywords": ["deployment", "ci-cd", "automation"]`
- **Notes:** None.

---

### Component path fields

### `commands`
- **Type:** string or array of strings
- **Required:** No
- **Default:** `commands/` if it exists; otherwise none
- **Validation:** Paths must be relative and start with `./`. Can point to `.md` files or directories containing `.md` files.
- **Description:** Path(s) to command files or directories. Commands are flat Markdown files (not directories like skills). When specified, the default `commands/` directory is not scanned. To keep defaults and add more paths, include the default in an array.
- **Example (single file):** `"commands": "./custom/deploy.md"`
- **Example (directory):** `"commands": "./custom/commands/"`
- **Example (multiple):** `"commands": ["./commands/", "./extras/"]`
- **Notes:** For new plugins, prefer `skills/` over `commands/`. Commands are the legacy flat format; skills are directories with supporting files.

### `skills`
- **Type:** string or array of strings
- **Required:** No
- **Default:** `skills/` if it exists; otherwise none
- **Validation:** Paths must be relative and start with `./`. Must point to directories containing `<name>/SKILL.md` subdirectories.
- **Description:** Path(s) to skill directories. Each directory should contain subdirectories with `SKILL.md` files. When specified, the default `skills/` directory is not scanned.
- **Example (single):** `"skills": "./custom/skills/"`
- **Example (multiple):** `"skills": ["./skills/", "./extras/skills/"]`
- **Notes:** Plugin skills use namespace: `/plugin-name:skill-name`.

### `agents`
- **Type:** string or array of strings
- **Required:** No
- **Default:** `agents/` if it exists; otherwise none
- **Validation:** Paths must be relative and start with `./`. Must point to Markdown files with agent frontmatter.
- **Description:** Path(s) to subagent markdown files. Each file is a subagent definition. When specified, the default `agents/` directory is not scanned.
- **Example:** `"agents": ["./agents/reviewer.md", "./agents/tester.md"]`
- **Notes:** Plugin agents appear in `/agents` UI. See [Subagents docs](/claude-code-docs/agents/overview/) for frontmatter schema.

### `hooks`
- **Type:** string, array of strings, or inline object
- **Required:** No
- **Default:** `hooks/hooks.json` if it exists; otherwise none
- **Validation:** File paths relative, starting with `./`. Inline config must match HooksSettings schema (event → hook handler mappings).
- **Description:** Hook configurations that respond to tool calls, file changes, and session events. Can be loaded from files or defined inline. Multiple sources are merged (unlike skills/commands/agents, which replace defaults).
- **Example (file):** `"hooks": "./hooks/hooks.json"`
- **Example (inline):** 
  ```json
  {
    "hooks": {
      "PostToolUse": [
        {
          "matcher": "Write|Edit",
          "hooks": [{"type": "command", "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh"}]
        }
      ]
    }
  }
  ```
- **Notes:** Hooks are merged across all configured sources (user, project, plugin, managed). See [Hooks docs](/claude-code-docs/hooks/overview/) for event types and handler schemas.

### `mcpServers`
- **Type:** string, array of strings, or inline object
- **Required:** No
- **Default:** `.mcp.json` if it exists; otherwise none
- **Validation:** File paths relative. Inline config must match MCP server config schema (server name → command, args, env).
- **Description:** MCP (Model Context Protocol) server configurations. Servers are automatically started when the plugin is enabled. Can be loaded from files or defined inline. Multiple sources are merged.
- **Example (file):** `"mcpServers": "./.mcp.json"`
- **Example (inline):**
  ```json
  {
    "mcpServers": {
      "plugin-database": {
        "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
        "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
        "env": {"DB_PATH": "${CLAUDE_PLUGIN_DATA}"}
      }
    }
  }
  ```
- **Notes:** Supports variable substitution: `${CLAUDE_PLUGIN_ROOT}`, `${CLAUDE_PLUGIN_DATA}`, `${user_config.*}`, `${ENV_VAR}`.

### `outputStyles`
- **Type:** string or array of strings
- **Required:** No
- **Default:** `output-styles/` if it exists; otherwise none
- **Validation:** Paths must be relative and start with `./`.
- **Description:** Path(s) to output style markdown files. Output styles customize the formatting of Claude's responses. When specified, the default `output-styles/` directory is not scanned.
- **Example:** `"outputStyles": "./styles/terse.md"`
- **Notes:** None.

### `lspServers`
- **Type:** string, array of strings, or inline object
- **Required:** No
- **Default:** `.lsp.json` if it exists; otherwise none
- **Validation:** File paths relative. Inline config must match LSP server schema (language server name → command, extensionToLanguage).
- **Description:** Language Server Protocol (LSP) server configurations. LSP servers provide code intelligence (go to definition, diagnostics, hover info). Multiple sources are merged. Users must install language server binaries separately.
- **Example (inline):**
  ```json
  {
    "lspServers": {
      "go": {
        "command": "gopls",
        "args": ["serve"],
        "extensionToLanguage": {".go": "go"}
      }
    }
  }
  ```
- **Notes:** The language server binary (e.g., `gopls`) must be installed independently. Paths are relative; absolute paths are not supported. Required fields: `command`, `extensionToLanguage`. Optional: `args`, `env`, `transport`, `initializationOptions`, `settings`, `startupTimeout`, `restartOnCrash`.

### `monitors`
- **Type:** string or array of strings
- **Required:** No
- **Default:** `monitors/monitors.json` if it exists; otherwise none
- **Validation:** Paths must be relative and start with `./`.
- **Description:** Path(s) to monitor configuration files. Monitors are background processes that watch logs or external status and notify Claude of events. When specified, the default `monitors/monitors.json` is not loaded.
- **Example:**
  ```json
  {
    "monitors": "./monitors.json"
  }
  ```
- **Notes:** Monitor format: JSON array of `{name, command, description, when}`. Supports variable substitution. See [Plugins reference](/claude-code-docs/plugins/overview/) for full schema.

---

### Configuration & user interaction

### `userConfig`
- **Type:** object
- **Required:** No
- **Default:** None
- **Validation:** Keys must be valid identifiers. Values: objects with `description` (string), `sensitive` (boolean, default false), optionally `type`, `label`, `help`, `required`, `default`, `min`, `max`, `pattern`.
- **Description:** User-configurable values that Claude Code prompts for when the plugin is enabled. Sensitive values go to the system keychain; non-sensitive values are stored in `settings.json` under `pluginConfigs[<plugin-id>].options`. Values are available in plugin subprocesses as environment variables and in templates as `${user_config.KEY}`.
- **Example:**
  ```json
  {
    "userConfig": {
      "api_endpoint": {
        "description": "Your team's API endpoint",
        "sensitive": false
      },
      "api_token": {
        "description": "API authentication token",
        "sensitive": true
      }
    }
  }
  ```
- **Notes:** Sensitive values have a ~2 KB limit (shared with OAuth tokens). For non-sensitive values, you can set `"type": "string-array"` to accept an array of strings.

### `channels`
- **Type:** array of objects
- **Required:** No
- **Default:** None
- **Validation:** Each channel must have a `server` field matching an MCP server key in `mcpServers`.
- **Description:** Message channel declarations that bind to MCP servers to inject content into conversations (e.g., Telegram, Slack, Discord style integrations). Each channel can have its own `userConfig`.
- **Example:**
  ```json
  {
    "channels": [
      {
        "server": "telegram",
        "userConfig": {
          "bot_token": {"description": "Bot token", "sensitive": true},
          "owner_id": {"description": "Your user ID", "sensitive": false}
        }
      }
    ]
  }
  ```
- **Notes:** The `server` field must reference a key in `mcpServers` that provides the channel implementation.

---

### Compatibility & gating

### `minClaudeCodeVersion` and `maxClaudeCodeVersion`
- **Type:** string (semver)
- **Required:** No
- **Default:** None (no version constraint)
- **Validation:** Semantic version format (e.g., `1.2.0`, `2.0.0-beta`).
- **Description:** Version constraints for Claude Code. If the user's Claude Code version is outside this range, the plugin will not load. Used to ensure compatibility with specific features or APIs.
- **Example:**
  ```json
  {
    "minClaudeCodeVersion": "2.0.0",
    "maxClaudeCodeVersion": "3.0.0"
  }
  ```
- **Notes:** If only `min` is set, there's no upper bound; vice versa.

### `requires`
- **Type:** array of strings
- **Required:** No
- **Default:** None
- **Validation:** Reserved for future use.
- **Description:** System capabilities required for the plugin (e.g., `["lsp", "mcp"]`). Reserved for future expansion; not currently enforced.
- **Example:** `"requires": ["mcp", "monitors"]`
- **Notes:** Currently a placeholder. May be used in future versions to require specific Claude Code features.

### `gatedBy`
- **Type:** string or array of strings
- **Required:** No
- **Default:** None
- **Validation:** Feature flag identifiers.
- **Description:** Feature flag(s) that must be enabled for the plugin to load. Used internally for beta or experimental plugins.
- **Example:** `"gatedBy": "beta-lsp-support"`
- **Notes:** Typically not used by external plugins. Set by Claude Code internally for experimental features.

### `deprecated`
- **Type:** boolean or string
- **Required:** No
- **Default:** `false`
- **Validation:** If a string, a user-friendly deprecation message.
- **Description:** Marks the plugin as deprecated. When `true`, shows a generic deprecation notice. When a string, displays that message. Deprecated plugins can still be used but are flagged in the UI.
- **Example:**
  ```json
  {
    "deprecated": "Use the new 'code-quality-suite' plugin instead"
  }
  ```
- **Notes:** Deprecated plugins are hidden from discovery but still work if already installed.

### `autoUpdate`
- **Type:** boolean
- **Required:** No
- **Default:** Inherits from `FORCE_AUTOUPDATE_PLUGINS` environment variable
- **Validation:** Boolean.
- **Description:** Enable automatic updates for this plugin. When `true`, Claude Code checks for and applies updates automatically. When `false`, users must manually update via `/plugin update` or CLI.
- **Example:** `"autoUpdate": false`
- **Notes:** Individual plugin setting overrides the global `FORCE_AUTOUPDATE_PLUGINS` environment variable.

### `dependencies`
- **Type:** array of strings or objects
- **Required:** No
- **Default:** None
- **Validation:** Each entry is one of:
  - `"plugin-name"` — bare name, resolved against the declaring plugin's own marketplace.
  - `"plugin-name@marketplace-name"` — qualified name.
  - `"plugin-name@marketplace@^1.2"` — trailing `@^version` is **accepted and silently stripped** for forwards-compatibility; versions are not currently enforced (see Notes).
  - `{"name": "plugin-name", "marketplace": "marketplace-name"}` — object form. Additional fields (e.g., `version`) are accepted and ignored.
- **Description:** Plugins that must be enabled for this plugin to function. Declared dependencies are loaded before the dependent plugin. Bare names resolve against the declaring plugin's own marketplace; use the `@marketplace` suffix to pin a dependency to a specific marketplace.
- **Example:**
  ```json
  {
    "dependencies": [
      "shared-utilities",
      "secrets-vault@anthropic-tools",
      {"name": "formatter", "marketplace": "community-tools"}
    ]
  }
  ```
- **Notes:**
  - **Version constraints are not currently enforced.** The schema accepts `@^version` suffixes and object `version` fields for forwards-compatibility but strips them before resolution. A future release (tracked internally as CC-993) will add version-range support; until then, any version string is silently ignored.
  - Auto-installation of missing dependencies is gated by the consuming marketplace's allowlist — only the root marketplace's `allowlist` applies (no transitive trust).
  - If a required dependency is not available, the plugin will not load.
- **Source:** `claude-code-main/utils/plugins/schemas.ts` — `DependencyRefSchema` (line 1367), `dependencies` field on manifest (line 313).

---

[← Back to Plugins/README.md](/claude-code-docs/plugins/overview/)
