---
title: "Platform & CI Detection"
---

# Platform & CI Detection


### Git & CI

#### `GITHUB_ACTIONS`
- **Type:** Boolean (set by GitHub Actions)
- **Default:** Unspecified (detected automatically)
- **Description:** Detected when running in GitHub Actions CI. Set automatically by GitHub Actions runner.
- **Example:** Automatically set by CI platform

#### `CLAUDE_CODE_ACTION`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates running as a GitHub Action. Sets entrypoint to claude-code-github-action.
- **Example:** `export CLAUDE_CODE_ACTION=1`

#### `GITHUB_ACTOR`
- **Type:** String (GitHub username)
- **Default:** Unspecified
- **Description:** GitHub username that triggered the workflow.
- **Example:** `octocat`

#### `GITHUB_ACTOR_ID`
- **Type:** String (GitHub user ID)
- **Default:** Unspecified
- **Description:** GitHub user ID that triggered the workflow.
- **Example:** `1234567`

#### `GITHUB_REPOSITORY`
- **Type:** String (owner/repo)
- **Default:** Unspecified
- **Description:** GitHub repository in owner/repo format.
- **Example:** `anthropics/claude-code`

#### `GITHUB_REPOSITORY_OWNER`
- **Type:** String (owner)
- **Default:** Unspecified
- **Description:** GitHub repository owner.
- **Example:** `anthropics`

#### `GITHUB_REPOSITORY_OWNER_ID`
- **Type:** String (owner ID)
- **Default:** Unspecified
- **Description:** GitHub repository owner numeric ID.
- **Example:** `123456`

#### `GITHUB_REPOSITORY_ID`
- **Type:** String (repo ID)
- **Default:** Unspecified
- **Description:** GitHub repository numeric ID.
- **Example:** `789012`

#### `GITHUB_EVENT_NAME`
- **Type:** String (event name)
- **Default:** Unspecified
- **Description:** Name of the GitHub event that triggered the workflow (e.g., push, pull_request, issues).
- **Example:** `push`

#### `GITHUB_EVENT_PATH`
- **Type:** String (file path to JSON)
- **Default:** Unspecified
- **Description:** Path to GitHub Actions event payload JSON. Contains detailed event information.
- **Example:** `/github/workflow/event.json`

#### `GITHUB_TOKEN`
- **Type:** String (authentication token)
- **Default:** Set automatically by GitHub Actions
- **Description:** GitHub authentication token with permissions for the workflow. Used for API calls within the action.
- **Example:** `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Security:** Automatically scoped and short-lived; safe to use in workflows.

#### `GITHUB_ENV`
- **Type:** String (file path)
- **Default:** Set by GitHub Actions
- **Description:** Path to GitHub Actions environment file. Write to this file to set env vars for subsequent steps.
- **Example:** `/github/env`

#### `GITHUB_PATH`
- **Type:** String (file path)
- **Default:** Set by GitHub Actions
- **Description:** Path to GitHub Actions PATH file. Append to this file to add directories to PATH.
- **Example:** `/github/path`

#### `GITHUB_OUTPUT`
- **Type:** String (file path)
- **Default:** Set by GitHub Actions
- **Description:** Path to GitHub Actions output file. Write key=value to this file for step outputs.
- **Example:** `/github/output`

#### `GITHUB_STATE`
- **Type:** String (file path)
- **Default:** Set by GitHub Actions
- **Description:** Path to GitHub Actions state file. Persists state across workflow steps.
- **Example:** `/github/state`

#### `GITHUB_STEP_SUMMARY`
- **Type:** String (file path)
- **Default:** Set by GitHub Actions
- **Description:** Path to GitHub Actions step summary file. Markdown appended here appears in workflow summary.
- **Example:** `/github/step-summary`

#### `GITHUB_ACTION_INPUTS`
- **Type:** String (JSON object)
- **Default:** Unspecified
- **Description:** JSON-encoded inputs for GitHub Action. Contains action input parameters.
- **Example:** `{"key":"value"}`

#### `GITHUB_ACTION_PATH`
- **Type:** String (directory path)
- **Default:** Set by GitHub Actions
- **Description:** Path to the GitHub Action directory. Location where action code is checked out.
- **Example:** `/github/actions/claude-code@v1`

#### `CIRCLECI`
- **Type:** Boolean (set by CircleCI)
- **Default:** Unspecified
- **Description:** Detected when running in CircleCI. Set automatically.
- **Example:** Automatically set by CI platform

#### `BUILDKITE`
- **Type:** Boolean (set by Buildkite)
- **Default:** Unspecified
- **Description:** Detected when running in Buildkite CI. Set automatically.
- **Example:** Automatically set by CI platform

#### `GITLAB_CI`
- **Type:** Boolean (set by GitLab CI)
- **Default:** Unspecified
- **Description:** Detected when running in GitLab CI. Set automatically.
- **Example:** Automatically set by CI platform

#### `RUNNER_OS`
- **Type:** String (OS name)
- **Default:** Unspecified
- **Description:** CI runner operating system (e.g., Linux, macOS, Windows).
- **Example:** `Linux`

#### `RUNNER_ENVIRONMENT`
- **Type:** String (environment identifier)
- **Default:** Unspecified
- **Description:** CI runner environment identifier.
- **Example:** `github-hosted`

#### `CLAUDE_CODE_BASE_REF`
- **Type:** String (git ref)
- **Default:** Auto-detected (typically main or master)
- **Description:** Override the base git ref for diff operations. Falls back to auto-detected default branch.
- **Example:** `export CLAUDE_CODE_BASE_REF=develop`

#### `CLAUDE_CODE_PERFORCE_MODE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable Perforce source control mode. Affects file permission/lock handling for Perforce repos.
- **Example:** `export CLAUDE_CODE_PERFORCE_MODE=1`

#### `CLAUDE_CODE_SKIP_PROMPT_HISTORY`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip saving prompts to history. Useful for automated/scripted runs.
- **Example:** `export CLAUDE_CODE_SKIP_PROMPT_HISTORY=1`

#### `P4PORT`
- **Type:** String (Perforce server address)
- **Default:** Unspecified
- **Description:** Perforce server port. Used when CLAUDE_CODE_PERFORCE_MODE is enabled.
- **Example:** `export P4PORT=perforce.company.com:1666`

---

[← Back to env/README.md](/claude-code-docs/env/overview/)
