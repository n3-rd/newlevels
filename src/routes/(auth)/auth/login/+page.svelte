<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		getAuth,
		signInWithEmailAndPassword,
		updateProfile,
		signInWithPopup,
		GoogleAuthProvider
	} from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { failure, success } from '$lib/helpers/Toast';
	import { getFirebaseErrorMessage } from '$lib/helpers/FirebaseErrors';
	import Loader from '$lib/components/Loader.svelte';

	let name: string = '';
	let email: string = '';
	let password: string = '';
	let location: string = '';
	let phone: string = '';
	let loading: boolean = false;

	const auth = getAuth();
</script>

<div class="min-w-screen flex min-h-screen items-center justify-center">
	<Card.Root class="w-[35%]">
		<Card.Header class="flex flex-col gap-6">
			<Card.Title class="text-4xl">Card Title</Card.Title>
			<Card.Description class="text-1xl font-bold text-black"
				>Login to your account</Card.Description
			>
		</Card.Header>
		<Card.Content class="flex flex-col gap-6">
			<Input class="px-2 py-6" placeholder="Email" type="email" bind:value={email} />
			<Input class="px-2 py-6" placeholder="Password" type="password" bind:value={password} />
		</Card.Content>
		<Card.Footer class="flex flex-col gap-4">
			<Button
				class="w-full"
				type="submit"
				on:click={async (e) => {
					e.preventDefault();
					loading = true;
					try {
						await signInWithEmailAndPassword(auth, email, password);
						success('Account created successfully');
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
					Login
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

			<a href="/auth/register">resgister</a>
		</Card.Footer>
	</Card.Root>
</div>
