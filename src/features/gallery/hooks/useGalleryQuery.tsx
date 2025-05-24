import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { GalleryItem } from "@/types/GalleryItem";
import { galleryService } from "@/services/galleryService";
import { useCallback } from "react";

const GALLERY_ITEMS_KEY = "galleryItems";

export function useGalleryQuery() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery<GalleryItem[]>({
    queryKey: [GALLERY_ITEMS_KEY],
    queryFn: () => galleryService.getGalleryItems(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const toggleFavorite = useCallback((itemId: number) => {
    queryClient.setQueryData<GalleryItem[]>([GALLERY_ITEMS_KEY], (prevData) => {
      if (!prevData) return [];
      return prevData.map((item) =>
        item.id === itemId ? { ...item, favorite: !item?.favorite } : item,
      );
    });
  }, []);

  return {
    galleryItems: data || [],
    toggleFavorite,
    isLoading,
    isError,
    error,
  };
}
