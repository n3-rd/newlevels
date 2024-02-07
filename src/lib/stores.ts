import { writable } from "svelte/store";

export type StoredUser ={
    _id: string,
    firebaseId: string,
    name: string,
    email: string,
    displayName: string,
    id: string,
    location: string,
    phoneNumber: number,
    photoURL: string,
    role: number,
    cart: string[],
}

export const storedUser = writable<StoredUser | null>(null);