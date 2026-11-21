<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Tool } from '#lib/tools';

	let { tool }: { tool: Tool } = $props();

	const statusColor: Record<string, string> = {
		ok: 'bg-emerald-500',
		warn: 'bg-amber-500',
		error: 'bg-red-500'
	};
</script>

<button
	type="button"
	onclick={() =>
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(tool.href)}
	class="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
>
	<div class="flex items-center justify-between">
		<div
			class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
		>
			<tool.icon class="h-5 w-5" />
		</div>
		<span class="h-2 w-2 rounded-full {statusColor[tool.status ?? 'ok']}"></span>
	</div>
	<div>
		<h3 class="font-semibold">{tool.name}</h3>
		<p class="mt-1 text-sm text-muted-foreground">{tool.description}</p>
	</div>
	<span class="mt-auto text-xs text-muted-foreground">{tool.category}</span>
</button>
