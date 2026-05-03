import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://binxuan98.github.io',
  output: 'static',
  vite: {
    build: {
      chunkSizeWarningLimit: 900
    }
  }
});
