import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // If you serve the Hospitalsite app under a subpath (e.g. /hospital),
  // set `base` so built assets reference the correct path.
  base: '/hospital/',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
