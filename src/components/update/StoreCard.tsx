"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { GameInfoInsert } from "@/db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface StoreCardProps {
  storeName: string;
  imageUrl: string;
  region?: string;
}

const StoreCard = ({ storeName, imageUrl, region }: StoreCardProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: fetchGames } = useMutation({
    mutationFn: async () => {
      // get data from steam api
      const gameDataFromStore = await axios.get<GameInfoInsert[]>(
        `/api/scrape/${storeName}`
      );

      // save data to db
      const numberInserted = await axios.post("/api/update", gameDataFromStore);
      return numberInserted.data;
    },

    onError: (error) => {
      console.log("error", error);

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return toast({
            title: "There was a problem",
            description: "You must be logged in",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["games-list"] });
      toast({
        title: "Success",
        description: `Inserted ${data} games`,
      });
    },
  });

  return (
    <Card className="bg-secondary border w-56 flex items-center justify-center flex-col">
      <CardHeader>
        <CardTitle className="capitalize">
          {storeName} {region && <span>{region}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => fetchGames()}>Update</Button>
      </CardContent>
    </Card>
  );
};

export default StoreCard;
