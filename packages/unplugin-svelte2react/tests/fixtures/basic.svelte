<script lang="ts">
	let { name = '' } = $props();
	let count = $state(0);
	console.log('Svelte component initialized');
</script>

<button onclick={() => count++}>
	Hi {name}! You clicked me {count} times!
</button>
