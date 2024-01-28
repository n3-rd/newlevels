import { products } from "$db/products";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    let data = await products.find({}).toArray();
    // Convert ObjectId instances to strings
    data = data.map(product => ({...product, _id: product._id.toString()}));
    // Filter out products where checked is not true
    data = data.filter(product => product.checked === true);
    console.log("data", data);
    return { products: data };
}