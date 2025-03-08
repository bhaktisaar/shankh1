"use client";

import Image from "next/image";
import { Play, Pause, MessageCircleMore } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { Montserrat } from "next/font/google";

interface Song {
  id: string;
  title: string; // English title from MongoDB
  hTitle: string; // Hindi title from MongoDB
  artist: string;
  hArtist: string;
  coverUrl: string;
}

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  isCurrent: boolean;
  onPlayPause: () => void;
}

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export default function SongCard({
  song,
  isPlaying,
  isCurrent,
  onPlayPause,
}: SongCardProps) {
  const { language } = useLanguage();
  // Use the Hindi title if the language is set to Hindi
  console.log("====================================");
  console.log(song);
  console.log("====================================");
  const displayTitle = language === "en" ? song.title : song.hTitle;
  const displayArtist = language === "en" ? song.artist : song.hArtist;

  // ... rest of your component remains the same

  return (
    <div
      className={`group relative bg-amber-900/90 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-900/30 ${
        isCurrent ? "ring-2 ring-amber-400/50" : "hover:ring-1 hover:ring-amber-500/30"
      }`}
    >
      <div className="relative aspect-square group/image">
        <Image
          src={song.coverUrl || "/placeholder.svg"}
          alt={displayTitle}
          layout="fill"
          objectFit="cover"
          className={`transition-all duration-300 ${isPlaying ? "scale-105 brightness-75" : "group-hover/image:brightness-90"}`}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-amber-950/80 via-amber-900/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-300">
          <button 
            onClick={onPlayPause}
            className="transform transition-all duration-300 hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="text-amber-100 drop-shadow-lg" size={54} />
            ) : (
              <Play className="text-amber-100 drop-shadow-lg" size={54} />
            )}
          </button>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-t from-amber-900/95 via-amber-800/90 to-amber-800/80">
        <h3 className={`${montserrat.className} font-semibold text-lg truncate text-amber-100`}>
          {displayTitle}
        </h3>
        <p className="text-sm text-amber-200/80 truncate mt-1">
          {displayArtist}
        </p>
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
        className="absolute bottom-3 right-3 bg-[#25D366]/90 backdrop-blur-sm text-white p-2.5 rounded-full 
                   transition-all duration-300 hover:bg-[#128C7E] hover:scale-110 shadow-lg"
      >
        <MessageCircleMore size={22} />
      </button>
    </div>
  );
}
