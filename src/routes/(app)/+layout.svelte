<script>
	import { SignedIn, SignedOut } from 'sveltefire';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
</script>

<SignedIn let:user>
	<slot {user} />
</SignedIn>

<SignedIn let:signOut>
	<button on:click={signOut}>Sign Out</button>
</SignedIn>

<SignedOut>
	{#if browser}
		{goto('/auth/login')}
	{/if}
</SignedOut>
