# svelte2react

## Install

```bash
npm install @baykar/svelte2react
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
import { useState } from 'react';

import { Wrap } from '@baykar/svelte2react';
import SvelteButton from './SvelteButton.svelte';
const WrappedSvelteButton = Wrap(SvelteButton);

export default function App() {
  const [name, setName] = useState('Mark');

  return <>
    <label>
      Your name:
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </label>

    My Svelte component:
    <WrappedSvelteButton name={name} />
  </>;
}
```

Now the rendered `SvelteButton` will react to changes to `name` (without re-initializing everytime `name` changes).

## Prop Reactivity Breakdown

The Svelte component given to `Wrap` is wrapped in a Svelte component (defined in [Wrapper.svelte](src/Wrapper.svelte)) and a React component (defined in [index.ts](src/index.ts)). These two communicate via a [Svelte store](https://svelte.dev/docs/svelte/stores) `pStore` that stores your components props.

In the example above, once `setName` is called:

1. Calling `setName` triggers a re-render of `App`.

2. `WrappedSvelteButton` is re-rendered because its parent (`App`) re-rendered

3. `pStore.set(p)` is called in [index.ts](src/index.ts). `pStore` is a [Svelte store](https://svelte.dev/docs/svelte/stores) that stores the props for `SvelteButton`.

4. `pStore` calles its only subscriber, which is an instance of the Svelte component `Wrapper`, defined in [Wrapper.svelte](src/Wrapper.svelte).

5. `Wrapper` updates the props passed to your component due to `{...$pState}` in [Wrapper.svelte](src/Wrapper.svelte). (`$pState` is why `Wrapper` automatically subscribes to `pStore` previously.)

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
    let { value = $bindable(), ...props } = $props();
  </script>
  ```