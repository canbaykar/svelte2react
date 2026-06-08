# svelte2react

*Use Svelte 4 components in React.*

There are two ways to use **svelte2react**:

- [**Manual**](#way-1-manual): Turn Svelte components to React by using `Wrap`.
	```tsx
	import { Wrap } from '@baykar/svelte2react';
	import SvelteButton from './SvelteButton.svelte';
	const WrappedSvelteButton = Wrap(SvelteButton);

	function render() {
		const [name, setName] = useState('Mark');
		return <SvelteButtonX name={name} onclick={() => setName("Jack")} />;
	}
	```

- [**Automatic (🚧WIP🚧)**](#way-2-automatic): Automatically generate React versions of all Svelte compunents using [unplugin-svelte2react](./packages/unplugin-svelte2react/) and [ts-plugin-svelte2react](./packages/ts-plugin-svelte2react/).
	```tsx
	// ✨ Auto-generated React component! ✨
	import { SvelteButtonX } from './SvelteButton.svelte';

	function render() {
		const [name, setName] = useState('Mark');
		return <SvelteButtonX name={name} onclick={() => setName("Jack")} />;
	}
	```

## Caveats

Some Svelte and React features obviously won't make sense or won't work. To name some:

- ❌ Children

    ```jsx
    <WrappedSvelteComponent>
    	<SvelteOrReactComponent />
    </WrappedSvelteComponent>
    ```

- ❌ Svelte bindings
    ```svelte
    <script lang="ts">
    	let { value = $bindable() } = $props();
    </script>
    ```

---

## Way 1: Manual

### Install

```bash
npm i @baykar/svelte2react
```

### Usage

Given an example Svelte component such as;

```svelte
<!-- SvelteButton.svelte -->
<script lang="ts">
	let { name = '' } = $props();
	let count = $state(0);
	console.log('Svelte component initialized');
</script>

<button onclick={() => count++}>
	Hi {name}! You clicked me {count} times!
</button>
```

You can use it in a React component like:

```tsx
// App.tsx
import { useState } from 'react';

import { Wrap } from '@baykar/svelte2react';
import SvelteButton from './SvelteButton.svelte';
const WrappedSvelteButton = Wrap(SvelteButton);

export default function App() {
	const [name, setName] = useState('Mark');

	return (
		<>
			<label>
				Your name:
				<input value={name} onChange={(e) => setName(e.target.value)} />
			</label>
			My Svelte component:
			<WrappedSvelteButton name={name} />
		</>
	);
}
```

Now the rendered `SvelteButton` will react to changes to `name` (without re-initializing everytime `name` changes).

---

## Way 2: Automatic (🚧WIP🚧)

> [!IMPORTANT]
> Using **svelte2react** this way doesn't support `tsc`, `svelte-check`, or an alternative to these yet. Because of this, the automatic method is work-in-progress. Although type-checking while editing *is* supported.

### Install

```bash
npm i @baykar/svelte2react
npm i -D @baykar/unplugin-svelte2react @baykar/ts-plugin-svelte2react
```

And now setup your bundler and TypeScript configuration:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import svelte2react from '@baykar/unplugin-svelte2react/vite';

export default defineConfig({
	plugins: [react(), svelte(), svelte2react()]
});
```
(For other bundlers see [unplugin-svelte2react README](./packages/unplugin-svelte2react/).)
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

Now in order to get [ts-plugin-svelte2react](./packages/ts-plugin-svelte2react/) to work, we need to do some editor specific configuration. The following part describes the steps for [Visual Studio Code](https://code.visualstudio.com/). Firstly, install TypeScript into your `node_modules`:
```bash
npm i -D typescript
```
Then set your workspace version of TypeScript the the instance in your `node_modules`:
```json
// .vscode/settings.json
{
	"js/ts.tsdk.path": "node_modules\\typescript\\lib",
	"js/ts.tsdk.promptToUseWorkspaceVersion": true
}
```
Make sure VS Code uses the TypeScript instance in your `node_modules` via: `Ctrl+Shift+P` → `>TypeScript: Select TypeScript Version`. (You may need to open a `.js` or `.ts` file first for this command to appear in the Command Palette.)

> [!IMPORTANT]
> Any contributor for your project should be told to configure their editor to use the project's TypeScript version in `node_modules`, when setting up their development environment for the first time (e.g., when they first clone your project repository) using the method above.

### Usage

Given an example Svelte component such as: (same example as in [Way 1](#way-1-manual))

```svelte
<!-- SvelteButton.svelte -->
<script lang="ts">
	let { name = '' } = $props();
	let count = $state(0);
	console.log('Svelte component initialized');
</script>

<button onclick={() => count++}>
	Hi {name}! You clicked me {count} times!
</button>
```

You can use it in a React component like:

```tsx
import { useState } from 'react';

// ✨ Auto-generated React component! ✨
import { SvelteButtonX } from './SvelteButton.svelte';

export default function App() {
	const [name, setName] = useState('Mark');

	return (
		<>
			<label>
				Your name:
				<input value={name} onChange={(e) => setName(e.target.value)} />
			</label>
			My Svelte component:
			<SvelteButtonX name={name} />
		</>
	);
}
```

Make sure both your `build` and `dev` scripts work, otherwise [the troubleshooting section]() may have a quick fix.

### Troubleshooting

If you run into any issues, try these:

- Remove `svelte-check` (or `tsc`) from build script. They aren't supported and there isn't an alternative for them yet.
- Change plugin order in your bundler configuration, the `svelte2react` plugin should run after `svelte`.
- Try setting `enforce: 'post'` in your [svelte2react bundler options](#bundler-configuration).
- Restart your editor and terminals.
- `Ctrl+Shift+P` → `>TypeScript: Select TypeScript Version` → Select your workspace version.

### Configuration

There are two places to configure **svelte2react**:
- In your [bundler configuration](#bundler-configuration) (`vite.config.js`, `webpack.config.js`, etc...)
- In your [TypeScript configuration](#typescript-configuration) (`tsconfig.json`)

#### Bundler Configuration

```ts
// vite.config.ts
// Imports...
export default defineConfig({
	plugins: [
		react(), 
		svelte(), 
		svelte2react({
			// 👈 svelte2react bundler config here
		})
	],
});
```

| Option                | Type                                         | Default            | Description                                                                                                                         |
| --------------------- | -------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `skipDependencyCheck` | `boolean`                                    | `false`            | Skips checking whether `@baykar/svelte2react` is listed in `package.json`. Safe to disable if it is already installed.              |
| `include`             | `(string \| RegExp) \| (string \| RegExp)[]` | `[/\.svelte$/]`    | Files to include. Accepts a glob string, `RegExp`, or an array of them. This filter is applied before internal `.svelte` filtering. |
| `exclude`             | `(string \| RegExp) \| (string \| RegExp)[]` | `[/node_modules/]` | Files to exclude. Accepts a glob string, `RegExp`, or an array of them.                                                             |
| `enforce`             | `'pre' \| 'post' \| undefined`               | `undefined`        | Controls plugin execution order in supported bundlers (e.g. Vite).                                                                  |
| `tsconfig`            | `string`                                     | `undefined`        | Path to a custom `tsconfig.json` file. Useful for non-standard setups or when config is not in the project root.                    |

> [!NOTE]
> [TS configuration](#typescript-configuration) also affects bundler behaviour. Some options had to be placed there so that [the TS Plugin](./packages/ts-plugin-svelte2react/) can also reach them.

> [!NOTE]
> You don't need to set `include` and `exclude` to only process `.svelte` files as that check is done later anyway. But setting them up so that non-`.svelte` files are filtered-out may improve bundler performance. 
> 
> These are used as [unplugin hook filters](https://unplugin.unjs.io/guide/#filters) for file `id`, see [Rolldown hook filter documentation](https://rolldown.rs/apis/plugin-api/hook-filters#plugin-hook-filters) (even if you aren't using Rolldown) for technical details.

#### TypeScript Configuration

```json
// tsconfig.json
{
	"compilerOptions": {
		"plugins": [{
			"name": "@baykar/ts-plugin-svelte2react",
			// 👈 svelte2react TS config here
		}]
	},
}
```

| Option     | Type     | Default     | Description                                                         |
| ---------- | -------- | ----------- | ------------------------------------------------------------------- |
| `prefix`   | `string` | `''`        | Prefix added to generated export names.                             |
| `suffix`   | `string` | `'X'`       | Suffix added to generated export names.                             |
| `constant` | `string` | `undefined` | Overrides the export name entirely (ignores `prefix` and `suffix`). |

When `prefix: '_'` and `suffix: 'ABC'`, a React component can be exported from `comp.svelte` like:
```ts
import { _CompABC } from './comp.svelte';
```
When `constant: 'Wrapped'`, that becomes:

```ts
import { Wrapped } from './comp.svelte';
```

---

## Prop Reactivity Breakdown

The Svelte component given to `Wrap` is wrapped in a Svelte component (defined in [Wrapper.svelte](/packages/svelte2react/src/Wrapper.svelte)) and a React component (defined in [index.ts](/packages/svelte2react/src/index.ts)). These two communicate via a [Svelte store](https://svelte.dev/docs/svelte/stores) `pStoreRef.current` that stores your components props.

In the example above, once `setName` is called:

1. Calling `setName` triggers a re-render of `App`.

2. `WrappedSvelteButton` is re-rendered because its parent (`App`) re-rendered

3. `pStoreRef.current.set(p)` is called in [index.ts](/packages/svelte2react/src/index.ts). `pStoreRef.current` is a [Svelte store](https://svelte.dev/docs/svelte/stores) that stores the props for `SvelteButton`.

4. `pStoreRef.current` calles its only subscriber, which is an instance of the Svelte component `Wrapper`, defined in [Wrapper.svelte](/packages/svelte2react/src/Wrapper.svelte).

5. `Wrapper` updates the props passed to your component due to `{...$pState}` in [Wrapper.svelte](/packages/svelte2react/src/Wrapper.svelte). (`$pState` is why `Wrapper` automatically subscribes to `pStoreRef.current` previously.)