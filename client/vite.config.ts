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
    }
  },
  server: {
    host: true,
    port: 5000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    },
    watch: {
      usePolling: true
    },
    hmr: {
      protocol: 'wss',
      host: 'localhost',
      port: 5000,
      clientPort: 443,
      timeout: 120000,
      overlay: true
    }
  },
  preview: {
    host: true,
    port: 5000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    cssCodeSplit: false,
    cssMinify: true,
    minify: 'terser',
    outDir: '../dist/public',
    emptyOutDir: true,
    assetsDir: 'assets',
    manifest: true,
    sourcemap: process.env.NODE_ENV !== 'production',
    modulePreload: { polyfill: true },
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
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor'
            if (id.includes('@radix-ui')) return 'radix-vendor'
            if (id.includes('framer-motion')) return 'animation-vendor'
            if (id.includes('lucide-react')) return 'icons-vendor'
            if (id.includes('tailwindcss')) return 'styles-vendor'
            return 'vendor'
          }
          if (id.includes('components/ui')) {
            if (id.includes('button') || id.includes('accordion') || id.includes('navigation-menu')) {
              return 'ui-core'
            }
            return 'ui-components'
          }
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]'
          const extType = assetInfo.name.split('.').pop()
          if (!extType) return 'assets/[name]-[hash][extname]'
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (extType === 'css') {
            return `assets/css/styles-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
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
