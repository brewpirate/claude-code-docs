---
title: "Handler Types"
tags: [hooks, settings]
---


### `command` handler

**Purpose:** Execute a shell command, receive JSON input on stdin, parse JSON response for decision.

**Config fields (from schema):**
- `type: "command"` (required)
- `command: string` (required) — shell command to execute
- `timeout: number` (seconds; optional, default ~600)
- `shell: "bash" | "powershell"` (optional, default bash)
- `async: boolean` (optional) — run in background without blocking
- `asyncRewake: boolean` (optional) — run in background; resume model if exit code 2
- `statusMessage: string` (optional) — custom spinner text while running
- `if: string` (optional) — permission rule (e.g., `"Bash(git *)"`) to filter when hook runs
- `once: boolean` (optional) — fire once per session, then remove

**Behavior:**
- Hook input (event payload JSON) is written to stdin
- Stdout is captured; first valid JSON block in stdout is parsed as decision
- Exit code 0 = success (continue); exit code 2 = blocking error (block); other codes = non-blocking error (logged, continue)
- Stderr is included in hook output for logging/debugging

**Security:**
- Gated by `disableSkillShellExecution` setting (for skill/project/plugin source hooks; bundled/managed/user hooks unaffected)
- Runs in the same shell context as Claude Code; can access all env vars, file system

**Example:**
```yaml
---
hooks:
  PreToolUse:
    - matcher: Bash
      hooks:
        - type: command
          command: /path/to/hook.sh
          timeout: 30
          shell: bash
          statusMessage: Checking bash command safety...
```

### `http` handler

**Purpose:** POST hook input JSON to a webhook URL; parse response JSON for decision.

**Config fields (from schema):**
- `type: "http"` (required)
- `url: string` (required, must be valid URL) — endpoint to POST to
- `timeout: number` (seconds; optional, default ~600)
- `headers: { [key: string]: string }` (optional) — additional HTTP headers, supports env var interpolation (`$VAR_NAME` or `${VAR_NAME}`)
- `allowedEnvVars: string[]` (optional) — env var names that can be interpolated in headers; others become empty strings
- `statusMessage: string` (optional) — custom status text
- `if: string` (optional) — permission rule filter
- `once: boolean` (optional)

**Behavior:**
- Hook input is POSTed as JSON body
- HTTP 2xx response = success (parse JSON body for decision); non-2xx = non-blocking error
- Response JSON parsed for decision fields (see decision format below)
- Supports env var substitution in headers: `"Authorization": "Bearer $MY_TOKEN"` (only if `MY_TOKEN` is in `allowedEnvVars`)

**Security (CRITICAL):**
- **URL allowlist:** URL must match a pattern in settings.json `allowedHttpHookUrls` (support `*` wildcard, e.g., `"https://hooks.example.com/*"`)
- **Env var allowlist (double-check):** Env vars used in headers must be listed in BOTH hook's `allowedEnvVars` AND settings.json `httpHookAllowedEnvVars`. The effective set is the intersection.
- **SSRF guard:** `ssrfGuard.ts` blocks requests to private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.0.0/16, etc.), with exceptions for loopback (127.0.0.1, ::1) for local dev policy servers

**Example:**
```yaml
---
hooks:
  PreToolUse:
    - matcher: "Bash|Write"
      hooks:
        - type: http
          url: https://policy.example.com/validate
          headers:
            Authorization: "Bearer $POLICY_TOKEN"
            X-Session-ID: "${CLAUDE_SESSION_ID}"
          allowedEnvVars:
            - POLICY_TOKEN
          timeout: 10
```

### `prompt` handler

**Purpose:** Send hook input + custom prompt to an LLM; parse response as decision.

**Config fields (from schema):**
- `type: "prompt"` (required)
- `prompt: string` (required) — custom prompt; supports `$ARGUMENTS` placeholder for hook input JSON
- `timeout: number` (seconds; optional, default ~30)
- `model: string` (optional) — LLM model ID (e.g., `"claude-opus-4-1-20250805"`); defaults to small/fast model
- `statusMessage: string` (optional)
- `if: string` (optional)
- `once: boolean` (optional)

**Behavior:**
- Prompt is combined with hook input JSON (via `$ARGUMENTS` substitution)
- Single-turn LLM call; response must be JSON
- Expected response: `{ "ok": true }` (approve) or `{ "ok": false, "reason": "..." }` (block)
- Model specified in `model` field, or defaults to Haiku (fast, cheap)

**Tokens:** Each invocation consumes tokens from account. For high-frequency events (PreToolUse), consider `command` or `http` hooks to reduce costs.

**Example:**
```yaml
---
hooks:
  PermissionRequest:
    - matcher: Bash
      hooks:
        - type: prompt
          prompt: |
            The user requested to run this bash command:
            $ARGUMENTS
            
            Is this command safe and reasonable? Return {"ok": true} or {"ok": false, "reason": "..."}.
          model: claude-opus
          timeout: 10
```

### `agent` handler

**Purpose:** Dispatch to a sub-agent for multi-turn verification/decision with tool access.

**Config fields (from schema):**
- `type: "agent"` (required)
- `prompt: string` (required) — task prompt for the agent; supports `$ARGUMENTS` placeholder
- `timeout: number` (seconds; optional, default ~60)
- `model: string` (optional, defaults to Haiku)
- `statusMessage: string` (optional)
- `if: string` (optional)
- `once: boolean` (optional)

**Behavior:**
- Spawns a sub-agent with the given prompt
- Agent receives tools: Read, Grep, Glob, etc. (depends on hook event and permissions)
- Multi-turn agent loop: agent can request info, inspect files, then return decision
- Response parsed as: `{ "ok": true }` (approve) or `{ "ok": false, "reason": "..." }` (block)

**When to use:** For complex decisions that require inspecting the codebase, checking commit history, or multi-step reasoning. More powerful and expensive than `prompt` hooks but justified for high-stakes events like `PreToolUse` with destructive commands.

**Example:**
```yaml
---
hooks:
  PreToolUse:
    - matcher: Bash
      hooks:
        - type: agent
          prompt: |
            Review this bash command: $ARGUMENTS
            
            Check:
            1. Does the command match our coding standards?
            2. Are there any security concerns (e.g., unsafe input handling)?
            3. Would this command conflict with existing files?
            
            Respond with {"ok": true} if safe, {"ok": false, "reason": "..."} otherwise.
          timeout: 60
          if: "Bash(rm -rf *|sudo *)"  # Only for risky patterns
```

---

[← Back to Hooks/README.md](/claude-code-docs/hooks/overview/)
