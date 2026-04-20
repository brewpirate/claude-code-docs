---
title: "Memory Types"
tags: [settings]
---

Memory files can declare a `type:` field in their frontmatter to signal their purpose and content category. This helps the selection algorithms prioritize and filter memories during recall.

## Standard types

Claude Code recognizes four standard memory types:

### `type: user`

Personal insights, conventions, and learned practices specific to the user's workflow.

Examples:
- "I prefer using async/await over promises"
- "Our team uses Conventional Commits for all PRs"
- "I always check X before deploying to production"

Scope: User-global; applicable across all projects.

### `type: feedback`

Captured user feedback, feature requests, and bug reports from stakeholders or automated systems.

Examples:
- "User reported lag in search feature on slow networks"
- "Analytics show 20% drop in onboarding completion after v2 release"
- "Feature request: Dark mode support in the dashboard"

Scope: Can be user-global or project-specific depending on source.

### `type: project`

Project-specific findings, architecture decisions, code patterns, and domain knowledge.

Examples:
- "The auth service uses JWT with RS256 signature"
- "Database migrations must support zero-downtime deployments"
- "All API endpoints return a `meta` object with request ID and timestamp"

Scope: Project-local; most relevant when in that project context.

### `type: reference`

External links, documentation excerpts, API specifications, and reference materials.

Examples:
- Links to relevant RFCs, standards, or third-party API docs
- Excerpts from official documentation
- Saved runbooks or troubleshooting guides

Scope: Can be user-global for widely-used references or project-local for project-specific specs.

## Untyped files

Files without a `type:` field are still scanned and selected, but may be weighted lower by the Sonnet selector during recall. It is recommended to add a type if the file will be in a memory directory.

## Frontmatter example

```markdown
---
type: project
description: Architecture decisions for the API layer
---

# API Architecture

## Request/response format
[...]
```

## Type-based narrowing

The selection algorithm may narrow by type when the current context suggests a particular focus:

- Active project context → prefer `project` type
- Feature discussion → prefer `feedback` type
- Personal workflows → prefer `user` type
- Reference queries → prefer `reference` type

However, type is a hint, not a hard filter. All files are still eligible for selection if the Sonnet selector deems them relevant.

---

[← Back to Memory/README.md](/claude-code-docs/memory/overview/)
