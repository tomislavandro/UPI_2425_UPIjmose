///<reference types="vitest"/>
///<reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite konfiguracija
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1000', // Port na kojem radi backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    globals: true, // Omogućuje globalne funkcije poput 'describe', 'test', 'expect'
    environment: 'jsdom', // Za testiranje Reacta koristimo jsdom
    setupFiles: './setupTests.js', // Put do setup datoteke
    css: true
  },
});
