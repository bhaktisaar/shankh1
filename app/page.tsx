import { Metadata } from "next";
import PageClient from "@/components/PageClient";

// ✅ Static Open Graph Metadata for WhatsApp & Social Media
export const metadata: Metadata = {
  title: "Music App",
  description: "Discover and listen to amazing songs!",
  openGraph: {
    title: "Music App",
    description: "Discover and listen to amazing songs!",
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
    title: "Music App",
    description: "Discover and listen to amazing songs!",
    images: [
      "https://pub-821e7514c97d42cfb1b90453dffd7cf3.r2.dev/Screenshot%202025-02-23%20at%204.31.18%E2%80%AFPM.png",
    ],
  },
};

// ✅ Render Client Component
export default function Page() {
  return <PageClient />;
}
