"use client";

import PlatformFilter from "@/components/PlatformFilter";
import HeaderText from "@/components/animations/HeaderText";
import GamesList from "@/components/games/GamesList";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface GamesListPageProps {}

const GamesListPage = ({}: GamesListPageProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [numberOfResults, setNumberOfResults] = useState(0);
  const [platformFilterValue, setPlatformFilterValue] = useState("All");

  const { data: gameCount } = useQuery({
    queryKey: ["game-count"],
    queryFn: async () => {
      const { data } = await axios.get("/api/game-count");

      return data;
    },
  });

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
          }}
          className="mb-16 w-[75%] self-start"
        />

        <PlatformFilter
          className="w-[20%]"
          setFilter={setPlatformFilterValue}
        />
      </div>

      {searchInput !== "" && (
        <p className="-mt-8 mb-4 text-sm text-muted-foreground">
          {numberOfResults} results found
        </p>
      )}

      <div className="flex flex-wrap gap-9 items-center justify-around">
        <GamesList
          searchInput={searchInput}
          platformFilterValue={platformFilterValue}
          setNumberOfResults={setNumberOfResults}
        />
      </div>
    </main>
  );
};

export default GamesListPage;
