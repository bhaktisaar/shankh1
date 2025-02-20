"use client";

import { useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";

interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
}

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  hasUserInteracted: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Player({
  currentSong,
  isPlaying,
  hasUserInteracted,
  onPlayPause,
  onPrevious,
  onNext,
}: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load new audio when the current song changes.
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.load();
    }
  }, [currentSong]);

  // Play or pause based on isPlaying and user interaction.
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && hasUserInteracted) {
        audioRef.current
          .play()
          .catch((err) => console.warn("Play failed:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, hasUserInteracted]);

  if (!currentSong) return null;

  return (
    <div className="relative bg-zinc-800 p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src={currentSong.coverUrl || "/placeholder.svg"}
            alt={currentSong.title}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
        <div className="min-w-0 flex items-center">
          <div>
            <h3 className="font-semibold truncate">{currentSong.title}</h3>
            <p className="text-sm text-gray-400 truncate">
              {currentSong.artist}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-4 flex-1">
        <button
          type="button"
          className="text-gray-400 hover:text-white"
          onClick={onPrevious}
        >
          <SkipBack size={24} />
        </button>
        <button
          type="button"
          className="bg-white text-black rounded-full p-2"
          onClick={onPlayPause}
        >
          {isPlaying && hasUserInteracted ? (
            <Pause size={24} />
          ) : (
            <Play size={24} />
          )}
        </button>
        <button
          type="button"
          className="text-gray-400 hover:text-white"
          onClick={onNext}
        >
          <SkipForward size={24} />
        </button>
      </div>
      {/* Hidden audio element */}
      <audio
        key={currentSong.id} // Force re-creation when song changes
        ref={audioRef}
        src={currentSong.audioUrl}
        className="hidden"
        playsInline
      />
    </div>
  );
}
