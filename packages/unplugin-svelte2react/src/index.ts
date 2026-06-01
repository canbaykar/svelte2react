import path from 'node:path';
import fs from 'node:fs';
import { createUnplugin, type UnpluginInstance } from 'unplugin';
import { resolveOptions, type Options } from './core/options';
import { id2componentName } from 'utils';

const PLUGIN_NAME = 'svelte2react';
const PLUGIN_FULL_NAME = 'unplugin-' + PLUGIN_NAME;
const DEPENDENCY = '@baykar/svelte2react';

const transformName = (name: string) => name + 'X';

export const svelte2react: UnpluginInstance<Options | undefined, false> = createUnplugin(
	(rawOptions = {}) => {
		const options = resolveOptions(rawOptions);

		return {
			name: PLUGIN_FULL_NAME,
			enforce: options.enforce,

			// Only for dependency check error
			buildStart() {
				if (options.skipDependencyCheck) return;

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
						throw new Error(
							`Missing required dependency: "${DEPENDENCY}". Please install it before building, or if you know what you are doing, set skipDependencyCheck to true in ${PLUGIN_FULL_NAME} options.`
						);
					}
				} catch (e) {
					if (pkgRead) throw e;
					else
						throw new Error(
							`Could not read package.json at ${pkgPath}. Make sure you have "${DEPENDENCY}" installed, and if necessary, skip this check by setting skipDependencyCheck to true in ${PLUGIN_FULL_NAME} options. Error details: ${(e as any)?.message}`,
							{ cause: e }
						);
				}
			},

			transform: {
				filter: {
					id: { include: options.include, exclude: options.exclude }
				},

				handler(code, id) {
					// svelteComponentName has to match the default export in code but,
					// wrappedComponentName has to match svetle2react's TypeScript plugin's
					// export. 1st is determined by Svelte compiler, while 2nd is determined
					// by id2componentName which is more similar to Svelte TS plugin's method.
					// So these can be very different even ignoring transformName's change.
					const svelteComponentName = getDefaultExport(code);
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
			}
		};
	}
);

/** Looks for default export variable name */
function getDefaultExport(code: string) {
	let exp = code.match(/export default ([_$a-zA-Z][_$a-zA-Z0-9]*);/)?.[1];
	if (!exp) exp = code.match(/export default function ([_$a-zA-Z][_$a-zA-Z0-9]*)\(/)?.[1];
	if (!exp) throw new Error("Couldn't parse default export name. Code:\n" + code);
	return exp;
}
