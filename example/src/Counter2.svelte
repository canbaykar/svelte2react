<script lang="ts">
    interface Counter2Props {
        name?: string;
    }
    
    let { name = 'Svelte' }: Counter2Props = $props();

    let count = $state(0);
</script>

<button
    type="button"
    class="counter"
    onclick={() => count++}
>
    {name} is {count}
</button>
