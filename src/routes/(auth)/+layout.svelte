<!-- <script>
	import { SignedIn, SignedOut } from 'sveltefire';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
</script>

<SignedIn>
	{#if browser}
		{goto('/auth/login')}
	{/if}
</SignedIn> -->

<!-- <SignedOut> -->
<slot />
<!-- </SignedOut> -->
