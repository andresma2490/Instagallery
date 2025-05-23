import React from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import type { GalleryItem } from "@/types/GalleryItem";

type GalleryItemProps = {
  item: GalleryItem;
  toggleFavorite: (id: number) => void;
};

export default React.memo(function GalleryItem({
  item,
  toggleFavorite,
}: GalleryItemProps) {
  console.log("GalleryItem", item.id);
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "https://placehold.co/600x400";
  };

  return (
    <div
      key={item.id}
      className="bg-white shadow-md rounded-lg h-[380px] overflow-hidden"
    >
      <img
        src={item.url}
        onError={handleImageError}
        alt={item.title}
        loading="lazy"
        width={600}
        height={400}
        className="object-cover w-full h-[250px]"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {item.title.length > 32
            ? `${item.title.slice(0, 32)}...`
            : item.title}
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            ID:{item.id} | AlbumID: {item.albumId}
          </p>
          <button
            onClick={() => toggleFavorite(item.id)}
            className={`cursor-pointer ${item.favorite && "text-red-700"}`}
          >
            {item.favorite ? (
              <IoHeart className="text-2xl" />
            ) : (
              <IoHeartOutline className="text-2xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
