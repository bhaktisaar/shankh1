"use client";

import Image from "next/image";
import { Play, Pause, Share2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface Song {
  id: string;
  title: string; // English title from MongoDB
  hTitle: string; // Hindi title from MongoDB
  artist: string;
  coverUrl: string;
}

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  isCurrent: boolean;
  onPlayPause: () => void;
}

export default function SongCard({
  song,
  isPlaying,
  isCurrent,
  onPlayPause,
}: SongCardProps) {
  const { language } = useLanguage();
  // Use the Hindi title if the language is set to Hindi
  const displayTitle = language === "en" ? song.title : song.hTitle;

  // ... rest of your component remains the same

  return (
    <div
      className={`bg-zinc-800 rounded-lg overflow-hidden relative group ${
        isCurrent ? "border-4 border-blue-500" : ""
      }`}
    >
      <div className="relative aspect-square">
        <Image
          src={song.coverUrl || "/placeholder.svg"}
          alt={displayTitle}
          layout="fill"
          objectFit="cover"
          className={isPlaying ? "opacity-50" : ""}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300">
          <button onClick={onPlayPause}>
            {isPlaying ? (
              <Pause className="text-white" size={48} />
            ) : (
              <Play
                className={`text-white transition-opacity duration-300 ${
                  isCurrent
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                size={48}
              />
            )}
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold truncate">{displayTitle}</h3>
        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
      </div>
      <button
        onClick={() => {
          const shareUrl = `${window.location.origin}/?songId=${song.id}`;
          navigator.clipboard.writeText(shareUrl).then(() => {
            const text = `Check out this song!\n\nCover: ${song.coverUrl}\nTitle: ${displayTitle}\nListen here: ${shareUrl}`;
            window.open(
              `https://wa.me/?text=${encodeURIComponent(text)}`,
              "_blank"
            );
          });
        }}
        className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
      >
        <Share2 size={20} />
      </button>
    </div>
  );
}
