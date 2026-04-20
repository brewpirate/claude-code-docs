---
title: "Networking"
tags: [environment]
---


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

[← Back to env/README.md](/claude-code-docs/env/overview/)
