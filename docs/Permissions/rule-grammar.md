# Rule grammar


### Rule forms

- **Bare tool name**: `Tool` — matches all invocations of that tool. Equivalent to `Tool(*)` for tools that support patterns; has no special meaning for tools without pattern support (e.g., `WebSearch`, `Monitor`).
- **Tool with pattern**: `Tool(pattern)` — matches invocations of that tool where the pattern matches the specifier (command, path, domain, etc.). Pattern syntax varies per tool class.
- **MCP tools**: `mcp__server__tool` — two-underscore-delimited flat name; matches a specific MCP tool. `mcp__server__*` matches all tools from that server. Literal names, not tool-wide rules.

### Pattern syntax per tool class

#### Bash patterns

- **Full command match**: `Bash(npm run build)` matches exactly `npm run build`.
- **Prefix with wildcard**: `Bash(npm *)` matches any command starting with `npm ` (space-enforced word boundary). `Bash(npm*)` without a space matches `npm ...` without boundary (e.g., both `npm test` and `npmlog`).
- **Trailing wildcard (colon form)**: `Bash(ls:*)` is equivalent to `Bash(ls *)`. The `:*` form is only recognized at the end of the pattern.
- **Wildcards at any position**: `Bash(git * main)` matches `git checkout main`, `git push origin main`, etc. A single `*` spans any sequence of characters including spaces.
- **Compound commands**: Rules apply to each subcommand independently (`;`, `&&`, `||`, `|`, `|&`, `&`, newlines). Bash recognizes these separators and checks each part against rules. When you approve a compound command with "Yes, don't ask again", the harness saves separate rules for each sub-command. Up to 5 rules may be generated per approval.
- **Process wrappers**: Built-in wrappers (`timeout`, `time`, `nice`, `nohup`, `stdbuf`) are stripped before matching, so `Bash(npm test *)` matches `timeout 30 npm test`. Bare `xargs` (no flags) is also stripped. Development runners like `devbox run`, `docker exec`, `npx` are NOT stripped; write explicit rules like `Bash(devbox run npm test)` to allow them.
- **Read-only command whitelist**: Commands `ls`, `cat`, `head`, `tail`, `grep`, `find`, `wc`, `diff`, `stat`, `du`, `cd`, and read-only `git` subcommands are auto-approved in every mode (except when an `ask` rule exists for them). Unquoted globs in read-only commands are permitted. List is not user-configurable; add an `ask` or `deny` rule to require a prompt.

#### Path patterns (Read / Write / Edit / NotebookEdit)

Paths follow **gitignore syntax** with four pattern types:

| Pattern | Meaning | Example | Resolves to |
|---------|---------|---------|-------------|
| `//path` | Absolute from filesystem root | `Read(//Users/alice/secrets/**)` | `/Users/alice/secrets/**` |
| `~/path` | Home directory | `Read(~/Documents/*.pdf)` | `/Users/alice/Documents/*.pdf` (user-specific) |
| `/path` | Relative to project root | `Edit(/src/**/*.ts)` | `<project-root>/src/**/*.ts` |
| `path` or `./path` | Relative to current working directory | `Read(*.env)`, `Read(./src/**)` | `<cwd>/*.env` or `<cwd>/src/**` |

Special characters in patterns:

- `*` matches any characters except `/` (single directory level).
- `**` recursively matches directories.
- `?` matches any single character.
- `{a,b}` expands to `a` or `b` (brace expansion).

On Windows, paths are normalized to POSIX form before matching: `C:\Users\alice` becomes `/c/Users/alice`. Use `//c/**/.env` for absolute paths on that drive.

**Symlink behavior**:
- **Allow rules**: Apply only when both the symlink path AND its target match the pattern. A symlink in an allowed directory pointing outside it still prompts.
- **Deny rules**: Apply when either the symlink path OR its target matches. A symlink to a denied file is itself denied.

#### MCP patterns

- **Literal server and tool**: `mcp__puppeteer__puppeteer_navigate` matches the exact tool.
- **All tools on a server**: `mcp__puppeteer__*` or `mcp__puppeteer` (both match all tools from `puppeteer` server).
- Patterns are literal; no glob syntax. Matching is on the flat `mcp__server__tool` name.

#### WebFetch patterns

- **Domain suffix match**: `WebFetch(domain:example.com)` matches requests to `example.com` and `*.example.com`.
- No `*` wildcard in domain patterns. Matching is suffix-based on hostname.

#### Agent and Skill patterns

- **Exact name match**: `Agent(Explore)`, `Agent(my-agent)`, `Skill(validate-sql)`.
- No wildcard support. Names are matched as-is (case-sensitive).

### What's NOT allowed in a rule

- **Unescaped parentheses in content**: If your rule content contains literal `(` or `)`, escape them as `\(` and `\)`, e.g., `Bash(python -c "print\(1\)")`. The parser tracks escaped characters and will treat unescaped parens as part of the rule structure.
- **Content after closing paren**: `Bash(ls) && cat` is malformed. The closing paren must be the last character.
- **Missing tool name**: `(npm run build)` is invalid; the tool name is required.
- **Spaces in unquoted paths**: Not strictly invalid, but `Read(src/my file.txt)` is ambiguous in settings.json unless properly quoted. Use glob patterns or escape spaces.

---

[← Back to Permissions/README.md](./README.md)
