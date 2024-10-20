import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/item': {
        target: 'http://localhost:1323',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/item/, '/item'),
      },
    },
  },
})
