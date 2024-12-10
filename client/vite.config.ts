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
    host: true, // This enables listening on all addresses
    strictPort: true, // Ensures server fails if port is in use
    port: Number(process.env.PORT) || 3000,
    watch: {
      usePolling: true, // Enables file change detection in Replit
    },
  }
})
