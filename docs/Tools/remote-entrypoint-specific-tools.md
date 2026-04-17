# Remote & entrypoint-specific tools


### `RemoteTrigger`
- **Invoked as:** `RemoteTrigger`
- **Source directory:** `claude-code-main/tools/RemoteTriggerTool/`
- **Class:** Remote
- **Side effect:** Executes
- **Gating:** Remote-entrypoint only (`CLAUDE_CODE_REMOTE=1` or `CLAUDE_CODE_ENTRYPOINT=remote`)
- **Documented in public docs?:** Mentioned in docs context around remote sessions and scheduling; not a standalone tool entry.
- **Description:** Trigger a remote session or API call. Used in remote/headless mode and scheduled agents to invoke work on distant infrastructure. Parameter list not surfaced in public docs; source not inspected.
- **Input parameters:** Parameter list not available — not in public docs; source not inspected.
- **Returns:** Response from remote invocation.
- **Notes:** Remote-entrypoint only. For triggering scheduled remote agents and cloud-based Claude Code instances. Internal tool, not user-facing.

---

[← Back to Tools/README.md](./README.md)
