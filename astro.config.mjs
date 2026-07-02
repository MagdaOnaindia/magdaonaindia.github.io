// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://magdaonaindia.github.io',
  base: '/',
  output: 'static',
  integrations: [react(), sitemap()],
});
