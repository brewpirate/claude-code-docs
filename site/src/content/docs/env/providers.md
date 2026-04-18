---
title: "Providers"
---

# Providers


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

[← Back to env/README.md](/claude-code-docs/env/overview/)
