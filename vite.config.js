import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'ui': ['./src/components/Starfield.jsx', './src/components/Aurora.jsx', './src/components/Clouds.jsx']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
