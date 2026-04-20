import { defineConfig, presetIcons } from 'unocss';
import { presetStarlightIcons } from 'starlight-plugin-icons/uno';

export default defineConfig({
  presets: [
    presetStarlightIcons(),
    presetIcons({
      autoInstall: false,
    }),
  ],
  content: {
    filesystem: [
      './src/**/*.{astro,mdx}',
      './astro.config.mjs',
    ],
  },
});
