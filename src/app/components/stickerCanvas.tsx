"use client";

//import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

// Type for the exposed handle
export type StickerCanvasHandle = {
  getCanvas: () => HTMLDivElement | null;
};

export const StickerCanvas = forwardRef<
  StickerCanvasHandle,
  {
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
  }
>(function StickerCanvas(
  { className, backgroundImage, stickers, setStickers },
  ref
) {
  const canvasRef = useRef<HTMLDivElement>(null);

  // This makes getCanvas() available on the ref
  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));

  return (
    <div
      id="sticker-canvas"
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
          <div className="w-[200px] h-[200px] flex items-center justify-center">
            { /* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stickers.topLeft}
            alt="Top Left Sticker"
            className="object-contain"
          />
          </div>
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
          <div className="w-[200px] h-[200px] flex items-center justify-center">
            { /* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stickers.topRight}
            alt="Top Right Sticker"
            className="object-contain"
          />
          </div>
        </div>
      )}

      {/* Bottom Left */}
      {stickers?.bottomLeft && (
        <div
          className="absolute bottom-0 left-10"
          //style={{ backgroundImage: `url(${stickers.bottomLeft})` }}
          onClick={() =>
            setStickers({
              ...stickers,
              bottomLeft: null,
            })
          }
        >
          <div className="w-[250px] h-[250px] flex items-center justify-center">
            { /* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stickers.bottomLeft}
            alt="Bottom Left Sticker"
            className="object-contain"
          />
          </div>
        </div>
      )}

      {/* Bottom Right */}
      {stickers?.bottomRight && (
        <div
          className="absolute bottom-0 right-10"
          //style={{ backgroundImage: `url(${stickers.bottomRight})` }}
          onClick={() =>
            setStickers({
              ...stickers,
              bottomRight: null,
            })
          }
        >
          <div className="w-[250px] h-[250px] bottom-0 flex items-end justify-baseline">
          { /* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stickers.bottomRight}
            alt="Bottom Right Sticker"
            className="object-contain"
          />
          </div>
        </div>
      )}
    </div>
  );
});
