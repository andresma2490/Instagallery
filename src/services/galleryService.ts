import { api } from "@/lib/axios";
import type { GalleryItem } from "@/types/GalleryItem";

const getGalleryItems = async () => {
  const response = await api.get(`/photos?_limit=2000`);
  return response.data.map((item: GalleryItem) => ({
    ...item,
    url: `https://picsum.photos/id/${item.id}/600/400`,
  }));
};

export const galleryService = {
  getGalleryItems,
};
