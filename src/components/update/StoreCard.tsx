"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameInfoInsert } from "@/db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Info, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "../ui/use-toast";

interface StoreCardProps {
  storeName: string;
  imageUrl: string;
  region?: string;
  apiUrlEndpoint?: string;
}

const StoreCard = ({
  storeName,
  imageUrl,
  region,
  apiUrlEndpoint,
}: StoreCardProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [value, setValue] = useState("");

  const { mutate: fetchGames, isLoading } = useMutation({
    mutationFn: async () => {
      // get data from steam api
      const gameDataFromStore = await axios.get<GameInfoInsert[]>(
        `/api/scrape/${apiUrlEndpoint}`
      );

      // save data to db
      const numberInserted = await axios.post("/api/update", gameDataFromStore);
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

        //TODO: add link to manage cookie page
        if (error.response?.status === 403) {
          return toast({
            title: `${storeName} says: "${error.response.data}"`,
            description: "Your cookie probably expired.",
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
      queryClient.invalidateQueries({ queryKey: ["games-list", "game-count"] });
      toast({
        title: "Success",
        description: `Inserted ${data} games`,
      });
    },
  });

  return (
    <Card className="border w-56 flex items-center justify-center flex-col">
      <CardHeader>
        <CardTitle>
          <div className="flex gap-3 items-center justify-center">
            <span>
              {storeName} {region && <span>{region}</span>}
            </span>
            {storeName === "Itch.io" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="normal-case">
                      This only gets the one bundle for now.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {storeName === "Nintendo" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="normal-case">
                      Nintendo only save two years of history.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          disabled={isLoading}
          className="w-[80px]"
          onClick={() => fetchGames()}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Update"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoreCard;
