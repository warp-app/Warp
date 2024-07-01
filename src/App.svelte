<script lang="ts">
	import { Router, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import Error from "./routes/Error.svelte";
	import Head from "./components/Head.svelte";
	import Theme from "./components/Theme.svelte";

	export let url: string = "";

	let theme: string = localStorage.getItem("@warp/theme") || "hsl(225, 100%, 50%)";

	$: localStorage.setItem("@warp/theme", theme);
</script>

<Head />
<Theme bind:theme />
<Router {url}>
	<Route path="/">
		<Home bind:theme />
	</Route>
	<Route path="/*" component={Error}></Route>
</Router>
