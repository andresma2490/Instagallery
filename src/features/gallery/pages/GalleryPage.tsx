import { useState } from "react";
import GalleryItem from "../components/GalleryItem";
import { useGallery } from "../contexts/GalleryContext";

export default function GalleryPage() {
  const { getGalleryItems, galleryItems, isLoading, error } = useGallery();
  const [page, setPage] = useState(0);

  const handleLoadMore = () => {
    const itemsPerPage = 15;
    const start = (page + 1) * itemsPerPage;
    setPage((prevPage) => prevPage + 1);
    getGalleryItems(start);
  };

  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto gap-4">
        {galleryItems.map((item) => (
          <GalleryItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleLoadMore}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Load More
        </button>
      </div>
      <div className="flex justify-center">
        {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </main>
  );
}
