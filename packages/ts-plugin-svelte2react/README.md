# ts-plugin-svelte2react

TypeScript language service plugin for [svelte2react](https://github.com/canbaykar/svelte2react/).

## Install

```bash
npm i -D @baykar/ts-plugin-svelte2react
```

## Usage

```json
// tsconfig.json
{
	"compilerOptions": {
		"plugins": [
			{
				"name": "@baykar/ts-plugin-svelte2react",
				"suffix": "X"
			}
		]
	}
}
```

See [svelte2react README](https://github.com/canbaykar/svelte2react/) for configuration options and additional instructions on how to use this plugin.
