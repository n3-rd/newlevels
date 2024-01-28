<script lang="ts">
	import type { WithId, Document } from 'mongodb';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MapPin, Skull } from 'lucide-svelte';
	export let data: PageData;
	let products: WithId<Document>[];
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	$: {
		products = data.products;
	}
</script>

<svelte:head>
	<title>Newlevels | Shop</title>
</svelte:head>

<main class="px-6 pt-4">
	<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
		{#each products as product}
			<a href={`/product/${product._id}`} class="h-full">
				<Card.Root class="flex h-full flex-col overflow-hidden rounded-xl shadow-lg">
					<Card.Content class="flex-grow px-0">
						<img
							src={product.image.url}
							alt={product.title}
							class="h-[20rem] w-full rounded-xl object-cover object-center"
						/>
					</Card.Content>
					<Card.CardContent class="flex flex-col gap-2 p-4">
						<Card.Title class="text-xl font-medium capitalize tracking-wide"
							>{product.title}</Card.Title
						>
						<Card.Description class="text-1xl font-semibold text-gray-600"
							>{product.seller_name}</Card.Description
						>
						<Card.Description class="flex gap-2 capitalize text-gray-600">
							<MapPin class="h-5 w-5" />
							<div>
								{product.location}
							</div>
						</Card.Description>
						<Card.Description class="flex gap-2 text-xl font-semibold text-gray-600">
							<!-- naira sign -->
							&#8358;
							<div>
								{formatter.format(product.price)}
							</div>
						</Card.Description>
						<Button class="rounded bg-black px-4 py-2 font-bold text-white hover:bg-slate-800">
							Details
						</Button>
					</Card.CardContent>
				</Card.Root>
			</a>
		{/each}
	</ul>
</main>
