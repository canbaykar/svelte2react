/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { svelte2react } from './index'

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import svelte2react from 'unplugin-svelte2react/vite'
 *
 * export default defineConfig({
 *   plugins: [svelte2react()],
 * })
 * ```
 */
const vite = svelte2react.vite as typeof svelte2react.vite
export default vite
export { vite as 'module.exports' }
