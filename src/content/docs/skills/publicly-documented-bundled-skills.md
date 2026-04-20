---
title: "Publicly Documented Bundled Skills"
tags: [skills, cli]
---

# Publicly-documented bundled skills


### Code operations

#### `/batch`

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/batch.ts`
- **Aliases:** none
- **User-invocable:** yes (required)
- **Model-invocable:** yes
- **Gating:** always enabled
- **Argument hint:** `<instruction>`
- **Allowed tools:** inherits from session (tool use via agents)
- **Model override:** none
- **Description:** Research and plan a large-scale change, then execute it in parallel across 5–30 isolated worktree agents that each open a PR.
- **When to use:** Use when the user wants to make a sweeping, mechanical change across many files (migrations, refactors, bulk renames) that can be decomposed into independent parallel units. Example: `/batch migrate from React to Vue`.
- **Example:** `/batch migrate src/ from Solid to React`
- **Notes:** Requires a git repository. Spawns independent agents in isolated worktrees (via `isolation: "worktree"`). Requires git and GitHub CLI (`gh`). Phase 1 is plan mode where work is decomposed; Phase 2 spawns all worker agents in parallel; Phase 3 tracks completion and PR links.

#### `/simplify`

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/simplify.ts`
- **Aliases:** none
- **User-invocable:** yes (default)
- **Model-invocable:** yes
- **Gating:** always enabled
- **Argument hint:** `[focus]` (optional)
- **Allowed tools:** inherits from session
- **Model override:** none
- **Description:** Review changed code for reuse, quality, and efficiency, then fix any issues found.
- **When to use:** Use after making code changes to audit for redundancy, anti-patterns, and performance issues. Spawns three concurrent review agents (code reuse, quality, efficiency) and aggregates findings.
- **Example:** `/simplify focus on memory efficiency`
- **Notes:** Reads git diff to identify changed files. Non-git workflows fall back to recently modified files. Agent-based; runs in parallel via Agent tool.

#### `/debug`

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/debug.ts`
- **Aliases:** none
- **User-invocable:** yes (required)
- **Model-invocable:** no (`disableModelInvocation: true`)
- **Gating:** always enabled
- **Argument hint:** `[issue description]` (optional)
- **Allowed tools:** `Read`, `Grep`, `Glob`
- **Model override:** none
- **Description:** Enable debug logging for this session and help diagnose issues.
- **When to use:** Use when debugging a problem in the current Claude Code session. Debug logging is off by default unless started with `claude --debug`; running `/debug` mid-session enables logging from that point forward.
- **Example:** `/debug Claude is hanging during file reads` or just `/debug`
- **Notes:** For ant users, description shows "Includes all event logging". Non-ant users see shorter description. Tails the last 64KB of the debug log and reads last 20 lines. Launches the "Claude Code Guide" subagent for feature explanations if needed.

### Session & conversation

#### `/loop`

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/loop.ts`
- **Aliases:** `/proactive`
- **User-invocable:** yes (default)
- **Model-invocable:** yes
- **Gating:** feature-flag gated (`isKairosCronEnabled()` — must have Kairos cron backend available)
- **Argument hint:** `[interval] <prompt>`
- **Allowed tools:** inherits from session (uses Cron Create/Delete tools internally)
- **Model override:** none
- **Description:** Run a prompt or slash command on a recurring interval (e.g. `/loop 5m /foo`, defaults to 10m).
- **When to use:** When the user wants to set up a recurring task, poll for status, or run something repeatedly on an interval (e.g. "check the deploy every 5 minutes", "keep running /babysit-prs"). Do NOT invoke for one-off tasks.
- **Example:** `/loop 5m check if the deploy finished` or `/loop 30m /babysit-prs`
- **Notes:** Parses interval from leading token (`5m`, `2h`, `1d`) or trailing `every` clause. Defaults to 10m if no interval given. Converts intervals to cron expressions. Minimum granularity is 1 minute; seconds are rounded up. Tasks auto-expire after 30 days. Invokes the prompt immediately after scheduling (does not wait for first cron fire).

#### `/stuck` (internal)

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/stuck.ts`
- **Aliases:** none
- **User-invocable:** yes
- **Model-invocable:** no (`disableModelInvocation: true`)
- **Gating:** ant-only (`USER_TYPE !== 'ant'` → not registered)
- **Argument hint:** `[pid or symptom]` (optional)
- **Allowed tools:** inherits from session (for bash diagnostics)
- **Model override:** none
- **Description:** [ANT-ONLY] Investigate frozen/stuck/slow Claude Code sessions on this machine and post a diagnostic report to #claude-code-feedback.
- **When to use:** Use when another Claude Code session on the same machine appears frozen, stuck, or very slow. Diagnosis includes CPU, memory, process state, child processes, and optional stack dumps.
- **Notes:** Scans `ps` output for hung processes (state D = uninterruptible sleep, state T = stopped, state Z = zombie). Looks for high CPU (≥90%) or high RSS (≥4GB). Posts diagnostic report to Slack #claude-code-feedback via MCP if available. Ant staff only.

### Integrations & API

#### `/claude-api`

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/claudeApi.ts`
- **Aliases:** none
- **User-invocable:** yes (default)
- **Model-invocable:** yes (auto-triggers when code imports `anthropic` or `@anthropic-ai/sdk`)
- **Gating:** always enabled
- **Argument hint:** none
- **Allowed tools:** `Read`, `Grep`, `Glob`, `WebFetch`
- **Model override:** none
- **Description:** Build apps with the Claude API or Anthropic SDK. Loads language-specific Claude API reference material (Python, TypeScript, Java, Go, Ruby, C#, PHP, cURL). Covers tool use, streaming, batches, structured outputs, Managed Agents, and common pitfalls.
- **When to use:** Use when code imports `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`, or user asks to use Claude API, Anthropic SDKs, or Agent SDK. **Do NOT trigger** when code imports `openai`/other AI SDK, general programming, or ML/data-science tasks.
- **Reference files extracted:** Yes — 247KB of language-specific documentation bundled and lazy-loaded. Extracted on first invocation to enable Read/Grep queries on reference docs.
- **Example:** `/claude-api How do I stream responses?` or auto-invoked when you import the SDK
- **Notes:** Auto-detects project language by scanning for language indicators (`.py` files, `package.json`, `go.mod`, etc.). If no language detected, includes all docs and asks user. Reference material includes README, streaming, tool-use, batches, files-API, prompt-caching, error codes, and live links to web docs.

#### `/claude-in-chrome`

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/claudeInChrome.ts`
- **Aliases:** none
- **User-invocable:** yes (default)
- **Model-invocable:** yes (can auto-trigger when user has Claude in Chrome extension configured)
- **Gating:** `shouldAutoEnableClaudeInChrome()` — checks if extension is installed and configured
- **Argument hint:** none
- **Allowed tools:** MCP tools from Claude in Chrome extension (browser automation, screenshots, console logs, etc.)
- **Model override:** none
- **Description:** Automates your Chrome browser to interact with web pages - clicking elements, filling forms, capturing screenshots, reading console logs, and navigating sites. Opens pages in new tabs within your existing Chrome session. Requires site-level permissions before executing (configured in the extension).
- **When to use:** When the user wants to interact with web pages, automate browser tasks, capture screenshots, read console logs, or perform any browser-based actions. Always invoke BEFORE attempting to use any `mcp__claude-in-chrome__*` tools.
- **Example:** `/claude-in-chrome Take a screenshot of the login form`
- **Notes:** Wraps MCP tools from the Claude in Chrome browser extension. First call `mcp__claude-in-chrome__tabs_context_mcp` to learn about current tabs. Gating checks `shouldAutoEnableClaudeInChrome()` which verifies the extension is installed.

### Configuration & setup

#### `/update-config`

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/updateConfig.ts`
- **Aliases:** none
- **User-invocable:** yes (default)
- **Model-invocable:** yes
- **Gating:** always enabled
- **Argument hint:** none
- **Allowed tools:** `Read` (for reading existing settings files)
- **Model override:** none
- **Description:** Configure Claude Code via settings.json. Use for hooks ("run X before/after Y"), permissions ("allow Z"), environment variables, MCP configuration, and any settings.json modifications.
- **When to use:** Use when the user wants to automate behaviors via hooks, add permissions, set environment variables, or modify any `.claude/settings.json` or `.claude/settings.local.json` file. For simple settings like theme/model, the Config tool is preferred.
- **Example:** `/update-config allow npm commands without prompting` or `/update-config set DEBUG=true`
- **Notes:** Includes comprehensive hook documentation with examples (PreToolUse, PostToolUse, PreCompact, etc.). Always reads existing file before writing (merge-first strategy). Provides hook verification workflow: construct, pipe-test, validate, prove, deploy. Distinguishes when hooks are required vs. memory is sufficient.

#### `/keybindings-help`

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/keybindings.ts`
- **Aliases:** none
- **User-invocable:** no (`user-invocable: false`)
- **Model-invocable:** yes (only Claude invokes)
- **Gating:** `isKeybindingCustomizationEnabled()` — checks if feature is available
- **Argument hint:** none
- **Allowed tools:** `Read`
- **Model override:** none
- **Description:** Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json.
- **When to use:** Use for keybinding customization requests like "rebind ctrl+s", "add a chord shortcut", "change the submit key".
- **Reference files extracted:** no
- **Example:** Claude may invoke when you ask "How do I rebind the save key?"
- **Notes:** Generates reference tables dynamically from source-of-truth arrays (contexts, actions, reserved shortcuts). Includes keystroke syntax guide (modifiers: ctrl, alt, shift, meta; chords with 1-second timeout between). Validates against reserved shortcuts (terminal, macOS). `/doctor` command validates keybinding syntax.

#### `/schedule`

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/scheduleRemoteAgents.ts`
- **Aliases:** none
- **User-invocable:** yes (default)
- **Model-invocable:** yes
- **Gating:** feature-flag (`tengu_surreal_dali`) + policy check (`allow_remote_sessions`)
- **Argument hint:** none
- **Allowed tools:** `RemoteTrigger` (for API calls), `AskUserQuestion`
- **Model override:** none
- **Description:** Create, update, list, or run scheduled remote agents (triggers) that execute on a cron schedule in Anthropic's cloud infrastructure.
- **When to use:** When the user wants to schedule a recurring remote agent, set up automated tasks, create a cron job for Claude Code, or manage their scheduled agents/triggers.
- **Example:** `/schedule every morning at 9am check the deploy status`
- **Notes:** Requires claude.ai account authentication (API accounts not supported). Minimum cron interval is 1 hour. Converts user times to UTC using their local timezone. Supports attaching MCP connectors (Slack, Datadog, etc.). Creates default environment if none exist. Cross-checks GitHub app permissions if triggering repo changes. Remote agents run in isolated cloud environments with no access to local machine/files.

### Developer / internal

#### `/verify` (internal)

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/verify.ts`
- **Aliases:** none
- **User-invocable:** yes
- **Model-invocable:** no
- **Gating:** ant-only (`USER_TYPE !== 'ant'` → not registered)
- **Argument hint:** none
- **Allowed tools:** inherits from session
- **Model override:** none
- **Description:** Verify a code change does what it should by running the app.
- **When to use:** Use for testing and verifying that code changes work as intended.
- **Reference files extracted:** yes (via `files: SKILL_FILES` from `verifyContent.ts`)
- **Notes:** Ant-only skill. Content and reference files imported from `verifyContent.ts`. Allows optional user request argument for focused verification.

#### `/remember` (internal)

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/remember.ts`
- **Aliases:** none
- **User-invocable:** yes
- **Model-invocable:** no
- **Gating:** auto-memory enabled (`isAutoMemoryEnabled()`)
- **Argument hint:** none
- **Allowed tools:** inherits from session (Read, Edit, etc.)
- **Model override:** none
- **Description:** Review auto-memory entries and propose promotions to CLAUDE.md, CLAUDE.local.md, or shared memory. Also detects outdated, conflicting, and duplicate entries across memory layers.
- **When to use:** Use when the user wants to review, organize, or promote their auto-memory entries. Also useful for cleaning up outdated or conflicting entries across CLAUDE.md, CLAUDE.local.md, and auto-memory.
- **Notes:** Only registered if `isAutoMemoryEnabled()` returns true. Classifies auto-memory entries into destinations: CLAUDE.md (team conventions), CLAUDE.local.md (personal preferences), team memory (org-wide). Detects duplicates and conflicts. Proposes changes but does not modify without explicit approval.

#### `/lorem-ipsum` (internal)

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/loremIpsum.ts`
- **Aliases:** none
- **User-invocable:** yes
- **Model-invocable:** no
- **Gating:** ant-only (`USER_TYPE !== 'ant'` → not registered)
- **Argument hint:** `[token_count]`
- **Allowed tools:** none
- **Model override:** none
- **Description:** Generate filler text for long context testing. Specify token count as argument (e.g., `/lorem-ipsum 50000`). Outputs approximately the requested number of tokens.
- **Example:** `/lorem-ipsum 10000`
- **Notes:** Ant-only. Capped at 500,000 tokens for safety. Generates random sentences from a curated list of 200+ one-token English words. Paragraphs inserted randomly (~20% chance after each sentence).

#### `/skillify` (internal)

- **Type:** Bundled skill
- **Source:** `claude-code-main/skills/bundled/skillify.ts`
- **Aliases:** none
- **User-invocable:** yes
- **Model-invocable:** no (`disableModelInvocation: true`)
- **Gating:** ant-only (`USER_TYPE !== 'ant'` → not registered)
- **Argument hint:** `[description of the process you want to capture]` (optional)
- **Allowed tools:** `Read`, `Write`, `Edit`, `Glob`, `Grep`, `AskUserQuestion`, `Bash(mkdir:*)`
- **Model override:** none
- **Description:** Capture this session's repeatable process into a skill. Call at end of the process you want to capture with an optional description.
- **When to use:** Use at the end of a complex workflow you want to automate and reuse. Example: After completing a cherry-pick workflow, run `/skillify cherry-pick workflow` to capture the steps.
- **Notes:** Ant-only. Interviews user via AskUserQuestion in multiple rounds: high-level confirmation, detailed breakdown, per-step analysis, final questions. Reads session memory and user messages to understand the context. Generates `SKILL.md` in user's chosen location (.claude/skills/ or ~/.claude/skills/). Includes frontmatter for metadata and detailed step-by-step instructions with success criteria and annotations.

---

[← Back to Skills/README.md](/claude-code-docs/skills/overview/)
