# svelte2react

See [svelte2react GitHub repo](https://github.com/canbaykar/svelte2react/) for full manual.

## Install

```bash
npm i @baykar/svelte2react
```

## Usage

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