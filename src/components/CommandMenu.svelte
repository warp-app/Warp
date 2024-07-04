<script lang="ts">
	import { Command } from "cmdk-sv";
	//@ts-ignore
	import { evaluate } from "mathjs";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import CaretLeft from "phosphor-svelte/lib/CaretLeft";
	import ArrowSquareOut from "phosphor-svelte/lib/ArrowSquareOut";
	import Globe from "phosphor-svelte/lib/Globe";
	import GearSix from "phosphor-svelte/lib/GearSix";
	import Question from "phosphor-svelte/lib/Question";
	import Check from "phosphor-svelte/lib/Check";
	import Moon from "phosphor-svelte/lib/Moon";
	import Sun from "phosphor-svelte/lib/Sun";
	import Calculator from "phosphor-svelte/lib/Calculator";
	import ultravioletLogo from "../assets/ultravioletLogo.png";
	import rammerheadLogo from "../assets/rammerheadLogo.png";
	import scramjetLogo from "../assets/scramjetLogo.png";
	import { encodeURL } from "../util/encodeURL";

	export let theme: number;
	export let themeMode: string;

	let open: boolean = false;
	let pages: string[] = [];
	let page: string | undefined = undefined;
	let query: string = "";
	let mathResult: string = "";
	let recent: string[] = JSON.parse(
		localStorage.getItem("@warp/recent") || "[]",
	);
	let selected: string = "";
	let service: string =
		localStorage.getItem("@warp/service") || "ultraviolet";

	$: localStorage.setItem("@warp/service", service);
	$: localStorage.setItem("@warp/recent", JSON.stringify(recent));

	$: page = pages[pages.length - 1];

	$: if (!selected) {
		setTimeout(() => {
			selected =
				window.document
					.querySelector("[data-cmdk-item]")
					?.getAttribute("data-value") || "";
		});
	}

	$: if (query) {
		try {
			let evaluated = evaluate(query);

			if (evaluated instanceof Function) {
				mathResult = "";
			} else {
				if (isNaN(evaluated)) {
					mathResult = "";
				} else {
					evaluated = String(evaluated);
					if (evaluated) {
						if (query !== evaluated) {
							mathResult = evaluated;
						}
					} else {
						mathResult = "";
					}
				}
			}
		} catch {
			mathResult = "";
		}
	} else {
		mathResult = "";
	}

	function setSelected(value: string) {
		selected = value;
	}

	function setService(value: string) {
		service = value;
	}

	function menuBack() {
		const newPages = pages.slice(0, -1);
		pages = newPages;
		selected = "";
	}

	function openMenu(newPage: string) {
		pages = [...pages, newPage];
		selected = "";
	}

	function showMenu() {
		if (!open) {
			open = true;
		}
	}

	function keyDown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			e.preventDefault();
			if (page) {
				menuBack();
			}
		}
	}

	async function go(url: string) {
		let encodedURL = await encodeURL(service, url);
		window.open(encodedURL);
		if (recent[0] !== url) {
			recent.unshift(url);
		}
		recent = recent.slice(0, 3);
		query = "";
	}

	function openURL() {
		if (query) {
			go(query);
		}
	}

	function searchURL() {
		if (query) {
			go("https://www.google.com/search?q=%s".replace("%s", query));
		}
	}

	function openRecent(url: string) {
		let cmdkItem = window.document.querySelector(
			`[data-cmdk-item][data-value="${url}"]`,
		) as HTMLElement;
		go(cmdkItem.dataset.url || "");
	}

	function setTheme(e: Event) {
		if (e.target) {
			let target: HTMLInputElement = e.target as HTMLInputElement;
			theme = 360 - Number(target.value);
		}
	}

	function setThemeMode(mode: string) {
		themeMode = mode;
	}
</script>

<Command.Root
	onKeydown={keyDown}
	shouldFilter={false}
	label="Menu"
	data-open={open ? "true" : "false"}
	value={selected}
	onValueChange={setSelected}
>
	<div
		on:pointerdown={showMenu}
		data-cmdk-input-wrapper
		data-back={page ? "true" : "false"}
	>
		<button data-cmdk-back on:click={menuBack}>
			<CaretLeft />
		</button>
		<Command.Input
			autofocus
			placeholder="Search or Enter URL"
			on:keydown={showMenu}
			bind:value={query}
		/>
	</div>
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>

		{#if mathResult}
			<Command.Group heading="Math">
				<Command.Item>
					<Calculator />
					{mathResult}
				</Command.Item>
			</Command.Group>
		{/if}

		{#if !page}
			<Command.Group heading="Actions">
				<Command.Item onSelect={searchURL}>
					<MagnifyingGlass />
					Search
				</Command.Item>
				<Command.Item onSelect={openURL}>
					<ArrowSquareOut />
					Open URL
				</Command.Item>
			</Command.Group>
			<Command.Group heading="Recent">
				{#if !recent.length}
					<Command.Item disabled>
						<Question />
						Recently visited sites will appear here.
					</Command.Item>
				{/if}
				{#each recent as item, i}
					<Command.Item
						value={item + String(i)}
						data-url={item}
						onSelect={openRecent}
					>
						<Globe />
						{item}
					</Command.Item>
				{/each}
			</Command.Group>
			<Command.Group heading="Settings">
				<Command.Item onSelect={() => openMenu("proxy")}>
					<GearSix />
					Proxy
				</Command.Item>
				<Command.Item>
					<GearSix />
					Search Engine
				</Command.Item>
				<Command.Item onSelect={() => openMenu("theme")}>
					<GearSix />
					Theme
				</Command.Item>
				<Command.Item>
					<GearSix />
					Tab Mask
				</Command.Item>
			</Command.Group>
		{:else if page === "proxy"}
			<Command.Group heading="Proxy">
				<Command.Item onSelect={setService}>
					<img
						src={ultravioletLogo}
						draggable={false}
						alt="Ultraviolet"
					/>
					Ultraviolet
					{#if service === "ultraviolet"}
						<Check />
					{/if}
				</Command.Item>
				<Command.Item onSelect={setService}>
					<img
						src={rammerheadLogo}
						draggable={false}
						alt="Rammerhead"
					/>
					Rammerhead
					{#if service === "rammerhead"}
						<Check />
					{/if}
				</Command.Item>
				<Command.Item onSelect={setService}>
					<img src={scramjetLogo} draggable={false} alt="Scramjet" />
					Scramjet
					{#if service === "scramjet"}
						<Check />
					{/if}
				</Command.Item>
			</Command.Group>
		{:else if page === "theme"}
			<Command.Group heading="Theme">
				<Command.Item value="theme-slider">
					<input
						class="theme-slider"
						type="range"
						min={0}
						max={360}
						value={360 - theme}
						on:input={setTheme}
					/>
				</Command.Item>
				<Command.Item onSelect={setThemeMode}>
					<Moon />
					Dark
					{#if themeMode === "dark"}
						<Check />
					{/if}
				</Command.Item>
				<Command.Item onSelect={setThemeMode}>
					<Sun />
					Light
					{#if themeMode === "light"}
						<Check />
					{/if}
				</Command.Item>
			</Command.Group>
		{/if}
	</Command.List>
</Command.Root>
