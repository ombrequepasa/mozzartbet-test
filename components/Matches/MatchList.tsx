import { memo } from "react";
import { motion } from "framer-motion";
import Spinner from "../Spinner";
import MatchCard from "./MatchCard";
import { Match } from "@/types/matches";

type MatchListProps = {
  allMatches: Match[];
  isLoading: boolean;
  matches: Match[];
  newMatches: Set<string>;
  removingMatches: Set<string>;
};

const MatchList = ({
  allMatches,
  isLoading,
  matches,
  newMatches,
  removingMatches,
}: MatchListProps) => {
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
export default memo(MatchList);
