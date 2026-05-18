import Wrapper from "./Wrapper.svelte";
import { mount, unmount, type Component } from "svelte";
import { writable, type Writable } from "svelte/store";
import React from "react";

/**
 * A React HOC (higher order component) that wraps a given Svelte component in a
 * React component.
 * @param C A Svelte component
 * @returns A React component
 */
export function Wrap<
    Props extends Record<string, any> = {},
    Exports extends Record<string, any> = {},
    Bindings extends keyof Props | "" = string,
>(C: Component<Props, Exports, Bindings>): (p: Props) => React.JSX.Element {
    return function render(p) {
        const ref = React.useRef<HTMLDivElement>(null);
        const compRef = React.useRef<Exports | null>(null);
        const pStoreRef = React.useRef<Writable<Props>>(writable(p));

        // Update
        pStoreRef.current.set(p);

        React.useEffect(() => {
            // Start
            const c = (compRef.current = mount(Wrapper, {
                target: ref.current as HTMLDivElement,
                props: { Component: C, props: pStoreRef.current },
            }) as Exports);

            // End
            return () => {
                unmount(c);
                compRef.current = null;
            };
        }, []);

        // return <div ref={ref}></div>;
        return React.createElement("div", { ref });
    };
}