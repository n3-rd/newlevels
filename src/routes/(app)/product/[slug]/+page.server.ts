import { PUBLIC_API_ENDPOINT } from "$env/static/public";

import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let data = await fetch(`${PUBLIC_API_ENDPOINT}/products/${params.slug}`);
    
        data = await data.json()
        console.log(data)
	if (data) {
		return data;
	}

	error(404, 'Not found');
}
