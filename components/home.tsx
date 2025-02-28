"use client";

import SongCard from "./song-card";

interface Song {
  id: string;
  title: string;
  hTitle: string;
  artist: string;
  coverUrl: string;
}

interface HomeProps {
  songs: Song[];
  currentSongId: string | null;
  isPlaying: boolean;
  onPlayPause: (songId: string) => void;
}

export default function Home({
  songs,
  currentSongId,
  isPlaying,
  onPlayPause,
}: HomeProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={song.id === currentSongId && isPlaying}
            isCurrent={song.id === currentSongId}
            onPlayPause={() => onPlayPause(song.id)}
          />
        ))}
      </div>
    </div>
  );
}
