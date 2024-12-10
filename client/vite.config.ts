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
    strictPort: false,
    hmr: {
      port: Number(process.env.PORT) || 3000,
      host: process.env.REPL_SLUG ? `${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : 'localhost',
      protocol: 'wss',
      clientPort: 443
    }
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
    strictPort: false,
  },
  publicDir: 'public',
})
