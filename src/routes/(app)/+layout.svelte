<script>
	import { SignedIn, SignedOut } from 'sveltefire';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />

<SignedIn let:user>
	<slot {user} />
</SignedIn>

<!-- <SignedIn let:signOut>
	<button on:click={signOut}>Sign Out</button>
</SignedIn> -->

<SignedOut>
	<slot />
</SignedOut>
