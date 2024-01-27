import { z } from "zod";

export const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8)
}).refine(data => data.password === data.passwordConfirm, {
    message: "Passwords must match", 
    path: ['passwordConfirm'] // point to the field in error
});

export type FormSchema = typeof formSchema;