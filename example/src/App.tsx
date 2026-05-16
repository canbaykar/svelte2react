import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

import { useState } from 'react';

import Counter from './Counter';
import Counter2 from './Counter2.svelte';
import { Wrap } from '@baykar/rollup-plugin-svelte2react';
// import { Wrap } from './Wrapper.svelte';

const CounterSvelte = Wrap(Counter2);

function App() {
  const [suffix, setSuffix] = useState(0);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <Counter name={'React' + suffix} />
        <CounterSvelte name={'Svelte' + suffix} />
        <button onClick={() => {
            setSuffix(s => s + 1);
          }}>Increment nameCount</button>
      </section>
    </>
  )
}

export default App
