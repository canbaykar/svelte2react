# unplugin-svelte2react (WIP!)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

See [unplugin](https://github.com/unjs/unplugin).

<!-- Remove Start -->

## Template Usage

To use this template, clone it down using:

```bash
npx degit baykar/unplugin-svelte2react unplugin-my-plugin
```

And do a global replacement of `unplugin-svelte2react` with your plugin name.

Then you can start developing your unplugin 🔥

To run unit tests, run: `pnpm run test`.
To release a new version, run: `pnpm run release`.

<!-- Remove End -->

## Installation

```bash
npm i -D unplugin-svelte2react
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import svelte2react from 'unplugin-svelte2react/vite';

export default defineConfig({
	plugins: [svelte2react()]
});
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import svelte2react from 'unplugin-svelte2react/rollup';

export default {
	plugins: [svelte2react()]
};
```

<br></details>

<details>
<summary>Rolldown / tsdown</summary><br>

```ts
// rolldown.config.ts / tsdown.config.ts
import svelte2react from 'unplugin-svelte2react/rolldown';

export default {
	plugins: [svelte2react()]
};
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from 'esbuild';
import svelte2react from 'unplugin-svelte2react/esbuild';

build({
	plugins: [svelte2react()]
});
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import svelte2react from 'unplugin-svelte2react/webpack';

export default {
	/* ... */
	plugins: [svelte2react()]
};
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
import svelte2react from 'unplugin-svelte2react/rspack';

export default {
	/* ... */
	plugins: [svelte2react()]
};
```

<br></details>
