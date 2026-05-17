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
import _SvelteButton from './SvelteButton.svelte';
const SvelteButton = Wrap(_SvelteButton);

export default function App() {
  const [name, setName] = useState('Mark');

  return <>
    My Svelte component:
    <SvelteButton name={name} />
  </>;
}
```
