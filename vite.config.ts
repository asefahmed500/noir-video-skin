import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Video.js extensions ship their own compiled output; keep every package on a
  // single copy of React or the hooks inside them throw "invalid hook call".
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: [
      '@videojs/react',
      '@videojs/react/video',
      '@videojs/react/extensions/mux-data',
      '@videojs/mux-video',
      '@videojs/mux-data',
    ],
  },
})
