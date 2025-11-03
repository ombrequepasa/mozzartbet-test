"use client";

import { AnimatePresence, motion } from "framer-motion";
import useMatches from "@/hooks/useMatches";
import MatchCard from "./MatchCard";
import Spinner from "../Spinner";

const Matches = () => {
  const { matches, newMatches, removingMatches, isLoading } = useMatches();

  if (matches.length === 0 && !isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Nema dostupnih mečeva</div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 lg:p-6">
      <motion.div
        className="flex justify-between items-center my-6 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}>
        <span>Ukupno mečeva: {matches.length}</span>
        {isLoading && matches.length > 0 && (
          <span className="flex items-center gap-2">
            <Spinner size="sm" />
            Osvežavam...
          </span>
        )}
      </motion.div>
      {isLoading && matches.length === 0 && (
        <div className="flex justify-center items-center h-32">
          <Spinner size="lg" />
        </div>
      )}

      <motion.div
        layout
        transition={{
          layout: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-4">
        <AnimatePresence mode="popLayout">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              isNew={newMatches.has(match.id)}
              isRemoving={removingMatches.has(match.id)}
              isLoading={isLoading && matches.length > 0}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Matches;
