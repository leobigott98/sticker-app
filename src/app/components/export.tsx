"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import BasicModal from "./success-modal";

export default function Export() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const handleOpenModal = () => setOpenModal(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validate = (val: string) => {
    const pattern = /^(0(0[1-9]|[1-9][0-9])|1[0-9]{2}|2[0-9]{2}|300)$/;
    return pattern.test(val);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if(validate(val)){
      setIsValid(true)
    } else{
      setIsValid(false)
    }
    /* setIsValid(val === '' || validate(val)); */
  };

  const canExport = name.trim() !== '' && validate(name) && !loading;

  const waitForImagesToLoad = async (container: HTMLElement): Promise<void> => {
    const images = container.querySelectorAll("img");
    const promises = Array.from(images).map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve(); // still resolve even on error
          }
        })
    );
    return Promise.all(promises).then(() => undefined);
  };

  const handleExport = async () => {
    setLoading(true);

    const canvasEl = document.getElementById("sticker-canvas"); // 👈 Get by ID

    if (!canvasEl) {
      alert("Canvas not found");
      return;
    }

    try {
      /* const dataUrl = await toPng(canvasEl, {
        width: 1860,
        height: 840,
        style: {
          transform: "scale(2.0667)", // 1860 / 900 = 2.0667
          transformOrigin: "top left",
        },
      }); */

      /* const dataUrl = await toPng(canvasEl, {
        width: 1860,
        height: 840,
        pixelRatio: 1, // Ensure 1:1 ratio for sharpness
        canvasWidth: 1860,
        canvasHeight: 840,
        skipAutoScale: true, // Optional, prevents resizing
        style: {
          margin: "0px",
          padding: "0px",
          boxSizing: "border-box",
          backgroundColor: "#fff", // optional: white background for print
        },
      }); */

      await waitForImagesToLoad(canvasEl);

      const dataUrl = await toPng(canvasEl, {
        /* width: 1860,
        height: 840, */
        pixelRatio: 1, // Ensure 1:1 ratio for sharpness
        canvasWidth: 1860,
        canvasHeight: 840,
        //skipAutoScale: true, // Optional, prevents resizing
        style: {
          margin: "0px",
          padding: "0px",
          boxSizing: "border-box",
          backgroundColor: "#fff", // optional: white background for print
        },
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: dataUrl,
          name: name.toString(),
        }),
      });

      if (!res.ok) throw new Error("Upload failed");

      handleOpenModal();
    } catch (err) {
      console.error(err);
      alert("Fallo exportando imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <BasicModal open={openModal} setOpen={setOpenModal} />
      {/* <form> */}
      <label className="text-3xl font-bold">
        Ingrese el número de etiqueta
      </label>
      <input
        ref={inputRef}
        type="text"
        title="Introduce un ID de etiqueta entre 001 y 300"
        /* className="border rounded px-3 py-2 w-32 text-center" */
        className={`border px-3 py-2 w-32 rounded text-center ${
          isValid ? 'border-gray-300' : 'border-red-500'
        }`}
        value={name}
        onChange={(e)=>handleChange(e)}
        required
        placeholder="e.g. 045"
        inputMode="numeric"
        maxLength={3}
      />
      {!isValid && (
        <p className="text-red-500 text-sm">El ID debe estar entre 001 y 300</p>
      )}
      <button
        onClick={handleExport}
        disabled={!canExport}
        className="absolute bottom-31 right-95 text-xl font-bold bg-blue-600 text-white px-4 py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        type="submit"
      >
        {loading ? "EXPORT..." : "IMPRIMIR"}
      </button>
      {/* </form> */}
    </div>
  );
}
