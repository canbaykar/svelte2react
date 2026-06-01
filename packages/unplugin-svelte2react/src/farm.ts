/**
 * This entry file is for Farm plugin.
 *
 * @module
 */

import { svelte2react } from './index';

/**
 * Farm plugin
 *
 * @example
 * ```ts
 * // farm.config.js
 * import svelte2react from 'unplugin-svelte2react/farm'
 *
 * export default {
 *   plugins: [svelte2react()],
 * }
 * ```
 */
const farm = svelte2react.farm as typeof svelte2react.farm;
export default farm;
export { farm as 'module.exports' };
