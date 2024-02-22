<script lang="ts">
	import { userStore } from 'sveltefire';
	import { auth } from '$lib/firebase'; // your firebase auth instance
	import { getUser } from '$lib/helpers/helpers';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Button from '$lib/components/ui/button/button.svelte';

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
	let userData: Promise<any>;
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
			<div class="page min-w-screen flex min-h-screen items-center justify-center">
				<Card.Root class="w-80">
					<Card.Header>
						<Card.Title>Edit profile</Card.Title>
						<Card.Description>Update your profile information</Card.Description>
					</Card.Header>
					<Card.Content class="flex flex-col items-center gap-4">
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
						<form method="POST" action="?/edit-user" class="flex flex-col items-center gap-4">
							<div class="form-input">
								<Input
									placeholder="Id SHOULD BE HIDDEN!!!!"
									value={userData.firebaseId}
									id="id"
									name="id"
									class="hidden w-full"
								/>
								<Input
									placeholder="Id SHOULD BE HIDDEN!!!!"
									value={userData.role}
									id="role"
									name="role"
									type="number"
									class="hidden w-full"
								/>
								<Label for="name">Name</Label>
								<Input
									placeholder="Enter your name"
									value={userData.name}
									id="name"
									name="name"
									class="w-full"
								/>
							</div>
							<div class="form-input">
								<Label for="email">Email</Label>
								<Input
									placeholder="Enter your email"
									value={userData.email}
									id="email"
									name="email"
									class="w-full"
								/>
							</div>
							<div class="form-input w-full">
								<Label for="phoneNumber">Phone Number</Label>
								<Input
									placeholder="Enter your phone number"
									value={userData.phoneNumber}
									id="phoneNumber"
									name="phoneNumber"
									class="w-full"
									type="number"
									pattern="^\d{11}$"
									title="Phone number should be exactly 11 digits"
								/>
							</div>
							<div class="form-input">
								<Label for="location">Location</Label>
								<Input
									placeholder="Enter your location"
									value={userData.location}
									id="location"
									name="location"
									class="w-full"
								/>
							</div>

							<div class="w-full">
								<Button type="submit" class="btn btn-secondary w-full">Update</Button>
							</div>
						</form>
					</Card.Content>
				</Card.Root>
			</div>
		{/if}
	{:catch error}
		<p>{error.message}</p>
	{/await}
{/if}
