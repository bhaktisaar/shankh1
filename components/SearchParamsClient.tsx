"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface SearchParamsProps {
  setCurrentSongId: (id: string) => void;
  setIsPlaying: (val: boolean) => void;
  songs: any[];
  hasUserInteracted: boolean;
  setSelectedViaUrl: (val: boolean) => void;
}

export default function SearchParamsClient({
  setCurrentSongId,
  setIsPlaying,
  songs,
  hasUserInteracted,
  setSelectedViaUrl,
}: SearchParamsProps) {
  const searchParams = useSearchParams();
  const songId = searchParams.get("songId");

  useEffect(() => {
    // Only update if the user has not yet interacted and we have a songId.
    if (!hasUserInteracted && songId && songs.length > 0) {
      setCurrentSongId(songId);
      // Default to paused so that modal shows.
      setIsPlaying(false);
      setSelectedViaUrl(true);
    }
  }, [
    songId,
    songs,
    hasUserInteracted,
    setCurrentSongId,
    setIsPlaying,
    setSelectedViaUrl,
  ]);

  return null;
}
