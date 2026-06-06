import { useState } from 'react';

import ReactButton from './ReactButton';

import { SvelteButtonWrapped } from './SvelteButton.svelte';

export default function App() {
	const [name, setName] = useState('Mark');

	return (
		<section>
			<h1>
				React <em>vs</em> Wrapped Svelte
			</h1>

			<label>
				Your name:
				<input value={name} onChange={(e) => setName(e.target.value)} />
			</label>

			<ReactButton name={name} />
			<SvelteButtonWrapped name={name} />
		</section>
	);
}
