"use client";

import GameCard from "@/components/games/GameCard";
import { GameInfoSelect } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GamesListPageProps {}

const GamesListPage = ({}: GamesListPageProps) => {
  const {
    data: gamesList,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["games-list"],
    queryFn: async () => {
      const gamesListFromDb = await axios.get<GameInfoSelect[]>("/api/games");

      return gamesListFromDb.data;
    },
  });

  return (
    <main className="flex flex-wrap gap-9 items-center justify-around">
      {gamesList?.map((game) => (
        <GameCard
          key={game.id}
          gameName={game.gameName}
          store={game.store}
          platform={game.platform}
          imgUrl={game.imgUrl}
        />
      ))}
    </main>
  );
};

export default GamesListPage;
