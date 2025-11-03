import { useEffect, useState } from "react";

const useGridDimensions = () => {
  const [dimensions, setDimensions] = useState({
    columnCount: 1,
    rowHeight: 280,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window === "undefined") return;

      const width = window.innerWidth;
      const breakpoints = [
        { minWidth: 1536, columns: 5 },
        { minWidth: 1280, columns: 4 },
        { minWidth: 1024, columns: 3 },
        { minWidth: 640, columns: 2 },
        { minWidth: 0, columns: 1 },
      ];

      const columnCount =
        breakpoints.find((bp) => width >= bp.minWidth)?.columns || 1;
      const gapSize = width >= 1024 ? 16 : 12;
      const cardHeight = 220;
      const rowHeight = cardHeight + gapSize;

      setDimensions({
        columnCount,
        rowHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return dimensions;
};

export default useGridDimensions;
