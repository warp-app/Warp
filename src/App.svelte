<script lang="ts">
	import { Router, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import Error from "./routes/Error.svelte";
	import Head from "./components/Head.svelte";
	import Theme from "./components/Theme.svelte";

	export let url: string = "";

	let theme: number = Number(localStorage.getItem("@warp/theme")) || 225;
	let themeMode: string = localStorage.getItem("@warp/themeMode") || "dark";

	$: localStorage.setItem("@warp/theme", String(theme));
	$: localStorage.setItem("@warp/themeMode", themeMode);
</script>

<Head />
<Theme bind:theme bind:themeMode />
<Router {url}>
	<Route path="/">
		<Home bind:theme bind:themeMode />
	</Route>
	<Route path="/*" component={Error}></Route>
</Router>
