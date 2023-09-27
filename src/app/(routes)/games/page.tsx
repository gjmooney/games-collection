"use client";

import PlatformFilter from "@/components/PlatformFilter";
import HeaderText from "@/components/animations/HeaderText";
import GameCard from "@/components/games/GameCard";
import GamesList from "@/components/games/GamesList";
import { Input } from "@/components/ui/input";

import { GameInfoSelect } from "@/db/schema";
import { useDebounceCallback } from "@/hooks/useDebounce";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface GamesListPageProps {}

const GamesListPage = ({}: GamesListPageProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [platformFilterValue, setPlatformFilterValue] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const { user } = useUser();

  const {
    data: queryResults,
    isLoading,
    isError,
    status,
    error,
    refetch,
  } = useQuery<any, Error>({
    enabled: false,
    queryKey: ["search"],
    queryFn: async () => {
      if (!searchInput) {
        return [];
      }
      const { data } = await axios.get(`/api/search?q=${searchInput}`);

      return data;
    },
  });

  const { data: gameCount, isLoading: gameCountLoading } = useQuery({
    queryKey: ["game-count"],
    queryFn: async () => {
      const { data } = await axios.get("/api/game-count");

      return data;
    },
  });

  useEffect(() => {
    const filteredResults =
      platformFilterValue === "All"
        ? queryResults
        : queryResults?.filter(
            (game: GameInfoSelect) => game.platform === platformFilterValue
          );
    setFilteredResults(filteredResults);
  }, [platformFilterValue, queryResults]);

  const request = useDebounceCallback(refetch, 500);

  return (
    <main className="px-16 flex flex-col items-center justify-center">
      <HeaderText title="Collection" className="mb-2" />

      {gameCount ? (
        <span className="w-fit mx-auto mb-16 text-sm text-muted-foreground">
          {gameCount} games in your collection.
        </span>
      ) : (
        <span>
          <div className="w-[186px] h-[20px] mb-14" />
        </span>
      )}

      <div className="flex w-full justify-between">
        <Input
          placeholder="Search for a game..."
          onChange={(event) => {
            setSearchInput(event.currentTarget.value);
            request();
          }}
          className="mb-16 w-[75%] self-start"
        />

        <PlatformFilter
          className="w-[20%]"
          setFilter={setPlatformFilterValue}
        />
      </div>

      {queryResults?.length > 0 && (
        <p className="-mt-8 mb-4 text-sm text-muted-foreground">
          {filteredResults?.length} results found
        </p>
      )}

      <div className="flex flex-wrap gap-9 items-center justify-around">
        {searchInput.length > 0 ? (
          isLoading ? (
            <Loader2 className="animate-spin text-primary" />
          ) : isError ? (
            <p className="text-destructive">Error: {error?.message}</p>
          ) : (
            <>
              {filteredResults?.map((game: GameInfoSelect) => (
                <GameCard
                  key={game.id}
                  gameName={game.gameName}
                  store={game.store}
                  platform={game.platform}
                  imgUrl={game.imgUrl}
                />
              ))}
            </>
          )
        ) : (
          <GamesList />
        )}
      </div>
    </main>
  );
};

export default GamesListPage;
