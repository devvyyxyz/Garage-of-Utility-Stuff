<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ToolCard from '#lib/components/ToolCard.svelte';
	import { toolsByCategory } from '#lib/tools';

	const groups = toolsByCategory();
</script>

<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
	<div class="mb-6">
		<h1 class="text-2xl font-bold tracking-tight sm:text-3xl">All utilities</h1>
		<p class="mt-1 text-sm text-muted-foreground">Browse every tool installed in this instance.</p>
	</div>

	<div class="space-y-8">
		{#each groups as g (g.category)}
			<section>
				<h2 class="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
					{g.category}
				</h2>
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each g.tools as t (t.id)}
						<ToolCard tool={t} />
					{/each}
				</div>
			</section>
		{/each}
	</div>

	<div class="mt-8">
		<button
			type="button"
			onclick={() => goto(resolve('/'))}
			class="text-sm text-muted-foreground hover:text-foreground"
		>
			← Back home
		</button>
	</div>
</div>
