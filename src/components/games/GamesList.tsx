"use client";

import GameCard from "@/components/games/GameCard";
import { GameInfoSelect } from "@/db/schema";
import { useDebounceCallback } from "@/hooks/useDebounce";
import { useIntersection } from "@/hooks/useIntersection";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";

interface GamesListProps {
  searchInput: string;
}

type InfiniteQueryResponseData = {
  gamesFromDb: GameInfoSelect[];
  nextCursor: number | null;
};

const GamesList = ({ searchInput }: GamesListProps) => {
  const [platformFilterValue, setPlatformFilterValue] = useState("All");
  const [filteredResults, setFilteredResults] = useState([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const {
    data,
    error,
    status,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<InfiniteQueryResponseData, Error>({
    queryKey: ["games-list"],
    queryFn: async ({ pageParam = 0 }) => {
      let url = `/api/games?search=${searchInput}&cursor=${pageParam}`;
      const gamesListFromDb = await axios.get(url);

      return gamesListFromDb.data;
    },
    getNextPageParam: (lastPage, pages) => lastPage?.nextCursor ?? undefined,
  });

  const request = useDebounceCallback(refetch, 500);

  useEffect(() => {
    request();
  }, [searchInput]);

  const { ref, entry } = useIntersection({
    root: bottomRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && !isFetchingNextPage && !!hasNextPage) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return status === "loading" ? (
    <p className="animate-spin">
      <Loader2 />
    </p>
  ) : status === "error" ? (
    <p>Error: {error?.message}</p>
  ) : (
    <>
      {data?.pages?.map((page, i) => (
        <Fragment key={i}>
          {page?.gamesFromDb.map((game: GameInfoSelect) => (
            <GameCard
              key={game.id}
              gameName={game.gameName}
              store={game.store}
              platform={game.platform}
              imgUrl={game.imgUrl}
            />
          ))}
        </Fragment>
      ))}

      {hasNextPage && (
        <div className="flex my-8 justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          ) : (
            <button
              disabled={isFetching}
              onClick={() => fetchNextPage()}
              className="text-xs text-muted-foreground transition"
            >
              Load more games
            </button>
          )}
        </div>
      )}
      <div ref={ref} />
    </>
  );
};

export default GamesList;
