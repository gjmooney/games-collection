"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { GameInfo } from "@/types/types";

interface SourceCardProps {
  storeName: string;
}

const SourceCard = ({ storeName }: SourceCardProps) => {
  const {
    data: queryResults,
    isFetching,
    refetch,
  } = useQuery({
    enabled: false,
    queryKey: ["steam-games"],
    queryFn: async () => {
      const steamGamesResponse = await fetch("/api/steam");

      const data = await steamGamesResponse.json();

      console.log(data);

      return data as GameInfo[];
    },
  });

  const handleClick = () => {
    refetch();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{storeName} cute lil icon</CardTitle>
          <CardDescription>Load your games from {storeName}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button disabled={isFetching} onClick={handleClick}>
            Get Games
          </Button>
        </CardContent>
      </Card>

      <div>
        {(queryResults?.length ?? 0) > 0 ? (
          <p>{queryResults?.map((e) => <p key={e.name}>{e.name}</p>)}</p>
        ) : (
          <p>noooooo</p>
        )}
      </div>
    </>
  );
};

export default SourceCard;
