import { toast, useToast } from "@/components/ui/use-toast";
import { GameInfoInsert } from "@/db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export function useAddGame(storeName: string, apiUrlEndpoint?: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
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
}
