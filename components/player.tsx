"use client";

import { useRef, useEffect, useState } from "react";
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
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Player({
  currentSong,
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
}: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  // Combined effect: reloads and attempts auto-play when currentSong, isPlaying, or isUserInteracted changes.
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.load(); // Reload the audio source

      // Function to try playing the audio.
      const tryPlay = async () => {
        try {
          await audioRef.current!.play();
        } catch (err) {
          console.warn("Auto-play blocked:", err);
        }
      };

      if (isPlaying) {
        if (!isUserInteracted) {
          // Workaround: temporarily mute to force auto-play
          audioRef.current.muted = true;
          tryPlay().then(() => {
            // Unmute after a short delay so audio can be heard
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.muted = false;
              }
            }, 1000);
          });
        } else {
          tryPlay();
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying, isUserInteracted]);

  // Additional effect to update play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.warn("Play failed:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle a user gesture by updating the state and triggering play/pause.
  const handleUserInteraction = () => {
    setIsUserInteracted(true);
    onPlayPause();
  };

  const playAudio = () => {
    setIsUserInteracted(true);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.warn("Play failed:", err));
      } else {
        audioRef.current.pause();
      }
    }
  };
  if (!currentSong) return null;

  return (
    <div className=" bg-zinc-800 p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src={currentSong.coverUrl || "/placeholder.svg"}
            alt="Album cover"
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
        <button className="text-gray-400 hover:text-white" onClick={onPrevious}>
          <SkipBack size={24} />
        </button>
        <button
          className="bg-white text-black rounded-full p-2"
          onClick={handleUserInteraction}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button className="text-gray-400 hover:text-white" onClick={onNext}>
          <SkipForward size={24} />
        </button>
      </div>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        className="hidden"
        playsInline
        autoPlay
      />

      {/* Overlay prompting for user interaction if not yet interacted */}
      {!isUserInteracted && isPlaying && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-10">
          <p className="text-white mb-4">Tap to enable audio playback</p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={playAudio}
          >
            Play Audio
          </button>
        </div>
      )}
    </div>
  );
}
