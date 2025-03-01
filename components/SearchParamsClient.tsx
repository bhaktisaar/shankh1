"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface SearchParamsProps {
  setCurrentSongId: (id: string) => void;
  setIsPlaying: (val: boolean) => void;
  setSelectedViaUrl: (val: boolean) => void;
  hasUserInteracted: boolean;
  songs: any[];
}

export default function SearchParamsClient({
  setCurrentSongId,
  setIsPlaying,
  setSelectedViaUrl,
  hasUserInteracted,
  songs,
}: SearchParamsProps) {
  const searchParams = useSearchParams();
  const songId = searchParams.get("songId");

  useEffect(() => {
    // Only update if user hasn't interacted and we have a songId and songs are loaded.
    if (!hasUserInteracted && songId && songs.length > 0) {
      setCurrentSongId(songId);
      // For URL-based selection, default to paused so that modal appears.
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
