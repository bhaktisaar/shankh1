import { connectToDatabase } from "@/lib/mongoDb";

// Export the GET method for the /api/AllSongs endpoint
export async function GET() {
  try {
    const db = await connectToDatabase();
    const songs = await db.collection("songs").find().toArray(); // Fetch all songs
    return new Response(JSON.stringify(songs), { status: 200 });
  } catch (error) {
    console.error("Error fetching songs from database:", error);
    return new Response("Error fetching songs", { status: 500 });
  }
}
