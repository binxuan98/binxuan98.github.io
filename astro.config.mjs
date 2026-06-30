import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://binxuan98.github.io',
  output: 'static',
  devToolbar: {
    enabled: false
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 900
    }
  }
});
