"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../ui/button";

interface StoreCardProps {
  storeName: string;
  imageUrl: string;
}

const StoreCard = ({ storeName, imageUrl }: StoreCardProps) => {
  const { mutate: fetchGames } = useMutation({
    mutationFn: async () => {
      // get data from steam api
      const steamData = await axios.get("/api/scrape/steam");

      return steamData;

      // save data to db
    },
    onError: (error) => {},
    onSuccess: (data) => {
      console.log(data.data);
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
