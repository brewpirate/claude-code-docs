---
title: "Authentication & API"
---

# Authentication & API


### `apiKeyHelper`
- **Type:** string
- **Default:** unspecified
- **Description:** Custom script (shell path) to be executed in `/bin/sh` to generate an auth value. This value will be sent as `X-Api-Key` and `Authorization: Bearer` headers for model requests.
- **Example:**
  ```json
  {
    "apiKeyHelper": "/bin/generate_temp_api_key.sh"
  }
  ```

### `awsAuthRefresh`
- **Type:** string
- **Default:** unspecified
- **Description:** Custom script for auto-refreshing AWS session credentials. Modifies the `.aws` directory.
- **Example:**
  ```json
  {
    "awsAuthRefresh": "aws sso login --profile myprofile"
  }
  ```

### `awsCredentialExport`
- **Type:** string
- **Default:** unspecified
- **Description:** Custom script that outputs JSON with AWS credentials for Bedrock configuration.
- **Example:**
  ```json
  {
    "awsCredentialExport": "/bin/generate_aws_grant.sh"
  }
  ```

### `forceLoginMethod`
- **Type:** string
- **Default:** unspecified
- **Description:** Force login method: `claudeai` restricts to Claude.ai accounts, `console` restricts to Claude Console (API billing) accounts. When unset, both are allowed.
- **Example:**
  ```json
  {
    "forceLoginMethod": "claudeai"
  }
  ```

### `forceLoginOrgUUID`
- **Type:** string or string[]
- **Default:** unspecified
- **Description:** Require login to belong to specific organization(s). Accepts a single UUID string (pre-selects during login) or array of UUIDs (any listed org accepted). In managed settings, login fails if the authenticated account does not belong to a listed organization; empty array fails closed.
- **Example:**
  ```json
  {
    "forceLoginOrgUUID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  }
  ```

### `forceRemoteSettingsRefresh`
- **Type:** boolean
- **Default:** unspecified
- **Description:** **Managed-only.** Block CLI startup until remote managed settings are freshly fetched from the server. If the fetch fails, the CLI exits rather than continuing with cached or no settings. Only honored when set by managed/enterprise-controlled settings; ignored in user/project settings.
- **Example:**
  ```json
  {
    "forceRemoteSettingsRefresh": true
  }
  ```

### `otelHeadersHelper`
- **Type:** string
- **Default:** unspecified
- **Description:** Script path to generate dynamic OpenTelemetry headers. Runs at startup and periodically for OTEL monitoring.
- **Example:**
  ```json
  {
    "otelHeadersHelper": "/bin/generate_otel_headers.sh"
  }
  ```

---

[← Back to settings/README.md](/claude-code-docs/settings/overview/)
