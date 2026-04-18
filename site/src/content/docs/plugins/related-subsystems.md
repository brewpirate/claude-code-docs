---
title: "Related subsystems (referenced by name)"
tags: [plugins, settings]
---

# Related subsystems (referenced by name)


The following files implement plugin infrastructure but are not detailed in this document:

- **`pluginLoader.ts`** — Core plugin discovery, loading, and registration logic.
- **`marketplaceManager.ts`** — Marketplace index fetching, caching, and plugin lookup.
- **`pluginAutoupdate.ts`** — Scheduled update checking and automatic plugin updates.
- **`pluginVersioning.ts`** — Version parsing, comparison, and update eligibility checks.
- **`dependencyResolver.ts`** — Resolves plugin-to-plugin dependencies and checks semver constraints.
- **`reconciler.ts`** — Reconciles desired state (settings) with actual state (filesystem).
- **`zipCache.ts`, `zipCacheAdapters.ts`** — Plugin distribution caching via ZIP files.
- **`officialMarketplaceGcs.ts`** — GCS-backed official marketplace integration.
- **`pluginBlocklist.ts`** — Blocklist enforcement for managed-only policy rules.
- **`orphanedPluginFilter.ts`** — Cleanup of defunct plugin installations after 7 days.
- **`hintRecommendation.ts`** — Suggests relevant plugins based on user actions and context.
- **`lspRecommendation.ts`** — LSP-based plugin recommendations for language support.
- **`managedPlugins.ts`** — Enterprise-managed plugin behavior (forced install, read-only state).
- **Other files:** `installedPluginsManager.ts`, `installCounts.ts`, `performStartupChecks.tsx`, `pluginFlagging.ts`, `pluginIdentifier.ts`, `pluginInstallationHelpers.ts`, `pluginDirectories.ts`, `pluginOptionsStorage.ts`, `refresh.ts`, `walkPluginMarkdown.ts`, `addDirPluginSettings.ts`, `cacheUtils.ts`, `fetchTelemetry.ts`, `gitAvailability.ts`, `headlessPluginInstall.ts`, `lspPluginIntegration.ts`, `mcpPluginIntegration.ts`, `parseMarketplaceInput.ts` — Various plugin utilities and integrations.

---

[← Back to Plugins/README.md](/claude-code-docs/plugins/overview/)
