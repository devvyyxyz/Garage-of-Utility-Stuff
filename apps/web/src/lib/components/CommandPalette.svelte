<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Dialog } from 'bits-ui';
	import { Search, Command } from '@lucide/svelte';
	import { searchTools } from '#lib/tools';

	let { open = $bindable(false) } = $props();
	let query = $state('');
	let inputEl = $state<HTMLInputElement | undefined>();
	let activeIndex = $state(0);

	const results = $derived(searchTools(query));

	$effect(() => {
		if (open) inputEl?.focus();
	});

	onMount(() => {
		const handler = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				open = !open;
			}
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	});

	$effect(() => {
		// reset active index when results change
		activeIndex = 0;
		// avoid unused
		void results.length;
	});

	function pick(href: string) {
		open = false;
		query = '';
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(href);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			activeIndex = Math.min(activeIndex + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			activeIndex = Math.max(activeIndex - 1, 0);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			const t = results[activeIndex];
			if (t) pick(t.href);
		}
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
		<Dialog.Content
			class="fixed top-[15%] left-1/2 z-50 w-full max-w-xl -translate-x-1/2 rounded-xl border border-border bg-card shadow-2xl outline-none"
			onkeydown={onKeydown}
		>
			<div class="flex items-center gap-2 border-b border-border px-4 py-3">
				<Search class="h-4 w-4 text-muted-foreground" />
				<input
					bind:this={inputEl}
					bind:value={query}
					placeholder="Search tools, actions, settings…"
					class="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
				/>
				<kbd
					class="hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline"
				>
					Esc
				</kbd>
			</div>

			<div class="max-h-[60vh] overflow-y-auto p-2">
				{#if results.length === 0}
					<div class="px-3 py-8 text-center text-sm text-muted-foreground">No tools found.</div>
				{:else}
					<ul class="space-y-0.5">
						{#each results as t, i (t.id)}
							<li>
								<button
									type="button"
									onclick={() => pick(t.href)}
									class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors {i ===
									activeIndex
										? 'bg-accent text-accent-foreground'
										: 'hover:bg-accent/60'}"
								>
									<t.icon class="h-4 w-4 shrink-0 text-muted-foreground" />
									<div class="min-w-0 flex-1">
										<div class="truncate text-sm font-medium">{t.name}</div>
										<div class="truncate text-xs text-muted-foreground">{t.description}</div>
									</div>
									<span class="text-[10px] tracking-wide text-muted-foreground uppercase">
										{t.category}
									</span>
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<div
				class="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground"
			>
				<span class="flex items-center gap-1"><Command class="h-3 w-3" /> K to toggle</span>
				<span>↑↓ navigate · Enter open</span>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
