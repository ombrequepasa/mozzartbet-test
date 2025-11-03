import { getMatches } from "@/api/matches";
import MatchesProvider from "@/components/Matches/MatchesProvider";
import Matches from "@/components/Matches/Matches";

const Home = async () => {
  const res = await getMatches();

  return (
    <div className="flex min-h-screen justify-center">
      <MatchesProvider initialMatches={res}>
        <Matches />
      </MatchesProvider>
    </div>
  );
};
export default Home;
