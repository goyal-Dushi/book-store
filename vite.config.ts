import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' 
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
    hmr: {
      overlay: true,
    }
  }
})