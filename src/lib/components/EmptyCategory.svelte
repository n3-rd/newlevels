<script>
	import { HeartCrack } from 'lucide-svelte';
</script>

<div class="flex h-[80vh] w-screen items-center justify-center">
	<div class="empty flex flex-col gap-5">
		<div class="empty-icon">
			<HeartCrack class="h-24 w-24 text-red-500" />
		</div>

		<div class="empty-title flex flex-col gap-3 text-center text-2xl font-semibold">
			<p>Oh no!</p>
			<p>It seems this category is empty</p>
		</div>
	</div>
</div>
