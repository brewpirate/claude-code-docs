---
title: "Permission modes"
tags: [permissions, settings]
---

# Permission modes


Permission modes determine Claude's default behavior when a tool has no matching allow/deny/ask rule. The mode applies as a fallback after all explicit rules are checked.

### `default`
- **Value in settings.json:** `"default"`
- **Behavior:** Standard interactive mode. For tools not covered by a rule, Claude prompts the user for permission on first use. File editing permissions persist until session end. Bash commands are approved per-command per-directory.
- **When to use:** General development workflows where you want to approve tool use interactively.
- **Related:** `--permission-mode` CLI flag; `permissions.defaultMode` setting. See [Settings/permissions-security.md](/claude-code-docs/settings/permissions-security/).

### `acceptEdits`
- **Value in settings.json:** `"acceptEdits"`
- **Behavior:** Auto-accepts file edits and common filesystem commands (`mkdir`, `touch`, `mv`, `cp`, `rm -specific-file`) for paths in the working directory or `additionalDirectories`. Bash commands are auto-approved if they only modify files in allowed directories. Other tools still prompt.
- **When to use:** When you trust Claude to edit and create files without approval, but want control over other operations (Bash exploratory commands, network requests).
- **Related:** `permissions.additionalDirectories` for expanding writable scope. See [Settings/permissions-security.md](/claude-code-docs/settings/permissions-security/).

### `plan`
- **Value in settings.json:** `"plan"`
- **Behavior:** "Plan mode" — Claude can read files, reason about them, and propose changes, but cannot execute tool invocations (Bash, Write, Edit, etc.). Use for analysis-only workflows. When `useAutoModeDuringPlan` is true (default), plan mode uses auto-mode semantics if auto mode is available, allowing safe reads and analysis.
- **When to use:** Brainstorming, code review, architecture analysis. Claude generates plans but does not execute them.
- **Related:** `useAutoModeDuringPlan` (Settings/permissions-security.md); switches plan to auto-mode semantics if available.

### `auto`
- **Value in settings.json:** `"auto"` (feature-gated; may not be available in all deployments)
- **Behavior:** Auto-approves tool calls using background safety classifiers that check whether actions align with the user's stated request and organizational trust boundaries. The classifiers consult `autoMode.environment`, `autoMode.allow`, and `autoMode.soft_deny` prose rules. Actions flagged as risky (exfiltration, force-push, `curl | sh`, production deploys to untrusted destinations) are denied. Internal, routine actions (pushing to your own repo, writing to staging) are allowed. Auto mode does not bypass deny rules; explicit denies still block.
- **When to use:** Development workflows where you trust Claude to make routine decisions (commit, push to your repo, write to ephemeral buckets) without prompting. Requires configuration of trusted infrastructure via `autoMode.environment`.
- **Related:** `autoMode` object (environment, allow, soft_deny); `skipAutoPermissionPrompt`; `disableAutoMode`; `useAutoModeDuringPlan`. See [Settings/permissions-security.md](/claude-code-docs/settings/permissions-security/).

### `dontAsk`
- **Value in settings.json:** `"dontAsk"`
- **Behavior:** Auto-denies all tools unless explicitly allowed via `permissions.allow` rules or `/permissions` command approval. No prompts. Intended for workflows where only a narrow set of tools are permitted.
- **When to use:** Restricted environments; CI/CD pipelines where only specific tools (e.g., Read, Bash(specific-test-command)) are needed.
- **Related:** Pair with explicit `permissions.allow` rules.

### `bypassPermissions`
- **Value in settings.json:** `"bypassPermissions"`
- **Behavior:** Skips permission prompts for all tool invocations except writes to protected directories (`.git`, `.claude`, `.vscode`, `.idea`, `.husky`, and tooling symlinks). Writes to `.claude/commands`, `.claude/agents`, `.claude/skills` do not prompt (Claude routinely modifies these). Use only in isolated environments (containers, VMs) where accidental damage is contained.
- **When to use:** Automated or sandboxed environments where you want minimal friction and accept the risk.
- **Related:** `skipDangerousModePermissionPrompt` (skip the activation confirmation); `disableBypassPermissionsMode` to prevent this mode organization-wide. ⚠ Security risk in production; use with caution.

---

[← Back to Permissions/README.md](/claude-code-docs/permissions/overview/)
