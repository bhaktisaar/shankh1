import { Play } from "lucide-react"

interface Track {
  id: number
  title: string
  artist: string
  duration: string
}

interface TrackListProps {
  tracks: Track[]
}

export default function TrackList({ tracks }: TrackListProps) {
  return (
    <div className="space-y-2">
      {tracks.map((track) => (
        <div key={track.id} className="flex items-center justify-between p-2 hover:bg-zinc-800 rounded">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">
              <Play size={20} />
            </button>
            <div>
              <h3 className="font-semibold">{track.title}</h3>
              <p className="text-sm text-gray-400">{track.artist}</p>
            </div>
          </div>
          <span className="text-sm text-gray-400">{track.duration}</span>
        </div>
      ))}
    </div>
  )
}

