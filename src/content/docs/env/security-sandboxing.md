---
title: "Security & Sandboxing"
tags: [environment]
---


### `CLAUDE_CODE_SANDBOXED`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates Claude Code is running in a sandboxed environment. Bypasses trust dialog.
- **Example:** `export CLAUDE_CODE_SANDBOXED=1`

### `CLAUDE_CODE_BUBBLEWRAP`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Set to '1' to indicate running inside Bubblewrap sandbox. Allows --dangerously-skip-permissions with root.
- **Example:** `export CLAUDE_CODE_BUBBLEWRAP=1`

### `CLAUDE_CODE_ADDITIONAL_PROTECTION`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Add x-anthropic-additional-protection header to API requests. Used for heightened security.
- **Example:** `export CLAUDE_CODE_ADDITIONAL_PROTECTION=1`

### `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Load CLAUDE.md files from additional directories. Expands instruction loading to more locations.
- **Example:** `export CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`

### `CLAUDE_CODE_SCRIPT_CAPS`
- **Type:** String (JSON object)
- **Default:** Unspecified
- **Description:** JSON object mapping script names to numeric capability limits. Scripts not listed have no caps.
- **Example:** `export CLAUDE_CODE_SCRIPT_CAPS='{"bash":100,"python":50}'`

---

[← Back to env/README.md](/claude-code-docs/env/overview/)
