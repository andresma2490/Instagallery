import { useEffect, useState } from "react";

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
};

export function useColumns() {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function updateColumns() {
      let newColumns = 1;
      if (window.innerWidth >= breakpoints.md) newColumns = 3;
      else if (window.innerWidth >= breakpoints.sm) newColumns = 2;

      setColumns((prevColumns) => {
        if (prevColumns !== newColumns) return newColumns;
        return prevColumns;
      });
    }

    // Debounce the resize event
    function handleResize() {
      clearTimeout(timeout);
      timeout = setTimeout(updateColumns, 500);
    }

    window.addEventListener("resize", handleResize);
    updateColumns();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return columns;
}
