import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://ai-environmental-impact-comparisons.vercel.app',
  outDir: '/tmp/dist-orn',
  cacheDir: '/tmp/astro-cache-orn',
  vite: { cacheDir: '/tmp/vite-cache-orn' },
});
