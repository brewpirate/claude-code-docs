---
title: "Network & Web Tools"
---

# Network & web tools


### `WebFetch`
- **Invoked as:** `WebFetch`
- **Source directory:** `claude-code-main/tools/WebFetchTool/`
- **Class:** Network
- **Side effect:** Read-only
- **Gating:** Permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Fetches content from a specified URL and processes it using an AI model." Converts HTML to markdown, summarizes large content, and includes a self-cleaning 15-minute cache. HTTPS is required; HTTP URLs auto-upgrade. Fails for authenticated or private URLs (use specialized MCP tools instead).
- **Input parameters:**
  - `url` (string, required) — Full URL (must be http:// or https://)
  - `prompt` (string, required) — Question or instruction for what to extract from the page
- **Returns:** Markdown-formatted content or answer based on the prompt.
- **Notes:** Permission required. Auto-upgrades HTTP to HTTPS. Includes 15-minute cache. Fails on authenticated/private content (GitHub private repos, Google Docs, Confluence, Jira, etc.)—use GitHub CLI or specialized MCP tools instead. IMPORTANT: URLs that redirect to different hosts will inform you of the redirect and provide the new URL; fetch again with the new URL.

### `WebSearch`
- **Invoked as:** `WebSearch`
- **Source directory:** `claude-code-main/tools/WebSearchTool/`
- **Class:** Network
- **Side effect:** Read-only
- **Gating:** Permission required; US-only
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Performs web searches." Returns search results with links formatted as markdown hyperlinks. Up-to-date information for current events and recent data beyond the knowledge cutoff.
- **Input parameters:**
  - `query` (string, required) — Search query
  - `allowed_domains` (string[], optional) — Only include results from these domains
  - `blocked_domains` (string[], optional) — Never include results from these domains
- **Returns:** List of search results, each with title and URL as markdown hyperlinks.
- **Notes:** Permission required. US only. Use this for current information, recent events, and data beyond your knowledge cutoff. You must include a "Sources:" section listing all URLs from the search results as markdown links in your response.

---

[← Back to Tools/README.md](/claude-code-docs/tools/overview/)
