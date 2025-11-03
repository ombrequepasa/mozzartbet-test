"use client";

import { useHydrateAtoms } from "jotai/utils";
import { matchesAtom } from "@/store/matches";
import useGetDynamicMatches from "@/hooks/useGetDynamicMatches";

const MatchesProvider = ({
  initialMatches,
  children,
}: {
  initialMatches: [];
  children: React.ReactNode;
}) => {
  useGetDynamicMatches();
  useHydrateAtoms([[matchesAtom, initialMatches]]);
  return <>{children}</>;
};

export default MatchesProvider;
