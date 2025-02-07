import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToDatabase() {
  try {
    await client.connect(); // Ensure connection
    return client.db(); // Return the connected database
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Could not connect to the database");
  }
}
