"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { useRouter } from "next/navigation";

export default function Export() {
  const [name, setName] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

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

      alert("Exportado exitosamente!");
      router.refresh();
      router.push('/');
    } catch (err) {
      console.error(err);
      alert("Fallo exportando imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <label className="text-3xl font-bold">
        Ingrese el número de etiqueta
      </label>
      <input
        ref={inputRef}
        type="number"
        min={1}
        className="border rounded px-3 py-2 w-32 text-center"
        value={name}
        onChange={(e) => setName(Number(e.target.value))}
        placeholder="ID"
      />
      <button
        onClick={handleExport}
        disabled={loading}
        className="absolute bottom-31 right-95 text-xl font-bold bg-blue-600 text-white px-4 py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "EXPORT..." : "IMPRIMIR"}
      </button>
    </div>
  );
}
