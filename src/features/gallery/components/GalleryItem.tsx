import type { GalleryItem } from "@/types/GalleryItem";
import React from "react";

type GalleryItemProps = {
  item: GalleryItem;
};

function GalleryItem({ item }: GalleryItemProps) {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "https://picsum.photos/id/237/400/300";
  };

  return (
    <div
      key={item.id}
      className="bg-white shadow-md rounded-lg overflow-hidden"
    >
      <img
        src={item.url}
        onError={handleImageError}
        alt={item.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <p className="text-gray-600">Album ID: {item.albumId}</p>
      </div>
    </div>
  );
}

export default React.memo(GalleryItem);
