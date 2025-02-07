import { connectToDatabase } from "../../../lib/mongoDb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const generateTwoDigitId = () => {
      // Generate a random number between 0 and 99
      const id = Math.floor(Math.random() * 100);

      // Ensure the ID is always two digits (e.g., 01, 02, ..., 99)
      return id.toString().padStart(2, "0");
    };
    // Define a new song document to insert
    const newSong = {
      id: generateTwoDigitId(),
      title: "Purple Rain",
      artist: "Prince",
      coverUrl: "https://pub-e9afd89193d94c61ae623f0c4a7cfbfc.r2.dev/cover.jpg",
      audioUrl:
        "https://pub-e9afd89193d94c61ae623f0c4a7cfbfc.r2.dev/sample1.aac",
    };

    // Insert the new song document into the "songs" collection
    await db.collection("songs").insertOne(newSong);

    // Fetch all songs to pick a random one
    const songs = await db.collection("songs").find().toArray();

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
    console.error("Error fetching or inserting song:", error);

    // Return a 500 response in case of an error
    return new Response("Error fetching or inserting song", { status: 500 });
  }
}
