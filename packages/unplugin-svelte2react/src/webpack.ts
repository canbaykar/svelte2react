/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { svelte2react } from './index';

/**
 * Webpack plugin
 *
 * @example
 * ```js
 * // webpack.config.js
 * import svelte2react from 'unplugin-svelte2react/webpack'
 *
 * export default {
 *   plugins: [svelte2react()],
 * }
 * ```
 */
const webpack = svelte2react.webpack as typeof svelte2react.webpack;
export default webpack;
export { webpack as 'module.exports' };
