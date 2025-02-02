import TrackList from "@/components/track-list"

const tracks = [
  { id: 1, title: "Song 1", artist: "Artist 1", duration: "3:45" },
  { id: 2, title: "Song 2", artist: "Artist 2", duration: "4:12" },
  { id: 3, title: "Song 3", artist: "Artist 3", duration: "3:21" },
  { id: 4, title: "Song 4", artist: "Artist 4", duration: "3:56" },
]

export default function PlaylistPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Playlist {params.id}</h1>
      <TrackList tracks={tracks} />
    </div>
  )
}

