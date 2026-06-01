import path from 'node:path';
import fs from 'node:fs';
import type { Plugin, PluginContext } from 'rollup';
import { id2componentName } from 'utils';

const PLUGIN_NAME = 'svelte2react';
const PLUGIN_FULL_NAME = 'rollup-plugin-' + PLUGIN_NAME;
const DEPENDENCY = '@baykar/svelte2react';

const transformName = (name: string) => name + 'X';

interface PluginOptions {
	/**
	 * Skip the check to see if **\@baykar/svelte2react** is in package.json dependecies.
	 * This check can be skipped safely if **\@baykar/svelte2react** is installed.
	 * You can install it with: *(if using npm)*
	 * @example `npm i -D @baykar/svelte2react`
	 */
	skipDependencyCheck?: boolean;
}

export default function svelte2react({ skipDependencyCheck = false }: PluginOptions = {}): Plugin {
	return {
		name: PLUGIN_NAME,

		// Only for dependency check error
		buildStart() {
			if (skipDependencyCheck) return;

			const pkgPath = path.resolve(process.cwd(), 'package.json');
			let pkgRead = false;
			try {
				const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
				const deps = {
					...pkg.dependencies,
					...pkg.devDependencies,
					...pkg.peerDependencies
				};
				if (!deps[DEPENDENCY]) {
					pkgRead = true;
					this.error(
						`Missing required dependency: "${DEPENDENCY}". Please install it before building, or if you know what you are doing, set skipDependencyCheck to true in ${PLUGIN_FULL_NAME} options.`
					);
				}
			} catch (e) {
				if (pkgRead) this.error(e as string);
				else
					this.error(
						`Could not read package.json at ${pkgPath}. Make sure you have "${DEPENDENCY}" installed, and if necessary, skip this check by setting skipDependencyCheck to true in ${PLUGIN_FULL_NAME} options. Error details: ${(e as string)?.message}`
					);
			}
		},

		transform(code, id) {
			const ext = path.extname(id);
			if (ext !== '.svelte') return null;

			// svelteComponentName has to match the default export in code but,
			// wrappedComponentName has to match svetle2react's TypeScript plugin's
			// export. 1st is determined by Svelte compiler, while 2nd is determined
			// by id2componentName which is more similar to Svelte TS plugin's method.
			// So these can be very different even ignoring transformName's change.
			const svelteComponentName = getDefaultExport(this, code);
			const wrappedComponentName = transformName(id2componentName(id));

			return {
				code:
					code +
					'\n' +
					`
import { Wrap } from "${DEPENDENCY}";
export const ${wrappedComponentName} = Wrap(${svelteComponentName});`,
				map: null
			};
		}
	};
}

/** Looks for default export variable name */
function getDefaultExport(ctx: PluginContext, code: string) {
	let exp = code.match(/export default ([_$a-zA-Z][_$a-zA-Z0-9]*);/)?.[1];
	if (!exp) exp = code.match(/export default function ([_$a-zA-Z][_$a-zA-Z0-9]*)\(/)?.[1];
	if (!exp) ctx.error("Couldn't parse default export name. Code:\n" + code);
	return exp;
}
