import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import Inspect from 'vite-plugin-inspect';
import svelte2react from '@baykar/rollup-plugin-svelte2react';

export default defineConfig({
  // @ts-ignore
  devtools: true,
  plugins: [
    Inspect(),
    react(),
    svelte(),
    svelte2react(),
  ],
});
