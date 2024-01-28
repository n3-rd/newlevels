<script lang="ts">
	import type { WithId, Document } from 'mongodb';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';

	import ProductCard from '$lib/components/ProductCard.svelte';
	import EmptyCategory from '$lib/components/EmptyCategory.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
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

	let val = '';
	let timer: string | number | NodeJS.Timeout | undefined;

	const debounce = (v: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			val = v;
		}, 750);
	};

	let filteredProducts: WithId<Document>[];

	$: {
		products = data.products;
		filteredProducts = products;
		console.log(products);
	}
</script>

<svelte:head>
	<title>Newlevels | Shop</title>
</svelte:head>

<main class="px-6 pt-4">
	<Tabs.Root value="all" class="w-full">
		<div class="flex w-screen flex-col items-center justify-center gap-3">
			<Tabs.List>
				{#each categories as category}
					<Tabs.Trigger value={category.value}>{category.name}</Tabs.Trigger>
				{/each}
			</Tabs.List>

			<Input
				type="search"
				placeholder="Search"
				class="w-1/3"
				bind:value={val}
				on:input={(e) => {
					debounce(val);
					filteredProducts = products.filter((product) => {
						return product.title.toLowerCase().includes(val.toLowerCase());
					});
				}}
			/>
		</div>
		<Tabs.Content value="all">
			<ul
				class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
			>
				{#each filteredProducts as product}
					<ProductCard {product} />
				{/each}
			</ul>
		</Tabs.Content>

		{#each categories as category}
			<Tabs.Content value={category.value} class="w-full">
				<ul
					class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
				>
					{#each filteredProducts as product}
						{#if product.category == category.name}
							<ProductCard {product} />
						{/if}
					{/each}
				</ul>
			</Tabs.Content>
		{/each}
	</Tabs.Root>
</main>
