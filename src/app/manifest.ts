import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ISM Soda Sticker App',
    short_name: 'ISMSticker',
    description: 'ISM Soda Sticker Personalization App',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}