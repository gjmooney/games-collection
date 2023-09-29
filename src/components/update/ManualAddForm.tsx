"use client";

import { storeFronts } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
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

interface ManualAddFormProps {}

const ManualAddForm = ({}: ManualAddFormProps) => {
  const [open, setOpen] = useState(false);

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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    form.reset({
      gameName: "",
      platform: "",
      store: "",
      imgUrl: "",
    });
    setOpen(false);
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">Enter Game</Button>
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <div>
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
                        {/* <SelectItem value="Steam">Steam</SelectItem>
                        <SelectItem value="Humble">Humble</SelectItem>
                        <SelectItem value="GOG">GOG</SelectItem>
                        <SelectItem value="Epic">Epic</SelectItem>
                        <SelectItem value="Itch.io">Itch.io</SelectItem>
                        <SelectItem value="Nintendo">Nintendo</SelectItem>
                        <SelectItem value="PLaystation US">
                          PLaystation US
                        </SelectItem>
                        <SelectItem value="Playstation EU">
                          Playstation EU
                        </SelectItem> */}
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
  );
};

export default ManualAddForm;
