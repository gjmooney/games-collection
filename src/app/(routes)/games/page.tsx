"use client";

import HeaderText from "@/components/animations/HeaderText";
import GameCard from "@/components/games/GameCard";
import GamesList from "@/components/games/GamesList";
import { Input } from "@/components/ui/input";
import { GameInfoSelect } from "@/db/schema";
import { useDebounceCallback } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface GamesListPageProps {}

const GamesListPage = ({}: GamesListPageProps) => {
  const [value, setValue] = useState("");

  const { data: queryResults, refetch } = useQuery({
    enabled: false,
    queryKey: ["search"],
    queryFn: async () => {
      if (!value) {
        return [];
      }

      const { data } = await axios.get(`/api/search?q=${value}`);

      return data;
    },
  });

  const request = useDebounceCallback(refetch, 500);

  //TODO add a header? and a game count
  return (
    <main className="px-16">
      <HeaderText title="Collection" />
      <Input
        placeholder="Search for a game..."
        onChange={(event) => {
          setValue(event.currentTarget.value);
          request();
        }}
        className="mb-16"
      />

      <div className="flex flex-wrap gap-9 items-center justify-around">
        {value.length > 0 ? (
          queryResults?.map((game: GameInfoSelect) => (
            <GameCard
              key={game.id}
              gameName={game.gameName}
              store={game.store}
              platform={game.platform}
              imgUrl={game.imgUrl}
            />
          ))
        ) : (
          <GamesList />
        )}
      </div>
    </main>
  );
};

export default GamesListPage;
