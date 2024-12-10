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
    port: Number(process.env.PORT) || 3000,
    strictPort: true,
    hmr: {
      host: process.env.REPL_SLUG + '.' + process.env.REPL_OWNER + '.repl.co',
      port: 443,
      protocol: 'wss'
    },
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.SERVER_PORT || 3001}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  publicDir: 'public',
})
