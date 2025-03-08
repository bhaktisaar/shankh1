"use client";

import { useRef, useEffect, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

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
  selectedViaUrl: boolean;
  onPlayPause: () => void;
  onEnablePlayback: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export default function Player({
  currentSong,
  isPlaying,
  hasUserInteracted,
  selectedViaUrl,
  onPlayPause,
  onEnablePlayback,
  onPrevious,
  onNext,
}: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Load new audio when currentSong changes.
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

  // Update time and duration
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const timeUpdate = () => setCurrentTime(audio.currentTime);
      const durationChange = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', timeUpdate);
      audio.addEventListener('loadedmetadata', durationChange);
      
      return () => {
        audio.removeEventListener('timeupdate', timeUpdate);
        audio.removeEventListener('loadedmetadata', durationChange);
      };
    }
  }, []);

  // Format time to mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  // Handle progress bar change
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-zinc-900/95 to-stone-900/95 backdrop-blur-md border-t border-white/5">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/10 group">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleProgressChange}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer 
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                   [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
                   [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:opacity-0
                   hover:[&::-webkit-slider-thumb]:opacity-100 transition-all"
        />
        <div 
          className="h-full bg-white/70 hover:bg-white transition-colors"
          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="h-16 py-2 px-2 sm:px-4 flex items-center justify-between gap-2 sm:gap-4">
          {/* Song Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0 sm:max-w-[40%]">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src={currentSong.coverUrl || "/placeholder.svg"}
                alt={currentSong.title}
                layout="fill"
                objectFit="cover"
                className="rounded shadow-md"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className={`font-semibold truncate text-sm text-white/90 ${montserrat.className}`}>
                  {currentSong.title}
                </h3>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex-shrink-0 transition-colors ${
                    isLiked ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Heart className={isLiked ? 'fill-current' : ''} size={16} />
                </button>
              </div>
              <p className="text-xs text-white/60 truncate">
                {currentSong.artist}
              </p>
            </div>
          </div>

          {/* Main Controls - Centered */}
          <div className="flex items-center justify-center">
            {/* Mobile Controls (< 610px) */}
            <div className="flex sm:hidden items-center gap-4">
              <button
                type="button"
                className="text-white/60 hover:text-white transition-colors"
                onClick={onPlayPause}
              >
                {isPlaying && hasUserInteracted ? (
                  <Pause size={32} />
                ) : (
                  <Play size={32} />
                )}
              </button>
              <button
                type="button"
                className="text-white/60 hover:text-white transition-colors"
                onClick={onNext}
              >
                <SkipForward size={22} />
              </button>
            </div>

            {/* Desktop Controls (≥ 610px) */}
            <div className="hidden sm:flex items-center gap-6">
              <button
                type="button"
                className="text-white/60 hover:text-white transition-colors"
                onClick={onPrevious}
              >
                <SkipBack size={22} />
              </button>
              <button
                type="button"
                className="text-white hover:text-white/90 transition-colors p-1"
                onClick={onPlayPause}
              >
                {isPlaying && hasUserInteracted ? (
                  <Pause size={32} />
                ) : (
                  <Play size={32} />
                )}
              </button>
              <button
                type="button"
                className="text-white/60 hover:text-white transition-colors"
                onClick={onNext}
              >
                <SkipForward size={22} />
              </button>
            </div>
          </div>

          {/* Right Controls - Volume Only */}
          <div className="hidden sm:flex items-center gap-2 flex-1 justify-end min-w-[100px]">
            <button
              onClick={toggleMute}
              className="text-white/60 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 appearance-none bg-white/20 rounded-full cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 
                       [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-white"
            />
          </div>
        </div>
      </div>

      <audio
        key={currentSong.id}
        ref={audioRef}
        src={currentSong.audioUrl}
        className="hidden"
        playsInline
      />
    </div>
  );
}
