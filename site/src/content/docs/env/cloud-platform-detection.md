---
title: "Cloud Platform Detection"
---

# Cloud Platform Detection


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

[← Back to env/README.md](/claude-code-docs/env/overview/)
