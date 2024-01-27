import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "../schema";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(formSchema)
  };
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (request) => {
    const data = await request.formData();
    console.log(data)
	}
};