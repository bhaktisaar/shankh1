import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "MONGODB_URI is not defined. Please check your environment variables."
  );
}

// Create a single client instance for the entire app
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Reuse the connection in development to prevent multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      tls: true, // Ensure TLS is enabled for secure connections
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Create a new client for production
  client = new MongoClient(uri, {
    tls: true, // Required for MongoDB Atlas on Vercel
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const connection = await clientPromise;
    return connection.db(); // Returns the connected database
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Could not connect to the database");
  }
}
