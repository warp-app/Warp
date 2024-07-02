<script lang="ts">
	import CommandMenu from "../components/CommandMenu.svelte";

	export let theme: number;
</script>

<main class="main">
	<h1 class="title">Warp</h1>
	<CommandMenu bind:theme />
</main>
