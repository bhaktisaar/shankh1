"use client"; // Ensure this is a Client Component

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import from next/navigation
import Player from "@/components/player";
import Home from "@/components/home";

interface Song {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
}

export default function Page() {
  const [songs, setSongs] = useState<Song[]>([]); // Store songs from API
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Use `useSearchParams` instead of `useRouter`
  const searchParams = useSearchParams();
  const songId = searchParams.get("songId");

  // Fetch songs data from the API when the component mounts
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/AllSongs"); // The API we created
        if (response.ok) {
          const data = await response.json();
          setSongs(data); // Set the song data in state
        } else {
          console.error("Failed to fetch songs");
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  // Set the current song based on the songId from the query string
  useEffect(() => {
    if (songId) {
      const id = parseInt(songId);
      setCurrentSongId(id);
      setIsPlaying(true);
    }
  }, [songId]);

  // Find the current song based on the currentSongId
  const currentSong = songs.find((song) => song.id === currentSongId) || null;

  const handlePlayPause = (songId: number) => {
    if (songId === currentSongId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongId(songId);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (currentSongId) {
      const currentIndex = songs.findIndex((song) => song.id === currentSongId);
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
      setCurrentSongId(songs[previousIndex].id);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentSongId) {
      const currentIndex = songs.findIndex((song) => song.id === currentSongId);
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentSongId(songs[nextIndex].id);
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8 pb-24">
        <Home
          songs={songs}
          currentSongId={currentSongId}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </>
  );
}
