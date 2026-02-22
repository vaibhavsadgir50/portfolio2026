import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/portfolio2026/',
  plugins: [react()],
  server: {
    host: true, // listen on 0.0.0.0 so you can open the site from your phone on the same Wi‑Fi
  },
});
