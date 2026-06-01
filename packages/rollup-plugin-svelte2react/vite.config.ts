import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'svelte2react',
			fileName: 'index',
			formats: ['es', 'cjs']
		},
		rollupOptions: {
			external: ['react', 'svelte', /^node:/]
		}
	},
	plugins: [
		dts({
			insertTypesEntry: true,
			entryRoot: 'src'
		})
	]
});
