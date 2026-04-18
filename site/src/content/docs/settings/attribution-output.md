---
title: "Attribution & Output"
---

# Attribution & Output


### `attribution.commit`
- **Type:** string
- **Default:** `"🤖 Generated with [Claude Code](https://claude.com/claude-code)\n\n   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"`
- **Description:** Git commit attribution trailer (e.g., `Co-Authored-By: Claude…`). Empty string disables attribution.
- **Example:**
  ```json
  {
    "attribution": {
      "commit": "Generated with AI\n\nCo-Authored-By: AI <ai@example.com>"
    }
  }
  ```

### `attribution.pr`
- **Type:** string
- **Default:** `"🤖 Generated with [Claude Code](https://claude.com/claude-code)"`
- **Description:** PR description attribution. Empty string disables attribution.
- **Example:**
  ```json
  {
    "attribution": {
      "pr": ""
    }
  }
  ```

### `includeCoAuthoredBy`
- **Type:** boolean
- **Default:** unspecified
- **Description:** **Deprecated** — use `attribution.commit` instead. Whether to include the `co-authored-by Claude` byline in git commits and pull requests.
- **Example:**
  ```json
  {
    "includeCoAuthoredBy": false
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
