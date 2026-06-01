import type { FilterPattern } from 'unplugin'

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
	 * @default 'pre'
	 */
	enforce?: 'pre' | 'post' | undefined;
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type OptionsResolved = Overwrite<
	Required<Options>,
	Pick<Options, 'enforce'>
>

export function resolveOptions(opts: Options): OptionsResolved {
	return {
		skipDependencyCheck: opts.skipDependencyCheck ?? false,
		include: opts.include || [/\.svelte$/],
		exclude: opts.exclude || [/node_modules/],
		enforce: 'enforce' in opts ? opts.enforce : 'pre',
	}
}
