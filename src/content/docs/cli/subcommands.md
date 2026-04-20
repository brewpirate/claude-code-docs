---
title: "Subcommands"
tags: [cli]
---


Subcommands are standalone workflows that don't launch the interactive REPL (except where noted). Run `claude <subcommand> --help` for details specific to each subcommand.

### `claude auth login`
- **Purpose:** Sign in to your Anthropic account.
- **Usage:** `claude auth login [--email <email>] [--sso] [--console]`
- **Flags:**
  - `--email <email>` — Pre-populate email address on the login page.
  - `--sso` — Force SSO authentication.
  - `--console` — Use Anthropic Console (API usage billing) instead of Claude subscription.
  - `--claudeai` — Use Claude subscription (default).
- **Source URL:** https://code.claude.com/docs/en/cli-reference
- **Example:** `claude auth login --console`

### `claude auth logout`
- **Purpose:** Log out from your Anthropic account.
- **Usage:** `claude auth logout`
- **Flags:** None.
- **Source URL:** https://code.claude.com/docs/en/cli-reference
- **Example:** `claude auth logout`

### `claude auth status`
- **Purpose:** Show authentication status as JSON.
- **Usage:** `claude auth status [--json] [--text]`
- **Flags:**
  - `--json` — Output as JSON (default).
  - `--text` — Output as human-readable text.
- **Exit code:** 0 if logged in, 1 if not.
- **Source URL:** https://code.claude.com/docs/en/cli-reference
- **Example:** `claude auth status --text`

### `claude agents`
- **Purpose:** List all configured subagents, grouped by source.
- **Usage:** `claude agents`
- **Flags:** None.
- **Source URL:** https://code.claude.com/docs/en/cli-reference
- **Example:** `claude agents`

### `claude auto-mode defaults`
- **Purpose:** Print the built-in auto mode classifier rules as JSON.
- **Usage:** `claude auto-mode defaults`
- **Alternative:** `claude auto-mode config` — see your effective config with settings applied.
- **Source URL:** https://code.claude.com/docs/en/cli-reference
- **Example:** `claude auto-mode defaults > rules.json`

### `claude doctor`
- **Purpose:** Check the health of your Claude Code auto-updater.
- **Usage:** `claude doctor`
- **Flags:** None.
- **Note:** The workspace trust dialog is skipped; stdio servers from .mcp.json are spawned for health checks. Only use in directories you trust.
- **Source URL:** https://code.claude.com/docs/en/cli-reference
- **Example:** `claude doctor`

### `claude mcp serve`
- **Purpose:** Start the Claude Code MCP server.
- **Usage:** `claude mcp serve [--debug] [--verbose]`
- **Flags:**
  - `--debug`, `-d` — Enable debug mode.
  - `--verbose` — Override verbose mode setting from config.
- **Source URL:** https://code.claude.com/docs/en/mcp
- **Example:** `claude mcp serve --debug`

### `claude mcp list`
- **Purpose:** List configured MCP servers.
- **Usage:** `claude mcp list`
- **Flags:** None.
- **Note:** Workspace trust dialog is skipped; stdio servers are spawned for health checks. Only use in directories you trust.
- **Source URL:** https://code.claude.com/docs/en/mcp
- **Example:** `claude mcp list`

### `claude mcp add-json`
- **Purpose:** Add an MCP server (stdio or SSE) with a JSON string.
- **Usage:** `claude mcp add-json <name> <json> [--scope <scope>] [--client-secret]`
- **Flags:**
  - `--scope <scope>` — Configuration scope: local, user, or project (default: local).
  - `--client-secret` — Prompt for OAuth client secret (or set `MCP_CLIENT_SECRET` env var).
- **Source URL:** https://code.claude.com/docs/en/mcp
- **Example:** `claude mcp add-json my-server '{"command":"python","args":["-m","mcp_server"]}'`

### `claude mcp remove`
- **Purpose:** Remove an MCP server.
- **Usage:** `claude mcp remove <name> [--scope <scope>]`
- **Flags:**
  - `--scope <scope>` — Configuration scope (local, user, or project). If not specified, removes from whichever scope it exists in.
- **Source URL:** https://code.claude.com/docs/en/mcp
- **Example:** `claude mcp remove my-server --scope user`

### `claude mcp get`
- **Purpose:** Get details about a configured MCP server.
- **Usage:** `claude mcp get <name>`
- **Flags:** None.
- **Source:** `main.tsx:3930`
- **Example:** `claude mcp get my-server`
- **Notes:** The workspace-trust dialog is skipped and stdio servers from `.mcp.json` are spawned for health checks. Only run this in directories you trust.

### `claude mcp add-from-claude-desktop`
- **Purpose:** Import MCP servers from your Claude Desktop configuration (Mac and WSL only).
- **Usage:** `claude mcp add-from-claude-desktop [-s <scope>]`
- **Flags:**
  - `-s, --scope <scope>` — Configuration scope: local, user, or project (default: local).
- **Source:** `main.tsx:3945`
- **Example:** `claude mcp add-from-claude-desktop --scope user`

### `claude mcp reset-project-choices`
- **Purpose:** Reset all approved/rejected project-scoped (`.mcp.json`) servers for the current project.
- **Usage:** `claude mcp reset-project-choices`
- **Flags:** None.
- **Source:** `main.tsx:3953`
- **Example:** `claude mcp reset-project-choices`
- **Notes:** Clears the approval/rejection state for project-level MCP servers. Next time Claude encounters one, it will prompt again.

### `claude plugin install`
- **Purpose:** Install a plugin from available marketplaces.
- **Usage:** `claude plugin install <plugin> [-s <scope>]`
- **Flags:**
  - `-s, --scope <scope>` — Installation scope: user, project, or local (default: user).
- **Syntax:** Use `plugin@marketplace` to specify a marketplace.
- **Source URL:** https://code.claude.com/docs/en/plugins
- **Example:** `claude plugin install code-review@claude-plugins-official`

### `claude plugin list`
- **Purpose:** List installed plugins.
- **Usage:** `claude plugin list [--json] [--available]`
- **Flags:**
  - `--json` — Output as JSON.
  - `--available` — Include available plugins from marketplaces (requires `--json`).
- **Source URL:** https://code.claude.com/docs/en/plugins
- **Example:** `claude plugin list --json`

### `claude plugin uninstall`
- **Purpose:** Uninstall an installed plugin.
- **Usage:** `claude plugin uninstall <plugin> [-s <scope>] [--keep-data]`
- **Flags:**
  - `-s, --scope <scope>` — Uninstall from scope: user, project, or local (default: user).
  - `--keep-data` — Preserve the plugin's persistent data directory.
- **Source URL:** https://code.claude.com/docs/en/plugins
- **Example:** `claude plugin uninstall my-plugin --scope project`

### `claude plugin enable` / `claude plugin disable`
- **Purpose:** Enable or disable a plugin.
- **Usage:** `claude plugin enable <plugin>` / `claude plugin disable [plugin] [--all]`
- **Flags (disable):**
  - `--all` — Disable all enabled plugins.
- **Source URL:** https://code.claude.com/docs/en/plugins
- **Example:** `claude plugin disable --all`

### `claude plugin update`
- **Purpose:** Update a plugin to the latest version (restart required).
- **Usage:** `claude plugin update <plugin> [-s <scope>]`
- **Flags:**
  - `-s, --scope <scope>` — Installation scope: user, project, or local (default: user).
- **Source URL:** https://code.claude.com/docs/en/plugins
- **Example:** `claude plugin update my-plugin`

### `claude plugin validate`
- **Purpose:** Validate a plugin or marketplace manifest.
- **Usage:** `claude plugin validate <path>`
- **Source URL:** https://code.claude.com/docs/en/plugins-reference
- **Example:** `claude plugin validate ./my-plugin`

### `claude plugin marketplace add`
- **Purpose:** Add a marketplace from a URL, path, or GitHub repo.
- **Usage:** `claude plugin marketplace add <source> [--sparse <paths...>] [--scope <scope>]`
- **Flags:**
  - `--sparse <paths...>` — Limit checkout to specific directories via git sparse-checkout (for monorepos).
  - `--scope <scope>` — Where to declare the marketplace: user (default), project, or local.
- **Source URL:** https://code.claude.com/docs/en/plugins-reference
- **Example:** `claude plugin marketplace add https://github.com/user/plugins --sparse .claude-plugin plugins`

### `claude plugin marketplace list`
- **Purpose:** List all configured marketplaces.
- **Usage:** `claude plugin marketplace list [--json]`
- **Flags:**
  - `--json` — Output as JSON.
- **Source:** `main.tsx:4182`
- **Example:** `claude plugin marketplace list --json`

### `claude plugin marketplace remove`
- **Purpose:** Remove a configured marketplace.
- **Usage:** `claude plugin marketplace remove <name>`
- **Aliases:** `rm`
- **Flags:** None.
- **Source:** `main.tsx:4191`
- **Example:** `claude plugin marketplace remove community-tools`

### `claude plugin marketplace update`
- **Purpose:** Pull the latest marketplace manifest(s) from their sources.
- **Usage:** `claude plugin marketplace update [name]`
- **Flags:** None.
- **Source:** `main.tsx:4199`
- **Example:** `claude plugin marketplace update` (updates all) or `claude plugin marketplace update community-tools`

### `claude remote-control`
- **Purpose:** Start a Remote Control server to control Claude Code from claude.ai or the Claude app.
- **Usage:** `claude remote-control [--name <name>]`
- **Flags:**
  - `--name <name>` — Optionally name the session.
- **Note:** Runs in server mode (no local interactive session).
- **Source URL:** https://code.claude.com/docs/en/remote-control
- **Example:** `claude remote-control --name "My Project"`

### `claude setup-token`
- **Purpose:** Generate a long-lived OAuth token for CI and scripts.
- **Usage:** `claude setup-token`
- **Flags:** None.
- **Requirements:** Requires a Claude subscription.
- **Note:** Prints the token to the terminal without saving it.
- **Source URL:** https://code.claude.com/docs/en/authentication#generate-a-long-lived-token
- **Example:** `claude setup-token`

### `claude ssh`
- **Purpose:** Run Claude Code on a remote Linux host over SSH. Deploys the binary and tunnels API auth back through your local machine — no remote setup needed.
- **Usage:** `claude ssh <user@host | ssh-config-alias> [dir]`
- **Flags:**
  - `--permission-mode <mode>` — Permission mode for the remote session.
  - `--dangerously-skip-permissions` — Skip all permission prompts on the remote (dangerous).
  - `--local` — e2e test mode: spawn the child CLI locally without SSH. Exercises the auth proxy and unix-socket plumbing without needing a remote host.
- **Gating:** `SSH_REMOTE` feature flag.
- **Source:** `main.tsx:4046`
- **Example:** `claude ssh user@example.com /srv/app`

### `claude open`
- **Purpose:** Connect to a Claude Code server via a `cc://` URL (internal).
- **Usage:** `claude open <cc-url> [-p [prompt]] [--output-format <format>]`
- **Flags:**
  - `-p, --print [prompt]` — Headless mode; optionally provide a prompt.
  - `--output-format <format>` — `text` (default), `json`, or `stream-json`.
- **Gating:** `DIRECT_CONNECT` feature flag.
- **Source:** `main.tsx:4059`
- **Example:** `claude open cc://host.example.com:8443?token=...`
- **Notes:** Interactive mode (no `-p`) is handled by early argv rewriting and delegates to the main command with full TUI support; the subcommand itself only runs the headless path.

### `claude update`
- **Purpose:** Check for updates and install if available.
- **Usage:** `claude update`
- **Alias:** `claude upgrade`
- **Source URL:** https://code.claude.com/docs/en/cli-reference
- **Example:** `claude update`

---

[← Back to CLI/README.md](/claude-code-docs/cli/overview/)
