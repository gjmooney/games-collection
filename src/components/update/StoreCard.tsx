"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { GameInfo } from "@/db/schema";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface StoreCardProps {
  storeName: string;
  imageUrl: string;
}

const StoreCard = ({ storeName, imageUrl }: StoreCardProps) => {
  const { toast } = useToast();
  const { mutate: fetchGames } = useMutation({
    mutationFn: async () => {
      // get data from steam api
      const steamData = await axios.get<GameInfo[]>("/api/scrape/steam");

      // save data to db
      const numberInserted = await axios.post("/api/update", steamData);
      console.log(numberInserted);
      return numberInserted.data;
    },
    onError: (error) => {
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
      toast({
        title: "Success",
        description: `Inserted ${data} games`,
      });
    },
  });

  return (
    <Card className="bg-secondary border w-52 flex items-center justify-center flex-col">
      <CardHeader>
        <CardTitle>{storeName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => fetchGames()}>Update</Button>
      </CardContent>
    </Card>
  );
};

export default StoreCard;
