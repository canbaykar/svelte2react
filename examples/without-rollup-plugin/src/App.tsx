import { useState } from 'react';
import { Wrap } from '@baykar/svelte2react';

import ReactButton from './ReactButton';
import _SvelteButton from './SvelteButton.svelte';
const SvelteButton = Wrap(_SvelteButton);

export default function App() {
  const [name, setName] = useState('Mark');

  return <section>
    <h1>React <em>vs</em> Wrapped Svelte</h1>

    <label>
      Your name:
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </label>

    <ReactButton name={name} />
    <SvelteButton name={name} />
  </section>;
}
