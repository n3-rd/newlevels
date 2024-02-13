<script>
	import { SignedIn, SignedOut } from 'sveltefire';
	let logopath =  'default-monochrome.svg';
</script>

<div class="flex h-14 w-screen items-center justify-between bg-black px-6">
	<div class="title">
		<a href="/">
			<img
   				 src={`./${logopath}`}
    			 alt="Logo"
    			class="h-full w-1/2 object-contain"
  			/>
		</a>
	</div>
	<div class="links flex gap-3 font-semibold text-white">
		<a href="/" class="hover:border-b-2">shop</a>
		<SignedIn let:signOut>
			<a href="/ad"      class="hover:border-b-2">My ads</a>
			<a href="/sell"    class="hover:border-b-2">Sell</a>
			<a href="/profile" class="hover:border-b-2">Profile</a>
			<button on:click={signOut}>Sign Out</button>
		</SignedIn>
		<SignedOut>
			<a href="/auth/login" class="hover:border-b-2">Login/Register</a>
		</SignedOut>
	</div>
</div>
