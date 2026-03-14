import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // Changed from 'terser' - esbuild is faster and included by default
  },
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
    allowedHosts: ['all'] // Permite ngrok e qualquer host
  }
})
