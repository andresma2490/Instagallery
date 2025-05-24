import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { galleryItemsMocked } from "@/mocks/galleryItems";
import GalleryItem from "../GalleryItem";

vi.mock("react-icons/io5", () => ({
  IoHeart: ({ className }: { className?: string }) => (
    <div data-testid="IoHeart" className={className}>
      heart-filled
    </div>
  ),
  IoHeartOutline: ({ className }: { className?: string }) => (
    <div data-testid="IoHeartOutline" className={className}>
      heart-outline
    </div>
  ),
}));

describe("GalleryItem", () => {
  const mockItem = galleryItemsMocked[0];
  const toggleFavorite = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("renders the gallery item", () => {
    render(<GalleryItem item={mockItem} toggleFavorite={toggleFavorite} />);
    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", mockItem.url);
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(
      screen.getByText(`ID:${mockItem.id} | AlbumID: ${mockItem.albumId}`),
    ).toBeInTheDocument();
  });

  it("replaces image src on error", () => {
    render(<GalleryItem item={mockItem} toggleFavorite={toggleFavorite} />);
    const img = screen.getByRole("img") as HTMLImageElement;
    fireEvent.error(img);
    expect(img.src).toContain("https://placehold.co/600x400");
  });

  it("calls toggleFavorite when button is clicked", () => {
    render(<GalleryItem item={mockItem} toggleFavorite={toggleFavorite} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(toggleFavorite).toHaveBeenCalledWith(mockItem.id);
  });

  it("shows correct icon based on favorite status", () => {
    const testCases = [
      { favorite: false, expectedIcon: "IoHeartOutline" },
      { favorite: true, expectedIcon: "IoHeart" },
    ];
    testCases.forEach(({ favorite, expectedIcon }) => {
      render(
        <GalleryItem
          item={{ ...mockItem, favorite }}
          toggleFavorite={toggleFavorite}
        />,
      );
      const icon = screen.getByTestId(expectedIcon);
      expect(icon).toBeInTheDocument();
    });
  });
});
