---
title: "How CLI Invocation Works"
tags: [cli]
---

# How CLI invocation works


- **Binary name is `claude`.** Installed via npm (`npm install -g claude`), Homebrew, or direct download.
- **Default mode is interactive REPL.** Passing a prompt as a positional argument runs one-shot and exits (unless `--no-session-persistence` or similar mode is active).
- **Subcommands dispatch separate workflows:** `claude config`, `claude mcp`, `claude plugin`, `claude auth`, etc. run dedicated commands rather than starting the REPL.
- **Flags use `--long-form` with `-s` short-form.** Boolean flags accept both `--flag` and `--no-flag` forms; some flags have both long and short options (e.g., `-p` / `--print`, `-c` / `--continue`).
- **Flag precedence: CLI flag > environment variable > settings.json.** CLI arguments override both env vars and persisted settings.
- **Stdin is read when non-TTY input is detected or `--print` / `-p` is passed.** This allows piping content for processing: `cat logs.txt | claude -p "analyze"`.
- **Exit codes: 0 = success, non-zero = error.** Use `$?` to check the exit status in scripts.

---

[← Back to CLI/README.md](/claude-code-docs/cli/overview/)
