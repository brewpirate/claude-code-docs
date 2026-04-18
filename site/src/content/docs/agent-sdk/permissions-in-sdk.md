---
title: "Permissions in SDK"
---

# Permissions in SDK


### Permission evaluation order
1. **Hooks:** Run PreToolUse hooks; may block or modify.
2. **Deny rules:** Check disallowed_tools and settings.json deny list. Blocks even in bypassPermissions.
3. **Permission mode:** Apply global mode (default, dontAsk, acceptEdits, bypassPermissions, plan, auto).
4. **Allow rules:** Check allowed_tools and settings.json allow list.
5. **canUseTool callback:** Custom SDK callback (skipped in dontAsk mode).

### Permission modes
- **`default`:** Standard behavior; prompts for confirmation on unsafe tools.
- **`dontAsk`:** Deny anything not pre-approved; never calls canUseTool.
- **`acceptEdits`:** Auto-approve file operations (Edit, Write, mkdir, rm, etc.).
- **`bypassPermissions`:** Approve all tools without prompts. **Dangerous.** Use only in controlled environments.
- **`plan`:** No tool execution; Claude plans only (no changes made).
- **`auto`:** Model classifier approves/denies each call (TypeScript only; availability varies by model).

### `canUseTool` callback
```typescript
canUseTool: async (toolName, input, options) => {
  if (toolName === "Write" && input.file_path?.includes(".env")) {
    return { behavior: "deny", message: "Cannot modify .env files" };
  }
  return { behavior: "allow" };
}
```

Can also return `{ behavior: "ask" }` to prompt the user (requires interactive context).

---

[← Back to Agent SDK/README.md](/claude-code-docs/agent-sdk/overview/)
