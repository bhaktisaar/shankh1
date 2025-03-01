"use client";
import Image from "next/image";
import { Play } from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
}

interface SongModalProps {
  song: Song;
  onStart: () => void;
}

export default function SongModal({ song, onStart }: SongModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-zinc-800 rounded-lg overflow-hidden p-6 max-w-xs w-full">
        <div className="relative w-48 h-48 mx-auto">
          <Image
            src={song.coverUrl || "/placeholder.svg"}
            alt={song.title}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
        <h3 className="text-white text-center mt-4 text-xl font-bold">
          {song.title}
        </h3>
        <p className="text-gray-300 text-center">{song.artist}</p>
        <button
          type="button"
          onClick={onStart}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded flex items-center justify-center"
        >
          <Play size={20} className="mr-2" />
          Start Playing
        </button>
      </div>
    </div>
  );
}
