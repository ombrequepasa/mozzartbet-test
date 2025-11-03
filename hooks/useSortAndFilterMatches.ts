import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import { Match } from "@/types/matches";

export type SortOption =
  | "time-asc"
  | "time-desc"
  | "alphabetical-asc"
  | "alphabetical-desc"
  | "score-asc"
  | "score-desc";

export const searchTermAtom = atom<string>("");
export const selectedLeagueAtom = atom<string>("all");
export const sortOptionAtom = atom<SortOption>("time-asc");

const useSortAndFilterMatches = (matches: Match[]) => {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [selectedLeague, setSelectedLeague] = useAtom(selectedLeagueAtom);
  const [sortOption, setSortOption] = useAtom(sortOptionAtom);

  const availableLeagues = useMemo(() => {
    const leagues = matches.map((match) => match.league);
    return Array.from(new Set(leagues)).sort();
  }, [matches]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLeague("all");
    setSortOption("time-asc");
  };

  const filteredAndSortedMatches = useMemo(() => {
    let filtered = matches;

    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (match) =>
          match.homeTeam.toLowerCase().includes(term) ||
          match.awayTeam.toLowerCase().includes(term)
      );
    }

    if (selectedLeague !== "all") {
      filtered = filtered.filter((match) => match.league === selectedLeague);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "time-asc":
          return (
            new Date(a.matchTime).getTime() - new Date(b.matchTime).getTime()
          );

        case "time-desc":
          return (
            new Date(b.matchTime).getTime() - new Date(a.matchTime).getTime()
          );

        case "alphabetical-asc":
          return a.homeTeam.localeCompare(b.homeTeam);

        case "alphabetical-desc":
          return b.homeTeam.localeCompare(a.homeTeam);

        case "score-asc":
          const totalScoreA = a.homeScore + a.awayScore;
          const totalScoreB = b.homeScore + b.awayScore;
          return totalScoreA - totalScoreB;

        case "score-desc":
          const totalScoreA2 = a.homeScore + a.awayScore;
          const totalScoreB2 = b.homeScore + b.awayScore;
          return totalScoreB2 - totalScoreA2;

        default:
          return 0;
      }
    });

    return sorted;
  }, [matches, searchTerm, selectedLeague, sortOption]);

  return {
    filteredAndSortedMatches,
    searchTerm,
    setSearchTerm,
    selectedLeague,
    setSelectedLeague,
    sortOption,
    setSortOption,
    availableLeagues,
    resetFilters,
  };
};

export default useSortAndFilterMatches;
