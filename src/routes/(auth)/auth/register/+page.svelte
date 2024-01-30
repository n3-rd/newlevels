<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		getAuth,
		createUserWithEmailAndPassword,
		updateProfile,
		signInWithPopup,
		GoogleAuthProvider
	} from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { failure, success } from '$lib/helpers/Toast';
	import { getFirebaseErrorMessage } from '$lib/helpers/FirebaseErrors';
	import Loader from '$lib/components/Loader.svelte';
	import { createUser } from '$lib/helpers/helpers';

	let name: string = '';
	let email: string = '';
	let password: string = '';
	let password_confirmation: string = '';
	let location: string = '';
	let phone: number;
	let loading: boolean = false;

	const auth = getAuth();
</script>

<div class="min-w-screen flex min-h-screen items-center justify-center">
	<Card.Root class="w-[35%]">
		<Card.Header class="flex flex-col gap-6">
			<Card.Title class="text-4xl">Card Title</Card.Title>
			<Card.Description class="text-1xl font-bold text-black">Create an account</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-6">
			<Input class="px-2 py-6" placeholder="Email" type="email" bind:value={email} />
			<Input class="px-2 py-6" placeholder="Name" type="name" bind:value={name} />
			<Input class="px-2 py-6" placeholder="Location" type="location" bind:value={location} />
			<Input class="px-2 py-6" placeholder="Phone" type="phone" bind:value={phone} />
			<Input class="px-2 py-6" placeholder="Password" type="password" bind:value={password} />
			<Input
				class="px-2 py-6"
				placeholder="Confirm Password"
				type="password"
				bind:value={password_confirmation}
			/>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-4">
			<Button
				class="w-full"
				type="submit"
				disabled={password !== password_confirmation || password.length < 8}
				on:click={async (e) => {
					e.preventDefault();
					loading = true;
					try {
						await createUserWithEmailAndPassword(auth, email, password);
						success('Account created successfully');
						await updateProfile(auth.currentUser, { displayName: name });
						const user = {
							firebaseID: auth.currentUser.uid,
							role: { $numberInt: '0' },
							cart: [],
							name: name,
							email: email,
							location: location,
							phone: phone
						};

						createUser(user)
							.then((response) => {
								console.log(response);
							})
							.catch((error) => {
								console.error(error);
							});

						loading = false;
						goto('/');
					} catch (error) {
						loading = false;
						const errorMessage = getFirebaseErrorMessage(error.code);
						failure(errorMessage);
					}
				}}
			>
				{#if loading}
					<Loader />
				{:else}
					Register
				{/if}
			</Button>

			<Button
				class="w-full"
				type="submit"
				on:click={async (e) => {
					e.preventDefault();
					const provider = new GoogleAuthProvider();
					try {
						await signInWithPopup(auth, provider);
						success('Google Sign In Successful');
						goto('/');
					} catch (error) {
						const errorMessage = getFirebaseErrorMessage(error.code);
						failure(errorMessage);
					}
				}}>Google</Button
			>
			<a href="/auth/login">login</a>
		</Card.Footer>
	</Card.Root>
</div>
