import db from '$db/mongo'

export const users = db.collection('fireUsers');

type User = {
    firebaseId: string;
    name: string;
    email: string;
    phone: number;
    location: string;
    role: number;
    premium: boolean;
    createdAt: string;
    updatedAt: string;
    }

export const createUser = async (user: User) => {
    const newUser = await users.insertOne(user);
    return newUser;
    }

