import Link from "next/link"
import Image from "next/image"

interface PlaylistCardProps {
  playlist: {
    id: number
    name: string
    imageUrl: string
  }
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Link href={`/playlist/${playlist.id}`} className="block">
      <div className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition duration-300">
        <Image
          src={playlist.imageUrl || "/placeholder.svg"}
          alt={playlist.name}
          width={150}
          height={150}
          className="w-full aspect-square object-cover rounded-md mb-2"
        />
        <h3 className="font-semibold truncate">{playlist.name}</h3>
      </div>
    </Link>
  )
}

