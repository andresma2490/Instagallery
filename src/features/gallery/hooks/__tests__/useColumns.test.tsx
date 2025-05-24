import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useColumns, breakpoints } from "../useColumns";

describe("useColumns", () => {
  beforeEach(() => {
    (window.innerWidth as number) = 1024;
    window.dispatchEvent(new Event("resize"));
  });

  it("returns the correct number of columns of the current screen size", () => {
    const testCases = [
      { width: breakpoints.sm - 1, expected: 1 },
      { width: breakpoints.md - 1, expected: 2 },
      { width: breakpoints.lg - 1, expected: 3 },
    ];

    testCases.forEach(({ width, expected }) => {
      (window.innerWidth as number) = width;
      window.dispatchEvent(new Event("resize"));
      const { result } = renderHook(() => useColumns());

      expect(result.current).toBe(expected);
    });
  });
});
