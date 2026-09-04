import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The frontend talks to the API through /api, which is proxied to the Express
// server in development so there are no CORS/URL issues.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
