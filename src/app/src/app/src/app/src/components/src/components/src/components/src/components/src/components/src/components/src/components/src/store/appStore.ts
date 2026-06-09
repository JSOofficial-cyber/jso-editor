import { create } from 'zustand';

interface Image {
  id: string;
  name: string;
  src: string;
}

interface AppStore {
  images: Image[];
  addImages: (images: Image[]) => void;
  removeImage: (id: string) => void;
  clearImages: () => void;
  updateImage: (id: string, updates: Partial<Image>) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  images: [],
  addImages: (newImages) =>
    set((state) => ({
      images: [...state.images, ...newImages],
    })),
  removeImage: (id) =>
    set((state) => ({
      images: state.images.filter((img) => img.id !== id),
    })),
  clearImages: () => set({ images: [] }),
  updateImage: (id, updates) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, ...updates } : img
      ),
    })),
}));
