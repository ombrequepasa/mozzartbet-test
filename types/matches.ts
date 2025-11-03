export type Match = {
  id: string;
  awayScore: number;
  awayTeam: string;
  homeScore: number;
  homeTeam: string;
  lastUpdated: string;
  leadue: string;
  matchTime: string;
  source: string;
  sport: string;
  status: string;
  venue: string;
};

export type MatchesResponse = {
  matches: Match[];
};
