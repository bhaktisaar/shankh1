import { useRef, useEffect, useState } from "react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import Image from "next/image"

interface Song {
  id: number
  title: string
  artist: string
  coverUrl: string
}

interface PlayerProps {
  currentSong: Song | null
  isPlaying: boolean
  onPlayPause: () => void
  onPrevious: () => void
  onNext: () => void
}

export default function Player({ currentSong, isPlaying, onPlayPause, onPrevious, onNext }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isHighFived, setIsHighFived] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const handleHighFive = () => {
    setIsHighFived(true)
    setTimeout(() => setIsHighFived(false), 1000) // Reset after 1 second
  }

  if (!currentSong) return null

  return (
    <div className="bg-zinc-800 p-4 flex items-center justify-between shadow-lg">
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
            <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
          </div>
          <button
            onClick={handleHighFive}
            className={`ml-2 text-2xl transition-all duration-300 ${
              isHighFived ? "animate-highfive text-yellow-400" : "text-gray-400 hover:text-gray-300"
            }`}
            aria-label="High five"
          >
            <span className="highfive-emoji">🙏</span>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-4 flex-1">
        <button className="text-gray-400 hover:text-white" onClick={onPrevious}>
          <SkipBack size={24} />
        </button>
        <button className="bg-white text-black rounded-full p-2" onClick={onPlayPause}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button className="text-gray-400 hover:text-white" onClick={onNext}>
          <SkipForward size={24} />
        </button>
      </div>
      <audio ref={audioRef} src={`/path/to/${currentSong.id}.mp3`} />
    </div>
  )
}

