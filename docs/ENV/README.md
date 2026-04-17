# Environment Variables

Per-section reference for every environment variable recognized by Claude Code CLI v2.1.100.

> **Source / attribution:** The original variable list was compiled by [@unkn0wncode](https://gist.github.com/unkn0wncode) in [this gist](https://gist.github.com/unkn0wncode/f87295d055dd0f0e8082358a0b5cc467). This expanded documentation adds types, defaults, examples, precedence notes, and cross-references.

## Table of Contents

1. [Authentication & API Access](./authentication-api-access.md)
2. [Model Configuration & Behavior](./model-configuration-behavior.md)
3. [Providers](./providers.md)
4. [OAuth & Login](./oauth-login.md)
5. [Core Settings](./core-settings.md)
6. [Feature & Disable Flags](./feature-disable-flags.md)
7. [Execution Environment](./execution-environment.md)
8. [Agents, Plans, Tasks](./agents-plans-tasks.md)
9. [Context, Compaction, Session Resume](./context-compaction-session-resume.md)
10. [Observability](./observability.md)
11. [Networking](./networking.md)
12. [Integrations](./integrations.md)
13. [Platform & CI Detection](./platform-ci-detection.md)
14. [Cloud Platform Detection](./cloud-platform-detection.md)
15. [Azure Identity](./azure-identity.md)
16. [System & Runtime](./system-runtime.md)
17. [Testing & Benchmarks](./testing-benchmarks.md)
18. [Accessibility & Brief Mode](./accessibility-brief-mode.md)
19. [Security & Sandboxing](./security-sandboxing.md)
20. [Miscellaneous & Internal](./miscellaneous-internal.md)
21. [Missing From Source or Unavailable Documentation](./missing-from-source-or-unavailable-documentation.md)

## Overview

**21 sections**, **509 variables** total.

| # | Section | Description | Variables |
|---|---------|-------------|-----------|
| 1 | [Authentication & API Access](./authentication-api-access.md) | API keys, OAuth tokens, bearer credentials, and base URLs for reaching Anthropic services. | 9 |
| 2 | [Model Configuration & Behavior](./model-configuration-behavior.md) | Model selection, custom model overrides, output/context limits, and thinking/effort controls. | 24 |
| 3 | [Providers](./providers.md) | Provider routing and credentials for AWS Bedrock, Bedrock Mantle, Anthropic AWS, Vertex AI, and Microsoft Foundry. | 38 |
| 4 | [OAuth & Login](./oauth-login.md) | OAuth endpoints, refresh tokens, account/org overrides, and trusted-device bypass. | 20 |
| 5 | [Core Settings](./core-settings.md) | Config/debug directories, entrypoint identifiers, shell overrides, and simplified-mode toggles. | 26 |
| 6 | [Feature & Disable Flags](./feature-disable-flags.md) | Boolean toggles for enabling or disabling features, beta flags, and individual slash commands. | 61 |
| 7 | [Execution Environment](./execution-environment.md) | Bash/shell tooling, tool configuration, MCP, plugins, Node.js/Bun runtime, gRPC, tmux, and terminal detection. | 72 |
| 8 | [Agents, Plans, Tasks](./agents-plans-tasks.md) | Sub-agent model selection, plan-mode orchestration, agent teams, and task-list tracking. | 15 |
| 9 | [Context, Compaction, Session Resume](./context-compaction-session-resume.md) | Context window sizes, auto-compaction thresholds, and idle/resume prompt behavior. | 11 |
| 10 | [Observability](./observability.md) | OpenTelemetry exporters, Datadog flush intervals, and profiling/diagnostics traces. | 35 |
| 11 | [Networking](./networking.md) | Proxies, TLS certificates, mTLS client auth, and CA bundle configuration. | 12 |
| 12 | [Integrations](./integrations.md) | IDE auto-connect, Chrome extension, remote/cowork mode, and session-ingress bridges. | 50 |
| 13 | [Platform & CI Detection](./platform-ci-detection.md) | Auto-detection markers for GitHub Actions, GitLab CI, Buildkite, CircleCI, and related Perforce/Git overrides. | 27 |
| 14 | [Cloud Platform Detection](./cloud-platform-detection.md) | Auto-detection markers for AWS Lambda, Azure, GCP, Vercel, Netlify, Fly.io, Heroku, Replit, and other PaaS/serverless platforms. | 31 |
| 15 | [Azure Identity](./azure-identity.md) | Azure AD/Entra credentials: client IDs, secrets, certificates, federated tokens, and authority host overrides. | 15 |
| 16 | [System & Runtime](./system-runtime.md) | OS paths, locale, SSH detection, home/temp dirs, editors, and XDG base-directory conventions. | 31 |
| 17 | [Testing & Benchmarks](./testing-benchmarks.md) | SWE-bench instance identifiers, VCR recording, and test-only fixtures. | 8 |
| 18 | [Accessibility & Brief Mode](./accessibility-brief-mode.md) | Accessibility mode (disables animations) and brief/compact output modes. | 3 |
| 19 | [Security & Sandboxing](./security-sandboxing.md) | Bubblewrap sandbox markers, additional protection headers, script capabilities, and extra CLAUDE.md directory permissions. | 5 |
| 20 | [Miscellaneous & Internal](./miscellaneous-internal.md) | Beta tracing, Chokidar file-watcher tuning, voice streaming, and other internal-only knobs. | 16 |
| 21 | [Missing From Source or Unavailable Documentation](./missing-from-source-or-unavailable-documentation.md) | Variables where only the original blurb is reliable and behavior beyond that is undetermined. | 0 |

## See Also

- [Original gist by @unkn0wncode](https://gist.github.com/unkn0wncode/f87295d055dd0f0e8082358a0b5cc467) — upstream source of the variable list.
- [../ENV.md](../ENV.md) — local copy of the original one-line-per-variable source.
- [../ENV_FULL.md](../ENV_FULL.md) — single-file consolidated reference with quick-lookup index.
