"use client";

import { storeFronts } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";

interface ManualAddFormProps {
  className?: string;
}

const ManualAddForm = ({ className }: ManualAddFormProps) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: addGame, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      // save data to db
      const payload = {
        data: [values],
      };

      const numberInserted = await axios.post("/api/update", payload);
      return numberInserted.data;
    },

    onError: (error, values) => {
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
      queryClient.invalidateQueries({ queryKey: ["games-list", "game-count"] });
      toast({
        title: "Success",
        description: `Inserted ${data} games`,
      });
    },
  });

  const formSchema = z.object({
    gameName: z.string().min(1),
    store: z.string().min(1),
    platform: z.string().min(1),
    imgUrl: z.string(),
    // TODO: drag and drop for an image
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: "",
      platform: "",
      store: "",
      imgUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addGame(values);
    form.reset({
      gameName: "",
      platform: "",
      store: "",
      imgUrl: "",
    });
    setOpen(false);
  }

  function onOpenChange(open: boolean) {
    setOpen(open);
    form.reset();
    form.clearErrors();
  }

  return (
    <div className={className}>
      <Dialog open={open} onOpenChange={(open) => onOpenChange(open)}>
        <DialogTrigger asChild>
          <Button className="w-[60%]" size={"sm"}>
            Enter Game
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Game</DialogTitle>
            <DialogDescription>
              Manually enter your game info here. Click submit when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="gameName"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Title..."
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Platform</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl className="col-span-3">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PC">PC</SelectItem>
                          <SelectItem value="Switch">Switch</SelectItem>
                          <SelectItem value="PS4">PS4</SelectItem>
                          <SelectItem value="PS5">PS5</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="store"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Store</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl className="col-span-3">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a store" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {storeFronts.map((store) => (
                            <SelectItem key={store.id} value={store.storeName}>
                              {store.storeName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage className="col-span-4" />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManualAddForm;
