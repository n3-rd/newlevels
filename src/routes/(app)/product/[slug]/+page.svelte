<script lang="ts">
	import type { WithId, Document } from 'mongodb';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	export let data: PageData;
	let product: { image: { url: any }; title: any; description: any };

	$: {
		product = data.product;
		console.log(data);
	}
</script>

<main class="px-6">
	<h1 class="mb-4 text-3xl font-bold">Product</h1>
	<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
		<Card.Root class="overflow-hidden rounded-lg shadow-lg">
			<Card.Content class="px-0">
				<img
					src={product.image.url}
					alt={product.title}
					class="
                        h-48
                        w-full
                        object-cover
                        object-center
                    "
				/>
			</Card.Content>
			<Card.Footer class="flex flex-col gap-3 p-4">
				<Card.Title class="text-xl font-bold">{product.title}</Card.Title>
				<Card.Description class="text-gray-600">{product.description}</Card.Description>
			</Card.Footer>
		</Card.Root>
	</ul>
</main>
