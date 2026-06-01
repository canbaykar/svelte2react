/**
 * This entry file is for Rspack plugin.
 *
 * @module
 */

import { svelte2react } from './index'

/**
 * Rspack plugin
 *
 * @example
 * ```js
 * // rspack.config.js
 * import svelte2react from 'unplugin-svelte2react/rspack'
 *
 * export default {
 *   plugins: [svelte2react()],
 * }
 * ```
 */
const rspack = svelte2react.rspack as typeof svelte2react.rspack
export default rspack
export { rspack as 'module.exports' }
