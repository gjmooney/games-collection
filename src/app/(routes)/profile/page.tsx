"use client";

import { useClerkTheme } from "@/hooks/useClerkTheme";
import { UserProfile } from "@clerk/nextjs";

interface PageProps {}

const Page = ({}: PageProps) => {
  const clerkTheme = useClerkTheme();

  return (
    <main className="flex items-center justify-center">
      <UserProfile
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
    </main>
  );
};

export default Page;
