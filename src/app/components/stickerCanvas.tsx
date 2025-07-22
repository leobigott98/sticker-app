"use client";

//import Image from "next/image";
import { useRef } from "react";

export default function StickerCanvas({
  backgroundImage,
  stickers, // { topLeft, topRight, bottomLeft, bottomRight }
}: {
  backgroundImage: string | null;
  stickers: {
    topLeft?: string | null;
    topRight?: string | null;
    bottomLeft?: string | null;
    bottomRight?: string | null;
  } | null;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={canvasRef}
      className="relative w-[400px] h-[400px] border border-gray-300 rounded overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundColor: backgroundImage ? "transparent" : "#e5e7eb", // Tailwind gray-200
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top Left */}
      {stickers?.topLeft && (
        <div className="absolute top-2 left-2 w-20 h-20 bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${stickers.topLeft})` }}
        />
      )}

      {/* Top Right */}
      {stickers?.topRight && (
        <div className="absolute top-2 right-2 w-20 h-20 bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${stickers.topRight})` }}
        />
      )}

      {/* Bottom Left */}
      {stickers?.bottomLeft && (
        <div className="absolute bottom-2 left-2 w-20 h-20 bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${stickers.bottomLeft})` }}
        />
      )}

      {/* Bottom Right */}
      {stickers?.bottomRight && (
        <div className="absolute bottom-2 right-2 w-20 h-20 bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: `url(${stickers.bottomRight})` }}
        />
      )}
    </div>
  );
}