import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'src': path.resolve(__dirname, 'src')
    }
  },
  publicDir: 'public',
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true
    },
    fs: {
      strict: true,
      allow: ['.']
    }
  },
  build: {
    outDir: path.resolve(__dirname, '../dist/public'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')
    }
  }
});
