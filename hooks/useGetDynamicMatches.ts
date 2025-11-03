import { useEffect } from "react";
import { getMatches } from "@/api/matches";
import { useSetAtom } from "jotai";
import { matchesAtom } from "@/store/matches";

const useGetDynamicMatches = () => {
  const setMatches = useSetAtom(matchesAtom);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await getMatches();
      setMatches(res);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [setMatches]);
};

export default useGetDynamicMatches;
