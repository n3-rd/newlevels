<script>
	export let paging;
	let { count, page, size } = paging;
	let maxPage = Math.ceil(count / size);
	let pages = [];
	for (let i = 1; i <= maxPage; i++) pages.push(i);
</script>

// $lib/Pagination.svelte
<div>
	<p>Page: {page}</p>
	<div>
		{#each pages as p}
			<a href="?page={p}&size={size}">{p}</a>
		{/each}
	</div>
</div>
