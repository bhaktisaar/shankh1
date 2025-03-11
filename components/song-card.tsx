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

// Define emojis as variables using Unicode escapes
const emojiSparkle = "\u2728"; // ✨
const emojiMusic = "\uD83C\uDFB6"; // 🎶
const emojiLink = "\uD83D\uDD17"; // 🔗
const emojiFlower = "\uD83C\uDF38"; // 🌸
const emojiRose = "\uD83C\uDF3A"; // 🌺
const emojiFlag = "\uD83D\uDEA9"; // 🚩

// Replace with your actual phone number (include country code)
const phoneNumber = "YOUR_PHONE_NUMBER_HERE";

export default function SongCard({
  song,
  isPlaying,
  isCurrent,
  onPlayPause,
}: SongCardProps) {
  const { language } = useLanguage();
  const displayTitle = language === "en" ? song.title : song.hTitle;
  const displayArtist = language === "en" ? song.artist : song.hArtist;
  const songUrl = `https://shankh.app/?songId=${song.id}`;

  return (
    <div
      className={`group relative bg-amber-900/90 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-900/30 ${
        isCurrent
          ? "ring-2 ring-amber-400/50"
          : "hover:ring-1 hover:ring-amber-500/30"
      }`}
    >
      <div className="relative aspect-square group/image">
        <Image
          src={song.coverUrl || "/placeholder.svg"}
          alt={displayTitle}
          layout="fill"
          objectFit="cover"
          className={`transition-all duration-300 ${
            isPlaying
              ? "scale-105 brightness-75"
              : "group-hover/image:brightness-90"
          }`}
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
        <h3
          className={`${montserrat.className} font-semibold text-lg truncate text-amber-100 w-72`}
        >
          {displayTitle}
        </h3>
        <p className="text-sm text-amber-200/80 truncate mt-1">
          {displayArtist}
        </p>
      </div>
      <button
        onClick={() => {
          // Construct share text using emoji variables and dynamic song data
          const text = `${emojiSparkle} *Maine 'Shankh' par ek sunder bhajan suna, aap bhi suniye!* ${emojiSparkle}

${emojiMusic} *Bhajan:* ${displayTitle} - ${displayArtist}
${emojiLink} *Sunein yahan:* ${songUrl}

${emojiFlower} *Bhagwan ki kripa aap par sada bani rahe!* ${emojiSparkle}

${emojiRose} *Rozana bhakti ka anand lene ke liye, humse judein -* https://wame.pro/shankh

${emojiFlag} *Hari Om!* ${emojiFlag}`;

          console.log(text);
          const isMobile = /Mobi|Android/i.test(navigator.userAgent);
          const encodedText = encodeURIComponent(text);

          // Omit phone parameter so that the user can choose the recipient.
          const whatsappUrl = isMobile
            ? `whatsapp://send?text=${encodedText}`
            : `https://web.whatsapp.com/send?text=${encodedText}`;

          window.open(whatsappUrl, "_blank");
        }}
        className="absolute bottom-3 right-3 bg-[#25D366]/90 backdrop-blur-sm text-white p-2.5 rounded-full transition-all duration-300 hover:bg-[#128C7E] hover:scale-110 shadow-lg"
      >
        <MessageCircleMore size={22} />
      </button>
    </div>
  );
}
