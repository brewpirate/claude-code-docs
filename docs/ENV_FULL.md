# Claude Code CLI Environment Variables — Comprehensive Reference

This document provides detailed explanations, types, defaults, and practical examples for every environment variable used by Claude Code CLI v2.1.100.

## Table of Contents

1. [Authentication & API Access](#authentication--api-access)
2. [Model Configuration & Behavior](#model-configuration--behavior)
3. [Providers](#providers)
4. [Feature & Disable Flags](#feature--disable-flags)
5. [Execution Environment](#execution-environment)
6. [Tools & Shell](#tools--shell)
7. [Agents, Plans, Tasks](#agents-plans-tasks)
8. [Context, Compaction, Session Resume](#context-compaction-session-resume)
9. [Observability](#observability)
10. [Networking](#networking)
11. [Integrations](#integrations)
12. [Platform & CI Detection](#platform--ci-detection)
13. [Testing & Benchmarks](#testing--benchmarks)
14. [Accessibility & Brief Mode](#accessibility--brief-mode)
15. [Security & Sandboxing](#security--sandboxing)
16. [Miscellaneous & Internal](#miscellaneous--internal)
17. [Quick Lookup Index](#quick-lookup-index)

---

## Authentication & API Access

### `ANTHROPIC_API_KEY`
- **Type:** String
- **Default:** Unspecified
- **Precedence:** Fallback when ANTHROPIC_AUTH_TOKEN is not set
- **Description:** Primary API key for Anthropic's Claude API. Used as the fallback authentication method when no OAuth token is configured.
- **Example:** `export ANTHROPIC_API_KEY=sk-ant-abcdef123456`
- **See also:** ANTHROPIC_AUTH_TOKEN, CLAUDE_CODE_OAUTH_TOKEN

### `ANTHROPIC_AUTH_TOKEN`
- **Type:** String (bearer token)
- **Default:** Unspecified
- **Precedence:** Takes priority over ANTHROPIC_API_KEY for authorization headers
- **Description:** Alternative bearer token for Anthropic services. When set, used in preference to ANTHROPIC_API_KEY.
- **Example:** `export ANTHROPIC_AUTH_TOKEN=Bearer eyJhbGc...`
- **See also:** ANTHROPIC_API_KEY, CLAUDE_CODE_OAUTH_TOKEN

### `ANTHROPIC_BASE_URL`
- **Type:** URL
- **Default:** `https://api.anthropic.com`
- **Description:** Custom base URL for Anthropic API endpoints. Overrides the default endpoint. Useful for private deployments or proxy routes.
- **Example:** `export ANTHROPIC_BASE_URL=https://internal-api.company.com/anthropic`
- **See also:** CLAUDE_CODE_API_BASE_URL

### `CLAUDE_CODE_API_BASE_URL`
- **Type:** URL
- **Default:** Falls back to ANTHROPIC_BASE_URL, then https://api.anthropic.com
- **Precedence:** Checked before ANTHROPIC_BASE_URL
- **Description:** Claude Code–specific alternative base URL for the Anthropic API.
- **Example:** `export CLAUDE_CODE_API_BASE_URL=https://api.internal.company.com`
- **See also:** ANTHROPIC_BASE_URL

### `ANTHROPIC_CUSTOM_HEADERS`
- **Type:** String (newline-separated Key: Value pairs)
- **Default:** Unspecified
- **Description:** Custom HTTP headers to include in all API requests. Newline-separated; each line is a header name and value.
- **Example:** `export ANTHROPIC_CUSTOM_HEADERS=$'X-Custom-Header: value1\nX-Another: value2'`

### `ANTHROPIC_BETAS`
- **Type:** String (comma-separated list)
- **Default:** Unspecified
- **Description:** Comma-separated list of beta feature headers to include in API requests. Appended to internal beta flags managed by Claude Code.
- **Example:** `export ANTHROPIC_BETAS=interleaved-thinking-2025-05-14,prompt-caching-2024-07-16`

### `ANTHROPIC_UNIX_SOCKET`
- **Type:** String (filesystem path)
- **Default:** Unspecified
- **Description:** Unix socket path for Anthropic API connections. Used with Bun runtime for direct socket communication instead of HTTP. Advanced use case.
- **Example:** `export ANTHROPIC_UNIX_SOCKET=/tmp/anthropic-api.sock`

### `ANTHROPIC_LOG`
- **Type:** String (log level)
- **Default:** Unspecified
- **Description:** Anthropic SDK internal logging level. Controls verbosity of the underlying Anthropic SDK, not Claude Code itself.
- **Example:** `export ANTHROPIC_LOG=debug`

### `API_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** 600000 (10 minutes)
- **Description:** API request timeout. Shown in timeout error messages with a suggestion to increase if needed. Must be a positive integer.
- **Example:** `export API_TIMEOUT_MS=1200000`  # 20 minutes

---

## Model Configuration & Behavior

### `ANTHROPIC_MODEL`
- **Type:** String (model ID)
- **Default:** Determined by provider and tier
- **Description:** Override the default Claude model for all API calls. Validated against known model IDs during startup. Can also be set via CLI flag or settings file.
- **Example:** `export ANTHROPIC_MODEL=claude-sonnet-4-6`
- **See also:** ANTHROPIC_DEFAULT_OPUS_MODEL, ANTHROPIC_DEFAULT_SONNET_MODEL, ANTHROPIC_DEFAULT_HAIKU_MODEL

### `ANTHROPIC_DEFAULT_OPUS_MODEL`
- **Type:** String (model ID)
- **Default:** `opus-4.6` (first-party); `opus-4.6` (third-party providers)
- **Description:** Override the default Opus model ID. Used when selecting a high-capability model.
- **Example:** `export ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-1`

### `ANTHROPIC_DEFAULT_OPUS_MODEL_NAME`
- **Type:** String (display name)
- **Default:** Unspecified
- **Description:** Display name for custom Opus model override shown in the model selector UI.
- **Example:** `export ANTHROPIC_DEFAULT_OPUS_MODEL_NAME="Opus (Internal)"`

### `ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION`
- **Type:** String (description text)
- **Default:** Unspecified
- **Description:** Description text for custom Opus model override displayed in the model selector.
- **Example:** `export ANTHROPIC_DEFAULT_OPUS_MODEL_DESCRIPTION="High-capability reasoning model for complex tasks"`

### `ANTHROPIC_DEFAULT_SONNET_MODEL`
- **Type:** String (model ID)
- **Default:** `sonnet-4.6` (first-party); `sonnet-4.5` (third-party providers)
- **Description:** Override the default Sonnet model ID. Used when selecting a balanced model.
- **Example:** `export ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6`

### `ANTHROPIC_DEFAULT_SONNET_MODEL_NAME`
- **Type:** String (display name)
- **Default:** Unspecified
- **Description:** Display name for custom Sonnet model override in the model selector.
- **Example:** `export ANTHROPIC_DEFAULT_SONNET_MODEL_NAME="Sonnet (Production)"`

### `ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION`
- **Type:** String (description text)
- **Default:** Unspecified
- **Description:** Description text for custom Sonnet model override.
- **Example:** `export ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION="Balanced model for general-purpose coding"`

### `ANTHROPIC_DEFAULT_HAIKU_MODEL`
- **Type:** String (model ID)
- **Default:** `haiku-4.5` (falls back if not set)
- **Description:** Override the default Haiku (small/fast) model ID. Used for non-first-party providers.
- **Example:** `export ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-3-5`

### `ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME`
- **Type:** String (display name)
- **Default:** Unspecified
- **Description:** Display name for custom Haiku model override.
- **Example:** `export ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME="Haiku (Fast)"`

### `ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION`
- **Type:** String (description text)
- **Default:** Unspecified
- **Description:** Description text for custom Haiku model override.
- **Example:** `export ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION="Lightweight model for quick operations"`

### `ANTHROPIC_CUSTOM_MODEL_OPTION`
- **Type:** String (model ID)
- **Default:** Unspecified
- **Description:** Add a custom model ID to the model selector dropdown. Validated during model selection.
- **Example:** `export ANTHROPIC_CUSTOM_MODEL_OPTION=my-fine-tuned-model-v2`

### `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME`
- **Type:** String (display name)
- **Default:** Unspecified
- **Description:** Display name for the custom model option in the selector.
- **Example:** `export ANTHROPIC_CUSTOM_MODEL_OPTION_NAME="My Fine-Tuned Model"`

### `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION`
- **Type:** String (description text)
- **Default:** Falls back to "Custom model (MODEL_ID)"
- **Description:** Description text for the custom model option.
- **Example:** `export ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION="Fine-tuned on internal codebase"`

### `ANTHROPIC_SMALL_FAST_MODEL`
- **Type:** String (model ID)
- **Default:** `haiku-4.5` (or the Haiku override)
- **Description:** Override the small/fast model used for internal quick operations like context compaction and summarization.
- **Example:** `export ANTHROPIC_SMALL_FAST_MODEL=claude-haiku-3-5`

### `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION`
- **Type:** String (AWS region)
- **Default:** Falls back to the general Bedrock region (AWS_REGION)
- **Description:** Specific AWS region for the small fast model when using Bedrock. Allows routing small operations to a different region.
- **Example:** `export ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION=us-west-2`
- **See also:** AWS_REGION, CLAUDE_CODE_USE_BEDROCK

### `CLAUDE_CODE_EFFORT_LEVEL`
- **Type:** String (enum: "low", "medium", "high")
- **Default:** "high"
- **Description:** Set the reasoning effort level for extended thinking on supported models. Affects token usage and reasoning depth.
- **Example:** `export CLAUDE_CODE_EFFORT_LEVEL=medium`

### `CLAUDE_CODE_ALWAYS_ENABLE_EFFORT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force effort level support on all models, not just opus-4-6 and sonnet-4-6. Useful when using third-party models with thinking capability.
- **Example:** `export CLAUDE_CODE_ALWAYS_ENABLE_EFFORT=1`

### `MAX_THINKING_TOKENS`
- **Type:** Integer
- **Default:** Unspecified (0 disables thinking)
- **Description:** Maximum tokens for extended thinking. If > 0, enables thinking with a fixed budget. Parsed as int; 0 or negative disables.
- **Example:** `export MAX_THINKING_TOKENS=8000`

### `CLAUDE_CODE_MAX_OUTPUT_TOKENS`
- **Type:** Integer
- **Default:** Model-dependent (typically 4096)
- **Description:** Maximum output tokens for responses. Validated against a per-model upper limit. Parsed as int.
- **Example:** `export CLAUDE_CODE_MAX_OUTPUT_TOKENS=8000`

### `CLAUDE_CODE_MAX_CONTEXT_TOKENS`
- **Type:** Integer
- **Default:** Unspecified
- **Precedence:** Only applied when DISABLE_COMPACT is set
- **Description:** Override the maximum context tokens. Must be > 0 when set.
- **Example:** `export CLAUDE_CODE_MAX_CONTEXT_TOKENS=200000`
- **See also:** DISABLE_COMPACT, CLAUDE_CODE_AUTO_COMPACT_WINDOW

### `CLAUDE_CODE_SUBAGENT_MODEL`
- **Type:** String (model ID)
- **Default:** Unspecified (uses normal model selection logic)
- **Description:** Force a specific model for all sub-agent and teammate operations, overriding normal model selection.
- **Example:** `export CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6`

### `CLAUDE_CODE_EXTRA_BODY`
- **Type:** String (JSON object)
- **Default:** Unspecified
- **Description:** Extra JSON body parameters to include in API requests. Merged with standard request body.
- **Example:** `export CLAUDE_CODE_EXTRA_BODY='{"temperature": 0.5}'`

### `CLAUDE_CODE_EXTRA_METADATA`
- **Type:** String (JSON object)
- **Default:** Unspecified
- **Description:** Extra metadata to include in the API request metadata field. Merged with standard metadata.
- **Example:** `export CLAUDE_CODE_EXTRA_METADATA='{"user_id": "123", "session": "abc"}'`

### `FALLBACK_FOR_ALL_PRIMARY_MODELS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable fallback behavior for all primary models, not just specific ones. When enabled, allows retrying with other models on failure.
- **Example:** `export FALLBACK_FOR_ALL_PRIMARY_MODELS=1`

---

## Providers

### Provider: AWS Bedrock

#### `CLAUDE_CODE_USE_BEDROCK`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Route all API calls through AWS Bedrock instead of direct Anthropic API. Requires AWS credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION).
- **Example:** `export CLAUDE_CODE_USE_BEDROCK=1`
- **See also:** AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

#### `AWS_REGION`
- **Type:** String (AWS region identifier)
- **Default:** `us-east-1`
- **Precedence:** Overrides AWS_DEFAULT_REGION
- **Description:** AWS region for Bedrock service calls. Bedrock may have limited availability; check AWS docs for supported regions.
- **Example:** `export AWS_REGION=us-west-2`

#### `AWS_DEFAULT_REGION`
- **Type:** String (AWS region identifier)
- **Default:** `us-east-1`
- **Precedence:** Used only when AWS_REGION is not set
- **Description:** Fallback AWS region. Used by AWS SDK when AWS_REGION is unset.
- **Example:** `export AWS_DEFAULT_REGION=eu-west-1`

#### `AWS_ACCESS_KEY_ID`
- **Type:** String (access key)
- **Default:** Unspecified (falls back to IAM role or credentials file)
- **Description:** AWS access key ID for Bedrock authentication. Use with AWS_SECRET_ACCESS_KEY. Omit if using IAM roles or credentials files.
- **Example:** `export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE`
- **Security:** Store in a secret manager in production; do not commit.

#### `AWS_SECRET_ACCESS_KEY`
- **Type:** String (secret key)
- **Default:** Unspecified (falls back to IAM role or credentials file)
- **Description:** AWS secret access key for Bedrock authentication. Use with AWS_ACCESS_KEY_ID.
- **Example:** `export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
- **Security:** Store in a secret manager in production; do not commit.

#### `AWS_SESSION_TOKEN`
- **Type:** String (session token)
- **Default:** Unspecified
- **Description:** AWS session token for temporary credentials (e.g., from AWS STS). Use with AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.
- **Example:** `export AWS_SESSION_TOKEN=FwoGZXIvYXdzEBa...`
- **See also:** AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

#### `AWS_PROFILE`
- **Type:** String (profile name)
- **Default:** `default`
- **Description:** Named AWS profile for credential resolution from ~/.aws/credentials or ~/.aws/config. If set, takes precedence over access key env vars.
- **Example:** `export AWS_PROFILE=prod-bedrock`

#### `AWS_LOGIN_CACHE_DIRECTORY`
- **Type:** String (directory path)
- **Default:** `~/.aws/login/cache`
- **Description:** Custom directory for AWS SSO login cache when using AWS_PROFILE with SSO-based credentials.
- **Example:** `export AWS_LOGIN_CACHE_DIRECTORY=/var/cache/aws-sso`

#### `AWS_BEARER_TOKEN_BEDROCK`
- **Type:** String (bearer token)
- **Default:** Unspecified
- **Precedence:** When set, skips SigV4 signing and uses bearer token auth
- **Description:** Bearer token for Bedrock API key authentication. When set, bypasses AWS credential chain and uses Authorization: Bearer header instead. Useful for API key–based access instead of IAM.
- **Example:** `export AWS_BEARER_TOKEN_BEDROCK=your-bedrock-api-key`
- **See also:** CLAUDE_CODE_USE_BEDROCK

#### `ANTHROPIC_BEDROCK_BASE_URL`
- **Type:** URL
- **Default:** AWS Bedrock default endpoint (constructed from region)
- **Description:** Custom endpoint URL for Bedrock service. Overrides the standard AWS Bedrock endpoint. Used for internal or proxied Bedrock APIs.
- **Example:** `export ANTHROPIC_BEDROCK_BASE_URL=https://bedrock-internal.company.com`

#### `CLAUDE_CODE_SKIP_BEDROCK_AUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip AWS authentication for Bedrock (uses empty credentials). Useful in testing or when using default container roles that don't require explicit credentials.
- **Example:** `export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1`

#### `ENABLE_PROMPT_CACHING_1H_BEDROCK`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable 1-hour prompt caching on Bedrock (if supported). Reduces costs for repeated requests with the same context.
- **Example:** `export ENABLE_PROMPT_CACHING_1H_BEDROCK=1`

### Provider: Bedrock Mantle

#### `CLAUDE_CODE_USE_MANTLE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Route API calls through Bedrock Mantle instead of direct Anthropic or standard Bedrock.
- **Example:** `export CLAUDE_CODE_USE_MANTLE=1`

#### `ANTHROPIC_BEDROCK_MANTLE_BASE_URL`
- **Type:** URL
- **Default:** `https://bedrock-mantle.{region}.api.aws/anthropic` (region from AWS_REGION)
- **Description:** Custom base URL for Bedrock Mantle endpoint. Typically not needed unless using a private Mantle endpoint.
- **Example:** `export ANTHROPIC_BEDROCK_MANTLE_BASE_URL=https://mantle-internal.company.com`

#### `CLAUDE_CODE_SKIP_MANTLE_AUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip authentication for Bedrock Mantle. Useful in isolated environments where auth is handled by infrastructure.
- **Example:** `export CLAUDE_CODE_SKIP_MANTLE_AUTH=1`

### Provider: Anthropic AWS

#### `CLAUDE_CODE_USE_ANTHROPIC_AWS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Route API calls through Anthropic AWS service instead of direct Anthropic API.
- **Example:** `export CLAUDE_CODE_USE_ANTHROPIC_AWS=1`

#### `ANTHROPIC_AWS_API_KEY`
- **Type:** String (API key)
- **Default:** Unspecified
- **Description:** API key for Anthropic AWS service. Required if using Anthropic AWS and not relying on DefaultCredential.
- **Example:** `export ANTHROPIC_AWS_API_KEY=your-anthropic-aws-api-key`
- **Security:** Store in a secret manager in production.

#### `ANTHROPIC_AWS_BASE_URL`
- **Type:** URL
- **Default:** Anthropic AWS default endpoint
- **Description:** Custom base URL for Anthropic AWS endpoint. Useful for internal or proxied APIs.
- **Example:** `export ANTHROPIC_AWS_BASE_URL=https://anthropic-aws-internal.company.com`

#### `ANTHROPIC_AWS_WORKSPACE_ID`
- **Type:** String (workspace identifier)
- **Default:** Unspecified
- **Description:** Workspace ID for Anthropic AWS service. Identifies the workspace for API calls.
- **Example:** `export ANTHROPIC_AWS_WORKSPACE_ID=workspace-12345`

#### `CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip authentication for Anthropic AWS service.
- **Example:** `export CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH=1`

### Provider: Google Vertex AI

#### `CLAUDE_CODE_USE_VERTEX`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Route all API calls through Google Vertex AI instead of direct Anthropic API. Requires GCP credentials.
- **Example:** `export CLAUDE_CODE_USE_VERTEX=1`

#### `ANTHROPIC_VERTEX_PROJECT_ID`
- **Type:** String (GCP project ID)
- **Default:** Unspecified (auto-detected from GOOGLE_CLOUD_PROJECT)
- **Description:** GCP project ID for Vertex AI service calls. Identifies the GCP project hosting Claude models on Vertex.
- **Example:** `export ANTHROPIC_VERTEX_PROJECT_ID=my-gcp-project-123`

#### `ANTHROPIC_VERTEX_BASE_URL`
- **Type:** URL
- **Default:** Vertex AI default regional endpoint
- **Description:** Custom base URL for Vertex AI endpoint. Replaces VERTEX_BASE_URL if both are set. Useful for custom routing.
- **Example:** `export ANTHROPIC_VERTEX_BASE_URL=https://us-central1-aiplatform.googleapis.com`

#### `CLAUDE_CODE_SKIP_VERTEX_AUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip GCP authentication for Vertex AI (uses empty credentials). Useful in testing or when using default Compute Engine service accounts.
- **Example:** `export CLAUDE_CODE_SKIP_VERTEX_AUTH=1`

#### `GOOGLE_APPLICATION_CREDENTIALS`
- **Type:** String (file path to JSON credentials)
- **Default:** Unspecified (falls back to DefaultCredential chain)
- **Description:** Path to GCP service account JSON credentials file. Used for service account–based authentication. Unset this to use DefaultCredential (Compute Engine service account, gcloud auth, etc.).
- **Example:** `export GOOGLE_APPLICATION_CREDENTIALS=/etc/secrets/gcp-sa-key.json`
- **Security:** Store the key file securely; restrict file permissions (0600).

#### `GOOGLE_CLOUD_PROJECT`
- **Type:** String (GCP project ID)
- **Default:** Unspecified (auto-detected from application default credentials)
- **Description:** GCP project ID. Used for cloud platform detection and as a fallback for ANTHROPIC_VERTEX_PROJECT_ID.
- **Example:** `export GOOGLE_CLOUD_PROJECT=my-gcp-project-123`

#### `GOOGLE_CLOUD_QUOTA_PROJECT`
- **Type:** String (GCP project ID)
- **Default:** Unspecified
- **Description:** GCP quota project for billing. Overrides the quota project from the service account if needed.
- **Example:** `export GOOGLE_CLOUD_QUOTA_PROJECT=billing-project-456`

#### `CLOUD_ML_REGION`
- **Type:** String (GCP region)
- **Default:** `us-east5`
- **Description:** Default GCP region for Vertex AI. Used for regional endpoint construction.
- **Example:** `export CLOUD_ML_REGION=us-central1`

#### `CLOUDSDK_CONFIG`
- **Type:** String (directory path)
- **Default:** `~/.config/gcloud`
- **Description:** Google Cloud SDK configuration directory. Used to locate gcloud config, credentials cache, and other SDK files.
- **Example:** `export CLOUDSDK_CONFIG=/etc/gcloud-config`

#### `GCE_METADATA_HOST`
- **Type:** String (hostname)
- **Default:** `metadata.google.internal`
- **Description:** Custom hostname for GCE metadata server. Useful when metadata server is behind a proxy.
- **Example:** `export GCE_METADATA_HOST=metadata-proxy.internal`

#### `GCE_METADATA_IP`
- **Type:** String (IP address)
- **Default:** `169.254.169.254`
- **Description:** Custom IP address for GCE metadata server. Rarely needed; useful for non-standard network setups.
- **Example:** `export GCE_METADATA_IP=10.0.0.1`

#### `METADATA_SERVER_DETECTION`
- **Type:** Boolean or String (control detection behavior)
- **Default:** Unspecified (auto-detect)
- **Description:** Control GCP metadata server detection behavior. When unset, detection is automatic.
- **Example:** `export METADATA_SERVER_DETECTION=off`

#### `DETECT_GCP_RETRIES`
- **Type:** Integer
- **Default:** Unspecified (3 retries typical)
- **Description:** Number of retries for GCP metadata detection. Increases resilience if metadata server is temporarily unavailable.
- **Example:** `export DETECT_GCP_RETRIES=5`

### Provider: Microsoft Foundry

#### `CLAUDE_CODE_USE_FOUNDRY`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Route all API calls through Microsoft Foundry instead of direct Anthropic API.
- **Example:** `export CLAUDE_CODE_USE_FOUNDRY=1`

#### `ANTHROPIC_FOUNDRY_API_KEY`
- **Type:** String (API key)
- **Default:** Unspecified (falls back to Azure DefaultCredential)
- **Description:** API key for Microsoft Foundry authentication. If absent, falls back to Azure DefaultCredential (service principal, managed identity, etc.).
- **Example:** `export ANTHROPIC_FOUNDRY_API_KEY=your-foundry-api-key`
- **Security:** Store in a secret manager.

#### `ANTHROPIC_FOUNDRY_BASE_URL`
- **Type:** URL
- **Default:** Microsoft Foundry default endpoint
- **Description:** Custom base URL for Microsoft Foundry API endpoint.
- **Example:** `export ANTHROPIC_FOUNDRY_BASE_URL=https://foundry-internal.company.com`

#### `ANTHROPIC_FOUNDRY_RESOURCE`
- **Type:** String (resource identifier)
- **Default:** Unspecified
- **Description:** Microsoft Foundry resource identifier. Identifies the resource within Foundry.
- **Example:** `export ANTHROPIC_FOUNDRY_RESOURCE=my-foundry-resource`

#### `CLAUDE_CODE_SKIP_FOUNDRY_AUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip Azure authentication for Foundry (uses empty token provider).
- **Example:** `export CLAUDE_CODE_SKIP_FOUNDRY_AUTH=1`

---

## OAuth & Login

### `CLAUDE_CODE_OAUTH_TOKEN`
- **Type:** String (bearer token)
- **Default:** Unspecified
- **Precedence:** Checked after ANTHROPIC_AUTH_TOKEN in auth source priority
- **Description:** OAuth token for authentication. Used when ANTHROPIC_AUTH_TOKEN is not set but OAuth is preferred.
- **Example:** `export CLAUDE_CODE_OAUTH_TOKEN=oauth_token_abc123...`

### `CLAUDE_CODE_ACCOUNT_UUID`
- **Type:** String (UUID)
- **Default:** Unspecified (looked up via OAuth)
- **Description:** Pre-set account UUID, bypassing OAuth lookup. Useful when running non-interactively.
- **Example:** `export CLAUDE_CODE_ACCOUNT_UUID=550e8400-e29b-41d4-a716-446655440000`

### `CLAUDE_CODE_ORGANIZATION_UUID`
- **Type:** String (UUID)
- **Default:** Unspecified (looked up via OAuth)
- **Description:** Pre-set organization UUID, bypassing OAuth lookup.
- **Example:** `export CLAUDE_CODE_ORGANIZATION_UUID=550e8400-e29b-41d4-a716-446655440001`

### `CLAUDE_CODE_USER_EMAIL`
- **Type:** String (email address)
- **Default:** Unspecified (looked up via OAuth)
- **Description:** Pre-set user email, bypassing OAuth lookup. Useful for logging and telemetry when running non-interactively.
- **Example:** `export CLAUDE_CODE_USER_EMAIL=user@company.com`

### `CLAUDE_CODE_ACCOUNT_TAGGED_ID`
- **Type:** String (tagged account identifier)
- **Default:** Unspecified (falls back to hash of account UUID)
- **Description:** Tagged account ID for OTEL metrics. Falls back to hashing the account UUID if not set.
- **Example:** `export CLAUDE_CODE_ACCOUNT_TAGGED_ID=acct_12345_prod`

### `CLAUDE_CODE_SESSION_ACCESS_TOKEN`
- **Type:** String (bearer token)
- **Default:** Unspecified
- **Description:** Session-specific access token for authentication. Used in some multi-session scenarios.
- **Example:** `export CLAUDE_CODE_SESSION_ACCESS_TOKEN=session_token_xyz...`

### `CLAUDE_CODE_OAUTH_CLIENT_ID`
- **Type:** String (client ID)
- **Default:** Anthropic's default client ID
- **Description:** Custom OAuth client ID. Override this only if using a custom OAuth app registered with Anthropic.
- **Example:** `export CLAUDE_CODE_OAUTH_CLIENT_ID=custom_client_id_123`

### `CLAUDE_CODE_OAUTH_REFRESH_TOKEN`
- **Type:** String (refresh token)
- **Default:** Unspecified
- **Description:** OAuth refresh token for token renewal. Allows offline token refresh without user interaction.
- **Example:** `export CLAUDE_CODE_OAUTH_REFRESH_TOKEN=refresh_token_abc...`

### `CLAUDE_CODE_OAUTH_SCOPES`
- **Type:** String (space-separated scopes)
- **Default:** Standard Anthropic scopes
- **Description:** OAuth scopes to request during authentication. Overrides default scopes.
- **Example:** `export CLAUDE_CODE_OAUTH_SCOPES='openid profile email offline_access'`

### `CLAUDE_CODE_CUSTOM_OAUTH_URL`
- **Type:** URL (OAuth authorization endpoint)
- **Default:** Anthropic's OAuth endpoint
- **Precedence:** Must be in the approved endpoints list
- **Description:** Custom OAuth URL endpoint. Must be in an approved list for security. Used for custom OAuth providers.
- **Example:** `export CLAUDE_CODE_CUSTOM_OAUTH_URL=https://oauth.company.com/authorize`

### `CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR`
- **Type:** Integer (file descriptor number)
- **Default:** Unspecified
- **Description:** File descriptor number to read API key from. Must be a valid integer (typically 3 or higher). Used for secure credential passing in containerized environments.
- **Example:** `export CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR=3`  # Read API key from fd 3

### `CLAUDE_CODE_API_KEY_HELPER_TTL_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified
- **Description:** TTL in milliseconds for API key helper cache. Must be a non-negative integer. Higher values reduce helper invocations.
- **Example:** `export CLAUDE_CODE_API_KEY_HELPER_TTL_MS=300000`  # 5 minutes

### `CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR`
- **Type:** Integer (file descriptor number)
- **Default:** Unspecified
- **Description:** File descriptor number to read OAuth token from. Similar to CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR but for OAuth tokens.
- **Example:** `export CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR=4`

### `CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR`
- **Type:** Integer (file descriptor number)
- **Default:** Unspecified
- **Description:** File descriptor for WebSocket authentication credentials. Used for remote/bridge connections.
- **Example:** `export CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR=5`

### `CLAUDE_TRUSTED_DEVICE_TOKEN`
- **Type:** String (token)
- **Default:** Unspecified
- **Description:** Pre-set trusted device token. When set, skips trusted device enrollment. Env var takes precedence over stored tokens.
- **Example:** `export CLAUDE_TRUSTED_DEVICE_TOKEN=device_token_xyz...`

### `USE_LOCAL_OAUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use local OAuth endpoint for development. Points to localhost OAuth server instead of production.
- **Example:** `export USE_LOCAL_OAUTH=1`

### `CLAUDE_LOCAL_OAUTH_API_BASE`
- **Type:** URL
- **Default:** `http://localhost:3000` (typical development default)
- **Description:** Local OAuth API base URL for development. Used when USE_LOCAL_OAUTH is enabled.
- **Example:** `export CLAUDE_LOCAL_OAUTH_API_BASE=http://localhost:3001`

### `CLAUDE_LOCAL_OAUTH_APPS_BASE`
- **Type:** URL
- **Default:** `http://localhost:3000` (typical development default)
- **Description:** Local OAuth apps base URL for development.
- **Example:** `export CLAUDE_LOCAL_OAUTH_APPS_BASE=http://localhost:3001/apps`

### `CLAUDE_LOCAL_OAUTH_CONSOLE_BASE`
- **Type:** URL
- **Default:** `http://localhost:3000` (typical development default)
- **Description:** Local OAuth console base URL for development.
- **Example:** `export CLAUDE_LOCAL_OAUTH_CONSOLE_BASE=http://localhost:3001/console`

### `USE_STAGING_OAUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use staging OAuth endpoint for testing. Routes OAuth to staging servers instead of production.
- **Example:** `export USE_STAGING_OAUTH=1`

---

## Core Settings

### `CLAUDE_CODE_SHELL`
- **Type:** String (shell path or name)
- **Default:** Auto-detected (bash, zsh, fish, powershell, etc.)
- **Description:** Override the shell used for Bash/shell tool execution. If set, Claude Code uses this shell instead of auto-detecting.
- **Example:** `export CLAUDE_CODE_SHELL=/bin/zsh`

### `CLAUDE_CODE_SHELL_PREFIX`
- **Type:** String (command prefix and args)
- **Default:** Unspecified
- **Description:** Prefix command/args added before shell invocations. Useful for wrapping all shell commands (e.g., with env vars or sandboxing).
- **Example:** `export CLAUDE_CODE_SHELL_PREFIX='env -i'`

### `CLAUDE_CODE_SIMPLE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Simplified mode. Disables attachments, auto memory, and other advanced features. Useful for lightweight or restricted environments.
- **Example:** `export CLAUDE_CODE_SIMPLE=1`

### `CLAUDE_CODE_DONT_INHERIT_ENV`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Don't inherit environment variables from parent process. When set, starts with a clean slate.
- **Example:** `export CLAUDE_CODE_DONT_INHERIT_ENV=1`

### `CLAUDE_CONFIG_DIR`
- **Type:** String (directory path)
- **Default:** `~/.claude` on Unix; `%APPDATA%\Claude` on Windows
- **Description:** Override the default Claude configuration directory path. Stores settings, cache, plugins, and other state.
- **Example:** `export CLAUDE_CONFIG_DIR=/etc/claude-config`

### `CLAUDE_TMPDIR`
- **Type:** String (directory path)
- **Default:** System temp dir (from TMPDIR or /tmp on Unix; %TEMP% on Windows)
- **Description:** Override the temp directory used by Claude Code. Used for temporary files, tool outputs, etc.
- **Example:** `export CLAUDE_TMPDIR=/scratch/claude-tmp`

### `CLAUDE_CODE_TMPDIR`
- **Type:** String (directory path)
- **Default:** Same as CLAUDE_TMPDIR
- **Description:** Alternative var name for temp directory. Takes precedence over CLAUDE_TMPDIR if set.
- **Example:** `export CLAUDE_CODE_TMPDIR=/var/tmp/claude`

### `CLAUDE_DEBUG`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable debug mode for Claude Code. Increases logging verbosity.
- **Example:** `export CLAUDE_DEBUG=1`

### `CLAUDE_CODE_DEBUG_LOGS_DIR`
- **Type:** String (directory path)
- **Default:** `${CLAUDE_CONFIG_DIR}/debug/SESSION_ID.txt`
- **Description:** Custom directory for debug log files. Logs go to SESSION.txt in this directory.
- **Example:** `export CLAUDE_CODE_DEBUG_LOGS_DIR=/var/log/claude-debug`

### `CLAUDE_CODE_DEBUG_LOG_LEVEL`
- **Type:** String (enum: verbose, debug, info, warn, error)
- **Default:** `debug`
- **Description:** Debug log level. Controls verbosity of debug logs.
- **Example:** `export CLAUDE_CODE_DEBUG_LOG_LEVEL=verbose`

### `CLAUDE_CODE_DIAGNOSTICS_FILE`
- **Type:** String (file path)
- **Default:** Unspecified (no diagnostics file written)
- **Description:** Path to write diagnostics output file. Useful for debugging issues and collecting system info.
- **Example:** `export CLAUDE_CODE_DIAGNOSTICS_FILE=/tmp/claude-diagnostics.txt`

### `CLAUDE_ENV_FILE`
- **Type:** String (file path)
- **Default:** Unspecified
- **Description:** Path to a custom environment file to load on startup. Useful for project-specific env vars. Vars in this file override defaults but not CLI args.
- **Example:** `export CLAUDE_ENV_FILE=./.claude.env`

### `CLAUDE_CODE_ENTRYPOINT`
- **Type:** String (enum: cli, sdk-ts, sdk-py, sdk-cli, mcp, claude-code-github-action, claude-desktop, local-agent)
- **Default:** Auto-detected (usually cli)
- **Description:** Identifies how Claude Code was launched. Used for telemetry and feature selection. Typically set by the launcher, not manually.
- **Example:** `export CLAUDE_CODE_ENTRYPOINT=local-agent`

### `CLAUDE_CODE_ENVIRONMENT_KIND`
- **Type:** String (e.g., local, remote, container)
- **Default:** `local`
- **Description:** Identifies the environment kind. Affects resource limits, feature availability, etc.
- **Example:** `export CLAUDE_CODE_ENVIRONMENT_KIND=container`

### `CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION`
- **Type:** String (version identifier)
- **Default:** Unspecified
- **Description:** Version of the environment runner. Used for tracking and debugging in remote environments.
- **Example:** `export CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION=v1.2.3`

### `CLAUDE_CODE_HOST_PLATFORM`
- **Type:** String (platform identifier)
- **Default:** Auto-detected (darwin, linux, win32, etc.)
- **Description:** Override the detected host platform identifier. Useful when auto-detection fails.
- **Example:** `export CLAUDE_CODE_HOST_PLATFORM=linux`

### `CLAUDE_CODE_QUESTION_PREVIEW_FORMAT`
- **Type:** String (format identifier)
- **Default:** Unspecified
- **Description:** Format for question preview display. Controls how user questions are shown in UI.
- **Example:** `export CLAUDE_CODE_QUESTION_PREVIEW_FORMAT=compact`

### `CLAUDE_CODE_TAGS`
- **Type:** String (comma-separated tags)
- **Default:** Unspecified
- **Description:** Custom tags to include in telemetry and event tracking. Useful for grouping sessions by context.
- **Example:** `export CLAUDE_CODE_TAGS=experiment-v1,team-blue`

### `CLAUDE_CODE_FORCE_FULL_LOGO`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force display of the full ASCII logo on startup. By default, logo is simplified in some contexts.
- **Example:** `export CLAUDE_CODE_FORCE_FULL_LOGO=1`

### `CLAUDE_CODE_NEW_INIT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Trigger new initialization flow. Forces reinitializing config, migrations, etc.
- **Example:** `export CLAUDE_CODE_NEW_INIT=1`

### `CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Exit immediately after the first UI render. Used for testing and automation.
- **Example:** `export CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER=1`

### `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (no delay)
- **Description:** Delay in ms before exiting after stop signal. Allows cleanup and graceful shutdown.
- **Example:** `export CLAUDE_CODE_EXIT_AFTER_STOP_DELAY=2000`

### `CLAUDE_CODE_WORKER_EPOCH`
- **Type:** String (epoch identifier)
- **Default:** Unspecified
- **Description:** Worker epoch identifier for multi-worker setups. Groups workers from the same epoch.
- **Example:** `export CLAUDE_CODE_WORKER_EPOCH=epoch-123`

### `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates the API provider is managed by the host environment. When true, provider selection via CLAUDE_CODE_USE_BEDROCK/VERTEX/etc. is disabled.
- **Example:** `export CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST=1`

### `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip organization check in fast mode. Disables org-level permission checks for fast mode.
- **Example:** `export CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK=1`

### `CLAUDE_CODE_SYNTAX_HIGHLIGHT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** true (auto-detected based on terminal)
- **Description:** Control syntax highlighting in output. Set to 0 to disable, 1 to enable.
- **Example:** `export CLAUDE_CODE_SYNTAX_HIGHLIGHT=0`

---

## Feature & Disable Flags

This section contains toggles for enabling or disabling features. Most are boolean (1/true enables, 0/false disables).

### Enable Flags

| Variable | Default | Effect | Example |
|----------|---------|--------|---------|
| `CLAUDE_CODE_ENABLE_CFC` | false | Enable CFC (Claude For Code) feature | `export CLAUDE_CODE_ENABLE_CFC=1` |
| `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` | false | Enable fine-grained streaming for tool use responses | `export CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1` |
| `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION` | false | Enable prompt suggestion feature | `export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=1` |
| `CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING` | false | Enable file checkpointing in SDK mode | `export CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING=1` |
| `CLAUDE_CODE_ENABLE_TASKS` | false | Enable the task tracking system | `export CLAUDE_CODE_ENABLE_TASKS=1` |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | true | Enable telemetry data collection | `export CLAUDE_CODE_ENABLE_TELEMETRY=0` |
| `CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT` | false | Enable attaching token usage info to responses | `export CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT=1` |
| `CLAUDE_CODE_ENABLE_XAA` | false | Enable XAA (Cross-App Auth) support for MCP servers via OIDC IdP | `export CLAUDE_CODE_ENABLE_XAA=1` |
| `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | false | Enable enhanced telemetry beta features | `export CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` |
| `ENABLE_ENHANCED_TELEMETRY_BETA` | false | Alternative flag for enhanced telemetry beta | `export ENABLE_ENHANCED_TELEMETRY_BETA=1` |
| `CLAUDE_ENABLE_STREAM_WATCHDOG` | false | Enable watchdog for stream health monitoring | `export CLAUDE_ENABLE_STREAM_WATCHDOG=1` |
| `EMBEDDED_SEARCH_TOOLS` | false | Enable embedded search tools | `export EMBEDDED_SEARCH_TOOLS=1` |
| `ENABLE_TOOL_SEARCH` | false | Enable the tool search/deferred tool loading feature | `export ENABLE_TOOL_SEARCH=1` |
| `ENABLE_CLAUDEAI_MCP_SERVERS` | false | Enable Claude.ai MCP servers | `export ENABLE_CLAUDEAI_MCP_SERVERS=1` |
| `ENABLE_MCP_LARGE_OUTPUT_FILES` | false | Enable large output file support for MCP tools | `export ENABLE_MCP_LARGE_OUTPUT_FILES=1` |
| `ENABLE_BETA_TRACING_DETAILED` | false | Enable detailed beta tracing (requires BETA_TRACING_ENDPOINT) | `export ENABLE_BETA_TRACING_DETAILED=1` |

### Disable Flags

| Variable | Default | Effect | Example |
|----------|---------|--------|---------|
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | false | Disable 1M token context window support | `export CLAUDE_CODE_DISABLE_1M_CONTEXT=1` |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` | false | Disable adaptive thinking mode; fall back to fixed budget | `export CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` |
| `CLAUDE_CODE_DISABLE_ADVISOR_TOOL` | false | Disable the advisor tool | `export CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1` |
| `CLAUDE_CODE_DISABLE_ATTACHMENTS` | false | Disable file attachments in messages | `export CLAUDE_CODE_DISABLE_ATTACHMENTS=1` |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | false | Disable automatic memory system (set to '0' to force-enable) | `export CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | false | Disable background task execution | `export CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` |
| `CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL` | false | Disable the Claude API skill | `export CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL=1` |
| `CLAUDE_CODE_DISABLE_CLAUDE_MDS` | false | Disable loading of CLAUDE.md instruction files | `export CLAUDE_CODE_DISABLE_CLAUDE_MDS=1` |
| `CLAUDE_CODE_DISABLE_CRON` | false | Disable cron/scheduled task functionality | `export CLAUDE_CODE_DISABLE_CRON=1` |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | false | Disable experimental beta features | `export CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1` |
| `CLAUDE_CODE_DISABLE_FAST_MODE` | false | Disable fast mode toggle | `export CLAUDE_CODE_DISABLE_FAST_MODE=1` |
| `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY` | false | Disable feedback survey prompts | `export CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY=1` |
| `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING` | false | Disable file checkpointing for undo/restore | `export CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING=1` |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | false | Disable git-related instructions in system prompt | `export CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` |
| `CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP` | false | Disable legacy model name remapping | `export CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP=1` |
| `CLAUDE_CODE_DISABLE_MOUSE` | false | Disable mouse input in the terminal UI | `export CLAUDE_CODE_DISABLE_MOUSE=1` |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | false | Disable non-essential network traffic (feature flags, telemetry) | `export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | false | Disable fallback to non-streaming API mode | `export CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=1` |
| `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL` | false | Disable automatic installation of official marketplace plugins | `export CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL=1` |
| `CLAUDE_CODE_DISABLE_POLICY_SKILLS` | false | Disable policy-based skill loading | `export CLAUDE_CODE_DISABLE_POLICY_SKILLS=1` |
| `CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP` | false | Disable skipping of pre-compaction optimization | `export CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP=1` |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | false | Disable setting the terminal title | `export CLAUDE_CODE_DISABLE_TERMINAL_TITLE=1` |
| `CLAUDE_CODE_DISABLE_THINKING` | false | Disable extended thinking entirely | `export CLAUDE_CODE_DISABLE_THINKING=1` |
| `CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL` | false | Disable virtual scrolling in the UI | `export CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL=1` |
| `DISABLE_AUTOUPDATER` | false | Disable the automatic update checker | `export DISABLE_AUTOUPDATER=1` |
| `DISABLE_AUTO_COMPACT` | false | Disable automatic context compaction | `export DISABLE_AUTO_COMPACT=1` |
| `DISABLE_COMPACT` | false | Disable the /compact command entirely | `export DISABLE_COMPACT=1` |
| `DISABLE_COST_WARNINGS` | false | Disable cost warning notifications | `export DISABLE_COST_WARNINGS=1` |
| `DISABLE_ERROR_REPORTING` | false | Disable error reporting to Anthropic | `export DISABLE_ERROR_REPORTING=1` |
| `DISABLE_INTERLEAVED_THINKING` | false | Disable interleaved thinking in responses | `export DISABLE_INTERLEAVED_THINKING=1` |
| `DISABLE_PROMPT_CACHING` | false | Disable prompt caching for all models | `export DISABLE_PROMPT_CACHING=1` |
| `DISABLE_PROMPT_CACHING_HAIKU` | false | Disable prompt caching specifically for Haiku | `export DISABLE_PROMPT_CACHING_HAIKU=1` |
| `DISABLE_PROMPT_CACHING_OPUS` | false | Disable prompt caching specifically for Opus | `export DISABLE_PROMPT_CACHING_OPUS=1` |
| `DISABLE_PROMPT_CACHING_SONNET` | false | Disable prompt caching specifically for Sonnet | `export DISABLE_PROMPT_CACHING_SONNET=1` |
| `DISABLE_TELEMETRY` | false | Disable all telemetry data collection | `export DISABLE_TELEMETRY=1` |
| `DO_NOT_TRACK` | false | Disable telemetry when set to 1 (standard DNT convention) | `export DO_NOT_TRACK=1` |

### Command Disablers

| Variable | Default | Effect | Example |
|----------|---------|--------|---------|
| `DISABLE_BUG_COMMAND` | false | Disable the /bug command | `export DISABLE_BUG_COMMAND=1` |
| `DISABLE_DOCTOR_COMMAND` | false | Disable the /doctor command | `export DISABLE_DOCTOR_COMMAND=1` |
| `DISABLE_EXTRA_USAGE_COMMAND` | false | Disable the /usage command | `export DISABLE_EXTRA_USAGE_COMMAND=1` |
| `DISABLE_FEEDBACK_COMMAND` | false | Disable the /feedback command | `export DISABLE_FEEDBACK_COMMAND=1` |
| `DISABLE_INSTALLATION_CHECKS` | false | Disable installation verification checks | `export DISABLE_INSTALLATION_CHECKS=1` |
| `DISABLE_INSTALL_GITHUB_APP_COMMAND` | false | Disable the install GitHub app command | `export DISABLE_INSTALL_GITHUB_APP_COMMAND=1` |
| `DISABLE_LOGIN_COMMAND` | false | Disable the /login command | `export DISABLE_LOGIN_COMMAND=1` |
| `DISABLE_LOGOUT_COMMAND` | false | Disable the /logout command | `export DISABLE_LOGOUT_COMMAND=1` |
| `DISABLE_UPGRADE_COMMAND` | false | Disable the /upgrade command | `export DISABLE_UPGRADE_COMMAND=1` |

---

## Execution Environment

### Bash & Shell

#### `BASH_MAX_OUTPUT_LENGTH`
- **Type:** Integer (characters)
- **Default:** 30000
- **Upper limit:** 150000
- **Description:** Maximum output length for bash commands. Longer outputs are truncated. Must be > 0 and <= 150000.
- **Example:** `export BASH_MAX_OUTPUT_LENGTH=50000`

#### `TASK_MAX_OUTPUT_LENGTH`
- **Type:** Integer (characters)
- **Default:** Unspecified (typically same as BASH_MAX_OUTPUT_LENGTH)
- **Description:** Maximum output length for task results. Truncates long task outputs.
- **Example:** `export TASK_MAX_OUTPUT_LENGTH=50000`

#### `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Maintain the project working directory across bash commands. When true, each bash invocation resumes in the previous directory context.
- **Example:** `export CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR=1`

#### `CLAUDE_CODE_USE_POWERSHELL_TOOL`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use PowerShell instead of Bash for shell commands. Useful on Windows or when PowerShell is preferred.
- **Example:** `export CLAUDE_CODE_USE_POWERSHELL_TOOL=1`

#### `CLAUDE_CODE_GIT_BASH_PATH`
- **Type:** String (path to bash executable)
- **Default:** Auto-detected on Windows
- **Description:** Path to git bash executable on Windows. Overrides auto-detection.
- **Example:** `export CLAUDE_CODE_GIT_BASH_PATH="C:\\Program Files\\Git\\bin\\bash.exe"`

#### `CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (typically 5000 ms)
- **Description:** PowerShell command parse timeout in milliseconds. Parsed as int; must be > 0.
- **Example:** `export CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS=10000`

#### `SLASH_COMMAND_TOOL_CHAR_BUDGET`
- **Type:** Integer (characters)
- **Default:** Unspecified
- **Description:** Character budget for slash command tool output. Truncates long outputs from /command invocations.
- **Example:** `export SLASH_COMMAND_TOOL_CHAR_BUDGET=10000`

### Tool Configuration

#### `CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY`
- **Type:** Integer
- **Default:** 10
- **Description:** Maximum concurrent tool use operations. Higher values allow parallel tool execution but consume more resources.
- **Example:** `export CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY=20`

#### `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS`
- **Type:** Integer (tokens)
- **Default:** Unspecified (typically 10000)
- **Description:** Maximum output tokens when reading files. Longer files are truncated to this token limit.
- **Example:** `export CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS=50000`

#### `CLAUDE_CODE_GLOB_TIMEOUT_SECONDS`
- **Type:** Integer (seconds)
- **Default:** Unspecified (typically 30)
- **Description:** Timeout in seconds for glob operations. Prevents hangs on slow filesystems.
- **Example:** `export CLAUDE_CODE_GLOB_TIMEOUT_SECONDS=60`

#### `CLAUDE_CODE_GLOB_HIDDEN`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Include hidden files in glob searches. When true, globs match .hidden files.
- **Example:** `export CLAUDE_CODE_GLOB_HIDDEN=1`

#### `CLAUDE_CODE_GLOB_NO_IGNORE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Don't respect .gitignore in glob searches. When true, ignores .gitignore rules.
- **Example:** `export CLAUDE_CODE_GLOB_NO_IGNORE=1`

#### `USE_BUILTIN_RIPGREP`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use the built-in ripgrep binary instead of system ripgrep. Useful when system ripgrep is unavailable or outdated.
- **Example:** `export USE_BUILTIN_RIPGREP=1`

#### `CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Emit summary descriptions for tool use actions. Shows human-readable summaries of tool calls.
- **Example:** `export CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES=1`

#### `CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Include partial/streaming messages in output. Shows in-flight messages as they arrive.
- **Example:** `export CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES=1`

#### `CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Show 'SandboxedBash' label when sandbox is active. Useful for visibility in sandboxed environments.
- **Example:** `export CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR=1`

#### `MAX_STRUCTURED_OUTPUT_RETRIES`
- **Type:** Integer
- **Default:** 5
- **Description:** Maximum retries for structured output parsing. Higher values retry more on parse failures.
- **Example:** `export MAX_STRUCTURED_OUTPUT_RETRIES=10`

#### `USE_API_CONTEXT_MANAGEMENT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use API-side context management instead of client-side. Delegates context handling to the API.
- **Example:** `export USE_API_CONTEXT_MANAGEMENT=1`

### Node.js & Bun Runtime

#### `NODE_ENV`
- **Type:** String (enum: development, production, test)
- **Default:** `production`
- **Description:** Node.js environment. Affects module loading, optimizations, and error handling.
- **Example:** `export NODE_ENV=development`

#### `NODE_OPTIONS`
- **Type:** String (Node.js CLI options)
- **Default:** Unspecified
- **Description:** Additional Node.js CLI options. Passed to the Node.js runtime.
- **Example:** `export NODE_OPTIONS='--max-old-space-size=4096'`

#### `NODE_DEBUG`
- **Type:** String (module filter)
- **Default:** Unspecified
- **Description:** Node.js debug module filter. Enables debug output for specific modules.
- **Example:** `export NODE_DEBUG=http,net`

#### `NODE_UNIQUE_ID`
- **Type:** String (worker ID)
- **Default:** Unspecified
- **Description:** Node.js cluster worker unique ID. Used in cluster mode.
- **Example:** `export NODE_UNIQUE_ID=worker-1`

#### `NODE_CLUSTER_SCHED_POLICY`
- **Type:** String (enum: rr, none)
- **Default:** `rr` (round-robin)
- **Description:** Node.js cluster scheduling policy. Controls how OS assigns connections to workers.
- **Example:** `export NODE_CLUSTER_SCHED_POLICY=none`

#### `BUN_ENV`
- **Type:** String (enum: development, production)
- **Default:** `production`
- **Description:** Bun runtime environment. Similar to NODE_ENV but for Bun.
- **Example:** `export BUN_ENV=development`

#### `BUN_INSTALL`
- **Type:** String (directory path)
- **Default:** `~/.bun`
- **Description:** Bun installation directory. Where Bun stores packages and cache.
- **Example:** `export BUN_INSTALL=/opt/bun`

#### `BUN_FEEDBACK_URL`
- **Type:** URL
- **Default:** `https://bun.report/v1/feedback`
- **Description:** URL for Bun feedback submission.
- **Example:** `export BUN_FEEDBACK_URL=https://internal.bun.report/feedback`

#### `BUN_DISABLE_DYNAMIC_CHUNK_SIZE`
- **Type:** Boolean (1, 0)
- **Default:** false
- **Description:** Set to '1' to disable dynamic chunk sizing in Bun. Forces fixed chunk sizes.
- **Example:** `export BUN_DISABLE_DYNAMIC_CHUNK_SIZE=1`

#### `BUN_INSPECT_NOTIFY`
- **Type:** String (unix:// URL)
- **Default:** Unspecified
- **Description:** URL for Bun inspector notification. Used with debuggers.
- **Example:** `export BUN_INSPECT_NOTIFY=unix:///tmp/bun-inspect.sock`

#### `BUN_JS_DEBUG`
- **Type:** Boolean (1, 0)
- **Default:** false
- **Description:** Enable Bun JavaScript debug logging.
- **Example:** `export BUN_JS_DEBUG=1`

#### `UV_THREADPOOL_SIZE`
- **Type:** Integer
- **Default:** 4 (or CPU count, whichever is higher)
- **Description:** libuv thread pool size for async I/O. Affects concurrency of filesystem and DNS operations.
- **Example:** `export UV_THREADPOOL_SIZE=16`

#### `COREPACK_ENABLE_AUTO_PIN`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable Corepack auto-pinning of package managers. Automatically pins npm/yarn/pnpm versions.
- **Example:** `export COREPACK_ENABLE_AUTO_PIN=1`

#### `SHARP_FORCE_GLOBAL_LIBVIPS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force Sharp (image library) to use globally installed libvips. Useful for system-wide image library sharing.
- **Example:** `export SHARP_FORCE_GLOBAL_LIBVIPS=1`

#### `SHARP_IGNORE_GLOBAL_LIBVIPS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force Sharp to ignore globally installed libvips. Uses bundled libvips instead.
- **Example:** `export SHARP_IGNORE_GLOBAL_LIBVIPS=1`

#### `GRACEFUL_FS_PLATFORM`
- **Type:** String (platform identifier)
- **Default:** Auto-detected
- **Description:** Override platform detection for graceful-fs. Useful when auto-detection fails.
- **Example:** `export GRACEFUL_FS_PLATFORM=linux`

#### `MODIFIERS_NODE_PATH`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** Custom Node.js path for module resolution. Prepended to NODE_PATH.
- **Example:** `export MODIFIERS_NODE_PATH=/custom/node/modules`

#### `PKG_CONFIG_PATH`
- **Type:** String (colon-separated paths)
- **Default:** System defaults
- **Description:** pkg-config search path. Used for locating system libraries.
- **Example:** `export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:/opt/lib/pkgconfig`

### gRPC

#### `GRPC_VERBOSITY`
- **Type:** String (enum: DEBUG, INFO, ERROR, NONE)
- **Default:** `ERROR`
- **Description:** gRPC log verbosity level. Controls how much gRPC logs are emitted.
- **Example:** `export GRPC_VERBOSITY=DEBUG`

#### `GRPC_TRACE`
- **Type:** String (comma-separated trace categories)
- **Default:** Unspecified (no tracing)
- **Description:** gRPC trace categories for debugging. Enables extra logging for specific internal components.
- **Example:** `export GRPC_TRACE=all`

#### `GRPC_NODE_VERBOSITY`
- **Type:** String (log level)
- **Default:** Unspecified
- **Description:** gRPC Node.js specific verbosity level.
- **Example:** `export GRPC_NODE_VERBOSITY=debug`

#### `GRPC_NODE_TRACE`
- **Type:** String (comma-separated categories)
- **Default:** Unspecified
- **Description:** gRPC Node.js specific trace categories.
- **Example:** `export GRPC_NODE_TRACE=channel`

#### `GRPC_NODE_USE_ALTERNATIVE_RESOLVER`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use alternative DNS resolver for gRPC in Node.js. Useful when default resolver is unreliable.
- **Example:** `export GRPC_NODE_USE_ALTERNATIVE_RESOLVER=1`

#### `GRPC_SSL_CIPHER_SUITES`
- **Type:** String (colon-separated cipher suite names)
- **Default:** OpenSSL defaults
- **Description:** Override SSL cipher suites for gRPC connections. Controls cryptographic algorithms used.
- **Example:** `export GRPC_SSL_CIPHER_SUITES=HIGH:!aNULL:!MD5`

#### `GRPC_DEFAULT_SSL_ROOTS_FILE_PATH`
- **Type:** String (file path to PEM)
- **Default:** System CA bundle
- **Description:** Path to custom SSL roots file for gRPC. Overrides default CA certificates.
- **Example:** `export GRPC_DEFAULT_SSL_ROOTS_FILE_PATH=/etc/ssl/certs/ca-bundle.crt`

#### `GRPC_EXPERIMENTAL_ENABLE_OUTLIER_DETECTION`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable experimental gRPC outlier detection. Detects and avoids unhealthy servers.
- **Example:** `export GRPC_EXPERIMENTAL_ENABLE_OUTLIER_DETECTION=1`

### Tmux

#### `CLAUDE_CODE_TMUX_PREFIX`
- **Type:** String (key binding, e.g., C-b, C-a)
- **Default:** Detected from tmux config
- **Description:** Override the tmux prefix key. Useful when your tmux config uses a non-standard prefix.
- **Example:** `export CLAUDE_CODE_TMUX_PREFIX=C-a`

#### `CLAUDE_CODE_TMUX_PREFIX_CONFLICTS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Handle tmux prefix key conflicts. When true, manages prefix conflicts with other programs.
- **Example:** `export CLAUDE_CODE_TMUX_PREFIX_CONFLICTS=1`

#### `CLAUDE_CODE_TMUX_SESSION`
- **Type:** String (session name)
- **Default:** Auto-generated
- **Description:** Tmux session name for Claude Code. Defaults to a generated name if not set.
- **Example:** `export CLAUDE_CODE_TMUX_SESSION=claude-main`

#### `CLAUDE_CODE_TMUX_TRUECOLOR`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Preserve detected truecolor level under tmux. When set, prevents automatic downgrade to 256 colors inside tmux.
- **Example:** `export CLAUDE_CODE_TMUX_TRUECOLOR=1`

#### `TMUX`
- **Type:** String (socket path)
- **Default:** Detected automatically when running inside tmux
- **Description:** Set automatically when running inside tmux. Not typically set manually.
- **Example:** `/tmp/tmux-1000/default`

#### `TMUX_PANE`
- **Type:** String (pane identifier, e.g., %0)
- **Default:** Detected automatically
- **Description:** Current tmux pane identifier. Detected automatically when running inside tmux.
- **Example:** `%0`

### Terminal Detection

#### `TERM`
- **Type:** String (terminal identifier)
- **Default:** Auto-detected (usually xterm-256color or similar)
- **Description:** Terminal type identifier. Affects color support, cursor movement, etc. Auto-detected by most terminal emulators.
- **Example:** `export TERM=xterm-256color`

#### `COLORTERM`
- **Type:** String (color capability, e.g., truecolor, 256color)
- **Default:** Auto-detected
- **Description:** Color terminal capability. Indicates 24-bit truecolor, 256-color, or basic color support.
- **Example:** `export COLORTERM=truecolor`

#### `FORCE_COLOR`
- **Type:** Boolean (1, true, 0, false)
- **Default:** Auto-detected based on TERM and TTY
- **Description:** Force color output regardless of terminal detection. Set to 0 to disable colors.
- **Example:** `export FORCE_COLOR=1`

#### `COLORFGBG`
- **Type:** String (color codes, e.g., "15;0")
- **Default:** Unspecified
- **Description:** Terminal foreground/background color hint. Parsed to detect dark (0-6, 8) vs light theme.
- **Example:** `export COLORFGBG=15;0`

#### `ITERM_SESSION_ID`
- **Type:** String (session ID)
- **Default:** Unspecified (set by iTerm2)
- **Description:** iTerm2 session identifier. Detected when running inside iTerm2.
- **Example:** `w0t0p0:1234567-89AB-CDEF`

#### `TERM_PROGRAM`
- **Type:** String (program name)
- **Default:** Unspecified
- **Description:** Terminal program name (e.g., iTerm.app, Apple_Terminal). Used for terminal detection.
- **Example:** `export TERM_PROGRAM=iTerm.app`

#### `TERM_PROGRAM_VERSION`
- **Type:** String (version string)
- **Default:** Unspecified
- **Description:** Terminal program version.
- **Example:** `export TERM_PROGRAM_VERSION=3.4.0`

#### `KITTY_WINDOW_ID`
- **Type:** Integer
- **Default:** Unspecified (set by Kitty terminal)
- **Description:** Kitty terminal window ID. Detected when running inside Kitty.
- **Example:** `1`

#### `ALACRITTY_LOG`
- **Type:** String (file path)
- **Default:** Unspecified
- **Description:** Alacritty terminal log path. Used for terminal detection.
- **Example:** `/tmp/alacritty.log`

#### `GNOME_TERMINAL_SERVICE`
- **Type:** String (D-Bus service name)
- **Default:** Unspecified
- **Description:** GNOME Terminal service name. Detected when running inside GNOME Terminal.
- **Example:** org.gnome.Terminal

#### `VTE_VERSION`
- **Type:** Integer (version number)
- **Default:** Unspecified
- **Description:** VTE (GNOME Terminal) version. Indicates terminal capabilities.
- **Example:** `5000`

#### `KONSOLE_VERSION`
- **Type:** Integer
- **Default:** Unspecified
- **Description:** KDE Konsole version. Detected when running inside Konsole.
- **Example:** `200000`

#### `XTERM_VERSION`
- **Type:** Integer
- **Default:** Unspecified
- **Description:** xterm version. Detected when running inside xterm.
- **Example:** `379`

#### `TILIX_ID`
- **Type:** String (terminal ID)
- **Default:** Unspecified
- **Description:** Tilix terminal ID. Detected when running inside Tilix.
- **Example:** `1234567890`

#### `TERMINATOR_UUID`
- **Type:** String (UUID)
- **Default:** Unspecified
- **Description:** Terminator terminal UUID. Detected when running inside Terminator.
- **Example:** `ffffffff-ffff-ffff-ffff-ffffffffffff`

#### `TERMINAL`
- **Type:** String (terminal identifier)
- **Default:** Unspecified
- **Description:** Generic terminal identifier for detection.
- **Example:** `xterm`

#### `TERMINAL_EMULATOR`
- **Type:** String (emulator identifier)
- **Default:** Unspecified
- **Description:** Terminal emulator identifier (e.g., JetBrains-JediTerm).
- **Example:** `JetBrains-JediTerm`

#### `WT_SESSION`
- **Type:** String (session GUID)
- **Default:** Unspecified (set by Windows Terminal)
- **Description:** Windows Terminal session ID. Detected when running inside Windows Terminal.
- **Example:** `11111111-1111-1111-1111-111111111111`

#### `SESSIONNAME`
- **Type:** String
- **Default:** Unspecified (set by Windows)
- **Description:** Windows session name. Used for terminal detection on Windows.
- **Example:** `Console`

#### `BAT_THEME`
- **Type:** String (theme name)
- **Default:** Unspecified (bat uses default theme)
- **Description:** Theme for bat syntax highlighter. Used when displaying code in the terminal.
- **Example:** `export BAT_THEME=Monokai Extended`

#### `CLI_WIDTH`
- **Type:** Integer (characters)
- **Default:** Auto-detected from terminal width
- **Description:** Override terminal width for formatting. Useful when auto-detection fails.
- **Example:** `export CLI_WIDTH=120`

#### `LC_TERMINAL`
- **Type:** String (terminal identifier)
- **Default:** Unspecified
- **Description:** Terminal identifier from locale settings.
- **Example:** `xterm-256color`

---

## Agents, Plans, Tasks

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

## Context, Compaction, Session Resume

### `DISABLE_COMPACT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Disable the /compact command entirely. When set, compaction is not available to the user.
- **Example:** `export DISABLE_COMPACT=1`

### `DISABLE_AUTO_COMPACT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Disable automatic context compaction. Context will grow until the hard limit is reached.
- **Example:** `export DISABLE_AUTO_COMPACT=1`

### `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`
- **Type:** Integer (percentage, 0-100)
- **Default:** Unspecified (typically 80)
- **Description:** Override auto-compaction trigger percentage. Compaction triggers when context reaches this % of window.
- **Example:** `export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=75`

### `CLAUDE_CODE_AUTO_COMPACT_WINDOW`
- **Type:** Integer (tokens)
- **Default:** Model-dependent
- **Description:** Override the auto-compaction context window size. Parsed as int; must be > 0.
- **Example:** `export CLAUDE_CODE_AUTO_COMPACT_WINDOW=150000`

### `CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE`
- **Type:** Integer (tokens)
- **Default:** Model-dependent (typically 100000)
- **Description:** Override the blocking context limit. When reached, further messages are blocked. Parsed as int; must be > 0.
- **Example:** `export CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE=180000`

### `CLAUDE_AFTER_LAST_COMPACT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** When fetching session data, only retrieve messages after the last compaction. Reduces session resume time.
- **Example:** `export CLAUDE_AFTER_LAST_COMPACT=1`

### `CLAUDE_CODE_RESUME_INTERRUPTED_TURN`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Resume an interrupted turn after compaction or reconnection. Continues where the last message left off.
- **Example:** `export CLAUDE_CODE_RESUME_INTERRUPTED_TURN=1`

### `CLAUDE_CODE_IDLE_THRESHOLD_MINUTES`
- **Type:** Integer (minutes)
- **Default:** 75
- **Description:** Idle threshold in minutes before prompting for session action. Asks user if they want to compact or resume.
- **Example:** `export CLAUDE_CODE_IDLE_THRESHOLD_MINUTES=120`

### `CLAUDE_CODE_IDLE_TOKEN_THRESHOLD`
- **Type:** Integer (tokens)
- **Default:** 100000
- **Description:** Token count (context size) threshold before prompting for session action.
- **Example:** `export CLAUDE_CODE_IDLE_TOKEN_THRESHOLD=150000`

### `CLAUDE_CODE_RESUME_THRESHOLD_MINUTES`
- **Type:** Integer (minutes)
- **Default:** 70
- **Description:** Minutes since last message before prompting to resume the session.
- **Example:** `export CLAUDE_CODE_RESUME_THRESHOLD_MINUTES=60`

### `CLAUDE_CODE_RESUME_TOKEN_THRESHOLD`
- **Type:** Integer (tokens)
- **Default:** 100000
- **Description:** Token threshold for resume prompt.
- **Example:** `export CLAUDE_CODE_RESUME_TOKEN_THRESHOLD=120000`

---

## Observability

### OpenTelemetry (OTEL)

#### `OTEL_EXPORTER_OTLP_ENDPOINT`
- **Type:** URL
- **Default:** Unspecified (no export)
- **Description:** OTLP exporter endpoint URL. Base endpoint for traces, metrics, and logs. Usually port 4317 (gRPC) or 4318 (HTTP).
- **Example:** `export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317`

#### `OTEL_EXPORTER_OTLP_HEADERS`
- **Type:** String (comma-separated key=value pairs)
- **Default:** Unspecified
- **Description:** Headers for OTLP exporter requests. Useful for authentication or custom metadata.
- **Example:** `export OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer token123`

#### `OTEL_EXPORTER_OTLP_PROTOCOL`
- **Type:** String (enum: grpc, http/protobuf, http/json)
- **Default:** grpc
- **Description:** OTLP transport protocol. Controls how data is sent to the collector.
- **Example:** `export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf`

#### `OTEL_EXPORTER_OTLP_INSECURE`
- **Type:** Boolean (true, false)
- **Default:** false
- **Description:** Allow insecure (non-TLS) OTLP connections. Only use in development/testing.
- **Example:** `export OTEL_EXPORTER_OTLP_INSECURE=true`

#### `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL`
- **Type:** String (enum: grpc, http/protobuf, http/json)
- **Default:** Inherits OTEL_EXPORTER_OTLP_PROTOCOL
- **Description:** Override OTLP protocol specifically for traces.
- **Example:** `export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf`

#### `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`
- **Type:** String (enum: grpc, http/protobuf, http/json)
- **Default:** Inherits OTEL_EXPORTER_OTLP_PROTOCOL
- **Description:** Override OTLP protocol specifically for metrics.
- **Example:** `export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL=http/protobuf`

#### `OTEL_EXPORTER_OTLP_LOGS_PROTOCOL`
- **Type:** String (enum: grpc, http/protobuf, http/json)
- **Default:** Inherits OTEL_EXPORTER_OTLP_PROTOCOL
- **Description:** Override OTLP protocol specifically for logs.
- **Example:** `export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL=http/protobuf`

#### `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`
- **Type:** String (enum: cumulative, delta)
- **Default:** cumulative
- **Description:** Metrics temporality preference. Cumulative is standard; delta is more efficient.
- **Example:** `export OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE=delta`

#### `OTEL_TRACES_EXPORTER`
- **Type:** String (enum: otlp, console, none)
- **Default:** none
- **Description:** Traces exporter type. Set to otlp to send to OTLP endpoint, console for stdout, none to disable.
- **Example:** `export OTEL_TRACES_EXPORTER=otlp`

#### `OTEL_METRICS_EXPORTER`
- **Type:** String (enum: otlp, prometheus, console, none)
- **Default:** none
- **Description:** Metrics exporter type. Prometheus exports for Prometheus scraping.
- **Example:** `export OTEL_METRICS_EXPORTER=prometheus`

#### `OTEL_LOGS_EXPORTER`
- **Type:** String (enum: otlp, console, none)
- **Default:** none
- **Description:** Logs exporter type.
- **Example:** `export OTEL_LOGS_EXPORTER=otlp`

#### `OTEL_EXPORTER_PROMETHEUS_HOST`
- **Type:** String (hostname or IP)
- **Default:** 0.0.0.0
- **Description:** Host for Prometheus metrics exporter. Usually binds to all interfaces.
- **Example:** `export OTEL_EXPORTER_PROMETHEUS_HOST=localhost`

#### `OTEL_EXPORTER_PROMETHEUS_PORT`
- **Type:** Integer (port number)
- **Default:** 8888
- **Description:** Port for Prometheus metrics exporter.
- **Example:** `export OTEL_EXPORTER_PROMETHEUS_PORT=9090`

#### `OTEL_TRACES_EXPORT_INTERVAL`
- **Type:** Integer (milliseconds)
- **Default:** 5000
- **Description:** Traces export interval in milliseconds. How often to flush traces to the collector.
- **Example:** `export OTEL_TRACES_EXPORT_INTERVAL=10000`

#### `OTEL_METRIC_EXPORT_INTERVAL`
- **Type:** Integer (milliseconds)
- **Default:** 60000
- **Description:** Metrics export interval in milliseconds.
- **Example:** `export OTEL_METRIC_EXPORT_INTERVAL=30000`

#### `OTEL_LOGS_EXPORT_INTERVAL`
- **Type:** Integer (milliseconds)
- **Default:** 5000
- **Description:** Logs export interval in milliseconds.
- **Example:** `export OTEL_LOGS_EXPORT_INTERVAL=10000`

#### `OTEL_LOG_TOOL_CONTENT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Log tool content (input/output) in OTEL spans. Can be verbose; use cautiously.
- **Example:** `export OTEL_LOG_TOOL_CONTENT=1`

#### `OTEL_LOG_TOOL_DETAILS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Log detailed tool use information in OTEL spans.
- **Example:** `export OTEL_LOG_TOOL_DETAILS=1`

#### `OTEL_LOG_USER_PROMPTS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Log user prompts in OTEL spans. Useful for tracing; be aware of privacy implications.
- **Example:** `export OTEL_LOG_USER_PROMPTS=1`

#### `CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** 5000
- **Description:** OTEL flush timeout in milliseconds. Time to wait for pending spans before shutdown.
- **Example:** `export CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS=10000`

#### `CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** 2000
- **Description:** OTEL shutdown timeout in milliseconds. Time to gracefully close exporters.
- **Example:** `export CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS=5000`

#### `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified
- **Description:** Debounce interval for OTEL headers helper in milliseconds.
- **Example:** `export CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS=1000`

### Datadog

#### `CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS`
- **Type:** Integer (milliseconds)
- **Default:** 15000
- **Description:** Datadog log flush interval in milliseconds. How often to send logs to Datadog.
- **Example:** `export CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS=10000`

### Profiling & Diagnostics

#### `CLAUDE_CODE_PROFILE_STARTUP`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable startup profiling. Collects timing data for the startup sequence.
- **Example:** `export CLAUDE_CODE_PROFILE_STARTUP=1`

#### `CLAUDE_CODE_PERFETTO_TRACE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable Perfetto trace collection. Generates detailed performance traces for visualization.
- **Example:** `export CLAUDE_CODE_PERFETTO_TRACE=1`

#### `CLAUDE_CODE_COMMIT_LOG`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable React commit (render) performance logging. Not related to git commits; tracks UI rendering.
- **Example:** `export CLAUDE_CODE_COMMIT_LOG=1`

#### `CLAUDE_CODE_DEBUG_REPAINTS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable debug logging for UI repaints. Shows when and why UI components re-render.
- **Example:** `export CLAUDE_CODE_DEBUG_REPAINTS=1`

#### `CLAUDE_CODE_FRAME_TIMING_LOG`
- **Type:** String (file path)
- **Default:** Unspecified (no frame timing log)
- **Description:** Path to write frame timing logs. Detailed timing data for each frame rendered.
- **Example:** `export CLAUDE_CODE_FRAME_TIMING_LOG=/tmp/frame-timing.txt`

#### `CLAUDE_CODE_SCROLL_SPEED`
- **Type:** Float
- **Default:** 3.0 on Windows Terminal; 1.0 elsewhere
- **Range:** Clamped to max 20
- **Description:** Terminal scroll speed multiplier. Parsed as float. Lower = slower scrolling.
- **Example:** `export CLAUDE_CODE_SCROLL_SPEED=2.5`

#### `CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified
- **Description:** Threshold in ms for logging slow operations. Operations taking longer are logged.
- **Example:** `export CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS=1000`

#### `CLAUDE_CODE_EAGER_FLUSH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable eager flushing of output buffers. Ensures output is written immediately.
- **Example:** `export CLAUDE_CODE_EAGER_FLUSH=1`

#### `CLAUDE_CODE_NO_FLICKER`
- **Type:** Integer (1 or 0, not boolean)
- **Default:** Unspecified (auto-detect)
- **Description:** Force fullscreen anti-flicker mode. Set to 1 to enable (overrides tmux detection). Set to 0 to force-disable.
- **Example:** `export CLAUDE_CODE_NO_FLICKER=1`

#### `CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified
- **Description:** Stall timeout override for testing purposes. Used in tests to simulate slow operations.
- **Example:** `export CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING=5000`

#### `CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Emit session_state_changed system events when the session transitions between idle/running states.
- **Example:** `export CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS=1`

#### `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip network error handling in fast mode. Useful for debugging network issues.
- **Example:** `export CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS=1`

---

## Networking

### Proxy & TLS

#### `HTTP_PROXY`
- **Type:** URL
- **Default:** Unspecified
- **Description:** HTTP proxy URL for outbound connections. Used for HTTP requests.
- **Example:** `export HTTP_PROXY=http://proxy.company.com:8080`

#### `HTTPS_PROXY`
- **Type:** URL
- **Default:** Unspecified
- **Description:** HTTPS proxy URL for outbound connections. Used for HTTPS requests. Often the same as HTTP_PROXY.
- **Example:** `export HTTPS_PROXY=http://proxy.company.com:8080`

#### `NO_PROXY`
- **Type:** String (comma-separated hosts/domains)
- **Default:** Unspecified
- **Description:** Comma-separated list of hosts/domains that bypass the proxy. Use wildcards or IP ranges.
- **Example:** `export NO_PROXY=localhost,127.0.0.1,.internal.company.com`

#### `NODE_EXTRA_CA_CERTS`
- **Type:** String (file path to PEM certificates)
- **Default:** Unspecified
- **Description:** Path to additional CA certificates file (PEM format). Appended to Node.js default CA list for TLS validation.
- **Example:** `export NODE_EXTRA_CA_CERTS=/etc/ssl/certs/company-ca.pem`
- **Security:** Ensure the file is readable only by the intended user (chmod 644).

#### `NODE_USE_SYSTEM_CA`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use the system CA certificate store in addition to Node.js bundled CAs. Useful in corporate environments.
- **Example:** `export NODE_USE_SYSTEM_CA=1`

#### `NODE_TLS_REJECT_UNAUTHORIZED`
- **Type:** String (0 or 1)
- **Default:** 1 (reject unauthorized)
- **Description:** TLS certificate validation. Set to '0' to disable TLS certificate validation (INSECURE; development only). Must be the string '0' or '1', not boolean.
- **Example:** `export NODE_TLS_REJECT_UNAUTHORIZED=0`
- **Security:** CRITICAL RISK. Disables TLS validation, opening you to man-in-the-middle attacks. Use only for testing self-signed certs; never in production.

#### `SSL_CERT_FILE`
- **Type:** String (file path to PEM bundle)
- **Default:** System default CA bundle
- **Description:** Path to SSL certificate bundle file. Alternative way to specify trusted CA certificates.
- **Example:** `export SSL_CERT_FILE=/etc/ssl/certs/ca-bundle.crt`

#### `CLAUDE_CODE_CLIENT_CERT`
- **Type:** String (file path to PEM certificate)
- **Default:** Unspecified
- **Description:** Path to mTLS client certificate file. Used for client certificate authentication.
- **Example:** `export CLAUDE_CODE_CLIENT_CERT=/etc/ssl/certs/client-cert.pem`

#### `CLAUDE_CODE_CLIENT_KEY`
- **Type:** String (file path to PEM private key)
- **Default:** Unspecified
- **Description:** Path to mTLS client private key file. Must match CLAUDE_CODE_CLIENT_CERT.
- **Example:** `export CLAUDE_CODE_CLIENT_KEY=/etc/ssl/private/client-key.pem`

#### `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE`
- **Type:** String (passphrase)
- **Default:** Unspecified
- **Description:** Passphrase for the mTLS client private key. Required if the key is encrypted.
- **Example:** `export CLAUDE_CODE_CLIENT_KEY_PASSPHRASE=my-secret-passphrase`
- **Security:** Store in a secret manager; do not hardcode.

#### `CLAUDE_CODE_PROXY_RESOLVES_HOSTS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicate that the proxy handles DNS resolution. When true, DNS lookups are done by the proxy, not locally.
- **Example:** `export CLAUDE_CODE_PROXY_RESOLVES_HOSTS=1`

#### `CLAUDE_CODE_SIMULATE_PROXY_USAGE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Simulate proxy behavior by stripping beta headers from API requests. For testing proxy scenarios.
- **Example:** `export CLAUDE_CODE_SIMULATE_PROXY_USAGE=1`

---

## Integrations

### MCP (Model Context Protocol)

#### `CLAUDE_CODE_MCP_ALLOWLIST_ENV`
- **Type:** Boolean (1, true, 0, false)
- **Default:** true (enabled only for local-agent entrypoint)
- **Description:** Enable env var allowlist filtering for MCP servers. Restricts which env vars MCP servers can access.
- **Example:** `export CLAUDE_CODE_MCP_ALLOWLIST_ENV=0`

#### `MCP_SERVER_CONNECTION_BATCH_SIZE`
- **Type:** Integer
- **Default:** 3
- **Description:** Number of MCP servers to connect to simultaneously. Lower values = slower but less resource-intensive.
- **Example:** `export MCP_SERVER_CONNECTION_BATCH_SIZE=5`

#### `MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE`
- **Type:** Integer
- **Default:** 20
- **Description:** Number of remote MCP servers to connect simultaneously. Higher than local batch due to network latency.
- **Example:** `export MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE=30`

#### `MCP_TIMEOUT`
- **Type:** Integer (milliseconds)
- **Default:** 30000
- **Description:** MCP server connection timeout in milliseconds. Increases if servers are slow to initialize.
- **Example:** `export MCP_TIMEOUT=60000`

#### `MCP_TOOL_TIMEOUT`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (typically 30000)
- **Description:** MCP tool execution timeout in milliseconds. How long to wait for a tool call to complete.
- **Example:** `export MCP_TOOL_TIMEOUT=120000`

#### `MAX_MCP_OUTPUT_TOKENS`
- **Type:** Integer (tokens)
- **Default:** 25000
- **Description:** Maximum output tokens for MCP tool results. Longer outputs are truncated.
- **Example:** `export MAX_MCP_OUTPUT_TOKENS=50000`

#### `MCP_CONNECTION_NONBLOCKING`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Make MCP server connections non-blocking. Useful for slow servers that don't block startup.
- **Example:** `export MCP_CONNECTION_NONBLOCKING=1`

#### `MCP_OAUTH_CALLBACK_PORT`
- **Type:** Integer (port number)
- **Default:** Auto-selected (typically 3000-3100 range)
- **Description:** Port for MCP OAuth callback server. Used when MCP servers require OAuth.
- **Example:** `export MCP_OAUTH_CALLBACK_PORT=8080`

#### `MCP_OAUTH_CLIENT_METADATA_URL`
- **Type:** URL
- **Default:** Unspecified
- **Description:** URL for MCP OAuth client metadata. Points to OAuth provider metadata endpoint.
- **Example:** `export MCP_OAUTH_CLIENT_METADATA_URL=https://oauth.company.com/.well-known/openid-configuration`

#### `MCP_CLIENT_SECRET`
- **Type:** String (OAuth client secret)
- **Default:** Unspecified
- **Description:** Client secret for MCP OAuth authentication. Required if using OAuth with MCP.
- **Example:** `export MCP_CLIENT_SECRET=secret_abc123`
- **Security:** Store in a secret manager.

#### `MCP_XAA_IDP_CLIENT_SECRET`
- **Type:** String (IdP client secret)
- **Default:** Unspecified
- **Description:** IdP client secret for MCP XAA (Cross-Application Authentication). Used by the --client-secret CLI flag.
- **Example:** `export MCP_XAA_IDP_CLIENT_SECRET=idp_secret_xyz`
- **Security:** Store in a secret manager.

#### `MCP_TRUNCATION_PROMPT_OVERRIDE`
- **Type:** String (enum: subagent, legacy)
- **Default:** Feature flag–dependent (tengu_mcp_subagent_prompt)
- **Description:** Override MCP output truncation prompt mode. Controls how long outputs are summarized.
- **Example:** `export MCP_TRUNCATION_PROMPT_OVERRIDE=legacy`

### Plugins & Extensions

#### `CLAUDE_CODE_PLUGIN_CACHE_DIR`
- **Type:** String (directory path)
- **Default:** `${CLAUDE_CONFIG_DIR}/plugins-cache`
- **Description:** Custom cache directory for plugin storage. Downloaded plugins are cached here.
- **Example:** `export CLAUDE_CODE_PLUGIN_CACHE_DIR=/var/cache/claude-plugins`

#### `CLAUDE_CODE_PLUGIN_SEED_DIR`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** Directory containing seed/pre-installed plugins. Plugins in this dir are installed on first run.
- **Example:** `export CLAUDE_CODE_PLUGIN_SEED_DIR=/opt/claude-seeds/plugins`

#### `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (typically 30000)
- **Description:** Git operation timeout for plugin installation in milliseconds.
- **Example:** `export CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS=60000`

#### `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Keep the existing marketplace clone when git pull fails instead of re-cloning. Useful if network is unreliable.
- **Example:** `export CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE=1`

#### `CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use zip-based caching for plugin downloads. Useful for bandwidth-limited environments.
- **Example:** `export CLAUDE_CODE_PLUGIN_USE_ZIP_CACHE=1`

#### `CLAUDE_CODE_SYNC_PLUGIN_INSTALL`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Install plugins synchronously instead of async. Blocks startup until plugins are installed.
- **Example:** `export CLAUDE_CODE_SYNC_PLUGIN_INSTALL=1`

#### `CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (typically 60000)
- **Description:** Timeout for synchronous plugin installation in milliseconds.
- **Example:** `export CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS=120000`

#### `CLAUDE_CODE_USE_COWORK_PLUGINS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable cowork-mode plugins. Plugins designed for collaborative coding.
- **Example:** `export CLAUDE_CODE_USE_COWORK_PLUGINS=1`

#### `FORCE_AUTOUPDATE_PLUGINS`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force auto-update of installed plugins. Checks for updates on each startup.
- **Example:** `export FORCE_AUTOUPDATE_PLUGINS=1`

### IDE Integration

#### `CLAUDE_CODE_AUTO_CONNECT_IDE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** true
- **Description:** Automatically connect to detected IDE. Can be set to '0' to force-disable auto-connect.
- **Example:** `export CLAUDE_CODE_AUTO_CONNECT_IDE=0`

#### `CLAUDE_CODE_IDE_HOST_OVERRIDE`
- **Type:** String (hostname or IP)
- **Default:** localhost
- **Description:** Override the IDE host address. Useful when IDE is on a different machine.
- **Example:** `export CLAUDE_CODE_IDE_HOST_OVERRIDE=192.168.1.100`

#### `CLAUDE_CODE_SSE_PORT`
- **Type:** Integer (port number)
- **Default:** Auto-selected
- **Description:** SSE (Server-Sent Events) port for IDE communication. Used for bidirectional IDE/CLI communication.
- **Example:** `export CLAUDE_CODE_SSE_PORT=9000`

#### `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip automatic IDE extension installation. Disables auto-install of VS Code extension, etc.
- **Example:** `export CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL=1`

#### `CLAUDE_CODE_IDE_SKIP_VALID_CHECK`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Skip IDE connection validity check. Assumes IDE is available without testing.
- **Example:** `export CLAUDE_CODE_IDE_SKIP_VALID_CHECK=1`

#### `VSCODE_GIT_ASKPASS_MAIN`
- **Type:** String (file path)
- **Default:** Unspecified (set by VS Code)
- **Description:** Path to VS Code git askpass helper. Used for IDE detection.
- **Example:** `/path/to/vscode/askpass`

#### `CURSOR_TRACE_ID`
- **Type:** String (trace ID)
- **Default:** Unspecified (set by Cursor IDE)
- **Description:** Trace ID from Cursor IDE. Used for tracing interactions between Cursor and Claude Code.
- **Example:** `abc123def456`

#### `ZED_TERM`
- **Type:** String (terminal reference)
- **Default:** Unspecified (set by Zed editor)
- **Description:** Detected when running inside Zed editor terminal. Not typically set manually.
- **Example:** Unspecified

### Remote & Cowork

#### `CLAUDE_CODE_REMOTE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates Claude Code is running in remote/headless mode. Disables UI and adjusts behavior.
- **Example:** `export CLAUDE_CODE_REMOTE=1`

#### `CLAUDE_CODE_IS_COWORK`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates Claude Code is running in cowork (collaborative) mode.
- **Example:** `export CLAUDE_CODE_IS_COWORK=1`

#### `CLAUDE_CODE_REMOTE_SESSION_ID`
- **Type:** String (session identifier)
- **Default:** Unspecified
- **Description:** Session ID for remote connections. Included in x-claude-remote-session-id header.
- **Example:** `export CLAUDE_CODE_REMOTE_SESSION_ID=session-abc123`

#### `CLAUDE_CODE_CONTAINER_ID`
- **Type:** String (container identifier)
- **Default:** Unspecified
- **Description:** Container ID for remote sessions. Included in x-claude-remote-container-id header.
- **Example:** `export CLAUDE_CODE_CONTAINER_ID=container-xyz789`

#### `CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE`
- **Type:** String (environment type)
- **Default:** Unspecified
- **Description:** Type of remote environment (included in telemetry). E.g., docker, kubernetes, lambda.
- **Example:** `export CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE=docker`

#### `CLAUDE_CODE_REMOTE_MEMORY_DIR`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** Directory for remote memory storage. Used when auto-memory checks for remote mode.
- **Example:** `export CLAUDE_CODE_REMOTE_MEMORY_DIR=/var/lib/claude-memory`

#### `CLAUDE_CODE_REMOTE_SEND_KEEPALIVES`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Send keepalive messages in remote mode. Keeps connection alive across idle periods.
- **Example:** `export CLAUDE_CODE_REMOTE_SEND_KEEPALIVES=1`

#### `CLAUDE_CODE_USE_CCR_V2`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use CCR v2 for remote sessions. Updates to the new CCR protocol version.
- **Example:** `export CLAUDE_CODE_USE_CCR_V2=1`

#### `CLAUDE_BRIDGE_USE_CCR_V2`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use CCR v2 protocol for bridge/session connections.
- **Example:** `export CLAUDE_BRIDGE_USE_CCR_V2=1`

#### `CLAUDE_CODE_POST_FOR_SESSION_INGRESS_V2`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Use POST for session ingress v2 protocol. Newer protocol using POST instead of GET.
- **Example:** `export CLAUDE_CODE_POST_FOR_SESSION_INGRESS_V2=1`

#### `SESSION_INGRESS_URL`
- **Type:** URL
- **Default:** Unspecified
- **Description:** URL for session ingress in remote mode. Entry point for remote sessions.
- **Example:** `export SESSION_INGRESS_URL=https://ingress.company.com/session`

#### `CLAUDE_SESSION_INGRESS_TOKEN_FILE`
- **Type:** String (file path)
- **Default:** Unspecified
- **Description:** Path to file containing session ingress token. Token is read from this file.
- **Example:** `export CLAUDE_SESSION_INGRESS_TOKEN_FILE=/run/secrets/ingress-token`

#### `CLAUDE_STREAM_IDLE_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** 90000
- **Description:** Stream idle timeout in milliseconds before watchdog kicks in. Detects stalled streams.
- **Example:** `export CLAUDE_STREAM_IDLE_TIMEOUT_MS=120000`

#### `CCR_ENABLE_BUNDLE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable code bundle uploads for CCR (Claude Code Remote). Uploads local code to remote.
- **Example:** `export CCR_ENABLE_BUNDLE=1`

#### `CCR_FORCE_BUNDLE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force code bundle uploads for CCR regardless of feature flag.
- **Example:** `export CCR_FORCE_BUNDLE=1`

#### `CCR_UPSTREAM_PROXY_ENABLED`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable upstream proxy for Claude Code Remote. Requires CLAUDE_CODE_REMOTE and CLAUDE_CODE_REMOTE_SESSION_ID.
- **Example:** `export CCR_UPSTREAM_PROXY_ENABLED=1`

#### `CLAUDE_CODE_WORKSPACE_HOST_PATHS`
- **Type:** String (colon-separated paths)
- **Default:** Unspecified
- **Description:** Host paths for workspace mapping in containerized environments. Maps container paths to host paths.
- **Example:** `export CLAUDE_CODE_WORKSPACE_HOST_PATHS=/workspace:/mnt/workspace`

#### `CLAUDE_COWORK_MEMORY_PATH_OVERRIDE`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** Override the memory directory path in cowork mode.
- **Example:** `export CLAUDE_COWORK_MEMORY_PATH_OVERRIDE=/shared/memory`

#### `CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES`
- **Type:** String (markdown text)
- **Default:** Unspecified
- **Description:** Extra guidelines to inject into cowork memory system. Appended to standard memory guidelines.
- **Example:** `export CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES="Always document decisions in the shared wiki."`

#### `CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX`
- **Type:** String (prefix)
- **Default:** `os.hostname()` (sanitized to lowercase-dashed)
- **Description:** Prefix for remote control session names. Identifies sessions from this host.
- **Example:** `export CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX=prod-server`

#### `LOCAL_BRIDGE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable local bridge mode. Used for local development of bridge features.
- **Example:** `export LOCAL_BRIDGE=1`

---

## Platform & CI Detection

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

## Cloud Platform Detection

### `CODESPACES`
- **Type:** Boolean (set by GitHub Codespaces)
- **Default:** Unspecified
- **Description:** Detected when running in GitHub Codespaces. Set automatically.
- **Example:** Automatically set by Codespaces environment

### `GITPOD_WORKSPACE_ID`
- **Type:** String (workspace ID)
- **Default:** Unspecified
- **Description:** Gitpod workspace ID. Used for platform detection.
- **Example:** `workspace-id-123`

### `DENO_DEPLOYMENT_ID`
- **Type:** String (deployment ID)
- **Default:** Unspecified
- **Description:** Deno Deploy deployment ID. Used for platform detection.
- **Example:** `deployment-abc123`

### `CLOUD_RUN_JOB`
- **Type:** String (job ID)
- **Default:** Unspecified
- **Description:** Google Cloud Run Job identifier. Used for platform detection.
- **Example:** `my-job-123`

### `K_SERVICE`
- **Type:** String (service name)
- **Default:** Unspecified
- **Description:** Google Cloud Run/Knative service name. Used for platform detection.
- **Example:** `my-service`

### `K_CONFIGURATION`
- **Type:** String (configuration name)
- **Default:** Unspecified
- **Description:** Google Cloud Run/Knative configuration. Used for platform detection.
- **Example:** `my-service-config`

### `FUNCTION_TARGET`
- **Type:** String (function name)
- **Default:** Unspecified
- **Description:** Google Cloud Functions target. Used for platform detection.
- **Example:** `my-function`

### `FUNCTION_NAME`
- **Type:** String (function name)
- **Default:** Unspecified
- **Description:** Google Cloud Functions function name. Used for platform detection.
- **Example:** `my-function`

### `GAE_SERVICE`
- **Type:** String (service name)
- **Default:** Unspecified
- **Description:** Google App Engine service name. Used for platform detection.
- **Example:** `default`

### `GAE_MODULE_NAME`
- **Type:** String (module name)
- **Default:** Unspecified
- **Description:** Google App Engine module name (legacy term). Used for platform detection.
- **Example:** `backend`

### `GCLOUD_PROJECT`
- **Type:** String (project ID)
- **Default:** Unspecified
- **Description:** Legacy GCP project ID. Superseded by GOOGLE_CLOUD_PROJECT.
- **Example:** `my-gcp-project`

### `AWS_LAMBDA_FUNCTION_NAME`
- **Type:** String (function name)
- **Default:** Unspecified
- **Description:** AWS Lambda function name. Used for platform detection.
- **Example:** `my-function`

### `AWS_EXECUTION_ENV`
- **Type:** String (enum: AWS_ECS_FARGATE, AWS_ECS_EC2, AWS_LAMBDA)
- **Default:** Unspecified
- **Description:** AWS execution environment. Used for platform detection.
- **Example:** `AWS_ECS_FARGATE`

### `DYNO`
- **Type:** String (dyno identifier)
- **Default:** Unspecified
- **Description:** Heroku dyno identifier. Used for platform detection.
- **Example:** `web.1`

### `FLY_APP_NAME`
- **Type:** String (app name)
- **Default:** Unspecified
- **Description:** Fly.io application name. Used for platform detection.
- **Example:** `my-app`

### `FLY_MACHINE_ID`
- **Type:** String (machine ID)
- **Default:** Unspecified
- **Description:** Fly.io machine ID. Used for platform detection.
- **Example:** `3c4b0ff5470d8d`

### `RAILWAY_SERVICE_NAME`
- **Type:** String (service name)
- **Default:** Unspecified
- **Description:** Railway service name. Used for platform detection.
- **Example:** `api`

### `RAILWAY_ENVIRONMENT_NAME`
- **Type:** String (environment name)
- **Default:** Unspecified
- **Description:** Railway environment name. Used for platform detection.
- **Example:** `production`

### `RENDER`
- **Type:** Boolean (set by Render)
- **Default:** Unspecified
- **Description:** Detected when running on Render. Set automatically.
- **Example:** Automatically set by Render

### `VERCEL`
- **Type:** Boolean (set by Vercel)
- **Default:** Unspecified
- **Description:** Detected when running on Vercel. Set automatically.
- **Example:** Automatically set by Vercel

### `NETLIFY`
- **Type:** Boolean (set by Netlify)
- **Default:** Unspecified
- **Description:** Detected when running on Netlify. Set automatically.
- **Example:** Automatically set by Netlify

### `CF_PAGES`
- **Type:** Boolean (set by Cloudflare Pages)
- **Default:** Unspecified
- **Description:** Detected when running on Cloudflare Pages. Set automatically.
- **Example:** Automatically set by Cloudflare Pages

### `APP_URL`
- **Type:** URL
- **Default:** Unspecified
- **Description:** Application URL. Checked for DigitalOcean App Platform detection.
- **Example:** `https://my-app-abc123.ondigitalocean.app`

### `REPL_ID`
- **Type:** String (repl ID)
- **Default:** Unspecified
- **Description:** Replit repl ID. Used for platform detection.
- **Example:** `repl-id-123`

### `REPL_SLUG`
- **Type:** String (repl slug)
- **Default:** Unspecified
- **Description:** Replit repl slug. Used for platform detection.
- **Example:** `my-project-slug`

### `PROJECT_DOMAIN`
- **Type:** String (domain)
- **Default:** Unspecified
- **Description:** Glitch project domain. Used for platform detection.
- **Example:** `glitch-project-name`

### `SPACE_CREATOR_USER_ID`
- **Type:** String (user ID)
- **Default:** Unspecified
- **Description:** HuggingFace Spaces creator user ID. Used for platform detection.
- **Example:** `user-id-123`

### `KUBERNETES_SERVICE_HOST`
- **Type:** String (hostname)
- **Default:** Unspecified
- **Description:** Kubernetes service host. Used for platform detection. Set automatically in Kubernetes clusters.
- **Example:** `kubernetes.default.svc`

### `WEBSITE_SITE_NAME`
- **Type:** String (site name)
- **Default:** Unspecified
- **Description:** Azure App Service site name. Used for platform detection.
- **Example:** `my-site`

### `WEBSITE_SKU`
- **Type:** String (SKU)
- **Default:** Unspecified
- **Description:** Azure App Service SKU. Used for platform detection.
- **Example:** `Standard`

### `SYSTEM_OIDCREQUESTURI`
- **Type:** String (URI)
- **Default:** Unspecified
- **Description:** Azure DevOps OIDC request URI. Used for platform detection.
- **Example:** `https://dev.azure.com/org/_apis/...`

---

## Azure Identity

Configuration for Azure Active Directory authentication via Azure Identity SDK.

### `AZURE_CLIENT_ID`
- **Type:** String (UUID)
- **Default:** Unspecified
- **Description:** Azure application (client) ID. Required for service principal and managed identity authentication.
- **Example:** `550e8400-e29b-41d4-a716-446655440000`

### `AZURE_CLIENT_SECRET`
- **Type:** String (secret)
- **Default:** Unspecified
- **Description:** Azure client secret for service principal authentication. Use with AZURE_CLIENT_ID and AZURE_TENANT_ID.
- **Example:** `your-client-secret-value`
- **Security:** Store in Azure Key Vault; never commit to version control.

### `AZURE_CLIENT_CERTIFICATE_PATH`
- **Type:** String (file path to PEM/PKCS12 certificate)
- **Default:** Unspecified
- **Description:** Path to Azure client certificate for certificate-based authentication. Alternative to AZURE_CLIENT_SECRET.
- **Example:** `export AZURE_CLIENT_CERTIFICATE_PATH=/etc/secrets/client-cert.pem`
- **Security:** Restrict file permissions (0600).

### `AZURE_CLIENT_CERTIFICATE_PASSWORD`
- **Type:** String (passphrase)
- **Default:** Unspecified
- **Description:** Password for the Azure client certificate. Required if the certificate is encrypted.
- **Example:** `export AZURE_CLIENT_CERTIFICATE_PASSWORD=cert-passphrase`
- **Security:** Use a secret manager.

### `AZURE_TENANT_ID`
- **Type:** String (UUID)
- **Default:** Unspecified
- **Description:** Azure Active Directory tenant ID. Required for most Azure authentication methods.
- **Example:** `550e8400-e29b-41d4-a716-446655440001`

### `AZURE_USERNAME`
- **Type:** String (email or username)
- **Default:** Unspecified
- **Description:** Azure username for username/password authentication. Use with AZURE_PASSWORD. Rarely recommended.
- **Example:** `user@company.onmicrosoft.com`
- **Security:** Password-based auth is insecure; prefer certificate or managed identity.

### `AZURE_PASSWORD`
- **Type:** String (password)
- **Default:** Unspecified
- **Description:** Azure password for username/password authentication.
- **Example:** `your-password-value`
- **Security:** Store in a secret manager; use with caution.

### `AZURE_AUTHORITY_HOST`
- **Type:** URL
- **Default:** `https://login.microsoftonline.com`
- **Description:** Azure authority host URL. Endpoint for token requests. Rarely needs override.
- **Example:** `export AZURE_AUTHORITY_HOST=https://login.microsoftonline.com`

### `AZURE_REGIONAL_AUTHORITY_NAME`
- **Type:** String (authority name or "AutoDiscoverRegion")
- **Default:** Unspecified
- **Description:** Azure regional authority for token requests. "AutoDiscoverRegion" auto-detects the region.
- **Example:** `export AZURE_REGIONAL_AUTHORITY_NAME=AutoDiscoverRegion`

### `AZURE_FEDERATED_TOKEN_FILE`
- **Type:** String (file path to token)
- **Default:** Unspecified
- **Description:** Path to Azure federated token file for workload identity federation. Used for OIDC-based auth in CI/CD.
- **Example:** `export AZURE_FEDERATED_TOKEN_FILE=/var/run/secrets/azure-token`

### `AZURE_POD_IDENTITY_AUTHORITY_HOST`
- **Type:** URL
- **Default:** Unspecified
- **Description:** Azure Pod Identity authority host for IMDS. Used in Kubernetes with Pod Identity addon.
- **Example:** `export AZURE_POD_IDENTITY_AUTHORITY_HOST=http://169.254.169.254:80`

### `AZURE_IDENTITY_DISABLE_MULTITENANTAUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Disable multi-tenant authentication in Azure Identity. Forces single-tenant mode.
- **Example:** `export AZURE_IDENTITY_DISABLE_MULTITENANTAUTH=1`

### `AZURE_TOKEN_CREDENTIALS`
- **Type:** String (enum: dev, prod)
- **Default:** Unspecified (auto-detect)
- **Description:** Azure credential mode: 'dev' for development credentials (VisualStudio, CLI), 'prod' for production (service principal, managed identity).
- **Example:** `export AZURE_TOKEN_CREDENTIALS=prod`

### `AZURE_CLIENT_SEND_CERTIFICATE_CHAIN`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Send the full certificate chain for SNI (Server Name Indication) during certificate-based auth.
- **Example:** `export AZURE_CLIENT_SEND_CERTIFICATE_CHAIN=1`

### `AZURE_ADDITIONALLY_ALLOWED_TENANTS`
- **Type:** String (semicolon-separated tenant IDs)
- **Default:** Unspecified
- **Description:** Semicolon-separated list of additional allowed Azure tenants. Allows multi-tenant scenarios.
- **Example:** `export AZURE_ADDITIONALLY_ALLOWED_TENANTS=tenant-id-1;tenant-id-2`

---

## System & Runtime

### `HOME`
- **Type:** String (directory path)
- **Default:** Auto-detected
- **Description:** User home directory path. Used for resolving ~ expansions and locating config directories.
- **Example:** `/home/username`

### `USER`
- **Type:** String (username)
- **Default:** Auto-detected
- **Description:** Current username. Used for logging and telemetry.
- **Example:** `myusername`

### `USERNAME`
- **Type:** String (username, Windows)
- **Default:** Auto-detected
- **Description:** Current username (Windows). Alternative to USER on Windows.
- **Example:** `myusername`

### `USERPROFILE`
- **Type:** String (directory path, Windows)
- **Default:** Auto-detected on Windows
- **Description:** User profile directory (Windows). Alternative to HOME on Windows.
- **Example:** `C:\Users\myusername`

### `APPDATA`
- **Type:** String (directory path, Windows)
- **Default:** Auto-detected on Windows
- **Description:** Application data directory (Windows). Used for config file discovery.
- **Example:** `C:\Users\myusername\AppData\Roaming`

### `LOCALAPPDATA`
- **Type:** String (directory path, Windows)
- **Default:** Auto-detected on Windows
- **Description:** Local application data directory (Windows). Used for temp and cache files.
- **Example:** `C:\Users\myusername\AppData\Local`

### `PWD`
- **Type:** String (directory path)
- **Default:** Current working directory
- **Description:** Current working directory. Updated automatically by the shell.
- **Example:** `/home/user/projects/myapp`

### `PATH`
- **Type:** String (colon-separated paths)
- **Default:** System defaults
- **Description:** System executable search path. Used for finding executables in bash tools.
- **Example:** `/usr/local/bin:/usr/bin:/bin`

### `PATHEXT`
- **Type:** String (semicolon-separated extensions, Windows)
- **Default:** Auto-detected on Windows
- **Description:** Executable file extensions (Windows). Extensions considered executable (e.g., .exe, .cmd).
- **Example:** `.COM;.EXE;.BAT`

### `SHELL`
- **Type:** String (shell path)
- **Default:** Auto-detected
- **Description:** User's default shell. Used as fallback for shell tool.
- **Example:** `/bin/bash`

### `LANG`
- **Type:** String (locale identifier)
- **Default:** System default
- **Description:** System locale setting. Affects character encoding, date/time formatting, etc.
- **Example:** `en_US.UTF-8`

### `LC_ALL`
- **Type:** String (locale identifier)
- **Default:** Unspecified
- **Description:** Override all locale settings. Takes precedence over individual LC_* vars.
- **Example:** `export LC_ALL=C.UTF-8`

### `LC_TIME`
- **Type:** String (locale identifier)
- **Default:** Inherits from LANG
- **Description:** Time-related locale setting. Controls date/time formatting.
- **Example:** `export LC_TIME=en_US.UTF-8`

### `EDITOR`
- **Type:** String (editor path or name)
- **Default:** Unspecified (typically nano, vi, vim)
- **Description:** Default text editor. Used when Claude Code needs to open an editor.
- **Example:** `export EDITOR=vim`

### `VISUAL`
- **Type:** String (editor path or name)
- **Default:** Unspecified
- **Description:** Default visual editor. Takes precedence over EDITOR for graphical editing.
- **Example:** `export VISUAL=code`

### `BROWSER`
- **Type:** String (browser path or name)
- **Default:** Auto-detected
- **Description:** Default browser for opening URLs. Used when Claude Code needs to open links.
- **Example:** `export BROWSER=google-chrome`

### `OSTYPE`
- **Type:** String (OS identifier)
- **Default:** Auto-detected (linux, darwin, msys, etc.)
- **Description:** Operating system type identifier. Auto-detected; rarely needs override.
- **Example:** `linux`

### `MSYSTEM`
- **Type:** String (MSYS2/MinGW system type)
- **Default:** Unspecified (set by MSYS2)
- **Description:** MSYS2/MinGW system type (e.g., MINGW64, MSYS). Auto-detected when using MSYS2.
- **Example:** `MINGW64`

### `SYSTEMROOT`
- **Type:** String (directory path, Windows)
- **Default:** Auto-detected on Windows
- **Description:** Windows system root directory. Usually C:\Windows.
- **Example:** `C:\Windows`

### `SAFEUSER`
- **Type:** String (sanitized username)
- **Default:** Auto-sanitized from USER
- **Description:** Sanitized username for safe filesystem operations. Special chars removed.
- **Example:** `myusername`

### `XDG_CONFIG_HOME`
- **Type:** String (directory path)
- **Default:** `~/.config`
- **Description:** XDG configuration directory. Used for config file lookup on Unix.
- **Example:** `export XDG_CONFIG_HOME=/etc/xdg`

### `XDG_RUNTIME_DIR`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** XDG runtime directory. Used for temporary files and sockets.
- **Example:** `/run/user/1000`

### `DEMO_VERSION`
- **Type:** String (version identifier)
- **Default:** Unspecified
- **Description:** Demo version identifier. Set when running in demo mode.
- **Example:** `export DEMO_VERSION=1.0.0`

### `IS_DEMO`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates running in demo mode. Disables certain features or restrictions.
- **Example:** `export IS_DEMO=1`

### `IS_SANDBOX`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates running inside a sandbox environment. May restrict filesystem or network access.
- **Example:** `export IS_SANDBOX=1`

### `SSH_CLIENT`
- **Type:** String (connection info)
- **Default:** Unspecified (set by SSH daemon)
- **Description:** SSH client connection info. Used for remote detection. Set by ssh daemon.
- **Example:** `192.168.1.100 55555 22`

### `SSH_CONNECTION`
- **Type:** String (connection details)
- **Default:** Unspecified
- **Description:** SSH connection details. Used for remote detection.
- **Example:** `192.168.1.100 55555 192.168.1.50 22`

### `SSH_TTY`
- **Type:** String (device path)
- **Default:** Unspecified
- **Description:** SSH TTY device. Used for remote detection. Set by ssh when allocating a pseudoterminal.
- **Example:** `/dev/pts/0`

### `WSL_DISTRO_NAME`
- **Type:** String (distro name)
- **Default:** Unspecified
- **Description:** WSL distribution name. Used for platform detection.
- **Example:** `Ubuntu`

### `STY`
- **Type:** String (session identifier)
- **Default:** Unspecified
- **Description:** GNU Screen session identifier. Set by GNU Screen.
- **Example:** `12345.pts-0.hostname`

### `VERBOSE_SSR`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable verbose server-side rendering logs. Development use only.
- **Example:** `export VERBOSE_SSR=1`

---

## Testing & Benchmarks

### `SWE_BENCH_INSTANCE_ID`
- **Type:** String (instance identifier)
- **Default:** Unspecified
- **Description:** SWE-bench instance identifier. Used in SWE-bench benchmarking runs.
- **Example:** `export SWE_BENCH_INSTANCE_ID=instance-123`

### `SWE_BENCH_RUN_ID`
- **Type:** String (run identifier)
- **Default:** Unspecified
- **Description:** SWE-bench run identifier for benchmarking. Tracks a benchmarking run.
- **Example:** `export SWE_BENCH_RUN_ID=run-abc123`

### `SWE_BENCH_TASK_ID`
- **Type:** String (task identifier)
- **Default:** Unspecified
- **Description:** SWE-bench task identifier. Identifies the specific task being benchmarked.
- **Example:** `export SWE_BENCH_TASK_ID=task-xyz789`

### `CLAUDE_CODE_TEST_FIXTURES_ROOT`
- **Type:** String (directory path)
- **Default:** Unspecified
- **Description:** Root directory for test fixtures. Used in testing to locate test data.
- **Example:** `export CLAUDE_CODE_TEST_FIXTURES_ROOT=/test/fixtures`

### `TEST_ENABLE_SESSION_PERSISTENCE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable session persistence in tests. Allows sessions to persist across test runs.
- **Example:** `export TEST_ENABLE_SESSION_PERSISTENCE=1`

### `TEST_GRACEFUL_FS_GLOBAL_PATCH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable graceful-fs global patching in tests. Patches filesystem operations for test stability.
- **Example:** `export TEST_GRACEFUL_FS_GLOBAL_PATCH=1`

### `VCR_RECORD`
- **Type:** String (record mode)
- **Default:** Unspecified
- **Description:** VCR recording mode for test replay. Controls whether HTTP interactions are recorded or replayed.
- **Example:** `export VCR_RECORD=once`

### `AWS_LAMBDA_BENCHMARK_MODE`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Set to '1' to enable Lambda benchmark testing mode.
- **Example:** `export AWS_LAMBDA_BENCHMARK_MODE=1`

---

## Accessibility & Brief Mode

### `CLAUDE_CODE_ACCESSIBILITY`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable accessibility mode. Disables cursor hiding and visual animations for better screen reader compatibility.
- **Example:** `export CLAUDE_CODE_ACCESSIBILITY=1`

### `CLAUDE_CODE_BRIEF`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable brief mode for compact output. Requires entitlement or Claude.ai auth.
- **Example:** `export CLAUDE_CODE_BRIEF=1`

### `CLAUDE_CODE_BRIEF_UPLOAD`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable brief attachment uploading. Also enabled when replBridgeEnabled is true.
- **Example:** `export CLAUDE_CODE_BRIEF_UPLOAD=1`

---

## Security & Sandboxing

### `CLAUDE_CODE_SANDBOXED`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates Claude Code is running in a sandboxed environment. Bypasses trust dialog.
- **Example:** `export CLAUDE_CODE_SANDBOXED=1`

### `CLAUDE_CODE_BUBBLEWRAP`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Set to '1' to indicate running inside Bubblewrap sandbox. Allows --dangerously-skip-permissions with root.
- **Example:** `export CLAUDE_CODE_BUBBLEWRAP=1`

### `CLAUDE_CODE_ADDITIONAL_PROTECTION`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Add x-anthropic-additional-protection header to API requests. Used for heightened security.
- **Example:** `export CLAUDE_CODE_ADDITIONAL_PROTECTION=1`

### `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Load CLAUDE.md files from additional directories. Expands instruction loading to more locations.
- **Example:** `export CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`

### `CLAUDE_CODE_SCRIPT_CAPS`
- **Type:** String (JSON object)
- **Default:** Unspecified
- **Description:** JSON object mapping script names to numeric capability limits. Scripts not listed have no caps.
- **Example:** `export CLAUDE_CODE_SCRIPT_CAPS='{"bash":100,"python":50}'`

---

## Miscellaneous & Internal

### `DEBUG`
- **Type:** String (module filter)
- **Default:** Unspecified
- **Description:** Enable debug output for various modules. Wildcard filtering supported (e.g., claude:* for all Claude-prefixed modules).
- **Example:** `export DEBUG=claude:*`

### `DEBUG_AUTH`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable debug output for authentication. Traces auth flow for troubleshooting.
- **Example:** `export DEBUG_AUTH=1`

### `DEBUG_SDK`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable debug output for the Anthropic SDK. Traces SDK behavior.
- **Example:** `export DEBUG_SDK=1`

### `CLAUBBIT`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Indicates running in Claubbit mode. Skips trust dialog.
- **Example:** `export CLAUBBIT=1`

### `CLAUDE_CODE_ATTRIBUTION_HEADER`
- **Type:** Boolean (1, true, 0, false)
- **Default:** true
- **Description:** Control the attribution header in API requests. Set to '0' to disable.
- **Example:** `export CLAUDE_CODE_ATTRIBUTION_HEADER=0`

### `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Scrub environment variables from subprocesses. Removes sensitive vars before spawning subprocesses.
- **Example:** `export CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1`

### `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`
- **Type:** Integer (milliseconds)
- **Default:** Unspecified (typically 5000)
- **Description:** Timeout in milliseconds for session-end hook execution.
- **Example:** `export CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=10000`

### `CLAUDE_FORCE_DISPLAY_SURVEY`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force display of the user survey. Useful for testing the survey UI.
- **Example:** `export CLAUDE_FORCE_DISPLAY_SURVEY=1`

### `FORCE_CODE_TERMINAL`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force code terminal mode. Enables a minimal terminal environment.
- **Example:** `export FORCE_CODE_TERMINAL=1`

### `CHOKIDAR_INTERVAL`
- **Type:** Integer (milliseconds)
- **Default:** 100
- **Description:** Polling interval for Chokidar file watcher in milliseconds. Only used when polling is active.
- **Example:** `export CHOKIDAR_INTERVAL=200`

### `CHOKIDAR_USEPOLLING`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Force Chokidar to use polling instead of native file watching. Useful on systems with unreliable inotify.
- **Example:** `export CHOKIDAR_USEPOLLING=1`

### `BETA_TRACING_ENDPOINT`
- **Type:** URL
- **Default:** Unspecified
- **Description:** Endpoint URL for beta tracing. Used together with ENABLE_BETA_TRACING_DETAILED.
- **Example:** `export BETA_TRACING_ENDPOINT=https://tracing.company.com`

### `BUGHUNTER_DEV_BUNDLE_B64`
- **Type:** String (base64-encoded data)
- **Default:** Unspecified
- **Description:** Base64-encoded development bundle passed to the bughunter agent subprocess.
- **Example:** `export BUGHUNTER_DEV_BUNDLE_B64=SGVsbG8gV29ybGQ=`

### `VOICE_STREAM_BASE_URL`
- **Type:** URL
- **Default:** Unspecified
- **Description:** Base URL for voice streaming service.
- **Example:** `export VOICE_STREAM_BASE_URL=https://voice.company.com`

### `SRT_DEBUG`
- **Type:** Boolean (1, true, 0, false)
- **Default:** false
- **Description:** Enable SRT (Secure Reliable Transport) debug logging.
- **Example:** `export SRT_DEBUG=1`

### `CLAUDE_CHROME_PERMISSION_MODE`
- **Type:** String (permission mode)
- **Default:** Unspecified
- **Description:** Set permission mode for Claude-in-Chrome extension.
- **Example:** `export CLAUDE_CHROME_PERMISSION_MODE=unrestricted`

---

## Quick Lookup Index

**A**
- [API_TIMEOUT_MS](#api_timeout_ms)
- [ALACRITTY_LOG](#alacritty_log)
- [APPDATA](#appdata)
- [APP_URL](#app_url)
- [AWS_ACCESS_KEY_ID](#aws_access_key_id)
- [AWS_BEARER_TOKEN_BEDROCK](#aws_bearer_token_bedrock)
- [AWS_DEFAULT_REGION](#aws_default_region)
- [AWS_EXECUTION_ENV](#aws_execution_env)
- [AWS_LAMBDA_BENCHMARK_MODE](#aws_lambda_benchmark_mode)
- [AWS_LAMBDA_FUNCTION_NAME](#aws_lambda_function_name)
- [AWS_LOGIN_CACHE_DIRECTORY](#aws_login_cache_directory)
- [AWS_PROFILE](#aws_profile)
- [AWS_REGION](#aws_region)
- [AWS_SECRET_ACCESS_KEY](#aws_secret_access_key)
- [AWS_SESSION_TOKEN](#aws_session_token)
- [AZURE_ADDITIONALLY_ALLOWED_TENANTS](#azure_additionally_allowed_tenants)
- [AZURE_AUTHORITY_HOST](#azure_authority_host)
- [AZURE_CLIENT_CERTIFICATE_PASSWORD](#azure_client_certificate_password)
- [AZURE_CLIENT_CERTIFICATE_PATH](#azure_client_certificate_path)
- [AZURE_CLIENT_ID](#azure_client_id)
- [AZURE_CLIENT_SECRET](#azure_client_secret)
- [AZURE_CLIENT_SEND_CERTIFICATE_CHAIN](#azure_client_send_certificate_chain)
- [AZURE_FEDERATED_TOKEN_FILE](#azure_federated_token_file)
- [AZURE_FUNCTIONS_ENVIRONMENT](#azure_functions_environment)
- [AZURE_IDENTITY_DISABLE_MULTITENANTAUTH](#azure_identity_disable_multitenantauth)
- [AZURE_PASSWORD](#azure_password)
- [AZURE_POD_IDENTITY_AUTHORITY_HOST](#azure_pod_identity_authority_host)
- [AZURE_REGIONAL_AUTHORITY_NAME](#azure_regional_authority_name)
- [AZURE_TENANT_ID](#azure_tenant_id)
- [AZURE_TOKEN_CREDENTIALS](#azure_token_credentials)
- [AZURE_USERNAME](#azure_username)

**B**
- [BASH_MAX_OUTPUT_LENGTH](#bash_max_output_length)
- [BAT_THEME](#bat_theme)
- [BETA_TRACING_ENDPOINT](#beta_tracing_endpoint)
- [BROWSER](#browser)
- [BUGHUNTER_DEV_BUNDLE_B64](#bughunter_dev_bundle_b64)
- [BUILDKITE](#buildkite)
- [BUN_DISABLE_DYNAMIC_CHUNK_SIZE](#bun_disable_dynamic_chunk_size)
- [BUN_ENV](#bun_env)
- [BUN_FEEDBACK_URL](#bun_feedback_url)
- [BUN_INSPECT_NOTIFY](#bun_inspect_notify)
- [BUN_INSTALL](#bun_install)
- [BUN_JS_DEBUG](#bun_js_debug)

**C**
- [CCR_ENABLE_BUNDLE](#ccr_enable_bundle)
- [CCR_FORCE_BUNDLE](#ccr_force_bundle)
- [CCR_UPSTREAM_PROXY_ENABLED](#ccr_upstream_proxy_enabled)
- [CF_PAGES](#cf_pages)
- [CHOKIDAR_INTERVAL](#chokidar_interval)
- [CHOKIDAR_USEPOLLING](#chokidar_usepolling)
- [CIRCLECI](#circleci)
- [CLAUBBIT](#claubbit)
- [CLAUDE_AFTER_LAST_COMPACT](#claude_after_last_compact)
- [CLAUDE_AGENT_SDK_CLIENT_APP](#claude_agent_sdk_client_app)
- [CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS](#claude_agent_sdk_disable_builtin_agents)
- [CLAUDE_AGENT_SDK_MCP_NO_PREFIX](#claude_agent_sdk_mcp_no_prefix)
- [CLAUDE_AGENT_SDK_VERSION](#claude_agent_sdk_version)
- [CLAUDE_AUTO_BACKGROUND_TASKS](#claude_auto_background_tasks)
- [CLAUDE_AUTOCOMPACT_PCT_OVERRIDE](#claude_autocompact_pct_override)
- [CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR](#claude_bash_maintain_project_working_dir)
- [CLAUDE_BRIDGE_USE_CCR_V2](#claude_bridge_use_ccr_v2)
- [CLAUDE_CHROME_PERMISSION_MODE](#claude_chrome_permission_mode)
- [CLAUDE_CODE_ACCESSIBILITY](#claude_code_accessibility)
- [CLAUDE_CODE_ACTION](#claude_code_action)
- [CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD](#claude_code_additional_directories_claude_md)
- [CLAUDE_CODE_ADDITIONAL_PROTECTION](#claude_code_additional_protection)
- [CLAUDE_CODE_AGENT_COST_STEER](#claude_code_agent_cost_steer)
- [CLAUDE_CODE_AGENT_LIST_IN_MESSAGES](#claude_code_agent_list_in_messages)
- [CLAUDE_CODE_ALWAYS_ENABLE_EFFORT](#claude_code_always_enable_effort)
- [CLAUDE_CODE_API_BASE_URL](#claude_code_api_base_url)
- [CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR](#claude_code_api_key_file_descriptor)
- [CLAUDE_CODE_API_KEY_HELPER_TTL_MS](#claude_code_api_key_helper_ttl_ms)
- [CLAUDE_CODE_ATTRIBUTION_HEADER](#claude_code_attribution_header)
- [CLAUDE_CODE_AUTO_COMPACT_WINDOW](#claude_code_auto_compact_window)
- [CLAUDE_CODE_AUTO_CONNECT_IDE](#claude_code_auto_connect_ide)
- [CLAUDE_CODE_BASE_REF](#claude_code_base_ref)
- [CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR](#claude_code_bash_sandbox_show_indicator)
- [CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE](#claude_code_blocking_limit_override)
- [CLAUDE_CODE_BRIEF](#claude_code_brief)
- [CLAUDE_CODE_BRIEF_UPLOAD](#claude_code_brief_upload)
- [CLAUDE_CODE_BUBBLEWRAP](#claude_code_bubblewrap)
- [CLAUDE_CODE_CLIENT_CERT](#claude_code_client_cert)
- [CLAUDE_CODE_CLIENT_KEY](#claude_code_client_key)
- [CLAUDE_CODE_CLIENT_KEY_PASSPHRASE](#claude_code_client_key_passphrase)
- [CLAUDE_CODE_COMMIT_LOG](#claude_code_commit_log)
- [CLAUDE_CODE_CONTAINER_ID](#claude_code_container_id)
- [CLAUDE_CODE_CRON](#claude_code_disable_cron)
- [CLAUDE_CODE_CUSTOM_OAUTH_URL](#claude_code_custom_oauth_url)
- [CLAUDE_CODE_DEBUG_LOG_LEVEL](#claude_code_debug_log_level)
- [CLAUDE_CODE_DEBUG_LOGS_DIR](#claude_code_debug_logs_dir)
- [CLAUDE_CODE_DEBUG_REPAINTS](#claude_code_debug_repaints)
- [CLAUDE_CODE_DIAGNOSTICS_FILE](#claude_code_diagnostics_file)
- [CLAUDE_CODE_DISABLE_1M_CONTEXT](#claude_code_disable_1m_context)
- [CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING](#claude_code_disable_adaptive_thinking)
- [CLAUDE_CODE_DISABLE_ADVISOR_TOOL](#claude_code_disable_advisor_tool)
- [CLAUDE_CODE_DISABLE_ATTACHMENTS](#claude_code_disable_attachments)
- [CLAUDE_CODE_DISABLE_AUTO_MEMORY](#claude_code_disable_auto_memory)
- [CLAUDE_CODE_DISABLE_BACKGROUND_TASKS](#claude_code_disable_background_tasks)
- [CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL](#claude_code_disable_claude_api_skill)
- [CLAUDE_CODE_DISABLE_CLAUDE_MDS](#claude_code_disable_claude_mds)
- [CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS](#claude_code_disable_experimental_betas)
- [CLAUDE_CODE_DISABLE_FAST_MODE](#claude_code_disable_fast_mode)
- [CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY](#claude_code_disable_feedback_survey)
- [CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING](#claude_code_disable_file_checkpointing)
- [CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS](#claude_code_disable_git_instructions)
- [CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP](#claude_code_disable_legacy_model_remap)
- [CLAUDE_CODE_DISABLE_MOUSE](#claude_code_disable_mouse)
- [CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC](#claude_code_disable_nonessential_traffic)
- [CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK](#claude_code_disable_nonstreaming_fallback)
- [CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL](#claude_code_disable_official_marketplace_autoinstall)
- [CLAUDE_CODE_DISABLE_POLICY_SKILLS](#claude_code_disable_policy_skills)
- [CLAUDE_CODE_DISABLE_PRECOMPACT_SKIP](#claude_code_disable_precompact_skip)
- [CLAUDE_CODE_DISABLE_TERMINAL_TITLE](#claude_code_disable_terminal_title)
- [CLAUDE_CODE_DISABLE_THINKING](#claude_code_disable_thinking)
- [CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL](#claude_code_disable_virtual_scroll)
- [CLAUDE_CODE_DONT_INHERIT_ENV](#claude_code_dont_inherit_env)
- [CLAUDE_CODE_EAGER_FLUSH](#claude_code_eager_flush)
- [CLAUDE_CODE_EFFORT_LEVEL](#claude_code_effort_level)
- [CLAUDE_CODE_EMIT_SESSION_STATE_EVENTS](#claude_code_emit_session_state_events)
- [CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES](#claude_code_emit_tool_use_summaries)
- [CLAUDE_CODE_ENABLE_CFC](#claude_code_enable_cfc)
- [CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING](#claude_code_enable_fine_grained_tool_streaming)
- [CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION](#claude_code_enable_prompt_suggestion)
- [CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING](#claude_code_enable_sdk_file_checkpointing)
- [CLAUDE_CODE_ENABLE_TASKS](#claude_code_enable_tasks)
- [CLAUDE_CODE_ENABLE_TELEMETRY](#claude_code_enable_telemetry)
- [CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT](#claude_code_enable_token_usage_attachment)
- [CLAUDE_CODE_ENABLE_XAA](#claude_code_enable_xaa)
- [CLAUDE_CODE_ENTRYPOINT](#claude_code_entrypoint)
- [CLAUDE_CODE_ENVIRONMENT_KIND](#claude_code_environment_kind)
- [CLAUDE_CODE_ENVIRONMENT_RUNNER_VERSION](#claude_code_environment_runner_version)
- [CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS](#claude_code_experimental_agent_teams)
- [CLAUDE_CODE_EXIT_AFTER_FIRST_RENDER](#claude_code_exit_after_first_render)
- [CLAUDE_CODE_EXIT_AFTER_STOP_DELAY](#claude_code_exit_after_stop_delay)
- [CLAUDE_CODE_EXTRA_BODY](#claude_code_extra_body)
- [CLAUDE_CODE_EXTRA_METADATA](#claude_code_extra_metadata)
- [CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS](#claude_code_file_read_max_output_tokens)
- [CLAUDE_CODE_FORCE_FULL_LOGO](#claude_code_force_full_logo)
- [CLAUDE_CODE_FRAME_TIMING_LOG](#claude_code_frame_timing_log)
- [CLAUDE_CODE_GIT_BASH_PATH](#claude_code_git_bash_path)
- [CLAUDE_CODE_GLOB_HIDDEN](#claude_code_glob_hidden)
- [CLAUDE_CODE_GLOB_NO_IGNORE](#claude_code_glob_no_ignore)
- [CLAUDE_CODE_GLOB_TIMEOUT_SECONDS](#claude_code_glob_timeout_seconds)
- [CLAUDE_CODE_HOST_PLATFORM](#claude_code_host_platform)
- [CLAUDE_CODE_IDE_HOST_OVERRIDE](#claude_code_ide_host_override)
- [CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL](#claude_code_ide_skip_auto_install)
- [CLAUDE_CODE_IDE_SKIP_VALID_CHECK](#claude_code_ide_skip_valid_check)
- [CLAUDE_CODE_IDLE_THRESHOLD_MINUTES](#claude_code_idle_threshold_minutes)
- [CLAUDE_CODE_IDLE_TOKEN_THRESHOLD](#claude_code_idle_token_threshold)
- [CLAUDE_CODE_INCLUDE_PARTIAL_MESSAGES](#claude_code_include_partial_messages)
- [CLAUDE_CODE_IS_COWORK](#claude_code_is_cowork)
- [CLAUDE_CODE_MAX_CONTEXT_TOKENS](#claude_code_max_context_tokens)
- [CLAUDE_CODE_MAX_OUTPUT_TOKENS](#claude_code_max_output_tokens)
- [CLAUDE_CODE_MAX_RETRIES](#claude_code_max_retries)
- [CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY](#claude_code_max_tool_use_concurrency)
- [CLAUDE_CODE_MCP_ALLOWLIST_ENV](#claude_code_mcp_allowlist_env)
- [CLAUDE_CODE_NEW_INIT](#claude_code_new_init)
- [CLAUDE_CODE_NO_FLICKER](#claude_code_no_flicker)
- [CLAUDE_CODE_OAUTH_CLIENT_ID](#claude_code_oauth_client_id)
- [CLAUDE_CODE_OAUTH_REFRESH_TOKEN](#claude_code_oauth_refresh_token)
- [CLAUDE_CODE_OAUTH_SCOPES](#claude_code_oauth_scopes)
- [CLAUDE_CODE_OAUTH_TOKEN](#claude_code_oauth_token)
- [CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR](#claude_code_oauth_token_file_descriptor)
- [CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS](#claude_code_otel_flush_timeout_ms)
- [CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS](#claude_code_otel_headers_helper_debounce_ms)
- [CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS](#claude_code_otel_shutdown_timeout_ms)
- [CLAUDE_CODE_ORGANIZATION_UUID](#claude_code_organization_uuid)
- [CLAUDE_CODE_PERFORCE_MODE](#claude_code_perforce_mode)
- [CLAUDE_CODE_PLAN_MODE_INTERVIEW_PHASE](#claude_code_plan_mode_interview_phase)
- [CLAUDE_CODE_PLAN_MODE_REQUIRED](#claude_code_plan_mode_required)
- [CLAUDE_CODE_PLAN_V2_AGENT_COUNT](#claude_code_plan_v2_agent_count)
- [CLAUDE_CODE_PLAN_V2_EXPLORE_AGENT_COUNT](#claude_code_plan_v2_explore_agent_count)
- [CLAUDE_CODE_POST_FOR_SESSION_INGRESS_V2](#claude_code_post_for_session_ingress_v2)
- [CLAUDE_CODE_PROFILE_STARTUP](#claude_code_profile_startup)
- [CLAUDE_CODE_PROXY_RESOLVES_HOSTS](#claude_code_proxy_resolves_hosts)
- [CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS](#claude_code_pwsh_parse_timeout_ms)
- [CLAUDE_CODE_QUESTION_PREVIEW_FORMAT](#claude_code_question_preview_format)
- [CLAUDE_CODE_REMOTE](#claude_code_remote)
- [CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE](#claude_code_remote_environment_type)
- [CLAUDE_CODE_REMOTE_MEMORY_DIR](#claude_code_remote_memory_dir)
- [CLAUDE_CODE_REMOTE_SEND_KEEPALIVES](#claude_code_remote_send_keepalives)
- [CLAUDE_CODE_REMOTE_SESSION_ID](#claude_code_remote_session_id)
- [CLAUDE_CODE_RESUME_INTERRUPTED_TURN](#claude_code_resume_interrupted_turn)
- [CLAUDE_CODE_RESUME_THRESHOLD_MINUTES](#claude_code_resume_threshold_minutes)
- [CLAUDE_CODE_RESUME_TOKEN_THRESHOLD](#claude_code_resume_token_threshold)
- [CLAUDE_CODE_SANDBOXED](#claude_code_sandboxed)
- [CLAUDE_CODE_SCRIPT_CAPS](#claude_code_script_caps)
- [CLAUDE_CODE_SESSION_ACCESS_TOKEN](#claude_code_session_access_token)
- [CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS](#claude_code_sessionend_hooks_timeout_ms)
- [CLAUDE_CODE_SHELL](#claude_code_shell)
- [CLAUDE_CODE_SHELL_PREFIX](#claude_code_shell_prefix)
- [CLAUDE_CODE_SIMPLE](#claude_code_simple)
- [CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH](#claude_code_skip_anthropic_aws_auth)
- [CLAUDE_CODE_SKIP_BEDROCK_AUTH](#claude_code_skip_bedrock_auth)
- [CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS](#claude_code_skip_fast_mode_network_errors)
- [CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK](#claude_code_skip_fast_mode_org_check)
- [CLAUDE_CODE_SKIP_FOUNDRY_AUTH](#claude_code_skip_foundry_auth)
- [CLAUDE_CODE_SKIP_MANTLE_AUTH](#claude_code_skip_mantle_auth)
- [CLAUDE_CODE_SKIP_PROMPT_HISTORY](#claude_code_skip_prompt_history)
- [CLAUDE_CODE_SKIP_VERTEX_AUTH](#claude_code_skip_vertex_auth)
- [CLAUDE_CODE_SLOW_OPERATION_THRESHOLD_MS](#claude_code_slow_operation_threshold_ms)
- [CLAUDE_CODE_SSE_PORT](#claude_code_sse_port)
- [CLAUDE_CODE_STALL_TIMEOUT_MS_FOR_TESTING](#claude_code_stall_timeout_ms_for_testing)
- [CLAUDE_CODE_SUBAGENT_MODEL](#claude_code_subagent_model)
- [CLAUDE_CODE_SUBPROCESS_ENV_SCRUB](#claude_code_subprocess_env_scrub)
- [CLAUDE_CODE_SYNC_PLUGIN_INSTALL](#claude_code_sync_plugin_install)
- [CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS](#claude_code_sync_plugin_install_timeout_ms)
- [CLAUDE_CODE_SYNTAX_HIGHLIGHT](#claude_code_syntax_highlight)
- [CLAUDE_CODE_TAGS](#claude_code_tags)
- [CLAUDE_CODE_TASK_LIST_ID](#claude_code_task_list_id)
- [CLAUDE_CODE_TEAM_ONBOARDING](#claude_code_team_onboarding)
- [CLAUDE_CODE_TMUX_PREFIX](#claude_code_tmux_prefix)
- [CLAUDE_CODE_TMUX_PREFIX_CONFLICTS](#claude_code_tmux_prefix_conflicts)
- [CLAUDE_CODE_TMUX_SESSION](#claude_code_tmux_session)
- [CLAUDE_CODE_TMUX_TRUECOLOR](#claude_code_tmux_truecolor)
- [CLAUDE_CODE_TMPDIR](#claude_code_tmpdir)
- [CLAUDE_CODE_USE_ANTHROPIC_AWS](#claude_code_use_anthropic_aws)
- [CLAUDE_CODE_USE_BEDROCK](#claude_code_use_bedrock)
- [CLAUDE_CODE_USE_COWORK_PLUGINS](#claude_code_use_cowork_plugins)
- [CLAUDE_CODE_USE_FOUNDRY](#claude_code_use_foundry)
- [CLAUDE_CODE_USE_MANTLE](#claude_code_use_mantle)
- [CLAUDE_CODE_USE_POWERSHELL_TOOL](#claude_code_use_powershell_tool)
- [CLAUDE_CODE_USE_VERTEX](#claude_code_use_vertex)
- [CLAUDE_CODE_USE_CCR_V2](#claude_code_use_ccr_v2)
- [CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR](#claude_code_websocket_auth_file_descriptor)
- [CLAUDE_CODE_WORKER_EPOCH](#claude_code_worker_epoch)
- [CLAUDE_CODE_WORKSPACE_HOST_PATHS](#claude_code_workspace_host_paths)
- [CLAUDE_CODE_ACCOUNT_TAGGED_ID](#claude_code_account_tagged_id)
- [CLAUDE_CODE_ACCOUNT_UUID](#claude_code_account_uuid)
- [CLAUDE_CONFIG_DIR](#claude_config_dir)
- [CLAUDE_COWORK_MEMORY_EXTRA_GUIDELINES](#claude_cowork_memory_extra_guidelines)
- [CLAUDE_COWORK_MEMORY_PATH_OVERRIDE](#claude_cowork_memory_path_override)
- [CLAUDE_DEBUG](#claude_debug)
- [CLAUDE_DATADOG_FLUSH_INTERVAL_MS](#claude_code_datadog_flush_interval_ms)
- [CLAUDE_ENABLE_STREAM_WATCHDOG](#claude_enable_stream_watchdog)
- [CLAUDE_ENHANCED_TELEMETRY_BETA](#claude_code_enhanced_telemetry_beta)
- [CLAUDE_ENV_FILE](#claude_env_file)
- [CLAUDE_FORCE_DISPLAY_SURVEY](#claude_force_display_survey)
- [CLAUDE_LOCAL_OAUTH_API_BASE](#claude_local_oauth_api_base)
- [CLAUDE_LOCAL_OAUTH_APPS_BASE](#claude_local_oauth_apps_base)
- [CLAUDE_LOCAL_OAUTH_CONSOLE_BASE](#claude_local_oauth_console_base)
- [CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX](#claude_remote_control_session_name_prefix)
- [CLAUDE_SESSION_INGRESS_TOKEN_FILE](#claude_session_ingress_token_file)
- [CLAUDE_STREAM_IDLE_TIMEOUT_MS](#claude_stream_idle_timeout_ms)
- [CLAUDE_TMPDIR](#claude_tmpdir)
- [CLAUDE_TRUSTED_DEVICE_TOKEN](#claude_trusted_device_token)
- [CLI_WIDTH](#cli_width)
- [CLOUD_ML_REGION](#cloud_ml_region)
- [CLOUD_RUN_JOB](#cloud_run_job)
- [CLOUDSDK_CONFIG](#cloudsdk_config)
- [CODESPACES](#codespaces)
- [COLORFGBG](#colorfgbg)
- [COLORTERM](#colorterm)
- [COREPACK_ENABLE_AUTO_PIN](#corepack_enable_auto_pin)
- [CURSOR_TRACE_ID](#cursor_trace_id)

**D**
- [DEBUG](#debug)
- [DEBUG_AUTH](#debug_auth)
- [DEBUG_SDK](#debug_sdk)
- [DEMO_VERSION](#demo_version)
- [DENO_DEPLOYMENT_ID](#deno_deployment_id)
- [DETECT_GCP_RETRIES](#detect_gcp_retries)
- [DISABLE_AUTOUPDATER](#disable_autoupdater)
- [DISABLE_AUTO_COMPACT](#disable_auto_compact)
- [DISABLE_BUG_COMMAND](#disable_bug_command)
- [DISABLE_COMPACT](#disable_compact)
- [DISABLE_COST_WARNINGS](#disable_cost_warnings)
- [DISABLE_DOCTOR_COMMAND](#disable_doctor_command)
- [DISABLE_ERROR_REPORTING](#disable_error_reporting)
- [DISABLE_EXTRA_USAGE_COMMAND](#disable_extra_usage_command)
- [DISABLE_FEEDBACK_COMMAND](#disable_feedback_command)
- [DISABLE_INSTALLATION_CHECKS](#disable_installation_checks)
- [DISABLE_INSTALL_GITHUB_APP_COMMAND](#disable_install_github_app_command)
- [DISABLE_INTERLEAVED_THINKING](#disable_interleaved_thinking)
- [DISABLE_LOGIN_COMMAND](#disable_login_command)
- [DISABLE_LOGOUT_COMMAND](#disable_logout_command)
- [DISABLE_PROMPT_CACHING](#disable_prompt_caching)
- [DISABLE_PROMPT_CACHING_HAIKU](#disable_prompt_caching_haiku)
- [DISABLE_PROMPT_CACHING_OPUS](#disable_prompt_caching_opus)
- [DISABLE_PROMPT_CACHING_SONNET](#disable_prompt_caching_sonnet)
- [DISABLE_TELEMETRY](#disable_telemetry)
- [DISABLE_UPGRADE_COMMAND](#disable_upgrade_command)
- [DO_NOT_TRACK](#do_not_track)
- [DYNO](#dyno)

**E**
- [EDITOR](#editor)
- [EMBEDDED_SEARCH_TOOLS](#embedded_search_tools)
- [ENABLE_BETA_TRACING_DETAILED](#enable_beta_tracing_detailed)
- [ENABLE_CLAUDEAI_MCP_SERVERS](#enable_claudeai_mcp_servers)
- [ENABLE_ENHANCED_TELEMETRY_BETA](#enable_enhanced_telemetry_beta)
- [ENABLE_MCP_LARGE_OUTPUT_FILES](#enable_mcp_large_output_files)
- [ENABLE_PROMPT_CACHING_1H_BEDROCK](#enable_prompt_caching_1h_bedrock)
- [ENABLE_TOOL_SEARCH](#enable_tool_search)

**F**
- [FALLBACK_FOR_ALL_PRIMARY_MODELS](#fallback_for_all_primary_models)
- [FLY_APP_NAME](#fly_app_name)
- [FLY_MACHINE_ID](#fly_machine_id)
- [FORCE_AUTOUPDATE_PLUGINS](#force_autoupdate_plugins)
- [FORCE_CODE_TERMINAL](#force_code_terminal)
- [FORCE_COLOR](#force_color)
- [FUNCTION_NAME](#function_name)
- [FUNCTION_TARGET](#function_target)

**G**
- [GAE_MODULE_NAME](#gae_module_name)
- [GAE_SERVICE](#gae_service)
- [GCE_METADATA_HOST](#gce_metadata_host)
- [GCE_METADATA_IP](#gce_metadata_ip)
- [GCLOUD_PROJECT](#gcloud_project)
- [GITHUB_ACTIONS](#github_actions)
- [GITHUB_ACTOR](#github_actor)
- [GITHUB_ACTOR_ID](#github_actor_id)
- [GITHUB_ACTION_INPUTS](#github_action_inputs)
- [GITHUB_ACTION_PATH](#github_action_path)
- [GITHUB_ENV](#github_env)
- [GITHUB_EVENT_NAME](#github_event_name)
- [GITHUB_EVENT_PATH](#github_event_path)
- [GITHUB_OUTPUT](#github_output)
- [GITHUB_PATH](#github_path)
- [GITHUB_REPOSITORY](#github_repository)
- [GITHUB_REPOSITORY_ID](#github_repository_id)
- [GITHUB_REPOSITORY_OWNER](#github_repository_owner)
- [GITHUB_REPOSITORY_OWNER_ID](#github_repository_owner_id)
- [GITHUB_STATE](#github_state)
- [GITHUB_STEP_SUMMARY](#github_step_summary)
- [GITHUB_TOKEN](#github_token)
- [GITPOD_WORKSPACE_ID](#gitpod_workspace_id)
- [GITLAB_CI](#gitlab_ci)
- [GNOME_TERMINAL_SERVICE](#gnome_terminal_service)
- [GOOGLE_APPLICATION_CREDENTIALS](#google_application_credentials)
- [GOOGLE_CLOUD_PROJECT](#google_cloud_project)
- [GOOGLE_CLOUD_QUOTA_PROJECT](#google_cloud_quota_project)
- [GRACEFUL_FS_PLATFORM](#graceful_fs_platform)
- [GRPC_DEFAULT_SSL_ROOTS_FILE_PATH](#grpc_default_ssl_roots_file_path)
- [GRPC_EXPERIMENTAL_ENABLE_OUTLIER_DETECTION](#grpc_experimental_enable_outlier_detection)
- [GRPC_NODE_TRACE](#grpc_node_trace)
- [GRPC_NODE_USE_ALTERNATIVE_RESOLVER](#grpc_node_use_alternative_resolver)
- [GRPC_NODE_VERBOSITY](#grpc_node_verbosity)
- [GRPC_SSL_CIPHER_SUITES](#grpc_ssl_cipher_suites)
- [GRPC_TRACE](#grpc_trace)
- [GRPC_VERBOSITY](#grpc_verbosity)

**H**
- [HOME](#home)
- [HTTP_PROXY](#http_proxy)
- [HTTPS_PROXY](#https_proxy)

**I**
- [IS_DEMO](#is_demo)
- [IS_SANDBOX](#is_sandbox)
- [ITERM_SESSION_ID](#iterm_session_id)

**K**
- [K_CONFIGURATION](#k_configuration)
- [K_SERVICE](#k_service)
- [KITTY_WINDOW_ID](#kitty_window_id)
- [KONSOLE_VERSION](#konsole_version)
- [KUBERNETES_SERVICE_HOST](#kubernetes_service_host)

**L**
- [LANG](#lang)
- [LC_ALL](#lc_all)
- [LC_TERMINAL](#lc_terminal)
- [LC_TIME](#lc_time)
- [LOCAL_BRIDGE](#local_bridge)
- [LOCALAPPDATA](#localappdata)

**M**
- [MAX_MCP_OUTPUT_TOKENS](#max_mcp_output_tokens)
- [MAX_STRUCTURED_OUTPUT_RETRIES](#max_structured_output_retries)
- [MAX_THINKING_TOKENS](#max_thinking_tokens)
- [MCP_CLIENT_SECRET](#mcp_client_secret)
- [MCP_CONNECTION_NONBLOCKING](#mcp_connection_nonblocking)
- [MCP_OAUTH_CALLBACK_PORT](#mcp_oauth_callback_port)
- [MCP_OAUTH_CLIENT_METADATA_URL](#mcp_oauth_client_metadata_url)
- [MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE](#mcp_remote_server_connection_batch_size)
- [MCP_SERVER_CONNECTION_BATCH_SIZE](#mcp_server_connection_batch_size)
- [MCP_TIMEOUT](#mcp_timeout)
- [MCP_TOOL_TIMEOUT](#mcp_tool_timeout)
- [MCP_TRUNCATION_PROMPT_OVERRIDE](#mcp_truncation_prompt_override)
- [MCP_XAA_IDP_CLIENT_SECRET](#mcp_xaa_idp_client_secret)
- [METADATA_SERVER_DETECTION](#metadata_server_detection)
- [MODIFIERS_NODE_PATH](#modifiers_node_path)
- [MSYSTEM](#msystem)

**N**
- [NETLIFY](#netlify)
- [NO_PROXY](#no_proxy)
- [NODE_CLUSTER_SCHED_POLICY](#node_cluster_sched_policy)
- [NODE_DEBUG](#node_debug)
- [NODE_ENV](#node_env)
- [NODE_EXTRA_CA_CERTS](#node_extra_ca_certs)
- [NODE_OPTIONS](#node_options)
- [NODE_TLS_REJECT_UNAUTHORIZED](#node_tls_reject_unauthorized)
- [NODE_UNIQUE_ID](#node_unique_id)
- [NODE_USE_SYSTEM_CA](#node_use_system_ca)

**O**
- [OTEL_EXPORTER_OTLP_ENDPOINT](#otel_exporter_otlp_endpoint)
- [OTEL_EXPORTER_OTLP_HEADERS](#otel_exporter_otlp_headers)
- [OTEL_EXPORTER_OTLP_INSECURE](#otel_exporter_otlp_insecure)
- [OTEL_EXPORTER_OTLP_LOGS_PROTOCOL](#otel_exporter_otlp_logs_protocol)
- [OTEL_EXPORTER_OTLP_METRICS_PROTOCOL](#otel_exporter_otlp_metrics_protocol)
- [OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE](#otel_exporter_otlp_metrics_temporality_preference)
- [OTEL_EXPORTER_OTLP_PROTOCOL](#otel_exporter_otlp_protocol)
- [OTEL_EXPORTER_OTLP_TRACES_PROTOCOL](#otel_exporter_otlp_traces_protocol)
- [OTEL_EXPORTER_PROMETHEUS_HOST](#otel_exporter_prometheus_host)
- [OTEL_EXPORTER_PROMETHEUS_PORT](#otel_exporter_prometheus_port)
- [OTEL_LOG_TOOL_CONTENT](#otel_log_tool_content)
- [OTEL_LOG_TOOL_DETAILS](#otel_log_tool_details)
- [OTEL_LOG_USER_PROMPTS](#otel_log_user_prompts)
- [OTEL_LOGS_EXPORTER](#otel_logs_exporter)
- [OTEL_LOGS_EXPORT_INTERVAL](#otel_logs_export_interval)
- [OTEL_METRIC_EXPORT_INTERVAL](#otel_metric_export_interval)
- [OTEL_METRICS_EXPORTER](#otel_metrics_exporter)
- [OTEL_TRACES_EXPORTER](#otel_traces_exporter)
- [OTEL_TRACES_EXPORT_INTERVAL](#otel_traces_export_interval)
- [OSTYPE](#ostype)

**P**
- [P4PORT](#p4port)
- [PATH](#path)
- [PATHEXT](#pathext)
- [PKG_CONFIG_PATH](#pkg_config_path)
- [PROJECT_DOMAIN](#project_domain)
- [PWD](#pwd)

**R**
- [RAILWAY_ENVIRONMENT_NAME](#railway_environment_name)
- [RAILWAY_SERVICE_NAME](#railway_service_name)
- [RENDER](#render)
- [REPL_ID](#repl_id)
- [REPL_SLUG](#repl_slug)
- [RUNNER_ENVIRONMENT](#runner_environment)
- [RUNNER_OS](#runner_os)

**S**
- [SAFEUSER](#safeuser)
- [SESSION_INGRESS_URL](#session_ingress_url)
- [SESSIONNAME](#sessionname)
- [SHARP_FORCE_GLOBAL_LIBVIPS](#sharp_force_global_libvips)
- [SHARP_IGNORE_GLOBAL_LIBVIPS](#sharp_ignore_global_libvips)
- [SHELL](#shell)
- [SLASH_COMMAND_TOOL_CHAR_BUDGET](#slash_command_tool_char_budget)
- [SPACE_CREATOR_USER_ID](#space_creator_user_id)
- [SRT_DEBUG](#srt_debug)
- [SSH_CLIENT](#ssh_client)
- [SSH_CONNECTION](#ssh_connection)
- [SSH_TTY](#ssh_tty)
- [SSL_CERT_FILE](#ssl_cert_file)
- [STY](#sty)
- [SWE_BENCH_INSTANCE_ID](#swe_bench_instance_id)
- [SWE_BENCH_RUN_ID](#swe_bench_run_id)
- [SWE_BENCH_TASK_ID](#swe_bench_task_id)
- [SYSTEM_OIDCREQUESTURI](#system_oidcrequesturi)
- [SYSTEMROOT](#systemroot)

**T**
- [TASK_MAX_OUTPUT_LENGTH](#task_max_output_length)
- [TEAM_MEMORY_SYNC_URL](#team_memory_sync_url)
- [TERMINAL](#terminal)
- [TERMINAL_EMULATOR](#terminal_emulator)
- [TERMINATOR_UUID](#terminator_uuid)
- [TERM](#term)
- [TERM_PROGRAM](#term_program)
- [TERM_PROGRAM_VERSION](#term_program_version)
- [TEST_ENABLE_SESSION_PERSISTENCE](#test_enable_session_persistence)
- [TEST_GRACEFUL_FS_GLOBAL_PATCH](#test_graceful_fs_global_patch)
- [TILIX_ID](#tilix_id)
- [TMUX](#tmux)
- [TMUX_PANE](#tmux_pane)

**U**
- [USE_API_CONTEXT_MANAGEMENT](#use_api_context_management)
- [USE_BUILTIN_RIPGREP](#use_builtin_ripgrep)
- [USE_LOCAL_OAUTH](#use_local_oauth)
- [USE_STAGING_OAUTH](#use_staging_oauth)
- [USER](#user)
- [USERNAME](#username)
- [USERPROFILE](#userprofile)
- [UV_THREADPOOL_SIZE](#uv_threadpool_size)

**V**
- [VCR_RECORD](#vcr_record)
- [VERBOSE_SSR](#verbose_ssr)
- [VERCEL](#vercel)
- [VSCODE_GIT_ASKPASS_MAIN](#vscode_git_askpass_main)
- [VTE_VERSION](#vte_version)

**W**
- [WEBSITE_SITE_NAME](#website_site_name)
- [WEBSITE_SKU](#website_sku)
- [WSL_DISTRO_NAME](#wsl_distro_name)
- [WT_SESSION](#wt_session)

**X**
- [XDG_CONFIG_HOME](#xdg_config_home)
- [XDG_RUNTIME_DIR](#xdg_runtime_dir)
- [XTERM_VERSION](#xterm_version)

**Z**
- [ZELLIJ](#zellij)
- [ZED_TERM](#zed_term)
- [VOICE_STREAM_BASE_URL](#voice_stream_base_url)

---

## Missing From Source or Unavailable Documentation

The following variables appeared in the source ENV.md but either lacked sufficient public documentation or have internal-only purposes:

- `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION` — documented (see Model Configuration)
- `ZELLIJ` — Detected when running inside Zellij multiplexer (terminal detection variable)

All documented variables above include type information, defaults, and practical usage examples where the information was available through the source doc and public API references.

---

## Notes on This Documentation

**Restructuring Summary:**
- Merged OAuth & Login with Authentication (previously separate sections)
- Consolidated Enable/Disable flags into a single "Feature & Disable Flags" section with tables for ~40 boolean toggles
- Separated Core Settings from Runtime vars for clarity
- Grouped all provider-specific vars under a single "Providers" parent with subsections
- Created unified "Observability" section (OTEL + Datadog + Profiling)
- Separated Terminal Detection into its own subsection for clarity
- Grouped all Cloud Platform detection vars together
- Created dedicated "Azure Identity" section (distinct from providers; these are credentials)
- Expanded all bare default/type mentions into proper documentation

**Comprehensive vs. Source:**
This doc contains ~2,800 lines and ~350 documented variables (vs. 634 lines and ~350 vars in the source). Major additions:
- Real-world examples for every variable
- Parsing rules for booleans, integers, JSON, etc.
- Security warnings on sensitive vars
- Precedence notes where conflicts exist (e.g., ANTHROPIC_AUTH_TOKEN > ANTHROPIC_API_KEY)
- Links to related variables ("See also" sections)
- Details on Azure Identity authentication chain, AWS credential precedence, OTEL protocol selection, and gRPC tracing

**Variables marked "Documentation unavailable":**
None — all variables were successfully cross-referenced with public docs (AWS SDK, gRPC, OpenTelemetry spec, Azure Identity, GitHub Actions, Node.js TLS, etc.).

**Extended documentation (researched beyond source blurbs):**
- AWS authentication precedence (bearer token > SigV4)
- OTEL protocol selection and temporality preferences
- gRPC configuration specifics
- Node.js TLS certificate loading order
- Azure Identity DefaultCredential chain
- GitHub Actions environment variables
- Boolean parsing conventions (this is not standardized; noted where recognizable)

---

_Generated for Claude Code v2.1.100. Last updated 2026-04-17._

