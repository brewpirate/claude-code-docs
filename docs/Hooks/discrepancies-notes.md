# Discrepancies & notes


1. **27 events, not 26:** `HOOK_EVENTS` array in `entrypoints/sdk/coreTypes.ts` contains 27 events (including `Setup` as a synonym for `SessionStart`). Public docs may omit `Setup` since it's not user-facing.

2. **Undocumented handler fields:**
   - `statusMessage` is common across all handler types but may not be mentioned in public docs. Displays custom spinner text while hook runs.
   - `once: boolean` (skills/frontmatter only) removes hook after first execution. Not part of settings.json schema.
   - `if: string` (permission rule filter) is mentioned in hooks docs but rarely emphasized. Avoids spawning hooks for non-matching tool calls.

3. **Stop → SubagentStop conversion:** Subagent/skill frontmatter can declare `stop:` hook; at runtime, this is converted to `SubagentStop` matcher on the agent type. Documented in Skills/FRONTMATTER.md but not in hooks docs.

4. **Matcher behavior variation:** Tool events use regex matching; file events use glob matching; agent events use exact type matching. Not uniformly documented.

5. **Session env file semantics:** `SessionStart`, `CwdChanged`, `FileChanged` hooks receive `$CLAUDE_ENV_FILE` as an env var. Handler writes `export VAR=value` lines to this file; lines are sourced into the session environment. Useful for lazy-loading per-directory toolchain config. Not emphasized in public docs.

6. **HTTP hook SSRF edge cases:**
   - IP literals (127.0.0.1, ::1) bypass DNS lookup; validated directly.
   - IPv4-mapped IPv6 (::ffff:169.254.169.254) are detected and validated using IPv4 rules.
   - Sandbox proxy (if enabled) enforces its own domain allowlist and can bypass the SSRF guard for target host.
   - When global proxy is configured, the guard still validates DNS lookups (all addresses resolved by dns.lookup are checked).

7. **Skill-only hook features:** `once: true`, `if: string`, `shell`, and `allowed-tools` in frontmatter can affect hook invocation. Not all are available in settings.json hooks.

8. **PostToolUseFailure does not block:** Unlike PostToolUse, exit code 2 in PostToolUseFailure does not block downstream processing. Informational only.

9. **Plugin hooks namespace:** Plugin hooks use `plugin-name:hook-name` namespace in skills/agents; they cannot conflict with user/project levels.

10. **PermissionDenied hook timing:** Fires only in auto mode (non-interactive). In user/ask modes, PermissionRequest fires instead.

---

[← Back to Hooks/README.md](./README.md)
