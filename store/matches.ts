import { atom } from "jotai";
import { Match } from "@/types/matches";

type MatchesInitState = Match[];

export const matchesAtom = atom<MatchesInitState>([]);
