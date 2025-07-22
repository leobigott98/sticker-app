"use client";

//import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useImperativeHandle, forwardRef, } from "react";
import Image from "next/image";

export const StickerCanvas = forwardRef( function StickerCanvas({
  className,
  backgroundImage,
  stickers, // { topLeft, topRight, bottomLeft, bottomRight }
  setStickers,
}: {
  className?: string;
  backgroundImage: string | null;
  stickers: {
    topLeft: string | null;
    topRight: string | null;
    bottomLeft: string | null;
    bottomRight: string | null;
  } | null;
  setStickers: Dispatch<
    SetStateAction<{
      topLeft: string | null;
      topRight: string | null;
      bottomLeft: string | null;
      bottomRight: string | null;
    }>
  >;
}, ref) {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Expose canvasRef to parent via forwardRef
  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));

  return (
    <div
      ref={canvasRef}
      className={
        className
          ? className
          : `relative w-[900px] h-[400px] border border-gray-300 rounded overflow-hidden`
      }
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundColor: backgroundImage ? "transparent" : "#e5e7eb", // Tailwind gray-200
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top Left */}
      {stickers?.topLeft && (
        <div
          className="absolute top-10 left-10"
          //style={{ backgroundImage: `url(${stickers.topLeft})` }}
          onClick={() =>
            setStickers({
              ...stickers,
              topLeft: null,
            })
          }
        >
          <Image src={stickers.topLeft} alt="Top Left Sticker" width={150} height={150} />
        </div>
      )}

      {/* Top Right */}
      {stickers?.topRight && (
        <div
          className="absolute top-10 right-10"
          //style={{ backgroundImage: `url(${stickers.topRight})` }}
          onClick={() =>
            setStickers({
              ...stickers,
              topRight: null,
            })
          }
        >
          <Image src={stickers.topRight} alt="Top Right Sticker" width={150} height={150} />
        </div>
      )}

      {/* Bottom Left */}
      {stickers?.bottomLeft && (
        <div
          className="absolute bottom-10 left-20"
          //style={{ backgroundImage: `url(${stickers.bottomLeft})` }}
          onClick={() =>
            setStickers({
              ...stickers,
              bottomLeft: null,
            })
          }
        >
          <Image src={stickers.bottomLeft} alt="Bottom Left Sticker" width={200} height={200} />
        </div>
      )}

      {/* Bottom Right */}
      {stickers?.bottomRight && (
        <div
          className="absolute bottom-10 right-20"
          //style={{ backgroundImage: `url(${stickers.bottomRight})` }}
          onClick={() =>
            setStickers({
              ...stickers,
              bottomRight: null,
            })
          }
        >
          <Image src={stickers.bottomRight} alt="Bottom Right Sticker" width={200} height={200} />
        </div>
      )}
    </div>
  );
});