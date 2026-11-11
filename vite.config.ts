import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { buildMetaPlugin } from './scripts/build-meta.mjs';

export default defineConfig({
  plugins: [react(), tailwindcss(), buildMetaPlugin()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
