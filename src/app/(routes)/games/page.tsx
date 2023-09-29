"use client";

import PlatformFilter from "@/components/PlatformFilter";
import HeaderText from "@/components/animations/HeaderText";
import GamesList from "@/components/games/GamesList";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        document.getElementById("search-input")!.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
        <div className="relative w-[75%] h-auto">
          <Input
            id="search-input"
            placeholder="Search for a game..."
            onChange={(event) => {
              setSearchInput(event.currentTarget.value);
            }}
            className="mb-16 "
          />
          <kbd className="text-muted-foreground absolute right-3 top-3 text-sm">
            ⌘K
          </kbd>
        </div>

        <PlatformFilter
          className="w-[20%]"
          setFilter={setPlatformFilterValue}
        />
      </div>
      {
        //TODO: will need a separate query to count results now
        /* {searchInput !== "" && (
        <p className="-mt-8 mb-4 text-sm text-muted-foreground">
          {numberOfResults} results found
        </p>
      )} */
      }
      <>
        <GamesList
          searchInput={searchInput}
          platformFilterValue={platformFilterValue}
          setNumberOfResults={setNumberOfResults}
        />
      </>
    </main>
  );
};

export default GamesListPage;
