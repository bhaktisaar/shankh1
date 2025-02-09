import { connectToDatabase } from "../../../lib/mongoDb";

export async function GET() {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Fetch all songs from the 'songs' collection
    const songs = await db.collection("songs").find().toArray(); // Ensure 'songs' is the correct collection name

    // Check if no songs are found
    if (songs.length === 0) {
      return new Response("No songs found", { status: 404 });
    }

    // Select a random song from the fetched songs
    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    // Return the random song as a JSON response
    return new Response(JSON.stringify(randomSong), {
      status: 200,
    });
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching song:", error);
    // Return a 500 response in case of an error
    return new Response("Error fetching song", { status: 500 });
  }
}
