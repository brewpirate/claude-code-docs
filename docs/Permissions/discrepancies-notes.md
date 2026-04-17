# Discrepancies & notes


1. **Mode naming in external vs. internal**: The source defines `EXTERNAL_PERMISSION_MODES` (visible to end users) as `acceptEdits`, `bypassPermissions`, `default`, `dontAsk`, `plan`. The internal `auto` mode exists but is feature-gated and may not be exposed in all deployments. The mode `bubble` exists in source but is not documented in public APIs.

2. **Bash wildcard word boundary**: `Bash(ls *)` with a space before `*` enforces a word boundary (requires space or end-of-string after the prefix). `Bash(ls*)` without a space does not enforce a boundary. This asymmetry can lead to unexpected matches. Colon form `Bash(ls:*)` is equivalent to `Bash(ls *)`.

3. **Compound command rule expansion**: When you approve a compound command like `git status && npm test` with "Yes, don't ask again", the system saves **separate rules per subcommand**, not a single rule for the full string. This means future invocations of `npm test` alone will match the saved rule, even outside the compound context. Up to 5 rules may be saved per approval.

4. **Path pattern inheritance across scopes**: Rules at higher scopes (managed) do not inherit from lower scopes (user). Each scope is evaluated independently. If you have an allow rule in user settings but want to add a project-level override, you must restate the rule in project settings or rely on scope precedence (project settings override user settings for conflicts).

5. **`allow` and `ask` on the same pattern**: If the same pattern has both `allow` and `ask` rules in different scopes (e.g., user settings allow `Bash(npm *)`, project settings ask `Bash(npm *)`), the one at the higher scope wins. Ask rules do not combine with allows; the first matching rule (by precedence and scope) takes effect.

6. **Backwards-compat shorthand settings**: Older settings files use `allow`, `deny`, `ask`, `defaultMode` at the top level instead of nested under `permissions.*`. The loader accepts both forms for compatibility, but new code should use the `permissions.*` namespace. See [Settings/permissions-security.md](../Settings/permissions-security.md) for examples.

7. **Escaping in rule content**: Parentheses in rule content must be escaped (`\(`, `\)`). Backslashes in content are escaped as `\\`. The parser applies escaping in a specific order: backslashes first, then parens. The unparse operation reverses this exactly, ensuring round-trip preservation of content. Example: `python -c "print(1)"` becomes `Bash(python -c "print\(1\)")` in a rule string.

8. **Symlink evaluation caveats**: Allow rules require both the symlink path AND its target to match; deny rules require either the symlink path OR its target to match. This asymmetry means a symlink in an otherwise allowed directory can still be blocked if it points to a denied location. Dangling symlinks (targets that don't exist) are evaluated on the symlink path only.

9. **WebFetch domain matching is suffix-only**: `WebFetch(domain:example.com)` matches `api.example.com`, `cdn.example.com`, and `example.com` itself, but does NOT match `example.com.phishing.net`. Suffix matching is literal after the domain prefix. To allow multiple unrelated domains, use separate allow rules: `WebFetch(domain:api.example.com)`, `WebFetch(domain:cdn.example.com)`.

10. **Auto-mode is not available in all deployments**: The `auto` mode is feature-gated (`feature('TRANSCRIPT_CLASSIFIER')`) and may not be present in all builds or installations. Code checking `permissions.defaultMode: "auto"` should fall back to `default` mode if auto is unavailable. Tools should validate settings before use.

---

[← Back to Permissions/README.md](./README.md)
