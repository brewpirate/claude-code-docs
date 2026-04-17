# Discrepancies & notes


1. **Invocation name vs. directory name mismatch**: `FileReadTool` directory → invoked as `Read`. `FileWriteTool` directory → invoked as `Write`. `FileEditTool` directory → invoked as `Edit`. This is standard; tool invocation names differ from source directory names.

2. **Tools in source but not in public docs**: `BriefTool`, `ConfigTool`, `RemoteTriggerTool`, `SleepTool` exist in source but are not listed as standalone entries in the public tools-reference. ConfigTool is implied (settings management) and BriefTool/RemoteTriggerTool are feature-gated or internal. SleepTool is test-only.

3. **`Cron*` tool family naming**: Public docs refer to `CronCreate`, `CronDelete`, `CronList` in the tools table, but they are part of the `ScheduleCronTool` directory. Invocation names match the tool table (not the directory).

4. **Task tools availability**: `CLAUDE_CODE_ENABLE_TASKS` gates TaskCreate/TaskGet/TaskList/TaskUpdate/TaskStop/TaskOutput. Without the flag, task tools may not be available or may be limited to non-persistent modes (TodoWrite for SDK/non-interactive).

5. **Agent teams experimental status**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is required for TeamCreate, TeamDelete, and SendMessage. Marked as experimental in public docs with known limitations around session resumption and task coordination.

6. **LSP tool activation**: LSP is listed as always available, but is inactive until a language-server plugin is installed for your language. Auto-reports type errors after edits once a plugin is active.

7. **Monitor tool availability**: Not available on Amazon Bedrock, Google Vertex AI, or Microsoft Foundry. Also unavailable when `DISABLE_TELEMETRY` or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` is set.

8. **PowerShell tool opt-in**: Requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`. Opt-in on non-Windows; rolling out progressively on Windows.

9. **Skill tool permission**: Listed as permission-required in the public tools table; frontmatter can control invocation via `user-invocable` and `disable-model-invocation` flags.

10. **WebFetch vs. WebSearch**: WebFetch fetches and processes a single URL; WebSearch performs a web search and returns result links. Both are permission-required. WebSearch is US-only.

---

[← Back to Tools/README.md](./README.md)
