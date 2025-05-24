import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import * as GalleryQuery from "../../hooks/useGalleryQuery";
import * as ColumnsHook from "../../hooks/useColumns";
import GalleryPage from "../GalleryPage";
import { galleryItemsMocked } from "@/mocks/galleryItems";

vi.mock("../../components/GalleryItem", () => ({
  default: ({ item }: { item: { id: number } }) => (
    <div data-testid="gallery-item">Item {item.id}</div>
  ),
}));
window.scrollTo = vi.fn();

describe("GalleryPage", () => {
  const mockToggleFavorite = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a portion of the gallery items", () => {
    vi.spyOn(ColumnsHook, "useColumns").mockReturnValue(3);
    vi.spyOn(GalleryQuery, "useGalleryQuery").mockReturnValue({
      galleryItems: galleryItemsMocked,
      toggleFavorite: mockToggleFavorite,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<GalleryPage />);
    const items = screen.getAllByTestId("gallery-item");
    expect(items.length).toBeGreaterThan(0);
    expect(items.length).toBeLessThan(galleryItemsMocked.length);
  });

  it("renders loading placeholders when loading", () => {
    vi.spyOn(ColumnsHook, "useColumns").mockReturnValue(3);
    vi.spyOn(GalleryQuery, "useGalleryQuery").mockReturnValue({
      galleryItems: [],
      toggleFavorite: mockToggleFavorite,
      isLoading: true,
      isError: false,
      error: null,
    });
    render(<GalleryPage />);
    const placeholders = screen.getAllByRole("status");

    expect(placeholders.length).toBe(9);
  });

  it("shows error message when error occurs", () => {
    vi.spyOn(ColumnsHook, "useColumns").mockReturnValue(3);
    vi.spyOn(GalleryQuery, "useGalleryQuery").mockReturnValue({
      galleryItems: [],
      toggleFavorite: mockToggleFavorite,
      isLoading: false,
      isError: true,
      error: new Error("Fetch failed"),
    });

    render(<GalleryPage />);
    expect(screen.getByText(/fetch failed/i)).toBeInTheDocument();
  });

  it("shows 'No items found' when gallery is empty", () => {
    vi.spyOn(ColumnsHook, "useColumns").mockReturnValue(3);
    vi.spyOn(GalleryQuery, "useGalleryQuery").mockReturnValue({
      galleryItems: [],
      toggleFavorite: mockToggleFavorite,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<GalleryPage />);
    expect(screen.getByText(/no items found/i)).toBeInTheDocument();
  });
});
