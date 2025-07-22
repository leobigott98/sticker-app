'use client';

import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Export({ canvasRef }: { canvasRef: any }) {
  const [name, setName] = useState(1);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleExport = async () => {
    setLoading(true);

    if (!canvasRef?.current?.getCanvas) return;
    const canvasEl = canvasRef.current.getCanvas();
    if (!canvasEl) return alert("Canvas not found");

    try {
      const dataUrl = await toPng(canvasEl);
      const blob = await (await fetch(dataUrl)).blob();

      const formData = new FormData();
      formData.append('imageData', blob, `${name}-${Date.now()}.png`);
      formData.append('name', name.toString());

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      alert('Exported successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to export image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
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
        {loading ? 'Exportando...' : 'Exportar'}
      </button>
    </div>
  );
}
