import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // @supabase/supabase-js (auth + postgrest + realtime + storage clients)
    // is loaded on every page since product/category data comes from it
    // even on the homepage — ~700kB raw / ~195kB gzipped is the real,
    // accepted cost of that, not something further code-splitting fixes.
    chunkSizeWarningLimit: 800,
  },
})
