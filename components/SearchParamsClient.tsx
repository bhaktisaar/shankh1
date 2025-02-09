"use client"; // Ensure this is a Client Component

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface SearchParamsProps {
  setCurrentSongId: (id: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  songs: any[]; // Ensure songs are fetched before setting the songId
}

export default function SearchParamsClient({
  setCurrentSongId,
  setIsPlaying,
  songs,
}: SearchParamsProps) {
  const searchParams = useSearchParams();
  const songId = searchParams.get("songId"); // Query params are always strings

  useEffect(() => {
    if (songId && songs.length > 0) {
      // Ensure we are comparing strings
      const foundSong = songs.find((song) => song.id === songId);

      if (foundSong) {
        setCurrentSongId(songId);
        setIsPlaying(true);
      }
    }
  }, [songId, songs, setCurrentSongId, setIsPlaying]);

  return null; // This component doesn't render anything
}
