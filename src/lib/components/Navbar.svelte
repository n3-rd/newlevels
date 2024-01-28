<script>
	import { SignedIn, SignedOut } from 'sveltefire';
</script>

<div class="flex h-14 w-screen items-center justify-between bg-black px-6">
	<div class="title">
		<a href="/">
			<h1 class="text-2xl font-bold text-white">Newlevels</h1>
		</a>
	</div>
	<div class="links flex gap-3 font-semibold text-white">
		<a href="/">shop</a>
		<SignedIn let:signOut>
			<a href="/ad">My ads</a>
			<a href="/sell">Sell</a>
			<a href="/profile">Profile</a>
			<button on:click={signOut}>Sign Out</button>
		</SignedIn>
		<SignedOut>
			<a href="/auth/login">Login/Register</a>
		</SignedOut>
	</div>
</div>
