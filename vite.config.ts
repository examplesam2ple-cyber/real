import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // If deploying to https://<user>.github.io/<repo>/, set base to '/<repo>/'.
  // If deploying to a custom domain or a user/organization page
  // (https://<user>.github.io/), leave base as '/'.
  base: '/real/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
