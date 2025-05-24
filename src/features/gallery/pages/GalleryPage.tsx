import { useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useGalleryQuery } from "../hooks/useGalleryQuery";
import { useColumns } from "../hooks/useColumns";
import GalleryItem from "../components/GalleryItem";

export default function GalleryPage() {
  const { galleryItems, toggleFavorite, isLoading, error } = useGalleryQuery();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const columns = useColumns();
  const rowCount = Math.ceil(galleryItems.length / columns);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 390,
    overscan: 9,
    scrollMargin: scrollContainerRef.current?.offsetTop || 0,
  });
  const virtualRows = virtualizer.getVirtualItems();

  return (
    <main
      ref={scrollContainerRef}
      className="w-full min-h-screen flex flex-col gap-4 p-4"
    >
      <div
        style={{ height: `${virtualizer.getTotalSize()}px` }}
        className="relative w-full lg:w-3/4 mx-auto"
      >
        <div className="absolute w-full top-0 left-0">
          {virtualRows.map((vRow) => (
            <div
              key={vRow.index}
              style={{
                height: `${vRow.size}px`,
                transform: `translateY(${vRow.start - 72}px)`,
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
              }}
              className="absolute top-0 left-0 w-full grid gap-4"
            >
              {Array.from({ length: columns }).map((_, columnIndex) => {
                const itemIndex = vRow.index * columns + columnIndex;
                const item = galleryItems[itemIndex];
                if (!item) return null;
                return (
                  <GalleryItem
                    key={item.id}
                    item={item}
                    toggleFavorite={toggleFavorite}
                  />
                );
              })}
            </div>
          ))}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-200 rounded-lg h-[380px]"
                  role="status"
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        {!isLoading && galleryItems.length === 0 && (
          <p className="text-sm text-gray-500">No items found</p>
        )}
        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    </main>
  );
}
