<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Select from '$lib/components/ui/select';

	const categories = [
		{ value: 'Bags', label: 'bags' },
		{ value: 'Jobs', label: 'jobs' },
		{ value: 'Electronics', label: 'electronics' },
		{ value: 'Beauty', label: 'beauty' },
		{ value: 'Fashion', label: 'fashion' },
		{ value: 'Services', label: 'services' },
		{ value: 'Misc', label: 'misc' }
	];
</script>

<div class="flex h-full w-screen items-center justify-center">
	<div class="mt-10 flex w-1/2 flex-col items-center gap-4">
		<Card.Root class="w-full">
			<Card.Header>
				<Card.Title>Upload a product</Card.Title>
				<!-- <Card.Description>Card Description</Card.Description> -->
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				<div
					class="product-image
                    flex h-96 w-full items-center justify-center rounded-md bg-gray-200"
				></div>

				<Separator />

				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-2">
						<label for="name">Product Name</label>
						<input
							type="text"
							name="name"
							id="name"
							class="w-full rounded-md border border-gray-300 px-4 py-2"
						/>
					</div>

					<div class="flex flex-col gap-2">
						<label for="price">Price</label>
						<input
							type="number"
							name="price"
							id="price"
							class="w-full rounded-md border border-gray-300 px-4 py-2"
						/>
					</div>

					<div class="flex flex-col gap-2">
						<label for="description">Description</label>
						<textarea
							name="description"
							id="description"
							class="w-full rounded-md border border-gray-300 px-4 py-2"
						></textarea>
					</div>

					<div class="flex flex-col gap-2">
						<Select.Root portal={null}>
							<Select.Trigger class="w-[180px]">
								<Select.Value placeholder="Select a category" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Fruits</Select.Label>
									{#each categories as category}
										<Select.Item value={category.value} label={category.label}
											>{category.label}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
							<Select.Input name="category" id="category" />
						</Select.Root>
					</div>

					<div class="flex flex-col gap-2">
						<label for="quantity">Quantity</label>
						<input
							type="number"
							name="quantity"
							id="quantity"
							class="w-full rounded-md border border-gray-300 px-4 py-2"
						/>
					</div>

					<div class="flex flex-col gap-2">
						<label for="image">Image</label>
						<input
							type="file"
							name="image"
							id="image"
							class="w-full rounded-md border border-gray-300 px-4 py-2"
						/>
					</div>
				</div></Card.Content
			>
			<Card.Footer>
				<p>Card Footer</p>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
