<script lang="ts">
	import { registerSW } from "./util/registerSW";
	import CommandMenu from "./components/CommandMenu.svelte";

	(async () => {
		await registerSW();
	})();
</script>

<main class="main">
	<h1 class="title">Warp</h1>
	<CommandMenu />
</main>
