import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://brewpirate.github.io',
  base: '/zen-claude',
  integrations: [
    starlight({
      title: 'Zen Claude Docs',
      description: 'Comprehensive reference for Claude Code CLI — every env var, setting, hook, skill, tool, and more.',
      logo: {
        alt: 'Zen Claude',
        src: './src/assets/logo.svg',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/brewpirate/zen-claude' },
      ],
      editLink: {
        baseUrl: 'https://github.com/brewpirate/zen-claude/edit/main/docs/',
      },
      sidebar: [
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
          label: 'Environment Variables',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'env/overview' },
          ],
        },
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
          label: 'Permissions',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'permissions/overview' },
          ],
        },
        {
          label: 'Memory',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'memory/overview' },
          ],
        },
        {
          label: 'Keybindings',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'keybindings/overview' },
          ],
        },
        {
          label: 'Sessions',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'sessions/overview' },
          ],
        },
        {
          label: 'Plugins',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'plugins/overview' },
          ],
        },
        {
          label: 'Agents',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'agents/overview' },
          ],
        },
        {
          label: 'Changelog',
          slug: 'changelog',
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
