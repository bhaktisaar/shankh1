// Let Next.js know you want this page to be dynamic:
import Share from "@/components/Share";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { songId?: string };
}) {
  let ogTitle = "Shankh - Music App";
  let ogDescription = "Enjoy Song on Shankh Music App!";

  return {
    title: ogTitle,
    description: ogDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: "https://shankh.app/",
      images: [
        {
          url: "https://pub-821e7514c97d42cfb1b90453dffd7cf3.r2.dev/shankh_logo_1.jpg",
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
        "https://pub-821e7514c97d42cfb1b90453dffd7cf3.r2.dev/shankh_logo_1.jpg",
      ],
    },
  };
}

export default function Page() {
  return <Share />;
}
