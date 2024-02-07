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
    console.log("storing user", user)
    storedUser.set(user)
    console.log("storedUser", storedUser)
    console.log("storedUser", storedUser)
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
        location,
        phoneNumber: phone,
        role: 0,
        cart: [],
    })

    storeUser({
        _id: '',
        firebaseId: userCredential.user.uid,
        name,
        email,
        displayName: name,
        id: '',
        location,
        phoneNumber: phone,
        photoURL: '',
        role: 0,
    })

    const user = userCredential.user
    return user
}

export const loginEmail = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    return user
}

export const createGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // Check if user already exists
    const existingUser = await getUser(user.uid);

    if (!existingUser) {
        // User does not exist, create a new one
        createUser({
            firebaseId: user.uid,
            name: user.displayName,
            email: user.email,
            location: '',
            phoneNumber: 0,
            role: 0,
            cart: [],
        })

        storeUser({
            _id: '',
            firebaseId: user.uid,
            name: user.displayName,
            email: user.email,
            displayName: user.displayName,
            id: '',
            location: '',
            phoneNumber: 0,
            photoURL: user.photoURL,
            role: 0,
        })
    }
}

import { storeUser } from "$lib/helpers/helpers";

export const updateProfileInfo = async (id:number, name?: string, location?: string, phone?: number) => {
    const response  = await fetch(`${PUBLIC_API_ENDPOINT}users/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, location, phone}),
    })

    const updatedUser = await response.json();

    // Update the local store with the updated user
    storeUser({
        _id: updatedUser._id,
        firebaseId: updatedUser.firebaseId,
        name: updatedUser.name,
        email: updatedUser.email,
        displayName: updatedUser.name,
        id: updatedUser._id,
        location: updatedUser.location,
        phoneNumber: updatedUser.phoneNumber,
        photoURL: updatedUser.photoURL,
        role: updatedUser.role,
    });

    return updatedUser;
}