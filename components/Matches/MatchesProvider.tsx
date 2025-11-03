"use client";

import { useHydrateAtoms } from "jotai/utils";
import { matchesAtom } from "@/store/matches";

const MatchesProvider = ({
  initialMatches,
  children,
}: {
  initialMatches: [];
  children: React.ReactNode;
}) => {
  useHydrateAtoms([[matchesAtom, initialMatches]]);
  return <>{children}</>;
};

export default MatchesProvider;
