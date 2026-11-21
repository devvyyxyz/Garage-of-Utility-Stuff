<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
</script>

<div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
	<h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
	<p class="mt-1 text-sm text-muted-foreground">Instance configuration and preferences.</p>

	<div class="mt-6 space-y-4">
		<div class="rounded-xl border border-border bg-card p-5 shadow-sm">
			<h2 class="font-semibold">Appearance</h2>
			<p class="mt-1 text-sm text-muted-foreground">Toggle between light and dark themes.</p>
			<div class="mt-3"><ThemeToggle /></div>
		</div>

		<div class="rounded-xl border border-border bg-card p-5 shadow-sm">
			<h2 class="font-semibold">About</h2>
			<p class="mt-1 text-sm text-muted-foreground">GUS v0.1.0 · self-hosted instance</p>
		</div>
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
