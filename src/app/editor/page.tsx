"use client";

import { useState } from "react";
import Steps from "../components/stepper";

export default function Page() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [stickers, setStickers] = useState<{topLeft: string | null, topRight: string | null, bottomLeft: string | null, bottomRight: string | null}>({
    topLeft: null,
    topRight: null,
    bottomLeft: null,
    bottomRight: null,
  });

  return (
    <div className="p-4 space-y-8">
      {/* Friendly Banner / Hero Section */}
      <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-6 rounded-xl shadow-md text-center space-y-2">
        <div className="flex justify-center">
          {/* <Sparkles className="w-8 h-8 text-indigo-500" /> */}
        </div>
        <h2 className="text-xl font-semibold text-indigo-700">¡Bienvenido!</h2>
        <p className="text-sm text-gray-700 max-w-md mx-auto">
          Sigue los pasos para colocar las imágenes de tu preferencia y
          customizar tu etiquera. ¡Es súper sencillo! — te guiaremos en cada
          paso ✨
        </p>
      </div>

      {/* Stepper */}
      <div className="flex flex-col md:flex-row gap-4 p-4">

      {/* Steps (with access to setBackgroundImage/setStickers) */}
      <div className="flex-1">
        <Steps
          backgroundImage={backgroundImage}
          setBackgroundImage={setBackgroundImage}
          stickers={stickers}
          setStickers={setStickers}
        />
      </div>
    </div>
    </div>
  );
}
