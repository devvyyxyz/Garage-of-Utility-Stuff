<script lang="ts">
	import { onMount } from 'svelte';
	import { Sun, Moon } from '@lucide/svelte';

	let isDark = $state(false);

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggle() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			try {
				localStorage.setItem('gus-theme', 'dark');
			} catch {
				/* ignore */
			}
		} else {
			document.documentElement.classList.remove('dark');
			try {
				localStorage.setItem('gus-theme', 'light');
			} catch {
				/* ignore */
			}
		}
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label="Toggle theme"
	class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
>
	{#if isDark}
		<Sun class="h-4 w-4" />
	{:else}
		<Moon class="h-4 w-4" />
	{/if}
</button>
