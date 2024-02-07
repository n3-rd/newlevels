<script>
	import { storedUser } from '$lib/stores';
	import { getAuth } from 'firebase/auth';
	import * as Avatar from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';
	import { PencilIcon } from 'lucide-svelte';

	const auth = getAuth();
	const user = auth.currentUser;

	console.log(user);

	/**
	 * @type {string | undefined}
	 */
	let email;
	/**
	 * @type {string}
	 */
	let name;
	/**
	 * @type {number | undefined}
	 */
	let phoneNumber;
	/**
	 * @type {string | undefined}
	 */
	let location;
	/**
	 * @type {string}
	 */
	let photoURL;

	storedUser.set({
		email: user?.email,
		name: user?.displayName,
		phoneNumber: user?.phoneNumber,
		location: user?.location,
		photoURL: user?.photoURL
	});

	$: {
		email = $storedUser?.email;
		name = $storedUser?.name;
		phoneNumber = $storedUser?.phoneNumber;
		location = $storedUser?.location;
		photoURL = $storedUser?.photoURL;
	}
</script>

<div class="mt-10 flex min-h-[80vh] w-screen flex-col items-center gap-4">
	<!-- update profile button -->
	<Button
		class="flex items-center gap-3 rounded-md bg-blue-500 px-4 py-2 text-white"
		on:click={() => {
			console.log('update profile');
		}}
	>
		<div class="icon">
			<PencilIcon />
		</div>
		<span>Update Profile</span>
	</Button>
	<div class="image">
		{#if photoURL}
			<Avatar.Root class="h-44 w-44">
				<Avatar.Image src={photoURL} alt="@shadcn" />
				<Avatar.Fallback>{name}</Avatar.Fallback>
			</Avatar.Root>
		{:else}
			<Avatar.Root class="h-44 w-44">
				<Avatar.Image
					src={`https://ui-avatars.com/api/?name=${name}&background=random`}
					alt="@shadcn"
				/>
				<Avatar.Fallback>Error</Avatar.Fallback>
			</Avatar.Root>
		{/if}
	</div>
	<div class="info text-center">
		{#if name}
			<h1 class="text-4xl font-bold">{name}</h1>
		{/if}
		{#if email}
			<p class="text-lg">{email}</p>
		{/if}
		{#if phoneNumber}
			<p class="text-lg font-semibold">{phoneNumber}</p>
		{/if}
		{#if location}
			<p class="text-lg font-semibold">{location}</p>
		{/if}
	</div>
</div>

<div class="user-products px-4 pt-10">
	<h2 class="text-5xl font-bold">User Products</h2>
</div>
