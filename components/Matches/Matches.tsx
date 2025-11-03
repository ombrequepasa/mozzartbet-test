"use client";

import { AnimatePresence, motion } from "framer-motion";
import useMatches from "@/hooks/useMatches";
import MatchCard from "./MatchCard";
import MatchesHeader from "./MatchesHeader";
import Spinner from "../Spinner";
import { Match } from "@/types/matches";

const Matches = () => {
  const {
    matches,
    allMatches,
    newMatches,
    removingMatches,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedLeague,
    setSelectedLeague,
    sortOption,
    setSortOption,
    availableLeagues,
    resetFilters,
  } = useMatches();

  if (allMatches.length === 0 && !isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Nema dostupnih mečeva</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <MatchesHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
        sortOption={sortOption}
        setSortOption={setSortOption}
        availableLeagues={availableLeagues}
        totalMatches={allMatches.length}
        filteredMatches={matches.length}
        isLoading={isLoading}
        resetFilters={resetFilters}
      />

      <div className="p-4 lg:p-6">
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
            {matches.map((match: Match) => (
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
    </div>
  );
};

export default Matches;
