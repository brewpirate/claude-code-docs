---
title: "Environment-Driven Behavior"
tags: [cli]
---

# Environment-driven behavior


Many environment variables modify CLI behavior without requiring explicit flags. See [ENV/README.md](/claude-code-docs/env/overview/) for the complete reference, but here are key variables that affect CLI invocation:

- `CLAUDE_CODE_ENTRYPOINT` — identifies how Claude Code was launched (cli, sdk-ts, sdk-py, mcp, etc.)
- `CLAUDE_CONFIG_DIR` — override config discovery path (default: `~/.claude`)
- `CLAUDE_CODE_USE_BEDROCK`, `_VERTEX`, `_FOUNDRY` — provider selection for API calls
- `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN` — authentication (precedence: API key > auth token > OAuth)
- `CLAUDE_CODE_DONT_INHERIT_ENV` — strips inherited environment variables on subprocess spawn
- `CLAUDE_CODE_DEBUG` — enable debug logging (equivalent to `--debug`)
- `CLAUDE_CODE_VERBOSE` — enable verbose logging (equivalent to `--verbose`)
- `CLAUDE_CODE_SIMPLE` — enable bare mode (equivalent to `--bare`)
- `ANTHROPIC_MODEL` — set default model (equivalent to `--model`)

---

[← Back to CLI/README.md](/claude-code-docs/cli/overview/)
