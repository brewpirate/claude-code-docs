# Azure Identity


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

[← Back to env/README.md](./README.md)
