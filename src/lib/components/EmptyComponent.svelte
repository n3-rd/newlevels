<script lang="ts">
	import { HeartCrack, Subtitles } from 'lucide-svelte';

	export let title: string;
	export let subtitle: string;
</script>

<div class="flex h-[80vh] w-screen items-center justify-center">
	<div class="empty flex flex-col items-center gap-5">
		<div class="empty-icon">
			<HeartCrack class="h-24 w-24 text-red-500" />
		</div>

		<div class="empty-title flex flex-col gap-3 text-center text-2xl font-semibold">
			<p>{title}</p>
			<p>{subtitle}</p>
		</div>
	</div>
</div>
