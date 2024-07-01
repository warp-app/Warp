<script lang="ts">
	import { Command } from "cmdk-sv";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import CaretLeft from "phosphor-svelte/lib/CaretLeft";
	import ArrowSquareOut from "phosphor-svelte/lib/ArrowSquareOut";
	import Globe from "phosphor-svelte/lib/Globe";
	import GearSix from "phosphor-svelte/lib/GearSix";
	import ultravioletLogo from "../assets/ultravioletLogo.png";
	import rammerheadLogo from "../assets/rammerheadLogo.png";

	let open: boolean = false;
	let pages: string[] = [];
	let page: string | undefined = undefined;

	$: page = pages[pages.length - 1];

	function menuBack() {
		const newPages = pages.slice(0, -1);
		pages = newPages;
	}

	function openMenu(newPage: string) {
		pages = [...pages, newPage];
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
</script>

<Command.Root
	onKeydown={keyDown}
	shouldFilter={false}
	label="Menu"
	data-open={open ? "true" : "false"}
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
		/>
	</div>
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>

		{#if !page}
			<Command.Group heading="Actions">
				<Command.Item>
					<MagnifyingGlass />
					Search
				</Command.Item>
				<Command.Item>
					<ArrowSquareOut />
					Open URL
				</Command.Item>
			</Command.Group>
			<Command.Group heading="Recent">
				<Command.Item>
					<Globe />
					https://example.com
				</Command.Item>
				<Command.Item>
					<Globe />
					https://www.google.com
				</Command.Item>
				<Command.Item>
					<Globe />
					https://discord.gg/unblock
				</Command.Item>
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
				<Command.Item>
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
				<Command.Item>
					<img src={ultravioletLogo} draggable={false} alt="Ultraviolet" />
					Ultraviolet
				</Command.Item>
				<Command.Item>
					<img src={rammerheadLogo} draggable={false} alt="Rammerhead" />
					Rammerhead
				</Command.Item>
			</Command.Group>
		{/if}
	</Command.List>
</Command.Root>
