import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'src': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true
    },
    fs: {
      strict: false,
      allow: ['..']
    },
    middlewareMode: false
  },
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
    sourcemap: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')
    }
  },
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom']
  }
});
