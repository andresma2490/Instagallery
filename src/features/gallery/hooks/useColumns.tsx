import { useEffect, useState } from "react";

export function useColumns() {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function updateColumns() {
      let newColumns = 1;
      if (window.innerWidth >= 768) newColumns = 3;
      else if (window.innerWidth >= 640) newColumns = 2;
      if (newColumns !== columns) setColumns(newColumns);
    }

    // Debounce the resize event
    function handleResize() {
      clearTimeout(timeout);
      timeout = setTimeout(updateColumns, 100);
    }

    window.addEventListener("resize", updateColumns);
    updateColumns();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [columns]);

  return columns;
}
