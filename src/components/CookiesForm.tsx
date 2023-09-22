"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { storeFronts } from "@/lib/constants";

interface CookiesFormProps {}

const CookiesForm = ({}: CookiesFormProps) => {
  const formSchema = z.object({
    humble: z.string(),
    nintendo: z.string(),
    playstationUs: z.string(),
    playstationEu: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      humble: "",
      nintendo: "",
      playstationUs: "",
      playstationEu: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    form.reset();
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Label className="mb-16 text-7xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent capitalize">
        Update your cookies
      </Label>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-[70%] flex flex-col"
        >
          <FormField
            control={form.control}
            name="humble"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-16">
                  <FormLabel className="self-center w-32">Humble</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Cookie Value..." {...field} />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="nintendo"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-16">
                  <FormLabel className="self-center w-32">Nintendo</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Cookie Value..." {...field} />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="playstationUs"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-16">
                  <FormLabel className="self-center w-32">
                    Playstation US
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Cookie Value..." {...field} />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="playstationEu"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-16">
                  <FormLabel className="self-center w-32">
                    Playstation EU
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Cookie Value..." {...field} />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button className="w-[80%] self-center" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CookiesForm;
