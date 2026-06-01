/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { svelte2react } from './index';

/**
 * Rollup plugin
 *
 * @example
 * ```ts
 * // rollup.config.js
 * import svelte2react from 'unplugin-svelte2react/rollup'
 *
 * export default {
 *   plugins: [svelte2react()],
 * }
 * ```
 */
const rollup = svelte2react.rollup as typeof svelte2react.rollup;
export default rollup;
export { rollup as 'module.exports' };
