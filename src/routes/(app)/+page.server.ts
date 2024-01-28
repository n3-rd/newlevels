import { products } from "$db/products";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    let data = await products.find({}).toArray();
    // Convert ObjectId instances to strings
    data = data.map(product => ({...product, _id: product._id.toString()}));
    console.log("data", data);
    return { products: data };
}