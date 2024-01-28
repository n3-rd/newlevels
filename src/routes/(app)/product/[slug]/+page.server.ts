import { products } from "$db/products";
import type { PageServerLoad } from "./$types";
import { ObjectId } from "mongodb";

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;
    const product = await products.findOne({ _id: new ObjectId(slug) });
    if (product) {
        // Convert ObjectId instances to strings
        const productData = { ...product, _id: product._id.toString() };

        // Fetch similar products
        const similarProducts = await products.find({ category: product.category }).toArray();

        // Convert ObjectId instances to strings for similar products
        const similarProductsData = similarProducts.map(product => ({ ...product, _id: product._id.toString() }));

        console.log("product", productData);
        console.log("similar products", similarProductsData);

        return { product: productData, similarProducts: similarProductsData };
    }
}