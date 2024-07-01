<script lang="ts">
	import { registerSW } from "../util/registerSW";
	import ultravioletLogo from "../assets/ultravioletLogo.png";
	import rammerheadLogo from "../assets/rammerheadLogo.png";
</script>

<svelte:head>
	<script src="/baremux/bare.cjs"></script>
	<script src="/epoxy/index.js"></script>
	<script src="/uv/uv.bundle.js"></script>
	<script
		on:load={async () => await registerSW()}
		src="/uv/uv.config.js"
	></script>
	<link rel="preload" as="image" href={ultravioletLogo} />
	<link rel="preload" as="image" href={rammerheadLogo} />
</svelte:head>
