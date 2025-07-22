// app/admin/page.tsx

import { fetchStickerImages } from '@/app/lib/data'; // adjust path if needed
import Image from 'next/image';
import Link from 'next/link';

export default async function AdminGalleryPage() {
  const stickers = await fetchStickerImages();

  if (!stickers || stickers.length === 0) {
    return <div className="p-8 text-center text-gray-500">No stickers found.</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Sticker Gallery</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stickers.map((sticker) => (
          <div
            key={sticker.id}
            className="bg-white shadow rounded-lg overflow-hidden border flex flex-col"
          >
            <div className="relative h-48 w-full">
                <Link
                    href={sticker.signed_url}
                    target="_blank"
                >
                    <Image
                        src={sticker.signed_url} // adjust based on your DB
                        alt={`Sticker ${sticker.id}`}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </Link>
              
            </div>

            <div className="flex justify-center p-3">
              <p
                className="text-sm text-black-600"
              >
                {sticker.name}
              </p>
              {/* <a
                href={sticker.signed_url}
                download
                className="text-sm text-green-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a> */}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
