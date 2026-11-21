<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { Menu } from '@lucide/svelte';
	import Sidebar from '#lib/components/Sidebar.svelte';
	import CommandPalette from '#lib/components/CommandPalette.svelte';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	let collapsed = $state(false);
	let mobileOpen = $state(false);
	let paletteOpen = $state(false);

	onMount(() => {
		try {
			collapsed = localStorage.getItem('gus:sidebar-collapsed') === '1';
		} catch {
			/* ignore */
		}
	});

	$effect(() => {
		try {
			localStorage.setItem('gus:sidebar-collapsed', collapsed ? '1' : '0');
		} catch {
			/* ignore */
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Garage of Utility Stuff (GUS)</title>
	<meta name="description" content="A self-hosted utility panel. Runs on your own hardware." />
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<Sidebar bind:collapsed bind:mobileOpen />

	<!-- main column -->
	<div
		class="flex min-h-screen flex-col transition-[margin] duration-200 md:ml-64 {collapsed
			? 'md:ml-16'
			: 'md:ml-64'}"
	>
		<header
			class="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur"
		>
			<button
				type="button"
				onclick={() => (mobileOpen = true)}
				aria-label="Open menu"
				class="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
			>
				<Menu class="h-5 w-5" />
			</button>

			<div class="flex flex-1 items-center gap-2">
				<button
					type="button"
					onclick={() => (paletteOpen = true)}
					class="hidden items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent sm:flex"
				>
					<span>Search tools…</span>
					<kbd class="rounded border border-border bg-background px-1.5 py-0.5 text-[10px]">⌘K</kbd>
				</button>
			</div>

			<ThemeToggle />
		</header>

		<main class="flex-1">
			{@render children()}
		</main>
	</div>
</div>

<!-- global command palette -->
<CommandPalette bind:open={paletteOpen} />
