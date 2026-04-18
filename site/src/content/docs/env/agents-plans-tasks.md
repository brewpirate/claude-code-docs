---
title: "Agents, Plans, Tasks"
tags: [environment]
---

# Agents, Plans, Tasks


### `CLAUDE_AGENT_SDK_CLIENT_APP`
- **Type:** String (application identifier)
- **Default:** Unspecified
- **Description:** Client application identifier for Agent SDK. Included in x-client-app header.
- **Example:** `export CLAUDE_AGENT_SDK_CLIENT_APP=my-app-v1`

### `CLAUDE_AGENT_SDK_VERSION`
- **Type:** String (version string)
- **Default:** SDK version
- **Description:** Agent SDK version string. Included in User-Agent and telemetry.
- **Example:** `export CLAUDE_AGENT_SDK_VERSION=1.2.3`

### `CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Disable built-in agent definitions when using the SDK. Useful for custom agent-only deployments.
- **Example:** `export CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS=1`

### `CLAUDE_AGENT_SDK_MCP_NO_PREFIX`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Don't prefix MCP tool names with server name in SDK mode. Useful when MCP server names conflict.
- **Example:** `export CLAUDE_AGENT_SDK_MCP_NO_PREFIX=1`

### `CLAUDE_CODE_AGENT_COST_STEER`
- **Type:** Boolean (1, true, 0, false)
- **Default:** Feature flag–dependent (typically enabled for pro/max tiers)
- **Description:** Override agent cost-based steering. Defaults based on subscription tier (pro/max) via feature flag.
- **Example:** `export CLAUDE_CODE_AGENT_COST_STEER=0`

### `CLAUDE_CODE_AGENT_LIST_IN_MESSAGES`
- **Type:** Boolean (1, true, 0, false)
- **Default:** Feature flag–dependent
- **Description:** Override whether the agent list is attached to messages. Defaults to tengu_agent_list_attach feature flag.
- **Example:** `export CLAUDE_CODE_AGENT_LIST_IN_MESSAGES=1`

### `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable experimental agent teams/multi-agent orchestration. Still in development.
- **Example:** `export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

### `CLAUDE_AUTO_BACKGROUND_TASKS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable automatic background task spawning. When enabled, returns 120000ms timeout for background operations.
- **Example:** `export CLAUDE_AUTO_BACKGROUND_TASKS=1`

### `CLAUDE_CODE_PLAN_MODE_REQUIRED`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Require plan mode approval before implementation. Forces planning phase for all tasks.
- **Example:** `export CLAUDE_CODE_PLAN_MODE_REQUIRED=1`

### `CLAUDE_CODE_PLAN_MODE_INTERVIEW_PHASE`
- **Type:** String (control mode)
- **Default:** Unspecified
- **Description:** Control the interview phase in plan mode. Determines how much clarification is needed before planning.
- **Example:** `export CLAUDE_CODE_PLAN_MODE_INTERVIEW_PHASE=full`

### `CLAUDE_CODE_PLAN_V2_AGENT_COUNT`
- **Type:** Integer
- **Default:** Unspecified (feature flag–dependent)
- **Description:** Number of agents in plan v2 orchestration.
- **Example:** `export CLAUDE_CODE_PLAN_V2_AGENT_COUNT=3`

### `CLAUDE_CODE_PLAN_V2_EXPLORE_AGENT_COUNT`
- **Type:** Integer
- **Default:** 3
- **Range:** 1-10
- **Description:** Number of explore agents in plan v2. Controls parallelism in exploration phase.
- **Example:** `export CLAUDE_CODE_PLAN_V2_EXPLORE_AGENT_COUNT=5`

### `CLAUDE_CODE_TEAM_ONBOARDING`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable the team-onboarding command. Also gated by tengu_flint_harbor feature flag.
- **Example:** `export CLAUDE_CODE_TEAM_ONBOARDING=1`

### `CLAUDE_CODE_TASK_LIST_ID`
- **Type:** String (task list identifier)
- **Default:** Unspecified
- **Description:** ID of the task list for task tracking. Links tasks to a centralized task list.
- **Example:** `export CLAUDE_CODE_TASK_LIST_ID=tasklist-abc123`

### `TEAM_MEMORY_SYNC_URL`
- **Type:** URL
- **Default:** Unspecified
- **Description:** URL for team memory synchronization service. Allows multiple team members to share memory.
- **Example:** `export TEAM_MEMORY_SYNC_URL=https://memory-sync.company.com`

---

[← Back to env/README.md](/claude-code-docs/env/overview/)
