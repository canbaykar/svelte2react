# unplugin-svelte2react

Unplugin for [svelte2react](../../).

## Install

```bash
npm i -D @baykar/unplugin-svelte2react
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import svelte2react from '@baykar/unplugin-svelte2react/vite';

export default defineConfig({
	plugins: [svelte2react()]
});
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import svelte2react from '@baykar/unplugin-svelte2react/rollup';

export default {
	plugins: [svelte2react()]
};
```

<br></details>

<details>
<summary>Rolldown / tsdown</summary><br>

```ts
// rolldown.config.ts / tsdown.config.ts
import svelte2react from '@baykar/unplugin-svelte2react/rolldown';

export default {
	plugins: [svelte2react()]
};
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from 'esbuild';
import svelte2react from '@baykar/unplugin-svelte2react/esbuild';

build({
	plugins: [svelte2react()]
});
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import svelte2react from '@baykar/unplugin-svelte2react/webpack';

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
import svelte2react from '@baykar/unplugin-svelte2react/rspack';

export default {
	/* ... */
	plugins: [svelte2react()]
};
```

<br></details>