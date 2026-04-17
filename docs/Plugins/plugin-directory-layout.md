# Plugin directory layout


```
my-plugin/
├── .claude-plugin/                # Metadata directory (optional)
│   └── plugin.json                  # Plugin manifest
├── commands/                      # Flat command markdown files (optional)
│   ├── deploy.md
│   └── status.md
├── skills/                        # Skill directories with SKILL.md (optional)
│   ├── code-review/
│   │   ├── SKILL.md
│   │   ├── reference.md
│   │   └── scripts/
│   └── pdf-processor/
│       └── SKILL.md
├── agents/                        # Subagent markdown files (optional)
│   ├── security-reviewer.md
│   └── performance-tester.md
├── agents/                        # Subagent markdown files (optional)
│   ├── security-reviewer.md
│   └── performance-tester.md
├── output-styles/                 # Output style definitions (optional)
│   └── terse.md
├── hooks/                         # Hook configurations (optional)
│   ├── hooks.json                 # Main hook config
│   └── security-hooks.json        # Additional hooks
├── monitors/                      # Background monitor configs (optional)
│   └── monitors.json
├── .mcp.json                      # MCP server definitions (optional)
├── .lsp.json                      # LSP server configurations (optional)
├── bin/                           # Executables added to PATH (optional)
│   └── my-tool
├── scripts/                       # Hook and utility scripts (optional)
│   ├── security-scan.sh
│   └── deploy.js
├── settings.json                  # Default plugin settings (optional)
└── LICENSE                        # License file
```

**Key rules:**
- `.claude-plugin/plugin.json` is the only file inside `.claude-plugin/`. All other directories must be at the plugin root.
- Paths in manifest are relative to plugin root and must start with `./`.
- Custom component paths override defaults: if `skills` is specified, the default `skills/` directory is not scanned. Include the default in an array to keep both: `"skills": ["./skills/", "./extras/"]`.
- `${CLAUDE_PLUGIN_ROOT}` is substituted with the plugin installation path in commands, hooks, and configs.
- `${CLAUDE_PLUGIN_DATA}` is substituted with a persistent plugin data directory that survives updates: `~/.claude/plugins/data/{plugin-id}/`.

---

[← Back to Plugins/README.md](./README.md)
