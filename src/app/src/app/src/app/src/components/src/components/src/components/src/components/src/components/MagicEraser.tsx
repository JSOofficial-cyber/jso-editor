'use client';

import { useState, useRef, useEffect } from 'react';
import { RotateCcw, Download } from 'lucide-react';
import toast from 'react-hot-toast';

interface MagicEraserProps {
  image: {
    id: string;
    name: string;
    src: string;
  };
}

export default function MagicEraser({ image }: MagicEraserProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(20);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = Math.min(img.width, 800);
      canvas.height = (canvas.width / img.width) * img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setContext(ctx);
      setOriginalImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
    };
    img.src = image.src;
  }, [image.src]);

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
  };

  const resetCanvas = () => {
    if (!context || !originalImageData) return;
    context.putImageData(originalImageData, 0, 0);
    toast.success('Canvas reset');
  };

  const downloadResult = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `erased-${image.name}`;
    link.click();
    toast.success('Image downloaded!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-accent mb-4">✨ Magic Eraser</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-accent mb-2">
            Brush Size: {brushSize}px
          </label>
          <input
            type="range"
            min="5"
            max="100"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="mb-6">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          className="w-full border-2 border-primary/30 rounded-lg cursor-crosshair bg-white shadow-md"
        />
      </div>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={resetCanvas}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          <RotateCcw size={18} />
          Reset
        </button>
        <button
          onClick={downloadResult}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          <Download size={18} />
          Download
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        💡 Tip: Click and drag to erase areas of the image
      </p>
    </div>
  );
}
