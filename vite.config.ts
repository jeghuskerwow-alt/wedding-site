import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          historie: path.resolve(__dirname, 'historie.html'),
          dagen: path.resolve(__dirname, 'dagen.html'),
          praktisk: path.resolve(__dirname, 'praktisk.html'),
          onskeliste: path.resolve(__dirname, 'onskeliste.html'),
          rsvp: path.resolve(__dirname, 'rsvp.html'),
        },
      },
    },
  };
});
