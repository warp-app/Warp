<script lang="ts">
	import { registerSW } from "../util/registerSW";
	import ultravioletLogo from "../assets/ultravioletLogo.png";
	import rammerheadLogo from "../assets/rammerheadLogo.png";

	async function loadScript(src: string) {
		await new Promise<void>((resolve, reject) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve();
			};
			script.onerror = () => {
				reject();
			};
			document.head.appendChild(script);
		});
	}

	(async () => {
		await loadScript("/baremux/bare.cjs");
		await loadScript("/epoxy/index.js");
		await loadScript("/uv/uv.bundle.js");
		await loadScript("/uv/uv.config.js");
		await registerSW();
	})();
</script>

<svelte:head>
	<link rel="preload" as="image" href={ultravioletLogo} />
	<link rel="preload" as="image" href={rammerheadLogo} />
</svelte:head>
