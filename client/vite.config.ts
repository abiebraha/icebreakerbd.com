import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-syntax-dynamic-import']
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:80',
        changeOrigin: true,
      }
    }
  },
  base: '/',
  build: {
    outDir: '../dist/public',
    assetsDir: 'assets',
    sourcemap: true,
    emptyOutDir: true,
    manifest: true, // Generate manifest file for server-side integration
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'wouter'],
          styles: ['./src/index.css']
        },
        // Ensure consistent file naming in production
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter'],
    exclude: ['@replit/vite-plugin-runtime-error-modal']
  }
})
