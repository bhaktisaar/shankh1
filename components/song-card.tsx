import Image from "next/image"
import { Play, Pause, Share2 } from "lucide-react"

interface Song {
  id: number
  title: string
  artist: string
  coverUrl: string
}

interface SongCardProps {
  song: Song
  isPlaying: boolean
  onPlayPause: () => void
}

export default function SongCard({ song, isPlaying, onPlayPause }: SongCardProps) {
  const shareOnWhatsApp = () => {
    const text = `Check out this song: ${song.title} by ${song.artist}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden relative">
      <div className="relative aspect-square">
        <Image
          src={song.coverUrl || "/placeholder.svg"}
          alt={song.title}
          layout="fill"
          objectFit="cover"
          className={isPlaying ? "opacity-50" : ""}
        />
        <button
          onClick={onPlayPause}
          className={`absolute inset-0 flex items-center justify-center bg-black ${
            isPlaying ? "bg-opacity-50" : "bg-opacity-0 hover:bg-opacity-50"
          } transition-opacity duration-300`}
        >
          {isPlaying ? (
            <Pause className="text-white" size={48} />
          ) : (
            <Play className="text-white opacity-0 group-hover:opacity-100" size={48} />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold truncate">{song.title}</h3>
        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
      </div>
      <button
        onClick={shareOnWhatsApp}
        className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
      >
        <Share2 size={20} />
      </button>
    </div>
  )
}

