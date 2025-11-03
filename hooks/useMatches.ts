import { useEffect, useRef, useCallback } from "react";
import { useAtom } from "jotai";
import { atom } from "jotai";
import { getMatches } from "@/api/matches";
import { matchesAtom } from "@/store/matches";
import { Match } from "@/types/matches";
import useSortAndFilterMatches from "./useSortAndFilterMatches";

const newMatchesAtom = atom<Set<string>>(new Set<string>());
const removingMatchesAtom = atom<Set<string>>(new Set<string>());
const isLoadingAtom = atom<boolean>(false);

const useMatches = () => {
  const [matches, setMatches] = useAtom(matchesAtom);
  const [newMatches, setNewMatches] = useAtom(newMatchesAtom);
  const [removingMatches, setRemovingMatches] = useAtom(removingMatchesAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const {
    filteredAndSortedMatches,
    searchTerm,
    setSearchTerm,
    selectedLeague,
    setSelectedLeague,
    sortOption,
    setSortOption,
    availableLeagues,
    resetFilters,
  } = useSortAndFilterMatches(matches);

  const previousMatchesRef = useRef<Match[]>([]);
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const clearMatchTimeout = useCallback((id: string) => {
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      global.clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const processMatches = useCallback(
    (newMatchesData: Match[]) => {
      const prevIds = new Set(previousMatchesRef.current.map((m) => m.id));
      const newIds = new Set(newMatchesData.map((m) => m.id));
      const added = newMatchesData.filter((m) => !prevIds.has(m.id));
      const addedIds = new Set(added.map((m) => m.id));

      const removedIds = new Set(
        previousMatchesRef.current
          .filter((m) => !newIds.has(m.id))
          .map((m) => m.id)
      );

      if (addedIds.size > 0) {
        setNewMatches(addedIds);
        setTimeout(() => {
          setNewMatches(new Set());
        }, 1000);
      }

      if (removedIds.size > 0) {
        setRemovingMatches(removedIds);
        setTimeout(() => {
          setMatches(newMatchesData);
          setRemovingMatches(new Set());
          previousMatchesRef.current = newMatchesData;
        }, 1000);
      } else {
        setMatches(newMatchesData);
        if (previousMatchesRef.current.length === 0 || addedIds.size === 0) {
          previousMatchesRef.current = newMatchesData;
        } else {
          setTimeout(() => {
            previousMatchesRef.current = newMatchesData;
          }, 1000);
        }
      }
    },
    [setMatches, setNewMatches, setRemovingMatches]
  );

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setIsLoading(true);
        const response = await getMatches();
        processMatches(response);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
    const intervalId = setInterval(fetchMatches, 7500);
    const currentTimeouts = timeoutsRef.current;

    return () => {
      clearInterval(intervalId);
      currentTimeouts.forEach((timeout) => global.clearTimeout(timeout));
      currentTimeouts.clear();
    };
  }, [processMatches, setIsLoading, clearMatchTimeout]);

  return {
    matches: filteredAndSortedMatches,
    allMatches: matches,
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
  };
};

export default useMatches;
