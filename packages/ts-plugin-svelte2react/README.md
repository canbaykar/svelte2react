# ts-plugin-svelte2react

TypeScript language service plugin for [svelte2react](../../).

## Install

```bash
npm i -D @baykar/ts-plugin-svelte2react
```

## Usage

```json
// tsconfig.json
{
	"compilerOptions": {
		"plugins": [{
			"name": "@baykar/ts-plugin-svelte2react",
			"suffix": "X"
		}]
	},
}
```

See [svelte2react README](../../) for configuration options and additional instructions on how to use this plugin.