"use client"

import { useState } from "react"
import Player from "@/components/player"
import Home from "@/components/home"

const songs = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", coverUrl: "/placeholder.svg?height=300&width=300" },
  { id: 2, title: "Imagine", artist: "John Lennon", coverUrl: "/placeholder.svg?height=300&width=300" },
  { id: 3, title: "Billie Jean", artist: "Michael Jackson", coverUrl: "/placeholder.svg?height=300&width=300" },
  { id: 4, title: "Like a Rolling Stone", artist: "Bob Dylan", coverUrl: "/placeholder.svg?height=300&width=300" },
  { id: 5, title: "Smells Like Teen Spirit", artist: "Nirvana", coverUrl: "/placeholder.svg?height=300&width=300" },
  { id: 6, title: "Purple Rain", artist: "Prince", coverUrl: "/placeholder.svg?height=300&width=300" },
]

export default function Page() {
  const [currentSongId, setCurrentSongId] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentSong = currentSongId ? songs.find((song) => song.id === currentSongId) || null : null

  const handlePlayPause = (songId: number) => {
    if (songId === currentSongId) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentSongId(songId)
      setIsPlaying(true)
    }
  }

  const handlePrevious = () => {
    if (currentSongId) {
      const currentIndex = songs.findIndex((song) => song.id === currentSongId)
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length
      setCurrentSongId(songs[previousIndex].id)
      setIsPlaying(true)
    }
  }

  const handleNext = () => {
    if (currentSongId) {
      const currentIndex = songs.findIndex((song) => song.id === currentSongId)
      const nextIndex = (currentIndex + 1) % songs.length
      setCurrentSongId(songs[nextIndex].id)
      setIsPlaying(true)
    }
  }

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8 pb-24">
        <Home songs={songs} currentSongId={currentSongId} isPlaying={isPlaying} onPlayPause={handlePlayPause} />
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </>
  )
}

