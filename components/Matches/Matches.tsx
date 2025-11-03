"use client";

import { matchesAtom } from "@/store/matches";
import { useAtom } from "jotai";

const Matches = () => {
  const [matches] = useAtom(matchesAtom);
  return (
    <div className="w-full flex flex-col items-center p-20">
      {matches.map((match) => (
        <div key={match.id}>
          {match.homeTeam} vs {match.awayTeam}
        </div>
      ))}
    </div>
  );
};

export default Matches;
