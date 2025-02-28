"use client";

import { useState, useEffect, Suspense } from "react";
import Player from "@/components/player";
import Home from "@/components/home";
import SearchParamsClient from "@/components/SearchParamsClient";
import SongModal from "@/components/SongModal";

interface Song {
  id: string;
  title: string;
  hTitle: string;
  artist: string;
  hArtist: string;
  coverUrl: string;
  audioUrl: string;
}

export default function PageClient() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [selectedViaUrl, setSelectedViaUrl] = useState(false);

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
        setCurrentSongId={(id: string) => {
          setCurrentSongId(id);
          setIsPlaying(false);
          setSelectedViaUrl(true);
          setHasUserInteracted(false);
        }}
        setIsPlaying={setIsPlaying}
        songs={songs}
        hasUserInteracted={hasUserInteracted}
        setSelectedViaUrl={setSelectedViaUrl}
      />

      <div className="p-4 sm:p-6 md:p-8 pb-24">
        <Home
          songs={songs}
          currentSongId={currentSongId}
          isPlaying={isPlaying}
          onPlayPause={(songId: string) => {
            if (songId !== currentSongId) {
              setCurrentSongId(songId);
              setIsPlaying(true);
              setSelectedViaUrl(false);
              setHasUserInteracted(true);
            } else {
              setIsPlaying((prev) => !prev);
            }
          }}
        />
      </div>

      {selectedViaUrl && currentSong && !hasUserInteracted ? (
        <SongModal
          song={currentSong}
          onStart={() => {
            setHasUserInteracted(true);
            setIsPlaying(true);
            setSelectedViaUrl(false);
          }}
        />
      ) : (
        currentSong && (
          <div className="fixed bottom-0 left-0 right-0">
            <Player
              currentSong={currentSong}
              isPlaying={isPlaying}
              hasUserInteracted={hasUserInteracted}
              selectedViaUrl={selectedViaUrl}
              onPlayPause={() => {
                setIsPlaying((prev) => !prev);
                setHasUserInteracted(true);
              }}
              onEnablePlayback={() => {
                setHasUserInteracted(true);
                if (!isPlaying) setIsPlaying(true);
              }}
              onPrevious={() => {
                const currentIndex = songs.findIndex(
                  (song) => song.id === currentSongId
                );
                const previousIndex =
                  (currentIndex - 1 + songs.length) % songs.length;
                setCurrentSongId(songs[previousIndex].id);
                setIsPlaying(true);
                setSelectedViaUrl(false);
                setHasUserInteracted(true);
              }}
              onNext={() => {
                const currentIndex = songs.findIndex(
                  (song) => song.id === currentSongId
                );
                const nextIndex = (currentIndex + 1) % songs.length;
                setCurrentSongId(songs[nextIndex].id);
                setIsPlaying(true);
                setSelectedViaUrl(false);
                setHasUserInteracted(true);
              }}
            />
          </div>
        )
      )}
    </Suspense>
  );
}
