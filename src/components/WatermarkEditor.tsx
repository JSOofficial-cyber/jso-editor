'use client';

import { useState, useRef, useEffect } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Watermark {
  id: string;
  type: 'text' | 'image';
  text?: string;
  fontSize?: number;
  opacity?: number;
  x?: number;
  y?: number;
  color?: string;
}

interface WatermarkEditorProps {
  image: {
    id: string;
    name: string;
    src: string;
  };
}

export default function WatermarkEditor({ image }: WatermarkEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [watermarks, setWatermarks] = useState<Watermark[]>([]);
  const [textInput, setTextInput] = useState('JewelsEVO');
  const [fontSize, setFontSize] = useState(24);
  const [opacity, setOpacity] = useState(0.7);
  const [color, setColor] = useState('#ffffff');

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

      watermarks.forEach((watermark) => {
        if (watermark.type === 'text' && watermark.text) {
          ctx.font = `${watermark.fontSize || fontSize}px Inter, sans-serif`;
          ctx.fillStyle = watermark.color || color;
          ctx.globalAlpha = watermark.opacity || opacity;
          ctx.fillText(
            watermark.text,
            watermark.x || canvas.width - 200,
            watermark.y || canvas.height - 20
          );
          ctx.globalAlpha = 1;
        }
      });
    };
    img.src = image.src;
  }, [image.src, watermarks, fontSize, opacity, color]);

  const addWatermark = () => {
    if (!textInput.trim()) {
      toast.error('Please enter watermark text');
      return;
    }

    const newWatermark: Watermark = {
      id: `${Date.now()}`,
      type: 'text',
      text: textInput,
      fontSize,
      opacity,
      color,
      x: 20,
      y: canvasRef.current ? canvasRef.current.height - 20 : 100,
    };

    setWatermarks([...watermarks, newWatermark]);
    toast.success('Watermark added!');
  };

  const removeWatermark = (id: string) => {
    setWatermarks(watermarks.filter((w) => w.id !== id));
  };

  const downloadResult = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `watermarked-${image.name}`;
    link.click();
    toast.success('Image downloaded!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-accent mb-4">💧 Watermark Editor</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <canvas
            ref={canvasRef}
            className="w-full border-2 border-primary/30 rounded-lg bg-white shadow-md"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-accent mb-2">
              Watermark Text
            </label>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full px-3 py-2 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="Enter text"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-accent mb-2">
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min="10"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-accent mb-2">
              Opacity: {Math.round(opacity * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-accent mb-2">
              Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>

          <button
            onClick={addWatermark}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            <Plus size={18} />
            Add Watermark
          </button>
        </div>
      </div>

      {watermarks.length > 0 && (
        <div className="mt-6 p-4 bg-beige-50 rounded-lg">
          <h3 className="font-semibold text-accent mb-3">Active Watermarks:</h3>
          <div className="space-y-2">
            {watermarks.map((watermark) => (
              <div
                key={watermark.id}
                className="flex items-center justify-between bg-white p-3 rounded-lg"
              >
                <span className="text-sm text-gray-700">{watermark.text}</span>
                <button
                  onClick={() => removeWatermark(watermark.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={downloadResult}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex-1"
        >
          <Download size={18} />
          Download Watermarked
        </button>
      </div>
    </div>
  );
}
