<script lang="ts">
	import type { WithId, Document } from 'mongodb';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';

	import ProductCard from '$lib/components/ProductCard.svelte';
	import EmptyCategory from '$lib/components/EmptyCategory.svelte';
	export let data: PageData;
	let products: WithId<Document>[];
	let categories = [
		{ name: 'All', value: 'all' },
		{ name: 'Bags', value: 'bags' },
		{ name: 'Jobs', value: 'jobs' },
		{ name: 'Electronics', value: 'electronics' },
		{ name: 'Beauty', value: 'beauty' },
		{ name: 'Fashion', value: 'fashion' },
		{ name: 'Services', value: 'services' },
		{ name: 'Misc', value: 'misc' }
	];
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	$: {
		products = data.products;
		console.log(products);
	}
</script>

<svelte:head>
	<title>Newlevels | Shop</title>
</svelte:head>

<main class="px-6 pt-4">
	<Tabs.Root value="all" class="w-full">
		<div class="flex w-screen items-center justify-center">
			<Tabs.List>
				{#each categories as category}
					<Tabs.Trigger value={category.value}>{category.name}</Tabs.Trigger>
				{/each}
			</Tabs.List>
		</div>
		<Tabs.Content value="all">
			<ul
				class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
			>
				{#each products as product}
					<ProductCard {product} />
				{/each}
			</ul>
		</Tabs.Content>

		{#each categories as category}
			<Tabs.Content value={category.value} class="w-full">
				<ul
					class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
				>
					{#each products as product}
						{#if product.category == category.name}
							<!-- Corrected this line -->
							<ProductCard {product} />
						{/if}
					{/each}
				</ul>
			</Tabs.Content>
		{/each}
	</Tabs.Root>
</main>
