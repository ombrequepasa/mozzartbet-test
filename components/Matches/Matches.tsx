"use client";

import dynamic from "next/dynamic";

import useMatches from "@/hooks/useMatches";

const MatchesHeader = dynamic(() => import("./MatchesHeader"), { ssr: false });
const MatchList = dynamic(() => import("./MatchList"), { ssr: false });

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
        isDisabled={allMatches.length === 0 && !isLoading}
      />

      <MatchList
        allMatches={allMatches}
        isLoading={isLoading}
        matches={matches}
        newMatches={newMatches}
        removingMatches={removingMatches}
      />
    </div>
  );
};

export default Matches;
