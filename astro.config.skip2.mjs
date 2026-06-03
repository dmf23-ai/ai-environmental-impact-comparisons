import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://ai-environmental-impact-comparisons.vercel.app',
  outDir: '/tmp/dist-skip2',
  cacheDir: '/tmp/astro-cache-skip2',
  vite: { cacheDir: '/tmp/vite-cache-skip2' },
});
