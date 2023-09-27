"use client";

import { useClerkTheme } from "@/hooks/useClerkTheme";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  const clerkTheme = useClerkTheme();

  return (
    <SignUp
      appearance={{
        baseTheme: clerkTheme,
        variables: {
          colorPrimary: "hsl(130, 6%, 62%)",
          colorTextOnPrimaryBackground: "hsl(300, 7%, 3%)",
        },
        elements: {
          card: "shadow-sharp",
        },
      }}
    />
  );
}
