"use client";

import GameCard from "@/components/games/GameCard";
import { GameInfoSelect } from "@/db/schema";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Fragment, useEffect, useRef } from "react";

interface GamesListPageProps {}

type InfiniteQueryResponseData = {
  gamesFromDb: GameInfoSelect[];
  nextCursor: number | null;
};

const GamesListPage = ({}: GamesListPageProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const {
    data,
    error,
    status,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<InfiniteQueryResponseData, Error>({
    queryKey: ["games-list"],
    queryFn: async ({ pageParam = 0 }) => {
      const gamesListFromDb = await axios.get(`/api/games?cursor=${pageParam}`);

      return gamesListFromDb.data;
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
  });

  useEffect(() => {
    const bottomDiv = topRef?.current;

    const handleScroll = () => {
      const scrollBottom = bottomDiv?.scrollTop;
      console.log("bottomDiv?.scrollTop", bottomDiv?.scrollTop);

      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight &&
        !isFetchingNextPage &&
        !!hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window?.addEventListener("scroll", handleScroll);

    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, [topRef, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error?.message}</p>
  ) : (
    <main className="flex flex-col">
      <div
        ref={topRef}
        className="flex flex-wrap gap-9 items-center justify-around"
      >
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
      </div>

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
      <div className="bg-green-600" ref={bottomRef}>
        sdsd
      </div>
    </main>
  );
};

export default GamesListPage;
