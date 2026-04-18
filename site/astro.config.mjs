import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeFlexoki from 'starlight-theme-flexoki';
import mermaid from 'astro-mermaid';
import starlightTagsPlugin from 'starlight-tags';
import starlightLinksValidator from 'starlight-links-validator';
import UnoCSS from 'unocss/astro';
import { starlightIconsPlugin, starlightIconsIntegration } from 'starlight-plugin-icons';
import starlightRosePine from 'starlight-theme-rose-pine'

export default defineConfig({
  site: 'https://brewpirate.github.io',
  base: '/claude-code-docs',
  integrations: [
    UnoCSS(),
    starlightIconsIntegration({ extractSafelist: true }),
    mermaid({
      autoTheme: true,
    }),
    starlight({
      title: 'Claude Code Docs',
      description: 'Comprehensive reference for Claude Code CLI — every env var, setting, hook, skill, tool, and more.',
      logo: {
        alt: 'Claude Code Docs',
        src: './src/assets/logo.svg',
      },
      plugins: [
        starlightRosePine({
          dark:{
            accent: 'gold'
          }
        }),
        starlightIconsPlugin({ sidebar: false }),
//        starlightThemeFlexoki({
//          accentColor: 'orange',
//        }),
        starlightTagsPlugin(),
        starlightLinksValidator(),
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/brewpirate/claude-code-docs' },
      ],
      editLink: {
        baseUrl: 'https://github.com/brewpirate/claude-code-docs/edit/main/docs/',
      },
      sidebar: [
        {
          label: 'Get Started',
          items: [
            {
              label: 'Getting Started',
              items: [
                { label: 'Overview', slug: 'getting-started/overview' },
                { label: 'First Hook', slug: 'getting-started/first-hook' },
                { label: 'First Permission Rule', slug: 'getting-started/first-permission-rule' },
                { label: 'First Skill', slug: 'getting-started/first-skill' },
                { label: 'Feature Gates Guide', slug: 'getting-started/feature-gates-guide' },
              ],
            },
            {
              label: '.claude Directory',
              slug: 'claude-directory',
            },
          ],
        },
        {
          label: 'Use Claude Code',
          items: [
            {
              label: 'CLI',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'cli/overview' },
                { label: 'Flag Reference', slug: 'cli/flag-reference' },
                { label: 'Subcommands', slug: 'cli/subcommands' },
                { label: 'Invocation Modes', slug: 'cli/invocation-modes' },
                { label: 'How CLI Invocation Works', slug: 'cli/how-cli-invocation-works' },
                { label: 'Environment-Driven Behavior', slug: 'cli/environment-driven-behavior' },
                { label: 'Undocumented Internal Flags', slug: 'cli/undocumented-internal-flags' },
              ],
            },
            {
              label: 'Commands',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'commands/overview' },
                { label: 'How Slash Commands Work', slug: 'commands/how-slash-commands-work' },
                { label: 'Session Management', slug: 'commands/session-management' },
                { label: 'Memory & Context', slug: 'commands/memory-context' },
                { label: 'Help & Miscellaneous', slug: 'commands/help-miscellaneous' },
                { label: 'Diagnostics & Health', slug: 'commands/diagnostics-health' },
                { label: 'Account & Subscription', slug: 'commands/account-subscription' },
                { label: 'IDE Integrations', slug: 'commands/ide-integrations' },
                { label: 'Plugins, Permissions, Hooks, MCP & Skills', slug: 'commands/plugins-permissions-hooks-mcp-skills' },
                { label: 'Team, Scheduling & Multi-Agent', slug: 'commands/team-scheduling-multi-agent' },
                { label: 'Experimental & Feature-Gated', slug: 'commands/experimental-unreleased-feature-flag-gated-commands' },
                { label: 'Additional Undocumented Commands', slug: 'commands/additional-undocumented-commands' },
                { label: 'Removed & Deprecated', slug: 'commands/removed-deprecated-commands' },
              ],
            },
            {
              label: 'Keybindings',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'keybindings/overview' },
                { label: 'How Keybindings Work', slug: 'keybindings/how-keybindings-work' },
                { label: 'Global Bindings', slug: 'keybindings/global-bindings' },
                { label: 'Chat Bindings', slug: 'keybindings/chat-bindings' },
                { label: 'Navigation Bindings', slug: 'keybindings/navigation-bindings' },
                { label: 'Dialog Bindings', slug: 'keybindings/dialog-bindings' },
                { label: 'Platform Quirks', slug: 'keybindings/platform-quirks' },
                { label: 'Customization', slug: 'keybindings/customization' },
              ],
            },
            {
              label: 'Tools',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'tools/overview' },
                { label: 'How Tools Work', slug: 'tools/how-tools-work' },
                { label: 'Filesystem Tools', slug: 'tools/filesystem-tools' },
                { label: 'Shell & Code Execution', slug: 'tools/shell-code-execution-tools' },
                { label: 'Network & Web Tools', slug: 'tools/network-web-tools' },
                { label: 'MCP Tools', slug: 'tools/mcp-tools' },
                { label: 'Orchestration & Agent Tools', slug: 'tools/orchestration-agent-tools' },
                { label: 'Permissions & Tool Access Control', slug: 'tools/permissions-tool-access-control' },
              ],
            },
          ],
        },
        {
          label: 'Configure & Secure',
          items: [
            {
              label: 'Settings',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'settings/overview' },
                { label: 'Authentication & API', slug: 'settings/authentication-api' },
                { label: 'LLM & Model', slug: 'settings/llm-model' },
                { label: 'Permissions & Security', slug: 'settings/permissions-security' },
                { label: 'Hooks & Automation', slug: 'settings/hooks-automation' },
                { label: 'MCP Servers', slug: 'settings/mcp-servers' },
                { label: 'Plugins & Extensions', slug: 'settings/plugins-extensions' },
                { label: 'Subagents', slug: 'settings/subagents' },
                { label: 'Worktree', slug: 'settings/worktree' },
                { label: 'File System Sandbox', slug: 'settings/file-system-sandbox' },
                { label: 'Memory & Context', slug: 'settings/memory-context' },
                { label: 'UI & Display', slug: 'settings/ui-display' },
                { label: 'Attribution & Output', slug: 'settings/attribution-output' },
                { label: 'Channel Communication', slug: 'settings/channel-communication' },
                { label: 'Configuration Environment', slug: 'settings/configuration-environment' },
                { label: 'Development Tools & IDE', slug: 'settings/development-tools-ide' },
                { label: 'Enterprise & Organization', slug: 'settings/enterprise-organization' },
                { label: 'File & Directory Handling', slug: 'settings/file-directory-handling' },
                { label: 'Network & Proxy', slug: 'settings/network-proxy' },
                { label: 'Telemetry & Misc', slug: 'settings/telemetry-misc' },
              ],
            },
            {
              label: 'Environment Variables',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'env/overview' },
                { label: 'Core Settings', slug: 'env/core-settings' },
                { label: 'Authentication & API Access', slug: 'env/authentication-api-access' },
                { label: 'Model Configuration', slug: 'env/model-configuration-behavior' },
                { label: 'Networking', slug: 'env/networking' },
                { label: 'OAuth Login', slug: 'env/oauth-login' },
                { label: 'Providers', slug: 'env/providers' },
                { label: 'Azure Identity', slug: 'env/azure-identity' },
                { label: 'Execution Environment', slug: 'env/execution-environment' },
                { label: 'Platform & CI Detection', slug: 'env/platform-ci-detection' },
                { label: 'Cloud Platform Detection', slug: 'env/cloud-platform-detection' },
                { label: 'Security & Sandboxing', slug: 'env/security-sandboxing' },
                { label: 'Feature Disable Flags', slug: 'env/feature-disable-flags' },
                { label: 'Agents, Plans & Tasks', slug: 'env/agents-plans-tasks' },
                { label: 'Context Compaction & Resume', slug: 'env/context-compaction-session-resume' },
                { label: 'Integrations', slug: 'env/integrations' },
                { label: 'Observability', slug: 'env/observability' },
                { label: 'Accessibility & Brief Mode', slug: 'env/accessibility-brief-mode' },
                { label: 'System & Runtime', slug: 'env/system-runtime' },
                { label: 'Testing & Benchmarks', slug: 'env/testing-benchmarks' },
                { label: 'Miscellaneous Internal', slug: 'env/miscellaneous-internal' },
              ],
            },
            {
              label: 'Permissions',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'permissions/overview' },
                { label: 'How Permissions Are Evaluated', slug: 'permissions/how-permissions-are-evaluated' },
                { label: 'Rule Grammar', slug: 'permissions/rule-grammar' },
                { label: 'Permission Modes', slug: 'permissions/permission-modes' },
                { label: 'Rule Scopes', slug: 'permissions/rule-scopes' },
                { label: 'Auto-Mode Classifiers', slug: 'permissions/auto-mode-classifiers' },
                { label: 'Rule Updates', slug: 'permissions/rule-updates' },
                { label: 'Related Settings Keys', slug: 'permissions/related-settings-keys' },
                { label: 'Hooks & Permissions', slug: 'permissions/hooks-and-permissions' },
                { label: 'Undocumented Rule Subsystems', slug: 'permissions/additional-undocumented-rule-related-subsystems' },
              ],
            },
            {
              label: 'Hooks',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'hooks/overview' },
                { label: 'How Event Hooks Work', slug: 'hooks/how-event-hooks-work' },
                { label: 'Event Reference', slug: 'hooks/event-reference' },
                { label: 'Handler Types', slug: 'hooks/handler-types' },
                { label: 'Matcher Semantics', slug: 'hooks/matcher-semantics' },
                { label: 'Scope & Configuration', slug: 'hooks/scope-configuration' },
                { label: 'Security Model', slug: 'hooks/security-model' },
                { label: 'Additional Hook Subsystems', slug: 'hooks/additional-hook-subsystems' },
              ],
            },
          ],
        },
        {
          label: 'Build & Extend',
          items: [
            {
              label: 'Skills',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'skills/overview' },
                { label: 'How Bundled Skills Work', slug: 'skills/how-bundled-skills-work' },
                { label: 'Publicly Documented Bundled Skills', slug: 'skills/publicly-documented-bundled-skills' },
                { label: 'Adding Your Own Skills', slug: 'skills/adding-your-own-skills' },
                { label: 'Internal Undocumented Bundled Skills', slug: 'skills/internal-undocumented-bundled-skills' },
              ],
            },
            {
              label: 'Plugins',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'plugins/overview' },
                { label: 'How Plugins Work', slug: 'plugins/how-plugins-work' },
                { label: 'Plugin Lifecycle', slug: 'plugins/plugin-lifecycle' },
                { label: 'Manifest Field Reference', slug: 'plugins/manifest-field-reference' },
                { label: 'Directory Layout', slug: 'plugins/plugin-directory-layout' },
                { label: 'Directory Structure Conventions', slug: 'plugins/plugin-directory-structure-conventions' },
                { label: 'Bundled Plugins', slug: 'plugins/bundled-plugins' },
                { label: 'Plugin Policy', slug: 'plugins/plugin-policy' },
                { label: 'Marketplace Concept', slug: 'plugins/marketplace-concept' },
                { label: 'Related CLI Subcommands', slug: 'plugins/plugin-related-cli-subcommands' },
                { label: 'Related Slash Commands', slug: 'plugins/plugin-related-slash-commands' },
                { label: 'Related Settings Keys', slug: 'plugins/plugin-related-settings-keys' },
                { label: 'Related Environment Variables', slug: 'plugins/plugin-related-environment-variables' },
                { label: 'Related Subsystems', slug: 'plugins/related-subsystems' },
                { label: 'Additional Resources', slug: 'plugins/additional-resources' },
              ],
            },
            {
              label: 'Agent SDK',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'agent-sdk/overview' },
                { label: 'How the Agent SDK Works', slug: 'agent-sdk/how-the-agent-sdk-works' },
                { label: 'Session Lifecycle', slug: 'agent-sdk/session-lifecycle' },
                { label: 'Message Protocol', slug: 'agent-sdk/message-protocol' },
                { label: 'Content Block Types', slug: 'agent-sdk/content-block-types' },
                { label: 'Streaming Events', slug: 'agent-sdk/streaming-events' },
                { label: 'Tool Bridging', slug: 'agent-sdk/tool-bridging' },
                { label: 'MCP Integration', slug: 'agent-sdk/mcp-integration' },
                { label: 'Hook Integration', slug: 'agent-sdk/hook-integration' },
                { label: 'Permissions in SDK', slug: 'agent-sdk/permissions-in-sdk' },
                { label: 'Language Bindings', slug: 'agent-sdk/language-bindings' },
                { label: 'Configuration', slug: 'agent-sdk/configuration' },
              ],
            },
            {
              label: 'Agents',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'agents/overview' },
                { label: 'How Subagents Work', slug: 'agents/how-subagents-work' },
              ],
            },
          ],
        },
        {
          label: 'Reference',
          items: [
            {
              label: 'Sessions',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'sessions/overview' },
                { label: 'How Sessions Work', slug: 'sessions/how-sessions-work' },
                { label: 'Context Management', slug: 'sessions/context-management' },
                { label: 'Auto Compaction', slug: 'sessions/auto-compaction' },
                { label: 'Session Resume', slug: 'sessions/session-resume' },
                { label: 'Startup & Recovery', slug: 'sessions/startup-recovery' },
                { label: 'Transcript Storage', slug: 'sessions/transcript-storage' },
                { label: 'Transcript Entry Types', slug: 'sessions/transcript-entry-types' },
                { label: 'Cleanup & Retention', slug: 'sessions/cleanup-retention' },
              ],
            },
            {
              label: 'Memory',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'memory/overview' },
                { label: 'How Memory Works', slug: 'memory/how-memory-works' },
                { label: 'Memory Types', slug: 'memory/memory-types' },
                { label: 'Storage Paths', slug: 'memory/storage-paths' },
                { label: 'Auto Memory', slug: 'memory/auto-memory' },
                { label: 'Session Memory', slug: 'memory/session-memory' },
                { label: 'History & Pastes', slug: 'memory/history-and-pastes' },
              ],
            },
            {
              label: 'Changelog',
              slug: 'changelog',
            },
          ],
        },
      ],
      components: {
        PageTitle: './src/components/PageTitle.astro',
        Sidebar: './src/components/Sidebar.astro',
      },
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
