---
title: "Account & Subscription"
tags: [cli]
---

# Account & Subscription


### `/extra-usage`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Configure extra usage to keep working when rate limits are hit" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/extra-usage`
- **Notes:** Allows you to purchase additional tokens if you exceed your plan's rate limits.

### `/login`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `DISABLE_LOGIN_COMMAND`
- **Gating:** —
- **Description:** "Sign in to your Anthropic account" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/login`
- **Notes:** Opens OAuth flow to authenticate with Anthropic.

### `/logout`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `DISABLE_LOGOUT_COMMAND`
- **Gating:** —
- **Description:** "Sign out from your Anthropic account" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/logout`
- **Notes:** Removes local authentication credentials.

### `/mobile`
- **Aliases:** `/ios`, `/android`
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Show QR code to download the Claude mobile app." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/mobile`
- **Notes:** Displays a QR code for quick app download on iOS or Android.

### `/passes`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Only visible if account is eligible
- **Description:** "Share a free week of Claude Code with friends. Only visible if your account is eligible" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/passes`
- **Notes:** Generates shareable pass codes for trial access.

### `/privacy-settings`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Pro and Max plan subscribers only
- **Description:** "View and update your privacy settings. Only available for Pro and Max plan subscribers" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/privacy-settings`
- **Notes:** none

### `/setup-bedrock`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Only visible when `CLAUDE_CODE_USE_BEDROCK=1` is set
- **Description:** "Configure Amazon Bedrock authentication, region, and model pins through an interactive wizard. Only visible when `CLAUDE_CODE_USE_BEDROCK=1` is set." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/setup-bedrock`
- **Notes:** Use this if you want Claude Code to work with models hosted on AWS Bedrock.

### `/setup-vertex`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** Only visible when `CLAUDE_CODE_USE_VERTEX=1` is set
- **Description:** "Configure Google Vertex AI authentication, project, region, and model pins through an interactive wizard. Only visible when `CLAUDE_CODE_USE_VERTEX=1` is set." ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/setup-vertex`
- **Notes:** Use this if you want Claude Code to work with models hosted on Google Cloud Vertex AI.

### `/stickers`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Order Claude Code stickers" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/stickers`
- **Notes:** Opens a link to order physical stickers.

### `/upgrade`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `DISABLE_UPGRADE_COMMAND`
- **Gating:** Only visible on Pro and Max plans
- **Description:** "Open the upgrade page to switch to a higher plan tier" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/upgrade`
- **Notes:** Only shown to users on lower-tier plans.

### `/usage`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** `DISABLE_EXTRA_USAGE_COMMAND` (env var naming mismatch)
- **Gating:** —
- **Description:** "Show plan usage limits and rate limit status" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/usage`
- **Notes:** Shows your current token consumption and limits. Note: The disabler env var is named `DISABLE_EXTRA_USAGE_COMMAND` but applies to `/usage`, not `/extra-usage`. See Discrepancies section.

### `/web-setup`
- **Aliases:** none
- **Arguments:** none
- **Type:** Built-in
- **Disabled by:** —
- **Gating:** —
- **Description:** "Connect your GitHub account to Claude Code on the web using your local `gh` CLI credentials. `/schedule` prompts for this automatically if GitHub isn't connected" ([code.claude.com](https://code.claude.com/docs/en/commands))
- **Example:** `/web-setup`
- **Notes:** Links your GitHub account to enable web-based features like `/schedule` and `/ultraplan`.

---

[← Back to Commands/README.md](/claude-code-docs/cli/overview/)
