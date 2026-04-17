# Internal / undocumented bundled skills


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

---

[← Back to Skills/README.md](./README.md)
