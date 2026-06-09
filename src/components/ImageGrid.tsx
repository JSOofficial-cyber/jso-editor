'use client';

import { useAppStore } from '@/store/appStore';
import { Trash2, Download } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageGridProps {
  onSelectImage: (id: string) => void;
  selectedId: string | null;
}

export default function ImageGrid({ onSelectImage, selectedId }: ImageGridProps) {
  const { images, removeImage } = useAppStore();

  const downloadImage = (image: { id: string; name: string; src: string }) => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = image.name || 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No images uploaded yet</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-accent mb-6">Your Images ({images.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => onSelectImage(image.id)}
            className={`relative group rounded-lg overflow-hidden shadow-md transition cursor-pointer ${
              selectedId === image.id
                ? 'ring-4 ring-primary scale-105'
                : 'hover:shadow-lg'
            }`}
          >
            <div className="relative w-full h-48 bg-gray-200">
              <img
                src={image.src}
                alt={image.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(image);
                }}
                className="bg-white text-accent p-2 rounded-full opacity-0 group-hover:opacity-100 transition transform hover:scale-110"
              >
                <Download size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(image.id);
                  toast.success('Image removed');
                }}
                className="bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition transform hover:scale-110"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-3 bg-white">
              <p className="text-xs text-gray-600 truncate">{image.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
