import { useState } from "react";

interface CounterProps {
    name?: string;
}

export default function Counter({ name = 'React' }: CounterProps) {
    const [count, setCount] = useState(0);

    return <button
        type="button"
        className="counter"
        onClick={() => setCount((count) => count + 1)}
    >
        {name} is {count}
    </button>;
}