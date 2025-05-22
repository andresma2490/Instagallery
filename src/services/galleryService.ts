import { api } from "@/lib/axios";
import type { GalleryItem } from "@/types/GalleryItem";

const getGalleryItems = async (pageParam = 0) => {
  const limit = 15;
  const start = pageParam * limit;
  const response = await api.get(`/photos?_start=${start}&_limit=${limit}`);
  return response.data.map((item: GalleryItem) => ({
    ...item,
    url: `https://picsum.photos/id/${item.id}/400/300`,
  }));
};

export const galleryService = {
  getGalleryItems,
};
