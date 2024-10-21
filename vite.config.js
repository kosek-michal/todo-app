import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/item': {
        target: 'http://localhost:1323',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
