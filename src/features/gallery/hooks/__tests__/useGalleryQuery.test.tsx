import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGalleryQuery } from "../useGalleryQuery";
import { galleryService } from "@/services/galleryService";
import { galleryItemsMocked } from "@/mocks/galleryItems";

vi.mock("@/services/galleryService", () => ({
  galleryService: {
    getGalleryItems: vi.fn(),
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useGalleryQuery", () => {
  const mockItems = galleryItemsMocked;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetch gallery items successfully", async () => {
    vi.mocked(galleryService.getGalleryItems).mockResolvedValue(mockItems);
    const { result } = renderHook(() => useGalleryQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.galleryItems.length > 0);

    expect(result.current.galleryItems).toEqual(mockItems);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("toggles favorite state in cache", async () => {
    vi.mocked(galleryService.getGalleryItems).mockResolvedValue(mockItems);
    const itemId = galleryItemsMocked[0].id;
    const { result } = renderHook(() => useGalleryQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.galleryItems.length > 0);
    act(() => {
      result.current.toggleFavorite(itemId);
    });

    await waitFor(() => {
      const updated = result.current.galleryItems.find((item) => item.id === 1);
      expect(updated?.favorite).toBe(true);
    });
  });

  it("handles error state", async () => {
    vi.mocked(galleryService.getGalleryItems).mockImplementation(() => {
      return Promise.reject(new Error("Fetch failed"));
    });
    const { result } = renderHook(() => useGalleryQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      if (!result.current.isError) {
        throw new Error("Still not in error state");
      }
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.galleryItems).toEqual([]);
  });
});
