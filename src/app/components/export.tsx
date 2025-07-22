"use client";

import { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Export({ canvasRef }: { canvasRef: any }) {
  const [name, setName] = useState(1);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  /* useEffect(() => {
  if (canvasRef.current) {
    console.log(canvasRef.current.getCanvas());
  }
}, [canvasRef]); */

  const handleExport = async () => {
    setLoading(true);

    /* if (!canvasRef?.current?.getCanvas) {
      console.log("no ref");
      return;
    } */

    const canvasEl = document.getElementById("sticker-canvas"); // 👈 Get by ID
    
    if (!canvasEl) {
      alert("Canvas not found");
      return;
    }

    try {
      const dataUrl = await toPng(canvasEl);

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

      alert("Exported successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to export image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <label
        className="text-3xl font-bold"
      >
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Exportando..." : "Exportar"}
      </button>
    </div>
  );
}
