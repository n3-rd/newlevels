<script lang="ts">
	import type { WithId, Document } from 'mongodb';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { MapPin } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	export let data: PageData;
	let product: {
		image: { url: string };
		title: string;
		description: string;
		location: string;
		price: number;
		seller_name: string;
		_id: string;
		condition: number;
		category: string;
		phone: number;
	};
	let similarProducts: WithId<Document>[];
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	$: {
		product = data.product;
		similarProducts = data.similarProducts;
		similarProducts = similarProducts.filter((p) => p._id !== product._id);
		console.log(similarProducts);
	}
</script>

<svelte:head>
	<title>{product.title}</title>
</svelte:head>

<main class="px-6">
	<div class="min-w-screen flex h-[90vh] flex-col md:flex-row">
		<div class="flex h-full flex-col items-center justify-center md:w-1/2">
			<img
				src={product.image.url}
				alt={product.title}
				class="
					h-64
					w-64
					object-cover
					object-center
					md:h-96
					md:w-96
				"
			/>
		</div>
		<div class="flex h-full flex-col items-center justify-center gap-8 md:w-1/2">
			<div class="flex flex-col text-center">
				<h1 class="text-4xl font-bold md:text-6xl lg:text-6xl">{product.title}</h1>
				<p class="text-xl font-semibold text-gray-600 md:text-xl">{product.description}</p>
			</div>
			<div class="flex flex-col items-center justify-center gap-4">
				<div class="flex gap-2 capitalize text-gray-600">
					category: {product.category}
				</div>
				<div class="flex gap-2 capitalize text-gray-600">
					Posted by: {product.seller_name}
				</div>
				<div class="flex gap-2 capitalize text-gray-600">
					condition: {product.condition}/5
				</div>
				<div class="flex gap-2 capitalize text-gray-600">
					<MapPin class="h-5 w-5" />
					<div>
						{product.location}
					</div>
				</div>
				<div class="flex gap-2 text-xl font-semibold text-gray-600 md:text-xl">
					<!-- naira sign -->
					&#8358;
					<div>
						{formatter.format(product.price)}
					</div>
				</div>
				<a
					href={`tel:+234${product.phone}`}
					class="flex gap-2 text-xl font-semibold text-gray-600 md:text-xl"
				>
					<Button class="rounded bg-black px-4 py-2 font-bold text-white hover:bg-slate-800">
						Contact Seller
					</Button>
				</a>
			</div>
		</div>
	</div>
	{#if similarProducts.length > 0}
		<h1 class="mb-4 text-3xl font-bold">Similar Products</h1>
		<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
			{#each similarProducts as product}
				<ProductCard {product} />
			{/each}
		</ul>
	{/if}
</main>
