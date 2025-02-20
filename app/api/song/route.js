export const dynamic = "force-dynamic";

import { connectToDatabase } from "../../../lib/mongoDb";

export async function GET() {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Fetch all songs from the 'songs' collection
    const songs = await db.collection("songs").find().toArray();

    // Check if no songs are found
    if (songs.length === 0) {
      return new Response("No songs found", { status: 404 });
    }

    // Select a random song from the fetched songs
    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    // Return the random song as a JSON response with no caching.
    return new Response(JSON.stringify(randomSong), {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching song:", error);
    return new Response("Error fetching song", { status: 500 });
  }
}
