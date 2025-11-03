"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import Spinner from "../Spinner";
import MatchCard from "./MatchCard";
import VirtualizedMatchList from "./VirtualizedMatchList";
import { Match } from "@/types/matches";

type SmartMatchListProps = {
  allMatches: Match[];
  isLoading: boolean;
  matches: Match[];
  newMatches: Set<string>;
  removingMatches: Set<string>;
};

const VIRTUALIZATION_THRESHOLD = 40;

const SmartMatchList = ({
  allMatches,
  isLoading,
  matches,
  newMatches,
  removingMatches,
}: SmartMatchListProps) => {
  const shouldVirtualize = useMemo(() => {
    const result = matches.length >= VIRTUALIZATION_THRESHOLD;
    return result;
  }, [matches.length]);

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

  if (shouldVirtualize) {
    return (
      <div className="w-full">
        <div className="px-4 lg:px-6 py-2">
          <div className="text-xs text-green-500">
            Virtuelni skrol aktivan ({matches.length} mečeva)
          </div>
        </div>
        <VirtualizedMatchList
          allMatches={allMatches}
          isLoading={isLoading}
          matches={matches}
          newMatches={newMatches}
          removingMatches={removingMatches}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="px-4 lg:px-6 py-2">
        <div className="text-xs text-blue-500 mb-2">
          Standardni prikaz ({matches.length} mečeva)
        </div>
      </div>
      <div className="p-4 lg:p-6">
        <motion.div
          layout
          transition={{
            layout: {
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-4">
          {matches.map((match: Match) => (
            <MatchCard
              key={match.id}
              match={match}
              isNew={newMatches.has(match.id)}
              isRemoving={removingMatches.has(match.id)}
              isLoading={isLoading && matches.length > 0}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default memo(SmartMatchList);
