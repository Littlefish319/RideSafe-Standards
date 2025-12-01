import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This ensures process.env.API_KEY is replaced with the actual value during build
      // We use || '' to ensure it doesn't become undefined, which can break the build or runtime
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  };
});