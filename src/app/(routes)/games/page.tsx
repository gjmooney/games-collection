"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GamesListPageProps {}

const GamesListPage = ({}: GamesListPageProps) => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["games-list"],
    queryFn: async () => {
      const gamesList = await axios.get("/api/games");

      console.log("gamesList", gamesList);
      return gamesList.data;
    },
  });

  return (
    <main className="flex gap-9 items-center justify-around">
      games GamesListPage
    </main>
  );
};

export default GamesListPage;
