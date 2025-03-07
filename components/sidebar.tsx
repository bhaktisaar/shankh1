import Link from "next/link"
import { Home, Search, Library } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-64 bg-zinc-900 p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Shankh</h1>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/" className="flex items-center space-x-2 hover:text-gray-300">
              <Home size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/search" className="flex items-center space-x-2 hover:text-gray-300">
              <Search size={20} />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link href="/library" className="flex items-center space-x-2 hover:text-gray-300">
              <Library size={20} />
              <span>Library</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

