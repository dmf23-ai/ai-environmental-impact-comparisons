import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://ai-environmental-impact-comparisons.vercel.app',
  outDir: '/tmp/dist-skip',
  cacheDir: '/tmp/astro-cache-skip',
  vite: { cacheDir: '/tmp/vite-cache-skip' },
});
