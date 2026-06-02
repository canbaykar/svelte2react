import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import Inspect from 'vite-plugin-inspect';
import svelte2react from '@baykar/unplugin-svelte2react/vite';

export default defineConfig({
	// @ts-expect-error I don't know why devtools isn't defined
	devtools: true,
	plugins: [Inspect(), react(), svelte(), svelte2react()]
});
