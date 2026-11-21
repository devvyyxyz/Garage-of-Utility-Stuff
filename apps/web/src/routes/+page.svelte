<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import { cubicOut, elasticOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ToolCard from '#lib/components/ToolCard.svelte';
	import { pinnedTools, recentTools, TOOLS } from '#lib/tools';
	import { Upload, Activity, HardDrive, Cpu, Sparkles } from '@lucide/svelte';

	const pinned = pinnedTools();
	const recent = recentTools();

	let mounted = $state(false);
	let dragOver = $state(false);

	onMount(() => {
		mounted = true;
	});

	function onDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		// Routing a dropped file to the right utility is wired up per-tool later.
	}
</script>

<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
	{#if mounted}
		<!-- welcome + drop zone -->
		<section in:fly={{ y: 16, duration: 500, easing: cubicOut }} class="mb-8">
			<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Welcome to your garage</h1>
					<p class="mt-1 text-sm text-muted-foreground">
						{TOOLS.length} utilities ready. Press
						<kbd class="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">⌘K</kbd> to jump
						anywhere.
					</p>
				</div>
			</div>

			<!-- global drop zone -->
			<div
				role="region"
				aria-label="Drop files here"
				ondragover={(e) => {
					e.preventDefault();
					dragOver = true;
				}}
				ondragleave={() => (dragOver = false)}
				ondrop={onDrop}
				class="mt-4 flex h-32 items-center justify-center rounded-xl border-2 border-dashed transition-colors {dragOver
					? 'border-primary bg-primary/5'
					: 'border-border bg-card/40'}"
			>
				<div class="flex items-center gap-3 text-sm text-muted-foreground">
					<Upload class="h-5 w-5" />
					<span>Drop a file here to pick the right utility</span>
				</div>
			</div>
		</section>

		<!-- pinned -->
		<section in:fly={{ y: 16, duration: 500, delay: 80, easing: cubicOut }} class="mb-8">
			<div class="mb-3 flex items-center justify-between">
				<h2 class="text-lg font-semibold tracking-tight">Pinned</h2>
				<button
					type="button"
					onclick={() => goto(resolve('/tools'))}
					class="text-sm text-muted-foreground hover:text-foreground"
				>
					Browse all →
				</button>
			</div>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each pinned as t (t.id)}
					<div in:scale={{ duration: 400, delay: 120, start: 0.95, easing: elasticOut }}>
						<ToolCard tool={t} />
					</div>
				{/each}
			</div>
		</section>

		<!-- recents + system -->
		<section class="grid gap-4 lg:grid-cols-3">
			<div
				in:fly={{ y: 16, duration: 500, delay: 160, easing: cubicOut }}
				class="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2"
			>
				<div class="mb-3 flex items-center gap-2">
					<Activity class="h-4 w-4 text-muted-foreground" />
					<h2 class="font-semibold">Recent</h2>
				</div>
				<ul class="divide-y divide-border">
					{#each recent as t (t.id)}
						<li>
							<button
								type="button"
								onclick={() =>
									// eslint-disable-next-line svelte/no-navigation-without-resolve
									goto(t.href)}
								class="flex w-full items-center gap-3 py-2.5 text-left transition-colors hover:text-foreground"
							>
								<t.icon class="h-4 w-4 text-muted-foreground" />
								<span class="flex-1 truncate text-sm">{t.name}</span>
								<span class="text-xs text-muted-foreground">{t.category}</span>
							</button>
						</li>
					{/each}
				</ul>
			</div>

			<div
				in:fly={{ y: 16, duration: 500, delay: 240, easing: cubicOut }}
				class="rounded-xl border border-border bg-card p-5 shadow-sm"
			>
				<div class="mb-3 flex items-center gap-2">
					<HardDrive class="h-4 w-4 text-muted-foreground" />
					<h2 class="font-semibold">System</h2>
				</div>
				<dl class="space-y-2 text-sm">
					<div class="flex justify-between">
						<dt class="text-muted-foreground">CPU</dt>
						<dd class="font-medium">12%</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-muted-foreground">Memory</dt>
						<dd class="font-medium">3.2 / 16 GB</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-muted-foreground">Disk</dt>
						<dd class="font-medium">48 / 500 GB</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-muted-foreground">Utilities</dt>
						<dd class="font-medium">{TOOLS.length} installed</dd>
					</div>
				</dl>
				<div
					class="mt-4 flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground"
				>
					<Cpu class="h-3.5 w-3.5" />
					<span>v0.1.0 · local instance</span>
				</div>
			</div>
		</section>

		<!-- tip -->
		<div
			in:fly={{ y: 16, duration: 500, delay: 320, easing: cubicOut }}
			class="mt-8 flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground"
		>
			<Sparkles class="h-4 w-4 text-primary" />
			<span>
				Tip: pin your most-used utilities from the sidebar. They'll show up here as cards.
			</span>
		</div>
	{/if}
</div>
