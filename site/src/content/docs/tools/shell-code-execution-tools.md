---
title: "Shell & Code Execution Tools"
---

# Shell & code execution tools


### `Bash`
- **Invoked as:** `Bash`
- **Source directory:** `claude-code-main/tools/BashTool/`
- **Class:** Shell
- **Side effect:** Executes
- **Gating:** Always; permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Executes shell commands in your environment." Each command runs in a separate process. Working directory persists across commands if it remains within the project directory; outside that, it resets. Environment variables do not persist between commands.
- **Input parameters:**
  - `command` (string, required) — Shell command to execute
- **Returns:** Standard output and exit code.
- **Notes:** Permission required. Working directory behavior: `cd` persists within the project or `additionalDirectories`; outside those, resets to project root. Set `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR=1` to disable carry-over. Export statements do not persist; use `CLAUDE_ENV_FILE` for multi-command environment setup.

### `PowerShell`
- **Invoked as:** `PowerShell`
- **Source directory:** `claude-code-main/tools/PowerShellTool/`
- **Class:** Shell
- **Side effect:** Executes
- **Gating:** Opt-in via `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`; permission required
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Executes PowerShell commands natively." On Windows, routes commands through PowerShell instead of Git Bash. Requires PowerShell 7+ on non-Windows platforms (pwsh). Same working-directory and environment-variable persistence behavior as Bash.
- **Input parameters:**
  - `command` (string, required) — PowerShell command to execute
- **Returns:** Standard output and exit code.
- **Notes:** Opt-in on non-Windows. Requires pwsh 7+ on Linux/macOS/WSL. On Windows, auto-detects pwsh.exe (7+) with fallback to powershell.exe (5.1). Bash tool remains registered alongside. Same working-directory reset rules apply. Not available in sandboxed mode on Windows during preview.

### `Monitor`
- **Invoked as:** `Monitor`
- **Source directory:** Not present in the inspected source snapshot — may be newer than the snapshot or registered elsewhere. See "Discrepancies & notes" below.
- **Class:** Shell
- **Side effect:** Executes
- **Gating:** Permission required; unavailable on Bedrock, Vertex AI, Foundry, or when `DISABLE_TELEMETRY` is set
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Runs a command in the background and feeds each output line back to Claude, so it can react to log entries, file changes, or polled status mid-conversation." Claude writes a watch script, runs it in the background, and receives each line as it arrives without pausing the conversation.
- **Input parameters:**
  - `command` (string, required) — Command to run in the background
  - `description` (string, optional) — Human-readable description of what to watch
- **Returns:** Each output line from the monitored command, streamed back as it arrives.
- **Notes:** Uses same permission rules as Bash. Not available on Bedrock, Vertex, or Foundry. Requires non-disabled telemetry (because it relies on the stream health watchdog). Stop by asking Claude to cancel or by ending the session.

### `LSP`
- **Invoked as:** `LSP`
- **Source directory:** `claude-code-main/tools/LSPTool/`
- **Class:** Code intelligence
- **Side effect:** Read-only
- **Gating:** Always (inactive until language server is installed via code-intelligence plugin)
- **Documented in public docs?:** Yes — https://code.claude.com/docs/en/tools-reference
- **Description:** "Code intelligence via language servers: jump to definitions, find references, report type errors and warnings." Auto-reports type errors and warnings after each file edit. Can also be called directly for navigation and inspection.
- **Input parameters:**
  - `file` (string, required) — File path
  - `line` (number, required) — Line number (0-indexed)
  - `character` (number, required) — Character offset on the line
  - `action` (string, required) — One of: `definition`, `references`, `hover`, `symbols`, `implementation`, `callHierarchy`
- **Returns:** Structured response with symbols, definitions, references, type info, or diagnostics.
- **Notes:** Inactive until a code-intelligence plugin for your language is installed (bundles the LSP configuration; you install the binary separately). Auto-reports are non-interactive. Direct calls require explicit action parameter.

---

[← Back to Tools/README.md](./README.md)
