"use client";

import { CookieNamesType, cookieFormValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AES } from "crypto-js";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

interface CookiesFormProps {}

const encryptCookies = (cookie: string) => {
  const cookieCipher = AES.encrypt(
    cookie,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
  );
  return encodeURIComponent(cookieCipher.toString());
};

const CookiesForm = ({}: CookiesFormProps) => {
  const form = useForm<CookieNamesType>({
    resolver: zodResolver(cookieFormValidator),
    defaultValues: {
      humble: "",
      nintendo: "",
      playstationUs: "",
      playstationEu: "",
      epic_sso: "",
      epic_bearer: "",
    },
  });

  const { mutate: onSubmit, isLoading } = useMutation({
    mutationFn: async (values: CookieNamesType) => {
      const encryptedCookies: Record<string, string> = {};

      for (const [key, value] of Object.entries(values)) {
        // Don't bother encrypting empty values
        if (value !== "") {
          encryptedCookies[key] = encryptCookies(value);
        } else {
          encryptedCookies[key] = "";
        }
      }

      const data = await axios.post("/api/cookies", encryptedCookies);

      return data.data;
    },
    onError: (error) => {
      return toast({
        title: "There was an error.",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      //form.reset();
      toast({
        description: `${data} cookies have been updated`,
      });
    },
  });

  //TODO: add one for steam?
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => {
            onSubmit(e);
          })}
          className="space-y-8 w-[70%] flex flex-col"
        >
          <FormField
            control={form.control}
            name="humble"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-16">
                  <div className="flex-col">
                    <FormLabel className="self-start ">Humble</FormLabel>
                    <FormDescription className="self-end w-32">
                      _simpleauth_sess
                    </FormDescription>
                  </div>
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
                  <div className="flex-col">
                    <FormLabel className="self-start ">Nintendo</FormLabel>
                    <FormDescription className="self-end w-32">
                      NASID
                    </FormDescription>
                  </div>
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
                  <div className="flex-col">
                    <FormLabel className="self-start ">
                      Playstation US
                    </FormLabel>
                    <FormDescription className="self-end w-32">
                      pdccws_p
                    </FormDescription>
                  </div>
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
                  <div className="flex-col">
                    <FormLabel className="self-start">Playstation EU</FormLabel>
                    <FormDescription className="self-end w-32">
                      pdccws_p
                    </FormDescription>
                  </div>
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
            name="epic_sso"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-16">
                  <div className="flex-col">
                    <FormLabel className="self-start">Epic</FormLabel>
                    <FormDescription className="self-end w-32">
                      EPIC_SSO
                    </FormDescription>
                  </div>
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
            name="epic_bearer"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-16">
                  <div className="flex-col">
                    <FormLabel className="self-start">Epic</FormLabel>
                    <FormDescription className="self-end w-32">
                      EPIC_BEARER
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input placeholder="Enter Cookie Value..." {...field} />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button
            disabled={isLoading}
            className="w-[80%] self-center"
            type="submit"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CookiesForm;
