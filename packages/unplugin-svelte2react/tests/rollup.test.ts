import path from 'node:path';
import { rollupBuild, testFixtures } from '@sxzz/test-utils';
import { describe } from 'vitest';
import svelte from 'rollup-plugin-svelte';
import svelte2react from '../src/rollup';

describe('rollup', async () => {
	const { dirname } = import.meta;
	await testFixtures(
		['*.svelte'],
		async (args, id) => {
			const { snapshot } = await rollupBuild(id, [
				svelte(),
				svelte2react({ skipDependencyCheck: true })
			]);
			return snapshot;
		},
		{ cwd: path.resolve(dirname, 'fixtures'), promise: true }
	);
});
