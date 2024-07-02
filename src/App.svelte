<script lang="ts">
	import { Router, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import Error from "./routes/Error.svelte";
	import Head from "./components/Head.svelte";
	import Theme from "./components/Theme.svelte";

	export let url: string = "";

	let theme: number = Number(localStorage.getItem("@warp/theme")) || 225;

	$: localStorage.setItem("@warp/theme", String(theme));
</script>

<Head />
<Theme bind:theme />
<Router {url}>
	<Route path="/">
		<Home bind:theme />
	</Route>
	<Route path="/*" component={Error}></Route>
</Router>
