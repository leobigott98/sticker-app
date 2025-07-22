import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return(
    <div className="relative w-screen h-screen">
      <Image
        src="/Portada.png"
        alt="Portada"
        fill
        className="object-cover"
        priority
      />
        <div className="absolute bottom-64 left-1/2 transform -translate-x-1/2 z-10">
          <Link
          href={'/editor'} 
          className="px-12 py-6 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition text-2xl"
          >
            ¡Crea tu propia Etiqueta!
          </Link>
      </div>
    </div>
  )
}