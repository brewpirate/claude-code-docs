---
title: "Environment Variables"
description: "Every environment variable recognized by Claude Code"
tags: [environment]
---

:::tip[New here?]
You only need 5 variables to get started: `ANTHROPIC_API_KEY` (required — your auth), `CLAUDE_CODE_DEBUG` (debugging), `ANTHROPIC_MODEL` (model selection), `CLAUDE_CODE_DISABLE_AUTO_MEMORY` (privacy — disables memory logging), `CLAUDE_CODE_VERBOSE` (verbose output). The other 500+ variables are for advanced configuration, enterprise deployments, and feature gating. Don't be intimidated by the size of this reference.
:::

Per-section reference for every environment variable recognized by Claude Code CLI v2.1.100.

:::note[Source / attribution]
The original variable list was compiled by [@unkn0wncode](https://gist.github.com/unkn0wncode) in [this gist](https://gist.github.com/unkn0wncode/f87295d055dd0f0e8082358a0b5cc467). This expanded documentation adds types, defaults, examples, precedence notes, and cross-references.
:::

## Table of Contents

1. [Authentication & API Access](/claude-code-docs/env/authentication-api-access/)
2. [Model Configuration & Behavior](/claude-code-docs/env/model-configuration-behavior/)
3. [Providers](/claude-code-docs/env/providers/)
4. [OAuth & Login](/claude-code-docs/env/oauth-login/)
5. [Core Settings](/claude-code-docs/env/core-settings/)
6. [Feature & Disable Flags](/claude-code-docs/env/feature-disable-flags/)
7. [Execution Environment](/claude-code-docs/env/execution-environment/)
8. [Agents, Plans, Tasks](/claude-code-docs/env/agents-plans-tasks/)
9. [Context, Compaction, Session Resume](/claude-code-docs/env/context-compaction-session-resume/)
10. [Observability](/claude-code-docs/env/observability/)
11. [Networking](/claude-code-docs/env/networking/)
12. [Integrations](/claude-code-docs/env/integrations/)
13. [Platform & CI Detection](/claude-code-docs/env/platform-ci-detection/)
14. [Cloud Platform Detection](/claude-code-docs/env/cloud-platform-detection/)
15. [Azure Identity](/claude-code-docs/env/azure-identity/)
16. [System & Runtime](/claude-code-docs/env/system-runtime/)
17. [Testing & Benchmarks](/claude-code-docs/env/testing-benchmarks/)
18. [Accessibility & Brief Mode](/claude-code-docs/env/accessibility-brief-mode/)
19. [Security & Sandboxing](/claude-code-docs/env/security-sandboxing/)
20. [Miscellaneous & Internal](/claude-code-docs/env/miscellaneous-internal/)
21. [Missing From Source or Unavailable Documentation](/claude-code-docs/env/missing-from-source-or-unavailable-documentation/)

## Overview

**21 sections**, **509 variables** total.

| # | Section | Description | Variables |
|---|---------|-------------|-----------|
| 1 | [Authentication & API Access](/claude-code-docs/env/authentication-api-access/) | API keys, OAuth tokens, bearer credentials, and base URLs for reaching Anthropic services. | 9 |
| 2 | [Model Configuration & Behavior](/claude-code-docs/env/model-configuration-behavior/) | Model selection, custom model overrides, output/context limits, and thinking/effort controls. | 24 |
| 3 | [Providers](/claude-code-docs/env/providers/) | Provider routing and credentials for AWS Bedrock, Bedrock Mantle, Anthropic AWS, Vertex AI, and Microsoft Foundry. | 38 |
| 4 | [OAuth & Login](/claude-code-docs/env/oauth-login/) | OAuth endpoints, refresh tokens, account/org overrides, and trusted-device bypass. | 20 |
| 5 | [Core Settings](/claude-code-docs/env/core-settings/) | Config/debug directories, entrypoint identifiers, shell overrides, and simplified-mode toggles. | 26 |
| 6 | [Feature & Disable Flags](/claude-code-docs/env/feature-disable-flags/) | Boolean toggles for enabling or disabling features, beta flags, and individual slash commands. | 61 |
| 7 | [Execution Environment](/claude-code-docs/env/execution-environment/) | Bash/shell tooling, tool configuration, MCP, plugins, Node.js/Bun runtime, gRPC, tmux, and terminal detection. | 72 |
| 8 | [Agents, Plans, Tasks](/claude-code-docs/env/agents-plans-tasks/) | Sub-agent model selection, plan-mode orchestration, agent teams, and task-list tracking. | 15 |
| 9 | [Context, Compaction, Session Resume](/claude-code-docs/env/context-compaction-session-resume/) | Context window sizes, auto-compaction thresholds, and idle/resume prompt behavior. | 11 |
| 10 | [Observability](/claude-code-docs/env/observability/) | OpenTelemetry exporters, Datadog flush intervals, and profiling/diagnostics traces. | 35 |
| 11 | [Networking](/claude-code-docs/env/networking/) | Proxies, TLS certificates, mTLS client auth, and CA bundle configuration. | 12 |
| 12 | [Integrations](/claude-code-docs/env/integrations/) | IDE auto-connect, Chrome extension, remote/cowork mode, and session-ingress bridges. | 50 |
| 13 | [Platform & CI Detection](/claude-code-docs/env/platform-ci-detection/) | Auto-detection markers for GitHub Actions, GitLab CI, Buildkite, CircleCI, and related Perforce/Git overrides. | 27 |
| 14 | [Cloud Platform Detection](/claude-code-docs/env/cloud-platform-detection/) | Auto-detection markers for AWS Lambda, Azure, GCP, Vercel, Netlify, Fly.io, Heroku, Replit, and other PaaS/serverless platforms. | 31 |
| 15 | [Azure Identity](/claude-code-docs/env/azure-identity/) | Azure AD/Entra credentials: client IDs, secrets, certificates, federated tokens, and authority host overrides. | 15 |
| 16 | [System & Runtime](/claude-code-docs/env/system-runtime/) | OS paths, locale, SSH detection, home/temp dirs, editors, and XDG base-directory conventions. | 31 |
| 17 | [Testing & Benchmarks](/claude-code-docs/env/testing-benchmarks/) | SWE-bench instance identifiers, VCR recording, and test-only fixtures. | 8 |
| 18 | [Accessibility & Brief Mode](/claude-code-docs/env/accessibility-brief-mode/) | Accessibility mode (disables animations) and brief/compact output modes. | 3 |
| 19 | [Security & Sandboxing](/claude-code-docs/env/security-sandboxing/) | Bubblewrap sandbox markers, additional protection headers, script capabilities, and extra CLAUDE.md directory permissions. | 5 |
| 20 | [Miscellaneous & Internal](/claude-code-docs/env/miscellaneous-internal/) | Beta tracing, Chokidar file-watcher tuning, voice streaming, and other internal-only knobs. | 16 |
| 21 | [Missing From Source or Unavailable Documentation](/claude-code-docs/env/missing-from-source-or-unavailable-documentation/) | Variables where only the original blurb is reliable and behavior beyond that is undetermined. | 0 |

## See Also

- [Original gist by @unkn0wncode](https://gist.github.com/unkn0wncode/f87295d055dd0f0e8082358a0b5cc467) — upstream source of the variable list.
- [../ENV.md](/claude-code-docs/env/overview/) — local copy of the original one-line-per-variable source.
- [../ENV_FULL.md](/claude-code-docs/env/overview/) — single-file consolidated reference with quick-lookup index.
