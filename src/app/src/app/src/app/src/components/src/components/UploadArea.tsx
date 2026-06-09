'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppStore } from '@/store/appStore';
import { Upload } from 'lucide-react';
import { validateFile } from '@/lib/validation';
import toast from 'react-hot-toast';

export default function UploadArea() {
  const { addImages } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsLoading(true);
    const validFiles: File[] = [];

    for (const file of acceptedFiles) {
      const validation = validateFile(file);
      if (!validation.valid) {
        toast.error(validation.error || 'Invalid file');
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      const newImages = await Promise.all(
        validFiles.map(async (file) => {
          const reader = new FileReader();
          return new Promise<{ id: string; name: string; src: string }>(
            (resolve) => {
              reader.onload = (e) => {
                const src = e.target?.result as string;
                resolve({
                  id: `${Date.now()}-${Math.random()}`,
                  name: file.name,
                  src,
                });
              };
              reader.readAsDataURL(file);
            }
          );
        })
      );

      addImages(newImages);
      toast.success(`✅ ${newImages.length} image(s) uploaded!`);
    }
    setIsLoading(false);
  }, [addImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-4 border-dashed rounded-lg p-12 text-center transition cursor-pointer ${
          isDragActive
            ? 'border-primary bg-primary/10 scale-105'
            : 'border-primary/30 bg-white hover:border-primary/60'
        }`}
      >
        <input {...getInputProps()} />
        <Upload
          size={48}
          className={`mx-auto mb-4 transition ${
            isDragActive ? 'text-primary scale-125' : 'text-primary/60'
          }`}
        />
        <h2 className="text-2xl font-bold text-accent mb-2">
          {isDragActive ? 'Drop your images here' : 'Upload Your Images'}
        </h2>
        <p className="text-gray-600 mb-4">
          Drag and drop images here, or click to select files
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: JPG, PNG, WEBP (Max 50MB per file)
        </p>
      </div>

      {isLoading && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-lg flex items-center gap-2">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="text-blue-700">Processing images...</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-2">✨</div>
          <h3 className="font-bold text-accent mb-2">Magic Eraser</h3>
          <p className="text-sm text-gray-600">
            Remove unwanted objects with precision
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="font-bold text-accent mb-2">Auto Background Removal</h3>
          <p className="text-sm text-gray-600">
            Professional background removal in seconds
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl mb-2">💧</div>
          <h3 className="font-bold text-accent mb-2">Smart Watermarking</h3>
          <p className="text-sm text-gray-600">
            Protect your work with custom watermarks
          </p>
        </div>
      </div>
    </div>
  );
}
