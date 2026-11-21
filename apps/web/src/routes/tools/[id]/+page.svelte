<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { findTool } from '#lib/tools';
	import { ArrowLeft } from '@lucide/svelte';

	const id = $derived(page.params.id ?? '');
	const tool = $derived(findTool(id));
</script>

<div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
	<button
		type="button"
		onclick={() => goto(resolve('/tools'))}
		class="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
	>
		<ArrowLeft class="h-4 w-4" /> Back to tools
	</button>

	{#if tool}
		<div class="rounded-xl border border-border bg-card p-6 shadow-sm">
			<div class="flex items-center gap-3">
				<div
					class="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary"
				>
					<tool.icon class="h-6 w-6" />
				</div>
				<div>
					<h1 class="text-2xl font-bold tracking-tight">{tool.name}</h1>
					<p class="text-sm text-muted-foreground">{tool.description}</p>
				</div>
			</div>

			<div
				class="mt-6 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground"
			>
				Tool UI goes here. This is a placeholder for <code class="rounded bg-muted px-1.5 py-0.5">
					{tool.id}
				</code>.
			</div>
		</div>
	{:else}
		<div class="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground">
			Unknown tool: <code class="rounded bg-muted px-1.5 py-0.5">{id}</code>
		</div>
	{/if}
</div>
