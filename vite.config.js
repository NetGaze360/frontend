import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    }
  },
  define: {
    'process.env': {
      VITE_API_URI: process.env.ENVIRONMENT === 'production'
        ? import.meta.env.VITE_API_URI
        : process.env.VITE_API_URI
    }
  }
})
