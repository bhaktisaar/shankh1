"use client"; // Ensure this is a Client Component

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface SearchParamsProps {
  setCurrentSongId: (id: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export default function SearchParamsClient({
  setCurrentSongId,
  setIsPlaying,
}: SearchParamsProps) {
  const searchParams = useSearchParams();
  const songId = searchParams.get("songId");

  useEffect(() => {
    if (songId) {
      setCurrentSongId(parseInt(songId));
      setIsPlaying(true);
    }
  }, [songId, setCurrentSongId, setIsPlaying]);

  return null; // This component doesn't render anything
}
