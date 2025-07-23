import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return(
    <div className="relative w-screen h-screen">
      <Image
        src="/Portada3.png"
        alt="Portada"
        fill
        className="object-cover"
        priority
      />
        <div className="absolute bottom-3/12 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <Link
          href={'/editor'} 
          className="px-16 py-10 bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition text-4xl font-bold shadow-white"
          >
            ¡EMPIEZA!
          </Link>
      </div>
    </div>
  )
}