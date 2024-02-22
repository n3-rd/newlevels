import { z } from "zod";
import type { Actions } from './$types';
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import axios from 'axios';

const schema = z.object({
  id: z.string({
    required_error: "ID is required",
  }),
  role: z.string({
    required_error: "Role is required",
  }),
  phoneNumber: z.string({
    required_error: "Phone number is required",
  })
 
  ,
  name: z.string({
    required_error: "Name is required",
  }),
  location: z.string({
    required_error: "Location is required",
  }),
  email: z.string({
    required_error: "Email is required",
  })
});


export const actions: Actions = {
    "edit-user": async ({request}) => {
        const formData = await request.formData();
        console.log('Form Data:', formData);
    
        const role = formData.get("role");
        const phoneNumber = formData.get("phoneNumber");
        const name = formData.get("name");
        const id = formData.get("id");
        const location = formData.get("location");
        const email = formData.get("email");
    
        const dataToValidate = {
            id,
            role,
            phoneNumber,
            name,
            location,
            email
        }
    
        try{
            const validatedData = schema.parse(dataToValidate);
            const editUser = await axios.put(`${PUBLIC_API_ENDPOINT}/users/${id}`, validatedData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (editUser.status === 200) {
                return {
                    status: 200,
                    body: {
                        message: 'User updated successfully'
                    }
                }
            }
            
            else {
                return {
                    status: 400,
                    body: {
                        message: 'User update failed'
                    }
                }
            } 
        }
        catch (error) {
            console.log('Error:', error);
        }

    }
    }