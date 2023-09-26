"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "./ui/textarea";

interface ContactFormProps {
  header?: boolean;
  className?: string;
}

const ContactForm = ({ header, className }: ContactFormProps) => {
  const formSchema = z.object({
    name: z.string().min(1, { message: "You gotta tell me your name..." }),
    email: z
      .string()
      .email({ message: "This is kind of important..." })
      .min(1, { message: "This is kind of important..." }),
    message: z
      .string()
      .min(1, { message: "I think you may have forgot something..." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        from_name: values.name,
        to_name: "Blank",
        from_email: values.email,
        message: values.message,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    alert("Thank you. I will get back to you as soon as possible.");

    form.reset();
  };

  return (
    <div className="relative w-[80%] rounded-2xl border border-primary bg-secondary p-6 md:p-14 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          {header && (
            <div className="flex items-center justify-center ">
              <FormLabel className="text-4xl">Say Hi.</FormLabel>
            </div>
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="What's your name?" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your e-mail..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    rows={8}
                    placeholder="What's on your mind..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send an Email</Button>
        </form>
      </Form>

      <div className="absolute -right-4 top-0 -z-10 h-[102%] w-[101%] rounded-[2rem] rounded-br-2xl bg-primary md:w-[102%]" />
    </div>
  );
};
export default ContactForm;
