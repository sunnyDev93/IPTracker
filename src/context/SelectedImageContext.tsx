import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ImageType } from '../types/image';

interface SelectedImageContextType {
  selectedImage: ImageType | null;
  setSelectedImage: (image: ImageType | null) => void;
}

const SelectedImageContext = createContext<SelectedImageContextType | undefined>(undefined);

export const SelectedImageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  return (
    <SelectedImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </SelectedImageContext.Provider>
  );
};

export const useSelectedImage = (): SelectedImageContextType => {
  const context = useContext(SelectedImageContext);
  if (!context) {
    throw new Error('useSelectedImage must be used within a SelectedImageProvider');
  }
  return context;
};
