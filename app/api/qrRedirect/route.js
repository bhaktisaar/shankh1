// app/api/qr-redirect/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoDb";

export async function GET() {
  try {
    const db = await connectToDatabase();

    // Capture the local timestamp
    const timestamp = new Date();

    // Insert the timestamp into your "scans" collection
    await db.collection("scans").insertOne({ timestamp });

    // Redirect the user to the target URL with a 302 status code
    return NextResponse.redirect("https://wame.pro/shankh", { status: 302 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
