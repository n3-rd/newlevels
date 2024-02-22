// import { z } from "zod";

// const schema = z.object({
//   _id: z.string({
//     required_error: "ID is required",
//   }),
//   role: z.number({
//     required_error: "Role is required",
//   }),
//   phoneNumber: z.string({
//     required_error: "Phone number is required",
//   })
//   .min(11, { message: "Phone number must be 11 characters"})
//   .max(11, { message: "Phone number must be 11 characters"})
//   ,
//   name: z.string({
//     required_error: "Name is required",
//   }),
//   location: z.string({
//     required_error: "Location is required",
//   }),
//   email: z.string({
//     required_error: "Email is required",
//   }),
//   cart: z.array(z.string())
//   .optional()
// });

// import type { Actions } from './$types';
// import { PUBLIC_API_ENDPOINT } from "$env/static/public";
 
// export const actions: Actions = {
// "update-user": async ({fetch, request}) => {
//     const formData = await request.formData();
//     const result = schema.safeParse(formData);
//     if (!result.success) {
//         return {
//         status: 400,
//         body: { 
//             errors: result.error.errors,
//         },
//         };
//     }
//     const role = formData.get("role");
//     const phoneNumber = formData.get("phoneNumber");
//     const name = formData.get("name");
//     const _id = formData.get("_id");
//     const location = formData.get("location");
//     const email = formData.get("email");
//     const cart = formData.getAll("cart");

//     const user = await fetch(`${PUBLIC_API_ENDPOINT}/users/${_id}`, {
//         method: "PUT",
//         headers: {
//         "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ role, phoneNumber, name, location, email, cart }),
//     });
//     if (user.ok) {
//         return {
//         status: 200,
//         body: {
//             message: "User updated successfully",
//         },
//         };
//     }
//     return {
//         status: 500,
//         body: {
//         message: "Internal server error",
//         },
//     };
// }
// };