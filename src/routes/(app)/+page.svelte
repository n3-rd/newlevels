<script lang="ts">
	import type { WithId, Document } from 'mongodb';
	import type { PageData } from './$types';
	import * as Tabs from '$lib/components/ui/tabs';

	import ProductCard from '$lib/components/ProductCard.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import EmptyCategory from '$lib/components/EmptyComponent.svelte';
	import EmptyComponent from '$lib/components/EmptyComponent.svelte';

	export let data: PageData;
	// export let form;

	let products: [
		{
			_id: string;
			checked: boolean;
			featured: boolean;
			sold: number;
			seller_id: string;
			product_id: string;
			title: string;
			price: number;
			description: string;
			image: {
				success: boolean;
				public_id: string;
				url: string;
			};
			category: string;
			condition: number;
			seller_name: string;
			phone: number;
			location: string;
			createdAt: string;
			updatedAt: string;
			__v: number;
		}
	];
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

	const search = async (v: string) => {
		if (v) {
			const res = await fetch(`${PUBLIC_API_ENDPOINT}products/search/${v}`);
			const data = await res.json();
			filteredProducts = data;
		} else {
			filteredProducts = products;
		}
	};

	let filteredProducts: [];

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
				name="search"
				class="w-1/3"
				bind:value={val}
				on:input={() => {
					debounce(val);
					search(val);
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
			<!-- check if category is empty -->

			<Tabs.Content value={category.value} class="w-full">
				<ul
					class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
				>
					{#if filteredProducts.length > 0}
						{#each filteredProducts as product}
							{#if product.category == category.name}
								<ProductCard {product} />
							{/if}
						{/each}
					{:else}
						<EmptyComponent title="oh no!" subtitle="No products found" />
					{/if}
				</ul>
			</Tabs.Content>
		{/each}
	</Tabs.Root>
</main>
