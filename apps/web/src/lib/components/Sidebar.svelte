<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { ChevronLeft, ChevronRight, Pin, Clock, Folder, Settings } from '@lucide/svelte';
	import { pinnedTools, recentTools, toolsByCategory } from '#lib/tools';

	let { collapsed = $bindable(false), mobileOpen = $bindable(false) } = $props();

	const pinned = pinnedTools();
	const recent = recentTools();
	const groups = toolsByCategory();

	let openGroups = $state<Record<string, boolean>>(
		Object.fromEntries(groups.map((g) => [g.category, true]))
	);

	function toggleGroup(c: string) {
		openGroups[c] = !openGroups[c];
	}

	function nav(href: string) {
		mobileOpen = false;
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(href);
	}

	const statusColor: Record<string, string> = {
		ok: 'bg-emerald-500',
		warn: 'bg-amber-500',
		error: 'bg-red-500'
	};
</script>

<!-- mobile backdrop -->
{#if mobileOpen}
	<button
		type="button"
		aria-label="Close menu"
		class="fixed inset-0 z-40 bg-black/50 md:hidden"
		onclick={() => (mobileOpen = false)}
	></button>
{/if}

<aside
	class="fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-200
		{mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
		{collapsed ? 'w-16' : 'w-64'}"
>
	<!-- header -->
	<div class="flex h-14 items-center justify-between border-b border-border px-3">
		{#if !collapsed}
			<a href={resolve('/')} class="flex items-center gap-2 font-semibold tracking-tight">
				<span
					class="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground"
				>
					{@render WrenchIcon()}
				</span>
				<span>GUS</span>
			</a>
		{:else}
			<span
				class="mx-auto flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground"
			>
				{@render WrenchIcon()}
			</span>
		{/if}
		<button
			type="button"
			onclick={() => (collapsed = !collapsed)}
			aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
			class="hidden h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground md:flex"
		>
			{#if collapsed}<ChevronRight class="h-4 w-4" />{:else}<ChevronLeft class="h-4 w-4" />{/if}
		</button>
	</div>

	<!-- scrollable nav -->
	<nav
		class="flex-1 [scrollbar-width:none] overflow-y-auto px-2 py-3 text-sm [&::-webkit-scrollbar]:hidden"
	>
		<!-- pinned -->
		{#if pinned.length}
			<div class="mb-4">
				{#if !collapsed}
					<div
						class="mb-1 flex items-center gap-1.5 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase"
					>
						<Pin class="h-3 w-3" /> Pinned
					</div>
				{/if}
				<ul class="space-y-0.5">
					{#each pinned as t (t.id)}
						<li>
							<button
								type="button"
								onclick={() => nav(t.href)}
								title={collapsed ? t.name : undefined}
								class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent hover:text-accent-foreground {collapsed
									? 'justify-center'
									: ''}"
							>
								<t.icon class="h-4 w-4 shrink-0 text-muted-foreground" />
								{#if !collapsed}
									<span class="truncate">{t.name}</span>
									<span class="ml-auto h-1.5 w-1.5 rounded-full {statusColor[t.status ?? 'ok']}"
									></span>
								{/if}
							</button>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<!-- recents -->
		{#if recent.length}
			<div class="mb-4">
				{#if !collapsed}
					<div
						class="mb-1 flex items-center gap-1.5 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase"
					>
						<Clock class="h-3 w-3" /> Recent
					</div>
				{/if}
				<ul class="space-y-0.5">
					{#each recent as t (t.id)}
						<li>
							<button
								type="button"
								onclick={() => nav(t.href)}
								title={collapsed ? t.name : undefined}
								class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent hover:text-accent-foreground {collapsed
									? 'justify-center'
									: ''}"
							>
								<t.icon class="h-4 w-4 shrink-0 text-muted-foreground" />
								{#if !collapsed}<span class="truncate">{t.name}</span>{/if}
							</button>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<!-- categories -->
		{#if !collapsed}
			<div
				class="mb-1 flex items-center gap-1.5 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase"
			>
				<Folder class="h-3 w-3" /> Categories
			</div>
		{/if}
		{#each groups as g (g.category)}
			<div class="mb-2">
				{#if !collapsed}
					<button
						type="button"
						onclick={() => toggleGroup(g.category)}
						class="flex w-full items-center justify-between rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
					>
						<span>{g.category}</span>
						<span class="text-[10px]">{openGroups[g.category] ? '−' : '+'}</span>
					</button>
				{/if}
				{#if collapsed || openGroups[g.category]}
					<ul class="space-y-0.5 {collapsed ? '' : 'mt-1'}">
						{#each g.tools as t (t.id)}
							<li>
								<button
									type="button"
									onclick={() => nav(t.href)}
									title={collapsed ? t.name : undefined}
									class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent hover:text-accent-foreground {collapsed
										? 'justify-center'
										: ''}"
								>
									<t.icon class="h-4 w-4 shrink-0 text-muted-foreground" />
									{#if !collapsed}
										<span class="truncate">{t.name}</span>
										<span class="ml-auto h-1.5 w-1.5 rounded-full {statusColor[t.status ?? 'ok']}"
										></span>
									{/if}
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</nav>

	<!-- footer -->
	<div class="border-t border-border p-2">
		<button
			type="button"
			onclick={() => nav('/settings')}
			title={collapsed ? 'Settings' : undefined}
			class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground {collapsed
				? 'justify-center'
				: ''}"
		>
			<Settings class="h-4 w-4 shrink-0" />
			{#if !collapsed}<span>Settings</span>{/if}
		</button>
	</div>
</aside>

{#snippet WrenchIcon()}
	<svg
		viewBox="0 0 24 24"
		class="h-4 w-4"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path
			d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
		/>
	</svg>
{/snippet}
