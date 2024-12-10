import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        babelrc: false,
        configFile: false,
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript'
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
      protocol: 'ws',
      host: '0.0.0.0',
      port: 5000,
      clientPort: 5000,
      timeout: 120000,
      overlay: false,  // Disable the error overlay
      path: '/vite-hmr' // Custom path to avoid conflicts
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
    cssMinify: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production',
        pure_funcs: ['console.log'],
        passes: 2
      },
      format: {
        comments: false,
        webkit: true,
        safari10: true
      }
    },
    outDir: '../dist/public',
    emptyOutDir: true,
    assetsDir: 'assets',
    manifest: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('@radix-ui')) return 'radix-vendor';
            if (id.includes('framer-motion')) return 'animation-vendor';
            return 'vendor';
          }
          if (id.includes('components/ui')) return 'ui-components';
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          const extType = assetInfo.name.split('.').pop();
          if (!extType) return 'assets/[name]-[hash][extname]';
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (extType === 'css') {
            return `assets/css/styles-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'wouter',
      'lucide-react',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-accordion'
    ]
  }
})
