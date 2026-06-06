import type { FilterPattern } from 'unplugin';

export interface Options {
	/**
	 * Skip the check to see if **@baykar/svelte2react** is in package.json dependecies.
	 * This check can be skipped safely if **@baykar/svelte2react** is installed.
	 * You can install it with: *(if using npm)*
	 * @example npm i -D @baykar/svelte2react
	 * @default false
	 */
	skipDependencyCheck?: boolean;
	/**
	 * Files to include
	 * @default [/\.svelte$/]
	 */
	include?: FilterPattern;
	/**
	 * Files to exclude
	 * @default [/node_modules/]
	 */
	exclude?: FilterPattern;
	/**
	 * Will change plugin execution order in some bundlers
	 * (e.g. https://vite.dev/guide/api-plugin.html#plugin-ordering).
	 * @default undefined
	 */
	enforce?: 'pre' | 'post' | undefined;
	/**
	 * You can provide your tsconfig file path when using a nonstandard setup.
	 * For example when your tsconfig file has a different name or isn't in
	 * the root folder of your project. This isn't necessary if you don't
	 * have options relating to svelte2react (like `prefix`, `suffix` and
	 * `constant`) defined in your tsconfig.
	 * @default undefined
	 * @example { tsconfig: './config/tsconfig.app.json' }
	 */
	tsconfig?: string;
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type OptionsResolved = Overwrite<Required<Options>, Pick<Options, 'enforce' | 'tsconfig'>>;

export function resolveOptions(opts: Options): OptionsResolved {
	return {
		skipDependencyCheck: opts.skipDependencyCheck ?? false,
		include: opts.include || [/\.svelte$/],
		exclude: opts.exclude || [/node_modules/],
		enforce: 'enforce' in opts ? opts.enforce : undefined,
		tsconfig: 'tsconfig' in opts ? opts.tsconfig : undefined
	};
}
