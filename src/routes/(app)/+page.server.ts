import type { PageServerLoad } from "./$types";
import {PUBLIC_API_ENDPOINT} from '$env/static/public' 


export const load: PageServerLoad = async () => {

    let data = await fetch(`${PUBLIC_API_ENDPOINT}/products/`);
 
    data = await data.json();
    return { products: data };
}


export const actions = {
    search: async ({request}) => {
            const formData = await request.formData();
            console.log("formData", formData);
            const searchQuery = formData.get('search');
            console.log("searchQuery", searchQuery);
        let data = await fetch(`${PUBLIC_API_ENDPOINT}products/search/${searchQuery}`);
        data = await data.json();
        console.log("data", data);
        return { products: data };
    }
}