<script>
	import { userStore } from 'sveltefire';
	import { auth } from '$lib/firebase'; // your firebase auth instance
	import { getUser } from '$lib/helpers/helpers';
	import Button from '$lib/components/ui/button/button.svelte';
	import { PencilIcon } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar';

	const user = userStore(auth);
	console.log($user);
	const getUserData = async () => {
		const data = await getUser($user.uid);
		console.log('userdata', data);
		return data;
	};
	/**
	 * @type {Promise<any>}
	 */
	let userData;
	if ($user) {
		userData = getUserData();
	}
</script>

{#if $user}
	{#await userData}
		<div class="flex h-screen items-center justify-center">
			<div
				class="loader h-64 w-64 rounded-full border-8 border-t-8 border-gray-200 ease-linear"
			></div>
		</div>
	{:then userData}
		{#if userData}
			<div class="mt-10 flex min-h-[80vh] w-screen flex-col items-center gap-4">
				<!-- update profile button -->
				<a href="/profile/edit">
					<Button class="flex items-center gap-3 rounded-md bg-blue-500 px-4 py-2 text-white">
						<div class="icon">
							<PencilIcon />
						</div>
						<span>Update Profile</span>
					</Button>
				</a>

				<div class="image">
					{#if $user.photoURL}
						<Avatar.Root class="h-44 w-44">
							<Avatar.Image src={$user.photoURL} alt="@shadcn" />
							<Avatar.Fallback>{userData.name}</Avatar.Fallback>
						</Avatar.Root>
					{:else}
						<Avatar.Root class="h-44 w-44">
							<Avatar.Image
								src={`https://ui-avatars.com/api/?name=${userData.name}&background=random`}
								alt="@shadcn"
							/>
							<Avatar.Fallback>Error</Avatar.Fallback>
						</Avatar.Root>
					{/if}
				</div>
				<div class="info text-center">
					{#if userData.name}
						<h1 class="text-4xl font-bold">{userData.name}</h1>
					{/if}
					{#if userData.email}
						<p class="text-lg">{userData.email}</p>
					{/if}
					{#if userData.phoneNumber}
						<p class="text-lg font-semibold">{userData.phoneNumber}</p>
					{/if}
					{#if userData.location}
						<p class="text-lg font-semibold">{userData.location}</p>
					{/if}
				</div>
			</div>
		{/if}
	{:catch error}
		<p>{error.message}</p>
	{/await}
{/if}
