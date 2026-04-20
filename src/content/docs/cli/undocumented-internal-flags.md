---
title: "Undocumented Internal Flags"
tags: [cli]
---

# Undocumented & internal flags


The following flags were found in the source code but are not publicly documented. They are either internal, experimental, or development-only.

### `--advisor`
- **Source:** `main.tsx:3814`
- **Status:** Internal / Research
- **Argument:** `<model>` — model name or alias
- **Purpose:** Enable the server-side advisor tool with the specified model. Accessible only to users who can configure it.
- **Notes:** Gated by `canUserConfigureAdvisor()`. Not in public docs.

### `--agent-id`, `--agent-name`, `--team-name`, `--agent-color`
- **Source:** `main.tsx:3851-3854`
- **Status:** Internal / Teammate mode
- **Purpose:** Set teammate agent ID, display name, team name, and UI color. Set by the leader when spawning tmux teammates.
- **Notes:** These replace `CLAUDE_CODE_*` environment variables. Hidden from help.

### `--plan-mode-required`
- **Source:** `main.tsx:3855`
- **Status:** Internal
- **Purpose:** Require plan mode before implementation.
- **Notes:** Hidden from help. For agent team coordination.

### `--parent-session-id`
- **Source:** `main.tsx:3856`
- **Status:** Internal / Analytics
- **Purpose:** Parent session ID for analytics correlation.
- **Notes:** Hidden from help.

### `--agent-type`
- **Source:** `main.tsx:3858`
- **Status:** Internal
- **Purpose:** Custom agent type for this teammate.
- **Notes:** Hidden from help. Used in agent swarms.

### `--sdk-url`
- **Source:** `main.tsx:3861`
- **Status:** Internal / SDK
- **Purpose:** Use remote WebSocket endpoint for SDK I/O streaming (only with `-p` and stream-json format).
- **Notes:** Hidden from help. For SDK use cases.

### `--hard-fail`
- **Source:** `main.tsx:3871`
- **Status:** Debug / Crash on error
- **Purpose:** Crash on logError calls instead of silently logging.
- **Notes:** Hidden from help. Development only.

### `--proactive`
- **Source:** `main.tsx:3833`
- **Status:** Experimental / Research
- **Argument:** None (boolean)
- **Purpose:** Start in proactive autonomous mode.
- **Notes:** Gated by `PROACTIVE` or `KAIROS` feature flags. Not in public docs.

### `--brief`
- **Source:** `main.tsx:3839`
- **Status:** Experimental / Research
- **Argument:** None (boolean)
- **Purpose:** Enable SendUserMessage tool for agent-to-user communication.
- **Notes:** Gated by `KAIROS` or `KAIROS_BRIEF` feature flags. Undocumented.

### `--messaging-socket-path`
- **Source:** `main.tsx:3836`
- **Status:** Internal / UDS messaging
- **Argument:** `<path>` — Unix domain socket path
- **Purpose:** Unix domain socket path for the UDS messaging server (defaults to a tmp path).
- **Notes:** Gated by `UDS_INBOX` feature flag.

### `--assistant`
- **Source:** `main.tsx:3842`
- **Status:** Internal / Kairos
- **Argument:** None (boolean)
- **Purpose:** Force assistant mode (Agent SDK daemon use).
- **Notes:** Gated by `KAIROS` feature flag. Hidden from help.

### `--delegate-permissions`, `--dangerously-skip-permissions-with-classifiers`, `--afk`
- **Source:** `main.tsx:3817-3825`
- **Status:** Internal (ANT-ONLY) / Deprecated
- **Purpose:** All are aliases for `--permission-mode auto`.
- **Notes:** Hidden from help. Deprecated in favor of explicit `--permission-mode auto`.

### `--tasks`
- **Source:** `main.tsx:3826`
- **Status:** Internal (ANT-ONLY)
- **Argument:** `[id]` — optional task list ID
- **Purpose:** Tasks mode: watch for tasks and auto-process them.
- **Notes:** Hidden from help. Anthropic-only feature.

### `--agent-teams`
- **Source:** `main.tsx:3827`
- **Status:** Internal (ANT-ONLY)
- **Argument:** None (boolean)
- **Purpose:** Force Claude to use multi-agent mode for solving problems.
- **Notes:** Hidden from help. Anthropic-only feature.

### `--enable-auto-mode`
- **Source:** `main.tsx:3830`
- **Status:** Deprecated / Research
- **Argument:** None (boolean)
- **Purpose:** Opt in to auto mode. Removed in v2.1.111.
- **Notes:** Auto mode is now in the `Shift+Tab` cycle by default; use `--permission-mode auto` instead.

### `--thinking`
- **Source:** `main.tsx:976`
- **Status:** Internal / Thinking control
- **Argument:** `<mode>` — required (`enabled`, `adaptive`, or `disabled`)
- **Purpose:** Thinking mode for models that support extended thinking. `enabled` is equivalent to `adaptive`; `disabled` turns thinking off.
- **Notes:** Hidden from help. Successor to `--max-thinking-tokens` for newer models.

### `--max-thinking-tokens`
- **Source:** `main.tsx:976`
- **Status:** Internal / Deprecated
- **Argument:** `<tokens>` — required (integer)
- **Purpose:** Maximum thinking tokens for models that support extended thinking. Print mode only.
- **Notes:** `[DEPRECATED. Use --thinking instead for newer models]` per the source help text. Env var equivalent: `MAX_THINKING_TOKENS`. Hidden from help.

### `--prefill`
- **Source:** `main.tsx:988`
- **Status:** Internal
- **Argument:** `<text>` — required (string)
- **Purpose:** Pre-fill the prompt input with text without submitting it. The user can then edit before pressing Enter.
- **Notes:** Hidden from help.

### `--workload`
- **Source:** `main.tsx:1000`
- **Status:** Internal / SDK billing
- **Argument:** `<tag>` — required (string)
- **Purpose:** Workload tag for billing-header attribution (sets the `cc_workload` API header). Process-scoped — the tag applies for the lifetime of this process only.
- **Notes:** Print mode only (`-p`). Hidden from help. Set by SDK daemon callers that spawn subprocesses for cron-style scheduled work so each call bills against the correct workload.

### `--enable-auth-status`
- **Source:** `main.tsx:988`
- **Status:** Internal / SDK
- **Argument:** None (boolean)
- **Purpose:** Emit auth-status stream messages in SDK mode so callers can observe authentication state transitions.
- **Notes:** Print mode only. Hidden from help. Default `false`.

### `--teleport`
- **Source:** `main.tsx:3864`
- **Status:** Internal (pre-GA)
- **Argument:** `[session]` — optional session ID
- **Purpose:** Resume a teleport session, optionally specifying a session ID.
- **Notes:** Hidden from help — kept undocumented in the source until the feature goes GA. See the `/teleport` slash command for the user-facing entry point.

### `--remote`
- **Source:** `main.tsx:3865`
- **Status:** Internal (pre-GA)
- **Argument:** `[description]` — optional
- **Purpose:** Create a remote session with the given description.
- **Notes:** Hidden from help — kept undocumented until the feature goes GA.

### `--remote-control`, `--rc`
- **Source:** `main.tsx:3867-3868`
- **Status:** Internal / Feature-gated
- **Argument:** `[name]` — optional session name
- **Purpose:** Start an interactive session with Remote Control enabled (optionally named). `--rc` is an alias.
- **Notes:** Hidden from help. Gated by the `BRIDGE_MODE` feature flag.

### `--teammate-mode`
- **Source:** `main.tsx:3857`
- **Status:** Internal / Teammate spawning
- **Argument:** `<mode>` — required (`auto`, `tmux`, or `in-process`)
- **Purpose:** Controls how teammates are spawned in multi-agent coordination.
- **Notes:** Hidden from help.

---

[← Back to CLI/README.md](/claude-code-docs/cli/overview/)
