# IDE & Integrations


### `/autofix-pr`
- **Aliases:** none
- **Arguments:** `[prompt]` (optional)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Requires `gh` CLI and access to Claude Code on the web
- **Description:** "Spawn a Claude Code on the web session that watches the current branch's PR and pushes fixes when CI fails or reviewers leave comments. Detects the open PR from your checked-out branch with `gh pr view`; to watch a different PR, check out its branch first. By default the remote session is told to fix every CI failure and review comment; pass a prompt to give it different instructions, for example `/autofix-pr only fix lint and type errors`. Requires the `gh` CLI and access to Claude Code on the web." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/autofix-pr only fix lint and type errors`
- **Notes:** Spawns a separate web session to handle CI fixes autonomously.

### `/chrome`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Configure Claude in Chrome settings" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/chrome`
- **Notes:** Opens Chrome extension configuration.

### `/desktop`
- **Aliases:** `/app`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** macOS and Windows only
- **Description:** "Continue the current session in the Claude Code Desktop app. macOS and Windows only." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/desktop`
- **Notes:** Transfers your session to the native desktop application with full conversation history.

### `/diff`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Open an interactive diff viewer showing uncommitted changes and per-turn diffs. Use left/right arrows to switch between the current git diff and individual Claude turns, and up/down to browse files" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/diff`
- **Notes:** Useful for reviewing what was changed in each turn and comparing against git state.

### `/ide`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Manage IDE integrations and show status" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/ide`
- **Notes:** Configure integrations with VS Code, Vim, Emacs, and other editors.

### `/install-github-app`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `DISABLE_INSTALL_GITHUB_APP_COMMAND`
- **Gating:** —
- **Description:** "Set up the Claude GitHub Actions app for a repository. Walks you through selecting a repo and configuring the integration" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/install-github-app`
- **Notes:** Enables Claude Code integration with GitHub Actions for CI/CD workflows.

### `/install-slack-app`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Install the Claude Slack app. Opens a browser to complete the OAuth flow" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/install-slack-app`
- **Notes:** Allows Claude Code to receive notifications and commands via Slack.

### `/keybindings`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Open or create your keybindings configuration file" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/keybindings`
- **Notes:** Edit keybindings for Claude Code CLI.

### `/remote-control`
- **Aliases:** `/rc`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Make this session available for remote control from claude.ai." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/remote-control`
- **Notes:** Allows a web session on claude.ai to take over your terminal session.

### `/remote-env`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Configure the default remote environment for web sessions started with `--remote`" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/remote-env`
- **Notes:** Sets up environment variables and paths for web sessions.

### `/review`
- **Aliases:** none
- **Arguments:** `[PR]` (optional — PR URL or number)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Review a pull request locally in your current session. For a deeper cloud-based review, see `/ultrareview`" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/review` or `/review 42` or `/review https://github.com/owner/repo/pull/42`
- **Notes:** Local review is faster; `/ultrareview` provides a multi-agent cloud analysis.

### `/statusline`
- **Aliases:** none
- **Arguments:** none (describe desired configuration, or run bare)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Configure Claude Code's status line. Describe what you want, or run without arguments to auto-configure from your shell prompt" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/statusline` or `/statusline show token count and model`
- **Notes:** Customizes what information appears in the session status line.

### `/teleport`
- **Aliases:** `/tp`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Requires claude.ai subscription
- **Description:** "Pull a Claude Code on the web session into this terminal: opens a picker, then fetches the branch and conversation. Also available as `/tp`. Requires a claude.ai subscription" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/teleport`
- **Notes:** Transfers a web session back to your terminal.

### `/terminal-setup`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** VS Code, Alacritty, Warp only
- **Description:** "Configure terminal keybindings for Shift+Enter and other shortcuts. Only visible in terminals that need it, like VS Code, Alacritty, or Warp" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/terminal-setup`
- **Notes:** Not needed in most terminals; appears only when terminal-specific config is available.

### `/voice`
- **Aliases:** none
- **Arguments:** none (toggle)
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Requires Claude.ai account
- **Description:** "Toggle push-to-talk voice dictation. Requires a Claude.ai account" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/voice`
- **Notes:** Enables microphone input for hands-free coding.

---

[← Back to Commands/README.md](./README.md)
