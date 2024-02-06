import {PUBLIC_API_ENDPOINT} from '$env/static/public' 
import { storedUser, type StoredUser } from '$lib/stores'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

const auth = getAuth();

type User = {
    firebaseId: string,
    name: string,
    email: string,
    password: string,
    location: string,
    phoneNumber: number,
    role: number,
    cart: string[],
}

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

export const getUser = async (id: string) => {
    const response = await fetch(`${PUBLIC_API_ENDPOINT}users/${id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',

        },
    })
    
    return response.json()
}

export const storeUser = (user: StoredUser) => {
    storedUser.set(user)
}

export const registerEmail = async (email: string, password: string, name:string, location:string, phone:number) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, {
        displayName: name
    })

    createUser({
        firebaseId: userCredential.user.uid,
        name,
        email,
        password,
        location,
        phoneNumber: phone,
        role: 0,
        cart: [],
    })

    const user = userCredential.user
    return user
}

export const loginEmail = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    return user
}