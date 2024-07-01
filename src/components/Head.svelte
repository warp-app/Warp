<script lang="ts">
	import { registerSW } from "../util/registerSW";
	import ultravioletLogo from "../assets/ultravioletLogo.png";
	import rammerheadLogo from "../assets/rammerheadLogo.png";

	(async () => {
		await registerSW();
	})();
</script>

<svelte:head>
	<script defer src="/baremux/bare.cjs"></script>
	<script defer src="/epoxy/index.js"></script>
	<script defer src="/uv/uv.bundle.js"></script>
	<script defer src="/uv/uv.config.js"></script>
	<link rel="preload" as="image" href={ultravioletLogo} />
	<link rel="preload" as="image" href={rammerheadLogo} />
</svelte:head>
