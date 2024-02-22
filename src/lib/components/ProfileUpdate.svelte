<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { updateProfileInfo } from '$lib/helpers/helpers';
	import Button from './ui/button/button.svelte';

	export let name: string | undefined;
	export let phone: number | undefined;
	export let location: string | undefined;
	export let id: number;

	const submit = async () => {
		updateProfileInfo(id, name, location, phone);
	};
</script>

<Dialog.Header>
	<Dialog.Title>Edit profile</Dialog.Title>
	<Dialog.Description>
		Make changes to your profile here. Click save when you're done.
	</Dialog.Description>
</Dialog.Header>
<div class="grid gap-4 py-4">
	<div class="grid grid-cols-4 items-center gap-4">
		<Label class="text-right">Name</Label>
		<Input id="name" bind:value={name} class="col-span-3" />
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label class="text-right">phone</Label>
		<Input id="username" bind:value={phone} type="tel" class="col-span-3" />
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label class="text-right">Location</Label>
		<Input id="location" bind:value={location} class="col-span-3" />
	</div>
</div>
<Dialog.Footer>
	<Button type="submit" on:click={submit}>Save changes</Button>
</Dialog.Footer>
