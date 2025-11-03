"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { SortOption } from "@/hooks/useSortAndFilterMatches";

interface MatchesHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLeague: string;
  setSelectedLeague: (league: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  availableLeagues: string[];
  totalMatches: number;
  filteredMatches: number;
  isLoading?: boolean;
  resetFilters?: () => void;
  isDisabled?: boolean;
}

const MatchesHeader = ({
  searchTerm,
  setSearchTerm,
  selectedLeague,
  setSelectedLeague,
  sortOption,
  setSortOption,
  availableLeagues,
  totalMatches,
  filteredMatches,
  isLoading = false,
  resetFilters,
  isDisabled = false,
}: MatchesHeaderProps) => {
  const lastUpdated = useMemo(() => {
    return new Date().toLocaleTimeString("sr-RS", { hour12: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "none", label: "Sortiraj" },
    { value: "time-asc", label: "Vreme ↑" },
    { value: "time-desc", label: "Vreme ↓" },
    { value: "alphabetical-asc", label: "Alfabetski A-Z" },
    { value: "alphabetical-desc", label: "Alfabetski Z-A" },
    { value: "score-asc", label: "Rezultat ↑" },
    { value: "score-desc", label: "Rezultat ↓" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-6 lg:p-6 bg-gray-800/50 border-b border-gray-700">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Mečevi</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>
              Ažurirano: {lastUpdated} | Prikazano:{" "}
              {isDisabled
                ? "0 mečeva"
                : `${filteredMatches} od ${totalMatches} mečeva`}
            </span>
            {isLoading && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Ažuriranje...</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="search-teams"
              className="block text-sm font-medium text-gray-300">
              Pretraži timove
            </label>
            <input
              id="search-teams"
              name="search-teams"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Unesite ime tima..."
              disabled={isDisabled}
              className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-lg sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="league-select"
              className="block text-sm font-medium text-gray-300">
              Liga/Takmičenje
            </label>
            <select
              id="league-select"
              name="league-select"
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              disabled={isDisabled}
              className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-lg sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&>option]:text-lg [&>option]:py-2 [&>option]:px-3 [&>option]:bg-gray-700 [&>option]:text-white ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              <option value="all">Sve lige</option>
              {availableLeagues.map((league, index) => (
                <option key={index} value={league}>
                  {league}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sort-select"
              className="block text-sm font-medium text-gray-300">
              Sortiraj po
            </label>
            <select
              id="sort-select"
              name="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              disabled={isDisabled}
              className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-lg sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&>option]:text-lg [&>option]:py-2 [&>option]:px-3 [&>option]:bg-gray-700 [&>option]:text-white ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="block text-sm font-medium text-gray-300">
              Resetuj filtere
            </div>
            {resetFilters && (
              <button
                onClick={resetFilters}
                disabled={isDisabled}
                className={`w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-lg sm:text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed hover:bg-red-600"
                    : ""
                }`}>
                Resetuj sve
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
              <span>Pretraga: &ldquo;{searchTerm}&rdquo;</span>
              <button
                onClick={() => setSearchTerm("")}
                className="hover:bg-blue-700 rounded-full p-1 transition-colors">
                ✕
              </button>
            </motion.div>
          )}

          {selectedLeague !== "all" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white text-sm rounded-full">
              <span>Liga: {selectedLeague}</span>
              <button
                onClick={() => setSelectedLeague("all")}
                className="hover:bg-green-700 rounded-full p-1 transition-colors">
                ✕
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MatchesHeader;
