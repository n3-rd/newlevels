import {MongoClient} from 'mongodb';
import {PUBLIC_MONGO_URL} from '$env/static/public' 
const client = new MongoClient(PUBLIC_MONGO_URL);

export async function connectMongo() {
    console.log(`Connecting to MongoDB... at url ${PUBLIC_MONGO_URL}`);
    await client.connect();
}

export default client.db();