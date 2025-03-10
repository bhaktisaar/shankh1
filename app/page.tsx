import { Metadata } from "next";
import PageClient from "@/components/PageClient";

// Let Next.js know you want this page to be dynamic:
export const dynamic = "force-dynamic";

// Dynamically generate metadata based on query params
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { songId?: string };
}): Promise<Metadata> {
  // Default OG info for your homepage (when no songId is provided):
  let ogTitle = "Music App";
  let ogDescription = "Discover and listen to amazing songs!";

  // If you have a `songId` in the query, override the metadata
  if (searchParams.songId) {
    // If you want, you can fetch the song details from your DB here.
    // For example:
    // const song = await fetchSongById(searchParams.songId);

    // For simplicity, let’s just show an example:
    ogTitle = `Song #${searchParams.songId} - Music App`;
    ogDescription = `Enjoy Song #${searchParams.songId} on Music App!`;
  }

  return {
    title: ogTitle,
    description: ogDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: "https://shankh.app/",
      images: [
        {
          url: "https://pub-821e7514c97d42cfb1b90453dffd7cf3.r2.dev/Screenshot%202025-02-23%20at%204.31.18%E2%80%AFPM.png",
          width: 800,
          height: 800,
          alt: "Music App Cover",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [
        "https://pub-821e7514c97d42cfb1b90453dffd7cf3.r2.dev/Screenshot%202025-02-23%20at%204.31.18%E2%80%AFPM.png",
      ],
    },
  };
}
// ✅ Render Client Component
export default function Page() {
  return <PageClient />;
}
