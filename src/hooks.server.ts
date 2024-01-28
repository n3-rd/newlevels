import { connectMongo } from "$db/mongo";

connectMongo().then(async() => {
   await console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});

