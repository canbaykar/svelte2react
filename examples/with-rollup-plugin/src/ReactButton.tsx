import { useState } from "react";

export default function ReactButton({ name = '' }) {
    const [count, setCount] = useState(0);

    return <button
        onClick={() => setCount(c => c + 1)}
    >
        Hi {name}! You clicked me {count} times!
    </button>;
}