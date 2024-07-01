<script lang="ts">
	import { Router, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import Error from "./routes/Error.svelte";
	import Head from "./components/Head.svelte";

	export let url: string = "";
</script>

<Head />
<Router {url}>
	<Route path="/" component={Home}></Route>
	<Route path="/*" component={Error}></Route>
</Router>
