<script lang="ts">
    import { type Component } from "svelte";
    import { type Readable } from "svelte/store";

    const {
        Component: C,
        props: pStore,
    }: {
        Component: Component<any, any, any>;
        props: Readable<Record<string, any>>;
    } = $props();
</script>

<C {...$pStore} />
