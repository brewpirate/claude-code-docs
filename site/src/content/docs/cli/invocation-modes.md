---
title: "Invocation Modes"
---

# Invocation modes


### Interactive REPL (default)
Entering `claude` with no arguments or a custom prompt opens the default interactive REPL where you can run multiple turns, use slash commands, and interact with Claude.

```bash
claude
```

### One-shot prompt
Passing a prompt as a positional argument runs Claude once and exits. Works in both interactive and print modes.

```bash
claude "Explain this code"
claude --model opus "Analyze this architecture"
```

### Piped stdin
Pipe content directly into Claude for processing. Use `-p` (print mode) for non-interactive workflows.

```bash
cat logs.txt | claude -p "Find errors"
echo "code snippet" | claude -p "Review for bugs"
```

### Session resume
Load and continue a recent conversation or resume by name/ID.

```bash
claude --continue              # Load most recent
claude --resume my-project     # Resume by custom name
claude -r 550e8400-...         # Resume by UUID
```

### Print mode (SDK / headless)
Run Claude once and output structured results without an interactive REPL. Essential for scripting, CI/CD, and programmatic access.

```bash
claude -p "query"
claude -p --output-format json "query"
claude -p --output-format stream-json "query"
```

### Git worktree
Run Claude in an isolated worktree for parallel development.

```bash
claude -w feature-branch
claude -w feature-branch --tmux
```

### Remote / web sessions
Create or resume sessions on claude.ai.

```bash
claude --remote "Fix login bug"        # Create web session
claude --teleport session-id           # Resume in terminal
claude --remote-control "My Project"   # Enable Remote Control
```

---

[← Back to CLI/README.md](/claude-code-docs/cli/overview/)
