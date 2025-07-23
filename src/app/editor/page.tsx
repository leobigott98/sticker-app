"use client";

import { useState } from "react";
import Steps from "../components/stepper";
import Image from "next/image";

export default function Page() {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [stickers, setStickers] = useState<{topLeft: string | null, topRight: string | null, bottomLeft: string | null, bottomRight: string | null}>({
    topLeft: null,
    topRight: null,
    bottomLeft: null,
    bottomRight: null,
  });

  return (
    <div className="p-4 space-y-8">
      {/* Friendly Banner / Hero Section */}
      <div className="flex bg-[#009d7f] rounded-xl shadow-md p-5 justify-end">
        <Image 
          src='/logo_banner.png'
          alt='logo ism'
          width={500}
          height={500}
        />

        {/* <div className="flex justify-center">
          
        </div>
        <h2 className="text-xl font-semibold text-indigo-700">¡Bienvenido!</h2>
        <p className="text-sm text-gray-700 max-w-md mx-auto">
          Sigue los pasos para colocar las imágenes de tu preferencia y
          customizar tu etiquera. ¡Es súper sencillo! — te guiaremos en cada
          paso ✨
        </p> */}
      </div>

      {/* Stepper */}
      {/* <div className="flex flex-col md:flex-row gap-4 p-4"> */}

      {/* Steps (with access to setBackgroundImage/setStickers) */}
      <div className="flex-1">
        <Steps
          backgroundImage={backgroundImage}
          setBackgroundImage={setBackgroundImage}
          stickers={stickers}
          setStickers={setStickers}
        />
      </div>
    {/* </div> */}
    </div>
  );
}
