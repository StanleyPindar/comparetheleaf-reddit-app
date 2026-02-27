import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { devvit } from '@devvit/start/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devvit(),
  ],
});
