import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import checker from 'vite-plugin-checker';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          '@babel/plugin-transform-react-jsx'
        ]
      }
    }),
    checker({ typescript: true })
  ],
  root: path.resolve(__dirname),
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: '0.0.0.0'
    }
  },
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
    sourcemap: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
