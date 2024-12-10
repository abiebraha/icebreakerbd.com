import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
    watch: {
      usePolling: true,
    },
    hmr: {
      protocol: process.env.NODE_ENV === 'production' ? 'wss' : 'ws',
      host: '0.0.0.0',
      port: 5000,
      clientPort: 443
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    cssCodeSplit: false,
    cssMinify: 'lightningcss',
    outDir: '../dist/public',
    emptyOutDir: true,
    assetsDir: 'assets',
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'framer-motion',
            'wouter',
            'lucide-react'
          ],
          styles: [
            './src/index.css',
            './src/pages/styles.css'
          ]
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          const extType = assetInfo.name.split('.').pop();
          if (!extType) return 'assets/[name]-[hash][extname]';
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (extType === 'css') {
            return `assets/css/style-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  }
})
