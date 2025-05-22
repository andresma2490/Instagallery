import { galleryService } from "@/services/GalleryService";
import type { GalleryItem } from "@/types/GalleryItem";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGalleryQuery() {
  const { data, fetchNextPage, isLoading, isError, error } = useInfiniteQuery<
    GalleryItem[]
  >({
    queryKey: ["galleryItems"],
    queryFn: ({ pageParam }) =>
      galleryService.getGalleryItems(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return {
    galleryItems: data?.pages.flat() || [],
    fetchNextPage,
    isLoading,
    isError,
    error,
  };
}
