/**
 * This entry file is for esbuild plugin.
 *
 * @module
 */

import { svelte2react } from './index';

/**
 * Esbuild plugin
 *
 * @example
 * ```ts
 * import { build } from 'esbuild'
 * import svelte2react from 'unplugin-svelte2react/esbuild'
 * 
 * build({ plugins: [svelte2react()] })
```
 */
const esbuild = svelte2react.esbuild as typeof svelte2react.esbuild;
export default esbuild;
export { esbuild as 'module.exports' };
