/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { svelte2react } from './index';

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import svelte2react from 'unplugin-svelte2react/rolldown'
 *
 * export default {
 *   plugins: [svelte2react()],
 * }
 * ```
 */
const rolldown = svelte2react.rolldown as typeof svelte2react.rolldown;
export default rolldown;
export { rolldown as 'module.exports' };
