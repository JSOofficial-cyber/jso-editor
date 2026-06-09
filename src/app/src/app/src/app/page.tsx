'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import UploadArea from '@/components/UploadArea';
import ImageGrid from '@/components/ImageGrid';
import MagicEraser from '@/components/MagicEraser';
import WatermarkEditor from '@/components/WatermarkEditor';
import AdminPanel from '@/components/AdminPanel';
import { useAppStore } from '@/store/appStore';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upload' | 'edit' | 'watermark' | 'admin'>('upload');
  const { images } = useAppStore();
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const selectedImage = images.find(img => img.id === selectedImageId);

  return (
    <main className="min-h-screen bg-gradient-to-br from-secondary via-white to-beige-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'upload'
                ? 'bg-primary text-white'
                : 'bg-white text-accent hover:bg-beige-50'
            }`}
          >
            📤 Upload
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            disabled={images.length === 0}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'edit'
                ? 'bg-primary text-white'
                : images.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-accent hover:bg-beige-50'
            }`}
          >
            ✨ Magic Eraser
          </button>
          <button
            onClick={() => setActiveTab('watermark')}
            disabled={images.length === 0}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'watermark'
                ? 'bg-primary text-white'
                : images.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-accent hover:bg-beige-50'
            }`}
          >
            💧 Watermark
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'admin'
                ? 'bg-primary text-white'
                : 'bg-white text-accent hover:bg-beige-50'
            }`}
          >
            ⚙️ Admin
          </button>
        </div>

        {activeTab === 'upload' && <UploadArea />}
        
        {activeTab === 'edit' && (
          <div className="space-y-8">
            <ImageGrid onSelectImage={setSelectedImageId} selectedId={selectedImageId} />
            {selectedImage && <MagicEraser image={selectedImage} />}
          </div>
        )}
        
        {activeTab === 'watermark' && (
          <div className="space-y-8">
            <ImageGrid onSelectImage={setSelectedImageId} selectedId={selectedImageId} />
            {selectedImage && <WatermarkEditor image={selectedImage} />}
          </div>
        )}
        
        {activeTab === 'admin' && <AdminPanel />}
      </div>
    </main>
  );
}
