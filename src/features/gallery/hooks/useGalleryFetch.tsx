import { useCallback, useEffect, useState } from "react";
import type { GalleryItem } from "@/types/GalleryItem";

export default function useGalleryFetch() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGalleryItems();
  }, []);

  // TODO: implement pagination by frontend
  const getGalleryItems = useCallback(async (start = 0, limit = 15) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: GalleryItem[] = await response.json();
      setGalleryItems((prevItems) => {
        return [
          ...prevItems,
          ...data.map((item) => ({
            ...item,
            url: `https://picsum.photos/id/${item.id}/400/300`,
          })),
        ];
      });
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    galleryItems,
    getGalleryItems,
    isLoading,
    error,
  };
}
