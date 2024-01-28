<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MapPin } from 'lucide-svelte';

	export let product: {
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

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
</script>

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
			<Card.Title class="text-xl font-medium capitalize tracking-wide">{product.title}</Card.Title>
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
