"use client";

import { memo, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { motion } from "framer-motion";
import useGridDimensions from "@/hooks/useGridDimensions";
import MatchCard from "./MatchCard";
import Spinner from "../Spinner";
import { Match } from "@/types/matches";

type VirtualizedMatchListProps = {
  allMatches: Match[];
  isLoading: boolean;
  matches: Match[];
  newMatches: Set<string>;
  removingMatches: Set<string>;
};

const VirtualizedMatchList = ({
  allMatches,
  isLoading,
  matches,
  newMatches,
  removingMatches,
}: VirtualizedMatchListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { columnCount, rowHeight } = useGridDimensions();

  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < matches.length; i += columnCount) {
      result.push(matches.slice(i, i + columnCount));
    }
    return result;
  }, [matches, columnCount]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => rowHeight,
    overscan: 2,
  });

  if (allMatches.length === 0 && !isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-400 text-lg">Nema dostupnih mečeva</div>
      </div>
    );
  }

  if (isLoading && matches.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-4 lg:p-6">
        <motion.div
          layout
          transition={{
            layout: {
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
          ref={containerRef}
          className="w-full overflow-auto"
          style={{ height: "calc(100vh - 200px)" }}>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}>
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              if (!row) return null;

              const isLastRow = virtualRow.index === rows.length - 1;

              return (
                <div
                  key={virtualRow.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                    paddingBottom: isLastRow ? 0 : "12px",
                  }}
                  className={isLastRow ? "" : "lg:pb-4"}>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-4"
                    style={{ height: "220px" }}>
                    {row.map((match: Match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        isNew={newMatches.has(match.id)}
                        isRemoving={removingMatches.has(match.id)}
                        isLoading={isLoading && matches.length > 0}
                        fixedHeight={true}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(VirtualizedMatchList);
