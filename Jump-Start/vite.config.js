import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This maps the "images" alias to the "src/images" directory
      images: '/src/images'
    }
  },
  // This tells Vite to copy any files in the "public" directory to the output build
  // directory without processing them. This is useful for static files like images.
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]',
      },
    },
  }
})
