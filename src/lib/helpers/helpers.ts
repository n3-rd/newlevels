import {PUBLIC_API_ENDPOINT} from '$env/static/public' 

export const createUser = async (user: User) => {
    const response = await fetch(`${PUBLIC_API_ENDPOINT}users`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',

        },
        body: JSON.stringify(user),
    })
    
    return response.json()
}
