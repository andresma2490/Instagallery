import { createContext, useContext } from "react";
import useGalleryFetch from "../hooks/useGalleryFetch";
import type { GalleryItem } from "@/types/GalleryItem";

type GalleryContextType = {
  galleryItems: GalleryItem[];
  getGalleryItems: (start?: number, limit?: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const { galleryItems, getGalleryItems, isLoading, error } = useGalleryFetch();

  return (
    <GalleryContext.Provider
      value={{ galleryItems, getGalleryItems, isLoading, error }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};
