import Wrapper from "./Wrapper.svelte";
import { mount, unmount, type Component } from "svelte";
import { writable, type Writable } from "svelte/store";
import React from "react";

const storeMap = new Map<
    Record<string, any>,
    Writable<Record<string, any>>
>();

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
        let compRef = React.useRef<Exports | null>(null);

        React.useEffect(() => {
            // Start
            const pStore = writable(p);
            const c = (compRef.current = mount(Wrapper, {
                target: ref.current as HTMLDivElement,
                props: { Component: C, props: pStore },
            }) as Exports);
            storeMap.set(c, pStore);

            // End
            return () => {
                unmount(c);
                storeMap.delete(c);
                compRef.current = null;
            };
        }, []);

        // Update
        const comp = compRef.current;
        if (comp) {
            const pStore = storeMap.get(comp);
            if (pStore) pStore.set(p);
        }

        // return <div ref={ref}></div>;
        return React.createElement("div", { ref });
    };
}