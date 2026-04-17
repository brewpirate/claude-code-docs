# Claude Code Bundled Skills

Bundled skills ship compiled into the Claude Code CLI and are registered at startup via `registerBundledSkill()`. Distinct from user-authored skills (in `.claude/skills/`) and plugin-provided skills, bundled skills are maintained by Anthropic and updated with each release. Most are invokable both via `/skill-name` (when `user-invocable: true`) and via the Skill tool (when `disableModelInvocation: false`).

This is a companion to [FRONTMATTER.md](FRONTMATTER.md), which documents the skill frontmatter schema itself. See the [Commands reference](/en/commands) for the complete list of built-in commands; bundled skills are marked **[Skill]** there.

## How bundled skills work

- **Registered at startup**: Each bundled skill definition calls `registerBundledSkill({ name, description, ... })` once when the CLI initializes. The definition compiles into the binary—not markdown files on disk.
- **Prompt builder pattern**: Unlike built-in commands that execute fixed logic, bundled skills use a `getPromptForCommand()` function that returns the skill's instructions as a dynamic prompt. Claude then orchestrates the work using tools.
- **Gating via `isEnabled()`**: The optional `isEnabled` function controls whether a skill appears in the UI and is available to the model. Common checks: `USER_TYPE === 'ant'` (Anthropic staff only), feature flags, remote-mode availability, or permission policies.
- **Reference files extracted to disk**: Some bundled skills include a `files` map (reference documentation, templates, etc.). On first invocation, these files are extracted to a temporary cache directory, and the skill prompt is prefixed with `Base directory for this skill: <dir>` so Claude can Read/Grep them on demand, just like disk-based skills.
- **Invocation control via frontmatter**:
  - `user-invocable: true` (default) — appears in the `/` menu and can be invoked with `/skill-name`
  - `user-invocable: false` — hidden from the `/` menu; only Claude can invoke via the Skill tool
  - `disable-model-invocation: true` — Claude cannot invoke; only users can invoke via `/skill-name`
  - `disableModelInvocation: false` (default) — Claude can load and invoke the skill automatically when relevant
- **Aliases**: Some skills have aliases (alternative names). For example, `/loop` also responds to `/proactive`.
- **Exposed as slash commands**: A subset of bundled skills are also listed in the [Commands reference](/en/commands), marked as **[Skill]**, and can be invoked directly. Examples: `/batch`, `/simplify`, `/loop`, `/debug`, `/claude-api`.

## Quick reference

| Skill | Aliases | /command? | Model-invocable? | Gating | Purpose |
|-------|---------|-----------|------------------|--------|---------|
| `/batch` | — | ✓ | Yes | always on | Orchestrate large parallel refactors across a codebase |
| `/simplify` | — | ✓ | Yes | always on | Review code for reuse, quality, and efficiency issues |
| `/debug` | — | ✓ | No | always on | Enable debug logging and diagnose session issues |
| `/loop` | `/proactive` | ✓ | Yes | feature-flag | Run prompts on a recurring cron interval |
| `/claude-api` | — | ✓ | Yes | always on | Load Claude API reference material for your language |
| `/verify` | — | ✗ | No | ant-only | Verify a code change works by running the app |
| `/remember` | — | ✗ | No | auto-memory only | Review and organize auto-memory entries |
| `/stuck` | — | ✗ | No | ant-only | Diagnose frozen/stuck Claude Code sessions |
| `/claude-in-chrome` | — | ✗ | Yes | conditional | Automate Chrome browser interactions |
| `/keybindings-help` | — | ✗ | No | if customization enabled | Configure keyboard shortcuts |
| `/update-config` | — | ✗ | Yes | always on | Modify Claude Code settings and hooks |
| `/lorem-ipsum` | — | ✗ | No | ant-only | Generate filler text for context testing |
| `/skillify` | — | ✗ | No | ant-only | Capture a session as a reusable skill |
| `/schedule` | — | ✗ | Yes | feature-flag | Schedule remote agents on a cron |

## Publicly-documented bundled skills

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

## Internal / undocumented bundled skills

These skills exist in the source tree but are either not in the public skills docs, are gated to internal users (ant/Anthropic staff), or are feature-flag gated pending release.

### Ant-only skills

Skills marked "ant-only" via `isEnabled: () => process.env.USER_TYPE === 'ant'` are restricted to Anthropic staff and do not appear in public documentation or user menus.

**Ant-only list:**
- `/verify` — verify code changes work by running the app
- `/stuck` — diagnose frozen/stuck Claude Code sessions
- `/lorem-ipsum` — generate filler text for context testing (capped 500k tokens)
- `/skillify` — capture a session as a reusable skill

### Feature-flag-gated skills

Skills that depend on Statsig feature flags or cloud infrastructure features:

**`/loop` and `/schedule`:**
- `/loop` requires `isKairosCronEnabled()` — must have Kairos cron backend available
- `/schedule` requires two gates: `tengu_surreal_dali` feature flag AND `allow_remote_sessions` policy permission

These may be unreleased or in beta. Check the source constants for current feature names.

## Discrepancies & notes

### Documentation vs. Source Mismatches

1. **`/debug`** — Commands docs state it's invokable and user-triggerable. Source confirms `userInvocable: true, disableModelInvocation: true`, so only manual invocation. ✓ Consistent.

2. **`/keybindings-help`** — Registered as `/keybindings` in schema but source registers as `keybindings-help`. The `/keybindings` command in Commands docs is a built-in command (not skill) that opens the config UI; the skill is the reference content. ✓ Consistent (different components).

3. **`/loop` and `/schedule`** — Not listed in public commands docs but source files exist and are feature-flag gated. Likely unreleased or beta.

4. **`/remember`** — Not in public docs; Anthropic staff skill for auto-memory management. Only registered if auto-memory is enabled.

### Skills without `registerBundledSkill()` calls

- **`claudeApiContent.ts`** — Not a skill. Contains bundled markdown reference material (247KB) lazy-loaded by `/claude-api`. Exported as `SKILL_FILES` and `SKILL_PROMPT` for inline reference inclusion.
- **`verifyContent.ts`** — Not a skill. Contains reference files and markdown content for `/verify` skill.
- **`index.ts`** — Re-exports registration functions; not itself a skill.

All other `.ts` files contain a single `registerBundledSkill()` call.

### Gating summary

| Gating Mode | Skills | Availability |
|-------------|--------|---|
| Always on | `/batch`, `/simplify`, `/debug`, `/claude-api`, `/update-config` | All users, all modes |
| Auto-memory gated | `/remember` | Only if auto-memory enabled |
| Feature-flag gated | `/loop` (Kairos), `/schedule` (tengu_surreal_dali + policy) | Conditional on feature rollout |
| Ant-only | `/verify`, `/stuck`, `/lorem-ipsum`, `/skillify` | Anthropic staff only |
| Extension-gated | `/claude-in-chrome` | Only if Claude in Chrome extension installed |
| Keybinding feature | `/keybindings-help` | Only if keybinding customization enabled |

### Wiring caveats

- **Registration happens outside the skill file.** Each skill's `registerBundledSkill()` call must fire somewhere during CLI initialization (typically a central init file not shown in `bundled/`). The source tree shows skill *definitions*, but the wiring is external — skills don't self-register on import.
- **Feature-flag names are volatile.** Flag identifiers like `tengu_surreal_dali` and `isKairosCronEnabled()` are internal Statsig names that can be renamed or retired without notice. Treat them as implementation details; don't build automations that hard-code them.

## Adding your own skills

To create custom skills beyond the bundled set:

- **User skills:** `~/.claude/skills/<name>/SKILL.md` — available across all your projects
- **Project skills:** `.claude/skills/<name>/SKILL.md` — visible to this project only; commit to version control to share with team
- **Plugin skills:** `<plugin>/skills/<name>/SKILL.md` — bundled with plugins
- **Managed skills:** Deploy org-wide via managed settings for enterprise deployments

See [FRONTMATTER.md](FRONTMATTER.md) for the complete frontmatter schema and [the skills guide](https://code.claude.com/docs/en/skills) for detailed authoring patterns.
