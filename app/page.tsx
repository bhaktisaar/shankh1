"use client";

import { useState, useEffect, Suspense } from "react";
import Player from "@/components/player";
import Home from "@/components/home";
import SearchParamsClient from "@/components/SearchParamsClient";

interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
}

export default function Page() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/AllSongs");
        if (response.ok) {
          const data = await response.json();
          setSongs(data);
        } else {
          console.error("Failed to fetch songs");
        }
      } catch (error) {
        console.error("Error fetching song:", error);
      }
    };

    fetchSongs();
  }, []);

  const currentSong = songs.find((song) => song.id === currentSongId) || null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsClient
        setCurrentSongId={setCurrentSongId}
        setIsPlaying={setIsPlaying}
        songs={songs}
      />

      <div className="p-4 sm:p-6 md:p-8 pb-24">
        <Home
          songs={songs}
          currentSongId={currentSongId}
          isPlaying={isPlaying}
          onPlayPause={(songId) => {
            // If the same song is clicked, toggle play/pause.
            // If a new song is clicked, select it and default to paused.
            if (songId === currentSongId) {
              setIsPlaying((prev) => !prev);
            } else {
              setCurrentSongId(songId);
              setIsPlaying(false);
            }
          }}
        />
      </div>

      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0">
          <Player
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying((prev) => !prev)}
            onPrevious={() => {
              const currentIndex = songs.findIndex(
                (song) => song.id === currentSongId
              );
              const previousIndex =
                (currentIndex - 1 + songs.length) % songs.length;
              setCurrentSongId(songs[previousIndex].id);
              setIsPlaying(false); // default to paused when changing song
            }}
            onNext={() => {
              const currentIndex = songs.findIndex(
                (song) => song.id === currentSongId
              );
              const nextIndex = (currentIndex + 1) % songs.length;
              setCurrentSongId(songs[nextIndex].id);
              setIsPlaying(false); // default to paused when changing song
            }}
          />
        </div>
      )}
    </Suspense>
  );
}
